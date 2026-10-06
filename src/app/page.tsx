import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Heart, Clock, Award, CheckCircle2, MessageSquare, Calendar, HelpCircle, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { SITE_CONTENT } from "@/content/site";

export default function Home() {
  const { counsellor, services, faqs, testimonials } = SITE_CONTENT;

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-24 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="px-4 py-1.5 gap-1.5 text-xs font-medium tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#2D4A3E]" />
              Safe • Confidential • Evidence-Informed
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#1A2421] leading-[1.12]">
              A compassionate space to heal, reconnect, and grow.
            </h1>

            <p className="text-lg md:text-xl text-[#5C6B64] leading-relaxed max-w-2xl mx-auto">
              {counsellor.bio}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/book" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto gap-2 font-semibold shadow-md">
                  Book a Consultation
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/services" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto font-medium">
                  Explore Services
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-medium text-[#5C6B64]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2D4A3E]" />
                <span>100% Confidential (DPDP Aligned)</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#2D4A3E]" />
                <span>IST Convenient Video Slots</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#2D4A3E]" />
                <span>{counsellor.experienceYears} Clinical Experience</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Counsellor Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF] border border-[#E2E7E3] rounded-3xl p-8 md:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="w-44 h-44 rounded-2xl bg-[#E7EFE9] flex items-center justify-center text-[#2D4A3E] border-2 border-[#2D4A3E]/10 mb-4 overflow-hidden">
                <span className="text-sm font-semibold text-[#2D4A3E] px-4 text-center">
                  Counsellor Portrait [TODO_PHOTO]
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#1A2421]">{counsellor.name}</h3>
              <p className="text-sm text-[#5C6B64] font-medium">{counsellor.title}</p>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-2">
                <Badge variant="outline" className="text-xs text-[#2D4A3E] border-[#2D4A3E]/20">
                  Therapeutic Philosophy
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1A2421]">
                  Grounding guidance rooted in empathy and science.
                </h2>
              </div>

              <p className="text-[#5C6B64] leading-relaxed">
                {counsellor.approach}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {counsellor.credentials.map((cred, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-[#1A2421]">
                    <CheckCircle2 className="w-4 h-4 text-[#2D4A3E] shrink-0 mt-0.5" />
                    <span>{cred}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link href="/about">
                  <Button variant="outline" className="gap-2 text-sm font-medium">
                    Read Full Biography & Approach
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services Catalog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <Badge variant="secondary" className="px-3 py-1 text-xs font-semibold">
            Services Catalog
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A2421]">Specialized Counselling Services</h2>
          <p className="text-[#5C6B64]">
            Every session is designed to meet your specific life circumstances and emotional goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <Card key={service.id} className="flex flex-col justify-between hover:shadow-md transition-all border-[#E2E7E3] bg-[#FFFFFF]">
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#E7EFE9] flex items-center justify-center text-[#2D4A3E]">
                    <Heart className="w-5 h-5" />
                  </div>
                  <Badge variant="outline" className="font-semibold text-xs text-[#2D4A3E]">
                    {service.durationMinutes} mins • {service.priceDisplay}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-[#1A2421]">{service.title}</CardTitle>
                <CardDescription className="text-sm text-[#5C6B64] leading-relaxed">
                  {service.shortDescription}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0 space-y-4">
                <ul className="space-y-1.5 text-xs text-[#5C6B64]">
                  {service.benefits.slice(0, 3).map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2D4A3E] shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2 flex items-center justify-between border-t border-[#E2E7E3]">
                  <Link href={`/services/${service.slug}`} className="text-xs font-semibold text-[#2D4A3E] hover:underline inline-flex items-center gap-1">
                    Details & Format <ArrowRight className="w-3 h-3" />
                  </Link>
                  <Link href={`/book?service=${service.id}`}>
                    <Button size="sm" className="text-xs font-semibold">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Transparent Testimonials Placeholder Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#E7EFE9]/40 border border-[#E2E7E3] rounded-3xl p-8 md:p-12">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A2421]">Client Experiences & Feedback</h2>
            <p className="text-sm text-[#5C6B64]">
              Ethical transparency: Testimonials will be displayed here with client consent. [TODO_TESTIMONIALS]
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((item) => (
              <Card key={item.id} className="bg-[#FFFFFF] border-[#E2E7E3] shadow-none">
                <CardHeader>
                  <div className="flex items-center gap-1 text-[#C86D51] mb-2">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <CardDescription className="text-sm text-[#1A2421] italic leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs font-bold text-[#2D4A3E]">{item.clientInitials}</p>
                  <p className="text-xs text-[#5C6B64]">{item.service} • {item.city}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Preview Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <Badge variant="secondary" className="px-3 py-1 text-xs font-semibold">
            Common Questions
          </Badge>
          <h2 className="text-3xl font-bold text-[#1A2421]">Frequently Asked Questions</h2>
          <p className="text-[#5C6B64] text-sm">Everything you need to know about booking, sessions, and privacy.</p>
        </div>

        <div className="space-y-4">
          {faqs.slice(0, 4).map((faq, i) => (
            <div key={i} className="bg-[#FFFFFF] border border-[#E2E7E3] rounded-2xl p-6 space-y-2">
              <h3 className="font-semibold text-base text-[#1A2421] flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#2D4A3E] shrink-0" />
                {faq.question}
              </h3>
              <p className="text-sm text-[#5C6B64] leading-relaxed pl-6">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <Link href="/faq">
            <Button variant="outline" className="gap-2 text-sm font-medium">
              View All FAQs <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2D4A3E] text-[#FBFBF9] rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to prioritize your mental health?
          </h2>
          <p className="text-base sm:text-lg text-[#E7EFE9] max-w-xl mx-auto leading-relaxed">
            Choose a time that works for you in Indian Standard Time (IST) and take the first step toward lasting emotional resilience.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/book">
              <Button size="lg" className="bg-[#FBFBF9] text-[#2D4A3E] hover:bg-[#E7EFE9] font-bold shadow-lg">
                <Calendar className="w-4 h-4 mr-2" />
                Book Your Session
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="border-[#E7EFE9]/40 text-[#FBFBF9] hover:bg-[#243c32]">
                Have Questions? Contact Us
              </Button>
            </Link>
          </div>
          <div className="pt-4 flex items-center justify-center gap-2 text-xs text-[#E7EFE9]/80">
            <PhoneCall className="w-3.5 h-3.5 text-[#FCA5A5]" />
            <span>Crisis Helpline: Tele-MANAS 14416 (24/7 Toll-Free)</span>
          </div>
        </div>
      </section>
    </div>
  );
}
