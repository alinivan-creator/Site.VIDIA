/**
 * Faint calendar-slot + branch marks for About/Contact wash margins.
 * Reads as booking / multi-location atmosphere — not chat mockups.
 */
export function SignalWashMarks() {
  return (
    <div className="signal-wash-marks" aria-hidden="true">
      <svg
        className="signal-wash-marks__left"
        viewBox="0 0 120 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect className="signal-wash-slot" x="8" y="18" width="18" height="22" rx="3" />
        <rect className="signal-wash-slot" x="34" y="28" width="18" height="22" rx="3" />
        <rect className="signal-wash-slot" x="60" y="14" width="18" height="22" rx="3" />
        <circle className="signal-wash-branch" cx="98" cy="42" r="3.2" />
        <path
          d="M26 40 L43 39 L69 25 L98 42"
          stroke="rgba(225, 6, 0, 0.12)"
          strokeWidth="1"
          strokeDasharray="2 5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <svg
        className="signal-wash-marks__right"
        viewBox="0 0 120 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle className="signal-wash-branch" cx="22" cy="48" r="3" />
        <rect className="signal-wash-slot" x="44" y="30" width="18" height="22" rx="3" />
        <rect className="signal-wash-slot" x="70" y="40" width="18" height="22" rx="3" />
        <rect className="signal-wash-slot" x="96" y="24" width="18" height="22" rx="3" />
        <path
          d="M22 48 L53 41 L79 51 L105 35"
          stroke="rgba(225, 6, 0, 0.11)"
          strokeWidth="1"
          strokeDasharray="2 5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
