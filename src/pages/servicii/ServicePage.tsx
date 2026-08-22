import { Link, Navigate, useParams } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Seo, SITE_ORIGIN } from "../../components/Seo";
import { getService } from "../../servicii/config";
import { requestServiceOffer } from "../../servicii/requestOffer";
import { buildNicheServiceJsonLd } from "../../seo/site-schema";

export function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const service = getService(slug);

  if (!service) {
    return <Navigate to="/" replace />;
  }

  const path = `/servicii/${service.slug}`;

  return (
    <>
      <Seo
        title={service.meta.title}
        description={service.meta.description}
        path={path}
        jsonLd={buildNicheServiceJsonLd({
          name: service.offerLabel,
          description: service.meta.description,
          url: `${SITE_ORIGIN}${path}`,
          serviceType: service.offerLabel,
        })}
      />
      <Header />
      <main className="niche-page service-page">
        <section className="niche-hero section" aria-labelledby="service-hero-title">
          <div className="container">
            <p className="section-label">{service.label}</p>
            <h1 id="service-hero-title" className="section-title niche-hero-title">
              {service.heroTitle}
            </h1>
            <p className="section-lead">{service.heroSubtitle}</p>
            <div className="niche-hero-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => requestServiceOffer(service.offerLabel)}
              >
                Solicită ofertă personalizată
              </button>
              <Link to="/#preturi" className="btn btn-ghost">
                Vezi pachetul Booking
              </Link>
            </div>
          </div>
        </section>

        <section className="section service-benefits" aria-label="Avantaje">
          <div className="container">
            <ul className="service-benefits-list">
              {service.benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className="section niche-content"
          aria-labelledby="service-content-title"
        >
          <div className="container niche-content-inner">
            <h2 id="service-content-title" className="section-title">
              Detalii serviciu
            </h2>
            {service.contentSections.map((section) => (
              <article key={section.heading} className="niche-content-block">
                <h3>{section.heading}</h3>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </article>
            ))}
          </div>
        </section>

        <section className="section service-cta-band" aria-label="Solicită ofertă">
          <div className="container service-cta-inner">
            <h2 className="section-title">Ofertă personalizată, fără costuri ascunse</h2>
            <p className="section-lead">
              Spune-ne despre afacerea ta — revenim cu propunere clară, termene și
              pașii următori.
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => requestServiceOffer(service.offerLabel)}
            >
              Solicită ofertă personalizată
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
