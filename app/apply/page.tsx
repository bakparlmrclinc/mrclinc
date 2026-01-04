"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type MainCategory = "aesthetic" | "medical" | "";
type MedicalSubType = "cancer" | "general" | "";
type PreferredContact = "whatsapp" | "phone" | "email";

interface FormData {
  mainCategory: MainCategory;
  medicalSubType: MedicalSubType;
  // Aesthetic fields
  aestheticSubCategory: string;
  aestheticProcedure: string;
  // General Surgery fields
  generalCondition: string;
  // Cancer Surgery fields
  cancerSystem: string;
  // Personal info
  name: string;
  email: string;
  phone: string;
  preferredContact: PreferredContact;
  age: string;
  city: string;
  country: string;
  description: string;
  pdCode: string;
  // Consents
  consent1: boolean;
  consent2: boolean;
  consent3: boolean;
}

// LOCKED SERVICE STRUCTURE - DO NOT MODIFY
const aestheticSubCategories = [
  "Face",
  "Breast", 
  "Body Contouring",
  "Genital Aesthetics",
  "Hair Restoration"
];

const aestheticProcedures: Record<string, string[]> = {
  "Face": [
    "Rhinoplasty",
    "Revision rhinoplasty",
    "Septorhinoplasty",
    "Blepharoplasty (upper / lower)",
    "Facelift / mini facelift",
    "Neck lift",
    "Brow lift",
    "Otoplasty",
    "Buccal fat removal",
    "Chin surgery (genioplasty)"
  ],
  "Breast": [
    "Breast augmentation (implant)",
    "Breast lift (mastopexy)",
    "Breast reduction",
    "Gynecomastia surgery",
    "Breast revision surgery (implant change/removal)"
  ],
  "Body Contouring": [
    "Liposuction (abdomen, waist, hips, legs, arms, chin)",
    "Abdominoplasty (tummy tuck)",
    "Mini abdominoplasty",
    "Abdominal etching (six-pack)",
    "Brazilian butt lift (BBL)",
    "Buttock lift / implant",
    "Arm lift (brachioplasty)",
    "Thigh lift",
    "Back / waist lift"
  ],
  "Genital Aesthetics": [
    "Labiaplasty",
    "Vaginoplasty / vaginal tightening",
    "Penile enhancement (lengthening / thickening)"
  ],
  "Hair Restoration": [
    "Hair transplant (FUE / DHI)",
    "Beard / moustache transplant",
    "Eyebrow transplant"
  ]
};

const generalSurgeryConditions = [
  "Hepatobiliary / Gallbladder / Bile ducts",
  "Liver (non-oncological)",
  "Pancreas (non-oncological)",
  "Stomach & Esophagus (non-oncological)",
  "Intestines",
  "Hernia / Abdominal wall",
  "Proctology",
  "Obesity surgery",
  "Endocrine surgery (benign)"
];

const cancerSurgerySystems = [
  "Gastrointestinal system",
  "Hepatobiliary & pancreas",
  "Thoracic",
  "Breast",
  "Gynecological oncology",
  "Uro-oncology",
  "Head & neck",
  "Skin oncology",
  "Sarcoma & orthopedic oncology",
  "Neuro-oncology"
];

// COUNTRY/CITY DATA - Standardized for backend compatibility
const countries = [
  { code: "UK", name: "United Kingdom" },
  { code: "TR", name: "Turkey" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "NL", name: "Netherlands" },
  { code: "IE", name: "Ireland" },
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "OTHER", name: "Other" },
];

const citiesByCountry: Record<string, string[]> = {
  "UK": ["London", "Manchester", "Birmingham", "Leeds", "Glasgow", "Liverpool", "Edinburgh", "Bristol", "Sheffield", "Newcastle", "Other"],
  "TR": ["Istanbul", "Ankara", "Izmir", "Antalya", "Bursa", "Adana", "Other"],
  "DE": ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne", "Düsseldorf", "Other"],
  "FR": ["Paris", "Lyon", "Marseille", "Toulouse", "Nice", "Bordeaux", "Other"],
  "NL": ["Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven", "Other"],
  "IE": ["Dublin", "Cork", "Galway", "Limerick", "Other"],
  "US": ["New York", "Los Angeles", "Chicago", "Houston", "Miami", "San Francisco", "Other"],
  "CA": ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa", "Other"],
  "AU": ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Other"],
  "OTHER": ["Other"],
};

