import {
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { PhoneShell } from "./PhoneShell";
import { WhatsAppBubble, WhatsAppComposer } from "./WhatsAppBubble";

type SimMessage = {
  id: string;
  from: "client" | "ai";
  time: string;
  rich?: boolean;
  body: ReactNode;
  /** Pause after this message appears (ms). */
  holdMs: number;
  /** Typing indicator duration before bot messages (ms). */
  typingMs?: number;
};

const SCRIPT: SimMessage[] = [
  {
    id: "u1",
    from: "client",
    time: "22:18",
    body: "Salut",
    holdMs: 700,
  },
  {
    id: "b1",
    from: "ai",
    time: "22:19",
    typingMs: 900,
    body: "Bună! Cu ce te pot ajuta astăzi?",
    holdMs: 850,
  },
  {
    id: "u2",
    from: "client",
    time: "22:19",
    body: "Programare",
    holdMs: 700,
  },
  {
    id: "b2",
    from: "ai",
    time: "22:19",
    typingMs: 1000,
    body: "Perfect! Hai să programăm o vizită la Barber Shop Atlas. 📅",
    holdMs: 900,
  },
  {
    id: "b3",
    from: "ai",
    time: "22:19",
    rich: true,
    typingMs: 1100,
    body: (
      <>
        <p>📋 Alege serviciul dorit:</p>
        <p>
          1️⃣ <strong>Tuns Clasic</strong> | 💰 50 LEI | ⏱️ 30 min
        </p>
        <p>
          2️⃣ <strong>Tuns + Barbă</strong> | 💰 80 LEI | ⏱️ 45 min
        </p>
        <p>
          3️⃣ <strong>Aranjat Barbă</strong> | 💰 30 LEI | ⏱️ 20 min
        </p>
        <p className="booking-sim-hint">
          👉 Răspunde cu numărul corespunzător (ex: 1).
        </p>
      </>
    ),
    holdMs: 1400,
  },
  {
    id: "u3",
    from: "client",
    time: "22:19",
    body: "1",
    holdMs: 650,
  },
  {
    id: "b4",
    from: "ai",
    time: "22:19",
    rich: true,
    typingMs: 1200,
    body: (
      <>
        <p>📅 Alege ora pentru Tuns Clasic:</p>
        <p className="booking-sim-muted">(Primele opțiuni disponibile)</p>
        <p>🟦 1. Luni, 10 Aug. — Ora 09:30</p>
        <p>🟦 2. Luni, 10 Aug. — Ora 10:30</p>
        <p>🟦 3. Luni, 10 Aug. — Ora 12:30</p>
        <p>🟦 4. Luni, 10 Aug. — Ora 13:00</p>
        <p>🟦 5. Luni, 10 Aug. — Ora 14:00</p>
        <p>🟦 6. Luni, 10 Aug. — Ora 16:00</p>
        <p className="booking-sim-hint">
          👉 Răspunde cu numărul opțiunii dorite.
        </p>
      </>
    ),
    holdMs: 1500,
  },
  {
    id: "u4",
    from: "client",
    time: "22:19",
    body: "3",
    holdMs: 700,
  },
  {
    id: "b5",
    from: "ai",
    time: "22:19",
    rich: true,
    typingMs: 1100,
    body: (
      <>
        <p>Confirmi programarea?</p>
        <p>
          👤 <strong>Alin Ivan</strong>
        </p>
        <p>
          📋 <strong>Tuns Clasic</strong>
        </p>
        <p>
          🕒 <strong>Luni, 10 Aug. — Ora 12:30</strong>
        </p>
        <p>1. ✅ Confirm</p>
        <p>2. ❌ Anulează</p>
        <p className="booking-sim-hint">
          Răspunde cu numărul opțiunii (ex: 1).
        </p>
      </>
    ),
    holdMs: 1300,
  },
  {
    id: "u5",
    from: "client",
    time: "22:20",
    body: "1",
    holdMs: 650,
  },
  {
    id: "b6",
    from: "ai",
    time: "22:20",
    typingMs: 900,
    body: (
      <p className="booking-sim-hint">
        🔒 Confidențialitate (GDPR): folosim numele și telefonul doar pentru
        această programare. Pentru detalii, scrie <strong>contact</strong>.
      </p>
    ),
    holdMs: 1100,
  },
  {
    id: "b7",
    from: "ai",
    time: "22:20",
    rich: true,
    typingMs: 1000,
    body: (
      <>
        <p>
          ✅ <strong>Programare confirmată!</strong>
        </p>
        <p>👤 Alin Ivan</p>
        <p>📋 Tuns Clasic</p>
        <p>🕒 Luni, 10 Aug. — Ora 12:30</p>
        <p>
          <span className="booking-sim-link">🚗 Pornește spre locație</span>
        </p>
        <p>
          Ne vedem curând! Pentru modificare scrie{" "}
          <strong>reprogramare</strong>, pentru anulare{" "}
          <strong>anulează</strong>.
        </p>
        <div className="booking-sim-cta">
          <span>↗️ Adaugă în calendar</span>
        </div>
      </>
    ),
    holdMs: 4800,
  },
];

/** 1-based visibleCount when booking is confirmed (calendar save moment). */
const CALENDAR_CALLOUT_AT =
  SCRIPT.findIndex((m) => m.id === "b7") + 1;
/** 1-based visibleCount for the last details message (client maps + calendar). */
const CLIENT_NOTE_AT = SCRIPT.length;

function TypingDots() {
  return (
    <div className="wa-row wa-row-in booking-sim-typing-row" aria-hidden="true">
      <div className="wa-bubble wa-bubble-dark wa-tail-in booking-sim-typing">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function BusinessCalendarFloat({ visible }: { visible: boolean }) {
  return (
    <aside
      className={`booking-sim-gcal${visible ? " is-visible" : ""}`}
      aria-hidden="true"
    >
      <div className="booking-sim-gcal-card">
        <div className="booking-sim-gcal-head">
          <img
            src="/logos/google-calendar.svg"
            alt=""
            width={22}
            height={22}
            className="booking-sim-gcal-logo"
          />
          <span>Programare nouă</span>
        </div>
        <div className="booking-sim-gcal-event">
          <strong>Alin Ivan</strong>
          <span>Luni, 10 Aug. · 12:30</span>
          <em>Tuns Clasic</em>
        </div>
      </div>
      <p className="booking-sim-gcal-caption">
        Programarea s-a salvat automat în calendarul tău.
      </p>
    </aside>
  );
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Auto-playing WhatsApp booking flow inside PhoneShell. */
export function BookingSim() {
  const rootRef = useRef<HTMLDivElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const [fading, setFading] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);

  const scrollToBottom = useEffectEvent(() => {
    const el = threadRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  });

  useEffect(() => {
    setReduced(prefersReducedMotion());
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio >= 0.35),
      { threshold: [0, 0.35, 0.6] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [visibleCount, typing, fading]);

  useEffect(() => {
    if (reduced) {
      setVisibleCount(SCRIPT.length);
      setTyping(false);
      setFading(false);
      return;
    }

    if (!inView) return;

    let cancelled = false;
    let timer = 0;

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timer = window.setTimeout(resolve, ms);
      });

    const run = async () => {
      while (!cancelled) {
        setFading(false);
        setTyping(false);
        setVisibleCount(0);
        await wait(500);
        if (cancelled) return;

        for (let i = 0; i < SCRIPT.length; i++) {
          if (cancelled) return;
          const msg = SCRIPT[i];

          if (msg.from === "ai" && msg.typingMs) {
            setTyping(true);
            await wait(msg.typingMs);
            if (cancelled) return;
            setTyping(false);
          }

          setVisibleCount(i + 1);
          await wait(msg.holdMs);
          if (cancelled) return;
        }

        await wait(900);
        if (cancelled) return;
        setFading(true);
        await wait(650);
        if (cancelled) return;
      }
    };

    void run();

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [inView, reduced]);

  const messages = reduced ? SCRIPT : SCRIPT.slice(0, visibleCount);

  const showCalendarCallout =
    !fading && (reduced || visibleCount >= CALENDAR_CALLOUT_AT);
  const showClientNote =
    !fading && (reduced || visibleCount >= CLIENT_NOTE_AT);

  return (
    <div ref={rootRef} className="booking-sim-frame" aria-hidden="true">
      <div className="booking-sim">
        <div className="booking-sim-glow" />
        <BusinessCalendarFloat visible={showCalendarCallout} />
        <PhoneShell>
          <div className="hero-chat-header">
            <div className="hero-chat-avatar">V</div>
            <div className="hero-chat-meta">
              <p className="hero-chat-name">Barber Shop Atlas</p>
              <p className="hero-chat-status">online · 24/7 AI Active</p>
            </div>
          </div>

          <div
            ref={threadRef}
            className={`hero-chat-thread booking-sim-thread${fading ? " is-fading" : ""}`}
          >
            {messages.map((msg) => (
              <WhatsAppBubble
                key={msg.id}
                from={msg.from}
                view="phone"
                aiTone="dark"
                time={msg.time}
                className={
                  msg.rich ? "wa-bubble-rich booking-sim-enter" : "booking-sim-enter"
                }
              >
                {msg.body}
              </WhatsAppBubble>
            ))}
            {typing ? <TypingDots /> : null}
          </div>

          <WhatsAppComposer />
        </PhoneShell>
        <p
          className={`booking-sim-client-note${showClientNote ? " is-visible" : ""}`}
        >
          Clientul primește link către adresă și opțiunea de a-și salva în propriul
          calendar programarea, cu un{" "}
          <span className="booking-sim-client-note-click">click</span>.
        </p>
      </div>
    </div>
  );
}
