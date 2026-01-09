import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* ============================================
            HERO SECTION
            ============================================ */}
        <section 
          className="relative overflow-visible"
          style={{ background: 'linear-gradient(135deg, #f0f7fa 0%, #ffffff 50%, #f0f7fa 100%)' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
            <div className="grid lg:grid-cols-[1fr_1.3fr] gap-8 items-center">
              {/* Left Content */}
              <div className="relative z-10">
                <p 
                  className="font-medium mb-4 tracking-wide uppercase text-sm"
                  style={{ color: '#1B4965' }}
                >
                  Healthcare Pathway Coordination
                </p>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                  Your Healthcare
                  <span style={{ color: '#1B4965' }}> Pathway</span>
                  {" "}to Antalya
                </h1>
                
                <p className="text-xl text-gray-600 mb-8 max-w-lg">
                  We coordinate pathways between UK patients and healthcare providers in Turkey. 
                  We prepare your case, connect you with clinical channels, and support you through the coordination process.
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
              <div className="relative pb-8">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/hero-patient.jpg"
                    alt="Patient consultation"
                    width={900}
                    height={650}
                    className="w-full h-full object-cover"
                    style={{ minHeight: '500px' }}
                    priority
                  />
                </div>
                
                {/* Floating Card - Free Second Opinion - Positioned outside image */}
                <div 
                  className="absolute -bottom-4 right-6 rounded-xl px-4 py-3 shadow-lg border border-gray-100"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.98)', backdropFilter: 'blur(8px)' }}
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <span 
                        className="inline-block px-2 py-0.5 text-[10px] font-semibold rounded mb-1"
                        style={{ backgroundColor: '#DCFCE7', color: '#166534' }}
                      >
                        FREE
                      </span>
                      <h3 className="font-semibold text-gray-900 text-sm">Second Opinion Pathway</h3>
                      <p className="text-xs text-gray-600">For cancer & general surgery patients</p>
                    </div>
                    <Link 
                      href="/services#second-opinion"
                      className="text-xs underline hover:opacity-80 whitespace-nowrap flex items-center gap-1"
                      style={{ color: '#1B4965' }}
                    >
                      Learn More
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
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
                We coordinate pathways for aesthetic, oncological, and general surgical services.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Aesthetic Surgery - Coming Soon */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center opacity-75">
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
                  Face, breast, body contouring, and hair restoration.
                </p>
                <div className="mb-6">
                  <span 
                    className="inline-block px-3 py-1 text-xs font-semibold rounded-full"
                    style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}
                  >
                    Coming Soon
                  </span>
                </div>
                <button 
                  disabled
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-200 text-gray-400 cursor-not-allowed"
                >
                  Coming Soon
                </button>
              </div>

              {/* Cancer Surgery */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center hover:shadow-lg transition-shadow">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
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
                  Oncology cases including breast, thyroid, GI, and urological procedures.
                </p>
                <div className="mb-6">
                  <span 
                    className="inline-block px-3 py-1 text-xs font-semibold rounded-full"
                    style={{ backgroundColor: '#DCFCE7', color: '#166534' }}
                  >
                    Free Second Opinion
                  </span>
                </div>
                <Link href="/services#cancer">
                  <Button variant="outline" size="sm">See Scope</Button>
                </Link>
              </div>

              {/* General Surgery */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center hover:shadow-lg transition-shadow">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
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
                  Bariatric, hepatobiliary, hernia repair, and other non-oncological procedures.
                </p>
                <div className="mb-6">
                  <span 
                    className="inline-block px-3 py-1 text-xs font-semibold rounded-full"
                    style={{ backgroundColor: '#DCFCE7', color: '#166534' }}
                  >
                    Free Second Opinion
                  </span>
                </div>
                <Link href="/services#general">
                  <Button variant="outline" size="sm">See Scope</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            WHY MRCLINC
            ============================================ */}
        <section className="py-20" style={{ backgroundColor: '#F9FAFB' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why MrClinc?
              </h2>
              <p className="text-gray-600">
                Independent patient coordination — without sales pressure, clinic promotion, or hidden agendas.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Card 1 - We Work for the Patient */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: '#F0F7FA' }}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#1B4965' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  We Work for the Patient
                </h3>
                <p className="text-gray-600 text-sm">
                  We don't represent clinics or doctors. We represent your interests and help you navigate options safely.
                </p>
              </div>

              {/* Card 2 - No Sales, No Promotion */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: '#F0F7FA' }}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#1B4965' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  No Sales, No Promotion
                </h3>
                <p className="text-gray-600 text-sm">
                  No clinic listings. No paid placements. No pressure to proceed.
                </p>
              </div>

              {/* Card 3 - Clarity Before Commitment */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: '#F0F7FA' }}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#1B4965' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Clarity Before Commitment
                </h3>
                <p className="text-gray-600 text-sm">
                  Free second opinion where applicable. Clear pathways before you decide anything.
                </p>
              </div>
            </div>

            {/* Supporting Line */}
            <div className="text-center mb-8">
              <p className="text-gray-500">
                Most healthcare travel platforms sell treatments. <span className="font-semibold text-gray-700">MrClinc helps you decide.</span>
              </p>
            </div>

            {/* CTA */}
            <div className="text-center">
              <Link href="/why-mrclinc">
                <Button variant="outline">
                  Learn why patients choose MrClinc →
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================
            WHY ANTALYA
            ============================================ */}
        <section className="py-20" style={{ backgroundColor: '#F0F7FA' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Why Antalya?
                </h2>
                <p className="text-gray-600 mb-8">
                  Turkey is a widely recognised destination for international healthcare travel. 
                  Antalya offers direct flights from UK cities in under four hours.
                </p>
                <Link href="/why-antalya">
                  <Button variant="outline">
                    Learn More About Antalya
                  </Button>
                </Link>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/antalya-coastline.jpg"
                    alt="Antalya coastline"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
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
                    "Prepare your case for coordination and onward clinical review",
                    "Connect you with the appropriate clinical channel",
                    "Track your process with a unique reference code",
                    "Provide free second-opinion pathways for cancer & general surgery patients"
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
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100/50">
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
                    "We do not provide medical advice or treatment",
                    "We do not choose or recommend specific clinics",
                    "We do not handle your medical documents",
                    "We do not make decisions on your behalf"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#EF4444' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="text-gray-500">{item}</span>
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
        <section className="py-16" style={{ backgroundColor: '#1B4965' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Begin?
            </h2>
            <p className="mb-8 max-w-2xl mx-auto" style={{ color: '#B3DDED' }}>
              Submit a request. We'll prepare your case and connect you with the appropriate channel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/apply">
                <Button variant="accent" size="lg">
                  Submit Your Request
                </Button>
              </Link>
              <Link 
                href="/services#second-opinion"
                className="text-white underline hover:opacity-80 text-sm"
              >
                Free Second Opinion
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
