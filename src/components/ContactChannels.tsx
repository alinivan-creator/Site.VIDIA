import { QRCodeSVG } from "qrcode.react";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_DISPLAY,
  MAILTO_URL,
  TEL_URL,
  WHATSAPP_URL,
} from "../contact";

const VCARD = [
  "BEGIN:VCARD",
  "VERSION:3.0",
  "FN:VIDIA",
  "ORG:VIDIA",
  `TEL;TYPE=CELL:${CONTACT_PHONE}`,
  `EMAIL:${CONTACT_EMAIL}`,
  "END:VCARD",
].join("\n");

const VCARD_DOWNLOAD_URL = `data:text/vcard;charset=utf-8,${encodeURIComponent(VCARD)}`;

type QrCodeItem = {
  value: string;
  href: string;
  label: string;
  external?: boolean;
  download?: string;
};

const qrCodes: QrCodeItem[] = [
  {
    value: WHATSAPP_URL,
    href: WHATSAPP_URL,
    label: "WhatsApp",
    external: true,
  },
  {
    value: VCARD,
    href: VCARD_DOWNLOAD_URL,
    label: "Salvează contact",
    download: "vidia.vcf",
  },
  {
    value: `mailto:${CONTACT_EMAIL}`,
    href: MAILTO_URL,
    label: "E-mail rapid",
  },
  {
    value: TEL_URL,
    href: TEL_URL,
    label: "Apel telefonic",
  },
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
                  <span>Trimite-ne un e-mail: {CONTACT_EMAIL}</span>
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
                  <a
                    key={qr.label}
                    href={qr.href}
                    className="footer-qr-item"
                    {...(qr.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    {...(qr.download ? { download: qr.download } : {})}
                    aria-label={qr.label}
                  >
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
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
