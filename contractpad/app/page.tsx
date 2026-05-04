"use client";

import Link from "next/link";
import OperatorLayout from "@/components/OperatorLayout";
import styles from "./operator-home.module.css";

const SERVICES = [
  {
    title: "Custom Automations",
    desc: "Stop doing things by hand. We automate invoices, dispatching, pricebook lookups, and recurring payments.",
    href: "/what-we-do",
  },
  {
    title: "ServiceTitan Migrations",
    desc: "We move HVAC shops onto ServiceTitan in 4–6 weeks — fixed fee, on time, with the data intact.",
    href: "/servicetitan",
    featured: true,
  },
  {
    title: "Operations Audits",
    desc: "We look at how your shop runs end to end — and tell you exactly where you're losing time and money.",
    href: "/what-we-do",
  },
  {
    title: "Software Training",
    desc: "Most operators only use 20% of their software. We teach your team the parts that actually matter.",
    href: "/what-we-do",
  },
];

const PRINCIPLES = [
  {
    icon: "🚫",
    title: "No hourly billing",
    body: "Every engagement is fixed-fee. You know what you're paying before we start — no surprise invoices, no scope creep, no consultant clock running while you sleep.",
  },
  {
    icon: "📋",
    title: "No long contracts",
    body: "We don't lock you into multi-year retainers or 90-day notice clauses. Hire us for the work, and if it's not a fit, we shake hands and part ways.",
  },
  {
    icon: "🔧",
    title: "Skin in the game",
    body: "We do the work ourselves — no offshoring, no junior consultants. The same person who scopes your project is the one in your shop on cutover day.",
  },
];

export default function OperatorHome() {
  return (
    <OperatorLayout>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={styles.eyebrow}>Software for HVAC Operators</div>
          <h1 className={styles.heroTitle}>
            Better software for your shop. <span className={styles.accent}>Without the BS.</span>
          </h1>
          <p className={styles.heroSub}>
            We help HVAC and plumbing owners pick, switch, and actually use the
            software that runs their business. No long contracts. No
            consultant-speak. Just the work.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/servicetitan" className={styles.ctaPrimary}>
              See ServiceTitan Migrations
            </Link>
            <a href="tel:+14157130070" className={styles.ctaSecondary}>
              Or call (415) 713-0070
            </a>
          </div>
          <div className={styles.heroOutcomes}>
            {["Time saved", "Headaches removed", "Client satisfaction up", "Client volume up"].map((label) => (
              <div key={label} className={styles.outcomePill}>
                <span className={styles.outcomeCheck}>✓</span>
                {label}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.heroRight}>
          <video
            className={styles.heroImg}
            src="https://videos.pexels.com/video-files/5327935/5327935-sd_640_360_30fps.mp4"
            poster="https://images.pexels.com/photos/4078347/pexels-photo-4078347.jpeg?auto=compress&cs=tinysrgb&w=900&h=1100&fit=crop"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="HVAC ventilation system in motion"
          />
          <div className={styles.heroBadge}>
            <div className={styles.heroBadgeLabel}>Skin in the game</div>
            <div className={styles.heroBadgeSub}>Built by operators, for operators</div>
          </div>
        </div>
      </section>

      {/* Platform compatibility strip */}
      <section className={styles.trustStrip}>
        <div className={styles.trustText}>We work with the platforms you already use</div>
        <div className={styles.trustLogos}>
          <div className={styles.trustLogo}>SERVICETITAN</div>
          <div className={styles.trustLogo}>HOUSECALL PRO</div>
          <div className={styles.trustLogo}>QUICKBOOKS</div>
          <div className={styles.trustLogo}>BUILDOPS</div>
          <div className={styles.trustLogo}>JOBBER</div>
          <div className={styles.trustLogo}>STRIPE</div>
        </div>
      </section>

      {/* Services overview */}
      <section className={styles.servicesSection}>
        <div className={styles.sectionInner}>
          <div className={styles.eyebrow}>What we do</div>
          <h2 className={styles.h2}>Four ways we help your shop run better.</h2>
          <p className={styles.lede}>
            Whatever's slowing you down — bad software, manual workflows, a botched
            ServiceTitan rollout — we have a way through it.
          </p>
          <div className={styles.servicesGrid}>
            {SERVICES.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className={`${styles.serviceCard} ${s.featured ? styles.serviceCardFeatured : ""}`}
              >
                {s.featured && <div className={styles.servicePill}>Most popular</div>}
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className={styles.serviceArrow}>Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Principles — how we're different */}
      <section className={styles.testimonialSection}>
        <div className={styles.sectionInner}>
          <div className={styles.eyebrow}>How we&apos;re different</div>
          <h2 className={styles.h2}>Three things you won&apos;t get from a typical consultant.</h2>
          <div className={styles.principlesGrid}>
            {PRINCIPLES.map((p) => (
              <div key={p.title} className={styles.principleCard}>
                <div className={styles.principleIcon}>{p.icon}</div>
                <h3 className={styles.principleTitle}>{p.title}</h3>
                <p className={styles.principleBody}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About the founders */}
      <section className={styles.aboutSection}>
        <div className={styles.aboutInner}>
          <div className={styles.aboutLeft}>
            <div className={styles.eyebrow}>Who we are</div>
            <h2 className={styles.h2}>Three guys. One mission.</h2>
            <p className={styles.aboutText}>
              FieldPass was started by Jack, Kunal, and Charles — three friends
              who spent years working in the field service and software worlds.
              We watched too many HVAC owners get burned by bad software and
              expensive consultants who didn&apos;t understand the trades.
            </p>
            <p className={styles.aboutText}>
              So we built a different kind of company. No lock-in contracts.
              No six-figure retainers. Just direct work with operators who want
              their business to run better.
            </p>
            <Link href="/who-we-are" className={styles.ctaSecondary}>
              Meet the team →
            </Link>
          </div>
          <div className={styles.aboutRight}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=900&h=1100&fit=crop"
              alt="Harvard Business School"
              className={styles.aboutImg}
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={styles.finalCta}>
        <div className={styles.finalCtaInner}>
          <h2 className={styles.finalCtaTitle}>Ready to talk?</h2>
          <p className={styles.finalCtaSub}>
            Call us, email us, or book a free audit. The first conversation is
            always free, no strings.
          </p>
          <div className={styles.finalCtaGrid}>
            <a href="tel:+14157130070" className={styles.finalCtaCard}>
              <div className={styles.finalCtaIcon}>📞</div>
              <div className={styles.finalCtaCardTitle}>Call us</div>
              <div className={styles.finalCtaCardValue}>(415) 713-0070</div>
              <div className={styles.finalCtaCardSub}>Mon–Fri, 8am–6pm ET</div>
            </a>
            <a href="mailto:charles@fieldpass.pro" className={styles.finalCtaCard}>
              <div className={styles.finalCtaIcon}>✉️</div>
              <div className={styles.finalCtaCardTitle}>Email us</div>
              <div className={styles.finalCtaCardValue}>charles@fieldpass.pro</div>
              <div className={styles.finalCtaCardSub}>We reply within 24 hours</div>
            </a>
          </div>
        </div>
      </section>
    </OperatorLayout>
  );
}
