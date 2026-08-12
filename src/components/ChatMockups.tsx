import { useRomaniaTime } from "../hooks/useRomaniaTime";
import { PhoneShell } from "./PhoneShell";
import { WhatsAppBubble, WhatsAppComposer } from "./WhatsAppBubble";

/** Mockup consultanță — vedere telefon client: mesaje mele dreapta, AI stânga. */
function ConsultingMockup() {
  return (
    <PhoneShell>
      <div className="hero-chat-header">
        <div className="hero-chat-avatar">V</div>
        <div className="hero-chat-meta">
          <p className="hero-chat-name">VIDIA AI Assistant</p>
          <p className="hero-chat-status">online · 24/7</p>
        </div>
      </div>

      <div className="hero-chat-thread">
        <WhatsAppBubble from="client" view="phone" time="10:12">
          Salut, ce acte trebuie pentru deschiderea unui PFA și care sunt
          costurile?
        </WhatsAppBubble>
        <WhatsAppBubble from="ai" view="phone" time="10:12" className="wa-bubble-rich">
          <p>Salut! Pentru un PFA ai nevoie de:</p>
          <ul>
            <li>copie CI</li>
            <li>act pentru sediul social</li>
            <li>diplome / atestate</li>
          </ul>
          <p>Cost estimativ: 450 RON. Vrei să inițiem procedura?</p>
        </WhatsAppBubble>
        <WhatsAppBubble from="client" view="phone" time="10:14">
          Da, te rog. Numele meu este Maria Ionescu.
        </WhatsAppBubble>
        <WhatsAppBubble from="ai" view="phone" time="10:14" className="wa-bubble-rich">
          <p>✅ Am înregistrat cererea ta, Maria!</p>
          <p>
            💬 Un consultant te va suna astăzi pentru a stabili pașii
            următori.
          </p>
        </WhatsAppBubble>
      </div>

      <WhatsAppComposer />
    </PhoneShell>
  );
}

function SmsMockup() {
  const time = useRomaniaTime();

  return (
    <PhoneShell light>
      <div className="sms-screen">
        <div className="demo-wa-header demo-sms-header-bar">
          <div className="demo-wa-avatar demo-sms-avatar-s">S</div>
          <div>
            <p className="demo-sms-title">StomClinic Timișoara</p>
            <p className="demo-sms-sub">Mesaj text · Astăzi, {time}</p>
          </div>
        </div>

        <div className="demo-sms-bubble">
          <p>
            Bună Maria! Profită de <strong>20% reducere</strong> la pachetul de
            albire profesională, valabil până la sfârșitul lunii la StomClinic.
          </p>
          <p>
            Programează-te direct pe WhatsApp:{" "}
            <strong className="demo-sms-link">wa.me/40722100200</strong>
          </p>
          <p className="demo-sms-legal">
            Pentru dezabonare răspunde cu <strong>STOP</strong>.
          </p>
        </div>

        <div className="sms-composer" aria-hidden="true">
          <div className="sms-composer-plus">+</div>
          <div className="sms-composer-field">
            Mesaj text
            <span className="sms-composer-send" />
          </div>
        </div>
      </div>
    </PhoneShell>
  );
}

export function ChatMockups() {
  return (
    <section id="demo" className="section mockups">
      <div className="container">
        <p className="section-label">Simulare live</p>
        <h2 className="section-title">
          Răspunsuri inteligente. Clienți care revin.
        </h2>
        <p className="section-lead">
          Dincolo de rezervări, partenerul tău virtual preia întrebările
          clienților — în limitele pe care le setezi tu — și trimite oferte pe
          SMS, clar și politicos.
        </p>

        <div className="demo-gallery demo-gallery-duo">
          <figure className="demo-gallery-item">
            <figcaption className="demo-gallery-label">Consultanță</figcaption>
            <ConsultingMockup />
          </figure>
          <figure className="demo-gallery-item">
            <figcaption className="demo-gallery-label">SMS marketing</figcaption>
            <SmsMockup />
          </figure>
        </div>
      </div>
    </section>
  );
}
