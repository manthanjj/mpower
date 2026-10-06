"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Script from "next/script";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CookieConsent() {
  const [consentState, setConsentState] = useState<"accepted" | "declined" | "undecided">("undecided");
  const [hasMounted, setHasMounted] = useState(false);

  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  useEffect(() => {
    setHasMounted(true);
    const saved = localStorage.getItem("dpdp_cookie_consent");
    if (saved === "accepted" || saved === "declined") {
      setConsentState(saved);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("dpdp_cookie_consent", "accepted");
    setConsentState("accepted");
  };

  const handleDecline = () => {
    localStorage.setItem("dpdp_cookie_consent", "declined");
    setConsentState("declined");
  };

  if (!hasMounted) return null;

  return (
    <>
      {/* Conditionally inject GA4 only after explicit consent */}
      {consentState === "accepted" && gaMeasurementId && !gaMeasurementId.includes("placeholder") && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}

      {/* Floating DPDP Consent Banner */}
      {consentState === "undecided" && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie and Privacy Consent"
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-lg z-50 bg-[#FFFFFF] border border-[#E2E7E3] rounded-3xl p-6 shadow-2xl space-y-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#E7EFE9] flex items-center justify-center text-[#2D4A3E] shrink-0">
                <Cookie className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-[#1A2421]">
                Privacy & Cookie Preferences (DPDP Act)
              </h3>
            </div>
            <button
              onClick={handleDecline}
              className="text-[#5C6B64] hover:text-[#1A2421] p-1"
              aria-label="Dismiss cookie notice"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#5C6B64] leading-relaxed">
            We use essential cookies for secure booking authentication. With your explicit consent, we also utilize privacy-preserving analytics to improve our mental healthcare resources.
          </p>

          <div className="flex items-center justify-between gap-3 pt-1">
            <Link
              href="/privacy"
              className="text-xs text-[#2D4A3E] underline font-medium hover:text-[#223930]"
            >
              Read Privacy Policy
            </Link>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDecline}
                className="text-xs font-semibold h-8"
              >
                Essential Only
              </Button>
              <Button
                size="sm"
                onClick={handleAccept}
                className="text-xs font-bold h-8 bg-[#2D4A3E] shadow-sm"
              >
                Accept All
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
