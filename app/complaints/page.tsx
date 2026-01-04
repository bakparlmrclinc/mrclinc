import { LegalLayout } from "@/components/LegalLayout";

export default function ComplaintsPage() {
  return (
    <LegalLayout title="Complaints & Escalation Policy" lastUpdated="January 2026">
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Purpose</h2>
        <p className="text-gray-600 mb-4">
          This policy explains how to raise a complaint or concern about the MrClinc platform or its coordination services.
        </p>
        <p className="text-gray-600">
          MrClinc is committed to handling complaints fairly, promptly, and transparently.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Scope</h2>
        <p className="text-gray-600 mb-3">This policy covers complaints relating to:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>Platform access and functionality</li>
          <li>Coordination process issues</li>
          <li>Communication concerns</li>
          <li>Data protection queries</li>
          <li>Conduct of Pathway Developers (non-clinical)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">3. What This Policy Does NOT Cover</h2>
        <p className="text-gray-600 mb-3">MrClinc cannot handle complaints relating to:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
          <li>Clinical decisions made by healthcare providers</li>
          <li>Medical outcomes or treatment results</li>
          <li>Pricing or costs charged by healthcare providers</li>
          <li>Clinical quality or medical negligence</li>
        </ul>
        <p className="text-gray-600">
          For clinical concerns, you should contact the healthcare provider directly or the relevant regulatory body in their jurisdiction.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">4. How to Submit a Complaint</h2>
        <p className="text-gray-600 mb-3">Complaints can be submitted via:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
          <li>Email: <a href="mailto:complaints@mrclinc.com" className="text-primary-600 hover:underline">complaints@mrclinc.com</a></li>
          <li>Platform contact form</li>
        </ul>
        <p className="text-gray-600 mb-3">Please include:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>Your name and contact details</li>
          <li>Your reference code (if applicable)</li>
          <li>A clear description of your concern</li>
          <li>Any relevant dates or details</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Acknowledgement</h2>
        <p className="text-gray-600">
          We will acknowledge receipt of your complaint within <strong>3 business days</strong>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Investigation</h2>
        <p className="text-gray-600 mb-3">We will investigate your complaint fairly and thoroughly. This may include:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>Reviewing platform records</li>
          <li>Contacting relevant parties</li>
          <li>Assessing against platform policies</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Response</h2>
        <p className="text-gray-600 mb-4">
          We aim to provide a full response within <strong>14 business days</strong>.
        </p>
        <p className="text-gray-600">
          If the investigation requires more time, we will inform you of the expected timeline.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Outcome</h2>
        <p className="text-gray-600 mb-3">Following investigation, we will:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>Explain our findings</li>
          <li>Outline any actions taken</li>
          <li>Provide information on further steps (if applicable)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Escalation</h2>
        <p className="text-gray-600 mb-3">If you are not satisfied with our response, you may:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
          <li>Request a review by a senior member of the MrClinc team</li>
          <li>Contact the relevant data protection authority (for data-related concerns)</li>
        </ul>
        <p className="text-gray-600">
          For UK residents, the Information Commissioner's Office (ICO) can be contacted at: <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">ico.org.uk</a>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Regulatory Concerns</h2>
        <p className="text-gray-600 mb-3">If you believe there is a serious regulatory concern, you may also contact:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
          <li>The relevant healthcare regulatory body in the provider's jurisdiction</li>
          <li>The Information Commissioner's Office (for data protection)</li>
        </ul>
        <p className="text-gray-600">
          MrClinc will cooperate with any regulatory enquiry.
        </p>
      </section>

      <section className="p-6 bg-primary-50 rounded-xl">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Contact</h2>
        <p className="text-gray-600 mb-2">
          Email: <a href="mailto:complaints@mrclinc.com" className="text-primary-600 hover:underline font-medium">complaints@mrclinc.com</a>
        </p>
        <p className="text-sm text-gray-500">
          This email address is actively monitored. We aim to acknowledge all complaints within 3 business days.
        </p>
      </section>
    </LegalLayout>
  );
}
