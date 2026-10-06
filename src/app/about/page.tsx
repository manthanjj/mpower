import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Heart, Award, Sparkles, BookOpen, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SITE_CONTENT } from "@/content/site";

export const metadata = {
  title: "About Bhagyashree | Clinical Psychologist & Counsellor",
  description: "Learn about Bhagyashree's clinical background, therapeutic approach, credentials, and ethical commitment to mental healthcare.",
};

export default function AboutPage() {
  const { counsellor } = SITE_CONTENT;

  return (
    <div className="space-y-20 py-12 md:py-16">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <Badge variant="secondary" className="px-3.5 py-1 text-xs font-semibold">
            About the Practitioner
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1A2421] tracking-tight">
            Compassionate, Evidence-Informed Mental Healthcare
          </h1>
          <p className="text-lg text-[#5C6B64] leading-relaxed">
            Dedicated to creating a grounded, empathetic, and confidential space where you can explore challenges without judgment.
          </p>
        </div>
      </section>

      {/* Main Profile Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Photo & Quick Credentials */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#FFFFFF] border border-[#E2E7E3] rounded-3xl p-6 text-center space-y-4 shadow-sm">
              <div className="w-full aspect-square rounded-2xl bg-[#E7EFE9] flex items-center justify-center text-[#2D4A3E] border-2 border-[#2D4A3E]/10 overflow-hidden">
                <span className="text-sm font-semibold text-[#2D4A3E] px-4 text-center">
                  Counsellor Portrait [TODO_PHOTO]
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#1A2421]">{counsellor.name}</h2>
                <p className="text-sm font-medium text-[#2D4A3E] mt-1">{counsellor.title}</p>
                <p className="text-xs text-[#5C6B64] mt-0.5">{counsellor.experienceYears} Clinical Experience</p>
              </div>

              <div className="pt-3 border-t border-[#E2E7E3] text-left space-y-2 text-xs text-[#5C6B64]">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#2D4A3E] shrink-0" />
                  <span>Licensed & Registered [TODO_CREDENTIALS]</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#2D4A3E] shrink-0" />
                  <span>Languages: {counsellor.languages.join(", ")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#2D4A3E] shrink-0" />
                  <span>{counsellor.location}</span>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/book" className="block w-full">
                  <Button className="w-full font-semibold shadow-sm">
                    Book a Session with Bhagyashree
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Bio, Philosophy & Credentials */}
          <div className="lg:col-span-8 space-y-10">
            {/* Bio Section */}
            <div className="bg-[#FFFFFF] border border-[#E2E7E3] rounded-3xl p-8 space-y-4">
              <h3 className="text-2xl font-bold text-[#1A2421]">Clinical Background & Bio</h3>
              <p className="text-base text-[#5C6B64] leading-relaxed">
                {counsellor.bio}
              </p>
              <p className="text-base text-[#5C6B64] leading-relaxed">
                My practice is anchored in humanistic principles and trauma-informed cognitive therapies. I believe that therapy is an active collaboration rather than a prescriptive checklist. We work together to unpack maladaptive thought loops, develop somatic awareness, and build realistic resilience mechanisms that fit your everyday routine.
              </p>
            </div>

            {/* Therapeutic Frameworks */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#1A2421]">Therapeutic Modalities & Approaches</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="border-[#E2E7E3]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-bold text-[#1A2421] flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#2D4A3E]" />
                      Cognitive Behavioural Therapy (CBT)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs text-[#5C6B64] leading-relaxed">
                    Identifies and reframes automatic cognitive distortions and behavioral patterns that sustain anxiety and low mood.
                  </CardContent>
                </Card>

                <Card className="border-[#E2E7E3]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-bold text-[#1A2421] flex items-center gap-2">
                      <Heart className="w-4 h-4 text-[#2D4A3E]" />
                      Mindfulness & Somatic Regulation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs text-[#5C6B64] leading-relaxed">
                    Grounding tools to regulate the autonomic nervous system, physiological stress responses, and emotional overwhelm.
                  </CardContent>
                </Card>

                <Card className="border-[#E2E7E3]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-bold text-[#1A2421] flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-[#2D4A3E]" />
                      Acceptance & Commitment (ACT)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs text-[#5C6B64] leading-relaxed">
                    Fosters psychological flexibility and values-aligned action while cultivating mindful acceptance of difficult emotions.
                  </CardContent>
                </Card>

                <Card className="border-[#E2E7E3]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-bold text-[#1A2421] flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#2D4A3E]" />
                      Attachment & Systems Therapy
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs text-[#5C6B64] leading-relaxed">
                    Explores interpersonal relationship blueprints, boundary dynamics, and communicative triggers for couples and individuals.
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Verified Qualifications */}
            <div className="bg-[#FFFFFF] border border-[#E2E7E3] rounded-3xl p-8 space-y-4">
              <h3 className="text-2xl font-bold text-[#1A2421]">Qualifications & Professional Training</h3>
              <div className="space-y-3">
                {counsellor.credentials.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-[#F8F9F5] border border-[#E2E7E3]">
                    <CheckCircle2 className="w-5 h-5 text-[#2D4A3E] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-[#1A2421]">{item}</p>
                      <p className="text-xs text-[#5C6B64]">Accredited training and ongoing professional supervision [TODO_CREDENTIALS]</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect in Session */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#E7EFE9]/50 border border-[#E2E7E3] rounded-3xl p-8 md:p-12 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-bold text-[#1A2421]">What to Expect Working Together</h2>
            <p className="text-sm text-[#5C6B64]">A structured, predictable, and empathetic process from start to finish.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#FFFFFF] border border-[#E2E7E3] rounded-2xl p-6 space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#2D4A3E] text-[#FBFBF9] font-bold text-sm flex items-center justify-center">
                1
              </div>
              <h3 className="font-bold text-base text-[#1A2421]">Confidential Intake</h3>
              <p className="text-xs text-[#5C6B64] leading-relaxed">
                Complete a brief, private intake form during booking so we can make the most of our first session together.
              </p>
            </div>

            <div className="bg-[#FFFFFF] border border-[#E2E7E3] rounded-2xl p-6 space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#2D4A3E] text-[#FBFBF9] font-bold text-sm flex items-center justify-center">
                2
              </div>
              <h3 className="font-bold text-base text-[#1A2421]">Initial Assessment</h3>
              <p className="text-xs text-[#5C6B64] leading-relaxed">
                In session 1, we map your current concerns, life history, and collaboratively establish goals that matter to you.
              </p>
            </div>

            <div className="bg-[#FFFFFF] border border-[#E2E7E3] rounded-2xl p-6 space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#2D4A3E] text-[#FBFBF9] font-bold text-sm flex items-center justify-center">
                3
              </div>
              <h3 className="font-bold text-base text-[#1A2421]">Evidence-Based Care</h3>
              <p className="text-xs text-[#5C6B64] leading-relaxed">
                Regular sessions equipped with practical exercises, reflection prompts, and steady progress reviews.
              </p>
            </div>
          </div>

          <div className="text-center pt-4">
            <Link href="/book">
              <Button size="lg" className="font-semibold shadow-md">
                Schedule an Appointment <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
