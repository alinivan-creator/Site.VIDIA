/**
 * Rute indexabile — ține sincronizat cu App.tsx (Routes) și NICHE_SLUGS.
 */
export const SITE_ORIGIN = "https://www.getvidia.ro";

const NICHE_SLUGS = [
  "stomatologie",
  "barbershop",
  "saloane-infrumusetare",
  "statii-itp",
  "cosmetica-canina",
  "cabinet-veterinar",
];

const SERVICE_SLUGS = [
  "creare-site-calendar",
  "integrare-calendar-existent",
];

const serviceRoutes = SERVICE_SLUGS.map((slug) => ({
  path: `/servicii/${slug}`,
  changefreq: "monthly",
  priority: "0.8",
}));

const nicheRoutes = NICHE_SLUGS.flatMap((slug) => [
  { path: `/nishe/${slug}`, changefreq: "monthly", priority: "0.85" },
  { path: `/${slug}`, changefreq: "monthly", priority: "0.85" },
]);

export const SITEMAP_ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/tiktok", changefreq: "monthly", priority: "0.6" },
  { path: "/termeni", changefreq: "monthly", priority: "0.4" },
  { path: "/confidentialitate", changefreq: "monthly", priority: "0.4" },
  { path: "/cookies", changefreq: "monthly", priority: "0.3" },
  ...serviceRoutes,
  ...nicheRoutes,
];
