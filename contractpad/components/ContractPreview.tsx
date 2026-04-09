"use client";

import type { Contract } from "@/lib/types";
import {
  formatCurrency,
  formatDate,
  frequencyAdjective,
} from "@/lib/format";

interface ContractPreviewProps {
  contract: Contract;
  showSignatures?: boolean;
}

/**
 * Read-only rendering of a finalized contract using the stored editable
 * snapshots (title, partiesText, termsSections, footer).
 */
export default function ContractPreview({
  contract,
  showSignatures = false,
}: ContractPreviewProps) {
  const b = contract.businessSnapshot;
  const c = contract.customerSnapshot;

  return (
    <div className="card p-6 sm:p-8 bg-surface-grad">
      <div className="pb-4 mb-6 border-b border-rule-strong">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-500 mb-1">
          {contract.number}
        </div>
        <div className="font-display text-3xl sm:text-4xl text-ink leading-tight">
          {b.name}
        </div>
        <div className="text-xs text-ink-muted mt-2 font-mono">
          {b.address}, {b.city}, {b.state} {b.zip} · {b.phone}
        </div>
      </div>

      <div className="mb-6 text-center">
        <div className="font-display text-2xl italic text-ink-soft mb-2">
          {contract.tierName}
        </div>
        <h1 className="font-display text-xl sm:text-2xl text-ink italic leading-tight whitespace-pre-line">
          {contract.title}
        </h1>
      </div>

      <Section label="Parties">
        <p className="text-sm text-ink-soft leading-relaxed whitespace-pre-line">
          {contract.partiesText}
        </p>
      </Section>

      <Section label="Term & Start Date">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-muted mb-1">
              Start
            </div>
            <div className="text-ink font-display text-xl">
              {formatDate(contract.startDate)}
            </div>
          </div>
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-muted mb-1">
              Length
            </div>
            <div className="text-ink font-display text-xl">
              {contract.lengthMonths} months
            </div>
          </div>
        </div>
      </Section>

      <Section label="Price & Billing">
        <div className="rounded-xl p-5 border border-rule-strong bg-paper-raised text-center">
          <div className="font-display text-4xl text-ink">
            {formatCurrency(contract.price)}
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-500 mt-1">
            {frequencyAdjective(contract.frequency)}
          </div>
        </div>
      </Section>

      <Section label="Services Included">
        <ul className="space-y-2">
          {contract.includedServices.map((s, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-sm text-ink-soft"
            >
              <svg
                className="text-brand-500 mt-0.5 shrink-0"
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
              {s}
            </li>
          ))}
        </ul>
      </Section>

      <Section label="Terms & Conditions">
        <div className="text-[11px] text-ink-muted leading-relaxed space-y-3">
          {contract.termsSections.map((t, i) => (
            <p key={i}>
              <strong className="text-ink-soft">{t.label}.</strong>{" "}
              <span className="whitespace-pre-line">{t.body}</span>
            </p>
          ))}
        </div>
      </Section>

      {showSignatures && (
        <div className="mt-6 pt-6 border-t border-rule-strong grid grid-cols-1 sm:grid-cols-2 gap-6">
          <SignatureBlock
            label="Contractor"
            name={contract.techName || b.name}
            signaturePng={contract.techSignaturePng}
            signedAt={contract.techSignedAt}
          />
          <SignatureBlock
            label="Customer"
            name={c.name}
            signaturePng={contract.customerSignaturePng}
            signedAt={contract.customerSignedAt}
          />
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-rule text-center">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-muted">
          {contract.footer}
        </p>
      </div>
    </div>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-brand-500 mb-2">
        {label}
      </div>
      {children}
    </div>
  );
}

function SignatureBlock({
  label,
  name,
  signaturePng,
  signedAt,
}: {
  label: string;
  name: string;
  signaturePng: string | null;
  signedAt: string | null;
}) {
  return (
    <div>
      <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-brand-500 mb-2">
        {label}
      </div>
      <div className="h-20 bg-[#fafaf7] border border-rule-strong rounded-lg px-3 py-2 mb-2 flex items-end">
        {signaturePng && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={signaturePng}
            alt={`${label} signature`}
            className="h-full object-contain"
          />
        )}
      </div>
      <div className="text-xs text-ink font-semibold">{name}</div>
      {signedAt && (
        <div className="text-[10px] text-ink-muted font-mono">
          {formatDate(signedAt)}
        </div>
      )}
    </div>
  );
}
