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
  quote?: { title: string; body: string };
  body: ReactNode;
  /** Pause after this message appears (ms). */
  holdMs: number;
  /** Typing indicator duration before bot messages (ms). */
  typingMs?: number;
};

function ListButton({ label }: { label: string }) {
  return (
    <div className="wa-list-btn">
      <svg
        className="wa-list-btn-icon"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M4 6h2v2H4V6zm4 0h12v2H8V6zM4 11h2v2H4v-2zm4 0h12v2H8v-2zM4 16h2v2H4v-2zm4 0h12v2H8v-2z"
        />
      </svg>
      <span>{label}</span>
    </div>
  );
}

function ReplyRow({ label }: { label: string }) {
  return (
    <div className="wa-reply-row">
      <svg
        className="wa-reply-row-icon"
        viewBox="0 0 24 24"
        width="15"
        height="15"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"
        />
      </svg>
      <span>{label}</span>
    </div>
  );
}

/** Flux real din clip — până la prima confirmare. */
const SCRIPT: SimMessage[] = [
  {
    id: "u1",
    from: "client",
    time: "21:57",
    body: "Salut",
    holdMs: 700,
  },
  {
    id: "b1",
    from: "ai",
    time: "21:57",
    rich: true,
    typingMs: 1100,
    body: (
      <>
        <p>
          <strong>Bun venit la VIDIA!</strong>
        </p>
        <p>
          Sunt asistentul virtual al VIDIA și sunt aici să vă ajut cu informații
          despre programări, orar sau date de contact.
        </p>
        <p>
          Vă informăm că datele dumneavoastră sunt prelucrate în conformitate cu
          politica noastră de confidențialitate. Prin continuarea conversației și
          transmiterea detaliilor, vă exprimați acordul cu privire la acest lucru.
        </p>
        <p>Cu ce vă pot ajuta astăzi?</p>
      </>
    ),
    holdMs: 1400,
  },
  {
    id: "b2",
    from: "ai",
    time: "21:57",
    rich: true,
    typingMs: 800,
    body: (
      <>
        <p>Cu ce te putem ajuta?</p>
        <div className="wa-reply-list">
          <ReplyRow label="📅 Programare" />
          <ReplyRow label="ℹ️ Detalii & Prețuri" />
          <ReplyRow label="📞 Contact & Locație" />
        </div>
      </>
    ),
    holdMs: 1200,
  },
  {
    id: "u2",
    from: "client",
    time: "21:57",
    quote: { title: "Vidia", body: "Cu ce te putem ajuta?" },
    body: "📅 Programare",
    holdMs: 750,
  },
  {
    id: "b3",
    from: "ai",
    time: "21:57",
    rich: true,
    typingMs: 1000,
    body: (
      <>
        <p>
          <strong>Ce serviciu dorești?</strong>
        </p>
        <p>
          Apasă <strong>Servicii</strong> și alege din listă (durată și preț apar
          la fiecare opțiune).
        </p>
        <p>
          Poți și scrie numele — ex: <strong>Tuns Clasic</strong>.
        </p>
        <ListButton label="Servicii" />
      </>
    ),
    holdMs: 1300,
  },
  {
    id: "u3",
    from: "client",
    time: "21:57",
    quote: {
      title: "Vidia",
      body: "Ce serviciu dorești? Apasă Servicii și alege din listă…",
    },
    body: (
      <>
        <p>
          <strong>Aranjat Barba</strong>
        </p>
        <p>30 LEI · 20 min</p>
      </>
    ),
    holdMs: 800,
  },
  {
    id: "b4",
    from: "ai",
    time: "21:58",
    rich: true,
    typingMs: 1000,
    body: (
      <>
        <p>
          <strong>Alege ziua — Aranjat Barba</strong>
        </p>
        <p>
          Apasă <strong>Zile disponibile</strong> (următoarele 14 zile cu locuri
          libere) sau scrie, ex: <span className="wa-link">mâine la 10</span>.
        </p>
        <ListButton label="Zile disponibile" />
      </>
    ),
    holdMs: 1300,
  },
  {
    id: "u4",
    from: "client",
    time: "21:58",
    quote: {
      title: "Vidia",
      body: "Alege ziua — Aranjat Barba",
    },
    body: (
      <>
        <p>
          <strong>Luni, 31 Aug</strong>
        </p>
        <p>Luni, 31 august</p>
      </>
    ),
    holdMs: 750,
  },
  {
    id: "b5",
    from: "ai",
    time: "21:58",
    rich: true,
    typingMs: 1000,
    body: (
      <>
        <p>
          <strong>Alege ora — Aranjat Barba</strong>
        </p>
        <p>
          Data: <span className="wa-link">Luni, 31 august</span>
        </p>
        <p>
          Apasă <strong>Ore libere</strong> și selectează intervalul.
        </p>
        <ListButton label="Ore libere" />
      </>
    ),
    holdMs: 1300,
  },
  {
    id: "u5",
    from: "client",
    time: "21:58",
    quote: {
      title: "Vidia",
      body: "Alege ora — Aranjat Barba · Data: Luni, 31 august",
    },
    body: (
      <>
        <p>
          <strong>12:30</strong>
        </p>
        <p>Disponibil</p>
      </>
    ),
    holdMs: 800,
  },
  {
    id: "b6",
    from: "ai",
    time: "21:59",
    rich: true,
    typingMs: 1100,
    body: (
      <>
        <p>
          <strong>Îți dorești să confirmi această programare?</strong>
        </p>
        <div className="wa-confirm-fields">
          <p>
            <strong>Client</strong>
          </p>
          <p>Alin Ivan</p>
          <p>
            <strong>Serviciu</strong>
          </p>
          <p>Aranjat Barba</p>
          <p>
            <strong>Data</strong>
          </p>
          <p>Luni, 31 august</p>
          <p>
            <strong>Ora</strong>
          </p>
          <p>12:30</p>
        </div>
        <div className="wa-reply-list">
          <ReplyRow label="Confirmă" />
          <ReplyRow label="Anulează" />
        </div>
      </>
    ),
    holdMs: 1400,
  },
  {
    id: "u6",
    from: "client",
    time: "21:59",
    quote: {
      title: "Vidia",
      body: "Îți dorești să confirmi această programare?",
    },
    body: "Confirmă",
    holdMs: 700,
  },
  {
    id: "b7",
    from: "ai",
    time: "21:59",
    rich: true,
    typingMs: 900,
    body: (
      <>
        <p>
          <strong>Confidențialitate</strong>
        </p>
        <p>
          Folosim datele pentru această programare și pentru comunicări utile
          (inclusiv SMS).
        </p>
        <p>
          Poți opri SMS-urile scriind <strong>stop sms</strong>.
        </p>
        <p>
          Pentru detalii, scrie <strong>contact</strong>.
        </p>
      </>
    ),
    holdMs: 1100,
  },
  {
    id: "b8",
    from: "ai",
    time: "21:59",
    rich: true,
    typingMs: 1000,
    body: (
      <>
        <p>Salut, Alin Ivan!</p>
        <p>
          Programarea ta pentru serviciul de <strong>Aranjat Barba</strong> este
          confirmată pentru luni,{" "}
          <span className="wa-link">31 august, la ora 12:30</span>.
        </p>
        <p>
          Pornește spre locație: [hartă] (
          <span className="wa-link">https://maps.app.goo.gl/9mQvC3yHxTeSW1187</span>
          )
        </p>
        <hr className="wa-divider" />
        <p>Te așteptăm cu drag.</p>
        <p>
          <strong>reprogramare · anulează</strong>
        </p>
        <div className="wa-calendar-btn">
          <span aria-hidden="true">↗️</span>
          <span>Adaugă în calendar</span>
        </div>
      </>
    ),
    holdMs: 4800,
  },
];

