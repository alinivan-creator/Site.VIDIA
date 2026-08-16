const domains = [
  {
    name: "Barber-shop",
    color: "barber",
    hint: "Agendă automatizată 24/7 cu agenți AI pe WhatsApp — tunsori și bărbierit fără telefon ocupat.",
  },
  {
    name: "Clinici stomatologice",
    color: "dental",
    hint: "Programări automate și chatbot WhatsApp care reduc programările ratate la consultații și tratamente.",
  },
  {
    name: "Stații ITP",
    color: "itp",
    hint: "Automatizări WhatsApp pentru verificări tehnice programate — sloturi confirmate fără apeluri repetate.",
  },
  {
    name: "Cosmetică canină",
    color: "pet",
    hint: "Agenți AI pentru grooming: programări automate pe WhatsApp, pe ritmul salonului tău.",
  },
  {
    name: "Saloane de masaj",
    color: "massage",
    hint: "Chatbot WhatsApp pentru relaxare și terapie — programări automate, zi și noapte.",
  },
  {
    name: "Manichiură / pedichiură",
    color: "nails",
    hint: "Automatizări WhatsApp pentru unghii și stilizare: agenți AI care umplu agenda fără efort.",
  },
];

export function BusinessDomains() {
  return (
    <section
      id="afaceri"
      className="section domains"
      aria-labelledby="domains-title"
    >
      {/* Săptămână de programări — motiv ambiental, ecou al domeniilor */}
      <div className="signal-field signal-field--domains" aria-hidden="true">
        <svg
          className="signal-week"
          viewBox="0 0 240 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className="signal-slot-cell signal-week-cell--1">
            <rect x="8" y="18" width="24" height="28" rx="4" />
            <line x1="8" y1="27" x2="32" y2="27" />
          </g>
          <g className="signal-slot-cell signal-week-cell--2">
            <rect x="41" y="18" width="24" height="28" rx="4" />
            <line x1="41" y1="27" x2="65" y2="27" />
          </g>
          <g className="signal-slot-cell signal-week-cell--3">
            <rect x="74" y="18" width="24" height="28" rx="4" />
            <line x1="74" y1="27" x2="98" y2="27" />
          </g>
          <g className="signal-slot-cell signal-week-cell--4">
            <rect x="107" y="18" width="24" height="28" rx="4" />
            <line x1="107" y1="27" x2="131" y2="27" />
          </g>
          <g className="signal-slot-cell signal-week-cell--5">
            <rect x="140" y="18" width="24" height="28" rx="4" />
            <line x1="140" y1="27" x2="164" y2="27" />
          </g>
          <g className="signal-slot-cell signal-week-cell--6">
            <rect x="173" y="18" width="24" height="28" rx="4" />
            <line x1="173" y1="27" x2="197" y2="27" />
          </g>
          <g className="signal-slot-cell signal-week-cell--7 signal-dense">
            <rect x="206" y="18" width="24" height="28" rx="4" />
            <line x1="206" y1="27" x2="230" y2="27" />
          </g>

          {/* Programări confirmate în culorile domeniilor */}
          <circle
            className="signal-branch-dot signal-node--domain-dental"
            cx="20"
            cy="37"
            r="2.2"
          />
          <circle
            className="signal-branch-dot signal-node--domain-pet"
            cx="86"
            cy="37"
            r="2.2"
          />
          <circle
            className="signal-branch-dot signal-node--domain-nails signal-dense"
            cx="218"
            cy="37"
            r="2.2"
          />
          <path className="signal-check" d="M146 38 L151 43 L159 32" />
        </svg>
      </div>

      <div className="container">
        <p className="section-label">Afaceri acoperite</p>
        <h2 id="domains-title" className="section-title">
          Domenii de activitate pe care le acoperim
        </h2>
        <p className="section-lead">
          Automatizări WhatsApp și agenți AI pentru afaceri locale din România —
          programări automate acolo unde telefonul sună non-stop și agenda se
          umple greu.
        </p>

        <ul className="domain-grid">
          {domains.map((d) => (
            <li key={d.name} className={`domain-item domain-${d.color}`}>
              <span className="domain-dot" aria-hidden="true" />
              <div>
                <h3>{d.name}</h3>
                <p>{d.hint}</p>
              </div>
            </li>
          ))}
        </ul>

        <p className="domains-note">
          Acestea sunt doar câteva exemple. VIDIA se adaptează oricărui tip de
          afacere bazată pe programări automate, chatbot WhatsApp sau agenți AI
          pentru consultanță — de la clinici și saloane, până la servicii
          profesionale fără agendă clasică.
        </p>
      </div>
    </section>
  );
}
