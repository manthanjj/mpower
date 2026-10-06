import Link from "next/link";
import { ArrowLeft, Clock, ShieldCheck, RefreshCw, AlertCircle, IndianRupee } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Refund & Cancellation Policy | Bhagyashree Counselling",
  description: "Transparent 24-hour cancellation rules, rescheduling terms, and Razorpay refund timelines.",
};

export default function RefundPolicyPage() {
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
          Financial & Booking Policies
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1A2421] tracking-tight">
          Refund & Cancellation Policy
        </h1>
        <p className="text-sm text-[#5C6B64]">
          Last Updated: October 2026 • Designed to be fair, respectful of clinical time, and transparent.
        </p>
      </div>

      <div className="bg-[#FFFFFF] border border-[#E2E7E3] rounded-3xl p-8 md:p-12 space-y-8 text-sm text-[#5C6B64] leading-relaxed shadow-sm">
        {/* Core Rule Highlight Card */}
        <div className="p-6 rounded-2xl bg-[#E7EFE9] border border-[#2D4A3E]/20 text-[#2D4A3E] space-y-2">
          <div className="flex items-center gap-2 font-bold text-base">
            <Clock className="w-5 h-5" />
            <span>The 24-Hour Advance Notice Standard</span>
          </div>
          <p className="text-xs text-[#1A2421]">
            Therapy slots are reserved exclusively for you. If you cancel or request a reschedule at least <strong>24 hours prior</strong> to your scheduled appointment time, you will receive a <strong>100% full refund</strong> or a direct session credit with zero penalties.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#1A2421] flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-[#2D4A3E]" />
            1. Rescheduling Guidelines
          </h2>
          <p>
            You can reschedule your appointment directly from your <Link href="/dashboard" className="text-[#2D4A3E] underline font-semibold">Client Dashboard</Link> up to 24 hours prior to the session start time without incurring any fee.
          </p>
          <p>
            Reschedule requests made with less than 24 hours notice are accommodated on a case-by-case basis subject to therapist slot availability.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#1A2421] flex items-center gap-2">
            <IndianRupee className="w-5 h-5 text-[#2D4A3E]" />
            2. Cancellation Scenarios & Refund Structure
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-[#E2E7E3] rounded-xl">
              <thead className="bg-[#F8F9F5] border-b border-[#E2E7E3] font-bold text-[#1A2421]">
                <tr>
                  <th className="p-3">Timeline</th>
                  <th className="p-3">Refund / Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E7E3]">
                <tr>
                  <td className="p-3 font-semibold text-[#1A2421]">24+ hours before session</td>
                  <td className="p-3 text-[#2D4A3E] font-bold">100% Full Refund (or Free Reschedule)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#1A2421]">Less than 24 hours before session</td>
                  <td className="p-3 text-[#5C6B64]">No refund (Therapist reserved time slot cannot be re-allocated)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#1A2421]">Client No-Show / Missed Appointment</td>
                  <td className="p-3 text-[#5C6B64]">No refund</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-[#1A2421]">Therapist Emergency / Technical Failure</td>
                  <td className="p-3 text-[#2D4A3E] font-bold">100% Full Refund or Priority Reschedule</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#1A2421] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#2D4A3E]" />
            3. Razorpay Refund Processing & Timelines
          </h2>
          <p>
            Once a refund is approved and initiated through Razorpay:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>UPI Payments:</strong> Typically credited back to your bank account / VPA within <strong>24 to 48 hours</strong>.</li>
            <li><strong>Credit / Debit Cards & Net Banking:</strong> Reflected in your bank statement within <strong>5 to 7 business days</strong>, depending on your issuing bank.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#1A2421] flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-[#2D4A3E]" />
            4. How to Request a Cancellation or Refund
          </h2>
          <p>
            You may cancel an upcoming session through any of the following channels:
          </p>
          <ol className="list-decimal pl-5 space-y-1.5">
            <li>Click <strong>&ldquo;Cancel Session&rdquo;</strong> inside your <Link href="/dashboard" className="text-[#2D4A3E] underline font-semibold">Client Dashboard</Link>.</li>
            <li>Send an email to <strong>care@mpowercounselling.in</strong> quoting your Booking ID and reason.</li>
          </ol>
        </section>
      </div>
    </div>
  );
}
