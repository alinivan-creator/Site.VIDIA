import { Header } from "../components/Header";
import { Seo } from "../components/Seo";
import { TikTokHero } from "../components/TikTokHero";
import { ContactForm } from "../components/ContactForm";
import { Footer } from "../components/Footer";

/** Landing dedicat traficului TikTok — hero + demo live + contact. */
export function TikTokLanding() {
  return (
    <>
      <Seo
        title="GetVidia pe TikTok | Programări WhatsApp automate"
        description="Descoperă cum VIDIA automatizează programările pe WhatsApp pentru saloane, clinici și afaceri locale."
        path="/tiktok"
      />
      <Header />
      <main>
        <TikTokHero />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
