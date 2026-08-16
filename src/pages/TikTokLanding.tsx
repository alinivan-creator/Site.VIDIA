import { Header } from "../components/Header";
import { TikTokHero } from "../components/TikTokHero";
import { ContactForm } from "../components/ContactForm";
import { Footer } from "../components/Footer";

/** Landing dedicat traficului TikTok — hero + demo live + contact. */
export function TikTokLanding() {
  return (
    <>
      <Header />
      <main>
        <TikTokHero />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
