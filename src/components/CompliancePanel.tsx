import { Link } from "react-router-dom";

/** Regulamentul (UE) 2024/1689 — EU AI Act, versiune RO pe EUR-Lex. */
export const EU_AI_ACT_URL =
  "https://eur-lex.europa.eu/legal-content/RO/TXT/?uri=CELEX:32024R1689";

type CompliancePanelProps = {
  /** full = sub formularul de contact; compact = subsol site */
  variant?: "full" | "compact";
  className?: string;
};

export function CompliancePanel({
  variant = "full",
  className = "",
}: CompliancePanelProps) {
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
          <Link to="/#gdpr">Transparență &amp; Conformitate</Link>
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
      className={`compliance-panel gdpr-panel gdpr-panel-below ${className}`.trim()}
      aria-labelledby="compliance-title"
    >
      <p className="gdpr-kicker">Legal</p>
      <h3 id="compliance-title">Transparență &amp; Conformitate</h3>

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

      <p className="gdpr-links compliance-legal-note">
        Documente legale:{" "}
        <Link to="/confidentialitate">Politica de Confidențialitate</Link>
        {" · "}
        <Link to="/termeni">Termeni și Condiții</Link>
        {" · "}
        <Link to="/cookies">Politica de Cookies</Link>
      </p>
    </aside>
  );
}
