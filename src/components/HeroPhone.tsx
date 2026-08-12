import { PhoneShell } from "./PhoneShell";
import { WhatsAppBubble, WhatsAppComposer } from "./WhatsAppBubble";

/** Mockup WhatsApp Hero — vedere client: mesaje mele dreapta/verde, AI stânga/roșu. */
export function HeroPhone() {
  return (
    <div className="hero-phone-wrap" aria-hidden="true">
      <div className="hero-phone-glow" />
      <PhoneShell>
        <div className="hero-chat-header">
          <div className="hero-chat-avatar">V</div>
          <div className="hero-chat-meta">
            <p className="hero-chat-name">Barber Shop Atlas</p>
            <p className="hero-chat-status">online · 24/7 AI Active</p>
          </div>
        </div>

        <div className="hero-chat-thread">
          <WhatsAppBubble from="client" view="phone" time="14:15">
            Bună! Aș vrea o programare la tuns mâine după-amiază.
          </WhatsAppBubble>
          <WhatsAppBubble from="ai" view="phone" time="14:15">
            Salut! 🕒 Am liber mâine la 14:30. Ți se potrivește?
          </WhatsAppBubble>
          <WhatsAppBubble from="client" view="phone" time="14:16">
            Da, perfect.
          </WhatsAppBubble>
          <WhatsAppBubble from="ai" view="phone" time="14:16">
            Perfect. Pentru a salva programarea am nevoie de numele tău
            complet.
          </WhatsAppBubble>
          <WhatsAppBubble from="client" view="phone" time="14:16">
            Andrei Ionescu.
          </WhatsAppBubble>
          <WhatsAppBubble from="ai" view="phone" time="14:17" className="wa-bubble-rich">
            <p>✅ Mulțumesc, Andrei! Programarea ta este salvată.</p>
            <p>📅 Mâine, ora 14:30</p>
            <p>📍 Str. Victoriei 12, București</p>
            <p>Te așteptăm cu drag!</p>
          </WhatsAppBubble>
        </div>

        <WhatsAppComposer />
      </PhoneShell>
    </div>
  );
}
