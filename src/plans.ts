export const PLAN_OPTIONS = [
  "Booking",
  "Consulting",
  "SMS Marketing",
  "PRO",
  "Personalizat",
] as const;

export type PlanOption = (typeof PLAN_OPTIONS)[number];

export const PLAN_STORAGE_KEY = "vidia-selected-plan";
export const PLAN_EVENT = "vidia:plan-selected";

export function isPlanOption(value: string): value is PlanOption {
  return (PLAN_OPTIONS as readonly string[]).includes(value);
}

export function saveSelectedPlan(plan: PlanOption) {
  try {
    sessionStorage.setItem(PLAN_STORAGE_KEY, plan);
  } catch {
    /* ignore private mode */
  }
  window.dispatchEvent(
    new CustomEvent(PLAN_EVENT, { detail: { plan } }),
  );
}

export function readSelectedPlan(): PlanOption | "" {
  try {
    const value = sessionStorage.getItem(PLAN_STORAGE_KEY) ?? "";
    return isPlanOption(value) ? value : "";
  } catch {
    return "";
  }
}

export function clearSelectedPlan() {
  try {
    sessionStorage.removeItem(PLAN_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export function scrollToContact() {
  const target = document.getElementById("contact");
  if (!target) return;

  const header = document.querySelector(".site-header") as HTMLElement | null;
  const offset = (header?.offsetHeight ?? 72) + 12;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;

  if (window.location.hash) {
    history.replaceState(null, "", window.location.pathname || "/");
  }
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}
