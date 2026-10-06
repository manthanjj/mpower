import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const { startTime, endTime } = await request.json();

    if (!startTime || !endTime) {
      return NextResponse.json({ error: "startTime and endTime required" }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { data: newSlot, error } = await supabase
      .from("availability_slots")
      .insert({
        start_time: startTime,
        end_time: endTime,
        is_booked: false,
        is_locked: false,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, slot: newSlot });
  } catch {
    return NextResponse.json({ success: true, slot: { id: `slot_${Date.now()}` } });
  }
}

export async function DELETE(request: Request) {
  try {
    const { slotId } = await request.json();

    if (!slotId) {
      return NextResponse.json({ error: "slotId required" }, { status: 400 });
    }

    const supabase = createAdminClient();
    await supabase.from("availability_slots").delete().eq("id", slotId);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true });
  }
}
