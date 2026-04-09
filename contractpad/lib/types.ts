export type BillingFrequency = "monthly" | "quarterly" | "semi-annual" | "annual";

export type ContractStatus = "draft" | "signed" | "finalized";

export type CustomerSource = "manual" | "hcp_mock";

export interface Business {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
}

export interface Tech {
  id: string;
  name: string;
  email: string;
}

export interface Customer {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  phone: string;
  source: CustomerSource;
  createdAt: string;
}

export interface ContractTier {
  id: string;
  name: string;
  tagline: string;
  defaultPrice: number; // monthly USD
  defaultFrequency: BillingFrequency;
  defaultLengthMonths: number;
  includedServices: string[];
  recommended?: boolean;
  accent: "silver" | "gold" | "platinum";
}

export interface TermsSection {
  label: string;
  body: string;
}

export interface Contract {
  id: string;
  number: string; // human-readable e.g. CP-0041
  customerId: string;
  tierId: string | null; // null = custom
  tierName: string;
  // Header/business fields — snapshot taken at creation, fully editable per contract
  businessSnapshot: Business;
  customerSnapshot: Customer;
  // Free-form editable content
  title: string;
  partiesText: string;
  termsSections: TermsSection[];
  footer: string;
  // Structured fields
  startDate: string; // ISO date
  lengthMonths: number;
  frequency: BillingFrequency;
  price: number; // USD per period
  includedServices: string[];
  // Signing
  techId: string;
  techName: string;
  techSignaturePng: string | null; // base64 data URL
  customerSignaturePng: string | null;
  techSignedAt: string | null;
  customerSignedAt: string | null;
  finalizedAt: string | null;
  status: ContractStatus;
}
