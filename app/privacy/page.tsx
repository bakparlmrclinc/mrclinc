<<<<<<< HEAD
import { LegalLayout } from "@/components/LegalLayout";

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="January 2026">
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
        <p className="text-gray-600 mb-4">
          This Privacy Policy explains how personal data is processed when you use the MrClinc platform.
        </p>
        <p className="text-gray-600 mb-4">
          MrClinc is a healthcare pathway coordination platform. MrClinc is not a healthcare provider and does not provide medical services.
        </p>
        <p className="text-gray-600">
          This policy is written to be clear, factual, and compliant with UK GDPR principles.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Who Is Responsible for Your Data</h2>
        <p className="text-gray-600 mb-4">
          For the purposes of data protection law, the MrClinc platform acts as the Data Controller for personal data processed through the platform.
        </p>
        <p className="text-gray-600">
          Contact: <a href="mailto:info@mrclinc.com" className="text-primary-600 hover:underline">info@mrclinc.com</a>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">3. What Data We Collect</h2>
        
        <h3 className="text-lg font-medium text-gray-800 mb-3">3.1 Personal Data</h3>
        <p className="text-gray-600 mb-3">We collect:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-6">
          <li>Name</li>
          <li>Contact details (email, phone number)</li>
          <li>Country of residence</li>
          <li>Platform reference codes (e.g. tracking identifiers)</li>
          <li>Basic coordination-related information (non-clinical)</li>
        </ul>

        <h3 className="text-lg font-medium text-gray-800 mb-3">3.2 Health-Related Data (Special Category Data)</h3>
        <p className="text-gray-600 mb-3">Health data, if provided by the patient, is:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
          <li>Optional and voluntary</li>
          <li>Minimal and non-diagnostic</li>
          <li>Limited to non-clinical descriptors only (e.g. general area of interest such as "oncology" or "aesthetic")</li>
        </ul>
        <p className="text-gray-600 mb-3">Important clarifications:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-6">
          <li>MrClinc does not request or store medical records, diagnostic reports, scans, images, or test results</li>
          <li>Free text fields must not include diagnoses, medical history, or clinical information</li>
          <li>Medical documentation is exchanged directly between patient and healthcare provider only</li>
          <li>Pathway Developers do not access, process, view, or handle special category data under any circumstances</li>
        </ul>

        <h3 className="text-lg font-medium text-gray-800 mb-3">3.3 Data Flow</h3>
        <p className="text-gray-600 mb-3">The platform operates with clear separation:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li><strong>Patient ↔ Healthcare Provider:</strong> Medical documents, clinical information, diagnostic materials</li>
          <li><strong>Patient ↔ MrClinc:</strong> Coordination metadata only (name, contact, reference codes, process status)</li>
        </ul>
        <p className="text-gray-600 mt-3">
          MrClinc does not sit between the patient and provider for any clinical data exchange.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Purpose of Processing</h2>
        <p className="text-gray-600 mb-3">Personal data is processed only for the following purposes:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
          <li>Managing and coordinating patient requests (operational metadata only)</li>
          <li>Enabling access to appropriate clinical channels</li>
          <li>Providing status updates and process tracking</li>
          <li>Maintaining operational records</li>
          <li>Ensuring platform security and integrity</li>
        </ul>
        <p className="text-gray-600 mb-3">Data is not processed for:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>Advertising or promotional targeting</li>
          <li>Profiling or behavioural analysis</li>
          <li>Clinical decision-making</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Legal Basis for Processing</h2>
        <p className="text-gray-600 mb-3">Under UK GDPR, data is processed on the basis of:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
          <li><strong>Consent</strong> — where explicitly provided by the patient</li>
          <li><strong>Legitimate interests</strong> — limited to coordination, communication, and platform operation</li>
          <li><strong>Compliance obligations</strong> — where required for audit or regulatory purposes</li>
        </ul>
        <p className="text-gray-600">
          Where minimal health-related descriptors are provided, processing is based on explicit consent and limited strictly to coordination purposes.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Data Sharing</h2>
        <p className="text-gray-600 mb-3">Data may be shared only with:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
          <li>Relevant healthcare providers or clinical channels involved in the coordination pathway (contact details only, not medical data)</li>
          <li>Platform infrastructure and security providers (non-clinical, technical only)</li>
        </ul>
        <p className="text-gray-600 mb-4">
          Data is never sold, rented, or shared for marketing purposes.
        </p>
        <p className="text-gray-600">
          MrClinc does not act as an intermediary in clinical decision-making or medical data exchange.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">7. International Data Transfers</h2>
        <p className="text-gray-600 mb-4">
          Where data is accessed outside the UK, appropriate safeguards are applied in line with data protection standards.
        </p>
        <p className="text-gray-600">
          No unrestricted cross-border data transfers occur.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Data Retention</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
          <li>Personal data is retained only as long as necessary for coordination purposes</li>
          <li>Patient data is anonymised after 3 months of case closure</li>
          <li>Aggregated, non-identifiable data may be retained for operational analysis</li>
        </ul>
        <p className="text-gray-600">
          Retention periods may be adjusted based on operational or regulatory requirements.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Analytics and Cookies</h2>
        <p className="text-gray-600 mb-3">MrClinc uses basic analytics to understand platform usage.</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
          <li>Traffic-level data only</li>
          <li>No profiling</li>
          <li>No behavioural advertising</li>
          <li>No cross-platform tracking</li>
        </ul>
        <p className="text-gray-600">
          Detailed information is provided in the <a href="/cookies" className="text-primary-600 hover:underline">Cookie Policy</a>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Your Rights</h2>
        <p className="text-gray-600 mb-3">Under UK GDPR, you have the right to:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
          <li>Access your personal data</li>
          <li>Request correction of inaccurate data</li>
          <li>Request erasure of data (where applicable)</li>
          <li>Object to or restrict processing</li>
          <li>Withdraw consent where processing is based on consent</li>
        </ul>
        <p className="text-gray-600">
          Requests can be made via the platform or by contacting <a href="mailto:info@mrclinc.com" className="text-primary-600 hover:underline">info@mrclinc.com</a>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Data Security</h2>
        <p className="text-gray-600 mb-4">
          Appropriate technical and organisational measures are in place to protect personal data against unauthorised access, loss, or misuse.
        </p>
        <p className="text-gray-600">
          Access to data is restricted to authorised personnel only.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">12. Changes to This Policy</h2>
        <p className="text-gray-600 mb-4">
          This Privacy Policy may be updated to reflect changes in platform operation or regulatory requirements. Non-material changes (e.g. formatting, clarification) may be made without notice.
        </p>
        <p className="text-gray-600">
          The most recent version will always be published on the platform.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">13. Contact</h2>
        <p className="text-gray-600 mb-2">
          For privacy-related questions or requests: <a href="mailto:info@mrclinc.com" className="text-primary-600 hover:underline">info@mrclinc.com</a>
        </p>
        <p className="text-sm text-gray-500">
          This email address is actively monitored. We aim to respond to data subject requests within 30 days in accordance with UK GDPR requirements.
        </p>
      </section>
    </LegalLayout>
=======
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
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
  );
}
