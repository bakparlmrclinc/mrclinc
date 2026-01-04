import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

<<<<<<< HEAD
=======
const services = [
  {
    id: "aesthetic",
    title: "Aesthetic Surgery",
    description: "Cosmetic procedures for face, breast, and body contouring",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    categories: [
      { name: "Face", procedures: ["Rhinoplasty", "Blepharoplasty", "Facelift", "Otoplasty", "Chin Surgery"] },
      { name: "Breast", procedures: ["Breast Augmentation", "Breast Lift", "Breast Reduction", "Gynecomastia"] },
      { name: "Body", procedures: ["Liposuction", "Tummy Tuck", "BBL", "Arm Lift", "Thigh Lift"] }
    ],
    freeConsultation: true,
    freeSecondOpinion: false
  },
  {
    id: "cancer",
    title: "Cancer Surgery",
    description: "Oncological surgical procedures across multiple specialties",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    categories: [
      { name: "Gastrointestinal", procedures: ["Esophageal", "Gastric", "Colon", "Rectal", "Liver", "Pancreatic"] },
      { name: "Thoracic", procedures: ["Lung Cancer", "Mediastinal Tumors"] },
      { name: "Other", procedures: ["Breast Cancer", "Gynecological", "Urological", "Thyroid", "Melanoma"] }
    ],
    freeConsultation: true,
    freeSecondOpinion: true
  },
  {
    id: "general",
    title: "General Surgery",
    description: "Non-oncological surgical procedures for various conditions",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    categories: [
      { name: "Hepatobiliary", procedures: ["Gallbladder Surgery", "Bile Duct Surgery", "Liver Cysts"] },
      { name: "Hernia", procedures: ["Inguinal Hernia", "Umbilical Hernia", "Incisional Hernia"] },
      { name: "Other", procedures: ["Appendectomy", "Hemorrhoids", "Bariatric Surgery", "Thyroid (Benign)"] }
    ],
    freeConsultation: true,
    freeSecondOpinion: true
  }
];

