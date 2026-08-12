type SignalVariant = "quote" | "services" | "how" | "constellation";

/**
 * Ambient booking-signal motifs for sparse sections.
 * Reads as scheduling / WhatsApp→calendar / multi-location — not generic tech.
 * No phone/chat mockups (those live in product demos).
 * Desktop stays richer; mobile simplifies via CSS (.signal-dense).
 */
export function SignalField({ variant }: { variant: SignalVariant }) {
  if (variant === "quote") {
    return (
      <div className="signal-field signal-field--quote" aria-hidden="true">
        {/* 24/7 availability clock + confirmation core */}
        <svg
          className="signal-clock"
          viewBox="0 0 220 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle className="signal-ring signal-ring--outer signal-dense" cx="110" cy="110" r="94" />
          <circle className="signal-ring" cx="110" cy="110" r="78" />
          <g className="signal-clock-ticks">
            {Array.from({ length: 12 }, (_, i) => {
              const a = ((i * 30 - 90) * Math.PI) / 180;
              const outer = 78;
              const inner = i % 3 === 0 ? 66 : 70;
              return (
                <line
                  key={i}
                  className={
                    i % 3 === 0
                      ? "signal-clock-tick signal-clock-tick--hour"
                      : "signal-clock-tick"
                  }
                  x1={110 + Math.cos(a) * inner}
                  y1={110 + Math.sin(a) * inner}
                  x2={110 + Math.cos(a) * outer}
                  y2={110 + Math.sin(a) * outer}
                />
              );
            })}
          </g>
          <g className="signal-clock-hand">
            <line className="signal-clock-hand-line" x1="110" y1="110" x2="110" y2="48" />
            <circle className="signal-node signal-node--pulse" cx="110" cy="48" r="2.4" />
          </g>
          <circle className="signal-ring signal-ring--core" cx="110" cy="110" r="4.2" />
          <circle className="signal-node signal-node--halo signal-dense" cx="110" cy="110" r="9" />
        </svg>

        {/* Available hour columns (calendar slots) */}
        <div className="signal-slots">
          <span className="signal-slot" />
          <span className="signal-slot" />
          <span className="signal-slot" />
          <span className="signal-slot" />
          <span className="signal-slot" />
        </div>
      </div>
    );
  }

  if (variant === "services") {
    return (
      <div className="signal-field signal-field--services" aria-hidden="true">
        {/* Message → booking signal → calendar confirmation */}
        <svg
          className="signal-arc"
          viewBox="0 0 320 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="signal-path signal-path--soft signal-dense"
            d="M48 78 C 110 22, 170 22, 230 62 S 286 96, 286 48"
          />
          <path
            className="signal-path"
            d="M48 78 C 110 22, 170 22, 230 62 S 286 96, 286 48"
          />

          {/* Message glyph (abstract — not a phone mockup) */}
          <g className="signal-glyph signal-glyph--msg">
            <rect x="10" y="62" width="34" height="24" rx="7" />
            <line x1="18" y1="72" x2="36" y2="72" />
            <line className="signal-dense" x1="18" y1="78" x2="30" y2="78" />
          </g>

          {/* Mid waypoint: soft domain accent (dental) */}
          <circle
            className="signal-node signal-node--domain signal-node--domain-dental signal-dense"
            cx="160"
            cy="28"
            r="2.4"
          />

          {/* Mini calendar glyph + check pulse */}
          <g className="signal-glyph signal-glyph--cal">
            <rect x="274" y="28" width="30" height="26" rx="4" />
            <line x1="274" y1="38" x2="304" y2="38" />
            <circle className="signal-cal-dot" cx="283" cy="46" r="1.6" />
            <circle className="signal-cal-dot signal-dense" cx="291" cy="46" r="1.6" />
            <path
              className="signal-check"
              d="M280 52 L286 57 L298 44"
            />
          </g>

          <circle className="signal-traveler signal-traveler--bloom signal-traveler--arc signal-dense" r="7" />
          <circle className="signal-traveler signal-traveler--arc" r="2.6" />
        </svg>
      </div>
    );
  }

  if (variant === "constellation") {
    return (
      <div className="signal-field signal-field--constellation" aria-hidden="true">
        {/* Multi-location / branch schedule: slots + domain-tinted branch dots */}
        <svg
          className="signal-constellation"
          viewBox="0 0 360 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="signal-constellation-link"
            d="M36 40 L96 24 L156 44 L216 20 L276 38 L324 28"
          />

          {/* Calendar slot cells */}
          <g className="signal-slot-cell signal-slot-cell--1">
            <rect x="28" y="30" width="16" height="20" rx="3" />
            <line x1="28" y1="37" x2="44" y2="37" />
          </g>
          <g className="signal-slot-cell signal-slot-cell--3">
            <rect x="148" y="34" width="16" height="20" rx="3" />
            <line x1="148" y1="41" x2="164" y2="41" />
          </g>
          <g className="signal-slot-cell signal-slot-cell--5">
            <rect x="268" y="28" width="16" height="20" rx="3" />
            <line x1="268" y1="35" x2="284" y2="35" />
          </g>

          {/* Branch / location dots with soft domain accents */}
          <g className="signal-branch signal-branch--2">
            <circle className="signal-branch-halo signal-dense" cx="96" cy="24" r="7" />
            <circle className="signal-branch-dot signal-node--domain-itp" cx="96" cy="24" r="3" />
          </g>
          <g className="signal-branch signal-branch--4 signal-dense">
            <circle className="signal-branch-halo" cx="216" cy="20" r="7" />
            <circle className="signal-branch-dot signal-node--domain-pet" cx="216" cy="20" r="3" />
          </g>
          <g className="signal-branch signal-branch--6">
            <circle className="signal-branch-halo signal-dense" cx="324" cy="28" r="7" />
            <circle className="signal-branch-dot signal-node--domain-nails" cx="324" cy="28" r="3" />
          </g>

          {/* Soft confirmation check on a booked slot */}
          <path
            className="signal-check signal-check--constellation signal-dense"
            d="M151 48 L155 52 L161 44"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="signal-field signal-field--how" aria-hidden="true">
      {/* WhatsApp → assistant → calendar rail */}
      <svg
        className="signal-rail"
        viewBox="0 0 600 36"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path className="signal-rail-line" d="M20 18 H580" />

        {/* Stage marks: message · process · calendar */}
        <g className="signal-rail-stage" transform="translate(100 18)">
          <circle className="signal-rail-mark" r="3.2" />
          <rect className="signal-rail-msg signal-dense" x="-5" y="-14" width="10" height="7" rx="2" />
        </g>
        <g className="signal-rail-stage" transform="translate(300 18)">
          <circle className="signal-rail-mark" r="3.2" />
        </g>
        <g className="signal-rail-stage" transform="translate(500 18)">
          <circle className="signal-rail-mark" r="3.2" />
          <path className="signal-check signal-check--rail" d="M-5 0 L-1 4 L6 -4" />
        </g>

        <circle className="signal-traveler signal-traveler--bloom signal-traveler--rail signal-dense" r="6.5" cy="18" />
        <circle className="signal-traveler signal-traveler--rail" r="2.5" cy="18" />
      </svg>

      {/* Vertical step confirmations */}
      <div className="signal-timeline" aria-hidden="true">
        <span className="signal-timeline-line" />
        <span className="signal-timeline-node signal-timeline-node--a" />
        <span className="signal-timeline-node signal-timeline-node--b" />
        <span className="signal-timeline-node signal-timeline-node--c" />
      </div>

      {/* Soft available slots (desktop accent) */}
      <div className="signal-slots signal-slots--how">
        <span className="signal-slot" />
        <span className="signal-slot" />
        <span className="signal-slot" />
      </div>
    </div>
  );
}
