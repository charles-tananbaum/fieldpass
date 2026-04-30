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
    desc: "A free, two-week deep dive into your current platform, data, and workflows. We map exactly what moves cleanly, what needs cleanup, and what gets rebuilt — before a single dollar is spent on migration.",
    deliverable: "Migration plan + risk register + fixed-fee proposal · free",
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

const AUDIT_INCLUDES = [
  "Full review of your current platform, data, and workflows",
  "Mapping of what migrates cleanly vs. what needs cleanup",
  "Tech adoption & training gap analysis",
  "Fixed-fee migration proposal scoped to your business",
  "Risk register with mitigation plan for each issue we find",
];

const FAQS = [
  {
    q: "Why is the audit free?",
    a: "Because most operators have no idea what they're walking into until someone shows them. The audit gives you a real plan — even if you don't hire us. We've found that operators who go through it almost always come back, and the ones who don't weren't a fit anyway.",
  },
  {
    q: "What does a migration cost after the audit?",
    a: "It depends entirely on what we find. A clean single-location move from Housecall Pro is very different from a multi-location rescue with custom integrations. The audit produces a fixed-fee proposal scoped to your specific business — no surprises, no hourly billing.",
  },
  {
    q: "How is this different from ServiceTitan Pro Services?",
    a: "ST's in-house team is excellent but heavily booked. We work alongside their AEs as overflow capacity, often on a faster timeline, and we specialize in the migration and adoption side — not just the configuration.",
  },
  {
    q: "What if we're already mid-implementation and stuck?",
    a: "We do rescue engagements. Start with the audit so we can scope what's salvageable and what needs to be redone. Most stuck implementations can be back on track in 30 days.",
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

  const auditCard = useScrollReveal();

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
          <a href="mailto:charles@fieldpass.pro?subject=ServiceTitan%20Free%20Audit"
             className={styles.ctaPrimary}>
            Book a free audit <span className={styles.arrow}>→</span>
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

      {/* Free audit — the only entry point */}
      <section className={styles.auditSection}>
        <h2 className={styles.sectionTitle}>
          Start with a <em>free audit.</em>
        </h2>
        <p className={styles.sectionLede}>
          Every engagement begins here. Two weeks. No cost. No commitment.
          You walk away with a clear migration plan whether you work with us
          or not.
        </p>

        <div
          ref={auditCard.ref}
          className={`${styles.auditCard} ${auditCard.isVisible ? styles.visible : ""}`}
        >
          <div className={styles.auditBadge}>Free · Two weeks</div>
          <h3 className={styles.auditTitle}>The Readiness Audit</h3>
          <p className={styles.auditDesc}>
            Before you sign with ServiceTitan — or if you're already stuck
            mid-implementation — we go deep on your data, your workflows,
            and your team's readiness for the change.
          </p>

          <div className={styles.auditIncludes}>
            <div className={styles.auditIncludesLabel}>What you get</div>
            <ul className={styles.auditList}>
              {AUDIT_INCLUDES.map((item) => (
                <li key={item}>
                  <span className={styles.checkmark}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.auditFooter}>
            <p className={styles.auditFooterText}>
              <strong>What happens next:</strong> if the audit reveals a clean
              path forward, we&apos;ll scope a fixed-fee migration proposal
              tailored to your business. If it doesn&apos;t, you&apos;ll know that
              too — with the data to back it up.
            </p>
            <a
              href="mailto:charles@fieldpass.pro?subject=ServiceTitan%20Free%20Audit"
              className={styles.auditCta}
            >
              Book the free audit <span className={styles.arrow}>→</span>
            </a>
          </div>
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
          Two weeks. Free. A migration plan written by people who have done
          this before — not a sales deck.
        </p>
        <a href="mailto:charles@fieldpass.pro?subject=ServiceTitan%20Free%20Audit"
           className={styles.ctaPrimary}>
          Book the free audit <span className={styles.arrow}>→</span>
        </a>
      </section>
    </PageLayout>
  );
}
