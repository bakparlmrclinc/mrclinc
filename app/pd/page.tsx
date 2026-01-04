import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

export default function PDInfoPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
        {/* ============================================
            SECTION 1: HERO
            ============================================ */}
        <section className="py-12" style={{ backgroundColor: '#1B4965' }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-4">
              Our Pathway Developers
            </h1>
            <p className="text-lg text-gray-300">
              MrClinc works with a limited number of independent professionals who operate under strict ethical and coordination standards.
            </p>
          </div>
        </section>

        {/* ============================================
            SECTION 2: WHAT IS A PATHWAY DEVELOPER?
            ============================================ */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              What is a Pathway Developer?
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                A Pathway Developer (PD) is an independent professional who helps make MrClinc discoverable within trusted, real-world networks.
              </p>
              <p>
                PDs do not provide medical advice, do not recommend clinics, and do not influence treatment decisions. Their role is limited to pathway awareness and coordination entry.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================
            SECTION 3: HOW WE SELECT PATHWAY DEVELOPERS
            ============================================ */}
        <section className="py-16" style={{ backgroundColor: '#F9FAFB' }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              How We Select Pathway Developers
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              MrClinc does not operate an open ambassador or referral program. Pathway Developers are selected through a controlled, invitation-based process.
            </p>
            
            <p className="font-semibold text-gray-900 mb-4">Selection is based on:</p>
            
            <div className="space-y-4">
              <div 
                className="rounded-lg p-4"
                style={{ backgroundColor: '#F0F7FA' }}
              >
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#22C55E' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">Professional Background</p>
                    <p className="text-sm text-gray-600">Healthcare-related experience or trusted community role</p>
                  </div>
                </div>
              </div>

              <div 
                className="rounded-lg p-4"
                style={{ backgroundColor: '#F0F7FA' }}
              >
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#22C55E' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">Ethical Alignment</p>
                    <p className="text-sm text-gray-600">Understanding of patient boundaries and decision autonomy</p>
                  </div>
                </div>
              </div>

              <div 
                className="rounded-lg p-4"
                style={{ backgroundColor: '#F0F7FA' }}
              >
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#22C55E' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">Coordination Capability</p>
                    <p className="text-sm text-gray-600">Ability to operate within strict platform standards</p>
                  </div>
                </div>
              </div>

              <div 
                className="rounded-lg p-4"
                style={{ backgroundColor: '#F0F7FA' }}
              >
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#22C55E' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">Transparency Commitment</p>
                    <p className="text-sm text-gray-600">Willingness to work within traceable, documented processes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            SECTION 4: CLEAR ROLE BOUNDARIES
            ============================================ */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Clear Role Boundaries
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Pathway Developers operate under strict limitations to protect patient autonomy and maintain coordination integrity.
            </p>

            <div 
              className="rounded-xl p-6 mb-6"
              style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA' }}
            >
              <p className="font-semibold text-gray-900 mb-4">Pathway Developers do not:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#EF4444' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-gray-700">Provide medical advice or clinical opinions</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#EF4444' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-gray-700">Recommend specific clinics or doctors</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#EF4444' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-gray-700">Discuss pricing, quotes, or treatment terms</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#EF4444' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-gray-700">Collect payments or handle financial arrangements</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#EF4444' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-gray-700">Access or handle patient medical documents</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#EF4444' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-gray-700">Influence or pressure treatment decisions</span>
                </li>
              </ul>
            </div>

            <p className="text-sm text-gray-500">
              These boundaries are non-negotiable and monitored through platform oversight.
            </p>
          </div>
        </section>

        {/* ============================================
            SECTION 5: PLATFORM ACCOUNTABILITY
            ============================================ */}
        <section className="py-16" style={{ backgroundColor: '#F9FAFB' }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Platform Accountability
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                All Pathway Developer activity is tracked through the MrClinc platform. Every case is assigned a unique reference code, ensuring full traceability from first contact to completion.
              </p>
              <p>
                If standards are not maintained, PD status may be reviewed or revoked.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================
            SECTION 6: SOFT CTA
            ============================================ */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Questions about our coordination model?
            </h2>
            <p className="text-gray-600 mb-6">
              Learn how MrClinc structures its pathway coordination system.
            </p>
            <Link href="/how-it-works">
              <Button variant="primary">How It Works</Button>
            </Link>
          </div>
        </section>

        {/* ============================================
            SECTION 7: FOR EXISTING PDs
            ============================================ */}
        <section className="py-12" style={{ backgroundColor: '#1B4965' }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-lg font-semibold text-white mb-2">
              For Existing Pathway Developers
            </h2>
            <p className="text-gray-300 text-sm mb-4">
              Access your portal to view cases and complete training.
            </p>
            <Link href="/pd/login">
              <Button 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10"
              >
                PD Portal Login
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
