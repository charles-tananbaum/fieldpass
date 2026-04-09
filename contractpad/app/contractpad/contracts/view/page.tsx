"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import AppShell from "@/components/AppShell";
import ContractPreview from "@/components/ContractPreview";
import { findContract } from "@/lib/storage";
import { downloadContractPdf, openMailto } from "@/lib/pdf";
import type { Contract } from "@/lib/types";

export default function ContractDetailPage() {
  return (
    <Suspense
      fallback={
        <AppShell>
          <div className="text-ink-muted">Loading…</div>
        </AppShell>
      }
    >
      <ContractDetailInner />
    </Suspense>
  );
}

function ContractDetailInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";
  const justFinalized = searchParams.get("justFinalized") === "1";
  const [contract, setContract] = useState<Contract | null>(null);
  const [showCelebration, setShowCelebration] = useState(justFinalized);
  const [syncState, setSyncState] = useState<"idle" | "syncing" | "synced">(
    "idle"
  );

  useEffect(() => {
    if (!id) {
      router.replace("/contractpad/contracts");
      return;
    }
    const found = findContract(id);
    if (!found) {
      router.replace("/contractpad/contracts");
      return;
    }
    setContract(found);
  }, [id, router]);

  useEffect(() => {
    if (showCelebration) {
      const t = setTimeout(() => setShowCelebration(false), 2400);
      return () => clearTimeout(t);
    }
  }, [showCelebration]);

  if (!contract) {
    return (
      <AppShell>
        <div className="text-ink-muted">Loading…</div>
      </AppShell>
    );
  }

  const handleDownload = () => downloadContractPdf(contract);
  const handleEmail = () => openMailto(contract);
  const handleMockSync = () => {
    setSyncState("syncing");
    setTimeout(() => setSyncState("synced"), 1200);
  };

  return (
    <AppShell>
      {showCelebration && <CelebrationOverlay />}

      <div className="mb-6 animate-fade-up">
        <div className="font-mono text-[10px] uppercase tracking-widest text-brand-600 mb-1">
          {contract.number} ·{" "}
          <span
            className={
              contract.finalizedAt ? "text-brand-600" : "text-ink-muted"
            }
          >
            {contract.status}
          </span>
        </div>
        <h1 className="section-title">{contract.customerSnapshot.name}</h1>
        <p className="text-ink-muted">
          {contract.tierName} — ${contract.price.toFixed(2)}{" "}
          {contract.frequency}
        </p>
      </div>

      {contract.status === "finalized" && (
        <div className="card p-5 mb-6 animate-fade-up relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-transparent to-transparent pointer-events-none" />
          <div className="font-display text-xl text-ink mb-3">
            Contract signed. What's next?
          </div>
          <div className="space-y-2">
            <button onClick={handleDownload} className="btn-primary w-full">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download PDF
            </button>
            <button onClick={handleEmail} className="btn-secondary w-full">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Email to Customer
            </button>
            <button
              onClick={handleMockSync}
              disabled={syncState !== "idle"}
              className="btn-secondary w-full"
            >
              {syncState === "idle" && (
                <>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="23 4 23 10 17 10" />
                    <polyline points="1 20 1 14 7 14" />
                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                  </svg>
                  Sync to Housecall Pro
                </>
              )}
              {syncState === "syncing" && (
                <>
                  <svg
                    className="animate-spin"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="2" x2="12" y2="6" />
                    <line x1="12" y1="18" x2="12" y2="22" />
                    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
                    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
                    <line x1="2" y1="12" x2="6" y2="12" />
                    <line x1="18" y1="12" x2="22" y2="12" />
                    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
                    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
                  </svg>
                  Syncing…
                </>
              )}
              {syncState === "synced" && (
                <>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4ade80"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-[#4ade80]">Synced (mock)</span>
                </>
              )}
            </button>
            <p className="text-[10px] text-ink-muted text-center mt-2 font-mono uppercase tracking-wider">
              HCP integration is mocked in v1
            </p>
          </div>
        </div>
      )}

      <ContractPreview contract={contract} showSignatures />

      <Link
        href="/contractpad/contracts"
        className="btn-ghost w-full mt-6 justify-center"
      >
        ← Back to contracts
      </Link>
    </AppShell>
  );
}

function CelebrationOverlay() {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center bg-paper/90 backdrop-blur-md animate-fade-in">
      <div className="text-center animate-fade-up">
        <div className="w-20 h-20 rounded-full bg-brand-500 text-white mx-auto mb-4 flex items-center justify-center shadow-card-lg">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div className="font-display text-3xl text-ink mb-1">
          Contract signed.
        </div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-brand-600">
          Nice work out there
        </div>
      </div>
    </div>
  );
}
