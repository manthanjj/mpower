import React from "react";
import Link from "next/link";
import { HeartHandshake, ShieldCheck, Mail, MapPin, PhoneCall } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#FFFFFF] border-t border-[#E2E7E3] text-[#1A2421] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Brand & Philosophy */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#E7EFE9] flex items-center justify-center text-[#2D4A3E]">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-[#1A2421]">
                Bhagyashree
              </span>
            </div>
            <p className="text-sm text-[#5C6B64] leading-relaxed">
              Empathetic, evidence-informed mental wellness and relationship counselling. A confidential, safe space to heal, reconnect, and grow.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#2D4A3E] font-medium bg-[#E7EFE9]/50 py-1.5 px-3 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Confidential & Secure</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#1A2421]">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-[#5C6B64]">
              <li>
                <Link href="/about" className="hover:text-[#2D4A3E] transition-colors">
                  About Bhagyashree
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#2D4A3E] transition-colors">
                  Counselling Services
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-[#2D4A3E] transition-colors">
                  Book a Consultation
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#2D4A3E] transition-colors">
                  Wellness Journal & Insights
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#2D4A3E] transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & DPDP Compliance */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#1A2421]">
              Trust & Legal
            </h4>
            <ul className="space-y-2 text-sm text-[#5C6B64]">
              <li>
                <Link href="/privacy" className="hover:text-[#2D4A3E] transition-colors">
                  Privacy Policy (DPDP Aligned)
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#2D4A3E] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-[#2D4A3E] transition-colors">
                  Refund & Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#2D4A3E] transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Location & Crisis Help */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#1A2421]">
              Reach Out
            </h4>
            <ul className="space-y-2 text-sm text-[#5C6B64]">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#2D4A3E] shrink-0" />
                <span>Online across India (IST)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#2D4A3E] shrink-0" />
                <a href="mailto:bhagyashree.wellness@gmail.com" className="hover:text-[#2D4A3E]">
                  care@bhagyashreewellness.in
                </a>
              </li>
            </ul>

            <div className="mt-4 p-3 rounded-xl bg-[#FEF2F2] border border-[#FEE2E2]">
              <p className="text-xs font-semibold text-[#991B1B] flex items-center gap-1.5 mb-1">
                <PhoneCall className="w-3.5 h-3.5" />
                24/7 Crisis Support
              </p>
              <p className="text-xs text-[#7F1D1D] leading-snug">
                Tele-MANAS: <a href="tel:14416" className="font-bold underline">14416</a> <br />
                KIRAN: <a href="tel:18005990019" className="font-bold underline">1800-599-0019</a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 border-t border-[#E2E7E3] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#5C6B64]">
          <p>
            © {new Date().getFullYear()} Bhagyashree Counselling & Mental Wellness. All rights reserved.
          </p>
          <p className="text-center md:text-right max-w-xl text-[#75847D]">
            Disclaimer: Counselling services do not substitute psychiatric medical care or emergency crisis interventions. We do not make claims of outcome guarantees.
          </p>
        </div>
      </div>
    </footer>
  );
}
