"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

const faqCategories = [
  {
    title: "General Questions",
    items: [
<<<<<<< HEAD
      {
        question: "What is MrClinc?",
        answer: (
          <>
            <p className="mb-3">MrClinc is a healthcare pathway coordination platform based in Antalya, Turkey. We help structure the process and connect patients with relevant clinical teams.</p>
            <p>We are not a clinic, hospital, or medical provider. We do not deliver treatment, make medical decisions, or handle your medical documents. Our role is to coordinate the pathway—bridging the gap between you and the appropriate clinical team.</p>
          </>
        )
      },
      {
        question: "Is MrClinc a hospital or clinic?",
        answer: (
          <>
            <p className="mb-3">No. MrClinc is not a hospital, clinic, or medical facility. We do not provide any medical treatment, diagnosis, or advice.</p>
            <p>We are a coordination layer. Think of us as the organisational bridge between you and the clinical team—helping structure your enquiry, connecting you with the relevant clinical channel, and tracking the process so nothing falls through the cracks.</p>
          </>
        )
      },
      {
        question: "Do I have to pay MrClinc?",
        answer: (
          <>
            <p className="mb-3">No. There is no fee from MrClinc for using our coordination services.</p>
            <p>If you proceed with treatment, your agreement and payment will be directly with the clinic. MrClinc does not handle payments, negotiate pricing, or act as an intermediary in financial matters between you and the healthcare provider.</p>
          </>
        )
      },
      {
        question: "What is a Pathway Developer (PD)?",
        answer: (
          <>
            <p className="mb-3">A Pathway Developer is a trained healthcare-sector professional focused on process coordination. PDs are not salespeople—they help ensure your case is properly structured and that communication flows smoothly.</p>
            <p>Your PD can answer questions about the process, help clarify next steps, and escalate any delays. They do not provide medical advice, recommend specific clinics, or make decisions on your behalf.</p>
          </>
        )
      },
      {
        question: "Is MrClinc a medical tourism agency?",
        answer: (
          <>
            <p className="mb-3">No. We do not sell travel packages, bundle services, or operate as a tourism agency.</p>
            <p>MrClinc focuses solely on healthcare pathway coordination. While clinics may offer their own arrangements for accommodation and transport as part of their services, MrClinc does not organise, sell, or manage these elements.</p>
          </>
        )
      },
      {
        question: "Does MrClinc recommend or rank clinics?",
        answer: (
          <>
            <p className="mb-3">No. We do not recommend, rank, compare, or endorse specific clinics or doctors.</p>
            <p>Our role is to connect you with the relevant clinical channel based on your stated needs. The decision of which provider to work with remains entirely yours, made directly with the clinical team.</p>
          </>
        )
      }
=======
      { question: "What is MrClinc?", answer: "MrClinc is an Antalya-based pathway coordination platform that connects UK patients with healthcare providers in Turkey. We coordinate the introduction process between patients and clinics - we do not provide medical treatment, advice, or recommendations." },
      { question: "Is MrClinc a hospital or clinic?", answer: "No. MrClinc is a coordination platform only. We connect you with independent hospitals and clinics in Antalya. All medical services are provided directly by these healthcare facilities, not by MrClinc." },
      { question: "Do I have to pay MrClinc?", answer: "No. Our coordination service is completely free for patients. You only pay the clinic you choose for your treatment. MrClinc does not charge patients any fees." },
      { question: "What is a Pathway Developer (PD)?", answer: "Pathway Developers are independent professionals who help create awareness about our platform. They do not provide medical advice, do not work for MrClinc as employees, and should never request payment from you." }
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
    ]
  },
  {
    title: "Request Process",
    items: [
<<<<<<< HEAD
      {
        question: "How do I submit a request?",
        answer: (
          <>
            <p className="mb-3">You can submit a request through our website by completing a short form. We ask for basic information about your situation and what type of service you're exploring.</p>
            <p>You do not need to upload any medical documents to MrClinc. Once your request is received, we'll assign a tracking code and connect you with the relevant clinical channel.</p>
          </>
        )
      },
      {
        question: "What happens after I submit a request?",
        answer: (
          <>
            <p className="mb-3">After submission, you'll receive a tracking code (TRK-XXXXX) that lets you follow your case status. Your request is reviewed for completeness and routed to the relevant clinical channel.</p>
            <p>The clinical team will then contact you directly to discuss your needs, request any necessary documents, and provide their evaluation. Throughout this process, you can check your status and reach out to your Pathway Developer with questions.</p>
          </>
        )
      },
      {
        question: "How long until I hear from clinics?",
        answer: (
          <>
            <p className="mb-3">Initial contact timing depends on clinical availability and case type.</p>
            <p>If there are delays, your Pathway Developer will follow up on your behalf. You'll receive status updates so you're never left wondering what's happening with your case.</p>
          </>
        )
      },
      {
        question: "Can I choose which clinic to use?",
        answer: (
          <>
            <p className="mb-3">MrClinc does not choose clinics for you, and we do not provide recommendations or comparisons.</p>
            <p>We connect you with the relevant clinical channel based on the type of care you're exploring. Any decisions about which provider to work with are made directly between you and the clinical team.</p>
          </>
        )
      },
      {
        question: "What if I change my mind?",
        answer: (
          <>
            <p className="mb-3">You can withdraw from the process at any point. There is no obligation, no pressure, and no fee from MrClinc.</p>
            <p>If you decide not to proceed, simply let your Pathway Developer know. We'll close your case respectfully—no follow-up sales calls, no pressure to reconsider.</p>
          </>
        )
      },
      {
        question: "What information do I need to provide?",
        answer: (
          <>
            <p className="mb-3">When submitting a request, we ask for basic contact information and a general description of what you're exploring. This helps us route your enquiry to the relevant clinical channel.</p>
            <p>You do not need to share detailed medical history or upload documents to MrClinc. Any clinical documentation will be shared directly between you and the healthcare provider, not through our platform.</p>
          </>
        )
      }
=======
      { question: "How do I submit a request?", answer: "Visit our Apply page and fill out the request form. Select your service category, provide basic information, and submit. You'll receive a tracking code to monitor your request status." },
      { question: "How long until I hear from clinics?", answer: "Clinics typically respond within 48-72 hours. For complex cases or Second Opinions, it may take slightly longer. You can track your request status anytime using your tracking code." },
      { question: "Can I choose which clinic to use?", answer: "Yes, absolutely. You will receive information and quotes from multiple clinics. You compare them, ask questions, and make your own decision. MrClinc does not recommend specific clinics." },
      { question: "What if I change my mind?", answer: "There is no obligation at any stage. If you decide not to proceed after receiving quotes, that's completely fine. You control all decisions." }
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
    ]
  },
  {
    title: "Services",
    items: [
<<<<<<< HEAD
      {
        question: "What services can I request?",
        answer: (
          <>
            <p className="mb-3">MrClinc coordinates pathways for three main service areas:</p>
            <ul className="list-disc list-inside space-y-1 mb-3 text-gray-600">
              <li><strong>Aesthetic Surgery</strong> — Elective aesthetic procedures coordinated in Antalya</li>
              <li><strong>General Surgery</strong> — Including Free Second Opinion option</li>
              <li><strong>Cancer Surgery (Oncology)</strong> — Including Free Second Opinion option</li>
            </ul>
            <p>Each service follows the same coordination model: we structure your enquiry, connect you with the relevant clinical channel, and track the process.</p>
          </>
        )
      },
      {
        question: "What is the Free Second Opinion?",
        answer: (
          <>
            <p className="mb-3">The Free Second Opinion (FSO) is available for oncology and general surgery cases. It allows you to receive a clinical evaluation from specialist clinics at no cost.</p>
            <p className="mb-3">Here's how it works:</p>
            <ol className="list-decimal list-inside space-y-1 mb-3 text-gray-600">
              <li>You submit a request through MrClinc (no documents uploaded to us)</li>
              <li>We assign a tracking code and connect you with the relevant clinical channel</li>
              <li>The clinic contacts you directly to request any necessary documents</li>
              <li>A specialist reviews your case and shares their evaluation</li>
              <li>You decide whether to proceed—there's no obligation</li>
            </ol>
            <p>The FSO is a pathway to clarity, not a sales funnel. If you choose not to proceed, that's the end of it.</p>
          </>
        )
      },
      {
        question: "Do you coordinate dental or hair transplant?",
        answer: (
          <>
            <p className="mb-3">No. MrClinc does not currently coordinate dental procedures or hair transplant services.</p>
            <p>Our focus is on aesthetic surgery, general surgery, and oncology. If you're looking for other types of procedures, we're unable to assist at this time.</p>
          </>
        )
      },
      {
        question: "Can I request multiple services at once?",
        answer: (
          <>
            <p className="mb-3">Each request is handled as a separate case with its own tracking code. If you're exploring multiple services, you can submit separate requests for each.</p>
            <p>This ensures each pathway receives proper attention and that communication remains clear and organised.</p>
          </>
        )
      }
=======
      { question: "What services can I request?", answer: "We coordinate pathways for Aesthetic Surgery (face, breast, body procedures), Cancer Surgery, and General Surgery (gallbladder, hernia, bariatric, etc.). Visit our Services page for the complete list." },
      { question: "What is the Free Second Opinion?", answer: "For Cancer and General Surgery cases, we offer a free professional review of your diagnosis and treatment plan by specialists in Antalya. It's completely free, requires no travel, and has no obligation to proceed with treatment." },
      { question: "Do you coordinate dental or hair transplant?", answer: "Currently, we focus on surgical services. Hair transplant may be included with aesthetic surgery at some centers. Contact us for specific questions about service availability." }
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
    ]
  },
  {
    title: "Travel & Treatment",
    items: [
<<<<<<< HEAD
      {
        question: "Do you arrange travel and accommodation?",
        answer: (
          <>
            <p className="mb-3">No. MrClinc does not arrange, book, or manage travel or accommodation.</p>
            <p>Many clinics offer their own end-to-end arrangements—including transfers, accommodation, and post-procedure support—as part of their service. These arrangements are made directly between you and the clinic, not through MrClinc.</p>
          </>
        )
      },
      {
        question: "Will someone accompany me in Turkey?",
        answer: (
          <>
            <p className="mb-3">MrClinc does not provide in-person accompaniment or on-the-ground support staff.</p>
            <p>However, many clinics have their own patient coordination teams who assist international patients throughout their stay. Your Pathway Developer can help clarify what support the clinical team provides before you travel.</p>
          </>
        )
      },
      {
        question: "What about post-treatment follow-up?",
        answer: (
          <>
            <p className="mb-3">Post-treatment follow-up is managed directly between you and your clinical team. This includes any check-ups, recovery guidance, or ongoing communication after your procedure.</p>
            <p>MrClinc's coordination role continues until your case is marked as completed. If you experience delays or communication issues during the follow-up period, your Pathway Developer can help escalate concerns.</p>
          </>
        )
      },
      {
        question: "What if something goes wrong during or after treatment?",
        answer: (
          <>
            <p className="mb-3">All medical care, outcomes, and any issues that arise are the responsibility of the healthcare provider you work with. Your agreement is directly with the clinic, not with MrClinc.</p>
            <p className="mb-3">We recommend that you review the clinic's policies on complications, aftercare, and follow-up before making any decisions. Ask questions, request written information, and ensure you're comfortable before proceeding.</p>
            <p>MrClinc does not guarantee outcomes, and we cannot intervene in clinical matters.</p>
          </>
        )
      },
      {
        question: "Do I need travel insurance?",
        answer: (
          <>
            <p className="mb-3">We strongly recommend arranging appropriate travel and medical insurance before travelling for any healthcare procedure abroad.</p>
            <p>MrClinc does not provide, arrange, or advise on insurance. Please consult with insurance providers directly to ensure you have coverage that meets your needs.</p>
          </>
        )
      }
=======
      { question: "Do you arrange travel and accommodation?", answer: "MrClinc coordinates the connection with clinics only. Travel arrangements (flights, accommodation) are handled separately. Some clinics offer package deals that include accommodation." },
      { question: "Will someone accompany me in Turkey?", answer: "MrClinc staff and Pathway Developers do not accompany patients. However, clinics provide support staff, translators, and patient coordinators in Antalya to assist you during your stay." },
      { question: "What about post-treatment follow-up?", answer: "Clinics provide post-operative care instructions and remote follow-up support. They will explain their follow-up protocols before you proceed with treatment." }
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
    ]
  },
  {
    title: "Privacy & Safety",
    items: [
<<<<<<< HEAD
      {
        question: "Is my data safe?",
        answer: (
          <>
            <p className="mb-3">Yes. MrClinc processes personal data in accordance with GDPR and applicable data protection regulations.</p>
            <p>We collect only the information necessary to coordinate your pathway. Your data is not sold, shared for marketing purposes, or used beyond the scope of your enquiry.</p>
          </>
        )
      },
      {
        question: "Who sees my medical records?",
        answer: (
          <>
            <p className="mb-3">MrClinc does not see, handle, store, or process your medical records or documents.</p>
            <p>All medical documentation flows directly between you and the clinical team. We coordinate the pathway, but we are not part of the clinical information exchange. This protects your privacy and keeps sensitive information where it belongs—with you and your healthcare provider.</p>
          </>
        )
      },
      {
        question: "How is my information shared with clinics?",
        answer: (
          <>
            <p className="mb-3">When you submit a request, we share your basic contact information and enquiry details with the relevant clinical channel so they can reach out to you.</p>
            <p>Any detailed medical information, documents, or records are shared by you directly with the clinic—not through MrClinc. You control what you share and when.</p>
          </>
        )
      },
      {
        question: "Can I request my data be deleted?",
        answer: (
          <>
            <p className="mb-3">Yes. You have the right to request deletion of your personal data in accordance with GDPR.</p>
            <p>To make a request, contact us at the email provided on our website. We will process your request and confirm once your data has been removed from our systems.</p>
          </>
        )
      }
    ]
  },
  {
    title: "After You Decide",
    items: [
      {
        question: "What happens if I decide to proceed with treatment?",
        answer: (
          <>
            <p className="mb-3">If you decide to proceed, your case moves into the next coordination phase. This means:</p>
            <ul className="list-disc list-inside space-y-1 mb-3 text-gray-600">
              <li>Your Pathway Developer remains your process coordination contact</li>
              <li>The clinic manages all clinical and logistical arrangements directly with you</li>
              <li>You'll continue to receive status updates through your tracking code</li>
              <li>Any agreements, payments, and scheduling happen between you and the clinic</li>
            </ul>
            <p>MrClinc does not handle payments or clinical arrangements—we track the process and help ensure communication flows smoothly.</p>
          </>
        )
      },
      {
        question: "What happens if I decide not to proceed?",
        answer: (
          <>
            <p className="mb-3">Nothing. You simply let your Pathway Developer know, and we'll close your case.</p>
            <p>There's no follow-up sales pressure, no repeated contact asking you to reconsider, and no penalty. The decision is always yours.</p>
          </>
        )
      },
      {
        question: "Will I be pressured to make a decision?",
        answer: (
          <>
            <p className="mb-3">No. MrClinc does not use sales tactics, urgency messaging, or pressure of any kind.</p>
            <p>Our role is to give you a clear pathway and the information you need to make your own decision. We will never rush you, and we will never make decisions for you. Take the time you need.</p>
          </>
        )
      },
      {
        question: "How do I know when my case is complete?",
        answer: (
          <>
            <p className="mb-3">Your case status is updated throughout the process. When all coordination steps are finished—whether you proceeded with treatment or chose to close the case—your status will be marked as "Completed" or "Closed."</p>
            <p>You'll receive confirmation, and that's the end of active coordination. If you ever have questions afterward, you can still reach out.</p>
          </>
        )
      }
=======
      { question: "Is my data safe?", answer: "Yes. We are GDPR-compliant and take data protection seriously. Your medical information is shared only with clinics you choose to engage with. Read our Privacy Policy for full details." },
      { question: "Who sees my medical records?", answer: "Only the clinics you choose to share them with. MrClinc does not store or access your detailed medical records. For Second Opinions, you share documents directly with the reviewing clinic." }
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
    ]
  }
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
<<<<<<< HEAD
  
  const toggleItem = (key: string) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };
