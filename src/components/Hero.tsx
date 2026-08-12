import type { MouseEvent } from "react";
import { BookingSim } from "./BookingSim";
import { HeroPhone } from "./HeroPhone";

/** Păstrat pentru revert rapid — HeroPhone vechi, static. */
const SHOW_LEGACY_HERO_PHONE = false;

function scrollToSection(event: MouseEvent<HTMLAnchorElement>, id: string) {
  event.preventDefault();
  const target = document.getElementById(id);
  if (!target) return;
  const header = document.querySelector(".site-header") as HTMLElement | null;
  const offset = (header?.offsetHeight ?? 72) + 12;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  if (window.location.hash) {
    history.replaceState(null, "", window.location.pathname || "/");
  }
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-atmosphere" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <h1 id="hero-title">
            <span className="hero-title-accent">VIDIA:</span> Automatizează
            conversațiile, crește numărul de programări și oferă consultanță
            24/7.
          </h1>
          <p className="hero-sub">
            Transformă WhatsApp-ul în propriul tău canal automatizat de
            performanță. VIDIA, partenerul tău virtual, răspunde simultan la un
            număr nelimitat de clienți — fără linie de așteptare —, preia
            automat programările, răspunde instant la întrebări despre
            servicii, prețuri sau program, și oferă consultanță detaliată
            despre produsele tale — de la detalii tehnice și garanții, până la
            politici de retur.
          </p>
          <p className="hero-pillars" aria-label="Servicii VIDIA">
            <span>Programări</span>
            <span aria-hidden="true">·</span>
            <span>Consultanță</span>
            <span aria-hidden="true">·</span>
            <span>SMS marketing</span>
          </p>
          <div className="hero-actions">
            <a
              className="btn btn-primary"
              href="#contact"
              onClick={(e) => scrollToSection(e, "contact")}
            >
              Vreau să simplific programările
            </a>
            <a
              className="btn btn-ghost"
              href="#preturi"
              onClick={(e) => scrollToSection(e, "preturi")}
            >
              Vezi planurile
            </a>
          </div>
        </div>

        <div className="hero-visual">
          {SHOW_LEGACY_HERO_PHONE ? <HeroPhone /> : <BookingSim />}
        </div>
      </div>
    </section>
  );
}
