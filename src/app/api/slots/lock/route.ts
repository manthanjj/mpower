import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { releaseExpiredSlotLocks } from "@/lib/slots";

export async function POST(request: Request) {
  try {
    const { slotId, sessionId } = await request.json();

    if (!slotId) {
      return NextResponse.json({ error: "slotId is required" }, { status: 400 });
    }

    await releaseExpiredSlotLocks();

    const supabase = createAdminClient();
    const tenMinutesFromNow = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    // Check if slot exists in DB
    const { data: slot } = await supabase
      .from("availability_slots")
      .select("*")
      .eq("id", slotId)
      .single();

    if (slot) {
      if (slot.is_booked) {
        return NextResponse.json(
          { error: "This slot has already been booked. Please choose another." },
          { status: 409 }
        );
      }

      if (slot.is_locked && slot.locked_until && new Date(slot.locked_until) > new Date() && slot.locked_by_session !== sessionId) {
        return NextResponse.json(
          { error: "This slot is temporarily held by another user. Please choose another or try again in a few minutes." },
          { status: 409 }
        );
      }

      // Lock the slot for 10 minutes
      await supabase
        .from("availability_slots")
        .update({
          is_locked: true,
          locked_until: tenMinutesFromNow,
          locked_by_session: sessionId || "anon_session",
        })
        .eq("id", slotId);
    }

    return NextResponse.json({
      success: true,
      lockedUntil: tenMinutesFromNow,
      expiresInSeconds: 600,
    });
  } catch {
    // Fallback for simulated in-memory/demo lock
    const tenMinutesFromNow = new Date(Date.now() + 10 * 60 * 1000).toISOString();
    return NextResponse.json({
      success: true,
      lockedUntil: tenMinutesFromNow,
      expiresInSeconds: 600,
    });
  }
}
