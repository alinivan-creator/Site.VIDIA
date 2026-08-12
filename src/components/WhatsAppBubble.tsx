import type { ReactNode } from "react";

/** Bifele duble albastre de „mesaj citit”, identice cu iconița WhatsApp. */
function ReadTicks() {
  return (
    <svg
      className="wa-ticks"
      viewBox="0 0 16 11"
      width="15"
      height="10"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M11.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-2.405-2.272a.463.463 0 0 0-.336-.146.47.47 0 0 0-.343.146l-.311.31a.445.445 0 0 0-.14.337c0 .136.047.25.14.343l2.996 2.996a.724.724 0 0 0 .501.203.697.697 0 0 0 .546-.266l6.646-8.417a.497.497 0 0 0 .108-.299.441.441 0 0 0-.19-.374L11.07.653Z"
        fill="#53bdeb"
      />
      <path
        d="M15.091.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-.702-.663-1.009 1.257 1.171 1.171a.724.724 0 0 0 .501.203.697.697 0 0 0 .546-.266l6.646-8.417a.497.497 0 0 0 .108-.299.441.441 0 0 0-.19-.374L15.09.653Z"
        fill="#53bdeb"
      />
    </svg>
  );
}

type WhatsAppBubbleProps = {
  /** Cine a trimis mesajul */
  from: "client" | "ai";
  /**
   * inbox = vedere business (client stânga, AI dreapta)
   * phone = vedere client (mesajele mele dreapta/verde, AI stânga)
   */
  view?: "inbox" | "phone";
  /**
   * Culorile mesajelor AI/incoming.
   * red = brand VIDIA (default pe hero); dark = WhatsApp clasic (gri).
   */
  aiTone?: "red" | "dark";
  time: string;
  children: ReactNode;
  className?: string;
};

/** Bula WhatsApp realistă — aliniere + culoare după perspectivă. */
export function WhatsAppBubble({
  from,
  view = "inbox",
  aiTone = "red",
  time,
  children,
  className = "",
}: WhatsAppBubbleProps) {
  const isPhone = view === "phone";
  const alignRight = isPhone ? from === "client" : from === "ai";
  const showTicks = alignRight;
  const tone = from === "ai" ? aiTone : isPhone ? "green" : "dark";
  const side = alignRight ? "out" : "in";

  return (
    <div
      className={`wa-row wa-row-${side}${className ? ` ${className}` : ""}`}
    >
      <div className={`wa-bubble wa-bubble-${tone} wa-tail-${side}`}>
        <div className="wa-bubble-body">{children}</div>
      </div>
      <div className={`wa-meta wa-meta-${side}`}>
        <time dateTime={time}>{time}</time>
        {showTicks ? <ReadTicks /> : null}
      </div>
    </div>
  );
}

export function WhatsAppComposer({
  placeholder = "Mesaj...",
}: {
  placeholder?: string;
}) {
  return (
    <div className="wa-composer" aria-hidden="true">
      <div className="wa-composer-field">{placeholder}</div>
    </div>
  );
}
