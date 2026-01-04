import { LegalLayout } from "@/components/LegalLayout";

export default function PatientInfoPage() {
  return (
    <LegalLayout title="Patient Information Notice" lastUpdated="January 2026">
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">1. What This Platform Is</h2>
        <p className="text-gray-600 mb-4">
          MrClinc is a healthcare pathway coordination platform.
        </p>
        <p className="text-gray-600 mb-4">
          This means MrClinc helps organise and track healthcare-related requests, but does not provide medical care.
        </p>
        <p className="text-gray-600 mb-3">MrClinc is:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
          <li>Not a hospital or clinic</li>
          <li>Not a doctor or medical advisor</li>
          <li>Not a broker, agent, or referral service</li>
          <li>Not a provider or procurer of medical services</li>
        </ul>
        <p className="text-gray-600">
          The platform exists to support clarity, coordination, and process visibility.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">2. What MrClinc Can Help With</h2>
        <p className="text-gray-600 mb-3">MrClinc may help you to:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
          <li>Submit a healthcare coordination request</li>
          <li>Access relevant clinical channels</li>
          <li>Track the status of your request using a reference code</li>
          <li>Understand what stage your request is at</li>
        </ul>
        <p className="text-gray-600">
          MrClinc's role is operational, not clinical.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">3. What MrClinc Cannot Do</h2>
        <p className="text-gray-600 mb-3">MrClinc does not:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
          <li>Give medical advice or opinions</li>
          <li>Decide which treatment you should have</li>
          <li>Recommend doctors or clinics</li>
          <li>Compare providers or outcomes</li>
          <li>Discuss prices, packages, or guarantees</li>
          <li>Make decisions on your behalf</li>
          <li>Provide or procure medical services</li>
        </ul>
        <p className="text-gray-600">
          All medical decisions are made by you and your healthcare provider.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Second Opinion</h2>
        <p className="text-gray-600 mb-3">In some pathways, a second opinion may be made available:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
          <li>The second opinion is a clinical service provided directly by the healthcare provider</li>
          <li>MrClinc does not commission, select, assign, or influence the second opinion</li>
          <li>MrClinc does not provide or procure medical services</li>
          <li>There is no charge by MrClinc for coordination of this stage</li>
          <li>The second opinion does not replace professional medical advice</li>
          <li>The second opinion does not commit you to treatment</li>
          <li>The second opinion does not transfer responsibility to MrClinc</li>
        </ul>
        <p className="text-gray-600">
          You remain fully in control of whether and how you proceed.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Medical Records and Documents</h2>
        <p className="text-gray-600 mb-4">
          MrClinc does not collect or store medical records.
        </p>
        <p className="text-gray-600 mb-4">
          If a healthcare provider needs medical documents, they will contact you directly.
        </p>
        <p className="text-gray-600">
          Any medical information is shared between you and the provider only, not through the platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Your Role as a Patient</h2>
        <p className="text-gray-600 mb-3">By using the platform, you understand that:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>You decide whether to pursue treatment</li>
          <li>You communicate directly with healthcare providers about medical matters</li>
          <li>Healthcare outcomes cannot be predicted or guaranteed</li>
          <li>MrClinc supports coordination, not clinical judgement</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Tracking and Updates</h2>
        <p className="text-gray-600 mb-3">You may receive a reference code that allows you to:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
          <li>Check the progress of your request</li>
          <li>Understand which stage the process is in</li>
        </ul>
        <p className="text-gray-600">
          This tracking relates to process status only, not medical outcomes.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">8. If You Choose Not to Continue</h2>
        <p className="text-gray-600 mb-4">
          You are not required to proceed with treatment.
        </p>
        <p className="text-gray-600">
          Choosing not to continue will not result in pressure, follow-up sales contact, or penalties.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Questions or Concerns</h2>
        <p className="text-gray-600 mb-2">
          If you are unsure about how the platform works or what it can and cannot do, you may contact MrClinc for clarification: <a href="mailto:info@mrclinc.com" className="text-primary-600 hover:underline">info@mrclinc.com</a>
        </p>
        <p className="text-sm text-gray-500">
          This email address is actively monitored. We aim to respond to general enquiries within 5 business days.
        </p>
      </section>

      <section className="p-6 bg-gray-50 rounded-xl">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Summary</h2>
        <p className="text-gray-600 mb-3">In simple terms:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>MrClinc helps organise and track healthcare requests</li>
          <li>Medical decisions remain with you and your healthcare provider</li>
          <li>The platform does not sell, recommend, or advise</li>
        </ul>
      </section>
    </LegalLayout>
  );
}
