"use client";

import { useMemo, useState } from "react";
import type { Customer } from "@/lib/types";
import { addCustomer, getCustomers } from "@/lib/storage";

interface CustomerStepProps {
  onSelect: (customer: Customer) => void;
}

type Mode = "search" | "new";

export default function CustomerStep({ onSelect }: CustomerStepProps) {
  const [mode, setMode] = useState<Mode>("search");
  const [query, setQuery] = useState("");
  const customers = useMemo(() => getCustomers(), []);

  const filtered = useMemo(() => {
    if (!query.trim()) return customers;
    const q = query.toLowerCase();
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q)
    );
  }, [query, customers]);

  if (mode === "new") {
    return <NewCustomerForm onCreate={(c) => { onSelect(c); }} onCancel={() => setMode("search")} />;
  }

  return (
    <div className="animate-fade-up">
      <h2 className="section-title mb-2">Who's the customer?</h2>
      <p className="text-ink-muted mb-6">Search existing or add new.</p>

      <div className="relative mb-4">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Search by name, address, email…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input pl-12"
          autoFocus
        />
      </div>

      <button
        onClick={() => setMode("new")}
        className="btn-secondary w-full mb-6"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Add New Customer
      </button>

      <div className="space-y-2">
        {filtered.length === 0 && (
          <div className="card p-6 text-center text-ink-muted text-sm">
            No matches. Tap "Add New Customer" above.
          </div>
        )}
        {filtered.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelect(c)}
            className="card p-4 w-full text-left active:scale-[0.99] transition flex items-start gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-brand-500/20 text-brand-500 flex items-center justify-center font-semibold shrink-0 border border-brand-500/30">
              {c.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-ink truncate">{c.name}</div>
              <div className="text-sm text-ink-muted truncate">
                {c.address}, {c.city}
              </div>
            </div>
            {c.source === "hcp_mock" && (
              <span className="font-mono text-[9px] uppercase tracking-wider text-ink-muted bg-rule/60 px-2 py-0.5 rounded-full shrink-0">
                HCP
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function NewCustomerForm({
  onCreate,
  onCancel,
}: {
  onCreate: (c: Customer) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "OH",
    zip: "",
    email: "",
    phone: "",
  });

  const canSubmit =
    form.name.trim() &&
    form.address.trim() &&
    form.city.trim() &&
    form.email.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    const customer = addCustomer(form);
    onCreate(customer);
  };

  return (
    <div className="animate-fade-up">
      <h2 className="section-title mb-2">New customer</h2>
      <p className="text-ink-muted mb-6">Just the essentials — we'll fill the rest.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} autoFocus />
        <Field label="Street Address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} />
        <div className="grid grid-cols-[1fr_auto_auto] gap-3">
          <Field label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
          <Field label="State" value={form.state} onChange={(v) => setForm({ ...form, state: v.toUpperCase().slice(0, 2) })} compact />
          <Field label="ZIP" value={form.zip} onChange={(v) => setForm({ ...form, zip: v })} compact />
        </div>
        <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
        <Field label="Phone" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-accent" disabled={!canSubmit}>
            Save & Continue →
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  autoFocus,
  compact,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoFocus?: boolean;
  compact?: boolean;
}) {
  return (
    <div>
      <label className="label">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`input ${compact ? "w-20 text-center" : ""}`}
        autoFocus={autoFocus}
      />
    </div>
  );
}
