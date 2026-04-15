"use client";

import PageLayout from "@/components/PageLayout";
import { useScrollReveal, staggerDelay } from "@/hooks/useScrollReveal";
import styles from "./who-we-are.module.css";

const FOUNDERS = [
  {
    photo: "/founders/jack.jpeg",
    name: "Jack",
    role: "Co-Founder · Strategy",
    bio: "Jack spent four years working with HVAC contractors and field service businesses, learning the real challenges operators face with scheduling, dispatching, and back-office software. That hands-on experience is what drives FieldPass today.",
    hoverClass: styles.cardWarm,
    dividerClass: styles.cardDividerWarm,
  },
  {
    photo: "/founders/kunal.jpeg",
    name: "Kunal",
    role: "Co-Founder · Product",
    bio: "Kunal spent four years building software products used by millions of people. He's spent his career making complicated technology simple and useful — and that's exactly what he does at FieldPass.",
    hoverClass: styles.cardCool,
    dividerClass: styles.cardDividerCool,
  },
  {
    photo: "/founders/charles.jpeg",
    name: "Charles",
    role: "Co-Founder · Operations",
    bio: "Charles spent years evaluating and working with software companies, figuring out what actually works and what's just hype. He helped grow one of the most popular software platforms in the world, leading partnerships and business development. At FieldPass, he makes sure everything we build actually saves you time and money — no fluff.",
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
          Three guys who met in school and decided to fix the way HVAC
          businesses run their software.
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={f.photo}
              alt={f.name}
              className={styles.avatar}
              width={240}
              height={240}
              loading="lazy"
            />
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
          We started FieldPass because HVAC operators deserve better tools,
          better service, and a better deal — without the six-figure price tag.
        </p>
      </section>
    </PageLayout>
  );
}
