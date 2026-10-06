import Link from "next/link";
import { ShieldCheck, ArrowLeft, Lock, FileText, UserCheck, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Privacy Policy | DPDP Act 2023 Aligned | Bhagyashree Counselling",
  description: "Comprehensive privacy policy explaining how mental health data, session records, and personal details are protected under Indian Law.",
};

export default function PrivacyPolicyPage() {
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
          Legal & Compliance
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1A2421] tracking-tight">
          Privacy Policy (DPDP Act 2023 Aligned)
        </h1>
        <p className="text-sm text-[#5C6B64]">
          Last Updated: October 2026 • Governing Law: Digital Personal Data Protection Act, 2023 (India)
        </p>
      </div>

      <div className="bg-[#FFFFFF] border border-[#E2E7E3] rounded-3xl p-8 md:p-12 space-y-8 text-sm text-[#5C6B64] leading-relaxed shadow-sm">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#1A2421] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#2D4A3E]" />
            1. Introduction & Commitment to Clinical Confidentiality
          </h2>
          <p>
            At <strong>Bhagyashree Counselling & Mental Wellness</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the Practice&rdquo;), we recognize the deeply sensitive nature of mental health consultation. We are committed to safeguarding your personal data and upholding the highest standards of clinical confidentiality and data privacy under the Digital Personal Data Protection (DPDP) Act, 2023 and the Rehabilitation Council of India / Indian mental health ethical guidelines.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#1A2421] flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#2D4A3E]" />
            2. Personal Data We Collect
          </h2>
          <p>We collect only the minimum necessary information to deliver safe and personalized psychological care:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Identity & Contact Information:</strong> Full legal name, email address, and phone number for booking confirmations and communication.</li>
            <li><strong>Safety Contact:</strong> Emergency contact person name and telephone number (mandated for clinical safety protocols).</li>
            <li><strong>Clinical Intake Information:</strong> Age, previous therapy history, and self-described primary concerns or goals for counselling.</li>
            <li><strong>Payment & Transactional Records:</strong> Razorpay order ID, payment status, and transaction timestamps. We do not store credit/debit card numbers or UPI PINs on our servers.</li>
            <li><strong>Video Consultations:</strong> Sessions occur via encrypted Google Meet links. <em>We strictly do NOT record audio or video of therapy sessions.</em></li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#1A2421] flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#2D4A3E]" />
            3. Legal Grounds & Purpose of Processing
          </h2>
          <p>Your personal data is processed strictly for the following specified purposes:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Facilitating scheduled therapy sessions and sending secure Google Meet calendar invites.</li>
            <li>Allowing the clinical psychologist to prepare evidence-based therapeutic roadmaps tailored to your intake.</li>
            <li>Processing session fees, cancellations, and refunds securely through Razorpay.</li>
            <li>Emergency risk escalation in critical situations where there is immediate danger to life.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#1A2421] flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-[#2D4A3E]" />
            4. Your Data Principal Rights under DPDP Act 2023
          </h2>
          <p>As a Data Principal under Indian law, you hold the following rights:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Right to Access:</strong> You may request a summary of the personal data we hold about you.</li>
            <li><strong>Right to Correction & Erasure:</strong> You can request correction of inaccurate data or deletion of your profile, subject to statutory healthcare retention requirements.</li>
            <li><strong>Right to Grievance Redressal:</strong> You may register concerns directly with our designated Grievance Officer.</li>
            <li><strong>Right to Nominate:</strong> You have the right to nominate an individual to exercise your rights in the event of death or incapacity.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#1A2421] flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-[#C86D51]" />
            5. Limits of Clinical Confidentiality
          </h2>
          <p>
            Therapist-client confidentiality is strictly observed. Information is disclosed only under the following rare legal and ethical exceptions:
          </p>
          <ol className="list-decimal pl-5 space-y-1.5">
            <li>When there is explicit, credible risk of imminent physical harm or suicide to the client or another identifiable individual.</li>
            <li>When mandated by a court of law or statutory Indian legal obligation.</li>
          </ol>
        </section>

        <section className="space-y-3 pt-4 border-t border-[#E2E7E3]">
          <h2 className="text-lg font-bold text-[#1A2421]">6. Grievance Redressal Officer Contact</h2>
          <div className="bg-[#F8F9F5] p-4 rounded-2xl border border-[#E2E7E3] space-y-1 text-xs">
            <p><strong>Designated Grievance Officer:</strong> Bhagyashree (Lead Psychologist)</p>
            <p><strong>Email:</strong> care@mpowercounselling.in</p>
            <p><strong>Response Timeframe:</strong> Within 7 business days under DPDP rules</p>
          </div>
        </section>
      </div>
    </div>
  );
}
