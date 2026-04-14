"use client";

import PageLayout from "@/components/PageLayout";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./what-we-do.module.css";

interface ServiceSection {
  number: string;
  title: React.ReactNode;
  desc: string;
  image: string;
  imageAlt: string;
  badgeLabel: string;
  badgeClass: string;
  accentClass: string;
  pills: string[];
  reversed?: boolean;
}

const SECTIONS: ServiceSection[] = [
  {
    number: "01",
    title: <>Bespoke <em>Automations</em></>,
    desc: "We build custom automations for HVAC operators — invoice generation, booking workflows, pricebook matching, dispatch optimization, and recurring payment management. If your team is doing it manually and repeatedly, we can make it happen automatically.",
    image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    imageAlt: "Automation workflow on screen",
    badgeLabel: "Automations",
    badgeClass: styles.badgeWarm,
    accentClass: styles.accentWarm,
    pills: ["Invoice Automation", "Booking Platforms", "Pricebook Matching", "Dispatch Optimization", "Payment Workflows"],
  },
  {
    number: "02",
    title: <>Operational <em>Auditing</em></>,
    desc: "Whether you're on QuickBooks, Housecall Pro, ServiceTitan, or still using pen and paper — we audit your workflows end to end. We find what's costing you time, what's falling through the cracks, and where automation or better tooling can make the biggest difference.",
    image: "https://images.pexels.com/photos/7681091/pexels-photo-7681091.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    imageAlt: "Data analysis on laptop",
    badgeLabel: "Auditing",
    badgeClass: styles.badgeCool,
    accentClass: styles.accentCool,
    pills: ["QuickBooks", "Housecall Pro", "ServiceTitan", "Process Analysis", "ROI Mapping"],
    reversed: true,
  },
  {
    number: "03",
    title: <>Platform <em>Implementation</em></>,
    desc: "Migrating from legacy systems is painful — data loss, retraining, months of downtime. We handle the migration so you don't have to. Your data moves cleanly, your techs learn the new system in days not months, and your business doesn't skip a beat.",
    image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    imageAlt: "Team collaboration on software implementation",
    badgeLabel: "Implementation",
    badgeClass: styles.badgePurple,
    accentClass: styles.accentPurple,
    pills: ["Data Migration", "Zero Downtime", "Tech Training", "Legacy → Modern", "Pricebook Setup"],
  },
  {
    number: "04",
    title: <>Education & <em>Training</em></>,
    desc: "Most operators only use 20% of their software's capabilities. We teach you the features that actually matter for your business — dispatching shortcuts, reporting tricks, agreement management — so your team gets more done with tools they already have.",
    image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    imageAlt: "Team training session",
    badgeLabel: "Education",
    badgeClass: styles.badgeGreen,
    accentClass: styles.accentGreen,
    pills: ["Platform Mastery", "Technician Onboarding", "Reporting Setup", "Workflow Templates"],
    reversed: true,
  },
  {
    number: "05",
    title: <>Site <em>Redesign</em></>,
    desc: "Your website is your storefront. We rebuild it with a modern look that converts visitors into booked calls, improves your Google ranking, and makes your business look as professional online as it is in person. Mobile-first, fast-loading, and SEO-optimized.",
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    imageAlt: "Modern website design on laptop",
    badgeLabel: "Web Design",
    badgeClass: styles.badgeWarm,
    accentClass: styles.accentMixed,
    pills: ["Modern Design", "SEO Optimization", "Mobile-First", "Conversion Rate", "Google Ranking"],
  },
];

export default function WhatWeDoPage() {
  return (
    <PageLayout>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          What we <em>do.</em>
        </h1>
        <div className="thermal-divider mx-auto mb-6" />
        <p className={styles.heroSub}>
          Five ways we help HVAC operators modernize — from automating their
          back office to rebuilding their web presence.
        </p>
      </section>

      {SECTIONS.map((s, i) => (
        <ServiceBlock key={s.number} section={s} isLast={i === SECTIONS.length - 1} />
      ))}
    </PageLayout>
  );
}

function ServiceBlock({
  section: s,
  isLast,
}: {
  section: ServiceSection;
  isLast: boolean;
}) {
  const reveal = useScrollReveal({ threshold: 0.15 });

  return (
    <>
      <div
        ref={reveal.ref}
        className={`${styles.section} ${s.reversed ? styles.sectionReversed : ""} ${
          reveal.isVisible ? styles.visible : ""
        }`}
      >
        <div className={styles.imageWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.image} alt={s.imageAlt} loading="lazy" />
          <div className={`${styles.imageBadge} ${s.badgeClass}`}>
            {s.badgeLabel}
          </div>
        </div>
        <div className={`${styles.content} ${styles.accentBorder} ${s.accentClass}`}>
          <div className={styles.number}>{s.number}</div>
          <h2 className={styles.title}>{s.title}</h2>
          <p className={styles.desc}>{s.desc}</p>
          <div className={styles.pills}>
            {s.pills.map((p) => (
              <span key={p} className={styles.pill}>
                <span className={styles.pillDot} />
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
      {!isLast && (
        <div className={styles.sectionDivider}>
          <div className={styles.sectionDividerLine} />
        </div>
      )}
    </>
  );
}
