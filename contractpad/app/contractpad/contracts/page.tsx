"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AppShell from "@/components/AppShell";
import { getContracts, getCurrentTech } from "@/lib/storage";
import { formatCurrency, formatShortDate, frequencyLabel } from "@/lib/format";
import type { Contract, Tech } from "@/lib/types";

export default function ContractsListPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [tech, setTech] = useState<Tech | null>(null);

  useEffect(() => {
    setContracts(getContracts());
    setTech(getCurrentTech());
  }, []);

  return (
    <AppShell>
      <div className="animate-fade-up">
        <div className="mb-8">
          <div className="font-mono text-[10px] uppercase tracking-widest text-ink-muted mb-2">
            {tech ? `Signed in — ${tech.name}` : ""}
          </div>
          <h1 className="section-title">
            Your contracts
          </h1>
          <p className="text-ink-muted mt-2">
            {contracts.length === 0
              ? "No contracts yet. Let's write your first one."
              : `${contracts.length} on file.`}
          </p>
        </div>

        <Link href="/contractpad/contracts/new" className="btn-accent w-full mb-8 text-lg">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New Contract
        </Link>

        {contracts.length > 0 && (
          <div className="space-y-3">
            {contracts.map((c) => (
              <Link
                key={c.id}
                href={`/contractpad/contracts/view?id=${c.id}`}
                className="card p-5 block active:scale-[0.99] transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-brand-600">
                        {c.number}
                      </span>
                      <StatusBadge status={c.status} />
                    </div>
                    <div className="font-display text-xl text-ink truncate">
                      {c.customerSnapshot.name}
                    </div>
                    <div className="text-sm text-ink-muted truncate">
                      {c.tierName} · {formatCurrency(c.price)} {frequencyLabel(c.frequency)}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                      {c.finalizedAt ? formatShortDate(c.finalizedAt) : "draft"}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}

function StatusBadge({ status }: { status: Contract["status"] }) {
  const config = {
    draft: { label: "Draft", className: "bg-rule text-ink-muted" },
    signed: { label: "Signed", className: "bg-cool-500/20 text-cool-500" },
    finalized: { label: "Finalized", className: "bg-brand-500/20 text-brand-500" },
  }[status];

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider ${config.className}`}
    >
      {config.label}
    </span>
  );
}
