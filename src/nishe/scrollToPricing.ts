/** Navighează la calculatorul de prețuri de pe homepage. */
export function scrollToPricing() {
  const onHome = window.location.pathname === "/" || window.location.pathname === "";

  if (onHome) {
    const target = document.getElementById("preturi");
    if (!target) return;
    const header = document.querySelector(".site-header") as HTMLElement | null;
    const offset = (header?.offsetHeight ?? 72) + 12;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    return;
  }

  window.location.href = "/#preturi";
}
