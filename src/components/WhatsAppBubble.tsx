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
   * red = brand VIDIA; dark = WhatsApp dark; light = WhatsApp iOS light.
   */
  aiTone?: "red" | "dark" | "light";
  /** Reply quote (stil WhatsApp) — de obicei pe mesajele clientului. */
  quote?: { title: string; body: string };
  time: string;
  children: ReactNode;
  className?: string;
};

/** Bula WhatsApp realistă — aliniere + culoare după perspectivă. */
export function WhatsAppBubble({
  from,
  view = "inbox",
  aiTone = "red",
  quote,
  time,
  children,
  className = "",
}: WhatsAppBubbleProps) {
  const isPhone = view === "phone";
  const alignRight = isPhone ? from === "client" : from === "ai";
  const showTicks = alignRight;
  const light = aiTone === "light";
  const tone =
    from === "ai"
      ? light
        ? "light"
        : aiTone
      : isPhone
        ? light
          ? "outgoing"
          : "green"
        : "dark";
  const side = alignRight ? "out" : "in";

  const meta = (
    <div className={`wa-meta wa-meta-${side}${light ? " wa-meta-inline" : ""}`}>
      <time dateTime={time}>{time}</time>
      {showTicks ? <ReadTicks /> : null}
    </div>
  );

  return (
    <div
      className={`wa-row wa-row-${side}${className ? ` ${className}` : ""}`}
    >
      <div className={`wa-bubble wa-bubble-${tone} wa-tail-${side}`}>
        {quote ? (
          <div className="wa-quote">
            <p className="wa-quote-title">{quote.title}</p>
            <p className="wa-quote-body">{quote.body}</p>
          </div>
        ) : null}
        <div className="wa-bubble-body">{children}</div>
        {light ? meta : null}
      </div>
      {!light ? meta : null}
    </div>
  );
}

export function WhatsAppComposer({
  placeholder = "Mesaj",
  light = false,
}: {
  placeholder?: string;
  light?: boolean;
}) {
  return (
    <div
      className={`wa-composer${light ? " wa-composer-light" : ""}`}
      aria-hidden="true"
    >
      {light ? <span className="wa-composer-plus">+</span> : null}
      <div className="wa-composer-field">{placeholder}</div>
      {light ? (
        <span className="wa-composer-mic" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.9V21h2v-3.1A7 7 0 0 0 19 11h-2Z" />
          </svg>
        </span>
      ) : null}
    </div>
  );
}
