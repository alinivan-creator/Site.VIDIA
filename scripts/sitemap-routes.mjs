/**
 * Rute indexabile — ține sincronizat cu App.tsx (Routes).
 * Folosit de scripts/generate-sitemap.mjs la build.
 */
export const SITE_ORIGIN = "https://www.getvidia.ro";

export const SITEMAP_ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/tiktok", changefreq: "monthly", priority: "0.6" },
  { path: "/termeni", changefreq: "monthly", priority: "0.4" },
  { path: "/confidentialitate", changefreq: "monthly", priority: "0.4" },
  { path: "/cookies", changefreq: "monthly", priority: "0.3" },
  { path: "/nishe/stomatologie", changefreq: "monthly", priority: "0.8" },
  { path: "/stomatologie", changefreq: "monthly", priority: "0.8" },
  { path: "/nishe/barbershop", changefreq: "monthly", priority: "0.8" },
  { path: "/barbershop", changefreq: "monthly", priority: "0.8" },
  { path: "/nishe/saloane-infrumusetare", changefreq: "monthly", priority: "0.8" },
  { path: "/saloane-infrumusetare", changefreq: "monthly", priority: "0.8" },
  { path: "/nishe/statii-itp", changefreq: "monthly", priority: "0.8" },
  { path: "/statii-itp", changefreq: "monthly", priority: "0.8" },
];
