import { PublicPDDocLayout } from "@/components/PublicPDDocLayout";

export default function PDDataProcessingPage() {
  return (
    <PublicPDDocLayout title="Data Processing Notice for Pathway Developers">
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Data Controller</h2>
        <p className="text-gray-600">
          MrClinc is the data controller for personal data collected through the PD application and platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Data We Collect</h2>
        <p className="text-gray-600 mb-3">We collect the following categories of personal data:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li><strong>Identity Data:</strong> Name, date of birth, nationality</li>
          <li><strong>Contact Data:</strong> Email address, phone number, address</li>
          <li><strong>Professional Data:</strong> Qualifications, experience, languages spoken</li>
          <li><strong>Platform Data:</strong> Activity logs, case interactions, performance metrics</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">3. How We Use Your Data</h2>
        <p className="text-gray-600 mb-3">We process your data for:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>Evaluating your PD application</li>
          <li>Managing your platform access and activities</li>
          <li>Processing compensation payments</li>
          <li>Compliance with legal obligations</li>
          <li>Improving our services</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Legal Basis</h2>
        <p className="text-gray-600 mb-3">We process your data based on:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li><strong>Contract:</strong> To perform our agreement with you</li>
          <li><strong>Legal Obligation:</strong> To comply with applicable laws</li>
          <li><strong>Legitimate Interest:</strong> To operate and improve our platform</li>
          <li><strong>Consent:</strong> Where specifically requested</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Your Rights</h2>
        <p className="text-gray-600 mb-3">Under GDPR, you have the right to:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>Access your personal data</li>
          <li>Rectify inaccurate data</li>
          <li>Erase your data (in certain circumstances)</li>
          <li>Restrict processing</li>
          <li>Data portability</li>
          <li>Object to processing</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Data Retention</h2>
        <p className="text-gray-600">
          We retain your data for as long as necessary to fulfill the purposes outlined in this notice, 
          or as required by law. Application data for unsuccessful applicants is retained for 12 months.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Contact</h2>
        <p className="text-gray-600">
          For data protection queries, contact us at: privacy@mrclinc.com
        </p>
      </section>
    </PublicPDDocLayout>
  );
}
