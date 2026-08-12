import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { Logo } from "./Logo";
import { NAV_SECTIONS, type NavSectionId } from "../nav";

function getHeaderOffset(header: HTMLElement | null) {
  return (header?.offsetHeight ?? 72) + 12;
}

function resolveActiveSection(
  sectionIds: readonly NavSectionId[],
  offset: number,
): NavSectionId | "" {
  const sections = sectionIds
    .map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const bottom = top + el.offsetHeight;
      return { id, top, bottom };
    })
    .filter(
      (s): s is { id: NavSectionId; top: number; bottom: number } =>
        Boolean(s),
    )
    .sort((a, b) => a.top - b.top);

  if (sections.length === 0) return "";

  const marker = window.scrollY + offset;

  // Activă doar secțiunea în care marker-ul e efectiv (nu „până la următoarea”).
  // Astfel Contact (între Prețuri și FAQ) nu ține Prețuri evidențiat.
  for (const section of sections) {
    if (marker >= section.top - 1 && marker < section.bottom - 1) {
      return section.id;
    }
  }

  const doc = document.documentElement;
  const distanceToBottom =
    doc.scrollHeight - (window.innerHeight + window.scrollY);

  // La fundul paginii: ultima secțiune din meniu (Despre).
  if (distanceToBottom < 80) {
    return sections[sections.length - 1].id;
  }

  return "";
}

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const lockRef = useRef<NavSectionId | "">("");
  const unlockTimer = useRef<number>(0);
  const pendingScrollId = useRef<string | null>(null);
  const menuId = useId();
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<NavSectionId | "">("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sectionIds = NAV_SECTIONS.map((l) => l.id);
    let frame = 0;

    const sync = () => {
      setScrolled(window.scrollY > 12);

      if (lockRef.current) {
        setActiveId(lockRef.current);
        return;
      }

      const offset = getHeaderOffset(headerRef.current);
      setActiveId(resolveActiveSection(sectionIds, offset));
    };

    const onScrollOrResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(sync);
    };

    sync();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(unlockTimer.current);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  useEffect(() => {
    const syncPanelTop = () => {
      const h = headerRef.current?.offsetHeight ?? 72;
      document.documentElement.style.setProperty("--nav-panel-top", `${h}px`);
    };

    syncPanelTop();
    window.addEventListener("resize", syncPanelTop);
    return () => {
      window.removeEventListener("resize", syncPanelTop);
    };
  }, [scrolled, menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    const onResize = () => {
      if (window.matchMedia("(min-width: 821px)").matches) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);

    // Lock scroll without jumping to top (keeps current scroll position).
    const scrollY = window.scrollY;
    const { body } = document;
    const prev = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    };
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";

    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      body.style.overflow = prev.overflow;
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;

      const pendingId = pendingScrollId.current;
      pendingScrollId.current = null;
      if (pendingId) {
        // Unlock first, then scroll to the chosen section (avoid restoring old Y).
        window.scrollTo(0, scrollY);
        requestAnimationFrame(() => {
          const target = document.getElementById(pendingId);
          if (!target) return;
          const offset = getHeaderOffset(headerRef.current);
          const top =
            target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
        });
      } else {
        window.scrollTo(0, scrollY);
      }
    };
  }, [menuOpen]);

  const scrollToId = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    const offset = getHeaderOffset(headerRef.current);
    const top = target.getBoundingClientRect().top + window.scrollY - offset;

    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname || "/");
    }

    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  };

  const closeMenuThenScroll = (id: string) => {
    if (menuOpen) {
      pendingScrollId.current = id;
      setMenuOpen(false);
      return;
    }
    scrollToId(id);
  };

  const onNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    id: NavSectionId,
  ) => {
    event.preventDefault();

    lockRef.current = id;
    setActiveId(id);
    // Nu persistăm hash-ul în URL — altfel refresh-ul aruncă pagina la secțiunea veche.
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname || "/");
    }

    window.clearTimeout(unlockTimer.current);

    const unlock = () => {
      lockRef.current = "";
      const nextOffset = getHeaderOffset(headerRef.current);
      setActiveId(
        resolveActiveSection(
          NAV_SECTIONS.map((l) => l.id),
          nextOffset,
        ),
      );
    };

    closeMenuThenScroll(id);

    const onScrollEnd = () => unlock();
    window.addEventListener("scrollend", onScrollEnd, { once: true });
    unlockTimer.current = window.setTimeout(() => {
      window.removeEventListener("scrollend", onScrollEnd);
      unlock();
    }, 900);
  };

  const navLinks = (
    <>
      {NAV_SECTIONS.map((link) => (
        <a
          key={link.id}
          href={`#${link.id}`}
          className={activeId === link.id ? "is-active" : undefined}
          aria-current={activeId === link.id ? "location" : undefined}
          onClick={(e) => onNavClick(e, link.id)}
        >
          {link.label}
        </a>
      ))}
    </>
  );

  return (
    <>
      <header
        ref={headerRef}
        className={`site-header ${scrolled ? "is-scrolled" : ""}${menuOpen ? " is-menu-open" : ""}`}
      >
        <div className="container header-inner">
          <Logo />

          <nav className="nav-main" aria-label="Navigare principală">
            {navLinks}
          </nav>

          <div className="header-actions">
            <a
              className="btn btn-primary header-cta"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                closeMenuThenScroll("contact");
              }}
            >
              Contactează-ne
            </a>

            <button
              type="button"
              className="nav-toggle"
              aria-expanded={menuOpen}
              aria-controls={menuId}
              aria-label={menuOpen ? "Închide meniul" : "Deschide meniul"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="nav-toggle-bar" aria-hidden="true" />
              <span className="nav-toggle-bar" aria-hidden="true" />
              <span className="nav-toggle-bar" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Fixed overlay outside sticky header so it covers the viewport at any scroll. */}
      <div
        className={`nav-backdrop${menuOpen ? " is-open" : ""}`}
        hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      <div
        id={menuId}
        className={`nav-panel${menuOpen ? " is-open" : ""}`}
        hidden={!menuOpen}
      >
        <nav className="nav-panel-links" aria-label="Navigare mobilă">
          {navLinks}
        </nav>
      </div>
    </>
  );
}
