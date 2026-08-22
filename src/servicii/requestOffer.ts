import { saveSelectedPlan, scrollToContact } from "../plans";

/** Prefill contact form and scroll — from homepage or service pages. */
export function requestServiceOffer(serviceLabel: string) {
  saveSelectedPlan("Personalizat", `Serviciu solicitat: ${serviceLabel}`);

  const onHome =
    window.location.pathname === "/" || window.location.pathname === "";

  if (onHome) {
    scrollToContact();
    return;
  }

  window.location.href = "/#contact";
}
