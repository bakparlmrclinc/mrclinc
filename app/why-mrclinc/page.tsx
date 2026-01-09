import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

export default function WhyMrClincPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
        
        {/* Hero Section */}
        <section className="py-20" style={{ backgroundColor: '#1B4965' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Healthcare decisions are already difficult.<br />
              You don't have to make them alone.
            </h1>
            <p className="text-xl mb-8" style={{ color: '#B3DDED' }}>
              MrClinc was built for patients — not for clinics, doctors, or sales agendas.
            </p>
            <p className="text-lg max-w-3xl mx-auto" style={{ color: '#CAE9F5' }}>
              Seeking treatment abroad can involve uncertainty, distance, language barriers, and commercial pressure. 
              MrClinc exists to stand on the patient's side, providing clarity and structure without influence from providers.
            </p>
          </div>
        </section>

        {/* Section 1 - The Core Problem */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              The real challenges of treatment abroad
            </h2>
            <p className="text-gray-600 mb-6">
              Pursuing medical treatment overseas is not just a clinical decision.
            </p>
            <p className="text-gray-600 mb-4">It often involves:</p>
            <ul className="space-y-3 mb-8">
              {[
                "Complex processes",
                "Information overload and conflicting advice",
                "Trust being established remotely",
                "Exposure to sales-driven intermediaries or clinic marketing"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#1B4965' }}></span>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-600">
              This frequently leaves patients feeling pressured, rushed, or unsupported.
            </p>
            <p className="mt-6 font-medium" style={{ color: '#1B4965' }}>
              Patients do not need more promotion — they need clarity.
            </p>
          </div>
        </section>

        {/* Section 2 - Patient-Side Only */}
        <section className="py-16" style={{ backgroundColor: '#F0F7FA' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              We work for patients — not providers
            </h2>
            <p className="text-gray-600 mb-6">
              MrClinc is intentionally built from the patient's perspective.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <p className="font-medium text-gray-900 mb-3">What we do not do:</p>
                <ul className="space-y-2">
                  {[
                    "We do not represent clinics",
                    "We do not promote doctors",
                    "We do not sell treatments"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#EF4444' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-3">Our role is to:</p>
                <ul className="space-y-2">
                  {[
                    "Help patients understand their situation clearly",
                    "Enable access to reliable second opinions",
                    "Structure the process without pressure",
                    "Support progression only if and when the patient chooses"
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
            </div>

            <div 
              className="rounded-lg p-4 border"
              style={{ backgroundColor: '#E8F4F8', borderColor: '#B3DDED' }}
            >
              <p className="font-medium" style={{ color: '#1B4965' }}>
                If a patient decides not to proceed, that decision is fully respected.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 - No Clinics Listed */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Why aren't doctors or clinics listed?
            </h2>
            <p className="text-gray-600 mb-6">
              Because MrClinc is not a marketplace.
            </p>
            <p className="text-gray-600 mb-6">
              Listing providers inevitably creates promotion and directional pressure. 
              That compromises neutrality.
            </p>
            
            <p className="text-gray-600 mb-4">Within MrClinc:</p>
            <ul className="space-y-3 mb-8">
              {[
                "Providers enter the process only after the patient decides to move forward",
                "Medical decisions follow structured and professional pathways",
                "Control always remains with the patient"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#1B4965' }}></span>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>

            <p className="font-medium" style={{ color: '#1B4965' }}>
              Neutrality protects patients.
            </p>
          </div>
        </section>

        {/* Section 4 - Difference */}
        <section className="py-16" style={{ backgroundColor: '#F9FAFB' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              How MrClinc is different
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-100 rounded-xl p-6">
                <p className="font-semibold text-gray-900 mb-4">Traditional health tourism models:</p>
                <ul className="space-y-2">
                  {[
                    "Advertising-driven",
                    "Volume-focused",
                    "Sales-led",
                    "Represent clinic interests"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#9CA3AF' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="text-gray-500">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6 border-2" style={{ borderColor: '#1B4965' }}>
                <p className="font-semibold text-gray-900 mb-4">MrClinc:</p>
                <ul className="space-y-2">
                  {[
                    "No advertising pressure",
                    "No sales language",
                    "No provider promotion",
                    "Patient-centric, structured coordination"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#22C55E' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="font-medium text-center" style={{ color: '#1B4965' }}>
              Healthcare decisions should never feel like sales conversations.
            </p>
          </div>
        </section>

        {/* Section 5 - What MrClinc Does */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              What MrClinc provides
            </h2>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {[
                "Free rapid second opinions where appropriate",
                "Clear understanding of realistic options",
                "Structured coordination if the patient chooses to proceed",
                "Continuity from first inquiry through post-treatment support"
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-lg"
                  style={{ backgroundColor: '#F0F7FA' }}
                >
                  <svg className="w-6 h-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#1B4965' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <p className="text-sm text-gray-500 italic">
              MrClinc does not provide medical advice and does not replace clinical decision-making.
            </p>
          </div>
        </section>

        {/* Section 6 - Emotional Safety */}
        <section className="py-16" style={{ backgroundColor: '#F0F7FA' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Clarity, calm, and control
            </h2>
            <p className="text-gray-600 mb-6">
              Choosing treatment abroad is both a technical and emotional process. 
              MrClinc exists to reduce uncertainty, remove pressure, and give patients the structure and time they need to decide confidently.
            </p>
            <p className="text-gray-600 mb-2">
              Control stays with the patient.
            </p>
            <p className="font-medium" style={{ color: '#1B4965' }}>
              We simply make the path clearer.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16" style={{ backgroundColor: '#1B4965' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-6">
              How the MrClinc pathway works
            </h2>
            <Link href="/how-it-works">
              <Button variant="accent" size="lg">
                How It Works
              </Button>
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
