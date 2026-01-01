"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

interface FAQItem {
  question: string;
  answer: string;
}

const faqCategories = [
  {
    title: "General Questions",
    items: [
      {
        question: "What is MrClinc?",
        answer: "MrClinc is an Antalya-based pathway coordination platform that connects UK patients with healthcare providers in Turkey. We coordinate the introduction process between patients and clinics - we do not provide medical treatment, advice, or recommendations."
      },
      {
        question: "Is MrClinc a hospital or clinic?",
        answer: "No. MrClinc is a coordination platform only. We connect you with independent hospitals and clinics in Antalya. All medical services are provided directly by these healthcare facilities, not by MrClinc."
      },
      {
        question: "Do I have to pay MrClinc?",
        answer: "No. Our coordination service is completely free for patients. You only pay the clinic you choose for your treatment. MrClinc does not charge patients any fees."
      },
      {
        question: "What is a Pathway Developer (PD)?",
        answer: "Pathway Developers are independent professionals who help create awareness about our platform. They do not provide medical advice, do not work for MrClinc as employees, and should never request payment from you. If anyone claims to be a PD and asks for money, please report it to us."
      }
    ]
  },
  {
    title: "Request Process",
    items: [
      {
        question: "How do I submit a request?",
        answer: "Visit our Apply page and fill out the request form. Select your service category, provide basic information, and submit. You'll receive a tracking code to monitor your request status."
      },
      {
        question: "How long until I hear from clinics?",
        answer: "Clinics typically respond within 48-72 hours. For complex cases or Second Opinions, it may take slightly longer. You can track your request status anytime using your tracking code."
      },
      {
        question: "Can I choose which clinic to use?",
        answer: "Yes, absolutely. You will receive information and quotes from multiple clinics. You compare them, ask questions, and make your own decision. MrClinc does not recommend specific clinics."
      },
      {
        question: "What if I change my mind?",
        answer: "There is no obligation at any stage. If you decide not to proceed after receiving quotes, that's completely fine. You control all decisions."
      }
    ]
  },
  {
    title: "Services",
    items: [
      {
        question: "What services can I request?",
        answer: "We coordinate pathways for Aesthetic Surgery (face, breast, body procedures), Cancer Surgery, and General Surgery (gallbladder, hernia, bariatric, etc.). Visit our Services page for the complete list."
      },
      {
        question: "What is the Free Second Opinion?",
        answer: "For Cancer and General Surgery cases, we offer a free professional review of your diagnosis and treatment plan by specialists in Antalya. It's completely free, requires no travel, and has no obligation to proceed with treatment."
      },
      {
        question: "Do you coordinate dental or hair transplant?",
        answer: "Currently, we focus on surgical services. Hair transplant may be included with aesthetic surgery at some centers. Contact us for specific questions about service availability."
      }
    ]
  },
  {
    title: "Travel & Treatment",
    items: [
      {
        question: "Do you arrange travel and accommodation?",
        answer: "MrClinc coordinates the connection with clinics only. Travel arrangements (flights, accommodation) are handled separately. Some clinics offer package deals that include accommodation - they will explain their offerings directly."
      },
      {
        question: "Will someone accompany me in Turkey?",
        answer: "MrClinc staff and Pathway Developers do not accompany patients. However, clinics provide support staff, translators, and patient coordinators in Antalya to assist you during your stay."
      },
      {
        question: "What about post-treatment follow-up?",
        answer: "Clinics provide post-operative care instructions and remote follow-up support. They will explain their follow-up protocols before you proceed with treatment."
      }
    ]
  },
  {
    title: "Privacy & Safety",
    items: [
      {
        question: "Is my data safe?",
        answer: "Yes. We are GDPR-compliant and take data protection seriously. Your medical information is shared only with clinics you choose to engage with. Read our Privacy Policy for full details."
      },
      {
        question: "Who sees my medical records?",
        answer: "Only the clinics you choose to share them with. MrClinc does not store or access your detailed medical records. For Second Opinions, you share documents directly with the reviewing clinic."
      }
    ]
  }
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-primary-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-2">Frequently Asked Questions</h1>
            <p className="text-primary-100">Find answers to common questions about our coordination services</p>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {faqCategories.map((category, catIndex) => (
              <div key={catIndex} className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{category.title}</h2>
                <div className="space-y-3">
                  {category.items.map((item, itemIndex) => {
                    const key = `${catIndex}-${itemIndex}`;
                    const isOpen = openItems[key];
                    return (
                      <div
                        key={key}
                        className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                      >
                        <button
                          onClick={() => toggleItem(key)}
                          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50"
                        >
                          <span className="font-medium text-gray-900">{item.question}</span>
                          <svg
                            className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-4">
                            <p className="text-gray-600">{item.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Still have questions */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Still have questions?</h2>
            <p className="text-gray-600 mb-6">
              We're here to help. Contact us for any questions not covered above.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
