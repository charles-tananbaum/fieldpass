"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { ensureSeeded, getCurrentTech, logoutTech } from "@/lib/storage";
import type { Tech } from "@/lib/types";

interface AppShellProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export default function AppShell({ children, requireAuth = true }: AppShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [tech, setTech] = useState<Tech | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    ensureSeeded();
    const current = getCurrentTech();
    setTech(current);
    setReady(true);
    if (requireAuth && !current) {
      router.replace("/contractpad/login");
    }
  }, [requireAuth, router]);

  if (!ready) return null;
  if (requireAuth && !tech) return null;

  const handleLogout = () => {
    logoutTech();
    router.replace("/contractpad/login");
  };

  const showNav = requireAuth && tech;

  return (
    <div className="min-h-screen flex flex-col">
      {showNav && (
        <header className="sticky top-0 z-40 bg-paper/85 backdrop-blur-md border-b border-rule">
          <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/contractpad/contracts" className="flex items-center gap-2">
              <Logo />
              <span className="font-display text-xl tracking-tight text-ink">
                ContractPad
              </span>
            </Link>
            <div className="flex items-center gap-1">
              <Link
                href="/"
                className="btn-ghost"
                aria-label="Back to FieldPass"
                title="Back to FieldPass"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </Link>
              <Link
                href="/pricebook"
                className="btn-ghost font-mono text-[10px] uppercase tracking-[0.14em]"
                title="Pricebook demo"
              >
                Pricebook
              </Link>
              <Link
                href="/contractpad/settings"
                className={`btn-ghost ${
                  pathname === "/contractpad/settings" ? "bg-rule/40" : ""
                }`}
                aria-label="Settings"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.01a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </Link>
              <button
                onClick={handleLogout}
                className="btn-ghost"
                aria-label="Log out"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </button>
            </div>
          </div>
        </header>
      )}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-6 pb-[max(1.5rem,var(--sab))]">
        {children}
      </main>
    </div>
  );
}

export function Logo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="30" height="30" rx="7" stroke="url(#logo-grad)" strokeWidth="1.5" fill="rgba(232, 114, 58, 0.05)" />
      <path d="M8 10h16M8 16h11M8 22h16" stroke="#e8723a" strokeWidth="2" strokeLinecap="round" />
      <circle cx="23" cy="16" r="1.6" fill="#f0ece4" />
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0%" stopColor="#e8723a" />
          <stop offset="100%" stopColor="#3a8ee8" />
        </linearGradient>
      </defs>
    </svg>
  );
}
