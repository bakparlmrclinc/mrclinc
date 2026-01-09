"use client";

import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">
        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            {/* Logo */}
            <div className="mb-12">
              <img 
                src="/images/logo.svg" 
                alt="MR.CLINC" 
                className="h-16 md:h-20 w-auto mx-auto"
              />
            </div>

            {/* Headline */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Healthcare Pathway Coordination
            </h1>

            {/* Description */}
            <div className="text-gray-600 space-y-4 text-left md:text-center mb-10">
              <p>
                MR.CLINC is a healthcare pathway coordination platform designed to support patients 
                navigating complex treatment decisions, particularly in cross-border and second-opinion contexts.
              </p>
              <p>
                We are not a clinic, agency, or broker. Our role is to structure patient requests into 
                clear, ethical clinical pathways — ensuring transparency, traceability, and operational clarity 
                throughout the process.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/services"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
                style={{ backgroundColor: '#1B4965', color: 'white' }}
              >
                View Our Services
              </Link>
              <Link 
                href="/apply"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-lg border-2 transition-colors"
                style={{ borderColor: '#1B4965', color: '#1B4965' }}
              >
                Apply Now
              </Link>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-gray-100">
          <div className="max-w-3xl mx-auto">
            {/* Disclaimer */}
            <p className="text-xs text-gray-500 text-center mb-6 max-w-2xl mx-auto">
              MrClinc is a healthcare pathway coordination platform. MrClinc does not provide medical advice, 
              recommend doctors or clinics, guarantee outcomes, or discuss pricing. All medical decisions are 
              made between the patient and the healthcare provider. MrClinc does not act as an agent, broker, 
              or referral service.
            </p>

            {/* Links */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-500 mb-4">
              <Link href="/terms" className="hover:text-gray-700 transition-colors">
                Terms of Use
              </Link>
              <span className="text-gray-300">|</span>
              <Link href="/privacy" className="hover:text-gray-700 transition-colors">
                Privacy Policy
              </Link>
              <span className="text-gray-300">|</span>
              <Link href="/cookies" className="hover:text-gray-700 transition-colors">
                Cookies
              </Link>
              <span className="text-gray-300">|</span>
              <Link href="/patient-info" className="hover:text-gray-700 transition-colors">
                Patient Info
              </Link>
              <span className="text-gray-300">|</span>
              <Link href="/complaints" className="hover:text-gray-700 transition-colors">
                Complaints
              </Link>
            </div>

            {/* Copyright */}
            <p className="text-sm text-gray-400 text-center">
              © {new Date().getFullYear()} MR.CLINC. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
