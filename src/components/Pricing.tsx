import { SignalField } from "./SignalField";
import { saveSelectedPlan, scrollToContact, type PlanOption } from "../plans";

type MonthlyOption = {
  label: string;
  price: string;
  includes: string;
  extras: string;
};

type PricingPlan = {
  id: PlanOption;
  name: string;
  desc: string;
  featured: boolean;
  badge?: string;
  pricing:
    | {
        kind: "subscription";
        setup: string;
        setupNote: string;
        monthlyNote?: string;
        options: MonthlyOption[];
        footnote?: string;
      }
    | {
        kind: "sms";
        campaignFee: string;
        campaignNote: string;
        perUnit: string;
        perUnitNote: string;
        detail: string;
      };
};

const plans: PricingPlan[] = [
  {
    id: "Booking",
    name: "Booking",
    desc: "Include programări nelimitate 24/7 pe WhatsApp.",
    pricing: {
      kind: "subscription",
      setup: "1.500",
      setupNote: "lei + TVA · plată unică",
      options: [
        {
          label: "Opțiunea 1",
          price: "150",
          includes: "Include 1 locație și 2 calendare/angajați.",
          extras: "Cost în plus: +80 lei/lună per calendar/angajat nou.",
        },
        {
          label: "Opțiunea 2",
          price: "350",
          includes: "Include 2 locații și 4 calendare/angajați.",
          extras: "Cost în plus: +80 lei/lună per calendar/angajat nou.",
        },
      ],
    },
    featured: false,
  },
  {
    id: "Consulting",
    name: "Consulting",
    desc: "Include conversații, triaj și interacțiuni nelimitate.",
    pricing: {
      kind: "subscription",
      setup: "1.200",
      setupNote: "lei + TVA · plată unică",
      monthlyNote: "(-20% față de Booking)",
      options: [
        {
          label: "Opțiunea 1",
          price: "120",
          includes: "Include 1 locație și 2 fluxuri/angajați.",
          extras: "Cost în plus: +64 lei/lună per flux/angajat nou.",
        },
        {
          label: "Opțiunea 2",
          price: "280",
          includes: "Include 2 locații și 4 fluxuri/angajați.",
          extras: "Cost în plus: +64 lei/lună per flux/angajat nou.",
        },
      ],
    },
    featured: false,
  },
  {
    id: "PRO",
    name: "PRO",
    desc: "Include ambele sisteme complet integrate, cu programări și conversații nelimitate.",
    pricing: {
      kind: "subscription",
      setup: "1.799",
      setupNote: "lei + TVA · plată unică",
      options: [
        {
          label: "Opțiunea 1",
          price: "270",
          includes: "Include 1 locație, 2 calendare și 2 fluxuri/angajați.",
          extras:
            "Cost în plus: +80 lei/lună per calendar nou și +64 lei/lună per flux nou.",
        },
        {
          label: "Opțiunea 2",
          price: "630",
          includes: "Include 2 locații, 4 calendare și 4 fluxuri/angajați.",
          extras:
            "Cost în plus: +80 lei/lună per calendar nou și +64 lei/lună per flux nou.",
        },
      ],
      footnote:
        "SMS Marketing inclus fără taxă de campanie — plătești doar mesajele trimise (de la 2.00 lei / SMS + TVA).",
    },
    featured: true,
    badge: "Cel mai avantajos",
  },
  {
    id: "SMS Marketing",
    name: "SMS Marketing",
    desc: "",
    pricing: {
      kind: "sms",
      campaignFee: "299",
      campaignNote:
        "lei + TVA · doar în lunile în care lansezi, fără abonament obligatoriu",
      perUnit: "2.00",
      perUnitNote: "lei / SMS + TVA",
      detail: "Nu necesită deținerea unui plan VIDIA, disponibil la cerere.",
    },
    featured: false,
  },
];

