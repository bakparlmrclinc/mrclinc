import { LegalLayout } from "@/components/LegalLayout";

export default function DisclaimerPage() {
  return (
    <LegalLayout title="Medical & Non-Promotional Disclaimer" lastUpdated="January 2026">
      <section className="p-6 bg-amber-50 border border-amber-200 rounded-xl mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Important Notice</h2>
        <p className="text-gray-700">
          MrClinc is a healthcare pathway coordination platform. The information provided on this platform is for coordination and process tracking purposes only. It is not intended to replace professional medical advice, diagnosis, or treatment.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">What MrClinc Does NOT Do</h2>
        <p className="text-gray-600 mb-3">MrClinc:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>Does not provide medical advice</li>
          <li>Does not diagnose conditions</li>
          <li>Does not recommend doctors or clinics</li>
          <li>Does not compare treatments, outcomes, or providers</li>
          <li>Does not guarantee results or timelines</li>
          <li>Does not discuss pricing, packages, or costs</li>
          <li>Does not provide or procure medical services</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Medical Decisions</h2>
        <p className="text-gray-600">
          All medical decisions are made solely between the patient and the healthcare provider. MrClinc does not participate in, influence, or take responsibility for any clinical decisions.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Platform Role</h2>
        <p className="text-gray-600">
          MrClinc does not act as an agent, broker, or referral service. The platform's role is strictly limited to coordination and process facilitation.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Medical Records</h2>
        <p className="text-gray-600">
          Medical records and diagnostic materials are shared directly between the patient and the healthcare provider. MrClinc does not receive, store, or process medical documents.
        </p>
      </section>

      <section className="p-6 bg-red-50 border border-red-200 rounded-xl">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Seek Professional Advice</h2>
        <p className="text-gray-700">
          Use of this platform does not replace professional medical advice. Always consult with qualified healthcare professionals for medical decisions. If you have a medical emergency, contact your local emergency services immediately.
        </p>
      </section>
    </LegalLayout>
  );
}
