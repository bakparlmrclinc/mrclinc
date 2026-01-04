import type { ServiceCategory, RequestStatus } from "./service";

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
