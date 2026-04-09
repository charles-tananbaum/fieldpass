"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ensureSeeded, getCurrentTech } from "@/lib/storage";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    ensureSeeded();
    const tech = getCurrentTech();
    router.replace(tech ? "/contractpad/contracts" : "/contractpad/login");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-ink-muted font-mono text-xs uppercase tracking-widest">
        Loading ContractPad…
      </div>
    </div>
  );
}
