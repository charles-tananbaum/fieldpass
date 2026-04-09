"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "./AppShell";

/**
 * Simple password gate for the /contractpad and /pricebook demo routes.
 * Password is "hvac" — stored in sessionStorage (per-tab), not persisted.
 */
const GATE_KEY = "fieldpass:gate";
const GATE_PASSWORD = "hvac";

interface PasswordGateProps {
  children: React.ReactNode;
  label?: string;
}

export default function PasswordGate({
  children,
  label = "Protected Demo",
}: PasswordGateProps) {
  // Render the gate form by default so the first paint always has content
  // (no flash of nothing). On mount we check sessionStorage and swap to
  // children if a session already exists.
  const [unlocked, setUnlocked] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [attempt, setAttempt] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = sessionStorage.getItem(GATE_KEY);
      if (stored === GATE_PASSWORD) setUnlocked(true);
    } catch {
      /* ignore */
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (attempt.trim().toLowerCase() === GATE_PASSWORD) {
      try {
        sessionStorage.setItem(GATE_KEY, GATE_PASSWORD);
      } catch {
        /* ignore */
      }
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setAttempt("");
    }
  };

  // Once mounted and unlocked (session exists), render the wrapped children.
  // Until then, always show the gate form — that way the static HTML at
  // build time renders the form (no empty flash on first paint).
  if (mounted && unlocked) return <>{children}</>;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto px-6 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-3 mb-12 animate-fade-up w-fit"
        >
          <Logo />
          <div>
            <div className="font-display text-2xl tracking-tight text-ink leading-none">
              FieldPass
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted mt-1">
              {label}
            </div>
          </div>
        </Link>

        <h1 className="section-title mb-3 animate-fade-up">
          Enter the
          <br />
          <span className="italic text-brand-500">access code.</span>
        </h1>
        <div className="thermal-divider mb-6 animate-fade-up" />
        <p className="text-ink-muted mb-8 animate-fade-up">
          This area is reserved for active pilots and partners.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 animate-fade-up">
          <div>
            <label htmlFor="gate-password" className="label">
              Access Code
            </label>
            <input
              id="gate-password"
              type="password"
              value={attempt}
              onChange={(e) => {
                setAttempt(e.target.value);
                if (error) setError(false);
              }}
              className="input"
              placeholder="••••"
              autoComplete="current-password"
              autoFocus
              required
            />
            {error && (
              <p className="mt-2 text-xs text-brand-500 font-mono uppercase tracking-[0.18em]">
                Incorrect — try again
              </p>
            )}
          </div>

          <button type="submit" className="btn-accent w-full mt-6">
            Unlock →
          </button>
        </form>

        <div className="mt-12 pt-6 border-t border-rule text-center">
          <Link
            href="/"
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted hover:text-ink transition-colors"
          >
            ← Back to FieldPass
          </Link>
        </div>
      </div>
    </div>
  );
}
