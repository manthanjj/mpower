"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, HeartHandshake, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Blog", href: "/blog" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F8F9F5]/90 backdrop-blur-md border-b border-[#E2E7E3] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2D4A3E] rounded-lg p-1"
          aria-label="Bhagyashree Mental Wellness Home"
        >
          <div className="w-10 h-10 rounded-full bg-[#E7EFE9] flex items-center justify-center text-[#2D4A3E]">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-[#1A2421] tracking-tight leading-tight">
              Bhagyashree
            </span>
            <span className="text-xs text-[#5C6B64] font-medium">
              Counselling & Wellness
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-[#1A2421] hover:text-[#2D4A3E] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2D4A3E] rounded-md px-1 py-0.5"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="gap-1.5 text-xs font-semibold">
              <User className="w-3.5 h-3.5" />
              Sign In
            </Button>
          </Link>
          <Link href="/book">
            <Button size="sm" className="gap-1.5 shadow-sm font-semibold">
              <Calendar className="w-3.5 h-3.5" />
              Book Session
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <Link href="/book">
            <Button size="sm" className="text-xs px-3 h-8">
              Book
            </Button>
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-[#1A2421] hover:bg-[#E7EFE9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2D4A3E]"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div className="md:hidden border-b border-[#E2E7E3] bg-[#F8F9F5] px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 rounded-lg text-base font-medium text-[#1A2421] hover:bg-[#E7EFE9] hover:text-[#2D4A3E]"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="pt-4 border-t border-[#E2E7E3] flex flex-col gap-2">
            <Link href="/login" onClick={() => setIsOpen(false)} className="w-full">
              <Button variant="outline" className="w-full justify-center">
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            </Link>
            <Link href="/book" onClick={() => setIsOpen(false)} className="w-full">
              <Button className="w-full justify-center">
                <Calendar className="w-4 h-4 mr-2" />
                Book a Session
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