function ApplyForm() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [medicalSubStep, setMedicalSubStep] = useState<"select" | "form">("select");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [trackingCode, setTrackingCode] = useState("");
  const [submitError, setSubmitError] = useState("");

  const [formData, setFormData] = useState<FormData>({
    mainCategory: "",
    medicalSubType: "",
    aestheticSubCategory: "",
    aestheticProcedure: "",
    generalCondition: "",
    cancerSystem: "",
    name: "",
    email: "",
    phone: "",
    preferredContact: "whatsapp",
    age: "",
    city: "",
    country: "UK",
    description: "",
    pdCode: "",
    consent1: false,
    consent2: false,
    consent3: false,
  });

  // Get available cities for selected country
  const availableCities = citiesByCountry[formData.country] || citiesByCountry["OTHER"];

  // Reset city when country changes
  useEffect(() => {
    if (!availableCities.includes(formData.city)) {
      setFormData(prev => ({ ...prev, city: "" }));
    }
  }, [formData.country, availableCities, formData.city]);

  useEffect(() => {
    const service = searchParams.get("service");
    const type = searchParams.get("type");
    
    if (type === "second-opinion") {
      setFormData(prev => ({ ...prev, mainCategory: "medical" }));
      setStep(1);
    } else if (service === "aesthetic") {
      setFormData(prev => ({ ...prev, mainCategory: "aesthetic" }));
    } else if (service === "cancer") {
      setFormData(prev => ({ ...prev, mainCategory: "medical", medicalSubType: "cancer" }));
      setMedicalSubStep("form");
    } else if (service === "general") {
      setFormData(prev => ({ ...prev, mainCategory: "medical", medicalSubType: "general" }));
      setMedicalSubStep("form");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    
    // Get full country name for backend
    const countryName = countries.find(c => c.code === formData.country)?.name || formData.country;
    
    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mainCategory: formData.mainCategory,
          medicalSubType: formData.medicalSubType || undefined,
          aestheticSubCategory: formData.aestheticSubCategory || undefined,
          aestheticProcedure: formData.aestheticProcedure || undefined,
          generalCondition: formData.generalCondition || undefined,
          cancerSystem: formData.cancerSystem || undefined,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          preferredContact: formData.preferredContact,
          age: formData.age,
          city: formData.city,
          country: countryName,
          description: formData.description || undefined,
          pdCode: formData.pdCode || undefined,
          consent1: formData.consent1,
          consent2: formData.consent2,
          consent3: formData.consent3,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        console.error('Submission error:', data.error);
        setSubmitError(data.error?.message || 'Failed to submit request. Please try again.');
        setIsSubmitting(false);
        return;
      }

      setTrackingCode(data.data.trackingCode);
      setStep(10); // Success step
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceedStep1 = formData.mainCategory !== "";
  
  const canProceedStep2 = () => {
    if (formData.mainCategory === "aesthetic") {
      return formData.aestheticSubCategory !== "" && formData.aestheticProcedure !== "";
    }
    if (formData.mainCategory === "medical") {
      if (medicalSubStep === "select") {
        return formData.medicalSubType !== "";
      }
      if (formData.medicalSubType === "general") {
        return formData.generalCondition !== "";
      }
      if (formData.medicalSubType === "cancer") {
        return formData.cancerSystem !== "";
      }
    }
    return false;
  };

  const canProceedStep3 = 
    formData.name && 
    formData.email && 
    formData.phone && 
    formData.age && 
    formData.city &&
    formData.consent1 && 
    formData.consent2 && 
    formData.consent3;

  const getStepTitle = () => {
    if (step === 1) return "Select Service Category";
    if (step === 2) {
      if (formData.mainCategory === "aesthetic") return "Aesthetic Surgery";
      if (formData.mainCategory === "medical") {
        if (medicalSubStep === "select") return "Medical Surgery";
        if (formData.medicalSubType === "cancer") return "Cancer Surgery";
        if (formData.medicalSubType === "general") return "General Surgery";
      }
    }
    if (step === 3) return "Your Information";
    return "";
  };

  const showFSOBadge = formData.medicalSubType === "cancer" || formData.medicalSubType === "general";

  // Success view
  if (step === 10) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: '#DCFCE7' }}
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#166534' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Request Submitted</h1>
        <p className="text-gray-600 mb-6">
          Your request has been received. A Pathway Developer will coordinate your request and the healthcare provider will contact you directly.
        </p>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <p className="text-sm text-gray-500 mb-2">Your Tracking Code</p>
          <p className="text-3xl font-bold tracking-wider" style={{ color: '#1B4965' }}>{trackingCode}</p>
          <p className="text-sm text-gray-500 mt-4">
            Save this code to track your request status
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/track?code=${trackingCode}`}>
            <Button variant="primary">Track Request</Button>
          </Link>
          <Link href="/">
            <Button variant="outline">Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
              style={{ 
                backgroundColor: step >= s ? '#1B4965' : '#E5E7EB',
                color: step >= s ? 'white' : '#4B5563'
              }}
            >
              {s}
            </div>
            {s < 3 && (
              <div 
                className="w-16 h-1 mx-2"
                style={{ backgroundColor: step > s ? '#1B4965' : '#E5E7EB' }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Title */}
      <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">{getStepTitle()}</h1>
      
      {showFSOBadge && step === 2 && medicalSubStep === "form" && (
        <div className="flex justify-center mb-4">
          <span 
            className="inline-block px-3 py-1 text-xs font-semibold rounded-full"
            style={{ backgroundColor: '#DCFCE7', color: '#166534' }}
          >
            Free Second Opinion Available
          </span>
        </div>
      )}

      {/* ============================================
          STEP 1: Main Category Selection
          ============================================ */}
      {step === 1 && (
        <div>
          <p className="text-gray-600 text-center mb-8">Choose the type of service you need</p>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <button
              onClick={() => setFormData({ ...formData, mainCategory: "aesthetic", medicalSubType: "" })}
              className="p-6 rounded-xl text-left transition-all"
              style={{
                border: formData.mainCategory === "aesthetic" ? '2px solid #1B4965' : '2px solid #E5E7EB',
                backgroundColor: formData.mainCategory === "aesthetic" ? '#F0F7FA' : 'white'
              }}
            >
              <h3 className="font-semibold text-gray-900 mb-1">Aesthetic Surgery</h3>
              <p className="text-sm text-gray-600">Face, breast, body contouring, genital aesthetics, hair restoration</p>
            </button>

            <button
              onClick={() => setFormData({ ...formData, mainCategory: "medical", medicalSubType: "" })}
              className="p-6 rounded-xl text-left transition-all"
              style={{
                border: formData.mainCategory === "medical" ? '2px solid #1B4965' : '2px solid #E5E7EB',
                backgroundColor: formData.mainCategory === "medical" ? '#F0F7FA' : 'white'
              }}
            >
              <h3 className="font-semibold text-gray-900 mb-1">Medical Surgery</h3>
              <p className="text-sm text-gray-600">Cancer surgery or general surgery procedures</p>
              <span 
                className="inline-block mt-2 px-2 py-0.5 text-[10px] font-semibold rounded"
                style={{ backgroundColor: '#DCFCE7', color: '#166534' }}
              >
                Free Second Opinion
              </span>
            </button>
          </div>

          <div className="mt-8 flex justify-end">
            <Button
              variant="primary"
              onClick={() => { setStep(2); setMedicalSubStep("select"); }}
              disabled={!canProceedStep1}
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* ============================================
          STEP 2: Service-Specific Forms
          ============================================ */}
      
      {/* STEP 2A - Medical: Sub-type selection (Cancer or General) */}
      {/* BUG FIX: Selecting only highlights, Continue button advances to form */}
      {step === 2 && formData.mainCategory === "medical" && medicalSubStep === "select" && (
        <div>
          <p className="text-gray-600 text-center mb-8">Select the type of medical surgery</p>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <button
              onClick={() => setFormData({ ...formData, medicalSubType: "cancer" })}
              className="p-6 rounded-xl text-left transition-all"
              style={{
                border: formData.medicalSubType === "cancer" ? '2px solid #1B4965' : '2px solid #E5E7EB',
                backgroundColor: formData.medicalSubType === "cancer" ? '#F0F7FA' : 'white'
              }}
            >
              <h3 className="font-semibold text-gray-900 mb-1">Cancer Surgery</h3>
              <p className="text-sm text-gray-600">Oncological surgical procedures</p>
            </button>

            <button
              onClick={() => setFormData({ ...formData, medicalSubType: "general" })}
              className="p-6 rounded-xl text-left transition-all"
              style={{
                border: formData.medicalSubType === "general" ? '2px solid #1B4965' : '2px solid #E5E7EB',
                backgroundColor: formData.medicalSubType === "general" ? '#F0F7FA' : 'white'
              }}
            >
              <h3 className="font-semibold text-gray-900 mb-1">General Surgery</h3>
              <p className="text-sm text-gray-600">Non-oncological surgical procedures</p>
            </button>
          </div>

          <div className="mt-8 flex justify-between">
            <Button variant="outline" onClick={() => { setStep(1); setFormData({ ...formData, mainCategory: "", medicalSubType: "" }); }}>Back</Button>
            <Button
              variant="primary"
              onClick={() => setMedicalSubStep("form")}
              disabled={!formData.medicalSubType}
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* STEP 2 - Aesthetic: Category & Procedure Selection */}
      {step === 2 && formData.mainCategory === "aesthetic" && (
        <div>
          <p className="text-gray-600 text-center mb-8">Select category and procedure</p>
          
          {/* Sub-category selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <div className="flex flex-wrap gap-2">
              {aestheticSubCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFormData({ ...formData, aestheticSubCategory: cat, aestheticProcedure: "" })}
                  className="px-4 py-2 rounded-lg text-sm transition-all"
                  style={{
                    border: formData.aestheticSubCategory === cat ? '2px solid #1B4965' : '2px solid #E5E7EB',
                    backgroundColor: formData.aestheticSubCategory === cat ? '#F0F7FA' : 'white',
                    color: formData.aestheticSubCategory === cat ? '#1B4965' : '#374151'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Procedure selection */}
          {formData.aestheticSubCategory && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Procedure</label>
              <div className="grid sm:grid-cols-2 gap-2">
                {aestheticProcedures[formData.aestheticSubCategory]?.map((proc) => (
                  <button
                    key={proc}
                    onClick={() => setFormData({ ...formData, aestheticProcedure: proc })}
                    className="p-3 rounded-lg text-sm text-left transition-all"
                    style={{
                      border: formData.aestheticProcedure === proc ? '2px solid #1B4965' : '2px solid #E5E7EB',
                      backgroundColor: formData.aestheticProcedure === proc ? '#F0F7FA' : 'white'
                    }}
                  >
                    {proc}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <Button variant="outline" onClick={() => { setStep(1); setFormData({ ...formData, mainCategory: "", aestheticSubCategory: "", aestheticProcedure: "" }); }}>Back</Button>
            <Button
              variant="primary"
              onClick={() => setStep(3)}
              disabled={!canProceedStep2()}
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* STEP 2B - General Surgery Form */}
      {step === 2 && formData.mainCategory === "medical" && formData.medicalSubType === "general" && medicalSubStep === "form" && (
        <div>
          <p className="text-gray-600 text-center mb-8">Select the condition or surgery type</p>
          
          <div className="grid sm:grid-cols-2 gap-3">
            {generalSurgeryConditions.map((condition) => (
              <button
                key={condition}
                onClick={() => setFormData({ ...formData, generalCondition: condition })}
                className="p-4 rounded-lg text-sm text-left transition-all"
                style={{
                  border: formData.generalCondition === condition ? '2px solid #1B4965' : '2px solid #E5E7EB',
                  backgroundColor: formData.generalCondition === condition ? '#F0F7FA' : 'white'
                }}
              >
                {condition}
              </button>
            ))}
          </div>

          {/* Info notice */}
          <div 
            className="mt-6 rounded-lg p-4"
            style={{ backgroundColor: '#F0F7FA', border: '1px solid #D9EEF5' }}
          >
            <p className="text-sm" style={{ color: '#1B4965' }}>
              The healthcare provider will contact you directly for any required medical documents.
            </p>
          </div>

          <div className="mt-8 flex justify-between">
            <Button variant="outline" onClick={() => { setMedicalSubStep("select"); setFormData({ ...formData, medicalSubType: "", generalCondition: "" }); }}>Back</Button>
            <Button
              variant="primary"
              onClick={() => setStep(3)}
              disabled={!canProceedStep2()}
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* STEP 2C - Cancer Surgery Form */}
      {step === 2 && formData.mainCategory === "medical" && formData.medicalSubType === "cancer" && medicalSubStep === "form" && (
        <div>
          <p className="text-gray-600 text-center mb-8">Select the cancer type or system</p>
          
          <div className="grid sm:grid-cols-2 gap-3">
            {cancerSurgerySystems.map((system) => (
              <button
                key={system}
                onClick={() => setFormData({ ...formData, cancerSystem: system })}
                className="p-4 rounded-lg text-sm text-left transition-all"
                style={{
                  border: formData.cancerSystem === system ? '2px solid #1B4965' : '2px solid #E5E7EB',
                  backgroundColor: formData.cancerSystem === system ? '#F0F7FA' : 'white'
                }}
              >
                {system}
              </button>
            ))}
          </div>

          {/* Info notice */}
          <div 
            className="mt-6 rounded-lg p-4"
            style={{ backgroundColor: '#F0F7FA', border: '1px solid #D9EEF5' }}
          >
            <p className="text-sm" style={{ color: '#1B4965' }}>
              The healthcare provider will contact you directly for any required medical documents.
            </p>
          </div>

          <div className="mt-8 flex justify-between">
            <Button variant="outline" onClick={() => { setMedicalSubStep("select"); setFormData({ ...formData, medicalSubType: "", cancerSystem: "" }); }}>Back</Button>
            <Button
              variant="primary"
              onClick={() => setStep(3)}
              disabled={!canProceedStep2()}
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* ============================================
          STEP 3: Personal Information & Submit
          ============================================ */}
      {step === 3 && (
        <form onSubmit={handleSubmit}>
          <p className="text-gray-600 text-center mb-8">Provide your details to complete the request</p>

          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Smith"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+44 7700 900000"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Contact Method *</label>
                <select
                  value={formData.preferredContact}
                  onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value as PreferredContact })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': '#1B4965' } as React.CSSProperties}
                  required
                >
                  <option value="whatsapp">WhatsApp</option>
                  <option value="phone">Phone Call</option>
                  <option value="email">Email</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age *</label>
                <Input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="35"
                  min="18"
                  max="99"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value, city: "" })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': '#1B4965' } as React.CSSProperties}
                  required
                >
                  {countries.map((c) => (
                    <option key={c.code} value={c.code}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': '#1B4965' } as React.CSSProperties}
                  required
                >
                  <option value="">Select city...</option>
                  {availableCities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brief Description <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                placeholder="Briefly describe your situation or what you're looking for..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#1B4965' } as React.CSSProperties}
              />
            </div>

            {/* PD Code with explanation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                PD Code <span className="text-gray-400 font-normal">(if provided)</span>
              </label>
              <Input
                value={formData.pdCode}
                onChange={(e) => setFormData({ ...formData, pdCode: e.target.value.toUpperCase() })}
                placeholder="PD-XXXXX"
              />
              <p className="text-xs text-gray-500 mt-1">
                If you don&apos;t have a PD code, a Pathway Developer will be assigned to coordinate your request.
              </p>
            </div>

            {/* Consents */}
            <div className="border-t border-gray-200 pt-6 space-y-4">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={formData.consent1}
                  onChange={(e) => setFormData({ ...formData, consent1: e.target.checked })}
                  className="mt-1"
                  required
                />
                <span className="text-sm text-gray-600">
                  I understand MrClinc coordinates pathways only and does not provide medical treatment or advice *
                </span>
              </label>
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={formData.consent2}
                  onChange={(e) => setFormData({ ...formData, consent2: e.target.checked })}
                  className="mt-1"
                  required
                />
                <span className="text-sm text-gray-600">
                  I understand all medical consultations, documents, and treatment decisions are handled directly by the healthcare provider *
                </span>
              </label>
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={formData.consent3}
                  onChange={(e) => setFormData({ ...formData, consent3: e.target.checked })}
                  className="mt-1"
                  required
                />
                <span className="text-sm text-gray-600">
                  I consent to data processing per the <a href="/privacy" style={{ color: '#1B4965' }} className="hover:underline">Privacy Policy</a> *
                </span>
              </label>
            </div>

            {/* Mandatory Notice */}
            <div 
              className="rounded-lg p-4"
              style={{ backgroundColor: '#F0F7FA', border: '1px solid #D9EEF5' }}
            >
              <p className="text-sm" style={{ color: '#1B4965' }}>
                <strong>Important:</strong> MrClinc pathway coordination is completely free for patients. No Pathway Developer may request payment. MrClinc does not provide medical advice or make treatment decisions.
              </p>
            </div>
          </div>

          {submitError && (
            <div className="mt-4 bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg text-sm">
              {submitError}
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <Button type="button" variant="outline" onClick={() => setStep(2)}>Back</Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              disabled={!canProceedStep3}
            >
              Submit Request
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default function ApplyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
        <Suspense fallback={
          <div className="flex items-center justify-center py-12">
            <div 
              className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin"
              style={{ borderColor: '#1B4965', borderTopColor: 'transparent' }}
            />
          </div>
        }>
          <ApplyForm />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
