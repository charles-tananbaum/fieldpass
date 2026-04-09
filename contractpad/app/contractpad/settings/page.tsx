"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import { getBusiness, resetAll, setBusiness } from "@/lib/storage";
import type { Business } from "@/lib/types";
import { DEFAULT_BUSINESS } from "@/lib/seed";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const [form, setForm] = useState<Business>(DEFAULT_BUSINESS);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(getBusiness());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setBusiness(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const handleReset = () => {
    if (!confirm("Wipe all demo data? This clears customers and contracts.")) return;
    resetAll();
    router.replace("/contractpad/login");
  };

  return (
    <AppShell>
      <div className="animate-fade-up">
        <div className="mb-6">
          <div className="font-mono text-[10px] uppercase tracking-widest text-brand-600 mb-2">
            Settings
          </div>
          <h1 className="section-title">Your business</h1>
          <p className="text-ink-muted mt-2">
            Shown on every contract header.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <Field label="Business Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          <Field label="Street Address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} />
          <div className="grid grid-cols-[1fr_auto_auto] gap-3">
            <Field label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
            <Field label="State" value={form.state} onChange={(v) => setForm({ ...form, state: v.toUpperCase().slice(0, 2) })} compact />
            <Field label="ZIP" value={form.zip} onChange={(v) => setForm({ ...form, zip: v })} compact />
          </div>
          <Field label="Phone" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
          <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />

          <button type="submit" className="btn-accent w-full mt-6">
            {saved ? "Saved ✓" : "Save"}
          </button>
        </form>

        <div className="mt-12 pt-6 border-t border-rule">
          <h2 className="font-display text-xl text-ink mb-2">Demo data</h2>
          <p className="text-sm text-ink-muted mb-4">
            Reset everything and start fresh.
          </p>
          <button onClick={handleReset} className="btn-secondary w-full">
            Wipe demo data
          </button>
        </div>
      </div>
    </AppShell>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  compact,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
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
      />
    </div>
  );
}
