import { useMemo, useState } from "react";
import { SignalField } from "./SignalField";
import { saveSelectedPlan, scrollToContact, type PlanOption } from "../plans";

// ——— Prețuri configurate (sursă unică) ———
const PRICING_CONFIG = {
  booking: {
    setup: 1880,
    locations: 1,
    monthly_base: 180,
    included_units: 2,
    extra_unit: 90,
    desc: "Include programări nelimitate 24/7 pe WhatsApp.",
    includes: "Include 1 locație și 2 calendare/angajați.",
    extras: "Cost în plus: +90 lei/lună per calendar/angajat peste primele 2 incluse.",
  },
  consulting: {
    setup: 1500,
    locations: 1,
    monthly_base: 180,
    included_units: 2,
    extra_unit: 90,
    desc: "Include conversații, triaj și interacțiuni nelimitate.",
    includes: "Include 1 locație și 2 fluxuri/angajați.",
    extras: "Cost în plus: +90 lei/lună per flux peste primele 2 incluse.",
  },
  pro: {
    setup: 2250,
    desc: "Include ambele sisteme complet integrate, cu programări și conversații nelimitate.",
    badge: "Cel mai avantajos",
    footnote:
      "SMS Marketing inclus fără taxă de campanie — plătești doar mesajele trimise (de la 1,80 lei / SMS + TVA).",
  },
  sms: {
    campaign_fee: 375,
    campaign_note:
      "lei + TVA · doar în lunile în care lansezi, fără abonament obligatoriu",
    per_unit: "1,80",
    per_unit_note: "lei / SMS + TVA",
    detail: "Nu necesită deținerea unui plan VIDIA, disponibil la cerere.",
  },
  roi: {
    avg_appointment_lei: 100,
  },
} as const;

type SubscriptionPlanId = "Booking" | "Consulting" | "PRO";
type PricingTab = SubscriptionPlanId | "SMS Marketing";

const TABS: { id: PricingTab; label: string }[] = [
  { id: "Booking", label: "Booking" },
  { id: "Consulting", label: "Consulting" },
  { id: "PRO", label: "PRO" },
  { id: "SMS Marketing", label: "SMS" },
];

function formatLei(amount: number): string {
  return amount.toLocaleString("ro-RO");
}

/** Abonament tiered: bază pentru primele N unități, +extra per unitate suplimentară. */
function calcTieredMonthly(
  count: number,
  monthlyBase: number,
  included: number,
  extraUnit: number,
): number {
  if (count <= included) return monthlyBase;
  return monthlyBase + (count - included) * extraUnit;
}

function calcBookingMonthly(calendarCount: number): number {
  const { monthly_base, included_units, extra_unit } = PRICING_CONFIG.booking;
  return calcTieredMonthly(
    calendarCount,
    monthly_base,
    included_units,
    extra_unit,
  );
}

function calcConsultingMonthly(fluxCount: number): number {
  const { monthly_base, included_units, extra_unit } = PRICING_CONFIG.consulting;
  return calcTieredMonthly(fluxCount, monthly_base, included_units, extra_unit);
}

function calcProMonthly(calendarCount: number, fluxCount: number): number {
  return calcBookingMonthly(calendarCount) + calcConsultingMonthly(fluxCount);
}

function calcMonthlyLoss(missedPerWeek: number): number {
  return Math.round(
    missedPerWeek * 4 * PRICING_CONFIG.roi.avg_appointment_lei,
  );
}

function buildPlanSummary(
  planId: SubscriptionPlanId,
  calendarCount: number,
  fluxCount: number,
  monthly: number,
): string {
  const setup =
    planId === "Booking"
      ? PRICING_CONFIG.booking.setup
      : planId === "Consulting"
        ? PRICING_CONFIG.consulting.setup
        : PRICING_CONFIG.pro.setup;

  const parts = [
    planId,
    `Set-up: ${formatLei(setup)} lei + TVA`,
    `Abonament estimat: ${formatLei(monthly)} lei/lună + TVA`,
  ];

  if (planId === "Booking" || planId === "PRO") {
    parts.push(`${calendarCount} calendare/angajați`);
  }
  if (planId === "Consulting" || planId === "PRO") {
    parts.push(`${fluxCount} fluxuri`);
  }

  return parts.join(" · ");
}

