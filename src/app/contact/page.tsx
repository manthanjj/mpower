"use client";

import React, { useState } from "react";
import { Mail, MapPin, Clock, PhoneCall, Send, CheckCircle2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SITE_CONTENT } from "@/content/site";
import { z } from "zod";

const contactSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid 10-digit phone number"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const { counsellor, contact } = SITE_CONTENT;
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ContactFormData;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate reliable form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 800);
  };

  return (
    <div className="space-y-16 py-12 md:py-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <Badge variant="secondary" className="px-3.5 py-1 text-xs font-semibold">
            Get in Touch
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1A2421] tracking-tight">
            Contact & Consultation Inquiries
          </h1>
          <p className="text-lg text-[#5C6B64] leading-relaxed">
            Have a question before booking your session? Leave a message below and we will respond within 24 business hours.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7">
            <Card className="border-[#E2E7E3] bg-[#FFFFFF] shadow-sm p-6 sm:p-8">
              <CardHeader className="p-0 pb-6">
                <CardTitle className="text-2xl font-bold text-[#1A2421]">
                  Send a Direct Message
                </CardTitle>
                <p className="text-xs text-[#5C6B64] mt-1">
                  All communication is treated with strict confidentiality under our privacy policy.
                </p>
              </CardHeader>

              <CardContent className="p-0">
                {isSubmitted ? (
                  <div className="p-6 rounded-2xl bg-[#E7EFE9] border border-[#2D4A3E]/20 text-center space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-[#2D4A3E] mx-auto" />
                    <h3 className="text-lg font-bold text-[#1A2421]">Message Received</h3>
                    <p className="text-sm text-[#5C6B64]">
                      Thank you for reaching out. We will review your inquiry and get back to you via email within 24 hours.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsSubmitted(false)}
                      className="mt-2 text-xs"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-semibold text-[#1A2421] mb-1">
                        Your Full Name *
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E7E3] bg-[#F8F9F5] text-sm text-[#1A2421] focus:outline-none focus:ring-2 focus:ring-[#2D4A3E]"
                        placeholder="e.g. Priya Sharma"
                      />
                      {errors.fullName && <p className="text-xs text-[#DC2626] mt-1">{errors.fullName}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-xs font-semibold text-[#1A2421] mb-1">
                          Email Address *
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E7E3] bg-[#F8F9F5] text-sm text-[#1A2421] focus:outline-none focus:ring-2 focus:ring-[#2D4A3E]"
                          placeholder="name@example.com"
                        />
                        {errors.email && <p className="text-xs text-[#DC2626] mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-xs font-semibold text-[#1A2421] mb-1">
                          Phone Number *
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E7E3] bg-[#F8F9F5] text-sm text-[#1A2421] focus:outline-none focus:ring-2 focus:ring-[#2D4A3E]"
                          placeholder="+91 98765 43210"
                        />
                        {errors.phone && <p className="text-xs text-[#DC2626] mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-xs font-semibold text-[#1A2421] mb-1">
                        Subject *
                      </label>
                      <input
                        id="subject"
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E7E3] bg-[#F8F9F5] text-sm text-[#1A2421] focus:outline-none focus:ring-2 focus:ring-[#2D4A3E]"
                        placeholder="Inquiry regarding therapy sessions"
                      />
                      {errors.subject && <p className="text-xs text-[#DC2626] mt-1">{errors.subject}</p>}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-semibold text-[#1A2421] mb-1">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E7E3] bg-[#F8F9F5] text-sm text-[#1A2421] focus:outline-none focus:ring-2 focus:ring-[#2D4A3E]"
                        placeholder="Tell us briefly about what you are seeking help with..."
                      />
                      {errors.message && <p className="text-xs text-[#DC2626] mt-1">{errors.message}</p>}
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full font-semibold shadow-sm gap-2"
                    >
                      {isSubmitting ? (
                        "Sending message..."
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Inquiry
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Contact info & Emergency (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="border-[#E2E7E3] bg-[#FFFFFF] shadow-sm p-6 sm:p-8 space-y-6">
              <CardTitle className="text-xl font-bold text-[#1A2421]">
                Practice Information
              </CardTitle>

              <div className="space-y-4 text-sm text-[#5C6B64]">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#2D4A3E] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#1A2421]">Email Inquiries</p>
                    <a href={`mailto:${contact.email}`} className="text-xs text-[#2D4A3E] underline">
                      {contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#2D4A3E] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#1A2421]">Hours of Operation</p>
                    <p className="text-xs">{contact.workingHours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#2D4A3E] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#1A2421]">Service Format</p>
                    <p className="text-xs">{counsellor.location}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Crisis Callout */}
            <div className="p-6 rounded-3xl bg-[#FEF2F2] border border-[#FEE2E2] text-[#991B1B] space-y-3">
              <div className="flex items-center gap-2 font-bold text-sm">
                <ShieldAlert className="w-5 h-5 text-[#DC2626]" />
                <span>Immediate Crisis Support</span>
              </div>
              <p className="text-xs leading-relaxed text-[#7F1D1D]">
                If you are currently experiencing acute distress, psychiatric crises, or self-harm thoughts, please call India&apos;s free national helplines immediately:
              </p>
              <div className="space-y-1.5 pt-1 text-xs font-bold text-[#7F1D1D]">
                <p className="flex items-center gap-1.5">
                  <PhoneCall className="w-4 h-4" />
                  Tele-MANAS: <a href="tel:14416" className="underline text-[#991B1B]">14416 (24/7 Toll-Free)</a>
                </p>
                <p className="flex items-center gap-1.5">
                  <PhoneCall className="w-4 h-4" />
                  KIRAN Helpline: <a href="tel:18005990019" className="underline text-[#991B1B]">1800-599-0019</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
