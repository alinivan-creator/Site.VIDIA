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
    label: "Site nou + calendar",
    offerLabel: "Creare site nou cu calendar WhatsApp integrat",
    heroTitle: "Creare site nou cu calendar de programări WhatsApp integrat",
    heroSubtitle:
      "Pachet complet pentru antreprenori: site de prezentare rapid, optimizat SEO, design modern VIDIA — cu asistentul IA și programările automate active din prima zi.",
    meta: {
      title:
        "Creare Site Nou cu Calendar Programări WhatsApp integrat | VIDIA",
      description:
        "Site de prezentare nou + automatizare WhatsApp și calendar integrat. Ofertă personalizată pentru saloane, clinici și afaceri locale din România.",
    },
    benefits: [
      "Design minimalist, rapid și optimizat pentru Google",
      "Programări WhatsApp 24/7 incluse din lansare",
      "Un singur partener: site + automatizare + suport",
      "Ofertă personalizată în funcție de numărul de servicii și locații",
    ],
    contentSections: [
      {
        heading: "Tot ce ai nevoie pentru a începe online",
        paragraphs: [
          "Multe afaceri locale încep cu un site simplu și adaugă programările mai târziu — pierzând luni de apeluri și mesaje WhatsApp nerăspunse. Pachetul VIDIA „Site nou + calendar” livrează ambele din start: identitate digitală clară și un asistent IA care preia programările direct pe WhatsApp.",
          "Construim site-ul pe baza informațiilor tale (servicii, prețuri orientative, locație, echipă), cu structură SEO pentru piața din România și accente vizuale aliniate brandului VIDIA: alb, negru, roșu.",
        ],
      },
      {
        heading: "Ce include pachetul",
        paragraphs: [
          "Site de prezentare responsiv, pagini esențiale (Acasă, Servicii, Contact), integrare WhatsApp Business, flux de programări automate, sincronizare Google Calendar și instruire scurtă pentru echipa ta.",
          "Prețul se stabilește personalizat — depinde de numărul de pagini, servicii configurate, calendare și eventuale funcții suplimentare (SMS marketing, triaj consulting). Nu afișăm un tarif fix online tocmai ca să adaptăm soluția la realitatea afacerii tale.",
        ],
      },
      {
        heading: "Pentru cine este ideal",
        paragraphs: [
          "Saloane, clinici stomatologice, barber-shop-uri, stații ITP, cabinete veterinare sau orice business local care pornește de la zero online și vrea programări fără a jongla cu aplicații separate.",
          "Completează formularul de mai jos sau apasă „Solicită ofertă personalizată” — revenim cu o propunere clară, termene și pașii de implementare.",
        ],
      },
    ],
  },
  "integrare-calendar-existent": {
    slug: "integrare-calendar-existent",
    label: "Integrare site existent",
    offerLabel: "Integrare calendar programări pe site existent",
    heroTitle: "Integrare calendar de programări pe site-ul tău existent",
    heroSubtitle:
      "Ai deja un site funcțional? Adăugăm widget-ul VIDIA, fluxurile WhatsApp și inteligența artificială — indiferent de platformă (WordPress, Wix, custom sau alt CMS).",
    meta: {
      title: "Integrare Calendar Programări pe Site Existent | VIDIA",
      description:
        "Integrăm programări WhatsApp și calendar pe site-ul tău actual. Ofertă personalizată în funcție de platformă, fluxuri și număr de calendare.",
    },
    benefits: [
      "Păstrezi site-ul și domeniul pe care le ai deja",
      "Integrare widget + WhatsApp fără reconstrucție completă",
      "Compatibil cu majoritatea platformelor web",
      "Ofertă adaptată complexității tehnice reale",
    ],
    contentSections: [
      {
        heading: "De ce integrare, nu site nou",
        paragraphs: [
          "Dacă ai investit deja într-un site care arată bine și este indexat în Google, nu are sens să o iei de la zero. VIDIA se conectează la infrastructura existentă: adăugăm buton sau widget de programare, legăm WhatsApp-ul afacerii tale și configurăm asistentul IA pe serviciile deja listate.",
          "Clienții rămân pe site-ul familiar, dar experiența de rezervare devine conversațională — mesaje, confirmări și remindere pe WhatsApp, fără cozi la telefon.",
        ],
      },
      {
        heading: "Cum lucrăm tehnic",
        paragraphs: [
          "Analizăm platforma actuală (WordPress, Shopify, site static, page builder etc.), identificăm punctele de integrare și implementăm widget-ul sau link-urile deep către WhatsApp. Calendarul echipei se sincronizează cu Google Calendar, iar tu controlezi ce poate rezerva asistentul.",
          "Fiecare proiect are particularități — de la un singur calendar la mai multe locații — de aceea oferta se personalizează după un scurt call sau formular de brief.",
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
    title: "Creare site nou + calendar integrat",
    description:
      "Dezvoltăm site-ul de la zero (rapid, optimizat SEO, design modern) cu sistemul VIDIA integrat din prima zi.",
    cta: {
      type: "page" as const,
      label: "Solicită oferta",
      path: "/servicii/creare-site-calendar",
    },
  },
  {
    id: "integrare",
    tag: "Integrare",
    title: "Integrare calendar pe site existent",
    description:
      "Ai deja un site funcțional? Integrăm widget-ul de programări și fluxurile WhatsApp direct în platforma ta actuală.",
    cta: {
      type: "page" as const,
      label: "Solicită oferta",
      path: "/servicii/integrare-calendar-existent",
    },
  },
] as const;
