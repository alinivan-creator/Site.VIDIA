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

/** Endpoint FormSubmit.co (AJAX) — la primul submit e nevoie de confirmare pe e-mail. */
export const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;
