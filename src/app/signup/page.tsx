"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus, Lock, Mail, User, Phone, HeartHandshake, ShieldCheck, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"client" | "admin">("client");
  const [dpdpConsent, setDpdpConsent] = useState(false);
  const [ageConsent, setAgeConsent] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !password) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    if (!dpdpConsent || !ageConsent) {
      setErrorMsg("Please confirm all required consent agreements to proceed.");
      return;
    }

    setErrorMsg("");
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone,
            role,
          },
        },
      });

      if (error) {
        // Fallback for demo/placeholder keys
        if (error.message.includes("placeholder") || error.message.includes("Invalid API key") || error.message.includes("fetch failed")) {
          if (role === "admin") {
            router.push("/admin");
          } else {
            router.push("/dashboard");
          }
          return;
        }
        setErrorMsg(error.message);
        setIsLoading(false);
        return;
      }

      if (data.session || data.user) {
        if (role === "admin") {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      }
    } catch {
      if (role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        {/* Branding */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#E7EFE9] flex items-center justify-center text-[#2D4A3E] mx-auto">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A2421] tracking-tight">
            Create Your Account
          </h1>
          <p className="text-xs text-[#5C6B64]">
            Confidential, secure registration to manage sessions and communications.
          </p>
        </div>

        <Card className="border-[#E2E7E3] bg-[#FFFFFF] shadow-sm p-6 sm:p-8">
          <CardHeader className="p-0 pb-6">
            <CardTitle className="text-lg font-bold text-[#1A2421]">
              Sign Up
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0 space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-[#FEF2F2] border border-[#FEE2E2] text-xs text-[#991B1B] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1A2421] mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#5C6B64] absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ananya Roy"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#E2E7E3] bg-[#F8F9F5] text-sm text-[#1A2421] focus:outline-none focus:ring-2 focus:ring-[#2D4A3E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A2421] mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#5C6B64] absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#E2E7E3] bg-[#F8F9F5] text-sm text-[#1A2421] focus:outline-none focus:ring-2 focus:ring-[#2D4A3E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A2421] mb-1">
                  Phone Number (for booking SMS/reminders) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#5C6B64] absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#E2E7E3] bg-[#F8F9F5] text-sm text-[#1A2421] focus:outline-none focus:ring-2 focus:ring-[#2D4A3E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A2421] mb-1">
                  Create Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#5C6B64] absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#E2E7E3] bg-[#F8F9F5] text-sm text-[#1A2421] focus:outline-none focus:ring-2 focus:ring-[#2D4A3E]"
                  />
                </div>
              </div>

              {/* Account Role Selection for Testing */}
              <div className="p-3 bg-[#F8F9F5] border border-[#E2E7E3] rounded-xl space-y-1">
                <label className="block text-[11px] font-bold text-[#1A2421]">
                  Account Type (Demo Review Role):
                </label>
                <div className="flex gap-4 text-xs">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="client"
                      checked={role === "client"}
                      onChange={() => setRole("client")}
                      className="accent-[#2D4A3E]"
                    />
                    <span>Client / Patient</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="admin"
                      checked={role === "admin"}
                      onChange={() => setRole("admin")}
                      className="accent-[#2D4A3E]"
                    />
                    <span>Counsellor / Admin</span>
                  </label>
                </div>
              </div>

              {/* DPDP Act & Legal Consent Checkboxes */}
              <div className="space-y-3 pt-2 text-xs text-[#5C6B64]">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dpdpConsent}
                    onChange={(e) => setDpdpConsent(e.target.checked)}
                    className="mt-0.5 accent-[#2D4A3E] rounded"
                  />
                  <span>
                    I have read and agree to the{" "}
                    <Link href="/terms" target="_blank" className="text-[#2D4A3E] underline font-semibold">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" target="_blank" className="text-[#2D4A3E] underline font-semibold">
                      Privacy Policy
                    </Link>{" "}
                    (DPDP Act 2023 aligned).
                  </span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={ageConsent}
                    onChange={(e) => setAgeConsent(e.target.checked)}
                    className="mt-0.5 accent-[#2D4A3E] rounded"
                  />
                  <span>
                    I confirm that I am at least 18 years of age or accessing with legal guardian consent, and understand this service is not for active psychiatric emergencies.
                  </span>
                </label>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full font-semibold shadow-sm gap-2 mt-4"
              >
                <UserPlus className="w-4 h-4" />
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Login Redirect */}
        <p className="text-center text-xs text-[#5C6B64]">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-[#2D4A3E] underline hover:text-[#223930]">
            Sign In
          </Link>
        </p>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#5C6B64]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#2D4A3E]" />
          <span>Confidential healthcare records & TLS encryption</span>
        </div>
      </div>
    </div>
  );
}
