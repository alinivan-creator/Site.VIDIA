import { Link } from "react-router-dom";
import { LegalLayout } from "./LegalLayout";

export function Privacy() {
  return (
    <LegalLayout title="Politica de Confidențialitate">
      <p className="legal-updated">Ultima actualizare: 5 august 2026</p>

      <h2>1. Cine suntem</h2>
      <p>
        VIDIA prelucrează date cu caracter personal pentru a răspunde
        solicitărilor de pe site și pentru a livra serviciile de Booking,
        Consulting și SMS Marketing destinate afacerilor locale.
      </p>

      <h2>2. Ce date colectăm</h2>
      <p>Prin formularul de contact de pe site colectăm:</p>
      <ul>
        <li>numărul de telefon;</li>
        <li>adresa de e-mail;</li>
        <li>tipul de afacere.</li>
      </ul>
      <p>
        În cadrul serviciilor livrate clienților noștri, platforma poate prelucra
        și date necesare operării programărilor, conversațiilor și campaniilor
        SMS, conform contractului și instrucțiunilor tale ca operator.
      </p>

      <h2>3. Scopul prelucrării</h2>
      <p>
        Datele din formular sunt folosite pentru a te contacta în legătură cu
        solicitarea ta, pentru a pregăti o ofertă și, ulterior, pentru
        derularea contractului, dacă alegi să colaborăm.
      </p>

      <h2>4. Temeiul legal</h2>
      <p>
        Prelucrarea se bazează pe interesul legitim de a răspunde cererilor
        comerciale și, după caz, pe executarea contractului sau pe consimțământ,
        în special acolo unde legea o cere pentru comunicări de marketing.
      </p>

      <h2>5. GDPR în platformă</h2>
      <p>
        Aspectul de conformitate legală și consimțământul clienților este deja
        rezolvat și integrat nativ în platforma VIDIA. Nu este nevoie să
        construiești fluxuri GDPR de la zero: platforma le include din start,
        iar detaliile operaționale se stabilesc în documentația și contractul
        de colaborare.
      </p>

      <h2>6. Drepturile tale</h2>
      <p>
        Ai dreptul de acces, rectificare, ștergere, restricționare, opoziție și
        portabilitate, precum și dreptul de a depune o plângere la Autoritatea
        Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal
        (ANSPDCP).
      </p>

      <h2>7. Păstrarea datelor</h2>
      <p>
        Păstrăm datele din solicitări pe perioada necesară comunicării
        comerciale și, dacă este cazul, pe durata prevăzută de obligațiile
        legale sau contractuale.
      </p>

      <h2>8. Documente conexe</h2>
      <p>
        Consultă și <Link to="/termeni">Termenii și Condițiile</Link> și{" "}
        <Link to="/cookies">Politica de Cookies</Link>. Pentru solicitări, folosește{" "}
        <Link to="/#contact">formularul de contact</Link>.
      </p>
    </LegalLayout>
  );
}
