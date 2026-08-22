export const COOKIE_CONSENT_KEY = "vidia_cookie_consent";
export const COOKIE_ACCEPTED_LEGACY_KEY = "vidia_cookies_accepted";

export type CookieConsent = "all" | "essential" | "rejected";

export function readCookieConsent(): CookieConsent | null {
  try {
    const value = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (value === "all" || value === "essential" || value === "rejected") {
      return value;
    }
    if (localStorage.getItem(COOKIE_ACCEPTED_LEGACY_KEY) === "true") {
      return "all";
    }
    return null;
  } catch {
    return null;
  }
}

export function saveCookieConsent(consent: CookieConsent) {
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, consent);
    if (consent === "all") {
      localStorage.setItem(COOKIE_ACCEPTED_LEGACY_KEY, "true");
    } else {
      localStorage.removeItem(COOKIE_ACCEPTED_LEGACY_KEY);
    }
  } catch {
    /* ignore private mode */
  }
}

export function hasCookieConsent(): boolean {
  return readCookieConsent() !== null;
}
