/** Ordinea meniului = ordinea secțiunilor în DOM (fără Hero / Contact). */
export const NAV_SECTIONS = [
  { id: "demo", label: "Simulări" },
  { id: "afaceri", label: "Afaceri acoperite" },
  { id: "cum-functioneaza", label: "Cum funcționează" },
  { id: "preturi", label: "Prețuri" },
  { id: "contact", label: "Contact" },
  { id: "faq", label: "FAQ" },
  { id: "despre", label: "Despre VIDIA" },
] as const;

export type NavSectionId = (typeof NAV_SECTIONS)[number]["id"];
