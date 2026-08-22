import { Link } from "react-router-dom";
import { SignalField } from "./SignalField";

export function SeoTargetSection() {
  return (
    <section
      id="solutii-nise"
      className="section seo-targets"
      aria-labelledby="seo-targets-title"
    >
      <div className="container">
        <p className="section-label">Industrii</p>
        <h2 id="seo-targets-title" className="section-title">
          Agenți AI și automatizări WhatsApp pentru afaceri locale din România
        </h2>
        <div className="seo-targets-body">
          <p>
            VIDIA este o platformă de <strong>asistenți AI</strong> și{" "}
            <strong>agenți AI</strong> construită pentru{" "}
            <strong>automatizări WhatsApp</strong> și{" "}
            <strong>programări automate pe WhatsApp</strong>, 24/7. Clienții
            scriu pe WhatsApp, iar asistentul digital răspunde instant, oferă
            sloturi libere, confirmă rezervările și trimite remindere — fără
            cozi la telefon și fără mesaje pierdute seara sau în weekend.
          </p>
          <p>
            Pe lângă Booking, oferim <strong>SMS marketing</strong> și{" "}
            <strong>campanii promo prin SMS</strong> pentru clienții existenți:
            oferte sezoniere, reactivare clienți inactivi și remindere
            personalizate, direct pe telefonul lor mobil.
          </p>
          <p>
            Soluția noastră înlocuiește aplicațiile de programare generice cu un
            flux natural pe WhatsApp — canalul pe care clienții îl folosesc deja
            zilnic. Implementăm rapid pentru:
          </p>
          <ul className="seo-targets-list">
            <li>
              <Link to="/nishe/saloane-infrumusetare">
                aplicații de programare salon
              </Link>{" "}
              și saloane de înfrumusețare
            </li>
            <li>
              <Link to="/nishe/barbershop">barber-shop-uri</Link> și frizerii
              cu programări tuns &amp; barbă
            </li>
            <li>
              <Link to="/nishe/stomatologie">
                clinici stomatologice
              </Link>{" "}
              — consultații, detartraj, urgențe
            </li>
            <li>
              <Link to="/nishe/statii-itp">stații ITP</Link> — inspecții tehnice
              periodice programate online
            </li>
            <li>
              <Link to="/nishe/cosmetica-canina">cosmetică canină</Link> —
              grooming și îngrijire câini
            </li>
            <li>
              <Link to="/nishe/cabinet-veterinar">cabinete veterinare</Link> —
              consultații și vaccinări
            </li>
          </ul>
          <p>
            Fiecare implementare respectă GDPR și EU AI Act: utilizatorii sunt
            informați că interacționează cu un sistem de inteligență
            artificială, iar datele sunt prelucrate securizat, conform
            legislației din România.
          </p>
        </div>
      </div>
      <SignalField variant="constellation" />
    </section>
  );
}
