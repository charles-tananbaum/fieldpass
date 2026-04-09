"use client";

import { useRef, useState } from "react";
import type {
  BillingFrequency,
  Business,
  Customer,
  TermsSection,
} from "@/lib/types";
import { formatDate } from "@/lib/format";

export interface ComposerValue {
  // Business header
  businessName: string;
  businessAddress: string;
  businessCity: string;
  businessState: string;
  businessZip: string;
  businessPhone: string;
  businessEmail: string;
  // Plan + title
  tierName: string;
  title: string;
  // Parties
  partiesText: string;
  // Customer (editable for typo fixes)
  customerName: string;
  customerAddress: string;
  customerCity: string;
  customerState: string;
  customerZip: string;
  // Term
  startDate: string; // YYYY-MM-DD
  lengthMonths: number;
  // Price
  price: number;
  frequency: BillingFrequency;
  // Services
  includedServices: string[];
  // Terms
  termsSections: TermsSection[];
  // Footer
  footer: string;
}

interface ContractComposerProps {
  number: string;
  value: ComposerValue;
  onChange: (next: ComposerValue) => void;
}

const FREQUENCIES: { value: BillingFrequency; label: string }[] = [
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "semi-annual", label: "Semi-Annual" },
  { value: "annual", label: "Annual" },
];

const LENGTH_OPTIONS = [6, 12, 24, 36];

export function buildInitialComposerValue(
  business: Business,
  customer: Customer
): ComposerValue {
  return {
    businessName: business.name,
    businessAddress: business.address,
    businessCity: business.city,
    businessState: business.state,
    businessZip: business.zip,
    businessPhone: business.phone,
    businessEmail: business.email,
    tierName: "Maintenance Plan",
    title: "Residential HVAC Maintenance Service Agreement",
    partiesText: `This Agreement is entered into between {{business}} ("Contractor") and {{customer}} ("Customer"), located at {{customerAddress}}.`,
    customerName: customer.name,
    customerAddress: customer.address,
    customerCity: customer.city,
    customerState: customer.state,
    customerZip: customer.zip,
    startDate: new Date().toISOString().slice(0, 10),
    lengthMonths: 12,
    price: 24.99,
    frequency: "monthly",
    includedServices: [
      "2 annual system tune-ups (heating + cooling)",
      "Standard filter replacement included",
      "20% discount on repairs",
      "Priority scheduling + same-day emergency service",
      "Waived after-hours diagnostic fee",
    ],
    termsSections: [
      {
        label: "Scheduling",
        body: "Scheduled maintenance visits will be performed during normal business hours by mutual agreement. Emergency service is provided per the plan terms above.",
      },
      {
        label: "Exclusions",
        body: "This Agreement does not cover parts, refrigerant beyond any included allowance, equipment replacement, damage due to misuse, acts of God, or pre-existing defects.",
      },
      {
        label: "Cancellation",
        body: "Either party may cancel with 30 days' written notice. Pre-paid amounts are refundable on a pro-rata basis for services not yet rendered.",
      },
      {
        label: "Limitation of Liability",
        body: "Contractor's liability is limited to the amounts paid under this Agreement in the preceding 12 months.",
      },
      {
        label: "Governing Law",
        body: `This Agreement is governed by the laws of the State of ${customer.state}.`,
      },
    ],
    footer: "Draft — Have reviewed by counsel before production use",
  };
}

/**
 * Resolve party preamble template tokens into a display string.
 * Templates supported: {{business}}, {{customer}}, {{customerAddress}}
 */
export const resolvePartiesText = (v: Pick<ComposerValue,
  "partiesText" | "businessName" | "customerName" | "customerAddress" | "customerCity" | "customerState" | "customerZip"
>): string =>
  v.partiesText
    .replace(/\{\{business\}\}/g, v.businessName)
    .replace(/\{\{customer\}\}/g, v.customerName)
    .replace(
      /\{\{customerAddress\}\}/g,
      `${v.customerAddress}, ${v.customerCity}, ${v.customerState} ${v.customerZip}`
    );

