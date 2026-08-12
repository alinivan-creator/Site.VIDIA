import { useEffect } from "react";

/**
 * Marks main sections as in-view for subtle label underline draws.
 * Respects prefers-reduced-motion (instant reveal, no animation).
 */
export function SignalReveal() {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main > section"),
    );
    if (sections.length === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      sections.forEach((el) => el.classList.add("is-signal-inview"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-signal-inview");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.22, rootMargin: "0px 0px -8% 0px" },
    );

    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
