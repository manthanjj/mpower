import React from "react";
import { PhoneCall, ShieldAlert } from "lucide-react";

export function EmergencyBanner() {
  return (
    <div
      role="region"
      aria-label="Crisis Helplines Notice"
      className="bg-[#FEF2F2] border-b border-[#FEE2E2] text-[#991B1B] text-xs sm:text-sm py-2 px-4"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 shrink-0 text-[#DC2626]" aria-hidden="true" />
          <span className="font-medium">
            Not for psychiatric emergencies. If you are in immediate distress, reach out to free 24/7 India helplines:
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3 font-semibold">
          <a
            href="tel:14416"
            className="inline-flex items-center gap-1 underline hover:text-[#7F1D1D] focus:outline-none focus:ring-1 focus:ring-[#991B1B] rounded px-1"
          >
            <PhoneCall className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Tele-MANAS: 14416</span>
          </a>
          <span className="text-[#FCA5A5] hidden sm:inline">•</span>
          <a
            href="tel:18005990019"
            className="inline-flex items-center gap-1 underline hover:text-[#7F1D1D] focus:outline-none focus:ring-1 focus:ring-[#991B1B] rounded px-1"
          >
            <PhoneCall className="w-3.5 h-3.5" aria-hidden="true" />
            <span>KIRAN: 1800-599-0019</span>
          </a>
        </div>
      </div>
    </div>
  );
}
