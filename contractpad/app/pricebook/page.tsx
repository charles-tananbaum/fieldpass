"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./pricebook.module.css";

type Tab = "transform" | "pricebook" | "agreements" | "invoice";
type Plan = "basic" | "standard" | "premium" | null;

interface RawItem {
  label: string;
  ok: boolean;
}

const RAW_ITEMS: RawItem[] = [
  { label: "Labor", ok: false },
  { label: "Labor - extra", ok: false },
  { label: "labor charge", ok: false },
  { label: "Parts", ok: false },
  { label: "AC parts", ok: false },
  { label: "parts & materials", ok: false },
  { label: "Service call", ok: false },
  { label: "Svc call", ok: false },
  { label: "SVC CALL EMERG", ok: false },
  { label: "Tune up", ok: false },
  { label: "Tune-up", ok: false },
  { label: "TUNEUP", ok: false },
  { label: "Cap replacement", ok: false },
  { label: "Capacitor R&R", ok: false },
  { label: "cap job", ok: false },
  { label: "dual cap", ok: false },
  { label: "Misc repair", ok: false },
  { label: "misc", ok: false },
  { label: "other", ok: false },
  { label: "Install", ok: true },
  { label: "Install new unit", ok: true },
  { label: "Emergency call", ok: false },
  { label: "after hrs", ok: false },
  { label: "Refrigerant R410A", ok: true },
  { label: "freon", ok: false },
  { label: "freon charge", ok: false },
  { label: "Compressor", ok: true },
  { label: "compressor R&R", ok: false },
  { label: "blower motor", ok: false },
  { label: "blower mtg", ok: false },
  { label: "ECM motor", ok: false },
  { label: "wiring repair", ok: false },
  { label: "burnt wire", ok: false },
  { label: "Maint plan", ok: false },
  { label: "service agreement", ok: false },
  { label: "annual plan", ok: false },
];

interface CleanRow {
  category: string;
  categoryClass: string;
  service: string;
  price: string;
}

const CLEAN_ROWS: CleanRow[] = [
  { category: "Diagnostics", categoryClass: "catDiag", service: "Service Call", price: "$137" },
  { category: "Emergency", categoryClass: "catEmerg", service: "After Hours Call", price: "$197" },
  { category: "Maintenance", categoryClass: "catMaint", service: "AC Tune-Up", price: "$135" },
  { category: "Capacitors", categoryClass: "catCap", service: "Single Run Cap", price: "$195" },
  { category: "Capacitors", categoryClass: "catCap", service: "Dual Run Cap", price: "$245" },
  { category: "Refrigerant", categoryClass: "catRefrig", service: "R-410A Recharge", price: "$85/lb" },
  { category: "Motors", categoryClass: "catMotor", service: "Blower Motor - PSC", price: "$320" },
  { category: "Motors", categoryClass: "catMotor", service: "Blower Motor - ECM", price: "$485" },
  { category: "Wiring", categoryClass: "catWire", service: "Burnt Wire Repair", price: "$175" },
  { category: "Compressors", categoryClass: "catComp", service: "Compressor R&R", price: "$1,900" },
  { category: "Agreements", categoryClass: "catMaint", service: "Annual Plan - Basic", price: "$149/yr" },
];

interface FullRow {
  code: string;
  name: string;
  desc: string;
  category: string;
  categoryClass: string;
  price: string;
  hours: string;
  confidence: "high" | "med";
}

