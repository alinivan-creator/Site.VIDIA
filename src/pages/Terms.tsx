import { Link } from "react-router-dom";
import { LegalLayout } from "./LegalLayout";

export function Terms() {
  return (
    <LegalLayout
      title="Termeni și Condiții"
      description="Termenii și condițiile de utilizare a platformei VIDIA și a site-ului getvidia.ro."
      path="/termeni"
    >
      <p className="legal-updated">Ultima actualizare: 5 august 2026</p>

      <h2>1. Acceptarea termenilor</h2>
      <p>
        Prin accesarea site-ului VIDIA și folosirea serviciilor noastre, confirmi
        că ai citit și ești de acord cu acești Termeni și Condiții. Dacă nu ești
        de acord, te rugăm să nu folosești site-ul sau serviciile.
      </p>

      <h2>2. Descrierea serviciilor</h2>
      <p>VIDIA oferă afacerilor locale, printre altele:</p>
      <ul>
        <li>
          <strong>Booking</strong> — programări automate prin WhatsApp, cu
          sincronizare în calendar;
        </li>
        <li>
          <strong>Consulting</strong> — fluxuri de triaj și interacțiune
          inteligentă cu clienții;
        </li>
        <li>
          <strong>SMS Marketing</strong> — campanii personalizate de oferte,
          promoții și mementouri prin GSM.
        </li>
      </ul>
      <p>
        Detaliile comerciale (planuri, prețuri, set-up, funcționalități) sunt
        stabilite în oferta și contractul încheiat cu fiecare client.
      </p>

      <h2>3. Obligațiile utilizatorului</h2>
      <p>
        Te obligi să furnizezi informații corecte în formularul de contact și să
        folosești serviciile în conformitate cu legislația din România, inclusiv
        în comunicarea cu clienții tăi și în respectarea regulilor privind
        consimțământul și protecția datelor.
      </p>

      <h2>4. Prețuri și plăți</h2>
      <p>
        Taxele de set-up, taxele de campanie SMS (doar în lunile în care lansezi
        o campanie) și costul pe mesaj sunt comunicate transparent pe site și
        confirmate în documentele comerciale. Nu există abonament lunar
        obligatoriu pentru SMS Marketing. Orice modificare de tarif se anunță în
        avans, conform contractului.
      </p>

      <h2>5. Limitarea răspunderii</h2>
      <p>
        VIDIA depune eforturi rezonabile pentru disponibilitatea serviciului,
        însă nu garantează lipsa totală a întreruperilor cauzate de terți
        (WhatsApp, operatori GSM, Google Calendar, rețea). Răspunderea
        contractuală este limitată conform acordului comercial.
      </p>

      <h2>6. Proprietate intelectuală</h2>
      <p>
        Conținutul site-ului, marca VIDIA și elementele platformei aparțin
        titularilor de drepturi. Nu este permisă copierea sau reutilizarea fără
        acord scris.
      </p>

      <h2>7. Contact</h2>
      <p>
        Pentru întrebări legate de acești termeni, folosește{" "}
        <Link to="/#contact">formularul de pe pagina principală</Link> sau
        consultă și{" "}
        <Link to="/confidentialitate">Politica de Confidențialitate</Link> și{" "}
        <Link to="/cookies">Politica de Cookies</Link>.
      </p>
    </LegalLayout>
  );
}