=======
  const toggleItem = (key: string) => setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b

  return (
    <>
      <Header />
      <main className="min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
<<<<<<< HEAD
        {/* ============================================
            SECTION 1: HERO
            ============================================ */}
        <section className="py-12" style={{ backgroundColor: '#1e3a5f' }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-3">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-300">
              Find answers to common questions about our coordination services.
            </p>
          </div>
        </section>

        {/* ============================================
            SECTION 2: FAQ CATEGORIES
            ============================================ */}
        <section className="py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {faqCategories.map((category, catIndex) => (
              <div key={catIndex} className={catIndex > 0 ? "mt-10" : ""}>
                <h2 
                  className="text-xl font-bold mb-4"
                  style={{ color: '#1a1a2e' }}
                >
                  {category.title}
                </h2>
                <div className="space-y-2">
=======
        {/* Hero */}
        <section className="py-12" style={{ backgroundColor: '#1B4965' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-2 text-white">Frequently Asked Questions</h1>
            <p style={{ color: '#B3DDED' }}>Find answers to common questions about our coordination services</p>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {faqCategories.map((category, catIndex) => (
              <div key={catIndex} className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{category.title}</h2>
                <div className="space-y-3">
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
                  {category.items.map((item, itemIndex) => {
                    const key = `${catIndex}-${itemIndex}`;
                    const isOpen = openItems[key];
                    return (
<<<<<<< HEAD
                      <div 
                        key={key} 
                        className="bg-white rounded-lg border overflow-hidden"
                        style={{ borderColor: '#e5e7eb' }}
                      >
                        <button
                          onClick={() => toggleItem(key)}
                          className="w-full px-5 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <span 
                            className="font-medium pr-4"
                            style={{ color: '#1a1a2e' }}
                          >
                            {item.question}
                          </span>
                          <svg 
                            className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                            style={{ color: '#9ca3af' }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {isOpen && (
                          <div 
                            className="px-5 pb-4 text-sm leading-relaxed"
                            style={{ color: '#4b5563' }}
                          >
                            {item.answer}
                          </div>
                        )}
=======
                      <div key={key} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <button
                          onClick={() => toggleItem(key)}
                          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50"
                        >
                          <span className="font-medium text-gray-900">{item.question}</span>
                          <svg className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {isOpen && <div className="px-6 pb-4"><p className="text-gray-600">{item.answer}</p></div>}
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

<<<<<<< HEAD
        {/* ============================================
            SECTION 3: STILL HAVE QUESTIONS CTA
            ============================================ */}
        <section className="py-12 bg-white">
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Still have questions?
            </h2>
            <p className="text-gray-600 mb-6">
              We're here to help. Contact us for any questions not covered above.
            </p>
            <Link href="/contact">
              <Button variant="primary">Contact Us</Button>
            </Link>
=======
        {/* Still have questions */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Still have questions?</h2>
            <p className="text-gray-600 mb-6">We're here to help. Contact us for any questions not covered above.</p>
            <Link href="/contact"><Button variant="primary">Contact Us</Button></Link>
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
