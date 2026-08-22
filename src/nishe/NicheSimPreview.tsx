import { PhoneShell } from "../components/PhoneShell";
import { WhatsAppBubble } from "../components/WhatsAppBubble";
import type { NicheConfig } from "./config";

export function NicheSimPreview({ niche }: { niche: NicheConfig }) {
  return (
    <div className="niche-sim">
      <PhoneShell light>
        <div className="hero-chat-header hero-chat-header-light">
          <div className="hero-chat-avatar hero-chat-avatar-wa" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12 12a4.2 4.2 0 1 0-4.2-4.2A4.2 4.2 0 0 0 12 12Zm0 2.1c-3.5 0-7 1.7-7 4.2V20h14v-1.7c0-2.5-3.5-4.2-7-4.2Z" />
            </svg>
          </div>
          <div className="hero-chat-meta">
            <p className="hero-chat-name">{niche.simHeader}</p>
            <p className="hero-chat-status">Cont de afaceri · online</p>
          </div>
        </div>
        <div className="hero-chat-thread hero-chat-thread-light niche-sim-thread">
          {niche.messages.map((message, index) => (
            <WhatsAppBubble
              key={`${message.time}-${index}`}
              from={message.from}
              view="phone"
              aiTone="light"
              time={message.time}
              quote={message.quote}
            >
              {message.text}
            </WhatsAppBubble>
          ))}
        </div>
      </PhoneShell>
    </div>
  );
}
