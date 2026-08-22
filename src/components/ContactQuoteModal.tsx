import { useEffect, useId, useRef, useState } from "react";
import {
  CONTACT_QUOTE,
  CONTACT_QUOTE_MODAL,
} from "../content/encouragement-quote";

export function ContactQuoteModal() {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const descId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      triggerRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="contact-quote-trigger"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={`${CONTACT_QUOTE} — deschide perspectiva`}
      >
        <span className="contact-quote-inner">
          <span className="contact-quote-text">{CONTACT_QUOTE}</span>
          <span className="contact-quote-action" aria-hidden="true">
            Citește perspectiva
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
              <path
                d="M3 8h8M9 5l3 3-3 3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </span>
      </button>

      {open ? (
        <div
          className="quote-modal-root"
          role="presentation"
          onClick={() => setOpen(false)}
        >
          <div
            className="quote-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            onClick={(event) => event.stopPropagation()}
          >
            <p className="quote-modal-label">Perspective</p>
            <h3 id={titleId} className="quote-modal-title">
              {CONTACT_QUOTE_MODAL.title}
            </h3>
            <div id={descId} className="quote-modal-body">
              {CONTACT_QUOTE_MODAL.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
              <p className="quote-modal-cta">{CONTACT_QUOTE_MODAL.cta}</p>
            </div>
            <button
              ref={closeRef}
              type="button"
              className="btn btn-primary quote-modal-close"
              onClick={() => setOpen(false)}
            >
              Închide
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
