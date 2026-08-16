import { BookingSim } from "../components/BookingSim";

/** Pagină minimală pentru captură material TikTok — fără header/footer. */
export function TikTokAdCapture() {
  return (
    <main className="tiktok-ad-capture">
      <div className="tiktok-ad-capture-inner">
        <p className="tiktok-ad-badge">VIDIA · WhatsApp</p>
        <h1 className="tiktok-ad-title">
          Programări pe WhatsApp. Simplu. Rapid. Non-Stop.
        </h1>
        <p className="tiktok-ad-sub">
          Automatizează-ți agenda și oferă-le clienților libertatea de a se
          programa 24/7.
        </p>
        <div className="tiktok-ad-sim">
          <BookingSim />
        </div>
        <p className="tiktok-ad-cta">Testează Demo Gratuit · getvidia.ro</p>
      </div>
    </main>
  );
}
