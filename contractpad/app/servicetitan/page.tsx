"use client";

import PageLayout from "@/components/PageLayout";
import { useScrollReveal, staggerDelay } from "@/hooks/useScrollReveal";
import styles from "./servicetitan.module.css";

const PAINS = [
  {
    title: "Botched data migrations",
    desc: "Customer records, agreements, and pricebook items lost in the move from QuickBooks or Housecall Pro. Months of cleanup after go-live.",
  },
  {
    title: "Techs who refuse to use it",
    desc: "Teams trained for two hours and abandoned. Your $200K platform becomes a glorified scheduler because nobody adopted the agreements module.",
  },
  {
    title: "Go-lives that drag for months",
    desc: "What was sold as a 90-day implementation turns into 9 months of partial rollouts, blown budgets, and lost revenue while your team works in two systems at once.",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Readiness Audit",
    desc: "Two-week deep dive into your current platform, data, and workflows. We map exactly what moves cleanly, what needs cleanup, and what gets rebuilt — before a single dollar is spent on migration.",
    deliverable: "Migration plan + risk register + fixed-fee proposal",
  },
  {
    number: "02",
    title: "Data Migration",
    desc: "Customer history, equipment records, agreements, pricebook items, and accounts receivable migrated cleanly. We test against your live data, not a sandbox demo. No surprises on cutover day.",
    deliverable: "Validated data in ServiceTitan, signed off field-by-field",
  },
  {
    number: "03",
    title: "Configuration & Training",
    desc: "Dispatch boards, payroll, agreements, financing, and reporting configured for how your business actually runs — not the textbook setup. Two weeks of on-site tech and CSR training before you go live.",
    deliverable: "Production-ready ST instance + trained team",
  },
  {
    number: "04",
    title: "Go-Live + 90 Days of Support",
    desc: "We're on-site the week of cutover and on-call for 90 days after. Weekly office hours, real-time issue triage, and reporting tune-ups so you're not flying blind in your first quarter.",
    deliverable: "Smooth cutover + first-quarter operating discipline",
  },
];

const TIERS = [
  {
    name: "Readiness Audit",
    price: "$7,500",
    cadence: "two-week engagement",
    accentClass: styles.tierWarm,
    description: "Before you sign with ServiceTitan — or if you're stuck mid-implementation — we audit your data, workflows, and team readiness.",
    features: [
      "Full platform & data audit",
      "Migration risk register",
      "Tech adoption gap analysis",
      "Fixed-fee migration proposal",
      "Credited toward migration if you proceed",
    ],
    cta: "Book the audit",
    highlight: false,
  },
  {
    name: "Standard Migration",
    price: "$65,000",
    cadence: "90-day fixed-fee",
    accentClass: styles.tierCool,
    description: "Single-location operators migrating from QuickBooks, Housecall Pro, or another field service platform.",
    features: [
      "Up to 10,000 customer records",
      "Pricebook + agreements migration",
      "Dispatch & payroll configuration",
      "Two weeks on-site training",
      "90 days of post-launch support",
    ],
    cta: "Talk to us",
    highlight: true,
  },
  {
    name: "Enterprise Migration",
    price: "$125,000+",
    cadence: "4–6 month engagement",
    accentClass: styles.tierPurple,
    description: "Multi-location operators with custom integrations, financing partners, and complex reporting requirements.",
    features: [
      "Multi-location rollout",
      "Custom integrations (Wisetack, GoodLeap, parts)",
      "Advanced reporting & dashboards",
      "Tiered training (techs, CSRs, leadership)",
      "Dedicated project manager",
    ],
    cta: "Scope the project",
    highlight: false,
  },
];

const FAQS = [
  {
    q: "Are you a certified ServiceTitan partner?",
    a: "We're an active ServiceTitan Implementation Partner. That means we work directly with ST's partner team and account executives — not just consultants who've poked around the platform.",
  },
  {
    q: "How is this different from ServiceTitan Pro Services?",
    a: "ST's in-house team is excellent but heavily booked. We work alongside their AEs as overflow capacity, often on a faster timeline, and we specialize in the migration and adoption side — not just the configuration.",
  },
  {
    q: "What if we're already mid-implementation and stuck?",
    a: "We do rescue engagements. Start with the Readiness Audit so we can scope what's salvageable and what needs to be redone. Most stuck implementations can be back on track in 30 days.",
  },
  {
    q: "Do you handle the QuickBooks side too?",
    a: "Yes. Most operators we work with are coming off QuickBooks Desktop or Online. We handle the GL mapping, AR migration, and ongoing financial close workflow.",
  },
];

