import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-6">
                Last updated: January 2026
              </p>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
                <p className="text-gray-600">
                  MrClinc ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal data in compliance with the UK General Data Protection Regulation (UK GDPR) and Data Protection Act 2018.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Data We Collect</h2>
                <p className="text-gray-600 mb-4">We collect the following personal data:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li><strong>Identity Data:</strong> Name, age, gender</li>
                  <li><strong>Contact Data:</strong> Email address, phone number, location (city/country)</li>
                  <li><strong>Health Data:</strong> Service requested, brief medical information relevant to your request</li>
                  <li><strong>Technical Data:</strong> IP address, browser type, device information</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">3. How We Use Your Data</h2>
                <p className="text-gray-600 mb-4">We use your data to:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Coordinate your request with healthcare providers</li>
                  <li>Communicate with you about your request status</li>
                  <li>Facilitate introductions between you and clinics</li>
                  <li>Improve our platform and services</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Data Sharing</h2>
                <p className="text-gray-600 mb-4">
                  We share your data only with:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li><strong>Healthcare Providers:</strong> Clinics in Antalya that you choose to engage with</li>
                  <li><strong>Pathway Developers:</strong> Limited information (name, location, service type) to PDs who coordinate your request</li>
                  <li><strong>Service Providers:</strong> Technical partners who help operate our platform (under strict data protection agreements)</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  <strong>Important:</strong> We do not sell your data to third parties. We do not share detailed medical records without your explicit consent.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Your Rights</h2>
                <p className="text-gray-600 mb-4">Under UK GDPR, you have the right to:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li><strong>Access:</strong> Request a copy of your personal data</li>
                  <li><strong>Rectification:</strong> Correct inaccurate personal data</li>
                  <li><strong>Erasure:</strong> Request deletion of your personal data</li>
                  <li><strong>Portability:</strong> Receive your data in a structured format</li>
                  <li><strong>Objection:</strong> Object to processing of your data</li>
                  <li><strong>Withdraw Consent:</strong> Withdraw consent at any time</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  To exercise these rights, contact us at{" "}
                  <a href="mailto:privacy@mrclinc.com" className="text-primary-600 hover:underline">
                    privacy@mrclinc.com
                  </a>
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Data Retention</h2>
                <p className="text-gray-600">
                  We retain your personal data for as long as necessary to provide our services and comply with legal obligations. Typically, we retain request data for 2 years after case completion. You may request earlier deletion at any time.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Data Security</h2>
                <p className="text-gray-600">
                  We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. This includes encryption, access controls, and regular security assessments.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">8. International Transfers</h2>
                <p className="text-gray-600">
                  Your data may be transferred to healthcare providers in Turkey. We ensure appropriate safeguards are in place for such transfers, including standard contractual clauses where applicable.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Cookies</h2>
                <p className="text-gray-600">
                  We use essential cookies to operate our platform. We may use analytics cookies to understand how visitors use our site. You can control cookie preferences through your browser settings.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Contact Us</h2>
                <p className="text-gray-600">
                  For privacy-related inquiries:<br />
                  Email:{" "}
                  <a href="mailto:privacy@mrclinc.com" className="text-primary-600 hover:underline">
                    privacy@mrclinc.com
                  </a>
                  <br />
                  General inquiries:{" "}
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
