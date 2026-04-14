"use client";

import Link from "next/link";
import SiteNav from "./SiteNav";

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col" style={{ position: "relative", zIndex: 2 }}>
      <SiteNav />
      <main className="flex-1 pt-[72px]">
        {children}
      </main>
      <footer className="border-t border-rule py-8 px-6 text-center">
        <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-ink-faint">
          <Link href="/" className="hover:text-ink-muted transition-colors">
            <strong className="text-ink-muted font-medium">FieldPass</strong>
          </Link>
          {" — "}Built for the trades that build everything else
        </p>
      </footer>
    </div>
  );
}