export default function ServiceTitanPage() {
  const card0 = useScrollReveal();
  const card1 = useScrollReveal();
  const card2 = useScrollReveal();
  const painRefs = [card0, card1, card2];

  const step0 = useScrollReveal();
  const step1 = useScrollReveal();
  const step2 = useScrollReveal();
  const step3 = useScrollReveal();
  const stepRefs = [step0, step1, step2, step3];

  const tier0 = useScrollReveal();
  const tier1 = useScrollReveal();
  const tier2 = useScrollReveal();
  const tierRefs = [tier0, tier1, tier2];

  const faq0 = useScrollReveal();
  const faq1 = useScrollReveal();
  const faq2 = useScrollReveal();
  const faq3 = useScrollReveal();
  const faqRefs = [faq0, faq1, faq2, faq3];

  return (
    <PageLayout>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={styles.label}>ServiceTitan Migrations</div>
        <h1 className={styles.heroTitle}>
          ServiceTitan migrations <em>that don't blow up your business.</em>
        </h1>
        <div className="thermal-divider mx-auto mb-6" />
        <p className={styles.heroSub}>
          Most ServiceTitan implementations run late, lose data, and get
          abandoned by techs. We do them fixed-fee, on-time, with the data
          intact and the team trained.
        </p>
        <div className={styles.heroCtas}>
          <a href="mailto:charles@fieldpass.pro?subject=ServiceTitan%20Readiness%20Audit"
             className={styles.ctaPrimary}>
            Book a Readiness Audit <span className={styles.arrow}>→</span>
          </a>
          <a href="#how" className={styles.ctaSecondary}>
            See how it works
          </a>
        </div>
      </section>

      {/* Pain section */}
      <section className={styles.painSection}>
        <h2 className={styles.sectionTitle}>
          Why ServiceTitan migrations <em>fail.</em>
        </h2>
        <p className={styles.sectionLede}>
          Three patterns we see in every stuck implementation:
        </p>
        <div className={styles.painGrid}>
          {PAINS.map((p, i) => (
            <div
              key={p.title}
              ref={painRefs[i].ref}
              className={`${styles.painCard} ${painRefs[i].isVisible ? styles.visible : ""}`}
              style={staggerDelay(i)}
            >
              <div className={styles.painIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2"
                     strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h3 className={styles.painTitle}>{p.title}</h3>
              <p className={styles.painDesc}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Methodology */}
      <section id="how" className={styles.methodSection}>
        <h2 className={styles.sectionTitle}>
          The four-stage <em>migration playbook.</em>
        </h2>
        <p className={styles.sectionLede}>
          Same process every time. Documented deliverables. Fixed timeline.
        </p>
        <div className={styles.steps}>
          {STEPS.map((s, i) => (
            <div
              key={s.number}
              ref={stepRefs[i].ref}
              className={`${styles.step} ${stepRefs[i].isVisible ? styles.visible : ""}`}
              style={staggerDelay(i, 0.12)}
            >
              <div className={styles.stepNumber}>{s.number}</div>
              <div className={styles.stepBody}>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepDesc}>{s.desc}</p>
                <div className={styles.stepDeliverable}>
                  <span className={styles.deliverableLabel}>Deliverable</span>
                  <span className={styles.deliverableText}>{s.deliverable}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className={styles.pricingSection}>
        <h2 className={styles.sectionTitle}>
          Three tiers. <em>Fixed fee.</em>
        </h2>
        <p className={styles.sectionLede}>
          We don't bill hours. You know what you're paying before we start.
        </p>
        <div className={styles.tierGrid}>
          {TIERS.map((t, i) => (
            <div
              key={t.name}
              ref={tierRefs[i].ref}
              className={`${styles.tier} ${t.accentClass} ${
                t.highlight ? styles.tierHighlight : ""
              } ${tierRefs[i].isVisible ? styles.visible : ""}`}
              style={staggerDelay(i)}
            >
              {t.highlight && <div className={styles.tierBadge}>Most operators start here</div>}
              <div className={styles.tierName}>{t.name}</div>
              <div className={styles.tierPrice}>{t.price}</div>
              <div className={styles.tierCadence}>{t.cadence}</div>
              <p className={styles.tierDesc}>{t.description}</p>
              <ul className={styles.tierFeatures}>
                {t.features.map((f) => (
                  <li key={f}>
                    <span className={styles.checkmark}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="mailto:charles@fieldpass.pro?subject=ServiceTitan%20Inquiry"
                 className={styles.tierCta}>
                {t.cta} <span className={styles.arrow}>→</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faqSection}>
        <h2 className={styles.sectionTitle}>
          Common <em>questions.</em>
        </h2>
        <div className={styles.faqList}>
          {FAQS.map((f, i) => (
            <div
              key={f.q}
              ref={faqRefs[i].ref}
              className={`${styles.faq} ${faqRefs[i].isVisible ? styles.visible : ""}`}
              style={staggerDelay(i, 0.1)}
            >
              <div className={styles.faqQ}>{f.q}</div>
              <div className={styles.faqA}>{f.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className={styles.finalCta}>
        <h2 className={styles.finalCtaTitle}>
          Ready to do this <em>right?</em>
        </h2>
        <p className={styles.finalCtaText}>
          Two weeks. $7,500. A migration plan written by people who have done
          this before — not a sales deck.
        </p>
        <a href="mailto:charles@fieldpass.pro?subject=ServiceTitan%20Readiness%20Audit"
           className={styles.ctaPrimary}>
          Book a Readiness Audit <span className={styles.arrow}>→</span>
        </a>
      </section>
    </PageLayout>
  );
}
