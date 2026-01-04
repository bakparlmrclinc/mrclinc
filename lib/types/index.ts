<<<<<<< HEAD
// Patient
export type { Patient } from "./patient";

// Service
export type {
  ServiceCategory,
  AestheticSubcategory,
  CancerSubcategory,
  GeneralSubcategory,
  RequestStatus,
  ServiceRequest,
} from "./service";

// Pathway Developer
export type {
  PathwayDeveloper,
  PDEarnings,
  PDTransaction,
} from "./pd";

// Case
export type {
  Case,
  CaseTimeline,
  CaseEvent,
  EscalationNote,
} from "./case";

// Clinic
export type { Clinic } from "./clinic";

// Second Opinion
export type {
  SecondOpinionStatus,
  SecondOpinionRequest,
} from "./second-opinion";

// Education
export type {
  EducationModule,
  ModuleProgress,
  QuizQuestion,
  TrainingCategory,
  TrainingScenario,
  TrainingProgress,
} from "./education";
=======
// ============================================
// PATIENT TYPES
// ============================================

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  age: number;
  createdAt: Date;
}

// ============================================
// SERVICE TYPES
// ============================================

export type ServiceCategory = "aesthetic" | "cancer" | "general";

export type AestheticSubcategory = "face" | "breast" | "body" | "genital" | "hair";

export type CancerSubcategory =
  | "gastrointestinal"
  | "hepatobiliary"
  | "thoracic"
  | "breast"
  | "gynecological"
  | "urological"
  | "head_neck"
  | "dermatological"
  | "sarcoma"
  | "neuro";

export type GeneralSubcategory =
  | "hepatobiliary"
  | "liver"
  | "pancreas"
  | "stomach"
  | "intestines"
  | "hernia"
  | "proctology"
  | "obesity"
  | "endocrine";

export interface ServiceRequest {
  id: string;
  trackingCode: string;
  patientId: string;
  serviceCategory: ServiceCategory;
  serviceType: string;
  subcategory?: string;
  pdCode?: string;
  status: RequestStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type RequestStatus =
  | "received"
  | "processing"
  | "quotes_sent"
  | "in_progress"
  | "completed"
  | "closed";

// ============================================
// PD (PATHWAY DEVELOPER) TYPES
// ============================================

export interface PathwayDeveloper {
  id: string;
  code: string; // Format: PD-XXXXX
  name: string;
  email: string;
  phone: string;
  city: string;
  professionalBackground?: string;
  isActive: boolean;
  createdAt: Date;
}

export interface PDEarnings {
  pdId: string;
  totalEarnings: number;
  pendingEarnings: number;
  paidEarnings: number;
  currency: "EUR" | "GBP";
}

export interface PDTransaction {
  id: string;
  pdId: string;
  caseId: string;
  trackingCode: string;
  serviceType: string;
  amount: number;
  currency: "EUR" | "GBP";
  status: "pending" | "approved" | "paid";
  completedAt: Date;
  paidAt?: Date;
}

// ============================================
// CASE TYPES
// ============================================

export interface Case {
  id: string;
  trackingCode: string;
  patientFirstName: string;
  patientLastInitial: string;
  location: string;
  age: number;
  serviceCategory: ServiceCategory;
  serviceType: string;
  status: RequestStatus;
  pdId?: string;
  pdCode?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CaseTimeline {
  caseId: string;
  events: CaseEvent[];
}

export interface CaseEvent {
  status: RequestStatus;
  timestamp: Date;
  note?: string;
}

export interface EscalationNote {
  id: string;
  caseId: string;
  pdId: string;
  issueType: "no_response" | "process_question" | "clinic_issue" | "other";
  details: string;
  createdAt: Date;
  resolvedAt?: Date;
  adminResponse?: string;
}

// ============================================
// CLINIC TYPES
// ============================================

export interface Clinic {
  id: string;
  name: string;
  location: string;
  specializations: ServiceCategory[];
  accreditations: string[];
  isActive: boolean;
}

// ============================================
// SECOND OPINION TYPES
// ============================================

export interface SecondOpinionRequest {
  id: string;
  trackingCode: string;
  patientId: string;
  serviceCategory: "cancer" | "general";
  briefDescription: string;
  status: SecondOpinionStatus;
  clinicId?: string;
  reportDeliveredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type SecondOpinionStatus =
  | "submitted"
  | "assigned"
  | "documents_requested"
  | "under_review"
  | "report_ready"
  | "delivered"
  | "closed";

// ============================================
// EDUCATION MODULE TYPES
// ============================================

export interface EducationModule {
  id: number;
  title: string;
  description: string;
  durationMinutes: number;
  questionsCount: number;
  passScore: number;
  isRequired: boolean;
  prerequisiteModuleId?: number;
}

export interface ModuleProgress {
  moduleId: number;
  pdId: string;
  status: "not_started" | "in_progress" | "completed" | "failed";
  currentSection: number;
  quizAttempts: number;
  quizScore?: number;
  lastAccessedAt: Date;
  completedAt?: Date;
}

export interface QuizQuestion {
  id: string;
  moduleId: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// ============================================
// TRAINING LAB TYPES
// ============================================

export type TrainingCategory =
  | "first_contact"
  | "boundary_enforcement"
  | "channel_development"
  | "complex_cases"
  | "communication_skills";

export interface TrainingScenario {
  id: string;
  category: TrainingCategory;
  difficulty: "easy" | "medium" | "hard";
  title: string;
  situation: string;
  task: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface TrainingProgress {
  pdId: string;
  category: TrainingCategory;
  completedScenarios: string[];
  score: number;
  badge?: "bronze" | "silver" | "gold";
}
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
