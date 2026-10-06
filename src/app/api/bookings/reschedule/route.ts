import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const { bookingId, newSlotId, newSessionTime } = await request.json();

    if (!bookingId || !newSlotId) {
      return NextResponse.json({ error: "bookingId and newSlotId are required" }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Fetch existing booking
    const { data: booking } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", bookingId)
      .single();

    if (booking) {
      // Free old slot
      if (booking.slot_id) {
        await supabase
          .from("availability_slots")
          .update({ is_booked: false, is_locked: false })
          .eq("id", booking.slot_id);
      }

      // Mark new slot
      await supabase
        .from("availability_slots")
        .update({ is_booked: true, is_locked: false })
        .eq("id", newSlotId);

      // Update booking
      await supabase
        .from("bookings")
        .update({
          slot_id: newSlotId,
          session_time: newSessionTime || new Date().toISOString(),
          status: "rescheduled",
          updated_at: new Date().toISOString(),
        })
        .eq("id", bookingId);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true });
  }
}
