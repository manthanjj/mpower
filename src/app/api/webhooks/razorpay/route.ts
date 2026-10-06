import { NextResponse } from "next/server";
import crypto from "crypto";
import { createAdminClient } from "@/lib/supabase/admin";
import { createGoogleMeetSession } from "@/lib/meet";
import { sendBookingConfirmationEmails } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-razorpay-signature");
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    // Verify webhook signature if secret configured
    if (webhookSecret && !webhookSecret.includes("placeholder")) {
      if (!signature) {
        return NextResponse.json({ error: "Missing webhook signature" }, { status: 400 });
      }

      const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(rawBody)
        .digest("hex");

      if (expectedSignature !== signature) {
        return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
      }
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;
    const supabase = createAdminClient();

    // 1. Handle Payment Captured / Order Paid
    if (event === "payment.captured" || event === "order.paid") {
      const paymentEntity = payload.payload?.payment?.entity;
      const orderId = paymentEntity?.order_id;
      const paymentId = paymentEntity?.id;

      if (orderId) {
        // Find matching booking
        const { data: booking } = await supabase
          .from("bookings")
          .select("*")
          .eq("razorpay_order_id", orderId)
          .single();

        // Idempotency check: if already confirmed, skip redundant updates
        if (booking && booking.status !== "confirmed") {
          const { meetLink, calendarEventId } = await createGoogleMeetSession({
            bookingId: booking.id,
            clientName: booking.client_name,
            clientEmail: booking.client_email,
            serviceTitle: booking.service_title,
            sessionTimeISO: booking.session_time,
          });

          await supabase
            .from("bookings")
            .update({
              status: "confirmed",
              razorpay_payment_id: paymentId,
              google_meet_link: meetLink,
              calendar_event_id: calendarEventId,
              updated_at: new Date().toISOString(),
            })
            .eq("id", booking.id);

          if (booking.slot_id) {
            await supabase
              .from("availability_slots")
              .update({
                is_booked: true,
                is_locked: false,
                locked_until: null,
                locked_by_session: null,
              })
              .eq("id", booking.slot_id);
          }

          // Payment log
          await supabase.from("payments").insert({
            booking_id: booking.id,
            razorpay_order_id: orderId,
            razorpay_payment_id: paymentId,
            amount_inr: (paymentEntity?.amount || 150000) / 100,
            status: "captured",
            raw_payload: payload,
          });

          const formattedIST = new Date(booking.session_time).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            dateStyle: "full",
            timeStyle: "short",
          }) + " (IST)";

          await sendBookingConfirmationEmails({
            clientName: booking.client_name,
            clientEmail: booking.client_email,
            serviceTitle: booking.service_title,
            sessionTimeFormattedIST: formattedIST,
            meetLink,
            amountPaidDisplay: `₹${booking.amount_paid_inr}`,
            intakeNotes: booking.intake_notes,
          });
        }
      }
    }

    // 2. Handle Payment Failed
    if (event === "payment.failed") {
      const paymentEntity = payload.payload?.payment?.entity;
      const orderId = paymentEntity?.order_id;

      if (orderId) {
        const { data: booking } = await supabase
          .from("bookings")
          .select("*")
          .eq("razorpay_order_id", orderId)
          .single();

        if (booking && booking.slot_id) {
          // Release slot back to pool
          await supabase
            .from("availability_slots")
            .update({
              is_locked: false,
              locked_until: null,
              locked_by_session: null,
            })
            .eq("id", booking.slot_id)
            .eq("is_booked", false);
        }
      }
    }

    // 3. Handle Refund Processed
    if (event === "refund.processed") {
      const refundEntity = payload.payload?.refund?.entity;
      const paymentId = refundEntity?.payment_id;

      if (paymentId) {
        await supabase
          .from("bookings")
          .update({
            status: "cancelled",
            cancellation_reason: "Refunded via Razorpay",
            updated_at: new Date().toISOString(),
          })
          .eq("razorpay_payment_id", paymentId);

        await supabase
          .from("payments")
          .update({
            status: "refunded",
            refund_id: refundEntity?.id,
            refund_amount_inr: (refundEntity?.amount || 0) / 100,
          })
          .eq("razorpay_payment_id", paymentId);
      }
    }

    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json({ received: true });
  }
}
