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
  kind: "msg";
  id: string;
  from: "client" | "ai";
  time: string;
  rich?: boolean;
  quote?: { title: string; body: string };
  body: ReactNode;
  holdMs: number;
  typingMs?: number;
};

type ListItem = {
  title: string;
  subtitle: string;
};

type SimSheet = {
  kind: "sheet";
  id: string;
  title: string;
  items: ListItem[];
  selectIndex: number;
  /** Time before selection highlight */
  openMs: number;
  /** Time with item selected (+ Trimite if shown) */
  selectMs: number;
  showSend?: boolean;
};

type SimStep = SimMessage | SimSheet;

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

const SERVICES: ListItem[] = [
  { title: "Tuns Clasic", subtitle: "50 LEI · 30 min" },
  { title: "Tuns + Barba", subtitle: "80 LEI · 45 min" },
  { title: "Aranjat Barba", subtitle: "30 LEI · 20 min" },
];

const DAYS: ListItem[] = [
  { title: "Miercuri, 26 Aug", subtitle: "Miercuri, 26 august" },
  { title: "Joi, 27 Aug", subtitle: "Joi, 27 august" },
  { title: "Vineri, 28 Aug", subtitle: "Vineri, 28 august" },
  { title: "Luni, 31 Aug", subtitle: "Luni, 31 august" },
  { title: "Marți, 1 Sep", subtitle: "Marți, 1 septembrie" },
  { title: "Miercuri, 2 Sep", subtitle: "Miercuri, 2 septembrie" },
  { title: "Joi, 3 Sep", subtitle: "Joi, 3 septembrie" },
  { title: "Vineri, 4 Sep", subtitle: "Vineri, 4 septembrie" },
];

const HOURS: ListItem[] = [
  { title: "13:30", subtitle: "Disponibil" },
  { title: "14:00", subtitle: "Disponibil" },
  { title: "14:30", subtitle: "Disponibil" },
  { title: "15:00", subtitle: "Disponibil" },
  { title: "15:30", subtitle: "Disponibil" },
  { title: "16:00", subtitle: "Disponibil" },
  { title: "16:30", subtitle: "Disponibil" },
];

