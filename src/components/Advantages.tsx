/**
 * Avantaje — stil hibrid „Red Bull ad”:
 * landmark / clutter fotorealiste + personaje ilustrate sketchy.
 * Paleta secțiunii: alb / albastru #0F61FE / verde #10B981 (roșu doar pe X).
 */

function AvailabilityVisual() {
  return (
    <div
      className="advantage-visual advantage-visual--availability"
      aria-hidden="true"
    >
      <div className="adv-hybrid">
        <div className="adv-landmark adv-landmark--bigben">
          <img
            src="/img/big-ben.jpg"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>

        <img
          className="adv-flyer"
          src="/img/adv-entrepreneur-flyer-clean.png"
          alt=""
          decoding="async"
        />
      </div>
    </div>
  );
}

function BookingChatVisual() {
  return (
    <div
      className="advantage-visual advantage-visual--booking"
      aria-hidden="true"
    >
      <div className="adv-hybrid">
        <div className="adv-landmark adv-landmark--clutter">
          <img
            className="adv-clutter-phone"
            src="/img/adv-app-clutter.png"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>

        <img
          className="adv-clean-chat"
          src="/img/adv-clean-chat.svg"
          alt=""
          decoding="async"
        />

        <img
          className="adv-clients"
          src="/img/adv-clients-redhead-thumbs-clean.png"
          alt=""
          decoding="async"
        />

        <div className="adv-wa-cluster">
          <img
            className="adv-wa-badge"
            src="/img/adv-whatsapp-badge.svg"
            alt=""
            decoding="async"
          />
          <span className="adv-wa-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </div>

        <div className="adv-no-dl" title="Fără aplicații noi">
          <img
            src="/img/adv-no-download.svg"
            alt=""
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
}

const cards = [
  {
    id: "disponibilitate",
    eyebrow: "Disponibilitate totală",
    visual: <AvailabilityVisual />,
    title: "0 stres, disponibilitate totală.",
    text: "VIDIA oferă exact atâtea informații pe cât îți dorești tu să ofere. Tu decizi ce și cât comunică asistentul tău virtual cu clienții. Când ești în vacanță, sau ai alte priorități, VIDIA va fi tot acolo, făcându-și treaba.",
  },
  {
    id: "rezervare-chat",
    eyebrow: "Rezervare directă prin chat",
    visual: <BookingChatVisual />,
    title: "Fără aplicații noi de instalat.",
    text: "Oamenii folosesc deja WhatsApp-ul zilnic. Nu trebuie să descarce, să învețe sau să memoreze o aplicație complexă de rezervări. Totul se întâmplă simplu, direct pe chat.",
  },
];

export function Advantages() {
  return (
    <section id="avantaje" className="section advantages">
      <div className="container">
        <p className="section-label">Avantaje</p>
        <h2 className="section-title">Avantaje pe care le simți din prima zi.</h2>
        <p className="section-lead">
          Partenerul tău virtual rămâne disponibil 24/7 și răspunde simultan la
          un număr nelimitat de clienți — fără linie de așteptare. Tu păstrezi
          controlul total asupra a ceea ce află clienții.
        </p>

        <div className="advantages-grid">
          {cards.map((card) => (
            <article key={card.id} className="advantage-card">
              <p className="advantage-eyebrow">{card.eyebrow}</p>
              {card.visual}
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
