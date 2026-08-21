import { useEffect, useState } from "react";
import { BookingSim } from "../components/BookingSim";

function VidiaMark({ onRed = false }: { onRed?: boolean }) {
  const face = onRed ? "#fff" : "#E10600";
  const hands = onRed ? "#E10600" : "#fff";
  const tick = onRed ? "rgba(225, 6, 0, 0.35)" : "rgba(255, 255, 255, 0.6)";
  const ring = onRed ? "rgba(225, 6, 0, 0.28)" : "rgba(255, 255, 255, 0.38)";

  return (
    <svg
      className="tiktok-ad-banner-logo"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="16" fill={face} />
      <circle cx="16" cy="16" r="12.5" stroke={ring} strokeWidth="1.2" />
      <g stroke={tick} strokeWidth="1.4" strokeLinecap="round">
        <line x1="16" y1="4.9" x2="16" y2="6.9" />
        <line x1="27.1" y1="16" x2="25.1" y2="16" />
        <line x1="16" y1="27.1" x2="16" y2="25.1" />
        <line x1="4.9" y1="16" x2="6.9" y2="16" />
      </g>
      <g stroke={hands} strokeWidth="3" strokeLinecap="round">
        <line x1="16" y1="17.2" x2="8.6" y2="12" />
        <line x1="16" y1="17.2" x2="24.4" y2="11.3" />
      </g>
      <circle cx="16" cy="17.2" r="1.9" fill={hands} />
    </svg>
  );
}

/** Pagină de captură TikTok: conversație reală, apoi card publicitar. */
export function TikTokAdCapture() {
  const forceEnd =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("end") === "1";
  const [banner, setBanner] = useState(forceEnd);

  useEffect(() => {
    if (!banner) return;
    document.documentElement.dataset.bookingSimBanner = "1";
  }, [banner]);

  return (
    <main className={`tiktok-ad-capture${banner ? " is-banner" : ""}`}>
      {!forceEnd && (
        <div className="tiktok-ad-chat">
          <p className="tiktok-ad-badge">VIDIA · WhatsApp</p>
          <div className="tiktok-ad-sim">
            <div className="tiktok-ad-phone">
              <BookingSim capture onComplete={() => setBanner(true)} />
            </div>
          </div>
          <p className="tiktok-ad-cta">Testează Demo · getvidia.ro</p>
        </div>
      )}

      <section className="tiktok-ad-banner" aria-hidden={!banner}>
        <div className="tiktok-ad-banner-inner">
          <div className="tiktok-ad-banner-brand">
            <VidiaMark onRed />
            <p className="tiktok-ad-banner-site">getvidia.ro</p>
          </div>
          <h2 className="tiktok-ad-banner-title">
            Programări, Suport Instant și Campanii prin SMS
          </h2>
          <p className="tiktok-ad-banner-tagline">VIDIA — Mai simplu decât crezi</p>
        </div>
      </section>
    </main>
  );
}
