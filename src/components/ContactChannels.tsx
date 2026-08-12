import { QRCodeSVG } from "qrcode.react";

const CONTACT_PHONE = "+40700000000";
const CONTACT_PHONE_DISPLAY = "+40 700 000 000";
const CONTACT_EMAIL = "contact@vidia.ro";

const PRESET_TEXT = "Salut! Mă interesează unul dintre serviciile oferite.";

const WHATSAPP_URL = `https://wa.me/${CONTACT_PHONE.replace("+", "")}?text=${encodeURIComponent(PRESET_TEXT)}`;
const MAILTO_URL = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Solicitare Servicii")}&body=${encodeURIComponent(PRESET_TEXT)}`;
const TEL_URL = `tel:${CONTACT_PHONE}`;

const VCARD = [
  "BEGIN:VCARD",
  "VERSION:3.0",
  "FN:VIDIA",
  "ORG:VIDIA",
  `TEL;TYPE=CELL:${CONTACT_PHONE}`,
  `EMAIL:${CONTACT_EMAIL}`,
  "END:VCARD",
].join("\n");

const qrCodes = [
  { value: WHATSAPP_URL, label: "WhatsApp" },
  { value: VCARD, label: "Salvează contact" },
  { value: MAILTO_URL, label: "E-mail rapid" },
  { value: TEL_URL, label: "Apel telefonic" },
];

export function ContactChannels() {
  return (
    <section id="contact-rapid" className="section contact-channels">
      <div className="container">
        <div className="contact-cta-card">
          <div className="footer-contact contact-channels-grid">
          <div className="footer-contact-info">
            <h3>Contactează-ne direct</h3>
            <p>
              Scanează unul dintre codurile QR sau folosește linkurile de mai
              jos:
            </p>

            <div className="footer-contact-links">
              <a href={MAILTO_URL} className="footer-contact-link">
                <span className="footer-contact-icon" aria-hidden="true">
                  ✉
                </span>
                <span>Trimite-ne un e-mail</span>
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-link footer-contact-link-wa"
              >
                <span className="footer-contact-icon" aria-hidden="true">
                  💬
                </span>
                <span>Deschide WhatsApp (mesaj presetat)</span>
              </a>
              <a href={TEL_URL} className="footer-contact-link">
                <span className="footer-contact-icon" aria-hidden="true">
                  📞
                </span>
                <span>Sună-ne direct: {CONTACT_PHONE_DISPLAY}</span>
              </a>
            </div>

            <p className="contact-channels-note">
              …sau <a href="#contact">completează formularul de mai sus</a> și
              te contactăm noi.
            </p>
          </div>

          <div className="footer-qr-panel">
            <p className="footer-qr-title">Coduri QR interactive</p>
            <div className="footer-qr-grid">
              {qrCodes.map((qr) => (
                <div key={qr.label} className="footer-qr-item">
                  <span className="footer-qr-code">
                    <QRCodeSVG
                      value={qr.value}
                      size={80}
                      bgColor="#ffffff"
                      fgColor="#111111"
                      level="M"
                    />
                  </span>
                  <span className="footer-qr-label">{qr.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
