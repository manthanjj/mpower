import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Video, ShieldCheck, Sparkles, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SITE_CONTENT, ServiceItem } from "@/content/site";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return SITE_CONTENT.services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const service = SITE_CONTENT.services.find((s) => s.slug === slug);
  if (!service) {
    return { title: "Service Not Found" };
  }
  return {
    title: `${service.title} | Bhagyashree Counselling`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service: ServiceItem | undefined = SITE_CONTENT.services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="space-y-16 py-12 md:py-16">
      {/* Breadcrumb & Navigation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/services"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5C6B64] hover:text-[#2D4A3E] transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to all services
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Content (Left 8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="px-3.5 py-1 text-xs font-semibold">
                Specialized Service
              </Badge>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1A2421] tracking-tight leading-tight">
                {service.title}
              </h1>
              <p className="text-lg text-[#5C6B64] leading-relaxed">
                {service.shortDescription}
              </p>
            </div>

            {/* In-depth Overview */}
            <div className="bg-[#FFFFFF] border border-[#E2E7E3] rounded-3xl p-8 space-y-4 shadow-sm">
              <h2 className="text-2xl font-bold text-[#1A2421]">About This Service</h2>
              <p className="text-base text-[#5C6B64] leading-relaxed">
                {service.fullDescription}
              </p>
            </div>

            {/* Who is this for */}
            <div className="bg-[#FFFFFF] border border-[#E2E7E3] rounded-3xl p-8 space-y-4 shadow-sm">
              <h2 className="text-2xl font-bold text-[#1A2421]">Who Is This Best Suited For?</h2>
              <div className="space-y-2.5">
                {service.targetAudience.map((audience, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-[#1A2421]">
                    <CheckCircle2 className="w-4 h-4 text-[#2D4A3E] shrink-0 mt-0.5" />
                    <span>{audience}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Expected Outcomes & Benefits */}
            <div className="bg-[#FFFFFF] border border-[#E2E7E3] rounded-3xl p-8 space-y-4 shadow-sm">
              <h2 className="text-2xl font-bold text-[#1A2421]">Key Benefits & Outcomes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.benefits.map((benefit, idx) => (
                  <Card key={idx} className="border-[#E2E7E3] bg-[#F8F9F5]">
                    <CardHeader className="p-4">
                      <CardTitle className="text-sm font-semibold text-[#1A2421] flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-[#2D4A3E] shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </CardTitle>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Booking Card (Sticky) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <Card className="border-[#E2E7E3] bg-[#FFFFFF] shadow-md">
              <CardHeader className="space-y-2 border-b border-[#E2E7E3] pb-6">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs text-[#2D4A3E] font-medium">
                    1-on-1 Consultation
                  </Badge>
                  <span className="text-2xl font-extrabold text-[#2D4A3E]">
                    {service.priceDisplay}
                  </span>
                </div>
                <CardTitle className="text-lg font-bold text-[#1A2421]">
                  Book This Session
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-6 space-y-6">
                <div className="space-y-3 text-xs text-[#5C6B64]">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#2D4A3E] shrink-0" />
                    <span>Duration: {service.durationMinutes} Minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-[#2D4A3E] shrink-0" />
                    <span>Format: Google Meet Video Call</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#2D4A3E] shrink-0" />
                    <span>Confidential & End-to-End Encrypted</span>
                  </div>
                </div>

                <div className="p-3 bg-[#E7EFE9]/60 rounded-xl border border-[#E2E7E3] text-xs text-[#2D4A3E]">
                  <p className="font-semibold mb-0.5">Instant Calendar Link</p>
                  <p className="text-[#5C6B64]">
                    Meet link & receipt are emailed immediately upon booking confirmation.
                  </p>
                </div>

                <Link href={`/book?service=${service.id}`} className="block w-full">
                  <Button size="lg" className="w-full font-bold shadow-md gap-2">
                    Select Time Slot <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>

                <p className="text-[11px] text-center text-[#5C6B64]">
                  Free cancellation or reschedule up to 24 hours in advance.
                </p>
              </CardContent>
            </Card>

            <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#E2E7E3] text-xs text-[#5C6B64] space-y-2">
              <p className="font-semibold text-[#1A2421] flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-[#2D4A3E]" />
                Questions before booking?
              </p>
              <p>
                Reach out to us via our <Link href="/contact" className="text-[#2D4A3E] underline">contact form</Link> or view our <Link href="/faq" className="text-[#2D4A3E] underline">frequently asked questions</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
