"use client";

import React from "react";
import { z } from "zod";
import { ShieldCheck, User, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export const intakeSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email for the session link"),
  phone: z.string().min(10, "Please enter a valid 10-digit mobile number"),
  age: z.string().refine((val) => parseInt(val) >= 18, {
    message: "You must be 18 or older to book an independent session",
  }),
  emergencyContactName: z.string().min(2, "Emergency contact name is required"),
  emergencyContactPhone: z.string().min(10, "Emergency contact phone is required"),
  primaryConcern: z.string().min(10, "Please describe briefly what you'd like to focus on (min 10 characters)"),
  previousTherapy: z.enum(["never", "in_past", "currently"]),
  consentAgreed: z.boolean().refine((val) => val === true, {
    message: "You must agree to the confidentiality policy & terms to proceed",
  }),
});

export type IntakeFormData = z.infer<typeof intakeSchema>;

interface IntakeFormProps {
  initialData: Partial<IntakeFormData>;
  onSubmit: (data: IntakeFormData) => void;
  onBack: () => void;
}

export function IntakeForm({ initialData, onSubmit, onBack }: IntakeFormProps) {
  const [formData, setFormData] = React.useState<IntakeFormData>({
    fullName: initialData.fullName || "",
    email: initialData.email || "",
    phone: initialData.phone || "",
    age: initialData.age || "25",
    emergencyContactName: initialData.emergencyContactName || "",
    emergencyContactPhone: initialData.emergencyContactPhone || "",
    primaryConcern: initialData.primaryConcern || "",
    previousTherapy: initialData.previousTherapy || "never",
    consentAgreed: initialData.consentAgreed || false,
  });

  const [errors, setErrors] = React.useState<Partial<Record<keyof IntakeFormData, string>>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = intakeSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof IntakeFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof IntakeFormData;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    onSubmit(result.data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-[#E7EFE9]/40 border border-[#E2E7E3] rounded-2xl p-4 flex items-start gap-3 text-xs text-[#2D4A3E]">
        <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Confidential Clinical Intake</p>
          <p className="text-[#5C6B64]">
            Your responses are encrypted and accessible only by your licensed counsellor.
          </p>
        </div>
      </div>

      {/* Basic Contact Info */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold text-[#1A2421] border-b border-[#E2E7E3] pb-2">
          1. Personal Information
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#1A2421] mb-1">
              Full Legal Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#5C6B64] absolute left-3 top-3" />
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Rahul Sharma"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#E2E7E3] bg-[#F8F9F5] text-sm text-[#1A2421] focus:outline-none focus:ring-2 focus:ring-[#2D4A3E]"
              />
            </div>
            {errors.fullName && <p className="text-xs text-[#DC2626] mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1A2421] mb-1">
              Age *
            </label>
            <input
              type="number"
              min="18"
              max="100"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E7E3] bg-[#F8F9F5] text-sm text-[#1A2421] focus:outline-none focus:ring-2 focus:ring-[#2D4A3E]"
            />
            {errors.age && <p className="text-xs text-[#DC2626] mt-1">{errors.age}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#1A2421] mb-1">
              Email Address (for Google Meet Link) *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#5C6B64] absolute left-3 top-3" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="rahul@example.com"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#E2E7E3] bg-[#F8F9F5] text-sm text-[#1A2421] focus:outline-none focus:ring-2 focus:ring-[#2D4A3E]"
              />
            </div>
            {errors.email && <p className="text-xs text-[#DC2626] mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1A2421] mb-1">
              Mobile Number (IST WhatsApp/SMS) *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-[#5C6B64] absolute left-3 top-3" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#E2E7E3] bg-[#F8F9F5] text-sm text-[#1A2421] focus:outline-none focus:ring-2 focus:ring-[#2D4A3E]"
              />
            </div>
            {errors.phone && <p className="text-xs text-[#DC2626] mt-1">{errors.phone}</p>}
          </div>
        </div>
      </div>

      {/* Safety & Emergency Contact */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold text-[#1A2421] border-b border-[#E2E7E3] pb-2">
          2. Emergency Contact (Mandatory Safety Protocol)
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#1A2421] mb-1">
              Emergency Contact Person Name *
            </label>
            <input
              type="text"
              value={formData.emergencyContactName}
              onChange={(e) => setFormData({ ...formData, emergencyContactName: e.target.value })}
              placeholder="e.g. Sangeeta Sharma (Spouse / Parent / Friend)"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E7E3] bg-[#F8F9F5] text-sm text-[#1A2421] focus:outline-none focus:ring-2 focus:ring-[#2D4A3E]"
            />
            {errors.emergencyContactName && (
              <p className="text-xs text-[#DC2626] mt-1">{errors.emergencyContactName}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1A2421] mb-1">
              Emergency Contact Phone *
            </label>
            <input
              type="tel"
              value={formData.emergencyContactPhone}
              onChange={(e) => setFormData({ ...formData, emergencyContactPhone: e.target.value })}
              placeholder="+91 98765 00000"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E7E3] bg-[#F8F9F5] text-sm text-[#1A2421] focus:outline-none focus:ring-2 focus:ring-[#2D4A3E]"
            />
            {errors.emergencyContactPhone && (
              <p className="text-xs text-[#DC2626] mt-1">{errors.emergencyContactPhone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Therapeutic Background */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold text-[#1A2421] border-b border-[#E2E7E3] pb-2">
          3. Session Goals & Background
        </h4>

        <div>
          <label className="block text-xs font-semibold text-[#1A2421] mb-1">
            Previous Therapy Experience
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "never", label: "First time" },
              { id: "in_past", label: "In the past" },
              { id: "currently", label: "Ongoing" },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setFormData({ ...formData, previousTherapy: opt.id as "never" | "in_past" | "currently" })}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                  formData.previousTherapy === opt.id
                    ? "border-[#2D4A3E] bg-[#2D4A3E] text-[#FBFBF9]"
                    : "border-[#E2E7E3] bg-[#F8F9F5] text-[#1A2421] hover:bg-[#E7EFE9]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#1A2421] mb-1">
            What is the primary topic or concern you would like to explore? *
          </label>
          <textarea
            rows={3}
            value={formData.primaryConcern}
            onChange={(e) => setFormData({ ...formData, primaryConcern: e.target.value })}
            placeholder="e.g. Managing workplace anxiety, recurring conflict with partner, feeling stuck in career..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E7E3] bg-[#F8F9F5] text-sm text-[#1A2421] focus:outline-none focus:ring-2 focus:ring-[#2D4A3E]"
          />
          {errors.primaryConcern && (
            <p className="text-xs text-[#DC2626] mt-1">{errors.primaryConcern}</p>
          )}
        </div>
      </div>

      {/* Informed Consent Checkbox */}
      <div className="space-y-2 pt-2">
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.consentAgreed}
            onChange={(e) => setFormData({ ...formData, consentAgreed: e.target.checked })}
            className="mt-0.5 accent-[#2D4A3E] rounded"
          />
          <span className="text-xs text-[#5C6B64] leading-relaxed">
            I consent to participating in online counselling. I acknowledge that I have read the privacy policy, understand my data is stored securely under the DPDP Act 2023, and confirm this session is not for an active psychiatric emergency.
          </span>
        </label>
        {errors.consentAgreed && (
          <p className="text-xs text-[#DC2626]">{errors.consentAgreed}</p>
        )}
      </div>

      {/* Form Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-[#E2E7E3]">
        <Button type="button" variant="outline" onClick={onBack}>
          Back to Slots
        </Button>
        <Button type="submit" className="font-semibold shadow-sm">
          Review Booking & Lock Slot
        </Button>
      </div>
    </form>
  );
}
