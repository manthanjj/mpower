import Link from "next/link";
import { ArrowLeft, Compass, Calendar, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full text-center space-y-8 bg-[#FFFFFF] border border-[#E2E7E3] rounded-3xl p-8 sm:p-12 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-[#E7EFE9] flex items-center justify-center text-[#2D4A3E] mx-auto">
          <Compass className="w-8 h-8 animate-pulse" />
        </div>

        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C86D51]">
            404 • Page Not Found
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A2421] tracking-tight">
            Let&apos;s guide you back to calm.
          </h1>
          <p className="text-sm text-[#5C6B64] leading-relaxed max-w-md mx-auto">
            The page you are looking for might have been moved, renamed, or is temporarily unavailable.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <Link href="/" className="w-full">
            <Button variant="outline" className="w-full gap-2 text-xs font-semibold">
              <ArrowLeft className="w-4 h-4" />
              Return to Home
            </Button>
          </Link>
          <Link href="/book" className="w-full">
            <Button className="w-full gap-2 text-xs font-semibold shadow-sm">
              <Calendar className="w-4 h-4" />
              Book a Session
            </Button>
          </Link>
        </div>

        <div className="pt-6 border-t border-[#E2E7E3] text-xs text-[#5C6B64] space-y-2">
          <p>Looking for something specific?</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-[#2D4A3E]">
            <Link href="/services" className="hover:underline">Services Catalog</Link>
            <span>•</span>
            <Link href="/about" className="hover:underline">About Bhagyashree</Link>
            <span>•</span>
            <Link href="/faq" className="hover:underline">FAQs</Link>
            <span>•</span>
            <Link href="/contact" className="hover:underline">Contact</Link>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#FEF2F2] border border-[#FEE2E2] text-[#991B1B] text-xs flex items-center justify-center gap-2">
          <PhoneCall className="w-3.5 h-3.5 shrink-0" />
          <span>Need crisis support? Tele-MANAS: 14416 (24/7)</span>
        </div>
      </div>
    </div>
  );
}
