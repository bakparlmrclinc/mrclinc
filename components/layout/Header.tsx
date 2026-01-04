"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/services", label: "Services" },
    { href: "/why-antalya", label: "Why Antalya" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/faq", label: "FAQ" },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navbar height: 68px */}
        <div className="flex items-center justify-between h-[68px]">
          {/* Logo - mobile: 42px, desktop: 52px (+30%) */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <img
              src="/images/logo.svg"
              alt="MrClinc"
              className="h-[42px] md:h-[52px] w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/services#second-opinion">
              <Button variant="outline" size="sm">
                Free Second Opinion
              </Button>
            </Link>
            <Link href="/apply">
              <Button variant="primary" size="sm">
                Apply Now
              </Button>
            </Link>
            <div className="w-px h-6 bg-gray-200 mx-2" />
            <Link
              href="/pd/login"
              className="text-sm text-gray-500 hover:text-primary-600 transition-colors"
            >
              PD Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-gray-600 hover:text-primary-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <hr className="my-3" />
            <Link
              href="/services#second-opinion"
              className="block py-2 text-primary-600 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Free Second Opinion
            </Link>
            <Link href="/apply" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="primary" size="sm" className="w-full mt-2">
                Apply Now
              </Button>
            </Link>
            <hr className="my-3" />
            <Link
              href="/pd/login"
              className="block py-2 text-sm text-gray-500"
              onClick={() => setIsMobileMenuOpen(false)}>
              PD Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
