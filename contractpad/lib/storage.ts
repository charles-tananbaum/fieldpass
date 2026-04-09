"use client";

import type { Business, Contract, Customer, Tech } from "./types";
import { DEFAULT_BUSINESS, DEFAULT_TECH, SEED_CUSTOMERS } from "./seed";

const KEYS = {
  business: "contractpad:business",
  customers: "contractpad:customers",
  contracts: "contractpad:contracts",
  currentTech: "contractpad:currentTech",
  seeded: "contractpad:seeded",
} as const;

const safeGet = <T>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

const safeSet = <T>(key: string, value: T): void => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore quota */
  }
};

export const ensureSeeded = (): void => {
  if (typeof window === "undefined") return;
  if (window.localStorage.getItem(KEYS.seeded)) return;
  safeSet(KEYS.business, DEFAULT_BUSINESS);
  safeSet(KEYS.customers, SEED_CUSTOMERS);
  safeSet(KEYS.contracts, [] as Contract[]);
  window.localStorage.setItem(KEYS.seeded, "1");
};

export const resetAll = (): void => {
  if (typeof window === "undefined") return;
  Object.values(KEYS).forEach((k) => window.localStorage.removeItem(k));
};

// ── Business ──
export const getBusiness = (): Business =>
  safeGet<Business>(KEYS.business, DEFAULT_BUSINESS);

export const setBusiness = (b: Business): void => safeSet(KEYS.business, b);

// ── Tech / session ──
export const getCurrentTech = (): Tech | null =>
  safeGet<Tech | null>(KEYS.currentTech, null);

export const setCurrentTech = (t: Tech | null): void =>
  safeSet(KEYS.currentTech, t);

export const loginTech = (name: string, email: string): Tech => {
  const tech: Tech = {
    id: DEFAULT_TECH.id,
    name: name.trim() || DEFAULT_TECH.name,
    email: email.trim() || DEFAULT_TECH.email,
  };
  setCurrentTech(tech);
  return tech;
};

export const logoutTech = (): void => setCurrentTech(null);

// ── Customers ──
export const getCustomers = (): Customer[] =>
  safeGet<Customer[]>(KEYS.customers, []);

export const addCustomer = (
  data: Omit<Customer, "id" | "createdAt" | "source">
): Customer => {
  const customer: Customer = {
    ...data,
    id: `cust-${Date.now().toString(36)}`,
    createdAt: new Date().toISOString(),
    source: "manual",
  };
  const all = [customer, ...getCustomers()];
  safeSet(KEYS.customers, all);
  return customer;
};

export const findCustomer = (id: string): Customer | undefined =>
  getCustomers().find((c) => c.id === id);

// ── Contracts ──
export const getContracts = (): Contract[] =>
  safeGet<Contract[]>(KEYS.contracts, []);

export const findContract = (id: string): Contract | undefined =>
  getContracts().find((c) => c.id === id);

export const saveContract = (contract: Contract): void => {
  const all = getContracts();
  const existingIdx = all.findIndex((c) => c.id === contract.id);
  if (existingIdx >= 0) {
    all[existingIdx] = contract;
  } else {
    all.unshift(contract);
  }
  safeSet(KEYS.contracts, all);
};

export const nextContractNumber = (): string => {
  const n = getContracts().length + 1;
  return `CP-${n.toString().padStart(4, "0")}`;
};
