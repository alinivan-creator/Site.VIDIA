import type { MouseEvent } from "react";
import { BookingSim } from "./BookingSim";
import "./TikTokHero.css";

function scrollToDemo(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  const target = document.getElementById("demo");
  if (!target) return;
  const header = document.querySelector(".site-header") as HTMLElement | null;
  const offset = (header?.offsetHeight ?? 72) + 12;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}

export function TikTokHero() {
  return (
    <div className="tiktok-hero font-display bg-white text-[#121212]">
      <section
        className="tiktok-hero-copy mx-auto max-w-xl px-5 pb-6 pt-10 sm:max-w-2xl sm:px-8 sm:pt-14"
        aria-labelledby="tiktok-hero-title"
      >
        <p className="mb-4 inline-flex items-center rounded-full border border-[#e8e4e1] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-vidia-red">
          VIDIA · WhatsApp
        </p>

        <h1
          id="tiktok-hero-title"
          className="text-[2rem] font-extrabold leading-[1.12] tracking-[-0.03em] text-[#121212] sm:text-5xl"
        >
          Programări pe WhatsApp. Simplu. Rapid. Non-Stop.
        </h1>

        <p className="mt-5 max-w-lg text-base leading-relaxed text-[#3d3d3d] sm:text-lg">
          Automatizează-ți agenda și oferă-le clienților libertatea de a se
          programa 24/7.
        </p>

        <div className="mt-8">
          <a
            href="#demo"
            onClick={scrollToDemo}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-vidia-red px-6 py-3.5 text-base font-bold text-white shadow-[0_14px_30px_rgba(225,6,0,0.22)] transition hover:bg-vidia-red-dark sm:w-auto"
          >
            Testează Demo Gratuit
          </a>
        </div>
      </section>

      <section
        id="demo"
        className="tiktok-hero-demo border-t border-[#e8e4e1] bg-[#f7f5f4] px-4 pb-12 pt-8 sm:px-8"
        aria-label="Demo programări WhatsApp"
      >
        <p className="mx-auto mb-6 max-w-md text-center text-sm font-semibold uppercase tracking-[0.12em] text-[#6b6b6b]">
          Conversație reală · programare automată
        </p>
        <div className="tiktok-hero-sim">
          <BookingSim />
        </div>
      </section>
    </div>
  );
}
