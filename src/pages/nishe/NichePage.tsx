import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Seo, SITE_ORIGIN } from "../../components/Seo";
import { SignalField } from "../../components/SignalField";
import { getNiche } from "../../nishe/config";
import { NicheSimPreview } from "../../nishe/NicheSimPreview";
import { scrollToPricing } from "../../nishe/scrollToPricing";
import { buildNicheServiceJsonLd } from "../../seo/site-schema";

export function NichePage() {
  const { slug: paramSlug } = useParams<{ slug: string }>();
  const { pathname } = useLocation();
  const slug = paramSlug ?? pathname.replace(/^\//, "").split("/").pop();
  const niche = getNiche(slug);

  if (!niche) {
    return <Navigate to="/" replace />;
  }

  const canonical = `${SITE_ORIGIN}${pathname}`;

  return (
    <>
      <Seo
        title={niche.meta.title}
        description={niche.meta.description}
        path={pathname}
        jsonLd={buildNicheServiceJsonLd({
          name: niche.serviceType,
          description: niche.meta.description,
          url: canonical,
          serviceType: niche.serviceType,
        })}
      />
      <Header />
      <main className="niche-page">
        <section className="niche-hero section" aria-labelledby="niche-hero-title">
          <div className="container niche-hero-grid">
            <div className="niche-hero-copy">
              <p className="section-label">{niche.label}</p>
              <h1 id="niche-hero-title" className="section-title niche-hero-title">
                {niche.heroTitle}
              </h1>
              <p className="section-lead">{niche.heroSubtitle}</p>
              <div className="niche-hero-actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={scrollToPricing}
                >
                  Calculează prețul pentru {niche.label.toLowerCase()}
                </button>
                <Link to="/#contact" className="btn btn-ghost">
                  Solicită demo
                </Link>
              </div>
            </div>
            <div className="niche-hero-visual">
              <NicheSimPreview niche={niche} />
            </div>
          </div>
        </section>

        <section
          className="section niche-content"
          aria-labelledby="niche-content-title"
        >
          <div className="container niche-content-inner">
            <h2 id="niche-content-title" className="section-title">
              Cum ajută VIDIA {niche.label.toLowerCase()}
            </h2>
            {niche.contentSections.map((section) => (
              <article key={section.heading} className="niche-content-block">
                <h3>{section.heading}</h3>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </article>
            ))}
          </div>
        </section>

        <section className="section niche-roi" aria-labelledby="niche-roi-title">
          <div className="container">
            <p className="section-label">Rezultate</p>
            <h2 id="niche-roi-title" className="section-title">
              Înainte vs. După VIDIA
            </h2>
            <p className="section-lead niche-roi-lead">{niche.roiHighlight}</p>

            <div className="niche-roi-table-wrap">
              <table className="niche-roi-table">
                <thead>
                  <tr>
                    <th scope="col">Indicator</th>
                    <th scope="col">Înainte</th>
                    <th scope="col">După VIDIA</th>
                  </tr>
                </thead>
                <tbody>
                  {niche.roiRows.map((row) => (
                    <tr key={row.label}>
                      <th scope="row">{row.label}</th>
                      <td className="niche-roi-before">{row.before}</td>
                      <td className="niche-roi-after">{row.after}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="niche-roi-cta">
              <button
                type="button"
                className="btn btn-primary"
                onClick={scrollToPricing}
              >
                Solicită pachetul selectat — vezi calculatorul
              </button>
            </div>
          </div>
          <SignalField variant="constellation" />
        </section>
      </main>
      <Footer />
    </>
  );
}
