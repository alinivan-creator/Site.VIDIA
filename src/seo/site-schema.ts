export const SITE_ORIGIN = "https://www.getvidia.ro";
export const ORGANIZATION_ID = `${SITE_ORIGIN}/#organization`;
export const SOFTWARE_ID = `${SITE_ORIGIN}/#software`;
export const LOCAL_BUSINESS_ID = `${SITE_ORIGIN}/#localbusiness`;

export const organizationJsonLd = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: "GetVidia",
  alternateName: ["VIDIA", "Get Vidia"],
  url: SITE_ORIGIN,
  logo: `${SITE_ORIGIN}/icon-192.png`,
  image: `${SITE_ORIGIN}/og-image.png`,
  email: "contact@getvidia.ro",
  telephone: "+40722830314",
  description:
    "Agenți AI și asistenți AI pentru automatizări WhatsApp, programări automate 24/7, SMS marketing și campanii promo prin SMS — soluție nativă din România.",
  areaServed: { "@type": "Country", name: "Romania" },
  knowsAbout: [
    "agenți AI",
    "asistenți AI",
    "automatizări WhatsApp",
    "programări automate pe WhatsApp",
    "SMS marketing",
    "campanie promo prin SMS",
    "aplicații de programare salon",
    "programări clinici stomatologice",
    "programări stații ITP",
  ],
  sameAs: ["https://wa.me/40722830314"],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+40722830314",
    contactType: "sales",
    email: "contact@getvidia.ro",
    availableLanguage: ["Romanian"],
  },
};

export const localBusinessJsonLd = {
  "@type": "LocalBusiness",
  "@id": LOCAL_BUSINESS_ID,
  name: "GetVidia — VIDIA",
  url: SITE_ORIGIN,
  image: `${SITE_ORIGIN}/og-image.png`,
  telephone: "+40722830314",
  email: "contact@getvidia.ro",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressCountry: "RO",
  },
  areaServed: {
    "@type": "Country",
    name: "Romania",
  },
  description:
    "Servicii de agenți AI și automatizări WhatsApp pentru afaceri locale din România: saloane, barber-shop-uri, clinici stomatologice, stații ITP, cosmetică canină și cabinete veterinare.",
  parentOrganization: { "@id": ORGANIZATION_ID },
};

export const softwareApplicationJsonLd = {
  "@type": "SoftwareApplication",
  "@id": SOFTWARE_ID,
  name: "VIDIA",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: SITE_ORIGIN,
  description:
    "Platformă de agenți AI și asistenți AI pentru automatizări WhatsApp: programări automate 24/7, confirmări, remindere anti no-show, triaj conversațional și SMS marketing.",
  provider: { "@id": ORGANIZATION_ID },
  offers: {
    "@type": "Offer",
    url: `${SITE_ORIGIN}/#preturi`,
    priceCurrency: "RON",
    availability: "https://schema.org/InStock",
  },
  featureList: [
    "Programări automate pe WhatsApp",
    "Asistenți AI pentru recepție digitală",
    "SMS marketing și campanii promo",
    "Integrare Google Calendar",
  ],
};

export function buildHomeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd,
      localBusinessJsonLd,
      softwareApplicationJsonLd,
      {
        "@type": "WebSite",
        "@id": `${SITE_ORIGIN}/#website`,
        url: SITE_ORIGIN,
        name: "GetVidia",
        inLanguage: "ro-RO",
        publisher: { "@id": ORGANIZATION_ID },
      },
    ],
  };
}

export function buildNicheServiceJsonLd(input: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd,
      {
        "@type": "Service",
        name: input.name,
        description: input.description,
        url: input.url,
        serviceType: input.serviceType,
        provider: { "@id": ORGANIZATION_ID },
        areaServed: { "@type": "Country", name: "Romania" },
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: input.url,
          servicePhone: "+40722830314",
        },
      },
    ],
  };
}
