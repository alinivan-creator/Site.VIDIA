import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_DISPLAY,
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
  href?: string;
  label: string;
  external?: boolean;
  download?: string;
  copyValue?: string;
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
    value: CONTACT_EMAIL,
    label: "E-mail rapid",
    copyValue: CONTACT_EMAIL,
  },
  {
    value: TEL_URL,
    href: TEL_URL,
    label: "Apel telefonic",
  },
];

function CopyIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function ContactChannels() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedQr, setCopiedQr] = useState(false);

  const onCopyEmail = async () => {
    const ok = await copyText(CONTACT_EMAIL);
    if (!ok) return;
    setCopiedEmail(true);
    window.setTimeout(() => setCopiedEmail(false), 1800);
  };

  const onCopyQrEmail = async () => {
    const ok = await copyText(CONTACT_EMAIL);
    if (!ok) return;
    setCopiedQr(true);
    window.setTimeout(() => setCopiedQr(false), 1800);
  };

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
                <div className="footer-contact-link footer-contact-email">
                  <span className="footer-contact-icon" aria-hidden="true">
                    ✉
                  </span>
                  <span className="footer-contact-email-text">
                    E-mail: {CONTACT_EMAIL}
                  </span>
                  <button
                    type="button"
                    className="footer-contact-copy"
                    onClick={onCopyEmail}
                    aria-label={
                      copiedEmail
                        ? "Adresa de e-mail a fost copiată"
                        : `Copiază ${CONTACT_EMAIL}`
                    }
                    title={copiedEmail ? "Copiat!" : "Copiază adresa"}
                  >
                    {copiedEmail ? (
                      <span className="footer-contact-copy-done" aria-hidden="true">
                        ✓
                      </span>
                    ) : (
                      <CopyIcon />
                    )}
                  </button>
                </div>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-contact-link footer-contact-link-wa"
                >
                  <span className="footer-contact-icon" aria-hidden="true">
                    💬
                  </span>
                  <span>Deschide WhatsApp</span>
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
                {qrCodes.map((qr) =>
                  qr.copyValue ? (
                    <button
                      key={qr.label}
                      type="button"
                      className="footer-qr-item"
                      onClick={onCopyQrEmail}
                      aria-label={
                        copiedQr
                          ? "Adresa de e-mail a fost copiată"
                          : `Copiază ${qr.copyValue}`
                      }
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
                      <span className="footer-qr-label">
                        {copiedQr ? "Copiat!" : qr.label}
                      </span>
                    </button>
                  ) : (
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
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
