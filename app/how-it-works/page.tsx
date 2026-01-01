import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

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
      <main className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-primary-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold mb-4">How It Works</h1>
              <p className="text-xl text-primary-100">
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
                    <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                      {step.number}
                    </div>
                    {idx < steps.length - 1 && (
                      <div className="w-0.5 h-full bg-primary-200 mx-auto mt-4" style={{ minHeight: "100px" }} />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h2>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    <Card variant="bordered">
                      <CardContent className="py-4">
                        <ul className="space-y-2">
                          {step.details.map((detail, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-3 text-sm">
                              <svg className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-gray-600">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
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
                <Card key={boundary.title} variant="bordered">
                  <CardContent className="py-6">
                    <h3 className={`text-lg font-bold mb-4 ${boundary.positive ? "text-success-700" : "text-gray-700"}`}>
                      {boundary.title}
                    </h3>
                    <ul className="space-y-3">
                      {boundary.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm">
                          {boundary.positive ? (
                            <svg className="w-5 h-5 text-success-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )}
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Second Opinion */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card variant="bordered" className="bg-success-50 border-success-200">
              <CardContent className="py-8">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="w-16 h-16 bg-success-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-success-900 mb-2">Free Second Opinion</h3>
                    <p className="text-success-800 mb-4">
                      For Cancer and General Surgery cases, we coordinate free professional reviews of your diagnosis and treatment plan. Specialists in Antalya review your case remotely - no travel required, no cost, no obligation.
                    </p>
                    <Link href="/services#second-opinion">
                      <Button variant="success">Learn More</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-primary-100 mb-8">
              Submit your request today. It's free, with no obligation at any stage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apply">
                <Button variant="accent" size="lg">Submit Request</Button>
              </Link>
              <Link href="/faq">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-primary-800">
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
