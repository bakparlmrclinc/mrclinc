import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

export default function HowItWorksPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
        {/* ============================================
            SECTION 1: HERO
            ============================================ */}
        <section className="py-12" style={{ backgroundColor: '#1e3a5f' }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              How It Works
            </h1>
            <p className="text-lg text-gray-300">
              A clear, step-by-step coordination process designed to support decision-making—without pressure.
            </p>
          </div>
        </section>

        {/* ============================================
            SECTION 2: PROCESS STEPS
            ============================================ */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              
              {/* Step 1 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white"
                    style={{ backgroundColor: '#1e3a5f' }}
                  >
                    1
                  </div>
                  <div className="w-0.5 h-full mx-auto mt-4" style={{ minHeight: "80px", backgroundColor: '#e5e7eb' }} />
                </div>
                <div className="flex-1 pb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">Submit Your Request</h2>
                  <p className="text-gray-600 mb-4">
                    Complete the online request form by selecting your service category and providing basic information.
                  </p>
                  <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#22c55e' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">Choose your service category (Aesthetic, Cancer, or General Surgery)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#22c55e' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">Provide contact details and a brief description</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#22c55e' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">Optionally enter a Pathway Developer (PD) code if you have one</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#22c55e' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">Receive your unique tracking reference code</span>
                      </li>
                    </ul>
                  </div>
                  <div 
                    className="rounded-lg p-3 border-l-4"
                    style={{ backgroundColor: '#fef3c7', borderLeftColor: '#f59e0b' }}
                  >
                    <p className="text-sm font-medium" style={{ color: '#92400e' }}>
                      No medical documents are uploaded at this stage.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white"
                    style={{ backgroundColor: '#1e3a5f' }}
                  >
                    2
                  </div>
                  <div className="w-0.5 h-full mx-auto mt-4" style={{ minHeight: "80px", backgroundColor: '#e5e7eb' }} />
                </div>
                <div className="flex-1 pb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">Case Preparation & Channel Connection</h2>
                  <p className="text-gray-600 mb-4">
                    We prepare your case and facilitate connection with the relevant clinical channel based on your selected service.
                  </p>
                  <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#22c55e' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">Case information is structured for coordination and onward clinical review</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#22c55e' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">The request is routed through the coordination pathway</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#22c55e' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">Clinics may contact patients directly if documents are required</span>
                      </li>
                    </ul>
                  </div>
                  <div 
                    className="rounded-lg p-3 border-l-4"
                    style={{ backgroundColor: '#fef3c7', borderLeftColor: '#f59e0b' }}
                  >
                    <p className="text-sm font-medium" style={{ color: '#92400e' }}>
                      MrClinc does not review medical records or make treatment decisions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white"
                    style={{ backgroundColor: '#1e3a5f' }}
                  >
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">Direct Clinic Communication</h2>
                  <p className="text-gray-600 mb-4">
                    If communication continues, it happens directly between the patient and the clinic.
                  </p>
                  <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#22c55e' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">Clinics may share information about potential next steps</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#22c55e' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">Patients ask questions directly</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#22c55e' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">Decisions are made at the patient's own pace</span>
                      </li>
                    </ul>
                  </div>
                  <div 
                    className="rounded-lg p-3 border-l-4"
                    style={{ backgroundColor: '#fee2e2', borderLeftColor: '#ef4444' }}
                  >
                    <p className="text-sm font-medium" style={{ color: '#991b1b' }}>
                      We encourage patients to discuss decisions with their local clinician as part of their overall care.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ============================================
            SECTION 3: UNDERSTANDING OUR ROLE
            ============================================ */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-gray-900 text-center mb-12">Understanding Our Role</h2>
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* What We Do */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4" style={{ color: '#166534' }}>What We Do</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#22c55e' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Coordinate pathway access between patients and clinics</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#22c55e' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Prepare cases for coordination and onward clinical handling</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#22c55e' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Enable request tracking via a reference code</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#22c55e' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Coordinate free second opinion pathways for cancer & general surgery cases</span>
                  </li>
                </ul>
              </div>

              {/* What We Don't Do */}
              <div className="bg-gray-50 rounded-xl border border-gray-100 p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">What We Don't Do</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#9ca3af' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-gray-500">Provide medical advice or treatment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#9ca3af' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-gray-500">Recommend or choose clinics</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#9ca3af' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-gray-500">Handle medical documents</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#9ca3af' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-gray-500">Make decisions on the patient's behalf</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#9ca3af' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-gray-500">Negotiate pricing or treatment terms</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* ============================================
            SECTION 4: FREE SECOND OPINION HIGHLIGHT
            ============================================ */}
        <section className="py-16" style={{ backgroundColor: '#F9FAFB' }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div 
              className="rounded-xl p-8"
              style={{ backgroundColor: '#fff7ed', border: '1px solid #fed7aa' }}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#ffedd5' }}
                >
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#ea580c' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2" style={{ color: '#9a3412' }}>
                    Free Second Opinion — Cancer & General Surgery
                  </h3>
                  <p className="mb-4" style={{ color: '#c2410c' }}>
                    For cancer and general surgery cases, patients may request a free evaluation from clinical teams. The clinic contacts patients directly if documents are needed. No cost. No obligation. No travel required.
                  </p>
                  <Link href="/services#second-opinion">
                    <Button variant="accent">Learn More</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            SECTION 5: CTA SECTION
            ============================================ */}
        <section className="py-16" style={{ backgroundColor: '#1e3a5f' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Begin?
            </h2>
            <p className="text-gray-300 mb-8">
              Submit your request. We prepare your case and support the coordination process from start to finish.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apply">
                <Button variant="accent" size="lg">Submit Request</Button>
              </Link>
              <Link href="/faq">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  View FAQ
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
