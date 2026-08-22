import { Link } from "react-router-dom";
import { HOMEPAGE_SERVICES } from "../servicii/config";
import { scrollToPricing } from "../nishe/scrollToPricing";

export function ServicesOffer() {
  return (
    <section id="servicii" className="section services-offer">
      <div className="container services-stage">
        <p className="section-label">Servicii</p>
        <h2 className="section-title">Ce oferim pentru afacerea ta</h2>
        <p className="section-lead">
          De la programări automate pe WhatsApp, la site-uri noi cu widget integrat
          sau adăugarea widget-ului pe platforma pe care o ai deja — soluții clare,
          implementare rapidă.
        </p>

        <ul className="services-grid">
          {HOMEPAGE_SERVICES.map((service) => (
            <li key={service.id} className="service-item">
              <span className="service-name">{service.tag}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              {"priceLabel" in service && service.priceLabel ? (
                <p className="service-price">
                  <strong>{service.priceLabel}</strong>
                  {service.priceNote ? (
                    <span className="service-price-note">{service.priceNote}</span>
                  ) : null}
                </p>
              ) : null}
              <div className="service-item-cta">
                {service.cta.type === "pricing" ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={scrollToPricing}
                  >
                    {service.cta.label}
                  </button>
                ) : (
                  <Link to={service.cta.path} className="btn btn-primary">
                    {service.cta.label}
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
