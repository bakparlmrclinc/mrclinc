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

export type RequestStatus =
  | "received"
  | "processing"
  | "quotes_sent"
  | "in_progress"
  | "completed"
  | "closed";

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
