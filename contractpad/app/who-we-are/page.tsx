"use client";

import OperatorLayout from "@/components/OperatorLayout";
import styles from "./who.module.css";

const FOUNDERS = [
  {
    photo: "/founders/jack.jpeg",
    name: "Jack",
    role: "Co-Founder · Strategy",
    bio: "Jack has spent the last four years working with HVAC technology businesses and vertical SaaS companies, engaging directly with contractor customers. He knows how shops actually run — the dispatching, the back office, the busy days, the bad ones — because he's spent his career listening to the people doing the work.",
  },
  {
    photo: "/founders/kunal.jpeg",
    name: "Kunal",
    role: "Co-Founder · Product",
    bio: "Kunal spent four years at Yahoo building large-scale products used by millions. He turns complicated technology into tools that operators can actually use on day one — which is exactly what FieldPass needs to deliver.",
  },
  {
    photo: "/founders/charles.jpeg",
    name: "Charles",
    role: "Co-Founder · Operations",
    bio: "Charles was a venture investor backing some of the leading AI companies of this generation before running strategic initiatives at a large developer tools company. At FieldPass he keeps the work honest: every engagement has to save real time and real money, or it doesn't ship.",
  },
];

export default function OperatorWhoWeArePage() {
  return (
    <OperatorLayout>
      <section className={styles.hero}>
        <div className={styles.eyebrow}>Who we are</div>
        <h1 className={styles.heroTitle}>
          Three guys. <span className={styles.accent}>One mission.</span>
        </h1>
        <p className={styles.heroSub}>
          We started FieldPass because HVAC operators deserve better tools,
          better service, and a better deal — without the six-figure price tag.
        </p>
      </section>

      <section className={styles.foundersSection}>
        <div className={styles.foundersInner}>
          {FOUNDERS.map((f) => (
            <div key={f.name} className={styles.founderCard}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.photo} alt={f.name} className={styles.avatar} />
              <h3 className={styles.name}>{f.name}</h3>
              <div className={styles.role}>{f.role}</div>
              <p className={styles.bio}>{f.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.statement}>
        <div className={styles.statementInner}>
          <h2 className={styles.statementTitle}>
            We&apos;re builders, not consultants.
          </h2>
          <p className={styles.statementText}>
            We don&apos;t write 100-page reports. We don&apos;t bill in 6-minute
            increments. We don&apos;t lock you into a five-year retainer. We
            show up, do the work, and either fix what&apos;s broken or move on.
          </p>
          <p className={styles.statementText}>
            Most of our customers are small to mid-sized HVAC and plumbing shops
            with 5–50 trucks. We work with them the way we&apos;d want to be
            worked with — directly, plainly, and with skin in the game.
          </p>
        </div>
      </section>
    </OperatorLayout>
  );
}
