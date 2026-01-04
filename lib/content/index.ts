<<<<<<< HEAD
// Site & Navigation
export { SITE_CONFIG, NAV_LINKS, FOOTER_LINKS } from "./site";

// Services
export {
  SERVICE_CATEGORIES,
  AESTHETIC_SERVICES,
  REQUEST_STATUSES,
} from "./services";

// PD (Pathway Developer)
export {
  PD_EARNINGS,
  PAYMENT_SCHEDULE,
  EDUCATION_MODULES,
} from "./pd";

// Disclaimers & Form Content
export {
  DISCLAIMER,
  PD_DISCLAIMER,
  FORM_PLACEHOLDERS,
} from "./disclaimers";

// Statistics
export { REAL_STATS } from "./stats";
=======
// ============================================
// SITE METADATA
// ============================================

export const SITE_CONFIG = {
  name: "MrClinc",
  tagline: "Pathway Coordination Platform",
  description:
    "Connecting UK patients with Antalya healthcare providers through independent Pathway Developers.",
  url: "https://mrclinc.com",
  email: "info@mrclinc.com",
};

// ============================================
// NAVIGATION
// ============================================

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Why Antalya", href: "/why-antalya" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_LINKS = {
  services: {
    title: "Services",
    links: [
      { label: "Aesthetic Surgery", href: "/services#aesthetic" },
      { label: "Cancer Surgery", href: "/services#cancer" },
      { label: "General Surgery", href: "/services#general" },
      { label: "Free Second Opinion", href: "/services#second-opinion" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "How It Works", href: "/how-it-works" },
      { label: "Why Antalya", href: "/why-antalya" },
      { label: "Contact", href: "/contact" },
      { label: "Patient FAQ", href: "/patient/faq" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
  pd: {
    title: "Pathway Developers",
    links: [
      { label: "About PD Program", href: "/pd" },
      { label: "PD Login", href: "/pd/login" },
    ],
  },
};

// ============================================
// SERVICE CATEGORIES
// ============================================

export const SERVICE_CATEGORIES = {
  aesthetic: {
    title: "Aesthetic Surgery",
    description: "Face, breast, body contouring, and hair restoration procedures",
    icon: "✨",
    earnings: { base: 250, bonus: 100, total: 350 },
    hasSecondOpinion: false,
  },
  cancer: {
    title: "Cancer Surgery",
    description: "Oncological surgery with free second opinion service",
    icon: "🎗️",
    earnings: { base: 1000, bonus: 200, total: 1200 },
    hasSecondOpinion: true,
  },
  general: {
    title: "General Surgery",
    description: "Hepatobiliary, hernia, proctology, and bariatric procedures",
    icon: "🏥",
    earnings: { base: 1000, bonus: 200, total: 1200 },
    hasSecondOpinion: true,
  },
};

// ============================================
// AESTHETIC SURGERY SERVICES
// ============================================

export const AESTHETIC_SERVICES = {
  face: {
    title: "Face",
    procedures: [
      "Rhinoplasty (Nose Aesthetics)",
      "Revision Rhinoplasty",
      "Septorhinoplasty",
      "Blepharoplasty (Eyelid Surgery)",
      "Face Lift / Mini Face Lift",
      "Neck Lift",
      "Brow Lift",
      "Otoplasty (Ear Pinning)",
      "Buccal Fat Removal",
      "Chin Surgery (Genioplasty)",
    ],
  },
  breast: {
    title: "Breast",
    procedures: [
      "Breast Augmentation",
      "Breast Lift (Mastopexy)",
      "Breast Reduction",
      "Gynecomastia Surgery",
      "Breast Revision Surgery",
    ],
  },
  body: {
    title: "Body Contouring",
    procedures: [
      "Liposuction",
      "Abdominoplasty (Tummy Tuck)",
      "Mini Abdominoplasty",
      "Brazilian Butt Lift (BBL)",
      "Arm Lift (Brachioplasty)",
      "Thigh Lift",
      "Back/Waist Contouring",
    ],
  },
  hair: {
    title: "Hair Restoration",
    procedures: [
      "Hair Transplant (FUE/DHI)",
      "Beard/Mustache Transplant",
      "Eyebrow Transplant",
    ],
  },
};

// ============================================
// REQUEST STATUS
// ============================================

export const REQUEST_STATUSES = {
  received: {
    label: "Received",
    description: "We've received your request and are reviewing it.",
    color: "blue",
  },
  processing: {
    label: "Processing",
    description: "Your request is being coordinated with clinics.",
    color: "yellow",
  },
  quotes_sent: {
    label: "Quotes Sent",
    description: "Clinics have sent you quotes. Please check your email.",
    color: "purple",
  },
  in_progress: {
    label: "In Progress",
    description: "You've booked treatment. Preparation in progress.",
    color: "orange",
  },
  completed: {
    label: "Completed",
    description: "Treatment completed successfully.",
    color: "green",
  },
  closed: {
    label: "Closed",
    description: "This case has been closed.",
    color: "gray",
  },
};

// ============================================
// PD EARNINGS INFO
// ============================================

export const PD_EARNINGS = {
  aesthetic: {
    base: 250,
    bonus: 100,
    total: 350,
    currency: "EUR",
    bonusCondition: "Patient books within 14 days OR 3+ cases in same month",
  },
  cancer: {
    base: 1000,
    bonus: 200,
    total: 1200,
    currency: "EUR",
    bonusCondition: "Positive clinic feedback on case completion",
  },
  general: {
    base: 1000,
    bonus: 200,
    total: 1200,
    currency: "EUR",
    bonusCondition: "Positive clinic feedback on case completion",
  },
};

export const PAYMENT_SCHEDULE = {
  frequency: "Twice monthly (1st and 15th)",
  method: "Bank transfer",
  currencies: ["EUR", "GBP"] as const,
  processingDays: 3,
};

// ============================================
// EDUCATION MODULES
// ============================================

export const EDUCATION_MODULES = [
  {
    id: 1,
    title: "PD Fundamentals",
    description: "Understanding your role as a Pathway Developer",
    duration: 15,
    questions: 10,
    required: true,
  },
  {
    id: 2,
    title: "Target Hints Masterclass",
    description: "Conflict-free profession targeting strategies",
    duration: 20,
    questions: 10,
    required: true,
    prerequisite: 1,
  },
  {
    id: 3,
    title: "Second Opinion Strategy",
    description: "Leveraging free second opinion for trust building",
    duration: 15,
    questions: 10,
    required: true,
    prerequisite: 1,
  },
  {
    id: 4,
    title: "Compliance & Ethics",
    description: "GDPR, medical boundaries, and ethical conduct",
    duration: 20,
    questions: 12,
    required: true,
    prerequisite: 1,
  },
  {
    id: 5,
    title: "Patient Communication",
    description: "Professional language and expectation management",
    duration: 15,
    questions: 10,
    required: true,
    prerequisite: 1,
  },
];

// ============================================
// REAL STATISTICS (Verified Data Only)
// ============================================

export const REAL_STATS = {
  turkeyHealthTourism: "1.2M+ international patients annually",
  antalyaTourism: "World's 8th most visited city",
  jciHospitals: "50+ JCI-accredited hospitals in Turkey",
  // NO fake MrClinc-specific stats - spec compliant
};

// ============================================
// DISCLAIMER TEXT
// ============================================

export const DISCLAIMER = `MrClinc coordinates pathways between patients and healthcare providers. 
We do not provide medical advice, diagnosis, or treatment. All medical 
decisions are made between you and your chosen healthcare provider.`;

export const PD_DISCLAIMER = `MrClinc pathway coordination is completely FREE. 
No Pathway Developer can request payment from you.`;

// ============================================
// FORM PLACEHOLDERS
// ============================================

export const FORM_PLACEHOLDERS = {
  name: "Enter your full name",
  email: "Enter your email address",
  phone: "Enter your phone number",
  location: "City, Country (e.g., London, UK)",
  pdCode: "PD-XXXXX (optional)",
  message: "Describe your requirements...",
};
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
