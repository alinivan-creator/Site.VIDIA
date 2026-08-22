export type NicheSlug =
  | "stomatologie"
  | "barbershop"
  | "saloane-infrumusetare"
  | "statii-itp";

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

export type NicheConfig = {
  slug: NicheSlug;
  label: string;
  businessName: string;
  heroTitle: string;
  heroSubtitle: string;
  meta: {
    title: string;
    description: string;
  };
  simHeader: string;
  messages: NicheMessage[];
  roiRows: NicheRoiRow[];
  roiHighlight: string;
};

export const NICHE_SLUGS: NicheSlug[] = [
  "stomatologie",
  "barbershop",
  "saloane-infrumusetare",
  "statii-itp",
];

export const NICHES: Record<NicheSlug, NicheConfig> = {
  stomatologie: {
    slug: "stomatologie",
    label: "Stomatologie",
    businessName: "Clinica Dentara Smile",
    heroTitle:
      "Automatizarea WhatsApp pentru Stomatologie: Agenda plină fără să ridici telefonul",
    heroSubtitle:
      "Pacienții programează detartraj, consultații și urgențe direct pe WhatsApp — 24/7, fără recepție blocată la telefon.",
    meta: {
      title:
        "WhatsApp pentru Clinici Stomatologice | Programări automate — GetVidia",
      description:
        "Automatizează programările pe WhatsApp pentru clinici stomatologice din România. Confirmări, remindere și triaj pacienți 24/7 cu VIDIA.",
    },
    simHeader: "Clinica Dentara Smile",
    messages: [
      {
        from: "client",
        time: "09:12",
        text: "Bună ziua, aș vrea o programare pentru detartraj.",
      },
      {
        from: "ai",
        time: "09:12",
        text: "Salut! Cu plăcere. Alege serviciul din listă sau scrie numele — ex: Consultație, Detartraj, Albire.",
      },
      {
        from: "client",
        time: "09:13",
        quote: { title: "Tu", body: "Detartraj" },
        text: "Detartraj, dacă se poate miercuri dimineața.",
      },
      {
        from: "ai",
        time: "09:13",
        text: "Am liber Miercuri 26 Aug, 09:30 — Cabinet Dr. Popescu. Confirmi programarea?",
      },
      {
        from: "client",
        time: "09:14",
        text: "Da, confirm!",
      },
      {
        from: "ai",
        time: "09:14",
        text: "✅ Programare confirmată! Vei primi remindere cu 24h înainte. Ne vedem miercuri!",
      },
    ],
    roiRows: [
      { label: "Programări ratate / săptămână", before: "4", after: "0" },
      { label: "Timp recepție la telefon / zi", before: "2 ore", after: "15 min" },
      { label: "Confirmări trimise automat", before: "Manual", after: "100%" },
    ],
    roiHighlight:
      "O clinică cu 4 programări pierdute/săptămână recuperează ~1.600 lei/lună doar din răspunsuri instant.",
  },
  barbershop: {
    slug: "barbershop",
    label: "Barbershop",
    businessName: "Barber Shop Elite",
    heroTitle:
      "Automatizarea WhatsApp pentru Barbershop: Agenda plină fără să ridici telefonul",
    heroSubtitle:
      "Clienții rezervă tuns, barbă sau combo direct din chat — fără mesaje pierdute în timpul programărilor.",
    meta: {
      title:
        "WhatsApp pentru Barbershop | Programări automate tuns & barbă — GetVidia",
      description:
        "Programări WhatsApp automate pentru barbershop-uri din România. Sloturi libere, confirmări și remindere — fără telefon ocupat.",
    },
    simHeader: "Barber Shop Elite",
    messages: [
      {
        from: "client",
        time: "18:05",
        text: "Salut, vreau sa fac si eu o programare",
      },
      {
        from: "ai",
        time: "18:05",
        text: "Salut! Ce serviciu dorești? Tuns Clasic, Tuns + Barba sau Aranjat Barba?",
      },
      {
        from: "client",
        time: "18:06",
        quote: { title: "Tu", body: "Tuns + Barba" },
        text: "Tuns + Barba, miercuri dimineața.",
      },
      {
        from: "ai",
        time: "18:06",
        text: "Perfect — Miercuri 26 Aug, 09:30 cu Andrei. Vrei să confirmi programarea?",
      },
      {
        from: "client",
        time: "18:07",
        text: "Confirm!",
      },
      {
        from: "ai",
        time: "18:07",
        text: "✅ Gata! Te așteptăm miercuri la 09:30. Ai primit confirmarea pe WhatsApp.",
      },
    ],
    roiRows: [
      { label: "Programări ratate / săptămână", before: "3", after: "0" },
      { label: "Mesaje nerăspunse seara", before: "Da", after: "Nu" },
      { label: "Timp pierdut cu sloturi", before: "~45 min/zi", after: "0" },
    ],
    roiHighlight:
      "Barbershop-urile care răspund instant pe WhatsApp umplu scaunele goale din serile aglomerate.",
  },
  "saloane-infrumusetare": {
    slug: "saloane-infrumusetare",
    label: "Saloane de înfrumusețare",
    businessName: "Studio Glow",
    heroTitle:
      "Automatizarea WhatsApp pentru Saloane de Înfrumusețare: Agenda plină fără să ridici telefonul",
    heroSubtitle:
      "Manichiură, coafură, machiaj — clientele aleg serviciul, specialistul și ora, fără apeluri repetate.",
    meta: {
      title:
        "WhatsApp pentru Saloane de Înfrumusețare | Programări automate — GetVidia",
      description:
        "Programări WhatsApp pentru saloane de înfrumusețere din România. Alege serviciul, stilistul și intervalul — automat, 24/7.",
    },
    simHeader: "Studio Glow",
    messages: [
      {
        from: "client",
        time: "14:20",
        text: "Bună! Aveți loc vineri pentru manichiură gel?",
      },
      {
        from: "ai",
        time: "14:20",
        text: "Salut! Da — alege serviciul (Manichiură clasică, Gel, Pedichiură) sau scrie preferința ta.",
      },
      {
        from: "client",
        time: "14:21",
        quote: { title: "Tu", body: "Manichiură gel" },
        text: "Manichiură gel cu Ioana, vineri după-amiază.",
      },
      {
        from: "ai",
        time: "14:21",
        text: "Am Vineri 28 Aug, 16:00 — Ioana, Manichiură gel (90 min). Confirmi?",
      },
      {
        from: "client",
        time: "14:22",
        text: "Perfect, confirm!",
      },
      {
        from: "ai",
        time: "14:22",
        text: "✅ Programare salvată! Îți trimitem remindere cu 24h înainte. Mulțumim!",
      },
    ],
    roiRows: [
      { label: "Programări ratate / săptămână", before: "5", after: "0" },
      { label: "No-show-uri", before: "18%", after: "6%" },
      { label: "Remindere automate", before: "Nu", after: "Da" },
    ],
    roiHighlight:
      "Saloanele cu remindere automate reduc no-show-urile și umplu locurile eliberate în timp util.",
  },
  "statii-itp": {
    slug: "statii-itp",
    label: "Stații ITP",
    businessName: "ITP Auto Nord",
    heroTitle:
      "Automatizarea WhatsApp pentru Stații ITP: Agenda plină fără să ridici telefonul",
    heroSubtitle:
      "Șoferii programează inspecția ITP pe WhatsApp — aleg data, ora și introduc datele mașinii, fără cozi la telefon.",
    meta: {
      title:
        "WhatsApp pentru Stații ITP | Programări inspecție auto — GetVidia",
      description:
        "Programări ITP automate pe WhatsApp pentru stații din România. Sloturi, confirmări și remindere — fără telefon ocupat.",
    },
    simHeader: "ITP Auto Nord",
    messages: [
      {
        from: "client",
        time: "08:40",
        text: "Bună, vreau programare ITP pentru Dacia Logan, B 123 ABC.",
      },
      {
        from: "ai",
        time: "08:40",
        text: "Salut! Am nevoie de data preferată. Alege din zilele disponibile sau scrie „sâmbătă dimineața”.",
      },
      {
        from: "client",
        time: "08:41",
        quote: { title: "Tu", body: "Sâmbătă dimineața" },
        text: "Sâmbătă dimineața, prima oră liberă.",
      },
      {
        from: "ai",
        time: "08:41",
        text: "Am Sâmbătă 30 Aug, 08:00 — ITP Auto Nord, rampa 2. Adu talonul și CI-ul. Confirmi?",
      },
      {
        from: "client",
        time: "08:42",
        text: "Da, confirm.",
      },
      {
        from: "ai",
        time: "08:42",
        text: "✅ Programare ITP confirmată! Vei primi SMS/WhatsApp cu 24h înainte. Drum bun!",
      },
    ],
    roiRows: [
      { label: "Apeluri pierdute / zi", before: "8–12", after: "0" },
      { label: "Programări ratate / săptămână", before: "3", after: "0" },
      { label: "Timp recepție / zi", before: "3 ore", after: "20 min" },
    ],
    roiHighlight:
      "Stațiile ITP cu programări online umplu rampa și reduc aglomerarea de luni dimineață.",
  },
};

export function isNicheSlug(value: string | undefined): value is NicheSlug {
  return Boolean(value && NICHE_SLUGS.includes(value as NicheSlug));
}

export function getNiche(slug: string | undefined): NicheConfig | null {
  if (!isNicheSlug(slug)) return null;
  return NICHES[slug];
}
