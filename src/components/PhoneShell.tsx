import type { ReactNode } from "react";
import { useRomaniaTime } from "../hooks/useRomaniaTime";

/**
 * Ramă iPhone realistă, unică pentru toate mockup-urile:
 * contur titan, Dynamic Island, status bar, home indicator.
 * Toate instanțele au exact aceleași dimensiuni.
 */
export function PhoneShell({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  const time = useRomaniaTime();

  return (
    <div className={`iphone${light ? " iphone-light" : ""}`} aria-hidden="true">
      <div className="iphone-buttons">
        <span className="iphone-btn iphone-btn-action" />
        <span className="iphone-btn iphone-btn-volup" />
        <span className="iphone-btn iphone-btn-voldown" />
        <span className="iphone-btn iphone-btn-power" />
      </div>
      <div className="iphone-bezel">
        <div className="iphone-screen">
          <div className="iphone-island" />
          <div className="iphone-status">
            <span className="iphone-status-time">{time}</span>
            <span className="iphone-status-icons">
              <svg viewBox="0 0 18 12" width="15" height="10" fill="currentColor">
                <rect x="0" y="8" width="3" height="4" rx="0.8" />
                <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.8" />
                <rect x="9" y="3" width="3" height="9" rx="0.8" />
                <rect x="13.5" y="0.5" width="3" height="11.5" rx="0.8" />
              </svg>
              <svg viewBox="0 0 16 12" width="14" height="10" fill="currentColor">
                <path d="M8 2.2c2.2 0 4.2.8 5.8 2.2l-1.2 1.2A6.8 6.8 0 0 0 8 4.2c-1.7 0-3.2.6-4.4 1.6L2.4 4.6A8.7 8.7 0 0 1 8 2.2Zm0 3.2c1.3 0 2.5.5 3.4 1.3L10.2 7.9A3.5 3.5 0 0 0 8 7c-.9 0-1.7.3-2.3.9L4.5 6.7A5 5 0 0 1 8 5.4Zm0 3.3c.6 0 1.1.2 1.5.6L8 11.1 6.5 9.3c.4-.4.9-.6 1.5-.6Z" />
              </svg>
              <svg viewBox="0 0 25 12" width="22" height="11">
                <rect
                  x="0.5"
                  y="0.5"
                  width="21"
                  height="11"
                  rx="3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.5"
                />
                <rect x="2" y="2" width="17" height="8" rx="1.8" fill="currentColor" />
                <path d="M23.2 4v4a2.2 2.2 0 0 0 0-4Z" fill="currentColor" opacity="0.5" />
              </svg>
            </span>
          </div>
          <div className="iphone-content">{children}</div>
          <div className="iphone-home" />
        </div>
      </div>
    </div>
  );
}
