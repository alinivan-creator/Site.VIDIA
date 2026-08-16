const faqItems = [
  {
    icon: "🛠️",
    question:
      "Folosiți unelte externe de tipul Make sau n8n pentru automatizări?",
    answer: (
      <>
        <p>
          <strong>Nu.</strong> VIDIA este o soluție nativă de agenți AI pentru
          automatizări WhatsApp, construită integral pe bază de cod propriu.
          Acest lucru ne oferă control absolut, elimină orice dependență sau
          blocaj cauzat de terți, nu implică costuri ascunse și îți garantează o
          viteză de execuție superioară și o stabilitate maximă pe termen lung.
        </p>
      </>
    ),
  },
  {
    icon: "📱",
    question:
      "Pot să folosesc numărul meu actual de telefon sau e mai bine să aleg un număr nou?",
    answer: (
      <>
        <p>
          <strong>Poți face ambele variante.</strong> Dacă alegi numărul tău
          actual, acesta rămâne perfect funcțional pentru apeluri telefonice,
          iar tu poți folosi în continuare WhatsApp pe el.
        </p>
        <p>
          <strong>De ce să alegi un număr nou (dedicat)?</strong> Un număr nou
          de la platformă îți oferă avantaje majore: ai separare totală între
          viața privată și afacere, rulează complet în cloud (nu depinzi de
          bateria telefonului sau de conexiunea ta fizică) și îți protejează
          numărul personal de orice risc.
        </p>
      </>
    ),
  },
  {
    icon: "💬",
    question: "Cum preia asistentul AI discuțiile de pe WhatsApp?",
    answer: (
      <>
        <p>
          Agenții AI pe WhatsApp de la VIDIA se conectează direct la canalul
          tău și oferă programări automate 24/7 — o soluție dedicată pentru
          clinici și saloane. Asistentul digital răspunde automat clienților,
          poartă conversații naturale, preia date de contact, gestionează
          programări și oferă detalii despre prețuri și servicii, iar tu ai
          control total asupra a ceea ce și cât de mult află clienții, fără
          efort manual din partea ta.
        </p>
      </>
    ),
  },
  {
    icon: "📅",
    question:
      "Cum mă ajută VIDIA să reduc programările ratate (no-show) la clinică sau salon?",
    answer: (
      <>
        <p>
          Prin intermediul notificărilor automate și al confirmărilor instant pe
          WhatsApp. Asistentul AI trimite remindere inteligente și le permite
          clienților să reprogrameze printr-un simplu mesaj, eliminând golurile
          din agendă fără efort manual.
        </p>
      </>
    ),
  },
  {
    icon: "🏪",
    question:
      "Pentru ce tipuri de afaceri este potrivit sistemul de automatizare VIDIA?",
    answer: (
      <>
        <p>
          VIDIA este conceput pentru clinici stomatologice, saloane de
          înfrumusețare, barber-shop-uri, stații ITP și cabinete, gestionând
          programările pe WhatsApp 24/7.
        </p>
      </>
    ),
  },
  {
    icon: "⚡",
    question:
      "Cât timp durează să punem sistemul în funcțiune pentru afacerea mea?",
    answer: (
      <>
        <p>
          Implementarea este extrem de rapidă. Deoarece arhitectura noastră
          este optimizată prin cod pur, configurarea inițială, antrenarea pe
          specificul afacerii tale și conectarea canalului de comunicare se
          realizează într-un timp foarte scurt.
        </p>
      </>
    ),
  },
  {
    icon: "🔒",
    question: "Sunt în siguranță datele clienților mei?",
    answer: (
      <>
        <p>
          Absolut. Respectăm standardele stricte de confidențialitate și
          asigurăm conformitatea GDPR, datele fiind gestionate în siguranță
          totală prin infrastructura noastră centralizată.
        </p>
      </>
    ),
  },
];

export function Faq() {
  return (
    <section id="faq" className="section faq">
      {/* Întrebare care sosește → răspuns confirmat (motiv ambiental) */}
      <div className="signal-field signal-field--faq" aria-hidden="true">
        <span className="faq-signal-dot" />
        <span className="faq-signal-dot" />
        <span className="faq-signal-dot" />
        <svg
          className="faq-signal-check"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4 13 L10 19 L20 6" />
        </svg>
      </div>
      <div className="container faq-container">
        <div className="faq-heading">
          <h2 className="faq-title">Întrebări Frecvente (FAQ)</h2>
          <p className="faq-lead">
            Tot ce trebuie să știi despre cum funcționează platforma VIDIA și
            integrarea ei.
          </p>
        </div>

        <div className="faq-list">
          {faqItems.map((item) => (
            <article className="faq-item" key={item.question}>
              <h3 className="faq-question">
                <span className="faq-icon" aria-hidden="true">
                  {item.icon}
                </span>
                {item.question}
              </h3>
              <div className="faq-answer">{item.answer}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
