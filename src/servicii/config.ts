export type ServiceSlug =
  | "creare-site-calendar"
  | "integrare-calendar-existent";

export type ServiceContentSection = {
  heading: string;
  paragraphs: string[];
};

export type ServiceConfig = {
  slug: ServiceSlug;
  label: string;
  heroTitle: string;
  heroSubtitle: string;
  offerLabel: string;
  meta: {
    title: string;
    description: string;
  };
  contentSections: ServiceContentSection[];
  benefits: string[];
};

export const SERVICE_SLUGS: ServiceSlug[] = [
  "creare-site-calendar",
  "integrare-calendar-existent",
];

export const SERVICES: Record<ServiceSlug, ServiceConfig> = {
  "creare-site-calendar": {
    slug: "creare-site-calendar",
    label: "Site nou + widget",
    offerLabel: "Creare site nou cu widget de programare integrat",
    heroTitle: "Creare site nou cu widget de programare integrat",
    heroSubtitle:
      "Pachet complet pentru antreprenori: site de prezentare rapid, optimizat SEO, design modern — cu widget-ul VIDIA de programări încorporat din prima zi, conectat la fluxurile tale reale de rezervare.",
    meta: {
      title:
        "Creare Site Nou cu Widget Programări Integrat | VIDIA",
      description:
        "Site de prezentare nou cu widget de programare integrat pe pagină. Ofertă personalizată pentru saloane, clinici și afaceri locale din România.",
    },
    benefits: [
      "Design minimalist, rapid și optimizat pentru Google",
      "Widget de programare integrat vizibil pe site — fără aplicații separate",
      "Un singur partener: site + widget + automatizare + suport",
      "Ofertă personalizată în funcție de servicii, sloturi și locații",
    ],
    contentSections: [
      {
        heading: "Tot ce ai nevoie pentru a începe online",
        paragraphs: [
          "Multe afaceri locale lansează un site frumos, dar trimit clienții la telefon sau la un link extern pentru programări — și pierd conversii. Pachetul VIDIA „Site nou + widget” livrează ambele din start: identitate digitală clară și un widget de programare integrat direct în paginile site-ului.",
          "Construim site-ul pe baza informațiilor tale (servicii, prețuri orientative, locație, echipă), cu structură SEO pentru piața din România. Widget-ul permite alegerea serviciului, a intervalului și confirmarea — totul fără ca vizitatorul să părăsească site-ul tău.",
        ],
      },
      {
        heading: "Ce include pachetul",
        paragraphs: [
          "Site de prezentare responsiv, pagini esențiale (Acasă, Servicii, Contact), widget de programare integrat (buton sau secțiune dedicată), conectare la backend-ul VIDIA, sincronizare cu disponibilitatea reală și instruire scurtă pentru echipa ta.",
          "Prețul se stabilește personalizat — depinde de numărul de pagini, servicii configurate, sloturi de programare și funcții suplimentare (SMS marketing, triaj consulting). Nu afișăm un tarif fix online tocmai ca să adaptăm soluția la realitatea afacerii tale.",
        ],
      },
      {
        heading: "Pentru cine este ideal",
        paragraphs: [
          "Saloane, clinici stomatologice, barber-shop-uri, stații ITP, cabinete veterinare sau orice business local care pornește de la zero online și vrea ca programările să se facă direct de pe site, nu prin tool-uri disparate.",
          "Completează formularul de mai jos sau apasă „Solicită ofertă personalizată” — revenim cu o propunere clară, termene și pașii de implementare.",
        ],
      },
    ],
  },
  "integrare-calendar-existent": {
    slug: "integrare-calendar-existent",
    label: "Widget pe site existent",
    offerLabel: "Integrare widget de programare pe site existent",
    heroTitle: "Integrare widget de programări pe site-ul tău existent",
    heroSubtitle:
      "Ai deja un site funcțional? Încorporăm widget-ul VIDIA de programare în platforma ta actuală — indiferent de CMS (WordPress, Wix, custom sau alt sistem).",
    meta: {
      title: "Integrare Widget Programări pe Site Existent | VIDIA",
      description:
        "Adăugăm widget de programare integrat pe site-ul tău actual. Ofertă personalizată în funcție de platformă, servicii și fluxuri de rezervare.",
    },
    benefits: [
      "Păstrezi site-ul și domeniul pe care le ai deja",
      "Widget integrat în pagini cheie — fără reconstrucție completă",
      "Compatibil cu majoritatea platformelor web",
      "Ofertă adaptată complexității tehnice reale",
    ],
    contentSections: [
      {
        heading: "De ce integrare, nu site nou",
        paragraphs: [
          "Dacă ai investit deja într-un site care arată bine și este indexat în Google, nu are sens să o iei de la zero. VIDIA adaugă un widget de programare integrat în paginile unde clienții iau decizia: servicii, contact, pagini de landing.",
          "Vizitatorii rămân pe site-ul familiar, aleg serviciul și intervalul din widget, iar rezervarea se procesează în backend-ul VIDIA — confirmări și remindere automate, fără cozi la telefon.",
        ],
      },
      {
        heading: "Cum lucrăm tehnic",
        paragraphs: [
          "Analizăm platforma actuală (WordPress, Shopify, site static, page builder etc.), identificăm locurile optime pentru widget și implementăm embed-ul (script, iframe sau componentă custom). Disponibilitatea se sincronizează cu calendarul echipei, iar tu controlezi ce poate fi rezervat online.",
          "Fiecare proiect are particularități — de la un singur punct de programare la mai multe locații — de aceea oferta se personalizează după un scurt call sau formular de brief.",
        ],
      },
      {
        heading: "Următorul pas",
        paragraphs: [
          "Trimite-ne URL-ul site-ului tău și tipul de afacere. Îți răspundem cu estimare de efort, timeline și pachet recomandat (Booking, PRO sau integrare custom).",
          "Apasă „Solicită ofertă personalizată” — formularul de contact se deschide cu serviciul precompletat.",
        ],
      },
    ],
  },
};

