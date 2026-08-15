/** Date de contact oficiale VIDIA — folosite în canale, QR și formular. */
export const CONTACT_EMAIL = "contact@getvidia.ro";
export const CONTACT_PHONE = "+40722830314";
export const CONTACT_PHONE_DISPLAY = "+40 722 830 314";
export const CONTACT_PHONE_WA = "40722830314";

export const CONTACT_PRESET_TEXT =
  "Salut! Mă interesează unul dintre serviciile oferite.";

export const WHATSAPP_URL = `https://wa.me/${CONTACT_PHONE_WA}?text=${encodeURIComponent(CONTACT_PRESET_TEXT)}`;
export const MAILTO_URL = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Solicitare Servicii")}&body=${encodeURIComponent(CONTACT_PRESET_TEXT)}`;
export const TEL_URL = `tel:${CONTACT_PHONE}`;

/** Web3Forms — cheia vine din VITE_WEB3FORMS_ACCESS_KEY (vezi .env.example). */
export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
export const WEB3FORMS_ACCESS_KEY = (
  import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined
)?.trim();

export function buildLeadMailto(fields: {
  phone: string;
  email: string;
  businessType: string;
  plan: string;
}): string {
  const subject = `Solicitare VIDIA — ${fields.plan}`;
  const body = [
    "Solicitare de pe site-ul VIDIA:",
    "",
    `Telefon: ${fields.phone}`,
    `E-mail: ${fields.email}`,
    `Tip afacere: ${fields.businessType}`,
    `Plan dorit: ${fields.plan}`,
  ].join("\n");

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
