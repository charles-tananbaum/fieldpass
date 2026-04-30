"use client";

import OperatorLayout from "@/components/OperatorLayout";
import styles from "./servicetitan.module.css";

const STEPS = [
  {
    n: "1",
    title: "Free 5-day audit",
    body: "We come look at how your shop runs today — your customer list, your pricebook, your dispatch, your billing. You get a written plan whether you hire us or not.",
  },
  {
    n: "2",
    title: "Move your data — 2 to 3 weeks",
    body: "Customers, equipment history, agreements, AR — all moved over cleanly. We test against your real data before cutover. Nothing gets lost.",
  },
  {
    n: "3",
    title: "Set it up + train your team — 1 week",
    body: "We configure ServiceTitan for the way YOU run your business. Then we're in the office for a week training your CSRs and techs face-to-face.",
  },
  {
    n: "4",
    title: "Go live + 30 days on call",
    body: "We're in the shop the morning of cutover. Daily check-ins the first week. On-call for a full month after to fix anything that comes up.",
  },
];

const COMMITMENTS = [
  {
    icon: "🤝",
    title: "Fixed-fee — always",
    body: "You get a written quote before we start, and that's what you pay. No hourly billing. No scope creep. No surprise change orders the week before cutover.",
  },
  {
    icon: "📅",
    title: "On the calendar — and on time",
    body: "Your migration date is set at kickoff. We hit it. If for some reason we can't, you don't pay for the overrun — we eat it. Skin in the game.",
  },
  {
    icon: "🛠️",
    title: "We do the work — not contractors",
    body: "Same team end to end. The person who scopes your migration is the same person sitting with your dispatcher on cutover morning. No offshoring. No handoffs.",
  },
];

const FAQS = [
  {
    q: "How long will my shop be running two systems at once?",
    a: "About a week — sometimes less. We don't believe in long parallel-running periods. They confuse your CSRs and your techs hate it. We pick a cutover date, prep for it, and switch.",
  },
  {
    q: "What about my QuickBooks data?",
    a: "Most of the operators we work with come off QuickBooks. We handle the GL setup in ServiceTitan, the AR migration, and the day-to-day accounting workflow so your bookkeeper isn't lost.",
  },
  {
    q: "Will my old customer history come over?",
    a: "Yes — every job, every invoice, every piece of equipment. The audit tells us exactly what's salvageable and what needs cleanup before we move it.",
  },
  {
    q: "Are you a ServiceTitan partner?",
    a: "We work directly with ServiceTitan's team and their account executives. We're not consultants who poked around the platform — we've done this before.",
  },
  {
    q: "What if we're already stuck mid-implementation?",
    a: "Call us. We do rescue engagements all the time. Most stuck implementations can be back on track in 2–3 weeks once someone with experience takes over.",
  },
];

