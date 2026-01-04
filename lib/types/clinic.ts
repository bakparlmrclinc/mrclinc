import type { ServiceCategory } from "./service";

export interface Clinic {
  id: string;
  name: string;
  location: string;
  specializations: ServiceCategory[];
  accreditations: string[];
  isActive: boolean;
}
