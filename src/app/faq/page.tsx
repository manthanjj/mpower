import Link from "next/link";
import { HelpCircle, ArrowRight, ShieldCheck, CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SITE_CONTENT } from "@/content/site";

export const metadata = {
  title: "Frequently Asked Questions | Bhagyashree Counselling",
  description: "Find answers regarding online therapy sessions, booking steps, IST slots, cancellations, and data privacy.",
};

export default function FAQPage() {
  const { faqs } = SITE_CONTENT;
  const categories = ["General", "Booking & Payments", "Privacy & Tech"] as const;

  return (
    <div className="space-y-16 py-12 md:py-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <Badge variant="secondary" className="px-3.5 py-1 text-xs font-semibold">
            Help Center & FAQs
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1A2421] tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-[#5C6B64] leading-relaxed">
            Clear, transparent information regarding how online sessions work, scheduling, security, and payment policies.
          </p>
        </div>
      </section>

      {/* FAQs by Category */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {categories.map((cat) => {
          const categoryFaqs = faqs.filter((f) => f.category === cat);
          if (categoryFaqs.length === 0) return null;

          return (
            <div key={cat} className="space-y-6">
              <div className="flex items-center gap-2 border-b border-[#E2E7E3] pb-3">
                {cat === "General" && <HelpCircle className="w-5 h-5 text-[#2D4A3E]" />}
                {cat === "Booking & Payments" && <CreditCard className="w-5 h-5 text-[#2D4A3E]" />}
                {cat === "Privacy & Tech" && <ShieldCheck className="w-5 h-5 text-[#2D4A3E]" />}
                <h2 className="text-2xl font-bold text-[#1A2421]">{cat}</h2>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {categoryFaqs.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-[#FFFFFF] border border-[#E2E7E3] rounded-2xl p-6 space-y-2 shadow-sm"
                  >
                    <h3 className="font-bold text-base text-[#1A2421]">
                      {item.question}
                    </h3>
                    <p className="text-sm text-[#5C6B64] leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Still Have Questions CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#E7EFE9]/50 border border-[#E2E7E3] rounded-3xl p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold text-[#1A2421]">Still have questions?</h3>
          <p className="text-sm text-[#5C6B64] max-w-md mx-auto">
            If you need further clarification before scheduling your first session, feel free to send a message.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button variant="outline" className="font-semibold">
                Contact the Clinic
              </Button>
            </Link>
            <Link href="/book">
              <Button className="font-semibold">
                Proceed to Booking <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
