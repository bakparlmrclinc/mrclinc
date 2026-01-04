"use client";

import { useState } from "react";
import Link from "next/link";

const steps = [
  { id: 1, name: "Introduction" },
  { id: 2, name: "Basic Info" },
  { id: 3, name: "Professional" },
  { id: 4, name: "Network" },
  { id: 5, name: "Availability" },
  { id: 6, name: "Workflow" },
  { id: 7, name: "Compensation" },
  { id: 8, name: "Compliance" },
  { id: 9, name: "Declaration" },
];

const networkTypeOptions = [
  { value: "patient_support", label: "Patient support or advocacy groups" },
  { value: "intl_advisors", label: "International patient advisors / coordinators" },
  { value: "expat_orgs", label: "Expat or diaspora organisations" },
  { value: "corporate_wellness", label: "Corporate wellness or employee health contacts" },
  { value: "other", label: "Other (please specify)" },
];

const availabilityOptions = [
  { value: "occasional", label: "Occasional (case-by-case)" },
  { value: "regular", label: "Regular but limited" },
  { value: "consistent", label: "Consistent availability" },
];

const workingModeOptions = [
  { value: "remote", label: "Fully remote" },
  { value: "hybrid", label: "Hybrid (remote + local presence)" },
];

// Country options for Step 2
const countryOptions = [
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "Ireland", label: "Ireland" },
  { value: "Isle of Man", label: "Isle of Man" },
  { value: "Jersey", label: "Jersey" },
  { value: "Guernsey", label: "Guernsey" },
  { value: "__other__", label: "Other / Not listed" },
];

// City options by country for Step 2
const cityOptionsByCountry: Record<string, string[]> = {
  "United Kingdom": [
    "London", "Birmingham", "Manchester", "Liverpool", "Leeds", "Sheffield", "Bristol",
    "Nottingham", "Leicester", "Coventry", "Bradford", "Stoke-on-Trent", "Wolverhampton",
    "Derby", "Swansea", "Cardiff", "Newport", "Glasgow", "Edinburgh", "Aberdeen", "Dundee",
    "Inverness", "Belfast", "Derry/Londonderry", "Lisburn", "Newry", "Plymouth", "Southampton",
    "Portsmouth", "Brighton", "Oxford", "Cambridge", "Reading", "Milton Keynes", "Northampton",
    "Norwich", "Ipswich", "Peterborough", "Luton", "Watford", "Slough", "Guildford", "Canterbury",
    "Maidstone", "Chelmsford", "Colchester", "Southend-on-Sea", "Exeter", "Bath", "Gloucester",
    "Cheltenham", "Bournemouth", "Poole", "Swindon", "York", "Hull", "Middlesbrough", "Sunderland",
    "Newcastle upon Tyne", "Durham", "Carlisle", "Lancaster", "Preston", "Blackpool", "Warrington",
    "Stockport", "Salford", "Bolton", "Wigan", "Oldham", "Rochdale", "Burnley", "Blackburn",
    "Halifax", "Huddersfield", "Wakefield", "Doncaster", "Rotherham", "Barnsley", "Lincoln",
    "Worcester", "Hereford", "Shrewsbury", "Telford"
  ],
  "Ireland": [
    "Dublin", "Cork", "Limerick", "Galway", "Waterford", "Drogheda", "Dundalk", "Swords",
    "Bray", "Navan", "Kilkenny", "Athlone", "Wexford", "Letterkenny", "Tralee", "Ennis",
    "Carlow", "Mullingar"
  ],
  "Isle of Man": [
    "Douglas", "Ramsey", "Peel", "Castletown", "Port Erin"
  ],
  "Jersey": [
    "Saint Helier", "Saint Brelade", "Saint Clement", "Saint Saviour"
  ],
  "Guernsey": [
    "Saint Peter Port", "Saint Sampson", "Castel", "Vale"
  ],
};

