import { Link } from "react-router-dom";
import { SignalField } from "./SignalField";
import { ENCOURAGEMENT_QUOTE } from "../content/encouragement-quote";

/** Regulamentul (UE) 2024/1689 — EU AI Act, versiune RO pe EUR-Lex. */
export const EU_AI_ACT_URL =
  "https://eur-lex.europa.eu/legal-content/RO/TXT/?uri=CELEX:32024R1689";

type CompliancePanelProps = {
  /** band = deasupra contactului; aside = sub formular; compact = subsol */
  variant?: "band" | "aside" | "compact";
  className?: string;
};

function ComplianceBandContent() {
  return (
    <>
      <p className="section-label">Legal</p>
      <h2 id="compliance-band-title" className="section-title compliance-band-title">
        Transparență &amp; Conformitate
      </h2>
      <div className="compliance-band-body">
        <p>
          VIDIA operează în conformitate cu Regulamentul (UE) 2016/679 (GDPR) și cu
          cerințele aplicabile din 2026 privind protecția datelor personale, precum
          și cu Regulamentul (UE) 2024/1689 privind inteligența artificială (
          <a
            href={EU_AI_ACT_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            EU AI Act
          </a>
          ).
        </p>
        <p>
          <strong>Notă importantă:</strong> atunci când clienții tăi comunică prin
          WhatsApp cu asistentul VIDIA, ei interacționează cu un sistem de
          inteligență artificială. Platforma este configurată să informeze
          utilizatorii despre natura automatizată a conversației și să gestioneze
          consimțământul acolo unde legea o impune — fără ca tu să construiești
          fluxuri legale de la zero.
        </p>
        <p className="compliance-legal-note">
          Prelucrăm datele personale doar în scopurile declarate (programări,
          suport, comunicări comerciale cu consimțământ), le stocăm securizat și
          le păstrăm doar cât este necesar. Ai drepturile prevăzute de GDPR:
          acces, rectificare, ștergere, restricționare, portabilitate și opoziție.
          Pentru exercitarea drepturilor sau întrebări legate de conformitate, ne
          poți contacta la{" "}
          <a href="mailto:contact@getvidia.ro">contact@getvidia.ro</a>.
        </p>
        <p className="compliance-legal-note">
          Regulamentul oficial privind inteligența artificială în Uniunea
          Europeană:{" "}
          <a
            href={EU_AI_ACT_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            EUR-Lex — Regulamentul (UE) 2024/1689
          </a>
          .
        </p>
        <p className="compliance-band-links compliance-legal-note">
          Documente legale:{" "}
          <Link to="/confidentialitate">Politica de Confidențialitate</Link>
          {" · "}
          <Link to="/termeni">Termeni și Condiții</Link>
          {" · "}
          <Link to="/cookies">Politica de Cookies</Link>
        </p>
      </div>
    </>
  );
}

export function CompliancePanel({
  variant = "aside",
  className = "",
}: CompliancePanelProps) {
  if (variant === "band") {
    return (
      <section
        id="conformitate"
        className={`section compliance-band ${className}`.trim()}
        aria-labelledby="compliance-band-title"
      >
        <div className="container compliance-band-inner">
          <ComplianceBandContent />
        </div>
        <SignalField variant="constellation" />
      </section>
    );
  }

  if (variant === "compact") {
    return (
      <div className={`compliance-panel compliance-panel--compact ${className}`.trim()}>
        <p className="compliance-compact-lead">
          Interacțiunile prin VIDIA pot implica sisteme de inteligență artificială,
          în conformitate cu{" "}
          <a
            href={EU_AI_ACT_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            EU AI Act
          </a>{" "}
          și GDPR.
        </p>
        <p className="compliance-legal-note">
          <Link to="/#conformitate">Transparență &amp; Conformitate</Link>
          {" · "}
          <Link to="/confidentialitate">Confidențialitate</Link>
          {" · "}
          <Link to="/termeni">Termeni</Link>
        </p>
      </div>
    );
  }

  return (
    <aside
      id="gdpr"
      className={`compliance-panel compliance-panel--aside gdpr-panel gdpr-panel-below ${className}`.trim()}
      aria-label="Mesaj de încurajare"
    >
      <p className="compliance-aside-text">{ENCOURAGEMENT_QUOTE.lead}</p>
      <p className="compliance-aside-close">{ENCOURAGEMENT_QUOTE.close}</p>
    </aside>
  );
}
