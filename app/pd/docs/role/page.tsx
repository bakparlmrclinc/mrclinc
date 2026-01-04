import { PDDocLayout } from "@/components/PDDocLayout";

export default function PDRolePage() {
  return (
    <PDDocLayout title="Pathway Developer Role Definition & Scope">
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Purpose of This Document</h2>
        <p className="text-gray-600 mb-4">
          This document defines the role, scope, and boundaries of a Pathway Developer ("PD") operating on the MrClinc platform.
        </p>
        <p className="text-gray-600">
          It is intended to ensure consistent, ethical, and regulation-aware behaviour across all PD activity.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Role Summary</h2>
        <p className="text-gray-600 mb-3">A Pathway Developer is an independent coordinator who supports:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
          <li>Entry of patient requests into the platform</li>
          <li>Correct initiation of coordination pathways</li>
          <li>Process clarity and handover between parties</li>
          <li>Monitoring of operational progress</li>
        </ul>
        <p className="text-gray-600 font-medium">
          The PD role is non-clinical and non-commercial.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">3. What a PD Does</h2>
        <p className="text-gray-600 mb-3">A PD may:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
          <li>Explain how the MrClinc platform works (factually and neutrally)</li>
          <li>Support patients in submitting requests to the platform</li>
          <li>Ensure minimum required information is provided for coordination</li>
          <li>Monitor request status within the platform</li>
          <li>Escalate delays or process issues through defined channels</li>
        </ul>
        <p className="text-gray-600">
          All actions must remain informational and non-promotional.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">4. What a PD Does NOT Do</h2>
        <p className="text-gray-600 mb-3">A PD must not:</p>
        <ul className="list-disc list-inside text-red-600 space-y-2 ml-4">
          <li>Provide medical advice or opinions</li>
          <li>Interpret clinical findings or test results</li>
          <li>Recommend or select doctors or clinics</li>
          <li>Compare providers, treatments, outcomes, or timelines</li>
          <li>Discuss prices, costs, packages, or financial arrangements</li>
          <li>Apply pressure, persuasion, or urgency</li>
          <li>Represent themselves as a medical professional within MrClinc</li>
          <li>Act as an agent, broker, or referral source</li>
          <li>Access, process, view, or handle medical records, diagnostic reports, or special category health data</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Prohibited Language and Behaviour</h2>
        <p className="text-gray-600 mb-3">PDs must avoid language that implies:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
          <li>Medical authority or endorsement</li>
          <li>Guarantees or expected outcomes</li>
          <li>Superiority of specific clinics or providers</li>
          <li>Sales or commercial intent</li>
        </ul>
        <p className="text-red-600 font-medium">
          Use of prohibited terminology may result in suspension or termination.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Patient Interaction Boundaries</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>Communication must remain respectful, neutral, and factual</li>
          <li>PDs must redirect all medical questions to healthcare providers</li>
          <li>PDs must not request or receive medical records</li>
          <li>PDs must not communicate on behalf of clinics</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Approved and Prohibited Patient Communication</h2>
        
        <h3 className="text-lg font-medium text-gray-800 mb-3">7.1 Approved Phrases (Examples)</h3>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <ul className="list-disc list-inside text-green-800 space-y-2">
            <li>"MrClinc is a coordination platform — we help organise the process."</li>
            <li>"I can help you submit your request to the platform."</li>
            <li>"For medical questions, you would need to speak directly with the healthcare provider."</li>
            <li>"I can check the status of your request for you."</li>
            <li>"The platform tracks the coordination process, not medical outcomes."</li>
          </ul>
        </div>

        <h3 className="text-lg font-medium text-gray-800 mb-3">7.2 Prohibited Phrases (Examples)</h3>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <ul className="list-disc list-inside text-red-800 space-y-2">
            <li>"I recommend this clinic / doctor."</li>
            <li>"This treatment has a high success rate."</li>
            <li>"You should definitely go ahead with this."</li>
            <li>"The price is very competitive."</li>
            <li>"This is better than what you'd get at home."</li>
            <li>"If I were you, I would..."</li>
            <li>Any statement comparing providers, outcomes, or costs.</li>
          </ul>
        </div>

        <h3 className="text-lg font-medium text-gray-800 mb-3">7.3 Response Guidelines</h3>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-700 border-b">If patient asks...</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 border-b">PD must respond...</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 text-gray-600">"Which clinic should I choose?"</td>
                <td className="px-4 py-3 text-gray-600">"I'm not able to recommend clinics. The platform connects you with clinical channels, and the choice is entirely yours."</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 text-gray-600">"What results can I expect?"</td>
                <td className="px-4 py-3 text-gray-600">"I can't comment on medical outcomes. That's something to discuss directly with the healthcare provider."</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 text-gray-600">"How much will it cost?"</td>
                <td className="px-4 py-3 text-gray-600">"I don't have access to pricing information. Costs are discussed directly between you and the provider."</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-gray-600">"What would you do?"</td>
                <td className="px-4 py-3 text-gray-600">"I'm not in a position to advise on personal decisions. My role is to support the coordination process."</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-medium text-gray-800 mt-6 mb-3">7.4 Communication Channels</h3>
        <p className="text-gray-600 mb-3">The same rules apply across all communication channels:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
          <li>Platform messaging</li>
          <li>Email</li>
          <li>WhatsApp</li>
          <li>Phone calls</li>
          <li>Any other direct or indirect communication</li>
        </ul>
        <p className="text-amber-700 font-medium">
          Off-platform communication is subject to the same monitoring and compliance standards as platform communication.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Platform Dependency</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>All cases must be managed within the MrClinc platform</li>
          <li>Off-platform coordination is not permitted</li>
          <li>All actions must be recorded accurately and promptly</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Accountability</h2>
        <p className="text-gray-600 mb-3">PDs are accountable for:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
          <li>Adhering to defined role boundaries</li>
          <li>Maintaining accurate records</li>
          <li>Escalating risks or uncertainties promptly</li>
          <li>Protecting patient confidentiality</li>
        </ul>
        <p className="text-red-600 font-medium">
          Failure to comply may result in restriction or termination of platform access.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Relationship to Other Documents</h2>
        <p className="text-gray-600 mb-3">This document should be read alongside:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>Pathway Developer Agreement</li>
          <li>PD Code of Conduct</li>
          <li>PD Compensation Framework</li>
          <li>PD Data Processing Notice</li>
        </ul>
      </section>
    </PDDocLayout>
  );
}
