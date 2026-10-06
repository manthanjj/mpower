import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const { bookingId, reason } = await request.json();

    if (!bookingId) {
      return NextResponse.json({ error: "bookingId is required" }, { status: 400 });
    }

    const supabase = createAdminClient();

    const { data: booking } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", bookingId)
      .single();

    if (booking) {
      // Free slot
      if (booking.slot_id) {
        await supabase
          .from("availability_slots")
          .update({ is_booked: false, is_locked: false })
          .eq("id", booking.slot_id);
      }

      await supabase
        .from("bookings")
        .update({
          status: "cancelled",
          cancellation_reason: reason || "Cancelled by client",
          updated_at: new Date().toISOString(),
        })
        .eq("id", bookingId);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true });
  }
}
