"use client";

import Link from "next/link";
import OperatorLayout from "@/components/OperatorLayout";
import styles from "./what.module.css";

const SERVICES = [
  {
    n: "1",
    title: "Custom Automations",
    desc: "If your team is doing the same thing over and over by hand, we can usually automate it. Invoice generation, dispatching workflows, pricebook lookups, recurring payments, parts ordering — we've built it all before.",
    bullets: ["Invoice automation", "Dispatch workflows", "Recurring payments", "Pricebook matching"],
  },
  {
    n: "2",
    title: "ServiceTitan Migrations",
    desc: "We move HVAC and plumbing shops from QuickBooks, Housecall Pro, or ServiceFusion onto ServiceTitan in 4–6 weeks. Fixed fee. Data intact. Team trained on-site.",
    bullets: ["5-day free audit first", "Fixed-fee migration quote", "On-site training", "30 days of post-launch support"],
    cta: { label: "See migration details →", href: "/servicetitan" },
    featured: true,
  },
  {
    n: "3",
    title: "Operations Audits",
    desc: "Whether you're on QuickBooks, Housecall Pro, ServiceTitan — or pen and paper — we audit your workflows end to end. We tell you what's costing you time and where the biggest wins are hiding.",
    bullets: ["End-to-end workflow review", "ROI mapping", "Software fit analysis", "Written action plan"],
  },
  {
    n: "4",
    title: "Software Training",
    desc: "Most operators only use 20% of what their software can do. We come in for a few days and teach your CSRs and techs the parts that actually matter — dispatching shortcuts, agreement management, reporting setup.",
    bullets: ["On-site or remote", "CSR + tech tracks", "Reporting & dashboards", "Workflow templates"],
  },
  {
    n: "5",
    title: "Website Rebuilds",
    desc: "Your website is your storefront. We rebuild it modern, mobile-first, and SEO-optimized so customers actually find you and book online. Most of our rebuilds pay for themselves in 3 months.",
    bullets: ["Modern design", "Mobile-first", "SEO optimized", "Online booking"],
  },
];

export default function OperatorWhatWeDoPage() {
  return (
    <OperatorLayout>
      <section className={styles.hero}>
        <div className={styles.eyebrow}>What we do</div>
        <h1 className={styles.heroTitle}>
          Five ways we make your shop <span className={styles.accent}>run better.</span>
        </h1>
        <p className={styles.heroSub}>
          From automating your back office to rebuilding your website — if it
          slows your shop down, we can help fix it.
        </p>
      </section>

      <section className={styles.servicesSection}>
        <div className={styles.servicesInner}>
          {SERVICES.map((s) => (
            <div
              key={s.n}
              className={`${styles.serviceRow} ${s.featured ? styles.serviceFeatured : ""}`}
            >
              <div className={styles.serviceLeft}>
                <div className={styles.serviceNum}>{s.n}</div>
                <h2 className={styles.serviceTitle}>{s.title}</h2>
                <p className={styles.serviceDesc}>{s.desc}</p>
                {s.cta && (
                  <Link href={s.cta.href} className={styles.serviceCta}>
                    {s.cta.label}
                  </Link>
                )}
              </div>
              <div className={styles.serviceRight}>
                <ul className={styles.serviceBullets}>
                  {s.bullets.map((b) => (
                    <li key={b}>
                      <span className={styles.checkmark}>✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>Not sure where to start?</h2>
          <p className={styles.ctaSub}>
            Call us. The first conversation is free, takes 20 minutes, and you
            walk away with at least one thing you can fix tomorrow.
          </p>
          <a href="tel:+14157130070" className={styles.ctaPrimary}>
            📞 Call (415) 713-0070
          </a>
        </div>
      </section>
    </OperatorLayout>
  );
}
