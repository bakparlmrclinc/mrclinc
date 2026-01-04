import { PublicPDDocLayout } from "@/components/PublicPDDocLayout";

export default function PDAgreementPage() {
  return (
    <PublicPDDocLayout title="Pathway Developer Agreement">
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Purpose and Scope</h2>
        <p className="text-gray-600 mb-4">
          This Agreement sets out the terms under which an individual (&quot;Pathway Developer&quot; or &quot;PD&quot;) may access and use the MrClinc platform.
        </p>
        <p className="text-gray-600">
          MrClinc is a healthcare pathway coordination platform. This Agreement governs coordination activities only.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Independent Status</h2>
        <p className="text-gray-600 mb-4">
          The PD acts as an independent, freelance contributor.
        </p>
        <p className="text-gray-600 mb-3">Nothing in this Agreement creates:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
          <li>An employment relationship</li>
          <li>An agency relationship</li>
          <li>A partnership or joint venture</li>
        </ul>
        <p className="text-gray-600">
          The PD has no authority to bind MrClinc or any healthcare provider.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">3. PD Responsibilities</h2>
        <p className="text-gray-600 mb-3">The PD agrees to:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>Act honestly and transparently with patients</li>
          <li>Never provide medical advice or influence treatment decisions</li>
          <li>Protect patient confidentiality at all times</li>
          <li>Follow all platform policies and guidelines</li>
          <li>Report any concerns or issues promptly</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Prohibited Activities</h2>
        <p className="text-gray-600 mb-3">The PD must not:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>Request or accept payment from patients</li>
          <li>Guarantee outcomes or make promises on behalf of providers</li>
          <li>Share patient information without authorization</li>
          <li>Misrepresent their role or qualifications</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Termination</h2>
        <p className="text-gray-600 mb-4">
          Either party may terminate this Agreement at any time with written notice.
        </p>
        <p className="text-gray-600">
          MrClinc may immediately terminate access if the PD violates any terms of this Agreement.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Governing Law</h2>
        <p className="text-gray-600">
          This Agreement is governed by the laws of the United Kingdom.
        </p>
      </section>
    </PublicPDDocLayout>
  );
}
