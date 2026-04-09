import type { BillingFrequency } from "./types";

export const formatCurrency = (n: number): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(n);

export const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export const formatShortDate = (iso: string): string =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export const frequencyLabel = (f: BillingFrequency): string => {
  switch (f) {
    case "monthly":
      return "per month";
    case "quarterly":
      return "per quarter";
    case "semi-annual":
      return "twice per year";
    case "annual":
      return "per year";
  }
};

export const frequencyAdjective = (f: BillingFrequency): string => {
  switch (f) {
    case "monthly":
      return "Monthly";
    case "quarterly":
      return "Quarterly";
    case "semi-annual":
      return "Semi-Annual";
    case "annual":
      return "Annual";
  }
};

export const periodsPerYear = (f: BillingFrequency): number => {
  switch (f) {
    case "monthly":
      return 12;
    case "quarterly":
      return 4;
    case "semi-annual":
      return 2;
    case "annual":
      return 1;
  }
};

export const computeAnnualTotal = (price: number, f: BillingFrequency): number =>
  price * periodsPerYear(f);
