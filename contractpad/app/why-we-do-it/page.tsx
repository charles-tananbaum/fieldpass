"use client";

import OperatorLayout from "@/components/OperatorLayout";
import styles from "./why.module.css";

export default function OperatorWhyPage() {
  return (
    <OperatorLayout>
      <section className={styles.hero}>
        <div className={styles.eyebrow}>Why we do this</div>
        <h1 className={styles.heroTitle}>
          HVAC operators deserve <span className={styles.accent}>better.</span>
        </h1>
        <p className={styles.heroLede}>
          The trades keep the country running. Heat in winter. Cool in summer.
          Hot water every morning. The owners who run these shops work harder
          than anyone we know — and they get the worst software, the worst
          consultants, and the worst deals in the entire business world.
        </p>
        <p className={styles.heroLede}>
          We started FieldPass to change that.
        </p>
      </section>

      <section className={styles.beliefSection}>
        <div className={styles.beliefInner}>
          <div className={styles.beliefCol}>
            <h3>What we believe.</h3>
            <p>
              An HVAC owner shouldn&apos;t need a six-figure consultant to use
              their software. Implementations shouldn&apos;t take six months.
              Reports shouldn&apos;t require a degree. Migrations shouldn&apos;t
              lose your customers.
            </p>
            <p>
              Most of all: nobody should be locked into a platform that&apos;s
              not working for their business.
            </p>
          </div>
          <div className={styles.beliefCol}>
            <h3>How we work.</h3>
            <p>
              Direct. Plain-spoken. Skin in the game. We don&apos;t bill by
              the hour. We don&apos;t lock you into long contracts. We finish
              what we start, and we tell you the truth about whether we&apos;re
              the right people for the job.
            </p>
            <p>
              And if we ever say something you don&apos;t understand, call us
              out. We&apos;ll explain it in plain English.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.closing}>
        <p>
          We started FieldPass because HVAC operators deserve better tools,
          better service, and a better deal — without the six-figure price tag.
        </p>
      </section>
    </OperatorLayout>
  );
}
