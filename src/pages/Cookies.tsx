import { Link } from "react-router-dom";
import { LegalLayout } from "./LegalLayout";

export function Cookies() {
  return (
    <LegalLayout
      title="Politica de Cookies"
      description="Politica de cookies VIDIA — ce cookie-uri folosim pe getvidia.ro și cum le poți gestiona."
      path="/cookies"
    >
      <p className="legal-updated">Ultima actualizare: 5 august 2026</p>

      <h2>1. Ce sunt cookie-urile</h2>
      <p>
        Cookie-urile sunt fișiere text de mici dimensiuni stocate pe dispozitivul
        tău când vizitezi un site. Ele ajută la funcționarea paginii și, uneori,
        la înțelegerea modului în care este folosită.
      </p>

      <h2>2. Cum folosim cookie-urile</h2>
      <p>
        Site-ul VIDIA folosește cookie-uri esențiale pentru funcționarea de bază
        (de exemplu, preferințe tehnice necesare afișării corecte a paginilor).
        Orice cookie de analiză sau marketing va fi activat doar cu
        consimțământul tău, atunci când astfel de instrumente sunt implementate.
      </p>

      <h2>3. Tipuri de cookie-uri</h2>
      <ul>
        <li>
          <strong>Esențiale</strong> — necesare pentru navigare și securitate
          de bază;
        </li>
        <li>
          <strong>Preferințe</strong> — rețin setări simple ale vizitatorului,
          dacă sunt folosite;
        </li>
        <li>
          <strong>Analiză / marketing</strong> — doar cu acord explicit, dacă
          sunt activate pe site.
        </li>
      </ul>

      <h2>4. Gestionarea cookie-urilor</h2>
      <p>
        Poți șterge sau bloca cookie-urile din setările browserului. Reține că
        dezactivarea cookie-urilor esențiale poate afecta modul în care
        funcționează site-ul.
      </p>

      <h2>5. Actualizări</h2>
      <p>
        Această politică poate fi actualizată pe măsură ce introducem noi
        instrumente. Data ultimei modificări este afișată în partea de sus a
        paginii.
      </p>

      <h2>6. Documente conexe</h2>
      <p>
        Vezi și{" "}
        <Link to="/confidentialitate">Politica de Confidențialitate</Link> și{" "}
        <Link to="/termeni">Termenii și Condițiile</Link>.
      </p>
    </LegalLayout>
  );
}