/** Flux din clipul 22.08 — cu sloturi/listă deschise, până la prima confirmare. */
const SCRIPT: SimStep[] = [
  {
    kind: "msg",
    id: "u1",
    from: "client",
    time: "00:36",
    body: "Salut vreau sa fac si eu o programare",
    holdMs: 900,
  },
  {
    kind: "msg",
    id: "b1",
    from: "ai",
    time: "00:36",
    rich: true,
    typingMs: 1100,
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
    holdMs: 900,
  },
  {
    kind: "sheet",
    id: "sheet-services",
    title: "Servicii",
    items: SERVICES,
    selectIndex: 1,
    openMs: 900,
    selectMs: 1100,
    showSend: false,
  },
  {
    kind: "msg",
    id: "u2",
    from: "client",
    time: "00:36",
    quote: {
      title: "Vidia",
      body: "Ce serviciu dorești? Apasă Servicii și alege din listă…",
    },
    body: (
      <>
        <p>
          <strong>Tuns + Barba</strong>
        </p>
        <p>80 LEI · 45 min</p>
      </>
    ),
    holdMs: 850,
  },
  {
    kind: "msg",
    id: "b2",
    from: "ai",
    time: "00:36",
    rich: true,
    typingMs: 1000,
    body: (
      <>
        <p>
          <strong>Alege ziua — Tuns + Barba</strong>
        </p>
        <p>
          Apasă <strong>Zile disponibile</strong> (următoarele 14 zile cu locuri
          libere) sau scrie, ex: <span className="wa-link">mâine la 10</span>.
        </p>
        <ListButton label="Zile disponibile" />
      </>
    ),
    holdMs: 900,
  },
  {
    kind: "sheet",
    id: "sheet-days",
    title: "Zile disponibile",
    items: DAYS,
    selectIndex: 7,
    openMs: 1000,
    selectMs: 1200,
    showSend: true,
  },
  {
    kind: "msg",
    id: "u3",
    from: "client",
    time: "00:36",
    quote: {
      title: "Vidia",
      body: "Alege ziua — Tuns + Barba",
    },
    body: (
      <>
        <p>
          <strong>Vineri, 4 Sep</strong>
        </p>
        <p>Vineri, 4 septembrie</p>
      </>
    ),
    holdMs: 850,
  },
  {
    kind: "msg",
    id: "b3",
    from: "ai",
    time: "00:37",
    rich: true,
    typingMs: 1000,
    body: (
      <>
        <p>
          <strong>Alege ora — Tuns + Barba</strong>
        </p>
        <p>
          Data: <span className="wa-link">Vineri, 4 septembrie</span>
        </p>
        <p>
          Apasă <strong>Ore libere</strong> și selectează intervalul.
        </p>
        <ListButton label="Ore libere" />
      </>
    ),
    holdMs: 900,
  },
  {
    kind: "sheet",
    id: "sheet-hours",
    title: "Ore libere",
    items: HOURS,
    selectIndex: 6,
    openMs: 1000,
    selectMs: 1300,
    showSend: true,
  },
  {
    kind: "msg",
    id: "u4",
    from: "client",
    time: "00:37",
    quote: {
      title: "Vidia",
      body: "Alege ora — Tuns + Barba · Data: Vineri, 4 septembrie",
    },
    body: (
      <>
        <p>
          <strong className="wa-link">16:30</strong>
        </p>
        <p>Disponibil</p>
      </>
    ),
    holdMs: 850,
  },
  {
    kind: "msg",
    id: "b4",
    from: "ai",
    time: "00:37",
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
          <p>Tuns + Barba</p>
          <p>
            <strong>Data</strong>
          </p>
          <p>Vineri, 4 septembrie</p>
          <p>
            <strong>Ora</strong>
          </p>
          <p>
            <span className="wa-link">16:30</span>
          </p>
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
    kind: "msg",
    id: "u5",
    from: "client",
    time: "00:37",
    quote: {
      title: "Vidia",
      body: "Îți dorești să confirmi această programare?",
    },
    body: "Confirmă",
    holdMs: 750,
  },
  {
    kind: "msg",
    id: "b5",
    from: "ai",
    time: "00:38",
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
    kind: "msg",
    id: "b6",
    from: "ai",
    time: "00:38",
    rich: true,
    typingMs: 1000,
    body: (
      <>
        <p>
          <strong>Programarea ta a fost confirmată!</strong>
        </p>
        <p>
          Alin Ivan, te așteptăm pentru serviciul <strong>Tuns + Barba</strong>,{" "}
          <span className="wa-link">vineri, 4 septembrie, la ora 16:30</span>.
        </p>
        <p>
          Poți porni spre locație de aici: [hartă] (
          <span className="wa-link">https://maps.app.goo.gl/9mQvC3yHxTeSW1187</span>
          )
        </p>
        <p>Ne vedem curând!</p>
        <hr className="wa-divider" />
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

const MSG_STEPS = SCRIPT.filter((s): s is SimMessage => s.kind === "msg");
const CALENDAR_CALLOUT_AT = MSG_STEPS.findIndex((m) => m.id === "b6") + 1;
const CLIENT_NOTE_AT = MSG_STEPS.length;

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

function WaListSheet({
  title,
  items,
  selectedIndex,
  showSend,
}: {
  title: string;
  items: ListItem[];
  selectedIndex: number | null;
  showSend: boolean;
}) {
  return (
    <div className="wa-sheet" aria-hidden="true">
      <div className="wa-sheet-panel">
        <div className="wa-sheet-head">
          <p className="wa-sheet-title">{title}</p>
          <span className="wa-sheet-close">×</span>
        </div>
        <ul className="wa-sheet-list">
          {items.map((item, i) => {
            const selected = selectedIndex === i;
            return (
              <li
                key={`${item.title}-${i}`}
                className={`wa-sheet-item${selected ? " is-selected" : ""}`}
              >
                <div className="wa-sheet-item-text">
                  <strong>{item.title}</strong>
                  <span>{item.subtitle}</span>
                </div>
                {selected ? (
                  <span className="wa-sheet-check" aria-hidden="true">
                    ✓
                  </span>
                ) : null}
              </li>
            );
          })}
        </ul>
        {showSend && selectedIndex !== null ? (
          <button type="button" className="wa-sheet-send" tabIndex={-1}>
            Trimite
          </button>
        ) : (
          <p className="wa-sheet-hint">Atinge un articol pentru a-l selecta</p>
        )}
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
          <span>Vineri, 4 Sep. · 16:30</span>
          <em>Tuns + Barba</em>
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

type SheetView = {
  title: string;
  items: ListItem[];
  selectedIndex: number | null;
  showSend: boolean;
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
  const [sheet, setSheet] = useState<SheetView | null>(null);

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
  }, [visibleCount, typing, fading, sheet]);

  useEffect(() => {
    if (!capture && reduced) {
      setVisibleCount(MSG_STEPS.length);
      setTyping(false);
      setFading(false);
      setSheet(null);
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
      setSheet(null);
      setVisibleCount(0);
      await wait(capture ? 120 : 500);
      if (cancelled) return;

      let msgIndex = 0;

      for (const step of SCRIPT) {
        if (cancelled) return;

        if (step.kind === "sheet") {
          setSheet({
            title: step.title,
            items: step.items,
            selectedIndex: null,
            showSend: false,
          });
          await wait(step.openMs);
          if (cancelled) return;
          setSheet({
            title: step.title,
            items: step.items,
            selectedIndex: step.selectIndex,
            showSend: Boolean(step.showSend),
          });
          await wait(step.selectMs);
          if (cancelled) return;
          setSheet(null);
          continue;
        }

        if (step.from === "ai" && step.typingMs) {
          setTyping(true);
          await wait(step.typingMs);
          if (cancelled) return;
          setTyping(false);
        }

        msgIndex += 1;
        setVisibleCount(msgIndex);
        if (capture && msgIndex === 1) {
          document.documentElement.dataset.bookingSimStarted = "1";
        }
        await wait(step.holdMs);
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

  const messages = reduced ? MSG_STEPS : MSG_STEPS.slice(0, visibleCount);

  const showCalendarCallout =
    !fading && !sheet && (reduced || visibleCount >= CALENDAR_CALLOUT_AT);
  const showClientNote =
    !fading && !sheet && (reduced || visibleCount >= CLIENT_NOTE_AT);

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

          <div className="booking-sim-chat-stage">
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
                    msg.rich
                      ? "wa-bubble-rich booking-sim-enter"
                      : "booking-sim-enter"
                  }
                >
                  {msg.body}
                </WhatsAppBubble>
              ))}
              {typing ? <TypingDots /> : null}
            </div>

            <WhatsAppComposer light />

            {sheet ? (
              <WaListSheet
                title={sheet.title}
                items={sheet.items}
                selectedIndex={sheet.selectedIndex}
                showSend={sheet.showSend}
              />
            ) : null}
          </div>
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
