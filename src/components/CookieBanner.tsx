import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  readCookieConsent,
  saveCookieConsent,
  type CookieConsent,
} from "../cookies-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(readCookieConsent() === null);
  }, []);

  const choose = (consent: CookieConsent) => {
    saveCookieConsent(consent);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="cookie-banner"
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      aria-live="polite"
    >
      <div className="cookie-banner-inner container">
        <div className="cookie-banner-copy">
          <p id="cookie-banner-title" className="cookie-banner-title">
            Cookie-uri
          </p>
          <p id="cookie-banner-desc" className="cookie-banner-text">
            Folosim cookie-uri pentru a îmbunătăți experiența pe site.{" "}
            <Link to="/cookies">Politica de Cookies</Link>.
          </p>
        </div>
        <div className="cookie-banner-actions">
          <button
            type="button"
            className="btn btn-primary cookie-banner-btn"
            onClick={() => choose("all")}
          >
            Accept
          </button>
          <button
            type="button"
            className="btn btn-ghost cookie-banner-btn"
            onClick={() => choose("essential")}
          >
            Doar esențiale
          </button>
          <button
            type="button"
            className="btn btn-ghost cookie-banner-btn cookie-banner-btn-muted"
            onClick={() => choose("rejected")}
          >
            Respinge
          </button>
        </div>
      </div>
    </div>
  );
}
