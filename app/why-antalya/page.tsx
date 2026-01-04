import Link from "next/link";
<<<<<<< HEAD
import Image from "next/image";
=======
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

export default function WhyAntalyaPage() {
<<<<<<< HEAD
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* ============================================
            SECTION 1: HERO
            ============================================ */}
        <section className="relative min-h-[500px] h-screen flex items-center justify-center">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <Image
              src="/images/hero-antalya-panorama.jpg"
              alt="Antalya city skyline panorama"
              fill
              className="object-cover"
              priority
            />
            <div 
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(30, 58, 95, 0.85) 0%, rgba(30, 58, 95, 0.6) 50%, rgba(30, 58, 95, 0.4) 100%)' }}
            />
          </div>
          
          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Why Antalya?
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              The question is not whether cross-border healthcare exists. It's whether the destination supports coordination, access, and decision-making when it matters.
            </p>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-white opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* ============================================
            SECTION 2: STATS BAND
            ============================================ */}
        <section style={{ backgroundColor: '#1e3a5f' }} className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold text-white mb-2">1.2M+</p>
                <p className="text-gray-300 text-sm">International patients annually (Turkey-wide)</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-white mb-2">~4 hrs</p>
                <p className="text-gray-300 text-sm">Direct flight from the UK</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            SECTION 3: CONTEXT
            ============================================ */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
              Why Patients Look Beyond Their Local System
            </h2>
            
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                Healthcare decisions are shaped by access, timing, and system capacity. In many national systems, non-urgent procedures involve extended scheduling timelines—sometimes measured in months rather than weeks.
              </p>
              <p>
                When coordination and availability become deciding factors, some patients explore cross-border options as part of their decision process. This isn't about escaping care—it's about expanding the range of when and where that care can happen.
              </p>
            </div>

            {/* Blockquote */}
            <blockquote 
              className="mt-10 pl-6 border-l-4 italic text-gray-700"
              style={{ borderColor: '#1e3a5f' }}
            >
              <p className="mb-3">
                "The NHS remains excellent for emergencies and complex care. For scheduled procedures, timing becomes a personal equation."
              </p>
              <cite className="block text-right text-sm text-gray-500 not-italic">
                — Context, not criticism
              </cite>
            </blockquote>
          </div>
        </section>

        {/* ============================================
            SECTION 4: GLOBAL DESTINATION
            ============================================ */}
        <section className="py-20" style={{ backgroundColor: '#f8f9fa' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="relative h-80 md:h-96 rounded-lg overflow-hidden">
                <Image
                  src="/images/medical-district.jpg"
                  alt="Modern medical district in Antalya"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Text */}
              <div>
                <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                  A Widely Used Destination for Cross-Border Healthcare
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Turkey welcomes over 1.2 million international patients each year. This volume reflects an established cross-border healthcare environment with processes designed for international patient flow.
                  </p>
                  <p>
                    For patients exploring options outside their home country, this means entering a system where coordination pathways already exist—rather than being built from scratch.
                  </p>
                </div>
              </div>
=======
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
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
            </div>
          </div>
        </section>

<<<<<<< HEAD
        {/* ============================================
            SECTION 5: ACCESSIBILITY
            ============================================ */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
              Accessibility from the UK
            </h2>
            <p className="text-gray-600 leading-relaxed text-center max-w-3xl mx-auto mb-12">
              Antalya is reachable via direct flights from the UK in under four hours. As one of the world's most visited cities, it offers established international travel infrastructure and year-round accessibility. Major UK airports—including London, Manchester, Birmingham, and Edinburgh—operate regular direct connections.
            </p>

            {/* Map Image */}
            <div className="flex justify-center mb-12">
              <div className="relative w-full max-w-xl h-64">
                <Image
                  src="/images/uk-antalya-map.jpg"
                  alt="Flight route from UK to Antalya"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Icon Cards */}
            <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto">
              <div className="text-center">
                <div 
                  className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-full"
                  style={{ backgroundColor: '#f0f7fa' }}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#1e3a5f' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-900">Direct Flights Daily</p>
              </div>
              <div className="text-center">
                <div 
                  className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-full"
                  style={{ backgroundColor: '#f0f7fa' }}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#1e3a5f' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-900">~4 hrs Flight Time</p>
              </div>
              <div className="text-center">
                <div 
                  className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-full"
                  style={{ backgroundColor: '#f0f7fa' }}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#1e3a5f' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-900">Year-Round Access</p>
              </div>
=======
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
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
            </div>
          </div>
        </section>

<<<<<<< HEAD
        {/* ============================================
            SECTION 6: INFRASTRUCTURE
            ============================================ */}
        <section className="py-20" style={{ backgroundColor: '#f8f9fa' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
              Infrastructure & Coordination Readiness
            </h2>
            <p className="text-gray-600 leading-relaxed text-center max-w-3xl mx-auto mb-12">
              Healthcare coordination works best when services, logistics, and support systems operate within a centralised environment. Antalya functions as a hub where these components are geographically aligned.
            </p>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div 
                  className="w-12 h-12 mb-4 flex items-center justify-center rounded-lg"
                  style={{ backgroundColor: '#f0f7fa' }}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#1e3a5f' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Centralised Medical District</h3>
                <p className="text-gray-600 text-sm">
                  Major facilities clustered within coordinated geographic zones, reducing friction in cross-border care
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div 
                  className="w-12 h-12 mb-4 flex items-center justify-center rounded-lg"
                  style={{ backgroundColor: '#f0f7fa' }}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#1e3a5f' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Integrated Support Services</h3>
                <p className="text-gray-600 text-sm">
                  Accommodation, transport, and patient services aligned to healthcare timelines
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div 
                  className="w-12 h-12 mb-4 flex items-center justify-center rounded-lg"
                  style={{ backgroundColor: '#f0f7fa' }}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#1e3a5f' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">English-Language Operations</h3>
                <p className="text-gray-600 text-sm">
                  Patient coordinators, clinic staff, and support teams operate fluently in English
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            SECTION 7: EXPERIENCE SECTION
            ============================================ */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
              An Established Environment
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Cross-border healthcare in Turkey operates within an established system shaped by years of international patient flow. Processes, logistics, and coordination pathways are designed to function at scale without requiring patients to navigate the system alone.
            </p>
          </div>
        </section>

        {/* ============================================
            SECTION 8: ANTALYA VISUAL SHOWCASE
            ============================================ */}
        <section className="py-20" style={{ backgroundColor: '#f8f9fa' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-semibold text-gray-900 mb-12 text-center">
              Antalya at a Glance
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                <Image
                  src="/images/medical-district.jpg"
                  alt="Modern City Center"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                  <p className="text-white text-sm p-3">Modern City Center</p>
                </div>
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                <Image
                  src="/images/airport-terminal.jpg"
                  alt="International Airport"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                  <p className="text-white text-sm p-3">International Airport</p>
                </div>
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                <Image
                  src="/images/coastal-cityscape.jpg"
                  alt="Coastal Setting"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                  <p className="text-white text-sm p-3">Coastal Setting</p>
                </div>
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                <Image
                  src="/images/mountain-backdrop.jpg"
                  alt="Natural Environment"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                  <p className="text-white text-sm p-3">Natural Environment</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            SECTION 9: PRACTICAL CONSIDERATIONS
            ============================================ */}
        <section className="py-20" style={{ backgroundColor: '#eef1f4' }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
              Practical Considerations
            </h2>
            
            <div className="space-y-4 text-gray-600 leading-relaxed text-center">
              <p>
                For some patients, decision-making includes practical factors such as timing, logistics, and overall planning of care.
              </p>
              <p>
                Different destinations offer different coordination environments. Patients may choose to explore these alongside their local options as part of their decision process.
              </p>
            </div>

            {/* Callout */}
            <p className="mt-10 text-center text-lg text-gray-700">
              Understanding your options is part of making a calm, informed decision.
            </p>
          </div>
        </section>

        {/* ============================================
            SECTION 10: DISCLAIMER
            ============================================ */}
        <section className="py-12 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div 
              className="rounded-lg p-6 border"
              style={{ backgroundColor: '#f8f9fa', borderColor: '#e5e7eb' }}
            >
              <p className="text-gray-500 text-sm leading-relaxed">
                MrClinc does not operate, endorse, or evaluate individual clinics or healthcare providers. We do not guarantee outcomes, pricing, or availability. All medical decisions and agreements are made directly between patients and healthcare providers.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================
            SECTION 11: CTA SECTION
            ============================================ */}
        <section className="py-16" style={{ backgroundColor: '#1e3a5f' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Begin?
            </h2>
            <p className="text-gray-300 mb-2">
              Submit a request. We prepare your case and connect you with the appropriate specialist channel.
            </p>
            <p className="text-gray-400 italic mb-8">
              The decision remains yours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/apply">
                <Button variant="accent" size="lg">Submit Your Request</Button>
              </Link>
              <Link 
                href="/services"
                className="text-white underline hover:opacity-80 text-sm"
              >
                Back to Services
=======
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
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