function Stepper({
  label,
  value,
  min,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  onChange: (next: number) => void;
}) {
  return (
    <div className="calc-stepper">
      <span className="calc-stepper-label">{label}</span>
      <div className="calc-stepper-controls">
        <button
          type="button"
          className="calc-stepper-btn"
          aria-label={`Mai puține ${label}`}
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
        >
          −
        </button>
        <span className="calc-stepper-value" aria-live="polite">
          {value}
        </span>
        <button
          type="button"
          className="calc-stepper-btn"
          aria-label={`Mai multe ${label}`}
          onClick={() => onChange(value + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
}

export function Pricing() {
  const [activeTab, setActiveTab] = useState<PricingTab>("Booking");
  const [calendarCount, setCalendarCount] = useState<number>(
    PRICING_CONFIG.booking.included_units,
  );
  const [fluxCount, setFluxCount] = useState<number>(
    PRICING_CONFIG.consulting.included_units,
  );
  const [missedPerWeek, setMissedPerWeek] = useState(3);

  const monthlyPrice = useMemo(() => {
    if (activeTab === "SMS Marketing") return 0;
    if (activeTab === "Booking") return calcBookingMonthly(calendarCount);
    if (activeTab === "Consulting") return calcConsultingMonthly(fluxCount);
    return calcProMonthly(calendarCount, fluxCount);
  }, [activeTab, calendarCount, fluxCount]);

  const monthlyLoss = calcMonthlyLoss(missedPerWeek);

  const switchTab = (tab: PricingTab) => {
    setActiveTab(tab);
    if (tab === "Booking" || tab === "PRO") {
      setCalendarCount(PRICING_CONFIG.booking.included_units);
    }
    if (tab === "Consulting" || tab === "PRO") {
      setFluxCount(PRICING_CONFIG.consulting.included_units);
    }
  };

  const selectPackage = (plan: PlanOption) => {
    if (plan === "SMS Marketing") {
      saveSelectedPlan(
        plan,
        `SMS Marketing — Taxă campanie ${formatLei(PRICING_CONFIG.sms.campaign_fee)} lei + TVA · de la ${PRICING_CONFIG.sms.per_unit} lei/SMS + TVA`,
      );
    } else if (plan === "Booking" || plan === "Consulting" || plan === "PRO") {
      saveSelectedPlan(
        plan,
        buildPlanSummary(plan, calendarCount, fluxCount, monthlyPrice),
      );
    } else {
      saveSelectedPlan(plan);
    }
    scrollToContact();
  };

  const showCalendars = activeTab === "Booking" || activeTab === "PRO";
  const showFlux = activeTab === "Consulting" || activeTab === "PRO";
  const isFeatured = activeTab === "PRO";

  const setup =
    activeTab === "Booking"
      ? PRICING_CONFIG.booking.setup
      : activeTab === "Consulting"
        ? PRICING_CONFIG.consulting.setup
        : activeTab === "PRO"
          ? PRICING_CONFIG.pro.setup
          : 0;

  const planDesc =
    activeTab === "Booking"
      ? PRICING_CONFIG.booking.desc
      : activeTab === "Consulting"
        ? PRICING_CONFIG.consulting.desc
        : activeTab === "PRO"
          ? PRICING_CONFIG.pro.desc
          : "";

  const includesText =
    activeTab === "Booking"
      ? PRICING_CONFIG.booking.includes
      : activeTab === "Consulting"
        ? PRICING_CONFIG.consulting.includes
        : `Include 1 locație, ${PRICING_CONFIG.booking.included_units} calendare și ${PRICING_CONFIG.consulting.included_units} fluxuri/angajați.`;

  const extrasText =
    activeTab === "Booking"
      ? PRICING_CONFIG.booking.extras
      : activeTab === "Consulting"
        ? PRICING_CONFIG.consulting.extras
        : `Cost în plus: +${PRICING_CONFIG.booking.extra_unit} lei/lună per calendar și +${PRICING_CONFIG.consulting.extra_unit} lei/lună per flux peste cele incluse.`;

  const baseMonthlyLabel =
    activeTab === "PRO"
      ? `${formatLei(PRICING_CONFIG.booking.monthly_base)} + ${formatLei(PRICING_CONFIG.consulting.monthly_base)} lei/lună (2 cal. + 2 flux.)`
      : activeTab === "Consulting"
        ? `${formatLei(PRICING_CONFIG.consulting.monthly_base)} lei/lună (primele 2 incluse)`
        : `${formatLei(PRICING_CONFIG.booking.monthly_base)} lei/lună (primele 2 incluse)`;

  return (
    <section id="preturi" className="section pricing">
      <div className="container">
        <p className="section-label">Prețuri</p>
        <h2 className="section-title">Calculator de preț &amp; estimare ROI</h2>
        <p className="section-lead">
          Set-up o singură dată, abonament lunar pe calendare/fluxuri — transparent,
          fără costuri ascunse. Ajustează numărul de calendare sau fluxuri și vezi
          costul lunar în timp real. Prețurile sunt afișate fără TVA.
        </p>

        <div className="pricing-calculator">
          <div className="pricing-tabs" role="tablist" aria-label="Pachete VIDIA">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`pricing-tab${activeTab === tab.id ? " is-active" : ""}${
                  tab.id === "PRO" ? " is-pro" : ""
                }`}
                onClick={() => switchTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div
            className={`pricing-calculator-panel${
              isFeatured ? " is-featured" : ""
            }${activeTab === "SMS Marketing" ? " is-sms" : ""}`}
            role="tabpanel"
          >
            {isFeatured && (
              <span className="plan-badge">{PRICING_CONFIG.pro.badge}</span>
            )}

            {activeTab === "SMS Marketing" ? (
              <div className="calc-sms">
                <h3 className="calc-title">SMS Marketing</h3>
                <div className="calc-setup-block">
                  <span className="plan-setup-label">Taxă campanie</span>
                  <p className="calc-price-line">
                    <span className="calc-price-value">
                      {formatLei(PRICING_CONFIG.sms.campaign_fee)}
                    </span>
                    <span className="calc-price-unit">
                      {PRICING_CONFIG.sms.campaign_note}
                    </span>
                  </p>
                </div>
                <p className="calc-meta">
                  Cost mesaje: de la <strong>{PRICING_CONFIG.sms.per_unit}</strong>{" "}
                  {PRICING_CONFIG.sms.per_unit_note}
                </p>
                <p className="calc-desc">{PRICING_CONFIG.sms.detail}</p>
                <button
                  type="button"
                  className="btn btn-ghost calc-cta"
                  onClick={() => selectPackage("SMS Marketing")}
                >
                  Solicită Pachetul
                </button>
              </div>
            ) : (
              <>
                <h3 className="calc-title">{activeTab}</h3>

                <div className="calc-setup-block">
                  <span className="plan-setup-label">Set-up</span>
                  <p className="calc-price-line">
                    <span className="calc-price-value">{formatLei(setup)}</span>
                    <span className="calc-price-unit">
                      lei + TVA · plată unică
                    </span>
                  </p>
                </div>

                <p className="calc-desc">{planDesc}</p>

                <div className="calc-options">
                  <p className="plan-options-label">Abonament lunar</p>
                  <p className="calc-base-price">{baseMonthlyLabel}</p>
                  <p className="calc-option-includes">{includesText}</p>
                  <p className="calc-option-extras">{extrasText}</p>
                </div>

                <div className="calc-steppers">
                  {showCalendars && (
                    <Stepper
                      label="Calendare / angajați"
                      value={calendarCount}
                      min={1}
                      onChange={setCalendarCount}
                    />
                  )}
                  {showFlux && (
                    <Stepper
                      label="Fluxuri"
                      value={fluxCount}
                      min={1}
                      onChange={setFluxCount}
                    />
                  )}
                </div>

                <div className="calc-monthly-total" aria-live="polite">
                  <span className="calc-monthly-label">
                    Abonament lunar estimat
                  </span>
                  <p className="calc-monthly-price">
                    <span>{formatLei(monthlyPrice)}</span> lei/lună
                  </p>
                  <span className="calc-monthly-note">+ TVA · fără set-up</span>
                </div>

                <div className="calc-roi">
                  <label className="calc-roi-label" htmlFor="roi-slider">
                    Programări pierdute pe săptămână
                  </label>
                  <div className="calc-roi-slider-row">
                    <input
                      id="roi-slider"
                      type="range"
                      min={0}
                      max={15}
                      step={1}
                      value={missedPerWeek}
                      onChange={(e) =>
                        setMissedPerWeek(Number(e.target.value))
                      }
                      className="calc-roi-slider"
                    />
                    <span className="calc-roi-value">{missedPerWeek}</span>
                  </div>
                  <p className="calc-roi-result">
                    Pierdere estimată:{" "}
                    <strong>{formatLei(monthlyLoss)} lei/lună</strong>.
                    {monthlyLoss > monthlyPrice ? (
                      <> VIDIA se amortizează în primele zile!</>
                    ) : (
                      <> Recuperezi investiția cu câteva programări în plus.</>
                    )}
                  </p>
                </div>

                {activeTab === "PRO" && (
                  <p className="plan-footnote">{PRICING_CONFIG.pro.footnote}</p>
                )}

                <button
                  type="button"
                  className={`btn calc-cta ${
                    isFeatured ? "btn-primary" : "btn-ghost"
                  }`}
                  onClick={() => selectPackage(activeTab)}
                >
                  Solicită Pachetul
                </button>
              </>
            )}
          </div>
        </div>

        <p className="pricing-custom-note">
          Ai nevoie de altceva?{" "}
          <button
            type="button"
            className="inline-link pricing-custom-btn"
            onClick={() => selectPackage("Personalizat")}
          >
            Solicită un pachet personalizat
          </button>
          .
        </p>

        <SignalField variant="constellation" />
      </div>
    </section>
  );
}
