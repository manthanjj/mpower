import { createAdminClient } from "@/lib/supabase/admin";

export interface Slot {
  id: string;
  startTime: string; // ISO string
  endTime: string;
  displayTimeIST: string; // e.g., "10:00 AM - 10:50 AM IST"
  isBooked: boolean;
  isLocked: boolean;
  lockedUntil?: string | null;
}

// Generate standard IST daily time slots (10:00 AM to 7:00 PM IST)
export function generateDailyISTSlots(dateStr: string): Slot[] {
  // dateStr format: YYYY-MM-DD
  const times = [
    { start: "10:00", end: "10:50", label: "10:00 AM - 10:50 AM" },
    { start: "11:30", end: "12:20", label: "11:30 AM - 12:20 PM" },
    { start: "14:00", end: "14:50", label: "02:00 PM - 02:50 PM" },
    { start: "15:30", end: "16:20", label: "03:30 PM - 04:20 PM" },
    { start: "17:00", end: "17:50", label: "05:00 PM - 05:50 PM" },
    { start: "18:30", end: "19:20", label: "06:30 PM - 07:20 PM" },
  ];

  return times.map((t, idx) => {
    // Construct ISO string in IST (+05:30)
    const startISO = `${dateStr}T${t.start}:00+05:30`;
    const endISO = `${dateStr}T${t.end}:00+05:30`;
    return {
      id: `slot_${dateStr}_${t.start.replace(":", "")}`,
      startTime: new Date(startISO).toISOString(),
      endTime: new Date(endISO).toISOString(),
      displayTimeIST: `${t.label} (IST)`,
      isBooked: idx === 1 && dateStr.endsWith("15"), // Sample booked simulation
      isLocked: false,
    };
  });
}

// Release slots where 10-minute hold has expired
export async function releaseExpiredSlotLocks() {
  try {
    const supabase = createAdminClient();
    const now = new Date().toISOString();

    await supabase
      .from("availability_slots")
      .update({
        is_locked: false,
        locked_until: null,
        locked_by_session: null,
      })
      .eq("is_locked", true)
      .lt("locked_until", now)
      .eq("is_booked", false);
  } catch {
    // Graceful error ignore if DB is offline
  }
}
