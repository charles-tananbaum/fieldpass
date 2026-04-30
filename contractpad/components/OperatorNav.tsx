"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./OperatorNav.module.css";

const NAV_LINKS = [
  { href: "/who-we-are", label: "Who We Are" },
  { href: "/what-we-do", label: "What We Do" },
  { href: "/servicetitan", label: "ServiceTitan" },
  { href: "/why-we-do-it", label: "Why" },
  { href: "/demos", label: "Demos" },
];

export default function OperatorNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className={styles.bar}>
        <Link href="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
          <span className={styles.logoField}>Field</span>
          <span className={styles.logoPass}>Pass</span>
        </Link>

        <nav className={styles.nav}>
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`${styles.navLink} ${pathname === l.href ? styles.navLinkActive : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <a href="mailto:charles@fieldpass.pro?subject=FieldPass%20Inquiry" className={styles.phoneBtn}>
          <span className={styles.phoneIcon}>✉️</span>
          Get in touch
        </a>

        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span /><span /><span />
        </button>
      </header>

      {menuOpen && (
        <div className={styles.mobileOverlay}>
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <a href="mailto:charles@fieldpass.pro?subject=FieldPass%20Inquiry" className={styles.mobilePhone}>
            ✉️ Get in touch
          </a>
        </div>
      )}
    </>
  );
}
