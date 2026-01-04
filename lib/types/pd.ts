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
