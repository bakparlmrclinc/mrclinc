import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

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
      <main className="min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
        {/* Hero */}
        <section className="py-16" style={{ backgroundColor: '#1B4965' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold mb-4 text-white">Why Antalya?</h1>
              <p className="text-xl" style={{ color: '#B3DDED' }}>
                Discover why thousands of UK patients choose Antalya for their healthcare needs.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {stats.map((stat, idx) => (
                <div key={idx}>
                  <p className="text-3xl font-bold mb-2" style={{ color: '#1B4965' }}>{stat.value}</p>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Advantages Grid */}
        <section className="py-16" style={{ backgroundColor: '#F9FAFB' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">Key Advantages</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advantages.map((advantage, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: '#F0F7FA', color: '#1B4965' }}
                  >
                    {advantage.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{advantage.title}</h3>
                  <p className="text-gray-600 text-sm">{advantage.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* UK Comparison */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">A Practical Comparison</h2>
            
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: '#F9FAFB' }}>
                      <th className="text-left py-4 px-4 font-semibold text-gray-900 border-b border-gray-200">Factor</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-900 border-b border-gray-200">UK (NHS)</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-900 border-b border-gray-200">UK (Private)</th>
                      <th className="text-left py-4 px-4 font-semibold border-b border-gray-200" style={{ color: '#1B4965' }}>Antalya</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="py-4 px-4 text-gray-600">Wait Time</td>
                      <td className="py-4 px-4 text-gray-600">Weeks to months</td>
                      <td className="py-4 px-4 text-gray-600">Days to weeks</td>
                      <td className="py-4 px-4 font-medium" style={{ color: '#1B4965' }}>Days to weeks</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 text-gray-600">Cost</td>
                      <td className="py-4 px-4 text-gray-600">Free (taxpayer funded)</td>
                      <td className="py-4 px-4 text-gray-600">Higher</td>
                      <td className="py-4 px-4 font-medium" style={{ color: '#1B4965' }}>Competitive</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 text-gray-600">Elective Availability</td>
                      <td className="py-4 px-4 text-gray-600">Limited</td>
                      <td className="py-4 px-4 text-gray-600">Good</td>
                      <td className="py-4 px-4 font-medium" style={{ color: '#1B4965' }}>Excellent</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 text-gray-600">Travel Required</td>
                      <td className="py-4 px-4 text-gray-600">No</td>
                      <td className="py-4 px-4 text-gray-600">No</td>
                      <td className="py-4 px-4 font-medium" style={{ color: '#1B4965' }}>Yes (~4 hours)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-500 p-4 border-t border-gray-100">
                This is a general comparison. Individual experiences may vary. Always consult with healthcare providers for your specific situation.
              </p>
            </div>
          </div>
        </section>

        {/* Antalya as a Destination */}
        <section className="py-16" style={{ backgroundColor: '#F9FAFB' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Antalya: More Than Healthcare</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { title: "Tourism Infrastructure", desc: "As the 8th most visited city in the world, Antalya has excellent tourism infrastructure including international hotels, English-speaking services, and reliable transportation." },
                { title: "Recovery Environment", desc: "Combine recovery with relaxation. The Mediterranean climate and resort atmosphere can make post-procedure recovery more comfortable than being at home." },
                { title: "Companion-Friendly", desc: "Family members or friends can accompany you. While you recover, they can enjoy Antalya's beaches, historic sites, and local cuisine." },
                { title: "Established Healthcare Hub", desc: "Antalya has developed as a healthcare destination with specialized medical tourism coordinators, translators, and patient services built into the local healthcare ecosystem." }
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16" style={{ backgroundColor: '#1B4965' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-white">Explore Your Options</h2>
            <p className="mb-8" style={{ color: '#B3DDED' }}>
              Submit a request to receive quotes from qualified healthcare providers in Antalya. No obligation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apply">
                <Button variant="accent" size="lg">Submit Request</Button>
              </Link>
              <Link href="/services">
                <Button 
                  variant="outline" 
                  size="lg" 
                  style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}
                >
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
