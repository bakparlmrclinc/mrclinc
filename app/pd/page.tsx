import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

export default function PDInfoPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
<<<<<<< HEAD
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
=======
        {/* Hero */}
        <section className="py-16" style={{ backgroundColor: '#1B4965' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4" style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}>
                Invite Only
              </span>
              <h1 className="text-4xl font-bold mb-4 text-white">Become a Pathway Developer</h1>
              <p className="text-xl" style={{ color: '#B3DDED' }}>
                Join our network of independent professionals helping UK patients access healthcare pathways in Turkey.
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
              </p>
            </div>
          </div>
        </section>

<<<<<<< HEAD
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
=======
        {/* What is a PD */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What is a Pathway Developer?</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                A Pathway Developer (PD) is an <strong>independent professional</strong> who creates awareness about MrClinc within their own networks. PDs help patients discover our coordination services and ensure requests are submitted correctly.
              </p>
              
              <div className="rounded-xl p-6 mb-8" style={{ backgroundColor: '#F0F7FA', border: '1px solid #D9EEF5' }}>
                <h3 className="font-semibold mb-3" style={{ color: '#1B4965' }}>Important Distinctions</h3>
                <p className="text-sm" style={{ color: '#2C5F7C' }}>
                  PDs are <strong>not</strong> employees, sales agents, or medical advisors. They are independent partners who operate within their own professional channels. PDs do not provide medical advice, recommend specific clinics, or handle patient payments.
                </p>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4">PD Responsibilities</h3>
              <div className="space-y-4 mb-8">
                {[
                  { title: "Build Your Own Channel", desc: "You choose where and how to create awareness - GP practices, pharmacies, community groups, etc.", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
                  { title: "Ensure Quality Case Entry", desc: "Help patients understand the process and submit complete requests through the platform.", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
                  { title: "Follow Platform Standards", desc: "Maintain boundaries - no medical advice, no clinic recommendations, no pressure tactics.", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#F0F7FA' }}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#1B4965' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Earnings */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Partnership Earnings</h2>
              <p className="text-gray-600 mb-6">
                PDs earn partnership fees when cases they coordinate complete successfully. Earnings are paid twice monthly via bank transfer.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                  <p className="text-3xl font-bold mb-2" style={{ color: '#1B4965' }}>€250-€350</p>
                  <p className="text-gray-600">Per Aesthetic Surgery Case</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                  <p className="text-3xl font-bold mb-2" style={{ color: '#1B4965' }}>€1,000-€1,200</p>
                  <p className="text-gray-600">Per Medical Surgery Case</p>
                </div>
              </div>

              <p className="text-sm text-gray-500">
                Earnings include base fees plus performance bonuses. Only completed treatments generate earnings - incomplete or cancelled cases do not qualify.
              </p>
            </div>
          </div>
        </section>

        {/* How to Join */}
        <section className="py-16" style={{ backgroundColor: '#F9FAFB' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4" style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>
                Invite Only Program
              </span>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Become a PD</h2>
              <p className="text-gray-600 mb-8">
                The Pathway Developer program is currently invite-only. We carefully select partners who align with our values of ethical, patient-centered coordination.
              </p>
              
              <div className="bg-gray-100 rounded-xl p-8">
                <h3 className="font-semibold text-gray-900 mb-4">Interested in Joining?</h3>
                <p className="text-gray-600 mb-6">
                  If you're a healthcare professional, community leader, or have a network that could benefit from our services, contact us to express interest.
                </p>
                <Link href="/contact">
                  <Button variant="primary">Contact Us</Button>
                </Link>
              </div>
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
            </div>
          </div>
        </section>

<<<<<<< HEAD
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
=======
        {/* Already a PD */}
        <section className="py-16" style={{ backgroundColor: '#1B4965' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4 text-white">Already a Pathway Developer?</h2>
              <p className="mb-6" style={{ color: '#B3DDED' }}>
                Access your portal to view cases, track earnings, and complete education modules.
              </p>
              <Link href="/pd/login">
                <Button variant="outline" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}>
                  Login to PD Portal
                </Button>
              </Link>
            </div>
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