const FULL_PRICEBOOK: FullRow[] = [
  { code: "DIAGN-001", name: "Service Call / Diagnostic", desc: "Full system diagnostic, written report", category: "Diagnostics", categoryClass: "catDiag", price: "$137.50", hours: "1.0", confidence: "high" },
  { code: "EMERG-001", name: "After Hours Emergency Call", desc: "Service call outside regular hours", category: "Emergency", categoryClass: "catEmerg", price: "$197.50", hours: "1.0", confidence: "high" },
  { code: "MAINT-001", name: "AC Tune-Up — 22 Point", desc: "Coil clean, filter check, full inspection", category: "Maintenance", categoryClass: "catMaint", price: "$135.00", hours: "1.5", confidence: "high" },
  { code: "MAINT-002", name: "Heating Tune-Up", desc: "Furnace/boiler inspection and clean", category: "Maintenance", categoryClass: "catMaint", price: "$135.00", hours: "1.5", confidence: "high" },
  { code: "CAPAC-001", name: "Single Run Capacitor", desc: "Supply and install, up to 60 MFD", category: "Capacitors", categoryClass: "catCap", price: "$195.00", hours: "0.5", confidence: "high" },
  { code: "CAPAC-002", name: "Dual Run Capacitor 40/5 MFD", desc: "Supply and install", category: "Capacitors", categoryClass: "catCap", price: "$245.00", hours: "0.5", confidence: "high" },
  { code: "REFRI-001", name: "R-410A Refrigerant Recharge", desc: "Per pound, first 2 lbs included", category: "Refrigerant", categoryClass: "catRefrig", price: "$85.00/lb", hours: "0.75", confidence: "high" },
  { code: "REFRI-002", name: "Refrigerant Leak Repair", desc: "Locate, repair, recharge", category: "Refrigerant", categoryClass: "catRefrig", price: "$850.00", hours: "2.0", confidence: "high" },
  { code: "MOTOR-001", name: "PSC Blower Motor Replacement", desc: "Standard single-speed motor", category: "Motors", categoryClass: "catMotor", price: "$320.00", hours: "1.5", confidence: "med" },
  { code: "MOTOR-002", name: "ECM Blower Motor Replacement", desc: "Variable speed motor", category: "Motors", categoryClass: "catMotor", price: "$485.00", hours: "2.0", confidence: "med" },
  { code: "WIRE-001", name: "Burnt / Loose Wiring Repair", desc: "Inspect, repair, test", category: "Wiring", categoryClass: "catWire", price: "$175.00", hours: "1.0", confidence: "high" },
  { code: "COMP-001", name: "AC Compressor Replacement", desc: "Up to 3-ton, labor only", category: "Compressors", categoryClass: "catComp", price: "$1,900.00", hours: "4.0", confidence: "high" },
];

interface PlanDef {
  id: Exclude<Plan, null>;
  badge: string;
  name: string;
  price: string;
  cadence: string;
  items: string[];
  featured?: boolean;
}

const PLANS: PlanDef[] = [
  {
    id: "basic",
    badge: "Essential",
    name: "Basic Plan",
    price: "$149",
    cadence: "/year",
    items: [
      "1 AC tune-up per year",
      "Priority scheduling (24hr response)",
      "10% off all repairs",
      "Filter check included",
      "Annual equipment inspection report",
    ],
  },
  {
    id: "standard",
    badge: "Most Popular",
    name: "Standard Plan",
    price: "$249",
    cadence: "/year",
    featured: true,
    items: [
      "2 tune-ups (AC + heating)",
      "Priority scheduling (same-day)",
      "15% off all repairs",
      "Filters replaced at each visit",
      "Equipment age + replacement report",
      "Transferable to new homeowner",
    ],
  },
  {
    id: "premium",
    badge: "Full Coverage",
    name: "Premium Plan",
    price: "$399",
    cadence: "/year",
    items: [
      "2 tune-ups + 1 emergency visit",
      "Emergency priority (4hr response)",
      "20% off all repairs",
      "All filters replaced each visit",
      "Full equipment lifecycle report",
      "Autopay available — no renewal calls",
    ],
  },
];

interface Script {
  steps: { title: string; text: React.ReactNode }[];
  label: string;
}