export function Pricing() {
  const selectPlan = (plan: PlanOption) => {
    saveSelectedPlan(plan);
    scrollToContact();
  };

  return (
    <section id="preturi" className="section pricing">
      <div className="container">
        <p className="section-label">Prețuri</p>
        <h2 className="section-title">Pachete clare, fără surprize.</h2>
        <p className="section-lead">
          Set-up o singură dată, abonament lunar pe opțiuni — transparent, fără
          costuri ascunse. Prețurile de set-up și abonamentele sunt afișate fără
          TVA, dacă nu e indicat altfel.
        </p>

        <div className="pricing-stage">
          {/* Desktop-only: faint calendar-slot diamonds in card gutters */}
          <div className="pricing-gutter-slots" aria-hidden="true">
            <div className="pricing-gutter pricing-gutter--1">
              <span />
              <span />
              <span />
            </div>
            <div className="pricing-gutter pricing-gutter--2">
              <span />
              <span />
              <span />
            </div>
            <div className="pricing-gutter pricing-gutter--3">
              <span />
              <span />
              <span />
            </div>
          </div>

          <div className="pricing-grid">
          {plans.map((plan) => (
            <article
              key={plan.id}
              className={`price-plan ${plan.featured ? "is-featured" : ""} ${
                plan.pricing.kind === "sms" ? "price-plan--sms" : ""
              }`}
            >
              {plan.pricing.kind === "sms" && (
                <div className="sms-wave" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              )}
              {plan.featured && plan.badge && (
                <span className="plan-badge">{plan.badge}</span>
              )}
              <h3>{plan.name}</h3>

              {plan.pricing.kind === "subscription" ? (
                <div className="plan-price-block">
                  <div className="plan-setup">
                    <span className="plan-setup-label">Set-up</span>
                    <p className="plan-price">
                      <span>{plan.pricing.setup}</span>{" "}
                      <span className="plan-price-unit">
                        {plan.pricing.setupNote}
                      </span>
                    </p>
                  </div>

                  <p className="plan-desc">{plan.desc}</p>

                  <div className="plan-options">
                    <div className="plan-options-heading">
                      <p className="plan-options-label">Abonament lunar</p>
                      {plan.pricing.monthlyNote && (
                        <p className="plan-options-note">
                          {plan.pricing.monthlyNote}
                        </p>
                      )}
                    </div>
                    <dl className="plan-options-list">
                      {plan.pricing.options.map((option) => (
                        <div key={option.label} className="plan-option">
                          <dt>
                            <span className="plan-option-label">
                              {option.label}
                            </span>
                            <span className="plan-option-price">
                              {option.price} lei/lună
                            </span>
                          </dt>
                          <dd>
                            <span className="plan-option-includes">
                              {option.includes}
                            </span>
                            <span className="plan-option-extras">
                              {option.extras}
                            </span>
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  {plan.pricing.footnote && (
                    <p className="plan-footnote">{plan.pricing.footnote}</p>
                  )}
                </div>
              ) : (
                <div className="plan-price-block plan-price-block--module">
                  <div className="plan-setup">
                    <span className="plan-setup-label">Taxă campanie</span>
                    <p className="plan-price">
                      <span>{plan.pricing.campaignFee}</span>{" "}
                      <span className="plan-price-unit">
                        {plan.pricing.campaignNote}
                      </span>
                    </p>
                  </div>
                  <p className="plan-price-meta plan-price-meta--sms">
                    Cost mesaje: de la <strong>{plan.pricing.perUnit}</strong>{" "}
                    {plan.pricing.perUnitNote}
                  </p>
                  <p className="plan-desc">{plan.pricing.detail}</p>
                </div>
              )}

              <button
                type="button"
                className={`btn ${plan.featured ? "btn-primary" : "btn-ghost"}`}
                onClick={() => selectPlan(plan.id)}
              >
                Solicită {plan.name}
              </button>
            </article>
          ))}
          </div>
        </div>

        <p className="pricing-custom-note">
          Ai nevoie de altceva?{" "}
          <button
            type="button"
            className="inline-link pricing-custom-btn"
            onClick={() => selectPlan("Personalizat")}
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
