import { LegalLayout } from "@/components/LegalLayout";

export default function TermsPage() {
  return (
    <LegalLayout title="Patient Terms of Use" lastUpdated="January 2026">
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
        <p className="text-gray-600 mb-4">
          These Terms of Use apply to individuals ("Patients", "you") who access or use the MrClinc platform.
        </p>
        <p className="text-gray-600 mb-4">
          MrClinc is a healthcare pathway coordination platform. MrClinc is not a clinic, hospital, medical provider, agency, broker, or referral service.
        </p>
        <p className="text-gray-600">
          By accessing or using the platform, you confirm that you have read and understood these Terms of Use and agree to be bound by them.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">2. What MrClinc Does</h2>
        <p className="text-gray-600 mb-4">
          MrClinc provides a coordination layer that supports patients in:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>Submitting a request for healthcare pathway coordination</li>
          <li>Accessing structured clinical channels</li>
          <li>Tracking the status of their request through a reference code</li>
          <li>Receiving process-related updates</li>
        </ul>
        <p className="text-gray-600 mt-4">
          MrClinc's role is limited to coordination and process facilitation.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">3. What MrClinc Does NOT Do</h2>
        <p className="text-gray-600 mb-4">MrClinc does not:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>Provide medical advice or medical opinions</li>
          <li>Diagnose conditions or recommend treatments</li>
          <li>Recommend, select, rank, or compare doctors or clinics</li>
          <li>Guarantee outcomes, results, timelines, or success</li>
          <li>Discuss or negotiate prices, packages, or costs</li>
          <li>Act on behalf of any clinic or healthcare provider</li>
          <li>Replace or interfere with clinical decision-making</li>
          <li>Provide or procure medical services</li>
        </ul>
        <p className="text-gray-600 mt-4">
          All medical decisions remain solely between the patient and the healthcare provider.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Second Opinion</h2>
        <p className="text-gray-600 mb-4">
          Where a second opinion is made available as part of a coordination pathway:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>The second opinion is a clinical service provided directly by the healthcare provider</li>
          <li>MrClinc does not commission, select, assign, or influence the second opinion</li>
          <li>MrClinc does not provide or procure medical services</li>
          <li>There is no charge by MrClinc for coordination of the second opinion stage</li>
          <li>The second opinion does not obligate the patient to proceed with treatment</li>
          <li>The second opinion does not transfer decision-making responsibility to MrClinc</li>
        </ul>
        <p className="text-gray-600 mt-4">
          The patient remains fully responsible for all medical decisions.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Patient Responsibility</h2>
        <p className="text-gray-600 mb-4">By using the platform, you acknowledge that:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>You remain responsible for deciding whether to pursue any medical treatment</li>
          <li>You will communicate directly with healthcare providers regarding medical matters</li>
          <li>You understand that healthcare outcomes are uncertain and cannot be guaranteed</li>
          <li>You will not rely on MrClinc for clinical judgement or treatment selection</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Medical Information and Documents</h2>
        <p className="text-gray-600 mb-4">
          MrClinc does not request, receive, review, store, or process medical records, images, reports, or diagnostic materials.
        </p>
        <p className="text-gray-600">
          Any medical documents are shared directly between you and the healthcare provider. MrClinc is not involved in this exchange.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Platform Access and Use</h2>
        <p className="text-gray-600 mb-4">You agree to use the platform:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>Only for lawful and personal purposes</li>
          <li>In a truthful and accurate manner</li>
          <li>Without attempting to misuse, disrupt, or manipulate platform processes</li>
        </ul>
        <p className="text-gray-600 mt-4">
          MrClinc may restrict or suspend access if the platform is misused or if these Terms are breached.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Limitation of Responsibility</h2>
        <p className="text-gray-600 mb-4">To the maximum extent permitted by law:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>MrClinc is not responsible for medical outcomes</li>
          <li>MrClinc is not responsible for acts or omissions of healthcare providers</li>
          <li>MrClinc is not responsible for delays, cancellations, or clinical decisions</li>
          <li>MrClinc is not responsible for travel, accommodation, or post-treatment care arrangements</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Availability and Continuity</h2>
        <p className="text-gray-600 mb-4">
          MrClinc does not guarantee continuous or uninterrupted availability of the platform.
        </p>
        <p className="text-gray-600">
          Platform access may be temporarily limited for maintenance, security, or operational reasons.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Data Protection</h2>
        <p className="text-gray-600 mb-4">
          Personal data is processed in accordance with the MrClinc Privacy Policy.
        </p>
        <p className="text-gray-600">
          Coordination-related information is handled only as required for operational purposes and is subject to applicable data protection standards.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Changes to These Terms</h2>
        <p className="text-gray-600 mb-4">
          MrClinc may update these Terms of Use to reflect operational, regulatory, or policy changes. Non-material changes (e.g. formatting, clarification) may be made without notice.
        </p>
        <p className="text-gray-600">
          The most recent version will always be published on the platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">12. Contact</h2>
        <p className="text-gray-600 mb-2">
          For questions related to these Terms of Use, you may contact MrClinc via email: <a href="mailto:info@mrclinc.com" className="text-primary-600 hover:underline">info@mrclinc.com</a>
        </p>
        <p className="text-sm text-gray-500">
          This email address is actively monitored. We aim to respond to enquiries within 5 business days.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">13. Governing Context</h2>
        <p className="text-gray-600">
          These Terms are intended to be read as a non-promotional, informational framework describing the limited and neutral role of the MrClinc platform.
        </p>
      </section>
    </LegalLayout>
  );
}
