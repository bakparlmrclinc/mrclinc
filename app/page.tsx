import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function HomePage() {
  const services = [
    {
      title: "Aesthetic Surgery",
      description: "Face, breast, and body procedures",
      href: "/services#aesthetic",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Cancer Surgery",
      description: "Oncological surgical procedures",
      href: "/services#cancer",
      badge: "Free Second Opinion",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      title: "General Surgery",
      description: "Non-oncological procedures",
      href: "/services#general",
      badge: "Free Second Opinion",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    }
  ];

  const steps = [
    { number: 1, title: "Submit Request", description: "Fill out our simple form with your service needs" },
    { number: 2, title: "Receive Quotes", description: "Clinics review and send quotes within 48-72 hours" },
    { number: 3, title: "Compare & Decide", description: "You compare options and make your own decision" }
  ];

  const stats = [
    { value: "1.2M+", label: "International patients visit Turkey annually" },
    { value: "50+", label: "JCI-accredited hospitals in Turkey" },
    { value: "Free", label: "Our coordination service for patients" }
  ];

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary-900 to-primary-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Connecting UK Patients with Antalya Healthcare
              </h1>
              <p className="text-xl text-primary-100 mb-8">
                We coordinate pathways between UK patients and Turkish healthcare providers. 
                Submit your request, receive quotes directly from clinics, and make your own informed decision.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/apply">
                  <Button variant="accent" size="lg">Submit Request</Button>
                </Link>
                <Link href="/services#second-opinion">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-primary-700">
                    Free Second Opinion
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-primary-200 mt-6">
                Our coordination service is free for patients. You only pay the clinic you choose.
              </p>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We coordinate pathways for surgical services in Antalya, Turkey
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {services.map((service) => (
                <Link key={service.title} href={service.href}>
                  <Card variant="bordered" className="h-full hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="py-6">
                      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 mb-4">
                        {service.icon}
                      </div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{service.title}</h3>
                        {service.badge && (
                          <Badge variant="success" size="sm">{service.badge}</Badge>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm">{service.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/services">
                <Button variant="outline">View All Services</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A simple, transparent process that keeps you in control
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step) => (
                <div key={step.number} className="text-center">
                  <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/how-it-works">
                <Button variant="outline">Learn More</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Second Opinion Banner */}
        <section className="py-12 bg-success-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-success-900">Free Second Opinion</h2>
                  <p className="text-success-700">
                    For Cancer and General Surgery cases, get a free professional review of your diagnosis. No cost, no obligation, no travel required.
                  </p>
                </div>
              </div>
              <Link href="/apply?type=second-opinion">
                <Button variant="success">Request Free Second Opinion</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {stats.map((stat, idx) => (
                <div key={idx}>
                  <p className="text-4xl font-bold text-primary-600 mb-2">{stat.value}</p>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Antalya */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Antalya?</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-600">Shorter wait times compared to NHS elective procedures</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-600">Competitive value compared to UK private care</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-600">Internationally accredited hospitals and experienced specialists</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-600">Direct flights from UK cities (under 4 hours)</p>
                  </div>
                </div>
                <div className="mt-6">
                  <Link href="/why-antalya">
                    <Button variant="outline">Learn More</Button>
                  </Link>
                </div>
              </div>
              <div className="bg-gray-100 rounded-2xl p-8">
                <p className="text-gray-500 text-sm mb-4">Real Statistics</p>
                <p className="text-gray-900 mb-6">
                  Turkey welcomes over <span className="font-bold text-primary-600">1.2 million</span> international patients annually for healthcare services. Antalya, as the world's 8th most visited city, combines healthcare excellence with established tourism infrastructure.
                </p>
                <p className="text-sm text-gray-500">
                  Sources: Turkish Ministry of Health, Global Tourism Statistics
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card variant="bordered" className="bg-white">
              <CardContent className="py-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Transparency</h2>
                <p className="text-gray-600 mb-6">
                  MrClinc is a coordination platform, not a medical provider or agency. We connect you with healthcare providers - you make all the decisions. Our service is free for patients, and we never pressure you to proceed.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Badge variant="secondary">Coordination Only</Badge>
                  <Badge variant="secondary">You Control Decisions</Badge>
                  <Badge variant="secondary">Free for Patients</Badge>
                  <Badge variant="secondary">No Pressure</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Explore Your Options?</h2>
            <p className="text-primary-100 mb-8 text-lg">
              Submit your request today. It's free, and there's no obligation to proceed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apply">
                <Button variant="accent" size="lg">Submit Request</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-primary-800">
                  Contact Us
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
