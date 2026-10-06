import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const { slotId } = await request.json();
    if (!slotId) {
      return NextResponse.json({ error: "slotId is required" }, { status: 400 });
    }

    const supabase = createAdminClient();
    await supabase
      .from("availability_slots")
      .update({
        is_locked: false,
        locked_until: null,
        locked_by_session: null,
      })
      .eq("id", slotId)
      .eq("is_booked", false);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true });
  }
}
