import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import { BookingFlow } from "@/components/booking/booking-flow";
import { ShieldAlert, PhoneCall } from "lucide-react";

export const metadata = {
  title: "Book a Therapy Session | Bhagyashree Counselling",
  description: "Schedule your online 1-on-1 mental wellness session. Instant calendar invites, IST time slots, and confidential intake.",
};

interface BookPageProps {
  searchParams: Promise<{
    service?: string;
  }>;
}

export default async function BookPage({ searchParams }: BookPageProps) {
  const { service } = await searchParams;

  return (
    <div className="py-12 md:py-16 space-y-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <Badge variant="secondary" className="px-3.5 py-1 text-xs font-semibold">
            Online Video Consultations
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1A2421] tracking-tight">
            Schedule Your Therapy Session
          </h1>
          <p className="text-sm sm:text-base text-[#5C6B64] max-w-xl mx-auto">
            Choose your service, select a convenient slot in Indian Standard Time (IST), and complete confidential intake.
          </p>
        </div>

        {/* Crisis Notice on Booking Page */}
        <div className="p-4 rounded-2xl bg-[#FEF2F2] border border-[#FEE2E2] text-[#991B1B] text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-medium">
            <ShieldAlert className="w-4 h-4 shrink-0 text-[#DC2626]" />
            <span>Not for active emergencies. If in crisis, call free national helplines:</span>
          </div>
          <div className="flex items-center gap-3 font-bold shrink-0">
            <a href="tel:14416" className="flex items-center gap-1 underline hover:text-[#7F1D1D]">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Tele-MANAS: 14416</span>
            </a>
          </div>
        </div>

        {/* Multi-Step Booking Engine */}
        <Suspense fallback={<div className="py-12 text-center text-xs text-[#5C6B64]">Loading booking engine...</div>}>
          <BookingFlow initialServiceId={service} />
        </Suspense>
      </div>
    </div>
  );
}
