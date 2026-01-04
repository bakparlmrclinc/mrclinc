<<<<<<< HEAD
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
=======
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* ============================================
            HERO SECTION
            ============================================ */}
        <section 
          className="relative min-h-[90vh] overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #f0f7fa 0%, #ffffff 50%, #f0f7fa 100%)' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="relative z-10">
                <p 
                  className="font-medium mb-4 tracking-wide uppercase text-sm"
                  style={{ color: '#1B4965' }}
                >
                  Healthcare Pathway Coordination
                </p>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                  Your Journey to
                  <span style={{ color: '#1B4965' }}> Quality Healthcare</span>
                  {" "}in Antalya
                </h1>
                
                <p className="text-xl text-gray-600 mb-8 max-w-lg">
                  We coordinate pathways between UK patients and experienced healthcare 
                  providers in Turkey. You receive quotes, compare options, and decide.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <Link href="/apply">
                    <Button variant="accent" size="lg">
                      Submit Your Request
                    </Button>
                  </Link>
                  <Link href="/how-it-works">
                    <Button variant="outline" size="lg">
                      How It Works
                    </Button>
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#22C55E' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Free Consultation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#22C55E' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>No Obligation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#22C55E' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>You Decide</span>
                  </div>
                </div>
              </div>

              {/* Right - Hero Image */}
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/hero-patient.jpg"
                    alt="Patient consultation"
                    width={600}
                    height={450}
                    className="w-full h-auto object-cover"
                    priority
                  />
                  
                  {/* Floating Card - Free Second Opinion */}
                  <div 
                    className="absolute bottom-6 left-6 right-6 rounded-xl p-4 shadow-lg border border-gray-100"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(8px)' }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span 
                          className="inline-block px-2 py-1 text-xs font-semibold rounded mb-2"
                          style={{ backgroundColor: '#DCFCE7', color: '#166534' }}
                        >
                          FREE
                        </span>
                        <h3 className="font-semibold text-gray-900">Second Opinion Service</h3>
                        <p className="text-sm text-gray-600">For cancer & surgery patients</p>
                      </div>
                      <Link href="/services#second-opinion">
                        <Button variant="success" size="sm">
                          Learn More
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Background Decorative Elements */}
                <div 
                  className="absolute -top-8 -right-8 w-72 h-72 rounded-full opacity-50 -z-10"
                  style={{ backgroundColor: '#D9EEF5' }}
                />
                <div 
                  className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full opacity-50 -z-10"
                  style={{ backgroundColor: '#FFEDD5' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            SERVICES OVERVIEW
            ============================================ */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Services We Coordinate
              </h2>
              <p className="text-gray-600">
                From aesthetic procedures to complex surgeries, we help you connect 
                with qualified healthcare providers in Antalya.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Aesthetic Surgery */}
              <div className="bg-white rounded-2xl p-8 border border-gray-200 text-center hover:shadow-lg transition-shadow">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: '#F0F7FA' }}
                >
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#1B4965' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Aesthetic Surgery
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Face, breast, body contouring, and hair restoration procedures 
                  with experienced surgeons.
                </p>
                <ul className="text-sm text-gray-500 space-y-1 mb-6">
                  <li>Rhinoplasty</li>
                  <li>Breast Surgery</li>
                  <li>Liposuction & BBL</li>
                  <li>Hair Transplant</li>
                </ul>
                <Link href="/services#aesthetic">
                  <Button variant="ghost" size="sm">
                    View All Procedures
                  </Button>
                </Link>
              </div>

              {/* Cancer Surgery */}
              <div className="bg-white rounded-2xl p-8 border border-gray-200 text-center hover:shadow-lg transition-shadow relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span 
                    className="inline-block px-3 py-1 text-xs font-semibold rounded-full"
                    style={{ backgroundColor: '#DCFCE7', color: '#166534' }}
                  >
                    Free Second Opinion
                  </span>
                </div>
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 mt-4"
                  style={{ backgroundColor: '#F0F7FA' }}
                >
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#1B4965' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Cancer Surgery
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Oncological surgical procedures with multidisciplinary teams and 
                  modern treatment approaches.
                </p>
                <ul className="text-sm text-gray-500 space-y-1 mb-6">
                  <li>GI Cancer Surgery</li>
                  <li>Breast Oncology</li>
                  <li>Thoracic Surgery</li>
                  <li>Urological Oncology</li>
                </ul>
                <Link href="/services#cancer">
                  <Button variant="ghost" size="sm">
                    View All Procedures
                  </Button>
                </Link>
              </div>

              {/* General Surgery */}
              <div className="bg-white rounded-2xl p-8 border border-gray-200 text-center hover:shadow-lg transition-shadow relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span 
                    className="inline-block px-3 py-1 text-xs font-semibold rounded-full"
                    style={{ backgroundColor: '#DCFCE7', color: '#166534' }}
                  >
                    Free Second Opinion
                  </span>
                </div>
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 mt-4"
                  style={{ backgroundColor: '#F0F7FA' }}
                >
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#1B4965' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  General Surgery
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Non-oncological surgical procedures including gallbladder, hernia, 
                  and bariatric surgery.
                </p>
                <ul className="text-sm text-gray-500 space-y-1 mb-6">
                  <li>Gallbladder Surgery</li>
                  <li>Hernia Repair</li>
                  <li>Bariatric Surgery</li>
                  <li>Proctology</li>
                </ul>
                <Link href="/services#general">
                  <Button variant="ghost" size="sm">
                    View All Procedures
                  </Button>
                </Link>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link href="/services">
                <Button variant="outline" size="lg">
                  View All Services
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================
            HOW IT WORKS
            ============================================ */}
        <section className="py-20" style={{ backgroundColor: '#F9FAFB' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-gray-600">
                A simple, transparent process that keeps you in control every step of the way.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connector line */}
              <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-gray-200" />

              {/* Step 1 */}
              <div className="text-center relative">
                <div 
                  className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white relative z-10"
                  style={{ backgroundColor: '#1B4965' }}
                >
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Submit Request</h3>
                <p className="text-gray-600">
                  Fill out our simple form with your healthcare needs. It's free and takes just a few minutes.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center relative">
                <div 
                  className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white relative z-10"
                  style={{ backgroundColor: '#1B4965' }}
                >
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Receive Quotes</h3>
                <p className="text-gray-600">
                  Clinics review your request and send quotes directly to you within 48-72 hours.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center relative">
                <div 
                  className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white relative z-10"
                  style={{ backgroundColor: '#1B4965' }}
                >
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Compare & Decide</h3>
                <p className="text-gray-600">
                  You compare options, ask questions, and make your own informed decision. No pressure.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link href="/how-it-works">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================
            WHY ANTALYA
            ============================================ */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Why Antalya?
                </h2>
                <p className="text-gray-600 mb-8">
                  Turkey welcomes over 1.2 million international patients annually. 
                  Antalya, as the world's 8th most visited city, combines healthcare 
                  excellence with established tourism infrastructure.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    "Shorter wait times compared to NHS elective procedures",
                    "Competitive value compared to UK private care",
                    "Internationally accredited hospitals (50+ JCI-accredited)",
                    "Direct flights from UK cities (under 4 hours)"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <svg className="w-5 h-5 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#1B4965' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-gray-600">{item}</p>
                    </div>
                  ))}
                </div>

                <Link href="/why-antalya">
                  <Button variant="outline">
                    Learn More About Antalya
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "1.2M+", label: "International patients visit Turkey annually" },
                  { value: "50+", label: "JCI-accredited hospitals in Turkey" },
                  { value: "4hrs", label: "Direct flight from London to Antalya" },
                  { value: "8th", label: "Most visited city in the world" }
                ].map((stat, idx) => (
                  <div 
                    key={idx}
                    className="rounded-2xl p-8 text-center"
                    style={{ backgroundColor: '#F0F7FA' }}
                  >
                    <div className="text-4xl font-bold mb-2" style={{ color: '#1B4965' }}>{stat.value}</div>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            WHAT WE DO / DON'T DO
            ============================================ */}
        <section className="py-20" style={{ backgroundColor: '#F9FAFB' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Role: Coordination, Not Provision
              </h2>
              <p className="text-gray-600">
                We believe in transparency. Here's exactly what we do and don't do.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* What We Do */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <span 
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: '#DCFCE7' }}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#16A34A' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  What We Do
                </h3>
                <ul className="space-y-4">
                  {[
                    "Coordinate introductions between you and clinics",
                    "Facilitate communication throughout the process",
                    "Ensure you receive quotes directly from clinics",
                    "Offer free second opinion for cancer & surgery patients"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#22C55E' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What We Don't Do */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <span 
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: '#FEE2E2' }}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#DC2626' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                  What We Don't Do
                </h3>
                <ul className="space-y-4">
                  {[
                    "Provide medical advice or treatment",
                    "Choose or recommend specific clinics",
                    "Set prices or negotiate on your behalf",
                    "Make decisions for you - that's your control"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#EF4444' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            BOTTOM CTA
            ============================================ */}
        <section className="py-20" style={{ backgroundColor: '#1B4965' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Explore Your Options?
            </h2>
            <p className="mb-8 max-w-2xl mx-auto" style={{ color: '#B3DDED' }}>
              Submit a free, no-obligation request. Receive quotes directly from clinics. 
              You compare, you decide, you control.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apply">
                <Button variant="accent" size="lg">
                  Submit Your Request
                </Button>
              </Link>
              <Link href="/services#second-opinion">
                <Button
                  variant="outline"
                  size="lg"
                  style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}
                >
                  Free Second Opinion
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
  );
}
