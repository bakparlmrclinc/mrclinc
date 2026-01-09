"use client";

import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="py-20 px-4" style={{ backgroundColor: '#1B4965' }}>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Healthcare Pathway Coordination
            </h1>
            <p className="text-xl mb-8" style={{ color: '#B3DDED' }}>
              We structure patient requests into clear, ethical clinical pathways — 
              ensuring transparency, traceability, and operational clarity throughout the process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/services"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
                style={{ backgroundColor: '#62B6CB', color: '#1B4965' }}
              >
                View Our Services
              </Link>
              <Link 
                href="/how-it-works"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-lg border-2 text-white transition-colors"
                style={{ borderColor: 'rgba(255,255,255,0.3)' }}
              >
                How It Works
              </Link>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              What We Coordinate
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Cancer Surgery */}
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: '#F0F7FA', color: '#1B4965' }}
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Cancer Surgery</h3>
                    <span 
                      className="inline-block px-2 py-0.5 text-xs font-semibold rounded-full"
                      style={{ backgroundColor: '#DCFCE7', color: '#166534' }}
                    >
                      Free Second Opinion
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  Oncological surgical procedures across gastrointestinal, hepatobiliary, thoracic, breast, gynecological oncology, and more.
                </p>
                <Link 
                  href="/services#cancer"
                  className="inline-flex items-center text-sm font-semibold"
                  style={{ color: '#1B4965' }}
                >
                  Learn more →
                </Link>
              </div>

              {/* General Surgery */}
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: '#F0F7FA', color: '#1B4965' }}
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">General Surgery</h3>
                    <span 
                      className="inline-block px-2 py-0.5 text-xs font-semibold rounded-full"
                      style={{ backgroundColor: '#DCFCE7', color: '#166534' }}
                    >
                      Free Second Opinion
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  Non-oncological surgical procedures including hepatobiliary, hernia, obesity surgery, and benign endocrine surgery.
                </p>
                <Link 
                  href="/services#general"
                  className="inline-flex items-center text-sm font-semibold"
                  style={{ color: '#1B4965' }}
                >
                  Learn more →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Our Role */}
        <section className="py-16 px-4" style={{ backgroundColor: '#F9FAFB' }}>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Role</h2>
            <p className="text-gray-600 text-lg mb-8">
              MR.CLINC is a healthcare pathway coordination platform designed to support patients 
              navigating complex treatment decisions, particularly in cross-border and second-opinion contexts.
            </p>
            <p className="text-gray-600 text-lg">
              We are not a clinic, agency, or broker. We structure patient requests, 
              coordinate with specialist channels, and ensure transparency throughout the process.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4" style={{ backgroundColor: '#1B4965' }}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Begin?</h2>
            <p className="mb-8" style={{ color: '#B3DDED' }}>
              Submit your request. We'll prepare your case and guide the coordination process.
            </p>
            <Link 
              href="/apply"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              style={{ backgroundColor: '#62B6CB', color: '#1B4965' }}
            >
              Submit Request
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
