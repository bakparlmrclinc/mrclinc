import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-6">
                Last updated: January 2026
              </p>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Service Description</h2>
                <p className="text-gray-600 mb-4">
                  MrClinc is a pathway coordination platform that connects UK patients with healthcare providers in Antalya, Turkey. We facilitate introductions and coordinate the communication process between patients and clinics.
                </p>
                <p className="text-gray-600">
                  <strong>Important:</strong> MrClinc does not provide medical advice, diagnosis, treatment, or any healthcare services. All medical decisions are made between patients and their chosen healthcare providers.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">2. User Responsibilities</h2>
                <p className="text-gray-600 mb-4">By using our platform, you agree to:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Provide accurate and complete information in your requests</li>
                  <li>Make your own informed decisions regarding healthcare</li>
                  <li>Communicate directly with clinics regarding medical matters</li>
                  <li>Understand that MrClinc is a coordination service only</li>
                  <li>Not rely on MrClinc for medical advice or recommendations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Coordination Services</h2>
                <p className="text-gray-600 mb-4">Our coordination services include:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Receiving and processing patient requests</li>
                  <li>Connecting patients with relevant healthcare providers</li>
                  <li>Facilitating initial communication between parties</li>
                  <li>Providing request tracking functionality</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  Our coordination services are provided free of charge to patients. We do not charge patients for using our platform.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Limitation of Liability</h2>
                <p className="text-gray-600 mb-4">
                  MrClinc acts solely as a coordination intermediary. We are not responsible for:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Medical outcomes or treatment results</li>
                  <li>Quality of services provided by healthcare providers</li>
                  <li>Accuracy of information provided by clinics</li>
                  <li>Decisions made by patients or healthcare providers</li>
                  <li>Travel arrangements or accommodation</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Privacy and Data</h2>
                <p className="text-gray-600">
                  Your privacy is important to us. Please review our <a href="/privacy" className="text-primary-600 hover:underline">Privacy Policy</a> for information on how we collect, use, and protect your personal data in compliance with GDPR.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Pathway Developers</h2>
                <p className="text-gray-600">
                  Pathway Developers (PDs) are independent professionals who create awareness about our platform. PDs do not provide medical advice, do not represent MrClinc as employees, and do not receive payments from patients. If anyone requests payment claiming to be a PD, please report this to us immediately.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Changes to Terms</h2>
                <p className="text-gray-600">
                  We may update these terms from time to time. Continued use of our platform after changes constitutes acceptance of the updated terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Contact</h2>
                <p className="text-gray-600">
                  For questions about these terms, please contact us at{" "}
                  <a href="mailto:info@mrclinc.com" className="text-primary-600 hover:underline">
                    info@mrclinc.com
                  </a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