export default function ContractComposer({
  number,
  value,
  onChange,
}: ContractComposerProps) {
  const patch = (updates: Partial<ComposerValue>) =>
    onChange({ ...value, ...updates });

  return (
    <div className="card p-6 sm:p-8 bg-surface-grad">
      {/* ── Header — fully editable ── */}
      <div className="pb-4 mb-6 border-b border-rule-strong">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-500 mb-1">
          {number}
        </div>
        <InlineInput
          value={value.businessName}
          onChange={(v) => patch({ businessName: v })}
          className="font-display text-3xl sm:text-4xl text-ink leading-tight w-full"
          ariaLabel="Business name"
        />
        <div className="mt-2 flex flex-wrap items-center gap-x-1 gap-y-1 text-xs text-ink-muted font-mono">
          <InlineInput
            value={value.businessAddress}
            onChange={(v) => patch({ businessAddress: v })}
            className="text-xs font-mono text-ink-muted"
            ariaLabel="Business street address"
          />
          <span>,</span>
          <InlineInput
            value={value.businessCity}
            onChange={(v) => patch({ businessCity: v })}
            className="text-xs font-mono text-ink-muted w-20"
            ariaLabel="Business city"
          />
          <InlineInput
            value={value.businessState}
            onChange={(v) => patch({ businessState: v.toUpperCase().slice(0, 2) })}
            className="text-xs font-mono text-ink-muted w-6 text-center"
            ariaLabel="Business state"
          />
          <InlineInput
            value={value.businessZip}
            onChange={(v) => patch({ businessZip: v })}
            className="text-xs font-mono text-ink-muted w-14"
            ariaLabel="Business ZIP"
          />
          <span>·</span>
          <InlineInput
            value={value.businessPhone}
            onChange={(v) => patch({ businessPhone: v })}
            className="text-xs font-mono text-ink-muted w-28"
            ariaLabel="Business phone"
          />
        </div>
      </div>

      {/* ── Plan name + Agreement title ── */}
      <div className="mb-6 text-center">
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-muted mb-2">
          Plan Name
        </div>
        <InlineInput
          value={value.tierName}
          onChange={(v) => patch({ tierName: v })}
          className="font-display text-2xl italic text-center w-full max-w-sm mx-auto mb-4"
          ariaLabel="Plan name"
        />
        <InlineTextarea
          value={value.title}
          onChange={(v) => patch({ title: v })}
          className="font-display text-xl sm:text-2xl text-ink text-center w-full leading-tight italic"
          ariaLabel="Agreement title"
        />
      </div>

      <Section label="Parties">
        <InlineTextarea
          value={value.partiesText}
          onChange={(v) => patch({ partiesText: v })}
          className="text-sm text-ink-soft leading-relaxed w-full"
          ariaLabel="Parties preamble"
          helper="Use {{business}}, {{customer}}, and {{customerAddress}} as placeholders."
        />
        <div className="mt-3 rounded-lg border border-rule bg-paper-raised/50 p-3">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-muted mb-2">
            Resolved preview
          </div>
          <p className="text-xs text-ink leading-relaxed italic">
            {resolvePartiesText(value)}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          <EditLabel label="Customer Name">
            <InlineInput
              value={value.customerName}
              onChange={(v) => patch({ customerName: v })}
              className="text-sm font-semibold"
              ariaLabel="Customer name"
            />
          </EditLabel>
          <EditLabel label="Customer Address">
            <InlineInput
              value={value.customerAddress}
              onChange={(v) => patch({ customerAddress: v })}
              className="text-sm"
              ariaLabel="Customer street address"
            />
          </EditLabel>
          <EditLabel label="City">
            <InlineInput
              value={value.customerCity}
              onChange={(v) => patch({ customerCity: v })}
              className="text-sm"
              ariaLabel="Customer city"
            />
          </EditLabel>
          <div className="grid grid-cols-2 gap-3">
            <EditLabel label="State">
              <InlineInput
                value={value.customerState}
                onChange={(v) =>
                  patch({ customerState: v.toUpperCase().slice(0, 2) })
                }
                className="text-sm uppercase"
                ariaLabel="Customer state"
              />
            </EditLabel>
            <EditLabel label="ZIP">
              <InlineInput
                value={value.customerZip}
                onChange={(v) => patch({ customerZip: v })}
                className="text-sm"
                ariaLabel="Customer ZIP"
              />
            </EditLabel>
          </div>
        </div>
      </Section>

      <Section label="Term & Start Date">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-muted mb-1">
              Start
            </div>
            <InlineDate
              value={value.startDate}
              onChange={(v) => patch({ startDate: v })}
            />
          </div>
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-muted mb-1">
              Length
            </div>
            <div className="flex flex-wrap gap-1.5">
              {LENGTH_OPTIONS.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => patch({ lengthMonths: m })}
                  className={`edit-pill ${
                    value.lengthMonths === m ? "active" : ""
                  }`}
                >
                  {m}mo
                </button>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section label="Price & Billing">
        <div className="rounded-xl p-5 border border-rule-strong bg-paper-raised text-center">
          <div className="flex items-baseline justify-center gap-1">
            <span className="font-display text-3xl text-ink-muted">$</span>
            <InlineInput
              type="number"
              value={value.price.toString()}
              onChange={(v) => patch({ price: parseFloat(v) || 0 })}
              className="font-display text-5xl text-center w-36 text-ink"
              ariaLabel="Price"
            />
          </div>
          <div className="flex flex-wrap gap-1.5 justify-center mt-3">
            {FREQUENCIES.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => patch({ frequency: f.value })}
                className={`edit-pill ${
                  value.frequency === f.value ? "active" : ""
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </Section>

      <Section label="Services Included">
        <EditableServices
          services={value.includedServices}
          onChange={(next) => patch({ includedServices: next })}
        />
      </Section>

      <Section label="Terms & Conditions">
        <EditableTerms
          sections={value.termsSections}
          onChange={(next) => patch({ termsSections: next })}
        />
      </Section>

      <div className="mt-6 pt-4 border-t border-rule text-center">
        <InlineInput
          value={value.footer}
          onChange={(v) => patch({ footer: v })}
          className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-muted text-center w-full"
          ariaLabel="Footer disclaimer"
        />
      </div>
    </div>
  );
}

// ── Helpers ──

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-brand-500 mb-2">
        {label}
      </div>
      {children}
    </div>
  );
}

function EditLabel({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-faint mb-1">
        {label}
      </div>
      {children}
    </div>
  );
}

function InlineInput({
  value,
  onChange,
  className = "",
  type = "text",
  placeholder,
  ariaLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  className?: string;
  type?: string;
  placeholder?: string;
  ariaLabel?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label={ariaLabel}
      inputMode={type === "number" ? "decimal" : undefined}
      step={type === "number" ? "0.01" : undefined}
      className={`edit-field ${className}`}
    />
  );
}

function InlineTextarea({
  value,
  onChange,
  className = "",
  ariaLabel,
  helper,
}: {
  value: string;
  onChange: (v: string) => void;
  className?: string;
  ariaLabel?: string;
  helper?: string;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  return (
    <div>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleInput}
        aria-label={ariaLabel}
        rows={1}
        className={`edit-field resize-none overflow-hidden w-full ${className}`}
        style={{
          minHeight: "1.5em",
          height: "auto",
        }}
      />
      {helper && (
        <div className="font-mono text-[9px] text-ink-faint mt-1 italic">
          {helper}
        </div>
      )}
    </div>
  );
}

function InlineDate({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.showPicker?.();
    }, 0);
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => setIsEditing(false)}
        className="edit-field font-display text-xl bg-transparent"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="edit-field font-display text-xl text-left"
      aria-label="Edit start date"
    >
      {formatDate(new Date(value).toISOString())}
    </button>
  );
}

function EditableServices({
  services,
  onChange,
}: {
  services: string[];
  onChange: (next: string[]) => void;
}) {
  const [newService, setNewService] = useState("");

  const updateAt = (i: number, next: string) => {
    const copy = [...services];
    copy[i] = next;
    onChange(copy);
  };

  const removeAt = (i: number) => {
    onChange(services.filter((_, idx) => idx !== i));
  };

  const addService = () => {
    const trimmed = newService.trim();
    if (!trimmed) return;
    onChange([...services, trimmed]);
    setNewService("");
  };

  return (
    <div>
      <ul className="space-y-2 mb-3">
        {services.map((s, i) => (
          <li key={i} className="flex items-start gap-3 group">
            <svg
              className="text-brand-500 mt-1.5 shrink-0"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <input
              type="text"
              value={s}
              onChange={(e) => updateAt(i, e.target.value)}
              className="edit-field flex-1 text-sm text-ink-soft"
              aria-label={`Service ${i + 1}`}
            />
            <button
              type="button"
              onClick={() => removeAt(i)}
              className="text-ink-faint hover:text-brand-500 text-xl leading-none opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity px-1"
              aria-label="Remove service"
            >
              ×
            </button>
          </li>
        ))}
        {services.length === 0 && (
          <li className="text-xs italic text-ink-muted">
            No services yet — add one below.
          </li>
        )}
      </ul>

      <div className="flex gap-2 items-center pl-6 pt-2 border-t border-rule">
        <input
          type="text"
          placeholder="Add a service…"
          value={newService}
          onChange={(e) => setNewService(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addService();
            }
          }}
          className="edit-field flex-1 text-sm text-ink-soft placeholder:text-ink-faint"
        />
        <button
          type="button"
          onClick={addService}
          disabled={!newService.trim()}
          className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-500 disabled:text-ink-faint px-2 py-1"
        >
          + Add
        </button>
      </div>
    </div>
  );
}

function EditableTerms({
  sections,
  onChange,
}: {
  sections: TermsSection[];
  onChange: (next: TermsSection[]) => void;
}) {
  const updateAt = (i: number, patch: Partial<TermsSection>) => {
    const copy = [...sections];
    copy[i] = { ...copy[i], ...patch };
    onChange(copy);
  };

  const removeAt = (i: number) => {
    onChange(sections.filter((_, idx) => idx !== i));
  };

  const addSection = () => {
    onChange([...sections, { label: "New Section", body: "" }]);
  };

  return (
    <div>
      <ul className="space-y-4">
        {sections.map((s, i) => (
          <li key={i} className="group">
            <div className="flex items-center gap-2 mb-1">
              <InlineInput
                value={s.label}
                onChange={(v) => updateAt(i, { label: v })}
                className="font-semibold text-ink-soft text-xs flex-1"
                ariaLabel={`Term ${i + 1} label`}
              />
              <button
                type="button"
                onClick={() => removeAt(i)}
                className="text-ink-faint hover:text-brand-500 text-lg leading-none opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity px-1"
                aria-label="Remove section"
              >
                ×
              </button>
            </div>
            <InlineTextarea
              value={s.body}
              onChange={(v) => updateAt(i, { body: v })}
              className="text-[11px] text-ink-muted leading-relaxed w-full"
              ariaLabel={`Term ${i + 1} body`}
            />
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={addSection}
        className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-500 hover:text-brand-400 transition-colors"
      >
        + Add Section
      </button>
    </div>
  );
}