const SCRIPTS: Record<Exclude<Plan, null>, Script> = {
  basic: {
    label: "Basic Plan — tech script",
    steps: [
      {
        title: "After completing the job",
        text: (
          <>
            "Mr./Ms. [Name], everything's running well now. While I'm here — do
            you have a maintenance plan on this system?"
          </>
        ),
      },
      {
        title: "If no / not sure",
        text: (
          <>
            "We have a <strong>Basic Plan for $149 a year</strong> — that
            covers your annual tune-up, priority scheduling so you're not
            waiting when something goes wrong, and 10% off any repairs. For a
            system like yours it basically pays for itself on the first
            service call."
          </>
        ),
      },
      {
        title: "Close",
        text: (
          <>
            "Want me to set that up for you right now? Takes about 2 minutes
            and I can email you the agreement."
          </>
        ),
      },
    ],
  },
  standard: {
    label: "Standard Plan — tech script (most common)",
    steps: [
      {
        title: "After completing the job",
        text: (
          <>
            "Before I head out — are you on a maintenance plan with us? A lot
            of our customers in Norwood find it saves them a couple hundred
            dollars a year."
          </>
        ),
      },
      {
        title: "Pitch",
        text: (
          <>
            "Our most popular is the{" "}
            <strong>Standard Plan at $249</strong> — you get two tune-ups a
            year, heating and cooling, same-day priority when something
            breaks, and 15% off all repairs. I replace your filters at every
            visit so you don't have to think about it."
          </>
        ),
      },
      {
        title: "Handle \"I'll think about it\"",
        text: (
          <>
            "Totally understand. Just so you know, the 15% repair discount —
            today's job would have been [X] less. I can lock in the rate for
            you today and you can cancel anytime in the first 30 days if it's
            not working for you."
          </>
        ),
      },
    ],
  },
  premium: {
    label: "Premium Plan — tech script",
    steps: [
      {
        title: "For older systems or repeat customers",
        text: (
          <>
            "Given the age of this system, honestly the best value we offer is
            the <strong>Premium Plan at $399</strong>. You get everything in
            the Standard Plan plus one emergency visit included — so if
            something goes wrong at 9pm in August you're not paying the
            emergency rate."
          </>
        ),
      },
      {
        title: "The math close",
        text: (
          <>
            "Emergency call alone is $197. Two tune-ups at $135 each is $270.
            That's $467 just for what's included — you're paying $399 and
            getting 20% off everything else on top of it."
          </>
        ),
      },
      {
        title: "Autopay pitch",
        text: (
          <>
            "We can set it up on autopay so you never get a renewal call. I
            just need your email and it handles itself."
          </>
        ),
      },
    ],
  },
};

const TABS: { id: Tab; num: string; label: string }[] = [
  { id: "transform", num: "01", label: "Before & After" },
  { id: "pricebook", num: "02", label: "Clean Pricebook" },
  { id: "agreements", num: "03", label: "Maintenance Plans" },
  { id: "invoice", num: "04", label: "Invoice Flow" },
];

const catClassFor = (key: string): string => {
  const map: Record<string, string> = {
    catDiag: styles.catDiag,
    catCap: styles.catCap,
    catMaint: styles.catMaint,
    catRefrig: styles.catRefrig,
    catWire: styles.catWire,
    catMotor: styles.catMotor,
    catComp: styles.catComp,
    catEmerg: styles.catEmerg,
  };
  return map[key] ?? "";
};

