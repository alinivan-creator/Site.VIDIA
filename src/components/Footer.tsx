import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { CompliancePanel } from "./CompliancePanel";

const certifications = [
  { code: "ISO 9001", label: "Managementul calității" },
  { code: "ISO 27001", label: "Securitatea informației" },
  { code: "ISO 27701", label: "Protecția datelor" },
];

const technologies = [
  {
    name: "ChatGPT",
    subtitle: "AI",
    logo: "/logos/chatgpt.svg",
    markClass: "tech-logo-chatgpt",
    width: 28,
    height: 28,
  },
  {
    name: "Meta",
    subtitle: "WhatsApp API",
    logo: "/logos/meta.svg",
    markClass: "tech-logo-meta",
    width: 36,
    height: 24,
  },
  {
    name: "Google",
    subtitle: "Calendar",
    logo: "/logos/google.svg",
    markClass: "tech-logo-google",
    width: 26,
    height: 26,
  },
  {
    name: "AWS",
    subtitle: "Hosting",
    logo: "/logos/aws.svg",
    markClass: "tech-logo-aws",
    width: 56,
    height: 28,
  },
  {
    name: "Twilio",
    subtitle: "SMS",
    logo: "/logos/twilio.svg",
    markClass: "tech-logo-twilio",
    width: 26,
    height: 26,
  },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Logo />
          <p>
            Booking, Consulting și SMS Marketing pentru afaceri locale din
            România — partenerul tău virtual pentru programări, triaj inteligent
            și campanii prin GSM, cu control total asupra conversațiilor.
          </p>
        </div>

        <div className="footer-iso">
          <p className="iso-title">Standarde de securitate și conformitate</p>
          <ul className="iso-list" aria-label="Certificări ISO">
            {certifications.map((c) => (
              <li key={c.code}>
                <span className="iso-badge" aria-hidden="true">
                  <svg viewBox="0 0 48 48" width="40" height="40">
                    <circle
                      cx="24"
                      cy="24"
                      r="22"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle
                      cx="24"
                      cy="24"
                      r="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <text
                      x="24"
                      y="27"
                      textAnchor="middle"
                      fontSize="9"
                      fontFamily="Nunito, sans-serif"
                      fontWeight="700"
                      fill="currentColor"
                    >
                      ISO
                    </text>
                  </svg>
                </span>
                <div>
                  <strong>{c.code}</strong>
                  <span>{c.label}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-tech">
          <p className="iso-title">Tehnologii pe care ne bazăm</p>
          <ul className="tech-logos" aria-label="Tehnologii partenere">
            {technologies.map((tech) => (
              <li key={tech.name}>
                <span
                  className={`tech-logo-mark ${tech.markClass}`}
                  aria-hidden="true"
                >
                  <img
                    src={tech.logo}
                    alt=""
                    width={tech.width}
                    height={tech.height}
                  />
                </span>
                <div className="tech-logo-copy">
                  <strong>{tech.name}</strong>
                  <span>{tech.subtitle}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-legal">
          <CompliancePanel variant="compact" className="footer-compliance" />
          <nav aria-label="Documente legale">
            <Link to="/termeni">Termeni și Condiții</Link>
            <Link to="/confidentialitate">Politica de Confidențialitate</Link>
            <Link to="/cookies">Politica de Cookies</Link>
          </nav>
          <p className="copyright">
            Copyright © 2026 VIDIA. Toate drepturile rezervate.
          </p>
        </div>
      </div>
    </footer>
  );
}
