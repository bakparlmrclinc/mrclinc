import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

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
      {
        name: "Face",
        procedures: ["Rhinoplasty", "Blepharoplasty", "Facelift", "Otoplasty", "Chin Surgery"]
      },
      {
        name: "Breast",
        procedures: ["Breast Augmentation", "Breast Lift", "Breast Reduction", "Gynecomastia"]
      },
      {
        name: "Body",
        procedures: ["Liposuction", "Tummy Tuck", "BBL", "Arm Lift", "Thigh Lift"]
      }
    ],
    earnings: "€250-€350",
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
      {
        name: "Gastrointestinal",
        procedures: ["Esophageal", "Gastric", "Colon", "Rectal", "Liver", "Pancreatic"]
      },
      {
        name: "Thoracic",
        procedures: ["Lung Cancer", "Mediastinal Tumors"]
      },
      {
        name: "Other",
        procedures: ["Breast Cancer", "Gynecological", "Urological", "Thyroid", "Melanoma"]
      }
    ],
    earnings: "€1,000-€1,200",
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
      {
        name: "Hepatobiliary",
        procedures: ["Gallbladder Surgery", "Bile Duct Surgery", "Liver Cysts"]
      },
      {
        name: "Hernia",
        procedures: ["Inguinal Hernia", "Umbilical Hernia", "Incisional Hernia"]
      },
      {
        name: "Other",
        procedures: ["Appendectomy", "Hemorrhoids", "Bariatric Surgery", "Thyroid (Benign)"]
      }
    ],
    earnings: "€1,000-€1,200",
    freeConsultation: true,
    freeSecondOpinion: true
  }
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-primary-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold mb-4">Our Services</h1>
              <p className="text-xl text-primary-100">
                MrClinc coordinates pathways for surgical services in Antalya. Submit your request and receive quotes directly from qualified healthcare providers.
              </p>
            </div>
          </div>
        </section>

        {/* Second Opinion Banner */}
        <section id="second-opinion" className="bg-success-50 border-b border-success-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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

        {/* Services List */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {services.map((service) => (
                <Card key={service.id} id={service.id} variant="bordered" className="overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
                          {service.icon}
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-gray-900">{service.title}</h2>
                          <p className="text-gray-600 text-sm">{service.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {service.freeConsultation && (
                          <Badge variant="primary">Free Consultation</Badge>
                        )}
                        {service.freeSecondOpinion && (
                          <Badge variant="success">Free Second Opinion</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <CardContent className="py-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      {service.categories.map((category, idx) => (
                        <div key={idx}>
                          <h3 className="font-semibold text-gray-900 mb-3">{category.name}</h3>
                          <ul className="space-y-2">
                            {category.procedures.map((procedure, pIdx) => (
                              <li key={pIdx} className="flex items-center gap-2 text-sm text-gray-600">
                                <svg className="w-4 h-4 text-primary-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Submit Request</h3>
                <p className="text-gray-600 text-sm">Fill out our simple form with your service needs and basic information</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-600 font-bold">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Receive Quotes</h3>
                <p className="text-gray-600 text-sm">Clinics review your request and send quotes directly to you within 48-72 hours</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Compare & Decide</h3>
                <p className="text-gray-600 text-sm">Compare options, ask questions, and make your own informed decision</p>
              </div>
            </div>
            <div className="text-center mt-8">
              <Link href="/how-it-works">
                <Button variant="outline">Learn More</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-primary-100 mb-8">
              Submit your request today. It's free, with no obligation.
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
