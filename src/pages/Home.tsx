import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Seo } from "../components/Seo";
import { SeoTargetSection } from "../components/SeoTargetSection";
import { buildHomeJsonLd } from "../seo/site-schema";
import { Advantages } from "../components/Advantages";
import { ChatMockups } from "../components/ChatMockups";
import { HowItWorks } from "../components/HowItWorks";
import { Pricing } from "../components/Pricing";
import { CompliancePanel } from "../components/CompliancePanel";
import { ContactChannels } from "../components/ContactChannels";
import { Faq } from "../components/Faq";
import { About } from "../components/About";
import { BusinessDomains } from "../components/BusinessDomains";
import { ContactForm } from "../components/ContactForm";
import { Footer } from "../components/Footer";
import { SignalReveal } from "../components/SignalReveal";

/**
 * Ordine DOM aliniată 1:1 cu meniul (Avantaje nu apare în meniu):
 * Hero → Industrii → Avantaje → Demo → Afaceri → Cum funcționează → Prețuri →
 * Conformitate → Formular contact → Contact rapid → FAQ → Despre
 */
export function Home() {
  return (
    <>
      <Seo
        title="GetVidia | Agenți AI și Automatizări WhatsApp — Programări automate 24/7"
        description="Agenți AI și asistenți AI pentru automatizări WhatsApp și programări automate 24/7. SMS marketing pentru saloane, barber-shop-uri, clinici stomatologice, stații ITP și cabinete veterinare din România."
        path="/"
        jsonLd={buildHomeJsonLd()}
      />
      <Header />
      <main>
        <SignalReveal />
        <Hero />
        <SeoTargetSection />
        <Advantages />
        <ChatMockups />
        <BusinessDomains />
        <HowItWorks />
        <Pricing />
        <CompliancePanel variant="band" />
        <ContactForm />
        <ContactChannels />
        <Faq />
        <About />
      </main>
      <Footer />
    </>
  );
}
