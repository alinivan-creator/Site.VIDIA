import { SignalField } from "./SignalField";

const steps = [
  {
    n: "01",
    title: "Clientul îți scrie pe WhatsApp",
    text: "Când are nevoie de o programare, mesajul ajunge la partenerul tău virtual — zi și noapte, fără să-ți întrerupă munca.",
  },
  {
    n: "02",
    title: "Asistentul tău digital preia conversația",
    text: "Răspunde politicos, oferă orele libere și stabilește detaliile împreună cu clientul — exact în limitele pe care le-ai setat tu.",
  },
  {
    n: "03",
    title: "Programarea apare în calendar",
    text: "În câteva secunde, rezervarea e în Google Calendar. Tu nu trebuie să miști un deget.",
  },
];

const highlights = [
  {
    id: "integration-title",
    label: "Integrare",
    text: "Ai deja un widget de programare pe site sau folosești o altă aplicație? Nicio problemă! VIDIA se sincronizează perfect în fundal cu calendarul tău existent.",
  },
  {
    id: "availability-title",
    label: "Disponibil 24/7",
    text: "Zero timp de așteptare pentru clienți: sistemul tău automatizat răspunde imediat, inclusiv noaptea și în weekend — când tu nu ești la telefon, dar afacerea ta da.",
  },
];

export function HowItWorks() {
  return (
    <section id="cum-functioneaza" className="section how">
      <div className="container">
        <p className="section-label">Cum funcționează</p>
        <h2 className="section-title">Trei pași. Zero bătăi de cap.</h2>
        <p className="section-lead">
          Nu trebuie să schimbi nimic la modul în care lucrezi. VIDIA se potrivește
          peste WhatsApp și calendarul pe care le folosești deja.
        </p>

        <div className="steps-wrap">
          <SignalField variant="how" />
          <ol className="steps">
            {steps.map((step) => (
              <li key={step.n} className="step">
                <span className="step-n">{step.n}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="how-highlights">
          {highlights.map((card) => (
            <aside
              key={card.id}
              className="integration-note"
              aria-labelledby={card.id}
            >
              <p className="section-label" id={card.id}>
                {card.label}
              </p>
              <p>{card.text}</p>
            </aside>
          ))}
        </div>
      </div>
    </section>
  );
}
