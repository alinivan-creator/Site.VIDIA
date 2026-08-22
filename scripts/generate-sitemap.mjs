import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { SITE_ORIGIN, SITEMAP_ROUTES } from "./sitemap-routes.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, "..", "public", "sitemap.xml");
const lastmod = new Date().toISOString().slice(0, 10);

const urls = SITEMAP_ROUTES.map(
  ({ path, changefreq, priority }) => `  <url>
    <loc>${SITE_ORIGIN}${path === "/" ? "/" : path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
).join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

writeFileSync(outPath, xml, "utf8");
console.log(`Sitemap generat: ${outPath} (${SITEMAP_ROUTES.length} URL-uri, lastmod ${lastmod})`);
