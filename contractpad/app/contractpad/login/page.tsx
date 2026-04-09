"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ensureSeeded, getCurrentTech, loginTech } from "@/lib/storage";
import { DEFAULT_TECH } from "@/lib/seed";
import { Logo } from "@/components/AppShell";

export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState(DEFAULT_TECH.name);
  const [email, setEmail] = useState(DEFAULT_TECH.email);

  useEffect(() => {
    ensureSeeded();
    if (getCurrentTech()) router.replace("/contractpad/contracts");
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    loginTech(name, email);
    router.replace("/contractpad/contracts");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto px-6 py-12">
        <div className="flex items-center gap-3 mb-12 animate-fade-up">
          <Logo />
          <div>
            <div className="font-display text-2xl tracking-tight text-ink leading-none">
              ContractPad
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted mt-1">
              On-site contracts · 3 minutes
            </div>
          </div>
        </div>

        <h1 className="section-title mb-3 animate-fade-up">
          Sign in to your
          <br />
          <span className="italic text-brand-500">field kit.</span>
        </h1>
        <div className="thermal-divider mb-6 animate-fade-up" />
        <p className="text-ink-muted mb-8 animate-fade-up">
          Demo mode — any name and email will work.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 animate-fade-up">
          <div>
            <label htmlFor="name" className="label">Your Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              autoComplete="name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="label">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              autoComplete="email"
              required
            />
          </div>

          <button type="submit" className="btn-accent w-full mt-6">
            Enter ContractPad →
          </button>
        </form>

        <div className="mt-12 pt-6 border-t border-rule text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
            A <span className="text-brand-500">FieldPass</span> micro-product
          </div>
        </div>
      </div>
    </div>
  );
}
