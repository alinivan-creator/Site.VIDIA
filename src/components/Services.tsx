import { SignalField } from "./SignalField";

const services = [
  {
    name: "Booking",
    title: "Programări automate",
    text: "Clienții scriu pe WhatsApp, asistentul tău digital oferă ore libere și confirmă. Programarea apare direct în Google Calendar — zi și noapte, fără să ridici telefonul.",
  },
  {
    name: "Consulting",
    title: "Fluxuri de triaj și interacțiune inteligentă",
    text: "Conversații ghidate care înțeleg ce are nevoie clientul, răspund la întrebări frecvente și îl îndrumă corect înainte de programare sau vizită.",
  },
  {
    name: "SMS Marketing",
    title: "Campanii personalizate prin GSM",
    text: "Oferte, promoții și mementouri trimise direct către clienții existenți, pe SMS clasic — clar, personalizat și ușor de urmărit.",
  },
];

export function Services() {
  return (
    <section id="servicii" className="section services">
      <div className="container services-stage">
        <p className="section-label">Servicii</p>
        <h2 className="section-title">Trei servicii care lucrează împreună.</h2>
        <p className="section-lead">
          Pe lângă Booking (programări automate), VIDIA include Consulting pentru
          triaj inteligent și SMS Marketing personalizat prin GSM — ca să acoperi
          rezervările, conversațiile și relația cu clienții existenți.
        </p>

        <SignalField variant="services" />

        <ul className="services-grid">
          {services.map((service) => (
            <li key={service.name} className="service-item">
              <span className="service-name">{service.name}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
