import { useMemo, useState } from "react";
import { SignalField } from "./SignalField";
import { saveSelectedPlan, scrollToContact, type PlanOption } from "../plans";

// ——— Prețuri configurate (sursă unică) ———
const PRICING_CONFIG = {
  booking: {
    setup: 1880,
    op1_base: 1188,
    op2_base: 2438,
    op1_locations: 1,
    op2_locations: 2,
    op1_included_calendars: 2,
    op2_included_calendars: 4,
    extra_calendar: 100,
    desc: "Include programări nelimitate 24/7 pe WhatsApp.",
  },
  consulting: {
    setup: 1500,
    op1_base: 1150,
    op2_base: 2350,
    op1_locations: 1,
    op2_locations: 2,
    op1_included_flux: 2,
    op2_included_flux: 4,
    extra_flux: 80,
    desc: "Include conversații, triaj și interacțiuni nelimitate.",
    monthly_note: "(-20% față de Booking)",
  },
  pro: {
    setup: 2250,
    op1_base: 3338,
    op2_base: 788,
    op1_locations: 1,
    op2_locations: 2,
    op1_included_calendars: 2,
    op2_included_calendars: 4,
    op1_included_flux: 2,
    op2_included_flux: 4,
    extra_calendar: 100,
    extra_flux: 80,
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
type PlanOptionIndex = 0 | 1;
type PricingTab = SubscriptionPlanId | "SMS Marketing";

type SubscriptionOption = {
  label: string;
  monthly: number;
  locations: number;
  calendars: number;
  flux: number;
  includes: string;
  extras: string;
};

type SubscriptionPlanView = {
  setup: number;
  desc: string;
  monthlyNote?: string;
  footnote?: string;
  featured?: boolean;
  badge?: string;
  extraCalendar?: number;
  extraFlux?: number;
  options: [SubscriptionOption, SubscriptionOption];
};

const SUBSCRIPTION_PLANS: Record<SubscriptionPlanId, SubscriptionPlanView> = {
  Booking: {
    setup: PRICING_CONFIG.booking.setup,
    desc: PRICING_CONFIG.booking.desc,
    extraCalendar: PRICING_CONFIG.booking.extra_calendar,
    options: [
      {
        label: "Opțiunea 1",
        monthly: PRICING_CONFIG.booking.op1_base,
        locations: PRICING_CONFIG.booking.op1_locations,
        calendars: PRICING_CONFIG.booking.op1_included_calendars,
        flux: 0,
        includes: `Include ${PRICING_CONFIG.booking.op1_locations} locație și ${PRICING_CONFIG.booking.op1_included_calendars} calendare/angajați.`,
        extras: `Cost în plus: +${PRICING_CONFIG.booking.extra_calendar} lei/lună per calendar/angajat nou.`,
      },
      {
        label: "Opțiunea 2",
        monthly: PRICING_CONFIG.booking.op2_base,
        locations: PRICING_CONFIG.booking.op2_locations,
        calendars: PRICING_CONFIG.booking.op2_included_calendars,
        flux: 0,
        includes: `Include ${PRICING_CONFIG.booking.op2_locations} locații și ${PRICING_CONFIG.booking.op2_included_calendars} calendare/angajați.`,
        extras: `Cost în plus: +${PRICING_CONFIG.booking.extra_calendar} lei/lună per calendar/angajat nou.`,
      },
    ],
  },
  Consulting: {
    setup: PRICING_CONFIG.consulting.setup,
    desc: PRICING_CONFIG.consulting.desc,
    monthlyNote: PRICING_CONFIG.consulting.monthly_note,
    extraFlux: PRICING_CONFIG.consulting.extra_flux,
    options: [
      {
        label: "Opțiunea 1",
        monthly: PRICING_CONFIG.consulting.op1_base,
        locations: PRICING_CONFIG.consulting.op1_locations,
        calendars: 0,
        flux: PRICING_CONFIG.consulting.op1_included_flux,
        includes: `Include ${PRICING_CONFIG.consulting.op1_locations} locație și ${PRICING_CONFIG.consulting.op1_included_flux} fluxuri/angajați.`,
        extras: `Cost în plus: +${PRICING_CONFIG.consulting.extra_flux} lei/lună per flux/angajat nou.`,
      },
      {
        label: "Opțiunea 2",
        monthly: PRICING_CONFIG.consulting.op2_base,
        locations: PRICING_CONFIG.consulting.op2_locations,
        calendars: 0,
        flux: PRICING_CONFIG.consulting.op2_included_flux,
        includes: `Include ${PRICING_CONFIG.consulting.op2_locations} locații și ${PRICING_CONFIG.consulting.op2_included_flux} fluxuri/angajați.`,
        extras: `Cost în plus: +${PRICING_CONFIG.consulting.extra_flux} lei/lună per flux/angajat nou.`,
      },
    ],
  },
  PRO: {
    setup: PRICING_CONFIG.pro.setup,
    desc: PRICING_CONFIG.pro.desc,
    featured: true,
    badge: PRICING_CONFIG.pro.badge,
    footnote: PRICING_CONFIG.pro.footnote,
    extraCalendar: PRICING_CONFIG.pro.extra_calendar,
    extraFlux: PRICING_CONFIG.pro.extra_flux,
    options: [
      {
        label: "Opțiunea 1",
        monthly: PRICING_CONFIG.pro.op1_base,
        locations: PRICING_CONFIG.pro.op1_locations,
        calendars: PRICING_CONFIG.pro.op1_included_calendars,
        flux: PRICING_CONFIG.pro.op1_included_flux,
        includes: `Include ${PRICING_CONFIG.pro.op1_locations} locație, ${PRICING_CONFIG.pro.op1_included_calendars} calendare și ${PRICING_CONFIG.pro.op1_included_flux} fluxuri/angajați.`,
        extras: `Cost în plus: +${PRICING_CONFIG.pro.extra_calendar} lei/lună per calendar nou și +${PRICING_CONFIG.pro.extra_flux} lei/lună per flux nou.`,
      },
      {
        label: "Opțiunea 2",
        monthly: PRICING_CONFIG.pro.op2_base,
        locations: PRICING_CONFIG.pro.op2_locations,
        calendars: PRICING_CONFIG.pro.op2_included_calendars,
        flux: PRICING_CONFIG.pro.op2_included_flux,
        includes: `Include ${PRICING_CONFIG.pro.op2_locations} locații, ${PRICING_CONFIG.pro.op2_included_calendars} calendare și ${PRICING_CONFIG.pro.op2_included_flux} fluxuri/angajați.`,
        extras: `Cost în plus: +${PRICING_CONFIG.pro.extra_calendar} lei/lună per calendar nou și +${PRICING_CONFIG.pro.extra_flux} lei/lună per flux nou.`,
      },
    ],
  },
};

const TABS: { id: PricingTab; label: string }[] = [
  { id: "Booking", label: "Booking" },
  { id: "Consulting", label: "Consulting" },
  { id: "PRO", label: "PRO" },
  { id: "SMS Marketing", label: "SMS" },
];

function formatLei(amount: number): string {
  return amount.toLocaleString("ro-RO");
}

function calcMonthlyPrice(
  planId: SubscriptionPlanId,
  optionIndex: PlanOptionIndex,
  calendarCount: number,
  fluxCount: number,
): number {
  const plan = SUBSCRIPTION_PLANS[planId];
  const option = plan.options[optionIndex];
  let total = option.monthly;

  if (plan.extraCalendar && option.calendars > 0) {
    total +=
      Math.max(0, calendarCount - option.calendars) * plan.extraCalendar;
  }
  if (plan.extraFlux && option.flux > 0) {
    total += Math.max(0, fluxCount - option.flux) * plan.extraFlux;
  }

  return total;
}

function calcMonthlyLoss(missedPerWeek: number): number {
  return Math.round(
    missedPerWeek * 4 * PRICING_CONFIG.roi.avg_appointment_lei,
  );
}

function buildPlanSummary(
  planId: SubscriptionPlanId,
  optionIndex: PlanOptionIndex,
  calendarCount: number,
  fluxCount: number,
  monthly: number,
): string {
  const plan = SUBSCRIPTION_PLANS[planId];
  const option = plan.options[optionIndex];
  const parts = [
    `${planId} — ${option.label}`,
    `Set-up: ${formatLei(plan.setup)} lei + TVA`,
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
  const [optionIndex, setOptionIndex] = useState<PlanOptionIndex>(0);
  const [calendarCount, setCalendarCount] = useState<number>(
    PRICING_CONFIG.booking.op1_included_calendars,
  );
  const [fluxCount, setFluxCount] = useState<number>(
    PRICING_CONFIG.consulting.op1_included_flux,
  );
  const [missedPerWeek, setMissedPerWeek] = useState(3);

  const subscriptionPlan =
    activeTab !== "SMS Marketing" ? SUBSCRIPTION_PLANS[activeTab] : null;
  const selectedOption = subscriptionPlan?.options[optionIndex];

  const monthlyPrice = useMemo(() => {
    if (activeTab === "SMS Marketing") return 0;
    return calcMonthlyPrice(
      activeTab,
      optionIndex,
      calendarCount,
      fluxCount,
    );
  }, [activeTab, optionIndex, calendarCount, fluxCount]);

  const monthlyLoss = calcMonthlyLoss(missedPerWeek);

  const switchTab = (tab: PricingTab) => {
    setActiveTab(tab);
    if (tab !== "SMS Marketing") {
      const plan = SUBSCRIPTION_PLANS[tab];
      const opt = plan.options[0];
      setOptionIndex(0);
      setCalendarCount(opt.calendars || PRICING_CONFIG.booking.op1_included_calendars);
      setFluxCount(opt.flux || PRICING_CONFIG.consulting.op1_included_flux);
    }
  };

  const switchOption = (index: PlanOptionIndex) => {
    if (activeTab === "SMS Marketing" || !subscriptionPlan) return;
    const opt = subscriptionPlan.options[index];
    setOptionIndex(index);
    if (opt.calendars > 0) setCalendarCount(opt.calendars);
    if (opt.flux > 0) setFluxCount(opt.flux);
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
        buildPlanSummary(
          plan,
          optionIndex,
          calendarCount,
          fluxCount,
          monthlyPrice,
        ),
      );
    } else {
      saveSelectedPlan(plan);
    }
    scrollToContact();
  };

  const showCalendars = activeTab === "Booking" || activeTab === "PRO";
  const showFlux = activeTab === "Consulting" || activeTab === "PRO";
  const calendarMin = selectedOption?.calendars ?? PRICING_CONFIG.booking.op1_included_calendars;
  const fluxMin = selectedOption?.flux ?? PRICING_CONFIG.consulting.op1_included_flux;
  const isFeatured = subscriptionPlan?.featured ?? false;

  return (
    <section id="preturi" className="section pricing">
      <div className="container">
        <p className="section-label">Prețuri</p>
        <h2 className="section-title">Calculator de preț &amp; estimare ROI</h2>
        <p className="section-lead">
          Set-up o singură dată, abonament lunar pe opțiuni — transparent, fără
          costuri ascunse. Ajustează calendarele sau fluxurile și vezi costul
          lunar în timp real. Prețurile sunt afișate fără TVA, dacă nu e indicat
          altfel.
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
            {isFeatured && subscriptionPlan?.badge && (
              <span className="plan-badge">{subscriptionPlan.badge}</span>
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
                  Solicită pachetul selectat
                </button>
              </div>
            ) : (
              subscriptionPlan &&
              selectedOption && (
                <>
                  <h3 className="calc-title">{activeTab}</h3>

                  <div className="calc-setup-block">
                    <span className="plan-setup-label">Set-up</span>
                    <p className="calc-price-line">
                      <span className="calc-price-value">
                        {formatLei(subscriptionPlan.setup)}
                      </span>
                      <span className="calc-price-unit">
                        lei + TVA · plată unică
                      </span>
                    </p>
                  </div>

                  <p className="calc-desc">{subscriptionPlan.desc}</p>

                  <div className="calc-options">
                    <div className="calc-options-heading">
                      <p className="plan-options-label">Abonament lunar</p>
                      {subscriptionPlan.monthlyNote && (
                        <p className="plan-options-note">
                          {subscriptionPlan.monthlyNote}
                        </p>
                      )}
                    </div>
                    <div className="calc-option-toggle">
                      {subscriptionPlan.options.map((option, index) => (
                        <button
                          key={option.label}
                          type="button"
                          className={`calc-option-btn${
                            optionIndex === index ? " is-selected" : ""
                          }`}
                          aria-pressed={optionIndex === index}
                          onClick={() => switchOption(index as PlanOptionIndex)}
                        >
                          <span className="calc-option-btn-label">
                            {option.label}
                          </span>
                          <span className="calc-option-btn-price">
                            {formatLei(option.monthly)} lei/lună
                          </span>
                        </button>
                      ))}
                    </div>
                    <p className="calc-option-includes">
                      {selectedOption.includes}
                    </p>
                    <p className="calc-option-extras">{selectedOption.extras}</p>
                  </div>

                  <div className="calc-steppers">
                    {showCalendars && (
                      <Stepper
                        label="Calendare / angajați"
                        value={calendarCount}
                        min={calendarMin}
                        onChange={setCalendarCount}
                      />
                    )}
                    {showFlux && (
                      <Stepper
                        label="Fluxuri"
                        value={fluxCount}
                        min={fluxMin}
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

                  {subscriptionPlan.footnote && (
                    <p className="plan-footnote">{subscriptionPlan.footnote}</p>
                  )}

                  <button
                    type="button"
                    className={`btn calc-cta ${
                      isFeatured ? "btn-primary" : "btn-ghost"
                    }`}
                    onClick={() => selectPackage(activeTab)}
                  >
                    Solicită pachetul selectat
                  </button>
                </>
              )
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
