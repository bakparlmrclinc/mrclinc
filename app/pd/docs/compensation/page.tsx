import { PDDocLayout } from "@/components/PDDocLayout";

export default function PDCompensationPage() {
  return (
    <PDDocLayout title="Pathway Developer Compensation Framework">
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Purpose</h2>
        <p className="text-gray-600 mb-4">
          This document explains how compensation is calculated and processed for Pathway Developers ("PDs") using the MrClinc platform.
        </p>
        <p className="text-gray-600">
          It is intended for transparency, auditability, and operational clarity.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">2. General Principles</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <ul className="list-disc list-inside text-blue-800 space-y-2">
            <li><strong>Compensation is strictly for coordination milestones only</strong></li>
            <li><strong>Compensation is not linked to treatment decisions, conversion, or clinical outcomes</strong></li>
            <li><strong>Pathway Developers have no influence over clinical choice, provider selection, or patient decisions</strong></li>
          </ul>
        </div>
        <p className="text-gray-600 mb-3">Additional principles:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>Compensation is case-based and milestone-triggered</li>
          <li>There is no salary, retainer, or minimum guarantee</li>
          <li>Compensation is not linked to sales, persuasion, or conversion</li>
          <li>Patient-facing systems do not display compensation information</li>
        </ul>
        <p className="text-gray-600 mt-4">
          Compensation reflects coordination work completed, not clinical outcomes.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Eligible Case Categories</h2>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <p className="text-amber-800 font-medium">
            These amounts do not represent referral fees, commissions, or patient-linked payments. They reflect coordination milestone completion only.
          </p>
        </div>
        <p className="text-gray-600 mb-4">
          Compensation may be generated only for completed cases in the following categories:
        </p>

        <div className="space-y-4">
          <div className="border border-gray-200 rounded-xl p-5">
            <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
              <h3 className="font-semibold text-gray-900">3.1 Aesthetic / Plastic Surgery</h3>
              <span className="bg-primary-100 text-primary-700 text-sm font-medium px-3 py-1 rounded-full">€250 + €100 bonus</span>
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl p-5">
            <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
              <h3 className="font-semibold text-gray-900">3.2 Oncology Surgery</h3>
              <span className="bg-primary-100 text-primary-700 text-sm font-medium px-3 py-1 rounded-full">€1,000 + €200 bonus</span>
            </div>
            <p className="text-sm text-green-700">Second opinion stage: no charge by MrClinc to the patient</p>
          </div>

          <div className="border border-gray-200 rounded-xl p-5">
            <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
              <h3 className="font-semibold text-gray-900">3.3 General Surgery</h3>
              <span className="bg-primary-100 text-primary-700 text-sm font-medium px-3 py-1 rounded-full">€1,000 + €200 bonus</span>
            </div>
            <p className="text-sm text-green-700">Second opinion stage: no charge by MrClinc to the patient</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Milestone Definition</h2>
        <p className="text-gray-600 mb-4">
          Compensation is triggered only when a case reaches the platform-defined <strong>Completed</strong> status.
        </p>
        <p className="text-gray-600 mb-3">A case may be closed without compensation if:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>The patient chooses not to proceed</li>
          <li>Required coordination milestones are not completed</li>
          <li>Platform rules or conduct standards are breached</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Bonus Conditions</h2>
        <p className="text-gray-600 mb-3">Additional milestone amounts apply only where:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
          <li>Coordination steps are completed accurately</li>
          <li>Platform records are complete and auditable</li>
          <li>No boundary violations or prohibited behaviour occurred</li>
        </ul>
        <p className="text-gray-600">
          Bonus eligibility is determined by platform status, not subjective assessment.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Payment Processing</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
          <li>Payments are processed by the MrClinc platform</li>
          <li>Self-billing applies; PDs will not issue invoices to MrClinc</li>
          <li>Payments are calculated in EUR</li>
          <li>Payment timing is defined by the platform's payout cycle</li>
        </ul>
        <p className="text-gray-600">
          No advance payments are made.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Tax Responsibility</h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <ul className="list-disc list-inside text-red-800 space-y-2">
            <li>The PD is solely responsible for all tax, social security, and reporting obligations in their jurisdiction of residence</li>
            <li>MrClinc does not withhold taxes on behalf of the PD</li>
            <li>MrClinc is not responsible for PD tax compliance</li>
            <li>PDs must ensure compliance with applicable local tax laws and maintain appropriate records</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Records and Audit</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>All compensation calculations are based on platform records</li>
          <li>Records are retained for audit and compliance purposes</li>
          <li>MrClinc may withhold payment where discrepancies or compliance concerns arise</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Changes to This Framework</h2>
        <p className="text-gray-600 mb-4">
          This framework may be updated to reflect operational or regulatory requirements. Non-material changes (e.g. formatting, clarification) may be made without notice.
        </p>
        <p className="text-gray-600">
          The most recent version will be available within the platform.
        </p>
      </section>
    </PDDocLayout>
  );
}
