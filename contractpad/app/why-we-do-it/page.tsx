"use client";

import PageLayout from "@/components/PageLayout";
import { useScrollReveal, staggerDelay } from "@/hooks/useScrollReveal";
import styles from "./why-we-do-it.module.css";

const STATS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: "Time Reclaimed",
    desc: "Hours wasted in clunky software are hours not spent growing the business. We give them back.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    title: "Money Saved",
    desc: "The companies that set up your software charge $60k+ for work that should cost a fraction. We fix that.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    title: "Headaches Eliminated",
    desc: "No more relearning, no more data loss, no more 6-month onboarding. Just software that works for you.",
  },
];

export default function WhyWeDoItPage() {
  const stat0 = useScrollReveal();
  const stat1 = useScrollReveal();
  const stat2 = useScrollReveal();
  const statRefs = [stat0, stat1, stat2];
  const closing = useScrollReveal();

  return (
    <PageLayout>
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={styles.label}>Our Mission</div>
        <p className={styles.statement}>
          HVAC operators and techs spend <em>too much time</em> stuck in
          software when they should be out running jobs and taking care of
          customers. The companies that set up this software charge{" "}
          <em>too much money</em> to give operators the return they deserve.{" "}
          <strong>FieldPass</strong> sits down with operators to figure out
          where better tools can save them time, money, and headaches — then
          we teach them how to use it, and set it up ourselves.
        </p>
        <div className="thermal-divider mx-auto mt-10" />
      </section>

      <div className={styles.stats}>
        {STATS.map((stat, i) => (
          <div
            key={i}
            ref={statRefs[i].ref}
            className={`${styles.stat} ${statRefs[i].isVisible ? styles.visible : ""}`}
            style={staggerDelay(i)}
          >
            <div className={styles.statIcon}>{stat.icon}</div>
            <div className={styles.statTitle}>{stat.title}</div>
            <p className={styles.statDesc}>{stat.desc}</p>
          </div>
        ))}
      </div>

      <section className={styles.closing}>
        <p
          ref={closing.ref}
          className={`${styles.closingText} ${closing.isVisible ? styles.visible : ""}`}
        >
          We don't just sell software — we sit down with operators, learn their
          workflows, and build around them. The result is a business that runs
          smoother, grows faster, and lets <strong>you</strong> focus on
          running jobs and growing your book.
        </p>
      </section>
    </PageLayout>
  );
}