>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
<<<<<<< HEAD
        {/* Page Header */}
        <section className="py-16" style={{ backgroundColor: '#1B4965' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold mb-4 text-white">Services We Coordinate</h1>
              <p className="text-xl" style={{ color: '#B3DDED' }}>
                We prepare your case, connect you with the appropriate specialist channel, and support the coordination process from application to completion.
=======
        {/* Hero */}
        <section className="py-16" style={{ backgroundColor: '#1B4965' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold mb-4 text-white">Our Services</h1>
              <p className="text-xl" style={{ color: '#B3DDED' }}>
                MrClinc coordinates pathways for surgical services in Antalya. Submit your request and receive quotes directly from qualified healthcare providers.
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
              </p>
            </div>
          </div>
        </section>

<<<<<<< HEAD
        {/* Free Second Opinion Banner */}
=======
        {/* Second Opinion Banner */}
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
        <section id="second-opinion" style={{ backgroundColor: '#DCFCE7', borderBottom: '1px solid #BBF7D0' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#BBF7D0' }}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#166534' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
<<<<<<< HEAD
                  <h2 className="text-lg font-bold" style={{ color: '#14532D' }}>Free Second Opinion Pathway</h2>
                  <p style={{ color: '#166534' }}>
                    For cancer & general surgery cases, you may request a free evaluation from specialist clinics. The clinic contacts patients directly if documents are needed. No cost, no obligation, no travel required.
=======
                  <h2 className="text-lg font-bold" style={{ color: '#14532D' }}>Free Second Opinion</h2>
                  <p style={{ color: '#166534' }}>
                    For Cancer and General Surgery cases, get a free professional review of your diagnosis. No cost, no obligation, no travel required.
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
                  </p>
                </div>
              </div>
              <Link href="/apply?type=second-opinion">
                <Button variant="success">Request Free Second Opinion</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Services List */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<<<<<<< HEAD
            <div className="space-y-8">
              
              {/* Aesthetic Surgery */}
              <div id="aesthetic" className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200" style={{ backgroundColor: '#F9FAFB' }}>
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: '#F0F7FA', color: '#1B4965' }}
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Aesthetic Surgery</h2>
                      <p className="text-gray-600 text-sm">Pathway Scope</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Scope</h3>
                      <p className="text-gray-600 text-sm">
                        Face, breast, body contouring, genital aesthetics, and hair restoration procedures.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Who it's for</h3>
                      <p className="text-gray-600 text-sm">
                        Patients seeking elective aesthetic surgery coordination in Antalya.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">What coordination includes</h3>
                      <p className="text-gray-600 text-sm">
                        Case preparation, specialist channel connection, and process tracking via a unique reference code.
                      </p>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <p className="text-sm text-gray-500">
                      Submit your request to begin the coordination process
                    </p>
                    <Link href="/apply?service=aesthetic">
                      <Button variant="primary">Submit Request</Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Cancer Surgery */}
              <div id="cancer" className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200" style={{ backgroundColor: '#F9FAFB' }}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: '#F0F7FA', color: '#1B4965' }}
                      >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">Cancer Surgery</h2>
                        <p className="text-gray-600 text-sm">Pathway Scope</p>
                      </div>
                    </div>
                    <span 
                      className="inline-block px-3 py-1 text-xs font-semibold rounded-full w-fit"
                      style={{ backgroundColor: '#DCFCE7', color: '#166534' }}
                    >
                      Free Second Opinion
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Scope</h3>
                      <p className="text-gray-600 text-sm">
                        Oncological surgical procedures across gastrointestinal, hepatobiliary & pancreas, thoracic, breast, gynecological oncology, uro-oncology, head & neck, skin oncology, sarcoma & orthopedic oncology, and neuro-oncology.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Who it's for</h3>
                      <p className="text-gray-600 text-sm">
                        Patients seeking surgical oncology evaluation or treatment coordination.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">What coordination includes</h3>
                      <p className="text-gray-600 text-sm">
                        Case preparation, specialist channel connection, process tracking, and access to the free second-opinion pathway. Clinics contact patients directly if documents are required.
                      </p>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <p className="text-sm text-gray-500">
                      Submit your request to begin the coordination process
                    </p>
                    <Link href="/apply?service=cancer">
                      <Button variant="primary">Submit Request</Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* General Surgery */}
              <div id="general" className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200" style={{ backgroundColor: '#F9FAFB' }}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: '#F0F7FA', color: '#1B4965' }}
                      >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">General Surgery</h2>
                        <p className="text-gray-600 text-sm">Pathway Scope</p>
                      </div>
                    </div>
                    <span 
                      className="inline-block px-3 py-1 text-xs font-semibold rounded-full w-fit"
                      style={{ backgroundColor: '#DCFCE7', color: '#166534' }}
                    >
                      Free Second Opinion
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Scope</h3>
                      <p className="text-gray-600 text-sm">
                        Non-oncological surgical procedures including hepatobiliary, gallbladder, bile ducts, liver, pancreas, stomach & esophagus, intestines, hernia & abdominal wall, proctology, obesity surgery, and benign endocrine surgery.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Who it's for</h3>
                      <p className="text-gray-600 text-sm">
                        Patients seeking non-oncological surgical care coordination.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">What coordination includes</h3>
                      <p className="text-gray-600 text-sm">
                        Case preparation, specialist channel connection, process tracking, and access to the free second-opinion pathway. Clinics contact patients directly if documents are required.
                      </p>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <p className="text-sm text-gray-500">
                      Submit your request to begin the coordination process
                    </p>
                    <Link href="/apply?service=general">
                      <Button variant="primary">Submit Request</Button>
                    </Link>
                  </div>
                </div>
              </div>

=======
            <div className="space-y-12">
              {services.map((service) => (
                <div key={service.id} id={service.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200" style={{ backgroundColor: '#F9FAFB' }}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: '#F0F7FA', color: '#1B4965' }}
                        >
                          {service.icon}
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-gray-900">{service.title}</h2>
                          <p className="text-gray-600 text-sm">{service.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {service.freeConsultation && (
                          <span 
                            className="inline-block px-3 py-1 text-xs font-semibold rounded-full"
                            style={{ backgroundColor: '#F0F7FA', color: '#1B4965' }}
                          >
                            Free Consultation
                          </span>
                        )}
                        {service.freeSecondOpinion && (
                          <span 
                            className="inline-block px-3 py-1 text-xs font-semibold rounded-full"
                            style={{ backgroundColor: '#DCFCE7', color: '#166534' }}
                          >
                            Free Second Opinion
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      {service.categories.map((category, idx) => (
                        <div key={idx}>
                          <h3 className="font-semibold text-gray-900 mb-3">{category.name}</h3>
                          <ul className="space-y-2">
                            {category.procedures.map((procedure, pIdx) => (
                              <li key={pIdx} className="flex items-center gap-2 text-sm text-gray-600">
                                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#1B4965' }}>
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                                {procedure}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <p className="text-sm text-gray-500">
                        Submit your request to receive quotes from qualified providers
                      </p>
                      <Link href={`/apply?service=${service.id}`}>
                        <Button variant="primary">Submit Request</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
            </div>
          </div>
        </section>

<<<<<<< HEAD
        {/* Inline Role Reminder */}
        <section className="py-8" style={{ backgroundColor: '#F9FAFB' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500 text-sm">
              MrClinc coordinates pathways. We do not provide medical advice, recommend specific clinics, or handle medical documents.
            </p>
          </div>
        </section>

        {/* Page CTA */}
        <section className="py-16" style={{ backgroundColor: '#1B4965' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-white">Ready to Begin?</h2>
            <p className="mb-8" style={{ color: '#B3DDED' }}>
              Submit your request. We'll prepare your case and guide the coordination process.
=======
        {/* How It Works */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { num: "1", title: "Submit Request", desc: "Fill out our simple form with your service needs and basic information" },
                { num: "2", title: "Receive Quotes", desc: "Clinics review your request and send quotes directly to you within 48-72 hours" },
                { num: "3", title: "Compare & Decide", desc: "Compare options, ask questions, and make your own informed decision" }
              ].map((step, idx) => (
                <div key={idx} className="text-center">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: '#F0F7FA' }}
                  >
                    <span className="font-bold" style={{ color: '#1B4965' }}>{step.num}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.desc}</p>
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

        {/* CTA */}
        <section className="py-16" style={{ backgroundColor: '#1B4965' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-white">Ready to Get Started?</h2>
            <p className="mb-8" style={{ color: '#B3DDED' }}>
              Submit your request today. It's free, with no obligation.
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
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
