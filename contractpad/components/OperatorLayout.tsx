"use client";

import { useEffect } from "react";
import OperatorNav from "./OperatorNav";
import styles from "./OperatorLayout.module.css";

export default function OperatorLayout({ children }: { children: React.ReactNode }) {
  // Override the global dark body bg + grid/noise overlays for operator pages
  useEffect(() => {
    document.documentElement.classList.add("operator-theme");
    document.body.classList.add("operator-theme");
    return () => {
      document.documentElement.classList.remove("operator-theme");
      document.body.classList.remove("operator-theme");
    };
  }, []);

  return (
    <div className={styles.shell}>
      <OperatorNav />
      <main>{children}</main>
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerLogo}>
            <span className={styles.footerLogoField}>Field</span>
            <span className={styles.footerLogoPass}>Pass</span>
          </div>
          <div className={styles.footerCols}>
            <div>
              <div className={styles.footerHeading}>Company</div>
              <a href="/who-we-are">Who we are</a>
              <a href="/why-we-do-it">Why we do this</a>
            </div>
            <div>
              <div className={styles.footerHeading}>Services</div>
              <a href="/what-we-do">What we do</a>
              <a href="/servicetitan">ServiceTitan migration</a>
            </div>
            <div>
              <div className={styles.footerHeading}>Get in touch</div>
              <a href="tel:+14157130070">(415) 713-0070</a>
              <a href="mailto:charles@fieldpass.pro">charles@fieldpass.pro</a>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <span>© 2026 FieldPass · Software for HVAC operators</span>
          <span>Boston, MA</span>
        </div>
      </footer>
    </div>
  );
}
