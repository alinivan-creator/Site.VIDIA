import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { CONTACT_EMAIL, FORMSUBMIT_ENDPOINT } from "../contact";
import {
  PLAN_EVENT,
  PLAN_OPTIONS,
  clearSelectedPlan,
  readSelectedPlan,
  saveSelectedPlan,
  type PlanOption,
} from "../plans";
import { SignalWashMarks } from "./SignalWashMarks";

type FormState = {
  phone: string;
  email: string;
  businessType: string;
  plan: PlanOption | "";
};

const initial: FormState = {
  phone: "",
  email: "",
  businessType: "",
  plan: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(() => ({
    ...initial,
    plan: readSelectedPlan(),
  }));
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const applyPlan = (plan: PlanOption | "") => {
      if (!plan) return;
      setForm((prev) => ({ ...prev, plan }));
      setErrors((prev) => ({ ...prev, plan: undefined }));
    };

    applyPlan(readSelectedPlan());

    const onPlanSelected = (event: Event) => {
      const detail = (event as CustomEvent<{ plan: PlanOption }>).detail;
      if (detail?.plan) applyPlan(detail.plan);
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

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `Solicitare VIDIA — ${form.plan}`,
          _template: "table",
          _captcha: false,
          _replyto: form.email.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          businessType: form.businessType.trim(),
          plan: form.plan,
          message: [
            `Telefon: ${form.phone.trim()}`,
            `E-mail: ${form.email.trim()}`,
            `Tip afacere: ${form.businessType.trim()}`,
            `Plan dorit: ${form.plan}`,
          ].join("\n"),
        }),
      });

      const data = (await response.json().catch(() => null)) as {
        success?: string | boolean;
        message?: string;
      } | null;

      if (!response.ok) {
        throw new Error(data?.message || "FormSubmit error");
      }

      clearSelectedPlan();
      setSubmitted(true);
      setForm(initial);
    } catch {
      setSubmitError(
        `Nu am putut trimite solicitarea. Încearcă din nou sau scrie-ne la ${CONTACT_EMAIL}.`,
      );
    } finally {
      setSubmitting(false);
    }
  };

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
                  Am primit solicitarea. Te sunăm sau îți scriem în curând pe
                  e-mail / telefon.
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
                      setForm({ ...form, plan: value });
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
                </div>

                {submitError && (
                  <p className="form-submit-error" role="alert">
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  className="btn btn-primary submit-btn"
                  disabled={submitting}
                >
                  {submitting ? "Se trimite…" : "Trimite solicitarea"}
                </button>
              </form>
            )}
          </div>

          <aside
            id="gdpr"
            className="gdpr-panel gdpr-panel-below"
            aria-labelledby="gdpr-title"
          >
            <p className="gdpr-kicker">GDPR</p>
            <h3 id="gdpr-title">Conformitate și consimțământ, integrate nativ</h3>
            <p>
              Aspectul de conformitate legală și consimțământul clienților este
              deja rezolvat și integrat nativ în platformă. Nu trebuie să
              construiești fluxuri GDPR de la zero — VIDIA le include din start,
              astfel încât comunicarea cu clienții tăi să rămână clară, corectă
              și în siguranță.
            </p>
            <p className="gdpr-links">
              Documente legale:{" "}
              <Link to="/confidentialitate">Politica de Confidențialitate</Link>
              {" · "}
              <Link to="/termeni">Termeni și Condiții</Link>
              {" · "}
              <Link to="/cookies">Politica de Cookies</Link>
            </p>
          </aside>
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
