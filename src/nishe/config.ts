export type NicheSlug =
  | "stomatologie"
  | "barbershop"
  | "saloane-infrumusetare"
  | "statii-itp"
  | "cosmetica-canina"
  | "cabinet-veterinar";

export type NicheMessage = {
  from: "client" | "ai";
  time: string;
  text: string;
  quote?: { title: string; body: string };
};

export type NicheRoiRow = {
  label: string;
  before: string;
  after: string;
};

export type NicheContentSection = {
  heading: string;
  paragraphs: string[];
};

export type NicheConfig = {
  slug: NicheSlug;
  label: string;
  businessName: string;
  heroTitle: string;
  heroSubtitle: string;
  footerLinkLabel: string;
  serviceType: string;
  meta: {
    title: string;
    description: string;
  };
  simHeader: string;
  messages: NicheMessage[];
  roiRows: NicheRoiRow[];
  roiHighlight: string;
  contentSections: NicheContentSection[];
};

export const NICHE_SLUGS: NicheSlug[] = [
  "stomatologie",
  "barbershop",
  "saloane-infrumusetare",
  "statii-itp",
  "cosmetica-canina",
  "cabinet-veterinar",
];

export const NICHES: Record<NicheSlug, NicheConfig> = {
  stomatologie: {
    slug: "stomatologie",
    label: "Stomatologie",
    businessName: "Clinica Dentara Smile",
    footerLinkLabel: "Programări clinici stomatologice",
    serviceType: "Automatizări WhatsApp pentru clinici stomatologice",
    heroTitle:
      "Automatizări WhatsApp și programări automate pentru clinici stomatologice",
    heroSubtitle:
      "Agenți AI care preiau programări pentru consultații, detartraj, albire și urgențe stomatologice — 24/7, direct pe WhatsApp.",
    meta: {
      title:
        "Automatizări WhatsApp Clinici Stomatologice | Programări automate — GetVidia",
      description:
        "Agenți AI și programări automate pe WhatsApp pentru clinici stomatologice din România. Confirmări, remindere anti no-show și triaj pacienți 24/7.",
    },
    simHeader: "Clinica Dentara Smile",
    messages: [
      { from: "client", time: "09:12", text: "Bună ziua, aș vrea o programare pentru detartraj." },
      { from: "ai", time: "09:12", text: "Salut! Alege serviciul din listă — Consultație, Detartraj, Albire sau scrie numele." },
      { from: "client", time: "09:13", quote: { title: "Tu", body: "Detartraj" }, text: "Detartraj, miercuri dimineața." },
      { from: "ai", time: "09:13", text: "Am liber Miercuri 26 Aug, 09:30 — Cabinet Dr. Popescu. Confirmi?" },
      { from: "client", time: "09:14", text: "Da, confirm!" },
      { from: "ai", time: "09:14", text: "✅ Programare confirmată! Remindere cu 24h înainte." },
    ],
    roiRows: [
      { label: "Programări ratate / săptămână", before: "4", after: "0" },
      { label: "Timp recepție la telefon / zi", before: "2 ore", after: "15 min" },
      { label: "Confirmări trimise automat", before: "Manual", after: "100%" },
    ],
    roiHighlight: "Clinicile stomatologice recuperează programări pierdute prin răspunsuri instant pe WhatsApp.",
    contentSections: [
      {
        heading: "De ce clinici stomatologice aleg VIDIA",
        paragraphs: [
          "Recepția unei clinici stomatologice este adesea blocată la telefon în timpul programărilor, iar apelurile pierdute seara sau în weekend înseamnă pacienți care merg la concurență. VIDIA implementează asistenți AI și agenți AI care gestionează automatizări WhatsApp pentru programări automate: pacientul alege serviciul, cabinetul și intervalul, fără a aștepta răspunsul recepției.",
          "Spre deosebire de aplicațiile de programare stomatologică rigide, fluxul pe WhatsApp este familiar pacienților din România. Asistentul digital poate explica durata procedurilor, prețurile orientative și documentele necesare, apoi confirmă programarea și o sincronizează cu calendarul medicului.",
        ],
      },
      {
        heading: "Funcții dedicate stomatologiei",
        paragraphs: [
          "Triaj pentru urgențe dentare vs. programări de rutină, remindere personalizate anti no-show și mesaje post-tratament. Poți configura mai mulți medici și scaune, iar pacienții văd doar sloturile reale disponibile.",
          "Integrarea cu SMS marketing permite campanii promo prin SMS — de exemplu recall pentru igienizare sau oferte de albire — către baza de pacienți existentă, cu consimțământ GDPR.",
        ],
      },
      {
        heading: "Implementare rapidă în România",
        paragraphs: [
          "Setup-ul include configurarea serviciilor stomatologice, antrenarea asistentului pe politicile clinicii și conformitate EU AI Act: pacienții știu că interacționează cu un sistem de inteligență artificială. VIDIA este soluție nativă, fără dependențe de platforme externe precum Make sau n8n.",
        ],
      },
    ],
  },
  barbershop: {
    slug: "barbershop",
    label: "Barbershop",
    businessName: "Barber Shop Elite",
    footerLinkLabel: "Programări barber-shop WhatsApp",
    serviceType: "Automatizări WhatsApp pentru barber-shop",
    heroTitle:
      "Automatizări WhatsApp și programări automate pentru barber-shop-uri",
    heroSubtitle:
      "Asistenți AI care rezervă tuns, barbă și servicii combo pe WhatsApp — fără mesaje nerăspunse în timpul programărilor.",
    meta: {
      title:
        "Programări automate Barber-Shop WhatsApp | Agenți AI — GetVidia",
      description:
        "Automatizări WhatsApp pentru barber-shop-uri din România. Programări automate tuns & barbă, confirmări și remindere 24/7 cu agenți AI VIDIA.",
    },
    simHeader: "Barber Shop Elite",
    messages: [
      { from: "client", time: "18:05", text: "Salut, vreau sa fac si eu o programare" },
      { from: "ai", time: "18:05", text: "Salut! Tuns Clasic, Tuns + Barba sau Aranjat Barba?" },
      { from: "client", time: "18:06", quote: { title: "Tu", body: "Tuns + Barba" }, text: "Tuns + Barba, miercuri dimineața." },
      { from: "ai", time: "18:06", text: "Miercuri 26 Aug, 09:30 cu Andrei. Confirmi?" },
      { from: "client", time: "18:07", text: "Confirm!" },
      { from: "ai", time: "18:07", text: "✅ Te așteptăm miercuri la 09:30!" },
    ],
    roiRows: [
      { label: "Programări ratate / săptămână", before: "3", after: "0" },
      { label: "Mesaje nerăspunse seara", before: "Da", after: "Nu" },
      { label: "Timp pierdut cu sloturi", before: "~45 min/zi", after: "0" },
    ],
    roiHighlight: "Barbershop-urile cu răspuns instant pe WhatsApp umplu scaunele goale din serile aglomerate.",
    contentSections: [
      {
        heading: "Programări automate pentru frizerii moderne",
        paragraphs: [
          "Într-un barber-shop aglomerat, mesajele WhatsApp sosesc când ești cu foarfeca în mână. VIDIA răspunde instant cu asistenți AI antrenați pe serviciile tale: tuns clasic, fade, barbă, combo. Clienții aleg barberul preferat și văd orele libere în timp real — programări automate pe WhatsApp, fără aplicație separată.",
          "Soluția înlocuiește notițele și mesajele haotice cu un flux clar: serviciu → zi → oră → confirmare. Clienții primesc remindere și pot reprograma dintr-un singur mesaj.",
        ],
      },
      {
        heading: "Mai mult decât o aplicație de programare salon",
        paragraphs: [
          "Asistentul poate răspunde la întrebări despre prețuri, durată și locație. Pentru campanii sezoniere — ex. reducere studenți — activezi SMS marketing sau campanie promo prin SMS către clienții fideli.",
          "Barber-shop-urile cu mai mulți angajați pot gestiona calendare separate; prețul VIDIA crește linear cu numărul de calendare, transparent în calculatorul de pe site.",
        ],
      },
      {
        heading: "Beneficii măsurabile",
        paragraphs: [
          "Reduci golurile din program, crești retenția clienților și eliberezi timp pentru craft, nu pentru administrare. Implementarea este rapidă, iar conformitatea GDPR și EU AI Act este integrată nativ.",
        ],
      },
    ],
  },
  "saloane-infrumusetare": {
    slug: "saloane-infrumusetare",
    label: "Saloane de înfrumusețare",
    businessName: "Studio Glow",
    footerLinkLabel: "Aplicație programări salon",
    serviceType: "Automatizări WhatsApp pentru saloane de înfrumusețare",
    heroTitle:
      "Aplicații de programare salon: automatizări WhatsApp pentru saloane de înfrumusețare",
    heroSubtitle:
      "Agenți AI pentru manichiură, coafură, machiaj și tratamente — clientele aleg serviciul, stilistul și ora, 24/7.",
    meta: {
      title:
        "Aplicație Programări Salon WhatsApp | Automatizări — GetVidia",
      description:
        "Aplicație de programare salon pe WhatsApp cu agenți AI. Programări automate pentru saloane de înfrumusețere, confirmări și SMS marketing în România.",
    },
    simHeader: "Studio Glow",
    messages: [
      { from: "client", time: "14:20", text: "Bună! Aveți loc vineri pentru manichiură gel?" },
      { from: "ai", time: "14:20", text: "Salut! Manichiură clasică, Gel sau Pedichiură — alege din listă." },
      { from: "client", time: "14:21", quote: { title: "Tu", body: "Manichiură gel" }, text: "Manichiură gel cu Ioana, vineri după-amiază." },
      { from: "ai", time: "14:21", text: "Vineri 28 Aug, 16:00 — Ioana, 90 min. Confirmi?" },
      { from: "client", time: "14:22", text: "Perfect, confirm!" },
      { from: "ai", time: "14:22", text: "✅ Programare salvată! Remindere cu 24h înainte." },
    ],
    roiRows: [
      { label: "Programări ratate / săptămână", before: "5", after: "0" },
      { label: "No-show-uri", before: "18%", after: "6%" },
      { label: "Remindere automate", before: "Nu", after: "Da" },
    ],
    roiHighlight: "Saloanele cu remindere automate reduc no-show-urile și umplu locurile eliberate la timp.",
    contentSections: [
      {
        heading: "Programări salon fără telefon ocupat",
        paragraphs: [
          "Saloanele de înfrumusețare pierd programări când receptionera sau stiliștii nu pot răspunde la WhatsApp. VIDIA oferă asistenți AI dedicați automatizărilor WhatsApp: clienta selectează serviciul (coafură, manichiură, machiaj), stilistul preferat și durata corectă a slotului.",
          "Este o alternativă modernă la aplicațiile de programare salon clasice — clienții rămân în WhatsApp, fără cont nou, fără aplicație de instalat.",
        ],
      },
      {
        heading: "Servicii combinate și upsell inteligent",
        paragraphs: [
          "Asistentul poate sugera tratamente complementare — ex. pedichiură după manichiură — și răspunde la întrebări despre produse sau pregătire înainte de vizită. Confirmările și reminderele reduc no-show-urile, iar campaniile SMS marketing reactivează clientele inactive.",
        ],
      },
      {
        heading: "Scalabil pentru saloane cu mai multe locații",
        paragraphs: [
          "Gestionezi mai multe calendare de angajați, locații și servicii cu durate diferite. Prețul lunar este transparent în calculatorul VIDIA. Conformitate GDPR și transparență EU AI Act incluse.",
        ],
      },
    ],
  },
  "statii-itp": {
    slug: "statii-itp",
    label: "Stații ITP",
    businessName: "ITP Auto Nord",
    footerLinkLabel: "Programări stații ITP WhatsApp",
    serviceType: "Automatizări WhatsApp pentru stații ITP",
    heroTitle:
      "Automatizări WhatsApp și programări automate pentru stații ITP",
    heroSubtitle:
      "Șoferii programează inspecția ITP pe WhatsApp — dată, oră și date mașină, fără cozi telefonice luni dimineața.",
    meta: {
      title:
        "Programări Stații ITP WhatsApp | Automatizări — GetVidia",
      description:
        "Programări automate ITP pe WhatsApp cu agenți AI. Sloturi, confirmări și remindere pentru stații ITP din România — fără telefon ocupat.",
    },
    simHeader: "ITP Auto Nord",
    messages: [
      { from: "client", time: "08:40", text: "Bună, vreau programare ITP pentru Dacia Logan, B 123 ABC." },
      { from: "ai", time: "08:40", text: "Salut! Alege data preferată sau scrie „sâmbătă dimineața”." },
      { from: "client", time: "08:41", quote: { title: "Tu", body: "Sâmbătă dimineața" }, text: "Sâmbătă dimineața, prima oră liberă." },
      { from: "ai", time: "08:41", text: "Sâmbătă 30 Aug, 08:00 — rampa 2. Adu talonul și CI-ul. Confirmi?" },
      { from: "client", time: "08:42", text: "Da, confirm." },
      { from: "ai", time: "08:42", text: "✅ Programare ITP confirmată! Remindere cu 24h înainte." },
    ],
    roiRows: [
      { label: "Apeluri pierdute / zi", before: "8–12", after: "0" },
      { label: "Programări ratate / săptămână", before: "3", after: "0" },
      { label: "Timp recepție / zi", before: "3 ore", after: "20 min" },
    ],
    roiHighlight: "Stațiile ITP cu programări online umplu rampa și reduc aglomerarea de luni dimineață.",
    contentSections: [
      {
        heading: "Programări ITP fără blocaj telefonic",
        paragraphs: [
          "Stațiile ITP din România sunt inundate de apeluri luni dimineața și înainte de expirarea inspecției. VIDIA automatizează programările pe WhatsApp: șoferul introduce marca, numărul de înmatriculare, alege data și ora, primește confirmare și listă de acte necesare.",
          "Asistenții AI răspund 24/7, inclusiv seara când șoferii își amintesc de ITP. Automatizările WhatsApp reduc cozile la recepție și optimizează fluxul pe rampe.",
        ],
      },
      {
        heading: "Remindere și reactivare clienți",
        paragraphs: [
          "Trimite remindere automate cu 24–48h înainte și campanii SMS marketing către clienții care au expirat ITP-ul — campanie promo prin SMS cu sloturi libere în săptămâna următoare.",
        ],
      },
      {
        heading: "Conformitate și fiabilitate",
        paragraphs: [
          "Infrastructură nativă, date securizate GDPR, fără dependențe de fluxuri externe fragile. Implementare rapidă pentru stații ITP independente sau rețele cu mai multe locații.",
        ],
      },
    ],
  },
  "cosmetica-canina": {
    slug: "cosmetica-canina",
    label: "Cosmetică canină",
    businessName: "Dog Spa Luna",
    footerLinkLabel: "Programări cosmetică canină",
    serviceType: "Automatizări WhatsApp pentru cosmetică canină",
    heroTitle:
      "Automatizări WhatsApp și programări automate pentru cosmetică canină",
    heroSubtitle:
      "Proprietarii de câini programează grooming, tuns și spălat pe WhatsApp — cu detalii despre rasă, comportament și durată.",
    meta: {
      title:
        "Programări Cosmetică Canină WhatsApp | Agenți AI — GetVidia",
      description:
        "Programări automate pe WhatsApp pentru saloane de cosmetică canină din România. Grooming, tuns, spălat — confirmări și remindere cu agenți AI VIDIA.",
    },
    simHeader: "Dog Spa Luna",
    messages: [
      { from: "client", time: "10:15", text: "Bună! Aș vrea programare grooming pentru Golden Retriever, 32 kg." },
      { from: "ai", time: "10:15", text: "Salut! Alege: Spălat + uscat, Tuns complet sau Doar tăiere ghiare." },
      { from: "client", time: "10:16", quote: { title: "Tu", body: "Tuns complet" }, text: "Tuns complet, sâmbătă dimineața dacă se poate." },
      { from: "ai", time: "10:16", text: "Sâmbătă 30 Aug, 09:00 — slot 90 min. Confirmi?" },
      { from: "client", time: "10:17", text: "Da, mulțumesc!" },
      { from: "ai", time: "10:17", text: "✅ Programare confirmată! Reamintim: aduceți carnetul de sănătate." },
    ],
    roiRows: [
      { label: "Mesaje pierdute / săptămână", before: "6", after: "0" },
      { label: "No-show-uri", before: "12%", after: "4%" },
      { label: "Timp la telefon / zi", before: "90 min", after: "10 min" },
    ],
    roiHighlight: "Saloanele de cosmetică canină câștigă programări seara, când proprietarii își planifică weekendul.",
    contentSections: [
      {
        heading: "Grooming programat pe WhatsApp",
        paragraphs: [
          "Cosmetica canină necesită detalii specifice: rasă, greutate, comportament la tuns, alergii. Asistenții AI VIDIA colectează aceste informații conversațional, apoi propun sloturi cu durata corectă — spălat, tuns, stripping — fără ca groomerul să întrerupă lucul.",
          "Programările automate pe WhatsApp funcționează perfect pentru saloanele de grooming care primesc multe mesaje pe Instagram și WhatsApp de la proprietari de câini.",
        ],
      },
      {
        heading: "Remindere și instrucțiuni pre-vizită",
        paragraphs: [
          "Asistentul trimite remindere cu ce să aducă proprietarul (carnet sănătate, lesă), reduce no-show-urile și poate propune reprogramare automată. Campaniile SMS marketing anunță pachete sezoniere — ex. curățare subblană primăvară.",
        ],
      },
      {
        heading: "Creat pentru afaceri pet din România",
        paragraphs: [
          "Soluție nativă, conformă GDPR și EU AI Act, fără aplicații complicate pentru clienți. Implementare rapidă cu serviciile și prețurile salonului tău de cosmetică canină.",
        ],
      },
    ],
  },
  "cabinet-veterinar": {
    slug: "cabinet-veterinar",
    label: "Cabinet veterinar",
    businessName: "Cabinet VetCare",
    footerLinkLabel: "Programări cabinet veterinar",
    serviceType: "Automatizări WhatsApp pentru cabinete veterinare",
    heroTitle:
      "Automatizări WhatsApp și programări automate pentru cabinete veterinare",
    heroSubtitle:
      "Asistenți AI pentru consultații, vaccinări și urgențe ușoare — programări pe WhatsApp, 24/7.",
    meta: {
      title:
        "Programări Cabinet Veterinar WhatsApp | Agenți AI — GetVidia",
      description:
        "Automatizări WhatsApp pentru cabinete veterinare din România. Programări automate consultații și vaccinări, triaj și remindere cu VIDIA.",
    },
    simHeader: "Cabinet VetCare",
    messages: [
      { from: "client", time: "11:30", text: "Bună, pisica mea tușește de 2 zile. Se poate o consultație?" },
      { from: "ai", time: "11:30", text: "Salut! Pentru consultație generală sau urgență? Alege din listă sau descrie simptomele." },
      { from: "client", time: "11:31", quote: { title: "Tu", body: "Consultație" }, text: "Consultație generală, mâine după-amiază." },
      { from: "ai", time: "11:31", text: "Marți 27 Aug, 16:30 — Dr. Ionescu. Confirmi programarea?" },
      { from: "client", time: "11:32", text: "Confirm, mulțumesc!" },
      { from: "ai", time: "11:32", text: "✅ Programare salvată! Dacă simptomele se agravează, sunați la urgențe." },
    ],
    roiRows: [
      { label: "Apeluri în afara programului", before: "15+/săpt.", after: "0" },
      { label: "Timp recepție / zi", before: "2.5 ore", after: "25 min" },
      { label: "Vaccinări ratate (remindere)", before: "Manual", after: "Automat" },
    ],
    roiHighlight: "Cabinetele veterinare cu triaj WhatsApp prioritizează urgențele reale și umplu agenda de consultații.",
    contentSections: [
      {
        heading: "Recepție digitală pentru cabinete veterinare",
        paragraphs: [
          "Cabinetele veterinare primesc simultan apeluri, mesaje și urgențe. Asistenții AI VIDIA fac triaj pe WhatsApp: consultație de rutină, vaccinare, deparazitare sau redirecționare urgență. Programările automate eliberează asistentele veterinare să se concentreze pe pacienți, nu pe telefon.",
          "Proprietarii de animale pot programa consultații seara, când observă simptome — fără a aștepta dimineața următoare pentru un slot.",
        ],
      },
      {
        heading: "Vaccinări, remindere și fidelizare",
        paragraphs: [
          "Remindere automate pentru vaccinări anuale, deparazitări și controale. SMS marketing pentru campanii promo — pachete sterilizare, reducere analize — cu consimțământ explicit GDPR.",
          "Istoricul conversațiilor ajută medicul să vadă ce a raportat proprietarul înainte de vizită.",
        ],
      },
      {
        heading: "Sigur, conform, nativ",
        paragraphs: [
          "Datele proprietarilor și pacienților sunt prelucrate securizat. Pacienții sunt informați că vorbesc cu un sistem AI acolo unde legea o impune. VIDIA este construit în România, pentru cabinete veterinare care vor programări automate pe WhatsApp fără compromisuri tehnice.",
        ],
      },
    ],
  },
};

export const NICHE_FOOTER_LINKS = NICHE_SLUGS.map((slug) => ({
  slug,
  path: `/nishe/${slug}`,
  label: NICHES[slug].footerLinkLabel,
}));

export function isNicheSlug(value: string | undefined): value is NicheSlug {
  return Boolean(value && NICHE_SLUGS.includes(value as NicheSlug));
}

export function getNiche(slug: string | undefined): NicheConfig | null {
  if (!isNicheSlug(slug)) return null;
  return NICHES[slug];
}
