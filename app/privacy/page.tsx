import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
        <section className="py-12" style={{ backgroundColor: '#1B4965' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-2 text-white">Privacy Policy</h1>
            <p style={{ color: '#B3DDED' }}>How we collect, use, and protect your data</p>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl border border-gray-200 p-8 space-y-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                <p className="text-gray-600">MrClinc ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our pathway coordination platform.</p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
                <p className="text-gray-600 mb-3">We collect information that you provide directly to us:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Contact information (name, email, phone number)</li>
                  <li>Location information (city, country)</li>
                  <li>Service preferences and request details</li>
                  <li>Optional: Pathway Developer (PD) code if provided</li>
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>To coordinate introductions between you and healthcare providers</li>
                  <li>To communicate with you about your request status</li>
                  <li>To improve our platform and services</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">4. Information Sharing</h2>
                <p className="text-gray-600 mb-3">We share your information only with:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Healthcare providers you choose to engage with</li>
                  <li>Pathway Developers (limited information, if applicable)</li>
                  <li>Service providers who assist our operations</li>
                  <li>Legal authorities when required by law</li>
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">5. Data Security</h2>
                <p className="text-gray-600">We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.</p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">6. Your Rights (GDPR)</h2>
                <p className="text-gray-600 mb-3">Under GDPR, you have the right to:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Access your personal data</li>
                  <li>Rectify inaccurate data</li>
                  <li>Request erasure of your data</li>
                  <li>Restrict processing of your data</li>
                  <li>Data portability</li>
                  <li>Object to processing</li>
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">7. Contact Us</h2>
                <p className="text-gray-600">For any privacy-related questions or to exercise your rights, contact us at: <a href="mailto:privacy@mrclinc.com" style={{ color: '#1B4965' }} className="hover:underline">privacy@mrclinc.com</a></p>
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
