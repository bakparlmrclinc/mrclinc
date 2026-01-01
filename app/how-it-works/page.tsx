import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

export default function HowItWorksPage() {
  const steps = [
    {
      number: 1,
      title: "Submit Your Request",
      description: "Fill out our simple online form. Select your service, provide basic information, and submit. It takes just a few minutes and is completely free.",
      details: [
        "Choose your service category (Aesthetic, Cancer, or General Surgery)",
        "Provide contact information and brief description",
        "Optionally enter a Pathway Developer code if you have one",
        "Receive your tracking code instantly"
      ]
    },
    {
      number: 2,
      title: "Receive Quotes from Clinics",
      description: "Within 48-72 hours, qualified healthcare providers in Antalya review your request and send quotes directly to you.",
      details: [
        "Multiple clinics review your request",
        "Each clinic sends a detailed quote and treatment plan",
        "Information delivered directly to your email",
        "Track your request status anytime with your tracking code"
      ]
    },
    {
      number: 3,
      title: "Compare and Decide",
      description: "Review the quotes, ask questions, and make your own informed decision. There's no obligation to proceed at any stage.",
      details: [
        "Compare prices, techniques, and clinic credentials",
        "Ask clinics questions directly via email or video call",
        "Take your time - no pressure to decide quickly",
        "You control all decisions"
      ]
    }
  ];

  const boundaries = [
    {
      title: "What We Do",
      items: [
        "Coordinate introductions between patients and clinics",
        "Facilitate initial communication",
        "Provide request tracking",
        "Offer free Second Opinion coordination for cancer/surgery cases"
      ],
      positive: true
    },
    {
      title: "What We Don't Do",
      items: [
        "Provide medical advice or recommendations",
        "Choose clinics on your behalf",
        "Handle payments or negotiate prices",
        "Accompany patients during travel",
        "Set or control clinic pricing"
      ],
      positive: false
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
        {/* Hero */}
        <section className="py-16" style={{ backgroundColor: '#1B4965' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold mb-4 text-white">How It Works</h1>
              <p className="text-xl" style={{ color: '#B3DDED' }}>
                A simple, transparent process that puts you in control of every decision.
              </p>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {steps.map((step, idx) => (
                <div key={step.number} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white"
                      style={{ backgroundColor: '#1B4965' }}
                    >
                      {step.number}
                    </div>
                    {idx < steps.length - 1 && (
                      <div className="w-0.5 h-full mx-auto mt-4" style={{ minHeight: "100px", backgroundColor: '#D9EEF5' }} />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h2>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    <div className="bg-white rounded-xl border border-gray-200 p-4">
                      <ul className="space-y-2">
                        {step.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-3 text-sm">
                            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#1B4965' }}>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-600">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Boundaries */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">Understanding Our Role</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {boundaries.map((boundary) => (
                <div key={boundary.title} className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 
                    className="text-lg font-bold mb-4"
                    style={{ color: boundary.positive ? '#166534' : '#374151' }}
                  >
                    {boundary.title}
                  </h3>
                  <ul className="space-y-3">
                    {boundary.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm">
                        {boundary.positive ? (
                          <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#22C55E' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#9CA3AF' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Second Opinion */}
        <section className="py-16" style={{ backgroundColor: '#F9FAFB' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-xl p-8" style={{ backgroundColor: '#DCFCE7', border: '1px solid #BBF7D0' }}>
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#BBF7D0' }}
                >
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#166534' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#14532D' }}>Free Second Opinion</h3>
                  <p className="mb-4" style={{ color: '#166534' }}>
                    For Cancer and General Surgery cases, we coordinate free professional reviews of your diagnosis and treatment plan. Specialists in Antalya review your case remotely - no travel required, no cost, no obligation.
                  </p>
                  <Link href="/services#second-opinion">
                    <Button variant="success">Learn More</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16" style={{ backgroundColor: '#1B4965' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-white">Ready to Get Started?</h2>
            <p className="mb-8" style={{ color: '#B3DDED' }}>
              Submit your request today. It's free, with no obligation at any stage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apply">
                <Button variant="accent" size="lg">Submit Request</Button>
              </Link>
              <Link href="/faq">
                <Button 
                  variant="outline" 
                  size="lg" 
                  style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}
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
