import { PDDocLayout } from "@/components/PDDocLayout";

export default function PDConductPage() {
  return (
    <PDDocLayout title="Pathway Developer Code of Conduct">
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Purpose</h2>
        <p className="text-gray-600 mb-4">
          This Code of Conduct defines the ethical and professional standards expected of all Pathway Developers ("PDs") using the MrClinc platform.
        </p>
        <p className="text-gray-600">
          It exists to protect patients, clinical channels, and the integrity of the platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Core Principles</h2>
        <p className="text-gray-600 mb-3">PDs must act with:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
          <li><strong>Neutrality</strong></li>
          <li><strong>Accuracy</strong></li>
          <li><strong>Transparency</strong></li>
          <li><strong>Respect for patient autonomy</strong></li>
          <li><strong>Awareness of regulatory boundaries</strong></li>
        </ul>
        <p className="text-gray-600">
          PDs must avoid any behaviour that could be perceived as sales, referral, or clinical influence.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Patient Interaction Standards</h2>
        <p className="text-gray-600 mb-3">When interacting with patients, PDs must:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
          <li>Communicate in a calm, factual, and non-promotional manner</li>
          <li>Clearly explain what MrClinc does and does not do</li>
          <li>Redirect all medical questions to healthcare providers</li>
          <li>Avoid expressing opinions about treatments, clinics, or outcomes</li>
        </ul>
        <p className="text-amber-700 font-medium">
          PDs must not create urgency, pressure, or expectation.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Prohibited Conduct</h2>
        <p className="text-gray-600 mb-3">PDs must not:</p>
        <ul className="list-disc list-inside text-red-600 space-y-2 ml-4">
          <li>Provide medical advice or clinical opinions</li>
          <li>Recommend, endorse, or discourage specific providers</li>
          <li>Discuss prices, discounts, packages, or costs</li>
          <li>Promise or imply outcomes or success</li>
          <li>Accept gifts, payments, or benefits from patients</li>
          <li>Handle medical records or diagnostic materials</li>
          <li>Operate outside the MrClinc platform</li>
          <li>Access, process, view, or handle special category health data</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Language and Representation</h2>
        <p className="text-gray-600 mb-3">PDs must not:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
          <li>Use titles or descriptions implying medical authority</li>
          <li>Represent themselves as agents or representatives of clinics</li>
          <li>Use marketing or persuasive language</li>
          <li>Use prohibited terminology defined by the platform</li>
        </ul>
        <p className="text-gray-600">
          All representations must reflect the limited coordination role.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Communication Examples</h2>
        
        <h3 className="text-lg font-medium text-gray-800 mb-3">Approved Phrases</h3>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <ul className="list-disc list-inside text-green-800 space-y-2">
            <li>"MrClinc is a coordination platform — we help organise the process."</li>
            <li>"I can help you submit your request to the platform."</li>
            <li>"For medical questions, you would need to speak directly with the healthcare provider."</li>
            <li>"I can check the status of your request for you."</li>
          </ul>
        </div>

        <h3 className="text-lg font-medium text-gray-800 mb-3">Prohibited Phrases</h3>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <ul className="list-disc list-inside text-red-800 space-y-2">
            <li>"I recommend this clinic / doctor."</li>
            <li>"This treatment has a high success rate."</li>
            <li>"You should definitely go ahead with this."</li>
            <li>"The price is very competitive."</li>
            <li>"This is better than what you'd get at home."</li>
            <li>"If I were you, I would..."</li>
          </ul>
        </div>

        <p className="text-gray-600">
          The same rules apply across all communication channels: platform messaging, email, WhatsApp, phone calls, and any other communication.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Data Protection and Confidentiality</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
          <li>Access to personal data is limited to what is necessary for coordination</li>
          <li>PDs do not access, process, view, or handle medical records, diagnostic reports, or special category health data</li>
          <li>Data must not be copied, exported, or stored outside the platform</li>
          <li>Confidentiality must be maintained at all times</li>
        </ul>
        <p className="text-red-600 font-medium">
          Any data breach or suspected misuse must be reported immediately.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Conflicts of Interest</h2>
        <p className="text-gray-600 mb-4">
          PDs must disclose any situation that could reasonably be perceived as a conflict of interest.
        </p>
        <p className="text-red-600 font-medium">
          Undisclosed conflicts may result in immediate suspension or termination.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Monitoring and Enforcement</h2>
        <p className="text-gray-600 mb-3">MrClinc may:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
          <li>Monitor PD activity and communications (including off-platform where relevant)</li>
          <li>Review records for compliance</li>
          <li>Investigate complaints or irregularities</li>
        </ul>
        <p className="text-gray-600 mb-3">Violations may result in:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
          <li>Warnings</li>
          <li>Suspension</li>
          <li>Termination of platform access</li>
        </ul>
        <p className="text-gray-600">
          Severity and risk will determine the response.
        </p>
      </section>

      <section className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Acknowledgement</h2>
        <p className="text-amber-800">
          By continuing to use the platform, PDs confirm their understanding of and commitment to this Code of Conduct.
        </p>
      </section>
    </PDDocLayout>
  );
}
