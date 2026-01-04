export type SecondOpinionStatus =
  | "submitted"
  | "assigned"
  | "documents_requested"
  | "under_review"
  | "report_ready"
  | "delivered"
  | "closed";

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
