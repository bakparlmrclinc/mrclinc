import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
        <section className="py-12" style={{ backgroundColor: '#1B4965' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-2 text-white">Terms & Conditions</h1>
            <p style={{ color: '#B3DDED' }}>Please read these terms carefully before using our platform</p>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl border border-gray-200 p-8 space-y-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">1. Service Description</h2>
                <p className="text-gray-600">MrClinc is a pathway coordination platform that connects UK patients with healthcare providers in Antalya, Turkey. We facilitate introductions and communication only. We do not provide medical treatment, advice, or recommendations.</p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">2. Our Role</h2>
                <p className="text-gray-600 mb-3">MrClinc:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Coordinates introductions between patients and healthcare providers</li>
                  <li>Facilitates initial communication and request processing</li>
                  <li>Provides request tracking services</li>
                </ul>
                <p className="text-gray-600 mt-3">MrClinc does NOT:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Provide medical advice, diagnosis, or treatment</li>
                  <li>Recommend specific healthcare providers</li>
                  <li>Handle payments between patients and providers</li>
                  <li>Guarantee medical outcomes</li>
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">3. User Responsibilities</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Provide accurate and complete information</li>
                  <li>Make your own informed healthcare decisions</li>
                  <li>Conduct your own due diligence on healthcare providers</li>
                  <li>Comply with applicable laws and regulations</li>
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">4. Healthcare Provider Relationships</h2>
                <p className="text-gray-600">Healthcare providers in our network are independent entities. Any agreement, contract, or relationship you enter into with a healthcare provider is solely between you and that provider. MrClinc is not a party to such agreements.</p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">5. Limitation of Liability</h2>
                <p className="text-gray-600">MrClinc is not liable for any medical outcomes, treatment results, or actions taken by healthcare providers. Our coordination service is provided "as is" without warranties of any kind.</p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">6. Pathway Developers</h2>
                <p className="text-gray-600">Pathway Developers (PDs) are independent professionals, not employees of MrClinc. PDs should never request payment from patients. Report any such requests to us immediately.</p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">7. Changes to Terms</h2>
                <p className="text-gray-600">We may update these terms from time to time. Continued use of our platform after changes constitutes acceptance of the new terms.</p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">8. Contact</h2>
                <p className="text-gray-600">For questions about these terms, contact us at: <a href="mailto:legal@mrclinc.com" style={{ color: '#1B4965' }} className="hover:underline">legal@mrclinc.com</a></p>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">Last updated: January 2026</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
