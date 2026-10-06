import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, Video, Heart, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { SITE_CONTENT } from "@/content/site";

export const metadata = {
  title: "Counselling Services | Individual Therapy, Anxiety, Relationships & Burnout",
  description: "Explore evidence-based therapy and counselling services tailored for individuals, couples, and professionals across India.",
};

export default function ServicesPage() {
  const { services } = SITE_CONTENT;

  return (
    <div className="space-y-20 py-12 md:py-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <Badge variant="secondary" className="px-3.5 py-1 text-xs font-semibold">
            Services & Consultations
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1A2421] tracking-tight">
            Specialized Therapy Tailored to Your Journey
          </h1>
          <p className="text-lg text-[#5C6B64] leading-relaxed">
            All consultations are conducted via secure, end-to-end video appointments in Indian Standard Time (IST). Transparent pricing with zero hidden fees.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <Card key={service.id} className="flex flex-col justify-between border-[#E2E7E3] bg-[#FFFFFF] shadow-sm hover:shadow-md transition-all">
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#E7EFE9] flex items-center justify-center text-[#2D4A3E]">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs font-semibold text-[#2D4A3E] border-[#2D4A3E]/30">
                      <Clock className="w-3 h-3 mr-1" />
                      {service.durationMinutes} mins
                    </Badge>
                    <Badge className="bg-[#2D4A3E] text-[#FBFBF9] font-bold text-xs">
                      {service.priceDisplay}
                    </Badge>
                  </div>
                </div>

                <div>
                  <CardTitle className="text-2xl font-bold text-[#1A2421]">{service.title}</CardTitle>
                  <CardDescription className="text-sm text-[#5C6B64] mt-2 leading-relaxed">
                    {service.shortDescription}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Target Audience */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A2421]">
                    Best Suited For:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#5C6B64]">
                    {service.targetAudience.slice(0, 3).map((aud, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2D4A3E] shrink-0 mt-0.5" />
                        <span>{aud}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Session Format */}
                <div className="flex items-center gap-2 text-xs text-[#5C6B64] bg-[#F8F9F5] p-3 rounded-xl border border-[#E2E7E3]">
                  <Video className="w-4 h-4 text-[#2D4A3E] shrink-0" />
                  <span>{service.format}</span>
                </div>

                {/* CTA Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <Link href={`/book?service=${service.id}`} className="w-full sm:flex-1">
                    <Button className="w-full font-semibold shadow-sm">
                      Book Slot ({service.priceDisplay})
                    </Button>
                  </Link>
                  <Link href={`/services/${service.slug}`} className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full font-medium text-xs">
                      View Details <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Trust & Guarantee Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#E7EFE9]/40 border border-[#E2E7E3] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl font-bold text-[#1A2421] flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-[#2D4A3E]" />
              Safe, Secure & DPDP Compliant
            </h3>
            <p className="text-sm text-[#5C6B64] leading-relaxed">
              Your session recordings are never kept. Intake answers and session discussions are strictly protected under clinical confidentiality standards.
            </p>
          </div>
          <Link href="/faq" className="shrink-0">
            <Button variant="outline" className="font-semibold">
              Read Booking & Privacy FAQs
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
