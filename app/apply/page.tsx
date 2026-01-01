"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type ServiceType = "aesthetic" | "cancer" | "general" | "second-opinion";

interface FormData {
  serviceType: ServiceType | "";
  subCategory: string;
  name: string;
  email: string;
  phone: string;
  age: string;
  city: string;
  country: string;
  description: string;
  pdCode: string;
  consent1: boolean;
  consent2: boolean;
  consent3: boolean;
}

function ApplyForm() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [trackingCode, setTrackingCode] = useState("");

  const [formData, setFormData] = useState<FormData>({
    serviceType: "",
    subCategory: "",
    name: "",
    email: "",
    phone: "",
    age: "",
    city: "",
    country: "United Kingdom",
    description: "",
    pdCode: "",
    consent1: false,
    consent2: false,
    consent3: false,
  });

  useEffect(() => {
    const service = searchParams.get("service");
    const type = searchParams.get("type");
    if (type === "second-opinion") {
      setFormData(prev => ({ ...prev, serviceType: "second-opinion" }));
    } else if (service) {
      setFormData(prev => ({ ...prev, serviceType: service as ServiceType }));
    }
  }, [searchParams]);

  const serviceOptions = [
    { value: "aesthetic", label: "Aesthetic Surgery", description: "Face, breast, body procedures" },
    { value: "cancer", label: "Cancer Surgery", description: "Oncological surgical procedures" },
    { value: "general", label: "General Surgery", description: "Non-oncological surgical procedures" },
    { value: "second-opinion", label: "Free Second Opinion", description: "Cancer or General Surgery review" },
  ];

  const subCategories: Record<ServiceType, string[]> = {
    aesthetic: ["Rhinoplasty", "Breast Augmentation", "Liposuction", "Tummy Tuck", "Facelift", "Other"],
    cancer: ["Gastrointestinal", "Breast", "Lung", "Thyroid", "Urological", "Gynecological", "Other"],
    general: ["Gallbladder", "Hernia", "Appendix", "Bariatric", "Hemorrhoids", "Other"],
    "second-opinion": ["Cancer Surgery Review", "General Surgery Review"],
  };

  const handleServiceSelect = (value: ServiceType) => {
    setFormData({ ...formData, serviceType: value, subCategory: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const code = `TRK-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    setTrackingCode(code);
    setIsSubmitting(false);
    setStep(4);
  };

  const canProceedStep1 = formData.serviceType !== "";
  const canProceedStep2 = formData.subCategory !== "";
  const canProceedStep3 = 
    formData.name && 
    formData.email && 
    formData.phone && 
    formData.age && 
    formData.city &&
    formData.consent1 && 
    formData.consent2 && 
    formData.consent3;

  // Success view
  if (step === 4) {
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
          Your request has been received. Clinics will review and respond within 48-72 hours.
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

      {/* Step 1: Service Selection */}
      {step === 1 && (
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">Select Service</h1>
          <p className="text-gray-600 text-center mb-8">Choose the type of service you're interested in</p>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {serviceOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleServiceSelect(option.value as ServiceType)}
                className="p-6 rounded-xl text-left transition-all"
                style={{
                  border: formData.serviceType === option.value ? '2px solid #1B4965' : '2px solid #E5E7EB',
                  backgroundColor: formData.serviceType === option.value ? '#F0F7FA' : 'white'
                }}
              >
                <h3 className="font-semibold text-gray-900 mb-1">{option.label}</h3>
                <p className="text-sm text-gray-600">{option.description}</p>
              </button>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <Button
              variant="primary"
              onClick={() => setStep(2)}
              disabled={!canProceedStep1}
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Sub-category */}
      {step === 2 && formData.serviceType && (
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">Select Category</h1>
          <p className="text-gray-600 text-center mb-8">Choose the specific area of interest</p>
          
          <div className="grid sm:grid-cols-2 gap-3">
            {subCategories[formData.serviceType].map((sub) => (
              <button
                key={sub}
                onClick={() => setFormData({ ...formData, subCategory: sub })}
                className="p-4 rounded-xl text-left transition-all"
                style={{
                  border: formData.subCategory === sub ? '2px solid #1B4965' : '2px solid #E5E7EB',
                  backgroundColor: formData.subCategory === sub ? '#F0F7FA' : 'white'
                }}
              >
                {sub}
              </button>
            ))}
          </div>

          <div className="mt-8 flex justify-between">
            <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
            <Button
              variant="primary"
              onClick={() => setStep(3)}
              disabled={!canProceedStep2}
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Details & Submit */}
      {step === 3 && (
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">Your Information</h1>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                <Input
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="London"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <Input
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="United Kingdom"
                />
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                PD Code <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <Input
                value={formData.pdCode}
                onChange={(e) => setFormData({ ...formData, pdCode: e.target.value.toUpperCase() })}
                placeholder="PD-XXXXX"
              />
              <p className="text-xs text-gray-500 mt-1">If a Pathway Developer shared a code with you</p>
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
                  I understand clinics provide all medical consultations and treatment decisions *
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

            {/* Notice */}
            <div 
              className="rounded-lg p-4"
              style={{ backgroundColor: '#F0F7FA', border: '1px solid #D9EEF5' }}
            >
              <p className="text-sm" style={{ color: '#1B4965' }}>
                <strong>Important:</strong> MrClinc pathway coordination is completely free. No Pathway Developer can request payment from you.
              </p>
            </div>
          </div>

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