/** 1-based visibleCount when booking is confirmed (calendar save moment). */
const CALENDAR_CALLOUT_AT = SCRIPT.findIndex((m) => m.id === "b8") + 1;
/** 1-based visibleCount for the last details message (client maps + calendar). */
const CLIENT_NOTE_AT = SCRIPT.length;

function TypingDots() {
  return (
    <div className="wa-row wa-row-in booking-sim-typing-row" aria-hidden="true">
      <div className="wa-bubble wa-bubble-light wa-tail-in booking-sim-typing">
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
          <span>Luni, 31 Aug. · 12:30</span>
          <em>Aranjat Barba</em>
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

type BookingSimProps = {
  capture?: boolean;
  onComplete?: () => void;
};

/** Auto-playing WhatsApp booking flow inside PhoneShell. */
export function BookingSim({ capture = false, onComplete }: BookingSimProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const [fading, setFading] = useState(false);
  const [inView, setInView] = useState(capture);
  const [reduced, setReduced] = useState(false);

  const scrollToBottom = useEffectEvent(() => {
    const el = threadRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  });

  useEffect(() => {
    if (capture) return;
    setReduced(prefersReducedMotion());
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [capture]);

  useEffect(() => {
    if (capture) return;
    const el = rootRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio >= 0.35),
      { threshold: [0, 0.35, 0.6] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [capture]);

  useEffect(() => {
    scrollToBottom();
  }, [visibleCount, typing, fading]);

  useEffect(() => {
    if (!capture && reduced) {
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

    const playOnce = async () => {
      setFading(false);
      setTyping(false);
      setVisibleCount(0);
      await wait(capture ? 120 : 500);
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
        if (capture && i === 0) {
          document.documentElement.dataset.bookingSimStarted = "1";
        }
        await wait(msg.holdMs);
        if (cancelled) return;
      }

      if (capture) {
        document.documentElement.dataset.bookingSimDone = "1";
        onCompleteRef.current?.();
        return;
      }

      await wait(900);
      if (cancelled) return;
      setFading(true);
      await wait(650);
    };

    const run = async () => {
      if (capture) {
        await playOnce();
        return;
      }

      while (!cancelled) {
        await playOnce();
        if (cancelled) return;
      }
    };

    void run();

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [inView, reduced, capture]);

  const messages = reduced ? SCRIPT : SCRIPT.slice(0, visibleCount);

  const showCalendarCallout =
    !fading && (reduced || visibleCount >= CALENDAR_CALLOUT_AT);
  const showClientNote =
    !fading && (reduced || visibleCount >= CLIENT_NOTE_AT);

  return (
    <div ref={rootRef} className="booking-sim-frame" aria-hidden="true">
      <div className="booking-sim booking-sim-wa">
        <div className="booking-sim-glow" />
        <BusinessCalendarFloat visible={showCalendarCallout} />
        <PhoneShell light>
          <div className="hero-chat-header hero-chat-header-light">
            <div className="hero-chat-avatar hero-chat-avatar-wa" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M12 12a4.2 4.2 0 1 0-4.2-4.2A4.2 4.2 0 0 0 12 12Zm0 2.1c-3.5 0-7 1.7-7 4.2V20h14v-1.7c0-2.5-3.5-4.2-7-4.2Z" />
              </svg>
            </div>
            <div className="hero-chat-meta">
              <p className="hero-chat-name">Vidia</p>
              <p className="hero-chat-status">Cont de afaceri</p>
            </div>
          </div>

          <div
            ref={threadRef}
            className={`hero-chat-thread hero-chat-thread-light booking-sim-thread${fading ? " is-fading" : ""}`}
          >
            {messages.map((msg) => (
              <WhatsAppBubble
                key={msg.id}
                from={msg.from}
                view="phone"
                aiTone="light"
                quote={msg.quote}
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

          <WhatsAppComposer light />
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
