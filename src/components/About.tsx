import { SignalWashMarks } from "./SignalWashMarks";

export function About() {
  return (
    <section id="despre" className="section about signal-wash">
      <SignalWashMarks />
      <div className="container about-grid">
        <div>
          <p className="section-label">Despre VIDIA</p>
          <h2 className="section-title">
            Scăpăm antreprenorii de haosul agendei telefonice.
          </h2>
        </div>
        <div className="about-copy">
          <p>
            VIDIA a pornit de la o realitate pe care o cunoaște orice
            antreprenor local din România: cele mai multe programări se pierd
            exact când lucrezi. Telefonul sună, tu ești cu clientul din față,
            iar agenda rămâne pe mâine.
          </p>
          <p>
            De aceea am construit un sistem automatizat care preia tot acest
            haos: programări pe WhatsApp, sincronizate direct în Google
            Calendar, un partener virtual care răspunde clienților la orice oră
            și campanii SMS care îi aduc înapoi. Tu decizi ce și cât
            comunică asistentul tău digital — control total asupra
            informațiilor împărtășite.
          </p>
          <p>
            Credem că meseria ta merită atenția ta întreagă. Partenerul tău
            virtual se ocupă de programări și de mesaje, tu de clienți —
            simplu, calm, fără „seen”, fără „am uitat”, fără „stai să verific”.
          </p>
        </div>
      </div>
    </section>
  );
}