export default function OperatorServiceTitanPage() {
  return (
    <OperatorLayout>
      <div className={styles.page}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroLeft}>
            <div className={styles.eyebrow}>ServiceTitan Migration Specialists</div>
            <h1 className={styles.heroTitle}>
              Switch your shop to ServiceTitan <span className={styles.accent}>in six weeks.</span> Without losing your data — or your mind.
            </h1>
            <p className={styles.heroSub}>
              We move HVAC and plumbing operators from QuickBooks, Housecall Pro,
              and ServiceFusion onto ServiceTitan — fixed fee, on time, with the
              data intact and your team trained face-to-face.
            </p>
            <div className={styles.heroCtas}>
              <a href="#contact" className={styles.ctaPrimary}>
                Book a free audit
              </a>
              <a href="tel:+14157130070" className={styles.ctaSecondary}>
                Or call (415) 713-0070
              </a>
            </div>
            <div className={styles.heroProof}>
              <div className={styles.proofItem}>
                <strong>4–6 weeks</strong>
                <span>vs industry 3–6 months</span>
              </div>
              <div className={styles.proofDivider} />
              <div className={styles.proofItem}>
                <strong>Fixed</strong>
                <span>fee · written upfront</span>
              </div>
              <div className={styles.proofDivider} />
              <div className={styles.proofItem}>
                <strong>100%</strong>
                <span>data integrity guaranteed</span>
              </div>
            </div>
          </div>
          <div className={styles.heroRight}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.pexels.com/photos/8961065/pexels-photo-8961065.jpeg?auto=compress&cs=tinysrgb&w=900&h=1100&fit=crop"
              alt="HVAC technician on the job"
              className={styles.heroImg}
            />
            <div className={styles.heroBadge}>
              <div className={styles.heroBadgeNumber}>6 wk</div>
              <div className={styles.heroBadgeLabel}>average migration</div>
            </div>
          </div>
        </section>

        {/* Platform compatibility strip */}
        <section className={styles.trustStrip}>
          <div className={styles.trustText}>We migrate from any of these onto ServiceTitan</div>
          <div className={styles.trustLogos}>
            <div className={styles.trustLogo}>HOUSECALL PRO</div>
            <div className={styles.trustLogo}>QUICKBOOKS</div>
            <div className={styles.trustLogo}>SERVICEFUSION</div>
            <div className={styles.trustLogo}>FIELDEDGE</div>
            <div className={styles.trustLogo}>JOBBER</div>
          </div>
        </section>

        {/* Pitch */}
        <section className={styles.pitch}>
          <div className={styles.pitchInner}>
            <h2 className={styles.h2}>Most ServiceTitan migrations are a disaster.</h2>
            <p className={styles.lede}>
              We hear the same three stories from every operator we talk to:
            </p>
            <div className={styles.pitchGrid}>
              <div className={styles.pitchCard}>
                <div className={styles.pitchIcon}>⚠️</div>
                <h3>Data got lost</h3>
                <p>Customers missing. Equipment history gone. Months of cleanup after go-live, and revenue stuck in old invoices nobody can find.</p>
              </div>
              <div className={styles.pitchCard}>
                <div className={styles.pitchIcon}>👷</div>
                <h3>The techs won&apos;t use it</h3>
                <p>Two hours of training, and now the new $200K platform is a glorified scheduler because nobody actually adopted the agreements module.</p>
              </div>
              <div className={styles.pitchCard}>
                <div className={styles.pitchIcon}>📅</div>
                <h3>It dragged for months</h3>
                <p>What was sold as a 90-day implementation turned into nine months of partial rollouts, blown budgets, and a team running two systems at once.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className={styles.howSection}>
          <div className={styles.howInner}>
            <h2 className={styles.h2}>How it works.</h2>
            <p className={styles.lede}>Same process every shop. Documented. On a calendar.</p>
            <div className={styles.steps}>
              {STEPS.map((s) => (
                <div key={s.n} className={styles.stepRow}>
                  <div className={styles.stepNum}>{s.n}</div>
                  <div className={styles.stepBody}>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.howCallout}>
              <div>
                <strong>Total: 4–6 weeks from kickoff to cutover.</strong>
                <span>Industry standard: 3–6 months.</span>
              </div>
              <a href="#contact" className={styles.ctaPrimary}>
                Get my free audit
              </a>
            </div>
          </div>
        </section>

        {/* Our commitments */}
        <section id="proof" className={styles.proofSection}>
          <div className={styles.proofInner}>
            <h2 className={styles.h2}>Three commitments we make to every operator.</h2>
            <p className={styles.lede}>
              We can&apos;t put a customer logo on this page yet — we&apos;re early.
              What we can do is tell you exactly what we promise, and stand behind it.
            </p>
            <div className={styles.commitmentsGrid}>
              {COMMITMENTS.map((c) => (
                <div key={c.title} className={styles.commitment}>
                  <div className={styles.commitmentIcon}>{c.icon}</div>
                  <h3 className={styles.commitmentTitle}>{c.title}</h3>
                  <p className={styles.commitmentBody}>{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What it costs */}
        <section className={styles.costSection}>
          <div className={styles.costInner}>
            <div className={styles.costLeft}>
              <div className={styles.eyebrow}>What it costs</div>
              <h2 className={styles.h2}>The audit is free. The migration is fixed-fee.</h2>
              <p className={styles.lede}>
                We&apos;ll tell you exactly what your migration will cost <em>before</em> you commit to it.
                No hourly billing. No scope creep. No surprises.
              </p>
              <ul className={styles.costList}>
                <li>✓ Free 5-day audit — written plan whether you hire us or not</li>
                <li>✓ Fixed-fee migration quote based on your actual shop</li>
                <li>✓ All work done by FieldPass — no offshoring, no contractors</li>
                <li>✓ One point of contact from kickoff through cutover</li>
              </ul>
              <a href="#contact" className={styles.ctaPrimary}>
                Book my free audit
              </a>
            </div>
            <div className={styles.costRight}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=700&h=800&fit=crop"
                alt="Team meeting"
                className={styles.costImg}
              />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className={styles.faqSection}>
          <div className={styles.faqInner}>
            <h2 className={styles.h2}>Frequently asked questions.</h2>
            <div className={styles.faqList}>
              {FAQS.map((f) => (
                <details key={f.q} className={styles.faqItem}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section id="contact" className={styles.finalCta}>
          <div className={styles.finalCtaInner}>
            <h2 className={styles.finalCtaTitle}>Ready to talk?</h2>
            <p className={styles.finalCtaSub}>
              Two ways to start. The audit is free either way.
            </p>
            <div className={styles.finalCtaGrid}>
              <a href="tel:+14157130070" className={styles.finalCtaCard}>
                <div className={styles.finalCtaIcon}>📞</div>
                <div className={styles.finalCtaCardTitle}>Call us</div>
                <div className={styles.finalCtaCardValue}>(415) 713-0070</div>
                <div className={styles.finalCtaCardSub}>Mon–Fri, 8am–6pm ET</div>
              </a>
              <a href="mailto:charles@fieldpass.pro?subject=ServiceTitan%20Audit" className={styles.finalCtaCard}>
                <div className={styles.finalCtaIcon}>✉️</div>
                <div className={styles.finalCtaCardTitle}>Email us</div>
                <div className={styles.finalCtaCardValue}>charles@fieldpass.pro</div>
                <div className={styles.finalCtaCardSub}>We reply within 24 hours</div>
              </a>
            </div>
          </div>
        </section>
      </div>
    </OperatorLayout>
  );
}
