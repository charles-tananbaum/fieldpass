"use client";

import PageLayout from "@/components/PageLayout";
import { useScrollReveal, staggerDelay } from "@/hooks/useScrollReveal";
import styles from "./who-we-are.module.css";

const FOUNDERS = [
  {
    photo: "/founders/jack.png",
    name: "Jack",
    role: "Co-Founder · Strategy",
    bio: "Jack spent four years at KKR learning the HVAC space from the inside, investing directly in field management platforms and watching firsthand how operators struggle with fragmented software. That front-row seat to the industry's pain points is what drives FieldPass's strategy today.",
    hoverClass: styles.cardWarm,
    dividerClass: styles.cardDividerWarm,
  },
  {
    photo: "/founders/kunal.jpeg",
    name: "Kunal",
    role: "Co-Founder · Product",
    bio: "Kunal brings four years of product management and engineering experience at Yahoo, where he led their audience targeting platform. He's currently building product at Virtualitics, a venture-backed startup managing critical data infrastructure — and channels that same obsession with complex-made-simple into FieldPass's tools.",
    hoverClass: styles.cardCool,
    dividerClass: styles.cardDividerCool,
  },
  {
    photo: "/founders/charles.jpeg",
    name: "Charles",
    role: "Co-Founder · Operations",
    bio: "Charles worked as a venture capitalist at Accel, investing in cutting-edge AI and developer tools. He went on to lead strategy for Laravel after their $57M Series A, driving partnerships and growth. He brings that operator-meets-investor lens to FieldPass, making sure every product decision ties back to real business impact.",
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={f.photo}
              alt={f.name}
              className={styles.avatar}
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
          Built at <strong>Harvard Business School</strong> for local HVAC
          operators who deserve better tools, better service, and a better deal.
        </p>
      </section>
    </PageLayout>
  );
}
