"use client";

import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import { useScrollReveal, staggerDelay } from "@/hooks/useScrollReveal";
import styles from "./demos.module.css";

const DEMOS = [
  {
    href: "/contractpad",
    label: "Field Tool",
    labelClass: styles.cardLabelWarm,
    cardClass: styles.cardWarm,
    title: "ContractPad",
    description:
      "Generate fully-populated maintenance contracts on-site. Pick a plan, edit every field, capture signatures, and send a signed PDF — all from a tech's phone in under 3 minutes.",
    image: "https://images.pexels.com/photos/8961065/pexels-photo-8961065.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
    imageAlt: "Technician reviewing a document on a tablet",
  },
  {
    href: "/pricebook",
    label: "Data Intelligence",
    labelClass: styles.cardLabelCool,
    cardClass: styles.cardCool,
    title: "Pricebook",
    description:
      "Transform messy QuickBooks item lists into structured, category-tagged flat-rate pricebooks. Built from your own invoice history — not generic templates. Includes maintenance plan templates with tech scripts.",
    image: "https://images.pexels.com/photos/7681091/pexels-photo-7681091.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
    imageAlt: "Data analysis on a laptop screen",
  },
];

export default function DemosPage() {
  const card0 = useScrollReveal<HTMLAnchorElement>();
  const card1 = useScrollReveal<HTMLAnchorElement>();
  const cardRefs = [card0, card1];

  return (
    <PageLayout>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          See it <em>in action.</em>
        </h1>
        <div className="thermal-divider mx-auto mb-6" />
        <p className={styles.heroSub}>
          Interactive demos of FieldPass tools — built for HVAC operators who
          want to see what's possible before committing.
        </p>
      </section>

      <div className={styles.grid}>
        {DEMOS.map((demo, i) => (
          <Link
            key={demo.href}
            href={demo.href}
            ref={cardRefs[i].ref}
            className={`${styles.card} ${demo.cardClass} ${
              cardRefs[i].isVisible ? styles.visible : ""
            }`}
            style={staggerDelay(i)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={demo.image}
              alt={demo.imageAlt}
              className={styles.cardImage}
              loading="lazy"
            />
            <div className={styles.cardBody}>
              <div className={`${styles.cardLabel} ${demo.labelClass}`}>
                {demo.label}
              </div>
              <div className={styles.cardTitle}>{demo.title}</div>
              <p className={styles.cardDesc}>{demo.description}</p>
              <div className={styles.cardCta}>
                Launch Demo{" "}
                <span className={styles.cardArrow}>→</span>
              </div>
              <div className={styles.lock}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                Access code required
              </div>
            </div>
          </Link>
        ))}
      </div>
    </PageLayout>
  );
}
