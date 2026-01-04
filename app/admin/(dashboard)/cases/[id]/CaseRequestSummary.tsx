interface CaseData {
  patientName: string;
  patientEmail: string;
  patientPhone: string | null;
  patientAge: number | null;
  patientCity: string | null;
  patientCountry: string;
  mainCategory: string;
  medicalSubType: string | null;
  cancerSystem: string | null;
  aestheticSubCategory: string | null;
  aestheticProcedure: string | null;
  generalCondition: string | null;
  description: string | null;
  pdCodeProvided: string | null;
  consent1: boolean;
  consent1At: Date | null;
  consent2: boolean;
  consent2At: Date | null;
  consent3: boolean;
  consent3At: Date | null;
  createdAt: Date;
}

export default function CaseRequestSummary({
  caseData,
}: {
  caseData: CaseData;
}) {
  return (
    <div className="bg-white rounded-lg border border-slate-200">
      <div className="px-4 py-3 border-b border-slate-200">
        <h2 className="font-medium text-slate-800">Request Summary</h2>
      </div>
      <div className="p-4 space-y-6">
        {/* Patient Info */}
        <div>
          <h3 className="text-sm font-medium text-slate-500 mb-2">
            Patient Information
          </h3>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div>
              <dt className="text-slate-500">Name</dt>
              <dd className="text-slate-800">{caseData.patientName}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Email</dt>
              <dd className="text-slate-800">{caseData.patientEmail}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Phone</dt>
              <dd className="text-slate-800">{caseData.patientPhone || "—"}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Age</dt>
              <dd className="text-slate-800">
                {caseData.patientAge || "—"}
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">Location</dt>
              <dd className="text-slate-800">
                {caseData.patientCity && `${caseData.patientCity}, `}
                {caseData.patientCountry}
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">Submitted</dt>
              <dd className="text-slate-800">
                {new Date(caseData.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </dd>
            </div>
          </dl>
        </div>

        {/* Service Info */}
        <div>
          <h3 className="text-sm font-medium text-slate-500 mb-2">
            Service Details
          </h3>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div>
              <dt className="text-slate-500">Category</dt>
              <dd className="text-slate-800">{caseData.mainCategory}</dd>
            </div>
            {caseData.medicalSubType && (
              <div>
                <dt className="text-slate-500">Medical Type</dt>
                <dd className="text-slate-800">{caseData.medicalSubType}</dd>
              </div>
            )}
            {caseData.cancerSystem && (
              <div>
                <dt className="text-slate-500">Cancer System</dt>
                <dd className="text-slate-800">{caseData.cancerSystem}</dd>
              </div>
            )}
            {caseData.aestheticSubCategory && (
              <div>
                <dt className="text-slate-500">Aesthetic Category</dt>
                <dd className="text-slate-800">
                  {caseData.aestheticSubCategory}
                </dd>
              </div>
            )}
            {caseData.aestheticProcedure && (
              <div>
                <dt className="text-slate-500">Procedure</dt>
                <dd className="text-slate-800">{caseData.aestheticProcedure}</dd>
              </div>
            )}
            {caseData.generalCondition && (
              <div className="col-span-2">
                <dt className="text-slate-500">General Condition</dt>
                <dd className="text-slate-800">{caseData.generalCondition}</dd>
              </div>
            )}
            {caseData.pdCodeProvided && (
              <div>
                <dt className="text-slate-500">PD Code (provided)</dt>
                <dd className="text-slate-800 font-mono">
                  {caseData.pdCodeProvided}
                </dd>
              </div>
            )}
          </dl>
        </div>

        {/* Description */}
        {caseData.description && (
          <div>
            <h3 className="text-sm font-medium text-slate-500 mb-2">
              Description
            </h3>
            <p className="text-sm text-slate-700 whitespace-pre-wrap">
              {caseData.description}
            </p>
          </div>
        )}

        {/* Consents */}
        <div>
          <h3 className="text-sm font-medium text-slate-500 mb-2">Consents</h3>
          <div className="space-y-1 text-sm">
            <ConsentRow
              label="Privacy & Terms"
              checked={caseData.consent1}
              timestamp={caseData.consent1At}
            />
            <ConsentRow
              label="Data Processing"
              checked={caseData.consent2}
              timestamp={caseData.consent2At}
            />
            <ConsentRow
              label="Communication"
              checked={caseData.consent3}
              timestamp={caseData.consent3At}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ConsentRow({
  label,
  checked,
  timestamp,
}: {
  label: string;
  checked: boolean;
  timestamp: Date | null;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`w-4 h-4 rounded flex items-center justify-center ${
          checked ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-400"
        }`}
      >
        {checked ? "✓" : "—"}
      </span>
      <span className="text-slate-700">{label}</span>
      {timestamp && (
        <span className="text-slate-400 text-xs">
          {new Date(timestamp).toLocaleDateString("en-GB")}
        </span>
      )}
    </div>
  );
}