export default function PDApplicationPage() {
  const [step, setStep] = useState(1);
  const [subStep, setSubStep] = useState(1); // For Step 1 internal progression
  const [step1Confirmed, setStep1Confirmed] = useState(false); // Step 1 confirmation gate
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  
  // UI state for country/city "Other" selection (not stored in formData)
  const [countryIsOther, setCountryIsOther] = useState(false);
  const [cityIsOther, setCityIsOther] = useState(false);

  const [formData, setFormData] = useState({
    // Basic Info
    fullName: "",
    country: "",
    city: "",
    email: "",
    phone: "",
    preferredContact: "whatsapp",

    // Professional Background
    currentProfession: "",
    organisationType: "independent",
    yearsExperience: "",
    professionalActivity: "",

    // Network & Channel Context
    networkTypes: [] as string[],
    networkTypesOther: "",
    networkCountries: "",
    introductionApproach: "",

    // Availability
    availabilityLevel: "",
    workingMode: "",

    // Compliance
    ackFreelance: false,
    ackNoSales: false,
    ackNotClinic: false,
    ackTraceable: false,
    ackCaseBased: false,

    // Declaration
    declareAccurate: false,
    acceptPDAgreement: false,
    acceptDataProcessing: false,
    signatureName: "",
  });

  const updateField = (field: string, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleNetworkType = (value: string) => {
    setFormData(prev => ({
      ...prev,
      networkTypes: prev.networkTypes.includes(value)
        ? prev.networkTypes.filter(t => t !== value)
        : [...prev.networkTypes, value]
    }));
  };

  // Handle country selection change
  const handleCountryChange = (value: string) => {
    if (value === "__other__") {
      setCountryIsOther(true);
      updateField("country", "");
    } else {
      setCountryIsOther(false);
      updateField("country", value);
    }
    // Reset city when country changes
    updateField("city", "");
    setCityIsOther(false);
  };

  // Handle city selection change
  const handleCityChange = (value: string) => {
    if (value === "__other__") {
      setCityIsOther(true);
      updateField("city", "");
    } else {
      setCityIsOther(false);
      updateField("city", value);
    }
  };

  // Get available cities for selected country
  const getAvailableCities = (): string[] => {
    if (countryIsOther || !formData.country) return [];
    return cityOptionsByCountry[formData.country] || [];
  };

  const validateStep = (stepNum: number): boolean => {
    switch (stepNum) {
      case 1: return step1Confirmed; // Must complete all sub-sections and confirm
      case 2:
        return !!(formData.fullName && formData.country && formData.city && 
                  formData.email && formData.phone && formData.preferredContact);
      case 3:
        return !!(formData.currentProfession && formData.organisationType && 
                  formData.yearsExperience && formData.professionalActivity);
      case 4:
        return !!(formData.networkTypes.length > 0 && formData.networkCountries && 
                  formData.introductionApproach);
      case 5:
        return !!(formData.availabilityLevel && formData.workingMode);
      case 6: return true; // Workflow example - just reading
      case 7: return true; // Compensation - just reading
      case 8:
        return !!(formData.ackFreelance && formData.ackNoSales && formData.ackNotClinic && 
                  formData.ackTraceable && formData.ackCaseBased);
      case 9:
        return !!(formData.declareAccurate && formData.acceptPDAgreement && 
                  formData.acceptDataProcessing && formData.signatureName);
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const goToStep = (targetStep: number) => {
    // Can only go to steps we've already passed or current
    if (targetStep <= step) {
      setStep(targetStep);
      window.scrollTo(0, 0);
    }
  };

  // Step 1 sub-navigation
  const handleSubStepNext = () => {
    if (subStep < 8) {
      setSubStep(subStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubStepBack = () => {
    if (subStep > 1) {
      setSubStep(subStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(9)) return;

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/pd/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          networkCountries: formData.networkCountries.split(",").map(c => c.trim()).filter(Boolean),
          consentTimestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Submission failed");
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success Screen
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Application Submitted</h1>
          <p className="text-gray-600 mb-6">
            Thank you for completing the Pathway Developer onboarding form. 
            Your information will be reviewed for final onboarding. If approved, your MR.CLINC 
            platform login details will be shared with you.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center text-primary-600 hover:text-primary-700 font-medium"
          >
            ← Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/">
            <img src="/images/logo.svg" alt="MR.CLINC" className="h-10 w-auto" />
          </Link>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-200 sticky top-[65px] z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between overflow-x-auto pb-2 gap-1">
            {steps.map((s, index) => (
              <button
                key={s.id}
                onClick={() => goToStep(s.id)}
                disabled={s.id > step}
                className={`flex flex-col items-center min-w-[60px] transition-all ${
                  s.id > step ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-1 transition-colors ${
                  s.id < step 
                    ? "bg-primary-600 text-white" 
                    : s.id === step 
                    ? "bg-primary-600 text-white ring-4 ring-primary-100" 
                    : "bg-gray-200 text-gray-500"
                }`}>
                  {s.id < step ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    s.id
                  )}
                </div>
                <span className={`text-[10px] text-center leading-tight ${
                  s.id === step ? "text-primary-600 font-medium" : "text-gray-500"
                }`}>
                  {s.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
          
          {/* Step 1: Introduction - Multi-section guided briefing */}
          {step === 1 && (
            <div className="p-6 md:p-8">
              {/* Sub-step progress indicator */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span>Section {subStep} of 8</span>
                  <span>{Math.round((subStep / 8) * 100)}% complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-primary-600 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${(subStep / 8) * 100}%` }}
                  />
                </div>
              </div>

              {/* Sub-step 1: Context & Problem */}
              {subStep === 1 && (
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Next-Generation Healthcare Coordination: MrClinc
                  </h1>
                  <p className="text-sm text-primary-600 font-medium mb-6">Global Need and a Transparent Solution</p>
                  
                  <div className="text-gray-600 space-y-4">
                    <p>
                      Healthcare systems worldwide are facing serious bottlenecks. In the United Kingdom alone (NHS), 
                      more than 7.5 million patients are waiting for surgical procedures. This global picture directs 
                      over 1.5 million patients annually toward Turkey's high-standard healthcare services.
                    </p>
                    <p>
                      However, this growing demand has also brought transparency and ethical issues created by 
                      traditional broker and agency models. Patients no longer need promises—they need neutral 
                      coordination, traceable processes, and a structure with professional boundaries.
                    </p>
                    <p className="font-medium text-gray-800">
                      MrClinc is an independent healthcare coordination layer designed to address this need.
                    </p>
                  </div>
                </div>
              )}

              {/* Sub-step 2: What is MrClinc? */}
              {subStep === 2 && (
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">You are now reading</p>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">What is MrClinc?</h2>
                  
                  <div className="text-gray-600 space-y-4">
                    <p className="font-medium text-gray-800 text-lg">
                      MrClinc is not a clinic, a sales agency, or a treatment provider.
                    </p>
                    
                    <p>MrClinc offers a neutral process architecture that:</p>
                    <ul className="list-disc list-inside ml-2 space-y-2">
                      <li>Structures the process between patient and clinic</li>
                      <li>Does not intervene in medical decision processes</li>
                      <li>Does not engage in sales, negotiation, or referrals</li>
                      <li>Makes the entire process digital and traceable</li>
                    </ul>
                    
                    <p>
                      With our Antalya-based operational structure, we reject marketing-focused medical tourism 
                      approaches. We create a navigation layer that directs patients to specialist channels, 
                      with every step recorded and verifiable.
                    </p>
                  </div>
                </div>
              )}

              {/* Sub-step 3: Why This Model Exists */}
              {subStep === 3 && (
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">You are now reading</p>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Core Principles of the MrClinc Model</h2>
                  
                  <p className="text-gray-600 mb-6">
                    Our system operates on the <strong className="text-gray-800">Calm Confidence</strong> principle and is built on the following foundations:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h3 className="font-semibold text-blue-900 mb-2">Professional Ethics and Privacy</h3>
                      <p className="text-sm text-blue-800">
                        MrClinc and Pathway Developers do not receive, view, or process patients' medical documents. 
                        Data flow is directly between patient ↔ clinic. This boundary protects both patient safety 
                        and your professional responsibility.
                      </p>
                    </div>
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h3 className="font-semibold text-green-900 mb-2">Traceability (TRK System)</h3>
                      <p className="text-sm text-green-800">
                        Every patient application is recorded with a unique TRK (Tracking Code). Each step in the 
                        process (review, clinic communication, decision stage, etc.) is digitally traceable.
                      </p>
                    </div>
                    
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <h3 className="font-semibold text-amber-900 mb-2">Objective Coordination</h3>
                      <p className="text-sm text-amber-800">
                        The platform does not include: sales pressure, price negotiation, or outcome promises. 
                        The focus is solely on ensuring the case starts under the right conditions and resolving bottlenecks.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-step 4: Why Antalya */}
              {subStep === 4 && (
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">You are now reading</p>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Operations Centre: Why Antalya?</h2>
                  
                  <p className="text-gray-600 mb-4">
                    Antalya is not just a location in healthcare tourism—it is a global centre of excellence.
                  </p>
                  
                  <div className="space-y-4 text-gray-600">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Medical Competence</p>
                        <p className="text-sm">Hospitals with international standards and branches requiring high expertise</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Rational Access</p>
                        <p className="text-sm">A centre where quality care and cost-effectiveness meet in balance</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Process Quality</p>
                        <p className="text-sm">Patient-focused operational flow through transport, accommodation, and clinical infrastructure</p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mt-4 text-sm">
                    Many clinics in Antalya provide operational support such as flights, accommodation, interpreters, 
                    and local transportation within their own structure. This enables a more controlled process flow.
                  </p>
                </div>
              )}

              {/* Sub-step 5: Who is a Pathway Developer? */}
              {subStep === 5 && (
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">You are now reading</p>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Who is a Pathway Developer (PD)?</h2>
                  
                  <p className="text-gray-600 mb-4">
                    The Pathway Developer is the most critical professional role in the MrClinc ecosystem.
                  </p>
                  
                  <div className="bg-primary-50 border border-primary-200 rounded-lg p-5 mb-6">
                    <p className="text-primary-800 font-medium text-center">
                      This role combines:<br />
                      <span className="text-lg">Business Development Reflex × Process Guidance Discipline</span>
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-primary-500 pl-4">
                      <p className="font-medium text-gray-800">Healthcare Professionals Only</p>
                      <p className="text-sm text-gray-600">
                        The PD team consists only of professionals with healthcare sector experience and high ethical sensitivity.
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-primary-500 pl-4">
                      <p className="font-medium text-gray-800">Trust and Boundary Management</p>
                      <p className="text-sm text-gray-600">
                        A PD is a professional who directs patients to the correct entry point without giving medical advice, 
                        selecting clinics, or discussing prices.
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-primary-500 pl-4">
                      <p className="font-medium text-gray-800">Independence</p>
                      <p className="text-sm text-gray-600">
                        You will have the autonomy to manage your own contact network and visibility.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-step 6: What You Will Actually Do */}
              {subStep === 6 && (
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">You are now reading</p>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Job Definition: What Exactly Will You Do?</h2>
                  
                  <div className="bg-gray-100 rounded-lg p-4 mb-6">
                    <p className="text-gray-800 font-medium">
                      A PD's job is not to sell. A PD's job is not to negotiate.
                    </p>
                    <p className="text-gray-600 mt-2">
                      Your primary responsibility is: <strong>Getting the right case into the system through the right door, in the right way.</strong>
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-primary-600 text-white text-xs font-bold px-2 py-1 rounded">A</span>
                        <h3 className="font-semibold text-gray-900">Channel Building and Visibility (Primary Task)</h3>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">
                        You position MrClinc as a neutral coordination platform within your professional circles or contact points.
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• <strong>Purpose:</strong> Enabling suitable cases (oncology, surgery, aesthetics, etc.) to enter the platform</li>
                        <li>• <strong>Approach:</strong> Acting with healthcare professional reflexes, not like a salesperson</li>
                      </ul>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-gray-600 text-white text-xs font-bold px-2 py-1 rounded">B</span>
                        <h3 className="font-semibold text-gray-900">Case Start Quality and Follow-up (Secondary Task)</h3>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">
                        When a case enters the system through your channel:
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• <strong>Application Support:</strong> Help ensure the request is entered completely and clearly</li>
                        <li>• <strong>Escalation:</strong> Flag the process through the platform in situations like clinic response delays</li>
                        <li>• <strong>Monitoring:</strong> Track the case status via the TRK code</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-step 7: Professional Boundaries (Red Lines) */}
              {subStep === 7 && (
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">You are now reading</p>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Red Lines (You Will Never Do These)</h2>
                  
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                    <p className="text-red-800 font-medium mb-4">A Pathway Developer:</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="text-red-800">Does not receive, view, or store medical documents</span>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="text-red-800">Does not give medical advice or create treatment plans</span>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="text-red-800">Does not recommend clinics or doctors</span>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="text-red-800">Does not guarantee outcomes</span>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="text-red-800">Does not negotiate prices</span>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="text-red-800">Does not request direct payment from patients</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-step 8: Confirmation Gate */}
              {subStep === 8 && (
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Final step</p>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Confirmation</h2>
                  
                  <div className="bg-gray-50 rounded-xl p-6 mb-6">
                    <p className="text-gray-700 mb-4">
                      You have completed the introduction. Before proceeding to the application form, 
                      please confirm your understanding of the role.
                    </p>
                  </div>
                  
                  <div className="border-2 border-primary-200 bg-primary-50 rounded-xl p-5">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={step1Confirmed}
                        onChange={e => setStep1Confirmed(e.target.checked)}
                        className="w-5 h-5 mt-0.5 text-primary-600 focus:ring-primary-500 rounded"
                      />
                      <span className="text-gray-700">
                        I understand that the Pathway Developer role is focused on <strong>case sourcing and coordination 
                        entry quality</strong>, not medical advice, pricing, or provider selection.
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Sub-step Navigation */}
              <div className="mt-8 flex items-center justify-between">
                {subStep > 1 ? (
                  <button
                    onClick={handleSubStepBack}
                    className="px-5 py-2.5 text-gray-700 font-medium hover:text-gray-900 transition-colors"
                  >
                    ← Back
                  </button>
                ) : (
                  <div />
                )}

                {subStep < 8 ? (
                  <button
                    onClick={handleSubStepNext}
                    className="px-6 py-2.5 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Continue →
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    disabled={!step1Confirmed}
                    className={`px-6 py-2.5 font-medium rounded-lg transition-colors ${
                      step1Confirmed
                        ? "bg-primary-600 text-white hover:bg-primary-700"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Proceed to Step 2 →
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Basic Information */}
          {step === 2 && (
            <div className="p-6 md:p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Basic Information</h2>
              <p className="text-sm text-gray-500 mb-6">
                This information helps us understand geographic coverage and potential case routing. 
                It does not imply territory ownership, exclusivity, or any guaranteed volume.
              </p>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={e => updateField("fullName", e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  {/* Country Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country of Residence *</label>
                    {!countryIsOther ? (
                      <select
                        value={formData.country || ""}
                        onChange={e => handleCountryChange(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
                      >
                        <option value="">Select country...</option>
                        {countryOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    ) : (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={formData.country}
                          onChange={e => updateField("country", e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Enter your country"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setCountryIsOther(false);
                            updateField("country", "");
                            updateField("city", "");
                            setCityIsOther(false);
                          }}
                          className="text-xs text-primary-600 hover:underline"
                        >
                          ← Back to list
                        </button>
                      </div>
                    )}
                  </div>

                  {/* City Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                    {!cityIsOther ? (
                      <>
                        {countryIsOther ? (
                          // If country is "Other", city is also free text
                          <input
                            type="text"
                            value={formData.city}
                            onChange={e => updateField("city", e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            placeholder="Enter your city"
                          />
                        ) : (
                          <select
                            value={formData.city || ""}
                            onChange={e => handleCityChange(e.target.value)}
                            disabled={!formData.country}
                            className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white ${
                              !formData.country ? "bg-gray-100 cursor-not-allowed" : ""
                            }`}
                          >
                            <option value="">{formData.country ? "Select city..." : "Select country first"}</option>
                            {getAvailableCities().map(city => (
                              <option key={city} value={city}>{city}</option>
                            ))}
                            {formData.country && <option value="__other__">Other / Not listed</option>}
                          </select>
                        )}
                      </>
                    ) : (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={formData.city}
                          onChange={e => updateField("city", e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Enter your city"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setCityIsOther(false);
                            updateField("city", "");
                          }}
                          className="text-xs text-primary-600 hover:underline"
                        >
                          ← Back to list
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Primary Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => updateField("email", e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => updateField("phone", e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="+44 7XXX XXXXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Contact Method *</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="whatsapp"
                        checked={formData.preferredContact === "whatsapp"}
                        onChange={e => updateField("preferredContact", e.target.value)}
                        className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-gray-700">WhatsApp</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="email"
                        checked={formData.preferredContact === "email"}
                        onChange={e => updateField("preferredContact", e.target.value)}
                        className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-gray-700">Email</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Professional Background */}
          {step === 3 && (
            <div className="p-6 md:p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Professional Background</h2>
              <p className="text-sm text-gray-500 mb-6">
                We ask about your professional background to understand how you are positioned to encounter potential cases. 
                This information is not used to assess clinical authority or decision-making capability.
              </p>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Primary Profession / Role *</label>
                  <input
                    type="text"
                    value={formData.currentProfession}
                    onChange={e => updateField("currentProfession", e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="e.g., Healthcare Consultant, Patient Coordinator"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Organisation / Independent *</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="organisationType"
                        value="organisation"
                        checked={formData.organisationType === "organisation"}
                        onChange={e => updateField("organisationType", e.target.value)}
                        className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-gray-700">Organisation</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="organisationType"
                        value="independent"
                        checked={formData.organisationType === "independent"}
                        onChange={e => updateField("organisationType", e.target.value)}
                        className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-gray-700">Independent</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Years of Professional Experience *</label>
                  <select
                    value={formData.yearsExperience}
                    onChange={e => updateField("yearsExperience", e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Select...</option>
                    <option value="0-2">0-2 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="6-10">6-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brief description of your current professional activity *
                  </label>
                  <p className="text-xs text-gray-500 mb-2">Max 3-4 sentences</p>
                  <textarea
                    value={formData.professionalActivity}
                    onChange={e => updateField("professionalActivity", e.target.value)}
                    rows={4}
                    maxLength={500}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                    placeholder="Describe your current role and professional activities..."
                  />
                  <p className="text-xs text-gray-400 mt-1">{formData.professionalActivity.length}/500 characters</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Network & Channel Context */}
          {step === 4 && (
            <div className="p-6 md:p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Network & Visibility</h2>
              <p className="text-sm text-gray-500 mb-6">
                This section helps us understand where and how you are most likely to encounter potential cases. 
                You are not expected to promote medical services. You are expected to understand where relevant conversations naturally occur.
              </p>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Which types of organisations or groups are you primarily connected with? *
                  </label>
                  <p className="text-xs text-gray-500 mb-3">Select all that apply</p>
                  <div className="space-y-2">
                    {networkTypeOptions.map(option => (
                      <label key={option.value} className="flex items-start gap-3 cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <input
                          type="checkbox"
                          checked={formData.networkTypes.includes(option.value)}
                          onChange={() => toggleNetworkType(option.value)}
                          className="w-4 h-4 mt-0.5 text-primary-600 focus:ring-primary-500 rounded"
                        />
                        <span className="text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                  {formData.networkTypes.includes("other") && (
                    <input
                      type="text"
                      value={formData.networkTypesOther}
                      onChange={e => updateField("networkTypesOther", e.target.value)}
                      className="w-full mt-3 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Please specify other..."
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Countries where your professional network is primarily based *
                  </label>
                  <p className="text-xs text-gray-500 mb-2">Separate multiple countries with commas</p>
                  <input
                    type="text"
                    value={formData.networkCountries}
                    onChange={e => updateField("networkCountries", e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="e.g., United Kingdom, Germany, Netherlands"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Short description of how you would typically introduce a structured healthcare pathway *
                  </label>
                  <p className="text-xs text-gray-500 mb-2">Max 5 lines</p>
                  <textarea
                    value={formData.introductionApproach}
                    onChange={e => updateField("introductionApproach", e.target.value)}
                    rows={5}
                    maxLength={600}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                    placeholder="Describe your approach to introducing healthcare pathways within your professional network..."
                  />
                  <p className="text-xs text-gray-400 mt-1">{formData.introductionApproach.length}/600 characters</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Availability & Engagement */}
          {step === 5 && (
            <div className="p-6 md:p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Availability</h2>
              <p className="text-sm text-gray-500 mb-6">
                Availability helps us understand response expectations. 
                There are no shifts, quotas, or fixed working hours.
              </p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Estimated average time you could allocate monthly to pathway coordination *
                  </label>
                  <div className="space-y-2">
                    {availabilityOptions.map(option => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <input
                          type="radio"
                          name="availabilityLevel"
                          value={option.value}
                          checked={formData.availabilityLevel === option.value}
                          onChange={e => updateField("availabilityLevel", e.target.value)}
                          className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Preferred mode of working *
                  </label>
                  <div className="space-y-2">
                    {workingModeOptions.map(option => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <input
                          type="radio"
                          name="workingMode"
                          value={option.value}
                          checked={formData.workingMode === option.value}
                          onChange={e => updateField("workingMode", e.target.value)}
                          className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Workflow - How the Process Works */}
          {step === 6 && (
            <div className="p-6 md:p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">How the Process Works</h2>
              <p className="text-sm text-gray-500 mb-6">(Role Boundaries Explained)</p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  This section explains where the Pathway Developer is involved in the process and where they are not. 
                  It does not describe medical treatment, clinical decision-making, or provider selection.
                </p>
              </div>

              <div className="space-y-6">
                {/* 1. Visibility & Entry */}
                <div className="border-l-4 border-primary-500 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-primary-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">1</span>
                    <h3 className="font-semibold text-gray-900">Visibility & Entry Point (PD's Starting Role)</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">
                    A Pathway Developer introduces MrClinc as a neutral healthcare coordination platform within appropriate professional environments. 
                    These environments may include healthcare-adjacent or patient-facing contexts where discussions about care pathways naturally occur.
                  </p>
                  <p className="text-gray-600 text-sm mb-2">These contact points may include:</p>
                  <ul className="text-sm text-gray-600 list-disc list-inside ml-2 mb-2">
                    <li>Healthcare professionals (non-surgical practitioners)</li>
                    <li>Service areas with frequent patient contact</li>
                    <li>Education, counselling, or care-focused environments</li>
                  </ul>
                  <div className="bg-gray-100 rounded p-3 text-sm">
                    <p className="text-gray-700">At this stage, the PD:</p>
                    <ul className="text-gray-600 mt-1">
                      <li>• Does not sell</li>
                      <li>• Does not recommend clinics or doctors</li>
                      <li>• Does not promise treatment outcomes</li>
                    </ul>
                    <p className="text-gray-700 mt-2 font-medium">
                      The sole purpose at this stage is to ensure that suitable cases reach the correct entry point.
                    </p>
                  </div>
                </div>

                {/* 2. Platform Entry */}
                <div className="border-l-4 border-gray-300 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-gray-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">2</span>
                    <h3 className="font-semibold text-gray-900">Platform Entry (Patient-Led)</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">
                    All cases enter MrClinc through a direct patient submission. Applications are submitted digitally by the patient and recorded with a unique tracking code (TRK).
                  </p>
                  <div className="bg-amber-50 border border-amber-200 rounded p-3 text-sm">
                    <p className="text-amber-800 font-medium">
                      Important: A Pathway Developer does not submit applications on behalf of patients. The application is always made by the patient themselves.
                    </p>
                  </div>
                </div>

                {/* 3. Case Start Quality */}
                <div className="border-l-4 border-gray-300 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-gray-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">3</span>
                    <h3 className="font-semibold text-gray-900">Case Start Quality (PD's Secondary Role)</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">
                    When a case enters the platform through a PD's channel, the PD may support the patient in ensuring that the initial request is complete and clearly structured.
                  </p>
                  <p className="text-gray-600 text-sm mb-2">This support:</p>
                  <ul className="text-sm text-gray-600 list-disc list-inside ml-2 mb-2">
                    <li>Does not include adding medical content</li>
                    <li>Does not include clinical evaluation</li>
                    <li>Is solely aimed at ensuring the process starts correctly</li>
                  </ul>
                  <p className="text-gray-600 text-sm italic">
                    The PD is positioned here as a "start quality guardian," not a coordinator.
                  </p>
                </div>

                {/* 4. Clinical Channel Coordination */}
                <div className="border-l-4 border-gray-300 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-gray-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">4</span>
                    <h3 className="font-semibold text-gray-900">Clinical Channel Coordination (Platform Role)</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">
                    Once a case is submitted, all coordination with clinical channels is handled exclusively by the MrClinc platform:
                  </p>
                  <ul className="text-sm text-gray-600 list-disc list-inside ml-2 mb-2">
                    <li>Communication with clinical channels</li>
                    <li>Direction of information flow</li>
                    <li>Process tracking and status updates</li>
                  </ul>
                  <div className="bg-gray-100 rounded p-3 text-sm">
                    <p className="text-gray-700">The Pathway Developer:</p>
                    <ul className="text-gray-600 mt-1">
                      <li>• Does not contact clinics</li>
                      <li>• Does not review clinical responses</li>
                      <li>• Does not influence decisions</li>
                    </ul>
                  </div>
                </div>

                {/* 5. Escalation */}
                <div className="border-l-4 border-gray-300 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-gray-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">5</span>
                    <h3 className="font-semibold text-gray-900">Escalation (PD's Limited Intervention Point)</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">
                    If a case becomes delayed, unclear, or blocked (e.g., delay in clinic response, process not progressing, technical uncertainty), 
                    a Pathway Developer may initiate an escalation through platform tools.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm">
                    <p className="text-blue-800">
                      Escalation is administrative and visibility-focused. It does not involve medical judgement or clinical direction.
                    </p>
                  </div>
                </div>

                {/* 6. Tracking & Closure */}
                <div className="border-l-4 border-gray-300 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-gray-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">6</span>
                    <h3 className="font-semibold text-gray-900">Tracking & Closure (Platform-Led)</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">
                    Each case is tracked via its TRK code and managed to closure by the platform.
                  </p>
                  <p className="text-gray-600 text-sm">
                    The Pathway Developer observes the process at an informational level only—they do not make decisions or influence outcomes.
                  </p>
                </div>

                {/* 7. Second Opinion */}
                <div className="border-l-4 border-gray-300 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-gray-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">7</span>
                    <h3 className="font-semibold text-gray-900">Second Opinion Process Clarification</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">During the second opinion stage:</p>
                  <ul className="text-sm text-gray-600 list-disc list-inside ml-2 mb-2">
                    <li>MrClinc provides coordination only</li>
                    <li>MrClinc does not charge the patient for coordination of the second-opinion stage</li>
                  </ul>
                  <p className="text-gray-600 text-sm">The Pathway Developer in this process:</p>
                  <ul className="text-sm text-gray-600 list-disc list-inside ml-2">
                    <li>Does not select clinics</li>
                    <li>Does not recommend experts</li>
                    <li>Does not comment on opinions received</li>
                  </ul>
                </div>

                {/* Summary Box */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mt-8">
                  <h3 className="font-semibold text-gray-900 mb-4">Summary: The PD's Place in This Flow</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <p className="font-medium text-gray-800 mb-2">Pathway Developer:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Creates visibility</li>
                        <li>• Enables correct entry</li>
                        <li>• Flags issues when process stalls</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <p className="font-medium text-gray-800 mb-2">MrClinc Platform:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Manages clinical channels</li>
                        <li>• Coordinates the process</li>
                        <li>• Tracks and closes cases</li>
                      </ul>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 mt-4 font-medium text-center">
                    This separation ensures ethical, transparent, and auditable operation.
                  </p>
                </div>

                {/* Red Lines Reminder */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-red-800 mb-2">Red Lines Reminder</p>
                  <p className="text-sm text-red-700">
                    At no stage of this flow does a Pathway Developer: give medical advice, recommend clinics, discuss prices, or promise outcomes.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 7: Compensation */}
          {step === 7 && (
            <div className="p-6 md:p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Compensation Structure</h2>
              <p className="text-sm text-gray-500 mb-6">
                Compensation reflects coordination-related milestones only. It is not linked to: treatment decisions, provider choice, or conversion outcomes.
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-green-800">
                  The Pathway Developer role is <strong>not voluntary</strong>. 
                  Compensation is case-based and paid upon eligible, completed coordination milestones.
                </p>
              </div>

              {/* Compensation Cards */}
              <div className="space-y-4 mb-8">
                {/* Plastic / Aesthetic */}
                <div className="border border-gray-200 rounded-xl p-5">
                  <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                    <h3 className="font-semibold text-gray-900">1. Plastic / Aesthetic Surgery</h3>
                    <span className="bg-primary-100 text-primary-700 text-sm font-medium px-3 py-1 rounded-full">€250 + €100 bonus</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Includes facial, breast, body, genital procedures and hair restoration.
                    <br />
                    <span className="text-gray-500">(Sub-categories for men / women will be defined separately.)</span>
                  </p>
                </div>

                {/* Oncology */}
                <div className="border border-gray-200 rounded-xl p-5">
                  <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                    <h3 className="font-semibold text-gray-900">2. Oncology Surgery / Cancer Pathways</h3>
                    <span className="bg-primary-100 text-primary-700 text-sm font-medium px-3 py-1 rounded-full">€1,000 + €200 bonus</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    <span className="inline-flex items-center gap-1 text-green-700 font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Second Opinion: Free of charge for the patient
                    </span>
                  </p>
                </div>

                {/* General Surgery */}
                <div className="border border-gray-200 rounded-xl p-5">
                  <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                    <h3 className="font-semibold text-gray-900">3. General Surgery</h3>
                    <span className="bg-primary-100 text-primary-700 text-sm font-medium px-3 py-1 rounded-full">€1,000 + €200 bonus</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    <span className="inline-flex items-center gap-1 text-green-700 font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Second Opinion: Free of charge for the patient
                    </span>
                  </p>
                </div>
              </div>

              {/* Important Notes */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
                <p className="text-sm font-medium text-amber-800 mb-2">Important Notes:</p>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• No salary or fixed monthly payment</li>
                  <li>• No sales, referral, or pricing-based compensation</li>
                  <li>• No guaranteed income or case volume</li>
                </ul>
              </div>

              {/* Illustrative Example */}
              <div className="border border-gray-200 rounded-xl p-5 bg-gray-50 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Illustrative Monthly Example</h3>
                <p className="text-sm text-gray-600 mb-4">Example activity in one month:</p>
                
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-700">2 × Oncology cases</span>
                    <span className="font-medium text-gray-900">2 × (€1,000 + €200) = €2,400</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-700">3 × Plastic / Aesthetic cases</span>
                    <span className="font-medium text-gray-900">3 × (€250 + €100) = €1,050</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-700">1 × General Surgery case</span>
                    <span className="font-medium text-gray-900">1 × (€1,000 + €200) = €1,200</span>
                  </div>
                  <div className="flex justify-between py-3 bg-primary-50 px-3 rounded-lg mt-3">
                    <span className="font-semibold text-gray-900">Total illustrative monthly</span>
                    <span className="font-bold text-primary-700 text-lg">€4,650</span>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 italic">
                  (Illustrative only — not a guarantee.)
                </p>
              </div>

              {/* Tax Responsibility */}
              <div className="bg-gray-100 border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <strong>Tax Responsibility:</strong> Pathway Developers are responsible for their own tax obligations in their jurisdiction.
                </p>
              </div>
            </div>
          )}

          {/* Step 8: Compliance & Role Boundaries */}
          {step === 8 && (
            <div className="p-6 md:p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Compliance & Role Boundaries</h2>
              <p className="text-sm text-gray-500 mb-6">
                Compliance ensures that all activity remains neutral, ethical, and auditable. 
                These rules protect patients, Pathway Developers, and the platform.
              </p>
              
              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.ackFreelance}
                    onChange={e => updateField("ackFreelance", e.target.checked)}
                    className="w-5 h-5 mt-0.5 text-primary-600 focus:ring-primary-500 rounded"
                  />
                  <span className="text-gray-700">
                    I understand this role is <strong>freelance (independent)</strong> and not employment.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.ackNoSales}
                    onChange={e => updateField("ackNoSales", e.target.checked)}
                    className="w-5 h-5 mt-0.5 text-primary-600 focus:ring-primary-500 rounded"
                  />
                  <span className="text-gray-700">
                    I understand there is <strong>no sales, referral, pricing, or medical advisory</strong> role.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.ackNotClinic}
                    onChange={e => updateField("ackNotClinic", e.target.checked)}
                    className="w-5 h-5 mt-0.5 text-primary-600 focus:ring-primary-500 rounded"
                  />
                  <span className="text-gray-700">
                    I understand MR.CLINC is <strong>not a clinic, agency, or broker</strong>.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.ackTraceable}
                    onChange={e => updateField("ackTraceable", e.target.checked)}
                    className="w-5 h-5 mt-0.5 text-primary-600 focus:ring-primary-500 rounded"
                  />
                  <span className="text-gray-700">
                    I understand <strong>all activity is traceable, auditable, and reviewable</strong>.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.ackCaseBased}
                    onChange={e => updateField("ackCaseBased", e.target.checked)}
                    className="w-5 h-5 mt-0.5 text-primary-600 focus:ring-primary-500 rounded"
                  />
                  <span className="text-gray-700">
                    I understand compensation is <strong>case-based and not guaranteed</strong>.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Step 9: Declaration */}
          {step === 9 && (
            <div className="p-6 md:p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Declaration</h2>
              <p className="text-sm text-gray-500 mb-6">
                By submitting this application, you confirm that you understand the Pathway Developer role, its limitations, and its boundaries.
              </p>
              
              <div className="space-y-4 mb-8">
                <label className="flex items-start gap-3 cursor-pointer p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.declareAccurate}
                    onChange={e => updateField("declareAccurate", e.target.checked)}
                    className="w-5 h-5 mt-0.5 text-primary-600 focus:ring-primary-500 rounded"
                  />
                  <span className="text-gray-700">
                    I confirm that the information provided is <strong>accurate and complete</strong>.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.acceptPDAgreement}
                    onChange={e => updateField("acceptPDAgreement", e.target.checked)}
                    className="w-5 h-5 mt-0.5 text-primary-600 focus:ring-primary-500 rounded"
                  />
                  <span className="text-gray-700">
                    I have read and accept the{" "}
                    <Link href="/pd/docs/agreement" target="_blank" className="text-primary-600 hover:underline font-medium">
                      Pathway Developer Agreement
                    </Link>.
                  </span>
                </label>

                {/* Data Processing Consent - Separate and Mandatory */}
                <div className="p-4 border-2 border-primary-200 bg-primary-50 rounded-lg">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.acceptDataProcessing}
                      onChange={e => updateField("acceptDataProcessing", e.target.checked)}
                      className="w-5 h-5 mt-0.5 text-primary-600 focus:ring-primary-500 rounded"
                    />
                    <span className="text-gray-700">
                      I have read and accept the{" "}
                      <Link 
                        href="/pd/docs/data" 
                        target="_blank" 
                        className="text-primary-600 hover:underline font-medium"
                      >
                        Data Processing Notice
                      </Link>
                      . I consent to MrClinc processing my personal data for the purpose of evaluating my 
                      Pathway Developer application.
                    </span>
                  </label>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name (typed) *</label>
                    <input
                      type="text"
                      value={formData.signatureName}
                      onChange={e => updateField("signatureName", e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Type your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="text"
                      value={new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                      disabled
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-600"
                    />
                  </div>
                </div>
              </div>

              {/* Submission Note */}
              <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex gap-3">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Submission Note</p>
                    <p>
                      Upon submission, your information will be reviewed for final onboarding. 
                      If approved, your MR.CLINC platform login details will be shared with you. 
                      You will also receive access to free Education and Training modules within the platform.
                      <strong> Submission of this form does not guarantee activation.</strong>
                    </p>
                  </div>
                </div>
              </div>

              {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}
            </div>
          )}

          {/* Navigation - Only for Steps 2-9 */}
          {step > 1 && (
            <div className="px-6 md:px-8 py-4 bg-gray-50 border-t border-gray-200 rounded-b-2xl flex items-center justify-between">
              <button
                onClick={handleBack}
                className="px-5 py-2.5 text-gray-700 font-medium hover:text-gray-900 transition-colors"
              >
                ← Back
              </button>

              {step < 9 ? (
                <button
                  onClick={handleNext}
                  disabled={!validateStep(step)}
                  className={`px-6 py-2.5 font-medium rounded-lg transition-colors ${
                    validateStep(step)
                      ? "bg-primary-600 text-white hover:bg-primary-700"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Continue →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!validateStep(9) || isSubmitting}
                  className={`px-6 py-2.5 font-medium rounded-lg transition-colors ${
                    validateStep(9) && !isSubmitting
                      ? "bg-primary-600 text-white hover:bg-primary-700"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Privacy & Legal Footer - Persistent */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p className="mb-2">
            Your data is processed in accordance with our{" "}
            <Link href="/pd/docs/data" target="_blank" className="text-primary-600 hover:underline">
              Data Processing Notice
            </Link>
            .
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/terms" target="_blank" className="hover:text-gray-700">
              Terms of Use
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/pd/docs/data" target="_blank" className="hover:text-gray-700">
              Data Processing Notice
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/cookies" target="_blank" className="hover:text-gray-700">
              Cookies
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
