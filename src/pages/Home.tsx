import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Services } from "../components/Services";
import { Advantages } from "../components/Advantages";
import { ChatMockups } from "../components/ChatMockups";
import { HowItWorks } from "../components/HowItWorks";
import { Pricing } from "../components/Pricing";
import { Quote } from "../components/Quote";
import { ContactChannels } from "../components/ContactChannels";
import { Faq } from "../components/Faq";
import { About } from "../components/About";
import { BusinessDomains } from "../components/BusinessDomains";
import { ContactForm } from "../components/ContactForm";
import { Footer } from "../components/Footer";
import { SignalReveal } from "../components/SignalReveal";

/**
 * Ordine DOM aliniată 1:1 cu meniul (Avantaje nu apare în meniu):
 * Hero → Servicii → Avantaje → Demo → Afaceri → Cum funcționează → Prețuri →
 * Citat → Formular contact → Contact rapid → FAQ → Despre
 */
export function Home() {
  return (
    <>
      <Header />
      <main>
        <SignalReveal />
        <Hero />
        <Services />
        <Advantages />
        <ChatMockups />
        <BusinessDomains />
        <HowItWorks />
        <Pricing />
        <Quote />
        <ContactForm />
        <ContactChannels />
        <Faq />
        <About />
      </main>
      <Footer />
    </>
  );
}
