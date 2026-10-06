import Link from "next/link";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Terms of Service | Bhagyashree Counselling",
  description: "Terms and conditions governing online psychological counselling, scheduling, client agreements, and ethics.",
};

export default function TermsPage() {
  return (
    <div className="py-12 md:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5C6B64] hover:text-[#2D4A3E] transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Return to Home
      </Link>

      <div className="space-y-4 border-b border-[#E2E7E3] pb-8">
        <Badge variant="secondary" className="text-xs font-semibold text-[#2D4A3E]">
          Legal Terms
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1A2421] tracking-tight">
          Terms of Service
        </h1>
        <p className="text-sm text-[#5C6B64]">
          Effective Date: October 2026 • Please read carefully before booking an appointment.
        </p>
      </div>

      <div className="bg-[#FFFFFF] border border-[#E2E7E3] rounded-3xl p-8 md:p-12 space-y-8 text-sm text-[#5C6B64] leading-relaxed shadow-sm">
        {/* Emergency Disclaimer Alert */}
        <div className="p-4 rounded-2xl bg-[#FEF2F2] border border-[#FEE2E2] text-[#991B1B] text-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm">
            <ShieldAlert className="w-4 h-4" />
            <span>Crisis & Emergency Disclaimer</span>
          </div>
          <p>
            Online therapy sessions provided through this website are scheduled outpatient consultations. <strong>This platform is strictly NOT suitable for active psychiatric emergencies, acute suicidal crises, or substance overdose.</strong> If you or someone you know is in immediate danger, please dial Tele-MANAS (14416) or visit the nearest hospital emergency room immediately.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#1A2421]">1. Scope of Psychological Counselling</h2>
          <p>
            Bhagyashree provides psychological counselling, psychotherapy (CBT, ACT, Humanistic), and mental wellness guidance. Psychological counselling involves an active collaborative relationship between therapist and client aimed at developing coping tools and psychological resilience.
          </p>
          <p>
            Psychotherapy does not guarantee specific life outcomes, cures, or immediate symptom cessation. Progress depends on collaborative participation and consistency.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#1A2421]">2. Eligibility & Age Requirements</h2>
          <p>
            Clients must be at least 18 years of age to book independent sessions. Minors between 14-17 may access sessions only with written informed consent and verification from a legal parent or guardian.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#1A2421]">3. Appointments, Time Zones & Punctuality</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>All session slots are scheduled in <strong>Indian Standard Time (IST)</strong>.</li>
            <li>Sessions commence strictly at the scheduled hour. If a client joins late, the session will still conclude at the pre-booked end time to respect subsequent client appointments.</li>
            <li>Clients are responsible for ensuring high-speed internet connectivity and a quiet, private physical environment during video calls.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#1A2421]">4. Payments & Financial Terms</h2>
          <p>
            Session fees must be paid in full at the time of booking via Razorpay. A 10-minute temporary lock holds your slot while completing payment. Unpaid holds are automatically released to the public availability pool after 10 minutes.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#1A2421]">5. Rescheduling and Cancellations</h2>
          <p>
            Cancellations and rescheduling are governed by our <Link href="/refund-policy" className="text-[#2D4A3E] underline font-semibold">Refund & Cancellation Policy</Link>. You may reschedule or cancel for a 100% refund up to 24 hours prior to the scheduled session.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#1A2421]">6. Intellectual Property & Recording Prohibition</h2>
          <p>
            All psychoeducational materials, worksheets, and website content are intellectual property of the practice. <strong>Audio/video recording of therapy sessions without explicit mutual written consent is strictly prohibited by law.</strong>
          </p>
        </section>
      </div>
    </div>
  );
}
