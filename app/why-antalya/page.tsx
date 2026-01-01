import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

export default function WhyAntalyaPage() {
  const advantages = [
    {
      title: "Shorter Wait Times",
      description: "While NHS wait times for elective procedures can extend to months, Turkish healthcare providers often offer appointments within weeks.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Competitive Value",
      description: "Turkish healthcare offers compelling value compared to UK private care, with many procedures available at significantly lower costs without compromising quality.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "International Accreditation",
      description: "Turkey has over 50 JCI-accredited hospitals, meeting the same international standards as leading facilities worldwide.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    },
    {
      title: "Experienced Specialists",
      description: "Turkish surgeons are internationally trained and experienced, many having practiced in Europe, the US, and other leading healthcare markets.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      title: "Modern Facilities",
      description: "Hospitals and clinics in Antalya feature state-of-the-art equipment, modern operating theaters, and comfortable patient facilities.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      title: "Easy Access",
      description: "Antalya has an international airport with direct flights from major UK cities. The journey is under 4 hours, making travel convenient.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  const stats = [
    { value: "1.2M+", label: "International patients visit Turkey annually for healthcare" },
    { value: "50+", label: "JCI-accredited hospitals across Turkey" },
    { value: "8th", label: "Most visited city in the world (Antalya)" },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-primary-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold mb-4">Why Antalya?</h1>
              <p className="text-xl text-primary-100">
                Discover why thousands of UK patients choose Antalya for their healthcare needs.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-white py-12 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {stats.map((stat, idx) => (
                <div key={idx}>
                  <p className="text-3xl font-bold text-primary-600 mb-2">{stat.value}</p>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Advantages Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">Key Advantages</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advantages.map((advantage, idx) => (
                <Card key={idx} variant="bordered">
                  <CardContent className="py-6">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 mb-4">
                      {advantage.icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{advantage.title}</h3>
                    <p className="text-gray-600 text-sm">{advantage.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* UK Comparison */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">A Practical Comparison</h2>
            
            <Card variant="bordered">
              <CardContent className="py-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Factor</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">UK (NHS)</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">UK (Private)</th>
                        <th className="text-left py-3 px-4 font-semibold text-primary-600">Antalya</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="py-3 px-4 text-gray-600">Wait Time</td>
                        <td className="py-3 px-4 text-gray-600">Weeks to months</td>
                        <td className="py-3 px-4 text-gray-600">Days to weeks</td>
                        <td className="py-3 px-4 text-primary-600 font-medium">Days to weeks</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-gray-600">Cost</td>
                        <td className="py-3 px-4 text-gray-600">Free (taxpayer funded)</td>
                        <td className="py-3 px-4 text-gray-600">Higher</td>
                        <td className="py-3 px-4 text-primary-600 font-medium">Competitive</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-gray-600">Elective Availability</td>
                        <td className="py-3 px-4 text-gray-600">Limited</td>
                        <td className="py-3 px-4 text-gray-600">Good</td>
                        <td className="py-3 px-4 text-primary-600 font-medium">Excellent</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-gray-600">Travel Required</td>
                        <td className="py-3 px-4 text-gray-600">No</td>
                        <td className="py-3 px-4 text-gray-600">No</td>
                        <td className="py-3 px-4 text-primary-600 font-medium">Yes (~4 hours)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  This is a general comparison. Individual experiences may vary. Always consult with healthcare providers for your specific situation.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Antalya as a Destination */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Antalya: More Than Healthcare</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <Card variant="bordered">
                <CardContent className="py-6">
                  <h3 className="font-bold text-gray-900 mb-3">Tourism Infrastructure</h3>
                  <p className="text-gray-600 text-sm">
                    As the 8th most visited city in the world, Antalya has excellent tourism infrastructure including international hotels, English-speaking services, and reliable transportation.
                  </p>
                </CardContent>
              </Card>
              <Card variant="bordered">
                <CardContent className="py-6">
                  <h3 className="font-bold text-gray-900 mb-3">Recovery Environment</h3>
                  <p className="text-gray-600 text-sm">
                    Combine recovery with relaxation. The Mediterranean climate and resort atmosphere can make post-procedure recovery more comfortable than being at home.
                  </p>
                </CardContent>
              </Card>
              <Card variant="bordered">
                <CardContent className="py-6">
                  <h3 className="font-bold text-gray-900 mb-3">Companion-Friendly</h3>
                  <p className="text-gray-600 text-sm">
                    Family members or friends can accompany you. While you recover, they can enjoy Antalya's beaches, historic sites, and local cuisine.
                  </p>
                </CardContent>
              </Card>
              <Card variant="bordered">
                <CardContent className="py-6">
                  <h3 className="font-bold text-gray-900 mb-3">Established Healthcare Hub</h3>
                  <p className="text-gray-600 text-sm">
                    Antalya has developed as a healthcare destination with specialized medical tourism coordinators, translators, and patient services built into the local healthcare ecosystem.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Explore Your Options</h2>
            <p className="text-primary-100 mb-8">
              Submit a request to receive quotes from qualified healthcare providers in Antalya. No obligation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apply">
                <Button variant="accent" size="lg">Submit Request</Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-primary-800">
                  View Services
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