export default function PricebookPage() {
  const [activeTab, setActiveTab] = useState<Tab>("transform");
  const [activePlan, setActivePlan] = useState<Plan>(null);

  return (
    <div className={styles.root}>
      {/* Nav */}
      <nav className={styles.nav}>
        <Link href="/" className={styles.navBrand}>
          Field<span>Pass</span>
        </Link>
        <div className={styles.navRight}>
          <Link href="/contractpad" className={styles.navLink}>
            ContractPad
          </Link>
          <div className={styles.navBadge}>
            <span className={styles.navBadgeDot} />
            Live Demo
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroLabel}>Norwood HVAC Co · Pilot Demo</div>
        <h1 className={styles.heroTitle}>
          Your pricebook,
          <br />
          <em>finally structured.</em>
        </h1>
        <p className={styles.heroSub}>
          We take your existing QuickBooks or HousecallPro data and turn it
          into a clean, flat-rate pricebook — plus maintenance agreement
          templates your techs can actually use.
        </p>
        <div className={styles.thermalBar} />
      </section>

      {/* Tabs */}
      <div className={styles.tabs}>
        <div className={styles.tabRow} role="tablist">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`${styles.tabBtn} ${
                activeTab === t.id ? styles.tabBtnActive : ""
              }`}
              onClick={() => setActiveTab(t.id)}
              role="tab"
              aria-selected={activeTab === t.id}
            >
              <span className={styles.tabBtnNum}>{t.num}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* TAB 1: BEFORE/AFTER */}
        {activeTab === "transform" && (
          <div className={styles.tabPanel}>
            <div className={styles.metricsRow}>
              <div className={styles.metric}>
                <div className={`${styles.metricVal} ${styles.metricValAccent}`}>
                  47
                </div>
                <div className={styles.metricLabel}>
                  Items in your current list
                </div>
              </div>
              <div className={styles.metric}>
                <div className={`${styles.metricVal} ${styles.metricValGood}`}>
                  89
                </div>
                <div className={styles.metricLabel}>
                  Structured items generated
                </div>
                <div className={styles.metricSub}>↑ from your job history</div>
              </div>
              <div className={styles.metric}>
                <div className={`${styles.metricVal} ${styles.metricValAccent}`}>
                  31
                </div>
                <div className={styles.metricLabel}>
                  Duplicate / vague entries removed
                </div>
              </div>
              <div className={styles.metric}>
                <div className={`${styles.metricVal} ${styles.metricValGood}`}>
                  ~38h
                </div>
                <div className={styles.metricLabel}>
                  Hours saved vs. manual build
                </div>
              </div>
            </div>

            <div className={`${styles.notice} ${styles.noticeWarn}`}>
              <span className={styles.noticeIcon}>⚠</span>
              <span>
                This is what your current item list looks like to ServiceTitan
                or HousecallPro. Duplicates, missing prices, and vague
                descriptions cause techs to create one-off line items — which
                destroys your reporting.
              </span>
            </div>

            <div className={styles.transformGrid}>
              <div className={styles.rawCard}>
                <div className={styles.cardHeader}>
                  <span>⚠</span> Your current item list (messy)
                </div>
                <div className={styles.rawList}>
                  {RAW_ITEMS.map((item, i) => (
                    <div key={i} className={styles.rawItem}>
                      <span
                        className={item.ok ? styles.okDot : styles.warnDot}
                      />
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.transformArrow}>→</div>

              <div className={styles.cleanCard}>
                <div className={styles.cardHeader}>
                  <span>✓</span> FieldPass structured output
                </div>
                <table className={styles.pbTable}>
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Service</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CLEAN_ROWS.map((r, i) => (
                      <tr key={i}>
                        <td>
                          <span
                            className={`${styles.catBadge} ${catClassFor(
                              r.categoryClass
                            )}`}
                          >
                            {r.category}
                          </span>
                        </td>
                        <td>{r.service}</td>
                        <td className={styles.pbPrice}>{r.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className={`${styles.notice} ${styles.noticeGood}`}>
              <span className={styles.noticeIcon}>✓</span>
              <span>
                <strong>Result:</strong> 47 messy items → 89 structured line
                items across 8 categories. Built from your own invoice history
                — not a generic template. Ready to import into HousecallPro or
                ServiceTitan. Human review session takes 2–3 hours to fill
                remaining gaps.
              </span>
            </div>
          </div>
        )}

        {/* TAB 2: FULL PRICEBOOK */}
        {activeTab === "pricebook" && (
          <div className={styles.tabPanel}>
            <div className={`${styles.notice} ${styles.noticeGood}`}>
              <span className={styles.noticeIcon}>✓</span>
              <span>
                Built from 24 months of Norwood HVAC Co invoice history.
                Prices derived from your own historical averages — not
                national benchmarks that don't reflect your market or margins.
              </span>
            </div>

            <div className={styles.sectionLabel}>
              All services — 89 items across 8 categories
            </div>

            <div className={styles.pbTableWrap}>
              <table className={styles.pbTable}>
                <thead>
                  <tr>
                    <th style={{ width: 100 }}>Code</th>
                    <th>Service Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Hrs</th>
                    <th>Confidence</th>
                  </tr>
                </thead>
                <tbody>
                  {FULL_PRICEBOOK.map((r) => (
                    <tr key={r.code}>
                      <td className={styles.pbCode}>{r.code}</td>
                      <td>
                        <div className={styles.pbName}>{r.name}</div>
                        <div className={styles.pbDesc}>{r.desc}</div>
                      </td>
                      <td>
                        <span
                          className={`${styles.catBadge} ${catClassFor(
                            r.categoryClass
                          )}`}
                        >
                          {r.category}
                        </span>
                      </td>
                      <td className={styles.pbPrice}>{r.price}</td>
                      <td className={styles.pbHours}>{r.hours}</td>
                      <td>
                        <span
                          className={
                            r.confidence === "high"
                              ? styles.confHigh
                              : styles.confMed
                          }
                        >
                          {r.confidence === "high" ? "● High" : "◐ Review"}
                        </span>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={6} className={styles.pbMore}>
                      + 77 more items across Installations, Filters, Controls,
                      and Agreements
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: MAINTENANCE PLANS */}
        {activeTab === "agreements" && (
          <div className={styles.tabPanel}>
            <div className={`${styles.notice} ${styles.noticeGood}`}>
              <span className={styles.noticeIcon}>✓</span>
              <span>
                Three ready-to-use maintenance plan templates. Your techs can
                present these on-site and sign customers up immediately. No
                custom verbiage needed — just select the plan and go.
              </span>
            </div>

            <div className={styles.sectionLabel}>
              Maintenance agreement templates — click to preview
            </div>

            <div className={styles.plansGrid}>
              {PLANS.map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setActivePlan(plan.id)}
                  className={`${styles.planCard} ${
                    plan.featured ? styles.planCardFeatured : ""
                  }`}
                >
                  <div className={styles.planHeader}>
                    <div className={styles.planBadge}>{plan.badge}</div>
                    <div className={styles.planName}>{plan.name}</div>
                    <div className={styles.planPrice}>
                      {plan.price}
                      <span>{plan.cadence}</span>
                    </div>
                  </div>
                  <div className={styles.planBody}>
                    {plan.items.map((item, i) => (
                      <div key={i} className={styles.planItem}>
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className={styles.planFooter}>
                    <div className={styles.planBtn}>View tech script →</div>
                  </div>
                </button>
              ))}
            </div>

            {activePlan && (
              <div className={styles.scriptCard}>
                <div className={styles.sectionLabel}>
                  {SCRIPTS[activePlan].label}
                </div>
                {SCRIPTS[activePlan].steps.map((step, i) => (
                  <div key={i} className={styles.scriptStep}>
                    <div className={styles.stepNum}>{i + 1}</div>
                    <div className={styles.stepContent}>
                      <div className={styles.stepTitle}>{step.title}</div>
                      <div className={styles.stepText}>{step.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: INVOICE FLOW */}
        {activeTab === "invoice" && (
          <div className={styles.tabPanel}>
            <div className={styles.sectionLabel}>
              Invoice flow — before vs. after FieldPass
            </div>

            <div className={styles.invoiceGrid}>
              <div className={`${styles.invoiceCard} ${styles.invoiceBefore}`}>
                <div className={styles.invoiceHeader}>
                  ⚠ Today — manual verbiage
                </div>
                <div className={styles.invoiceBody}>
                  <div className={`${styles.invoiceLine} ${styles.invoiceLineMessy}`}>
                    <span>Labor charges</span>
                    <span>$???</span>
                  </div>
                  <div className={`${styles.invoiceLine} ${styles.invoiceLineMessy}`}>
                    <span>Parts and materials</span>
                    <span>$???</span>
                  </div>
                  <div className={`${styles.invoiceLine} ${styles.invoiceLineMessy}`}>
                    <span>cap job</span>
                    <span>$195</span>
                  </div>
                  <div className={`${styles.invoiceLine} ${styles.invoiceLineMessy}`}>
                    <span>[tech adds custom note here]</span>
                    <span>—</span>
                  </div>
                  <div className={`${styles.invoiceLine} ${styles.invoiceLineMessy}`}>
                    <span>misc</span>
                    <span>$50</span>
                  </div>
                  <div className={styles.invoiceTotal}>
                    <span>Total</span>
                    <span>$???</span>
                  </div>
                </div>
                <div className={styles.invoiceFoot}>
                  ⚠ Tech spent 8 min writing this. Office has to interpret it.
                  QuickBooks entry is manual.
                </div>
              </div>

              <div className={`${styles.invoiceCard} ${styles.invoiceAfter}`}>
                <div className={styles.invoiceHeader}>
                  ✓ With FieldPass pricebook
                </div>
                <div className={styles.invoiceBody}>
                  <div className={`${styles.invoiceLine} ${styles.invoiceLineClean}`}>
                    <span>Service Call / Diagnostic</span>
                    <span>$137.50</span>
                  </div>
                  <div className={`${styles.invoiceLine} ${styles.invoiceLineClean}`}>
                    <span>Dual Run Capacitor 40/5 MFD</span>
                    <span>$245.00</span>
                  </div>
                  <div className={`${styles.invoiceLine} ${styles.invoiceLineClean}`}>
                    <span>R-410A Recharge (2 lbs)</span>
                    <span>$170.00</span>
                  </div>
                  <div className={`${styles.invoiceLine} ${styles.invoiceLineClean}`}>
                    <span>Standard Maintenance Plan</span>
                    <span>$249.00</span>
                  </div>
                  <div className={styles.invoiceTotal}>
                    <span>Total</span>
                    <span>$801.50</span>
                  </div>
                </div>
                <div className={styles.invoiceFoot}>
                  ✓ Tech tapped 4 items. Invoice sent from job site. Synced to
                  QuickBooks automatically.
                </div>
              </div>
            </div>

            <div className={`${styles.notice} ${styles.noticeGood}`}>
              <span className={styles.noticeIcon}>✓</span>
              <span>
                <strong>The difference:</strong> With a complete pricebook,
                your techs tap pre-built line items instead of writing custom
                descriptions. Invoice goes out faster, your reporting is
                clean, and your accountant gets structured data he can
                actually work with — not a pile of "misc" entries.
              </span>
            </div>

            <div className={styles.outcomesBox}>
              <div className={styles.sectionLabel}>
                What this means for your business
              </div>
              <div className={styles.outcomesGrid}>
                <div>
                  <div className={styles.outcomeTitle}>
                    Time saved per tech per day
                  </div>
                  <div className={styles.outcomeText}>
                    ~20 min on invoice entry → ~3 min. For 3 techs doing 5
                    jobs each, that's 2.5 hours/day back in the business.
                  </div>
                </div>
                <div>
                  <div className={styles.outcomeTitle}>
                    Reporting you didn't have before
                  </div>
                  <div className={styles.outcomeText}>
                    Revenue by service type, most profitable jobs, which tech
                    is selling maintenance plans — all flows from the
                    pricebook being structured.
                  </div>
                </div>
                <div>
                  <div className={styles.outcomeTitle}>
                    Your accountant gets cleaner data
                  </div>
                  <div className={styles.outcomeText}>
                    HousecallPro sends structured line items to QuickBooks.
                    No more "misc repair $200" — your accountant sees exactly
                    what was sold.
                  </div>
                </div>
                <div>
                  <div className={styles.outcomeTitle}>
                    Maintenance plan signups go up
                  </div>
                  <div className={styles.outcomeText}>
                    When the plan is a single tap instead of a typed custom
                    line item, techs actually offer it. One extra plan signup
                    per week = $10–20k additional recurring revenue/year.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.footerText}>
          <strong>FieldPass</strong> — built for local HVAC operators. Free
          pilot program, Boston area.
        </div>
        <div className={`${styles.footerText} ${styles.footerAccent}`}>
          fieldpass.co
        </div>
      </div>
    </div>
  );
}