export function isServiceSlug(value: string | undefined): value is ServiceSlug {
  return Boolean(value && SERVICE_SLUGS.includes(value as ServiceSlug));
}

export function getService(slug: string | undefined): ServiceConfig | null {
  if (!isServiceSlug(slug)) return null;
  return SERVICES[slug];
}

export const HOMEPAGE_SERVICES = [
  {
    id: "booking-core",
    tag: "Core",
    title: "Sistem automatizat de programări WhatsApp",
    description:
      "Asistent IA disponibil 24/7 care preia programările direct pe WhatsApp, eliminând orele pierdute la telefon.",
    priceLabel: "De la 180 lei/lună",
    priceNote: "Conform grilei de abonament Booking.",
    cta: { type: "pricing" as const, label: "Vezi prețurile" },
  },
  {
    id: "site-calendar",
    tag: "Pachet complet",
    title: "Creare site nou + widget de programare integrat",
    description:
      "Dezvoltăm site-ul de la zero (rapid, optimizat SEO, design modern) cu widget-ul VIDIA de programări încorporat din prima zi — clienții rezervă direct pe site.",
    cta: {
      type: "page" as const,
      label: "Solicită oferta",
      path: "/servicii/creare-site-calendar",
    },
  },
  {
    id: "integrare",
    tag: "Integrare",
    title: "Integrare widget de programări pe site existent",
    description:
      "Ai deja un site funcțional? Integrăm widget-ul de programare VIDIA în paginile tale — fără reconstrucție, indiferent de platformă.",
    cta: {
      type: "page" as const,
      label: "Solicită oferta",
      path: "/servicii/integrare-calendar-existent",
    },
  },
  {
    id: "consulting",
    tag: "Consulting",
    title: "Triaj conversațional și fluxuri WhatsApp",
    description:
      "Asistent IA pentru conversații, triaj și interacțiuni nelimitate — răspunsuri la întrebări frecvente, calificare lead-uri și suport clienți 24/7.",
    priceLabel: "De la 180 lei/lună",
    priceNote: "Conform grilei de abonament Consulting.",
    cta: { type: "pricing" as const, label: "Vezi prețurile" },
  },
  {
    id: "sms-marketing",
    tag: "SMS",
    title: "SMS marketing și campanii promo",
    description:
      "Campanii personalizate către clienții existenți: oferte sezoniere, reactivare clienți inactivi și remindere — fără abonament obligatoriu.",
    priceLabel: "De la 1,80 lei / SMS + TVA",
    priceNote: "Taxă campanie 375 lei + TVA doar în lunile active.",
    cta: { type: "pricing" as const, label: "Vezi prețurile" },
  },
] as const;
