import { useEffect, useState, type FormEvent } from "react";
import {
  CONTACT_EMAIL,
  WEB3FORMS_ACCESS_KEY,
  WEB3FORMS_ENDPOINT,
  buildLeadMailto,
  MAILTO_URL,
} from "../contact";
import {
  PLAN_EVENT,
  PLAN_OPTIONS,
  clearSelectedPlan,
  readSelectedPlan,
  readSelectedPlanDetails,
  saveSelectedPlan,
  type PlanOption,
} from "../plans";
import { SignalWashMarks } from "./SignalWashMarks";
import { CompliancePanel } from "./CompliancePanel";

type FormState = {
  phone: string;
  email: string;
  businessType: string;
  plan: PlanOption | "";
  planDetails: string;
  honey: string;
};

const initial: FormState = {
  phone: "",
  email: "",
  businessType: "",
  plan: "",
  planDetails: "",
  honey: "",
};

const hasWeb3FormsKey = Boolean(WEB3FORMS_ACCESS_KEY);

export function ContactForm() {
  const [form, setForm] = useState<FormState>(() => ({
    ...initial,
    plan: readSelectedPlan(),
    planDetails: readSelectedPlanDetails(),
  }));
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const applyPlan = (plan: PlanOption | "", details?: string) => {
      if (!plan) return;
      setForm((prev) => ({
        ...prev,
        plan,
        planDetails: details ?? prev.planDetails,
      }));
      setErrors((prev) => ({ ...prev, plan: undefined }));
    };

    applyPlan(readSelectedPlan(), readSelectedPlanDetails());

    const onPlanSelected = (event: Event) => {
      const detail = (
        event as CustomEvent<{ plan: PlanOption; details?: string }>
      ).detail;
      if (detail?.plan) applyPlan(detail.plan, detail.details);
    };

    window.addEventListener(PLAN_EVENT, onPlanSelected);
    return () => window.removeEventListener(PLAN_EVENT, onPlanSelected);
  }, []);

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    const phoneDigits = form.phone.replace(/\D/g, "");

    if (phoneDigits.length < 10) {
      next.phone = "Introdu un număr de telefon valid.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = "Introdu o adresă de e-mail validă.";
    }
    if (form.businessType.trim().length < 2) {
      next.businessType = "Spune-ne ce tip de afacere ai.";
    }
    if (!form.plan) {
      next.plan = "Alege planul dorit.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const leadFields = () => ({
    phone: form.phone.trim(),
    email: form.email.trim(),
    businessType: form.businessType.trim(),
    plan: form.plan,
    planDetails: form.planDetails.trim() || undefined,
  });

  const onMailtoSubmit = () => {
    if (!validate()) return;
    if (form.honey.trim()) {
      setSubmitted(true);
      setForm(initial);
      return;
    }
    const fields = leadFields();
    window.location.href = buildLeadMailto(fields);
    clearSelectedPlan();
    setSubmitted(true);
    setForm(initial);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    // Honeypot: bots that fill hidden fields are ignored silently.
    if (form.honey.trim()) {
      setSubmitted(true);
      setForm(initial);
      return;
    }

    if (!hasWeb3FormsKey || !WEB3FORMS_ACCESS_KEY) {
      onMailtoSubmit();
      return;
    }

    const fields = leadFields();
    setSubmitting(true);
    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Solicitare VIDIA — ${fields.plan}`,
          from_name: "Site VIDIA",
          email: fields.email,
          phone: fields.phone,
          businessType: fields.businessType,
          plan: fields.plan,
          message: [
            `Telefon: ${fields.phone}`,
            `E-mail: ${fields.email}`,
            `Tip afacere: ${fields.businessType}`,
            `Plan dorit: ${fields.plan}`,
            ...(fields.planDetails
              ? [`Detalii pachet: ${fields.planDetails}`]
              : []),
          ].join("\n"),
        }),
      });

      const data = (await response.json().catch(() => null)) as {
        success?: boolean;
        message?: string;
      } | null;

      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "Web3Forms error");
      }

      clearSelectedPlan();
      setSubmitted(true);
      setForm(initial);
    } catch {
      setSubmitError(
        `Nu am putut trimite solicitarea online. Folosește butonul de e-mail de mai jos sau scrie-ne la ${CONTACT_EMAIL}.`,
      );
    } finally {
      setSubmitting(false);
    }
  };

  const mailtoHref = form.plan
    ? buildLeadMailto(leadFields())
    : MAILTO_URL;

  return (
    <section id="contact" className="section contact signal-wash">
      <SignalWashMarks />
      <div className="container contact-stage">
        <div className="contact-deco contact-deco-left" aria-hidden="true">
          <span className="deco-icon">✂️</span>
          <div className="deco-bubble deco-bubble-out">
            Salut! Am liber mâine la 14:30 🕒
          </div>
          <span className="deco-icon">🦷</span>
          <div className="deco-bubble deco-bubble-in">
            Ce acte îmi trebuie pentru un PFA?
          </div>
          <div className="deco-bubble deco-bubble-out">
            💬 Un consultant te sună azi!
          </div>
          <span className="deco-icon">🚗</span>
          <div className="deco-bubble deco-bubble-in">Se poate și sâmbătă?</div>
          <span className="deco-icon deco-logo">V</span>
        </div>

        <div className="contact-main">
          <div className="contact-heading">
            <p className="section-label">Contact</p>
            <h2 className="section-title">Hai să-ți simplificăm programările.</h2>
          </div>

          <div className="contact-panel">
            {submitted ? (
              <div className="contact-success" role="status">
                <h3>Mulțumim!</h3>
                <p>
                  {hasWeb3FormsKey
                    ? "Am primit solicitarea. Te sunăm sau îți scriem în curând pe e-mail / telefon."
                    : "Ți-am deschis clientul de e-mail cu solicitarea precompletată. Trimite mesajul către contact@getvidia.ro ca să ne ajungă lead-ul."}
                </p>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setSubmitted(false)}
                >
                  Trimite altă solicitare
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={onSubmit} noValidate>
                {hasWeb3FormsKey ? (
                  <p className="form-activation-note">
                    Solicitarea ajunge direct la {CONTACT_EMAIL} (Web3Forms).
                    Dacă ceva nu merge, folosește butonul de e-mail de mai jos.
                  </p>
                ) : (
                  <p className="form-activation-note">
                    Trimiterea online nu e încă configurată (lipsește cheia
                    Web3Forms). Completează formularul și apasă „Trimite prin
                    e-mail” — se deschide clientul tău de mail cu telefon,
                    e-mail, tip afacere și plan, către {CONTACT_EMAIL}.
                  </p>
                )}

                {/* Honeypot — ascuns de utilizatori, nu completa */}
                <div className="field-honey" aria-hidden="true">
                  <label htmlFor="company_website">Website</label>
                  <input
                    id="company_website"
                    name="_honey"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.honey}
                    onChange={(e) =>
                      setForm({ ...form, honey: e.target.value })
                    }
                  />
                </div>

                <div className="field">
                  <label htmlFor="phone">Număr de telefon</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="07xx xxx xxx"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    aria-invalid={Boolean(errors.phone)}
                    required
                    disabled={submitting}
                  />
                  {errors.phone && (
                    <span className="field-error">{errors.phone}</span>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="email">Adresă de e-mail</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="nume@afacerea.ro"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    aria-invalid={Boolean(errors.email)}
                    required
                    disabled={submitting}
                  />
                  {errors.email && (
                    <span className="field-error">{errors.email}</span>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="businessType">Tip afacere</label>
                  <input
                    id="businessType"
                    name="businessType"
                    type="text"
                    placeholder="ex: clinică stomatologică, salon, stație ITP"
                    value={form.businessType}
                    onChange={(e) =>
                      setForm({ ...form, businessType: e.target.value })
                    }
                    aria-invalid={Boolean(errors.businessType)}
                    required
                    disabled={submitting}
                  />
                  {errors.businessType && (
                    <span className="field-error">{errors.businessType}</span>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="plan">Plan dorit</label>
                  <select
                    id="plan"
                    name="plan"
                    className={`field-select${form.plan ? "" : " is-placeholder"}`}
                    value={form.plan}
                    onChange={(e) => {
                      const value = e.target.value as PlanOption | "";
                      setForm({ ...form, plan: value, planDetails: "" });
                      if (value) saveSelectedPlan(value);
                    }}
                    aria-invalid={Boolean(errors.plan)}
                    required
                    disabled={submitting}
                  >
                    <option value="" disabled>
                      Alege un plan
                    </option>
                    {PLAN_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.plan && (
                    <span className="field-error">{errors.plan}</span>
                  )}
                  {form.planDetails && (
                    <p className="field-plan-details">{form.planDetails}</p>
                  )}
                </div>

                {submitError && (
                  <div className="form-submit-error" role="alert">
                    <p>{submitError}</p>
                    <a className="form-fallback-link" href={mailtoHref}>
                      Trimite prin e-mail (mailto)
                    </a>
                  </div>
                )}

                {hasWeb3FormsKey ? (
                  <button
                    type="submit"
                    className="btn btn-primary submit-btn"
                    disabled={submitting}
                  >
                    {submitting ? "Se trimite…" : "Trimite solicitarea"}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary submit-btn"
                    onClick={onMailtoSubmit}
                  >
                    Trimite prin e-mail
                  </button>
                )}

                <p className="form-fallback">
                  {hasWeb3FormsKey ? (
                    <>
                      Nu merge formularul?{" "}
                      <a href={mailtoHref}>
                        Deschide e-mail precompletat către {CONTACT_EMAIL}
                      </a>
                    </>
                  ) : (
                    <>
                      Alternativ:{" "}
                      <a href={MAILTO_URL}>scrie-ne direct la {CONTACT_EMAIL}</a>
                    </>
                  )}
                </p>
              </form>
            )}
          </div>

          <CompliancePanel variant="aside" />
        </div>

        <div className="contact-deco contact-deco-right" aria-hidden="true">
          <div className="deco-bubble deco-bubble-out">
            ✅ Programarea ta este salvată!
          </div>
          <span className="deco-icon">💅</span>
          <div className="deco-bubble deco-bubble-in">
            Cât durează un detartraj?
          </div>
          <span className="deco-icon">🐶</span>
          <div className="deco-bubble deco-bubble-out">
            📩 SMS: -20% la albire, până vineri!
          </div>
          <span className="deco-icon">💆</span>
          <div className="deco-bubble deco-bubble-in">Mulțumesc! 🙌</div>
          <span className="deco-icon">🔧</span>
          <div className="deco-bubble deco-bubble-out">
            📍 Ne găsești pe Str. Victoriei 12
          </div>
        </div>

        <div className="contact-deco-mobile" aria-hidden="true">
          <div className="deco-mobile-row">
            <span className="deco-icon">✂️</span>
            <div className="deco-bubble deco-bubble-out">
              ✅ Programarea ta este salvată!
            </div>
            <span className="deco-icon">🦷</span>
          </div>
          <div className="deco-mobile-row">
            <span className="deco-icon">💆</span>
            <div className="deco-bubble deco-bubble-in">Se poate și sâmbătă?</div>
            <span className="deco-icon">🔧</span>
            <div className="deco-bubble deco-bubble-out">
              📅 Te-am programat pentru vineri!
            </div>
          </div>
          <div className="deco-mobile-row">
            <span className="deco-icon deco-logo">V</span>
            <div className="deco-bubble deco-bubble-in">
              Ce acte îmi trebuie pentru un PFA?
            </div>
            <div className="deco-bubble deco-bubble-out">
              📩 SMS: -20% la albire!
            </div>
          </div>
          <div className="deco-mobile-row">
            <span className="deco-icon">🚗</span>
            <div className="deco-bubble deco-bubble-in">Mulțumesc! 🙌</div>
            <span className="deco-icon">💅</span>
            <span className="deco-icon">🐶</span>
          </div>
        </div>
      </div>
    </section>
  );
}
