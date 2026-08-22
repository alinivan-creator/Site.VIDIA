import { Helmet } from "react-helmet-async";

export const SITE_ORIGIN = "https://www.getvidia.ro";
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og-image.png`;

export type SeoProps = {
  title: string;
  description: string;
  /** Path absolut pe site, ex. /termeni */
  path?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  noindex?: boolean;
};

export function Seo({
  title,
  description,
  path,
  canonical,
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_OG_IMAGE,
  noindex = false,
}: SeoProps) {
  const resolvedCanonical = canonical ?? `${SITE_ORIGIN}${path ?? "/"}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={resolvedCanonical} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1"
        />
      )}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ro_RO" />
      <meta property="og:site_name" content="GetVidia" />
      <meta property="og:url" content={resolvedCanonical} />
      <meta property="og:title" content={ogTitle ?? title} />
      <meta property="og:description" content={ogDescription ?? description} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle ?? title} />
      <meta name="twitter:description" content={ogDescription ?? description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
