"use client";

import Link from "next/link";

export default function ComingSoonPage() {
  return (
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

          {/* Coming Soon Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
            Coming Soon
          </div>

          {/* Headline */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Healthcare Pathway Coordination
          </h1>

          {/* Description */}
          <div className="text-gray-600 space-y-4 mb-12 text-left md:text-center">
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

          {/* Divider */}
          <div className="border-t border-gray-200 my-10"></div>

          {/* PD Section */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              For Pathway Developers
            </h2>
            <p className="text-gray-600 mb-6 text-sm">
              If you have been invited to join our Pathway Developer network, 
              please complete the onboarding form below.
            </p>
            <Link
              href="/pd/apply"
              className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Complete PD Application
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
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
  );
}
