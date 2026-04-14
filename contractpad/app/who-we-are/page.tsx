"use client";

import PageLayout from "@/components/PageLayout";
import { useScrollReveal, staggerDelay } from "@/hooks/useScrollReveal";
import styles from "./who-we-are.module.css";

const FOUNDERS = [
  {
    initial: "J",
    name: "Jack",
    role: "Co-Founder · Strategy",
    bio: "Background in field services and PE-backed operator growth. Spent years watching HVAC companies struggle with the same software migration problems — and decided to fix it.",
    avatarClass: styles.avatarWarm,
    hoverClass: styles.cardWarm,
    dividerClass: styles.cardDividerWarm,
  },
  {
    initial: "K",
    name: "Kunal",
    role: "Co-Founder · Product",
    bio: "Engineer turned product builder. Obsessed with taking complex workflows and making them feel effortless. Believes every tech should be able to run their tools, not the other way around.",
    avatarClass: styles.avatarCool,
    hoverClass: styles.cardCool,
    dividerClass: styles.cardDividerCool,
  },
  {
    initial: "C",
    name: "Charles",
    role: "Co-Founder · Operations",
    bio: "Operator at heart. Has sat in the back office of a contractor and watched invoices get re-keyed three times. Built FieldPass to make that a thing of the past.",
    avatarClass: styles.avatarPurple,
    hoverClass: styles.cardPurple,
    dividerClass: styles.cardDividerPurple,
  },
];

export default function WhoWeArePage() {
  const card0 = useScrollReveal();
  const card1 = useScrollReveal();
  const card2 = useScrollReveal();
  const cardRefs = [card0, card1, card2];
  const banner = useScrollReveal();

  return (
    <PageLayout>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Who <em>we are.</em>
        </h1>
        <div className="thermal-divider mx-auto mb-6" />
        <p className={styles.heroSub}>
          Three builders from Harvard Business School, on a mission to
          modernize the trades that keep everything running.
        </p>
      </section>

      <div className={styles.founders}>
        {FOUNDERS.map((f, i) => (
          <div
            key={f.name}
            ref={cardRefs[i].ref}
            className={`${styles.card} ${f.hoverClass} ${
              cardRefs[i].isVisible ? styles.visible : ""
            }`}
            style={staggerDelay(i)}
          >
            <div className={`${styles.avatar} ${f.avatarClass}`}>
              {f.initial}
            </div>
            <div className={styles.name}>{f.name}</div>
            <div className={styles.role}>{f.role}</div>
            <p className={styles.bio}>{f.bio}</p>
            <div className={`${styles.cardDivider} ${f.dividerClass}`} />
          </div>
        ))}
      </div>

      <section className={styles.banner}>
        <p
          ref={banner.ref}
          className={`${styles.bannerText} ${banner.isVisible ? styles.visible : ""}`}
        >
          Built at <strong>Harvard Business School</strong> for local HVAC
          operators who deserve better tools, better service, and a better deal.
        </p>
      </section>
    </PageLayout>
  );
}
