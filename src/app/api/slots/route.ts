import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { generateDailyISTSlots, releaseExpiredSlotLocks } from "@/lib/slots";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dateStr = searchParams.get("date") || new Date().toISOString().split("T")[0];

  // Clean up any stale slot locks older than 10 minutes
  await releaseExpiredSlotLocks();

  try {
    const supabase = createAdminClient();
    const startOfDay = `${dateStr}T00:00:00+05:30`;
    const endOfDay = `${dateStr}T23:59:59+05:30`;

    const { data: dbSlots, error } = await supabase
      .from("availability_slots")
      .select("*")
      .gte("start_time", new Date(startOfDay).toISOString())
      .lte("start_time", new Date(endOfDay).toISOString())
      .order("start_time", { ascending: true });

    if (error || !dbSlots || dbSlots.length === 0) {
      // Return generated daily IST slots
      const defaultSlots = generateDailyISTSlots(dateStr);
      return NextResponse.json({
        date: dateStr,
        slots: defaultSlots,
      });
    }

    const now = new Date();
    const formattedSlots = dbSlots.map((s) => {
      const isCurrentlyLocked =
        s.is_locked && s.locked_until && new Date(s.locked_until) > now;
      return {
        id: s.id,
        startTime: s.start_time,
        endTime: s.end_time,
        displayTimeIST: new Date(s.start_time).toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }) + " IST",
        isBooked: s.is_booked,
        isLocked: isCurrentlyLocked,
      };
    });

    return NextResponse.json({
      date: dateStr,
      slots: formattedSlots,
    });
  } catch {
    const defaultSlots = generateDailyISTSlots(dateStr);
    return NextResponse.json({
      date: dateStr,
      slots: defaultSlots,
    });
  }
}
