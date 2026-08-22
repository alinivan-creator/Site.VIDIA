export const PLAN_OPTIONS = [
  "Booking",
  "Consulting",
  "SMS Marketing",
  "PRO",
  "Personalizat",
] as const;

export type PlanOption = (typeof PLAN_OPTIONS)[number];

export const PLAN_STORAGE_KEY = "vidia-selected-plan";
export const PLAN_DETAILS_KEY = "vidia-selected-plan-details";
export const PLAN_EVENT = "vidia:plan-selected";

export function isPlanOption(value: string): value is PlanOption {
  return (PLAN_OPTIONS as readonly string[]).includes(value);
}

export function saveSelectedPlan(plan: PlanOption, details?: string) {
  try {
    sessionStorage.setItem(PLAN_STORAGE_KEY, plan);
    if (details) {
      sessionStorage.setItem(PLAN_DETAILS_KEY, details);
    } else {
      sessionStorage.removeItem(PLAN_DETAILS_KEY);
    }
  } catch {
    /* ignore private mode */
  }
  window.dispatchEvent(
    new CustomEvent(PLAN_EVENT, { detail: { plan, details } }),
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

export function readSelectedPlanDetails(): string {
  try {
    return sessionStorage.getItem(PLAN_DETAILS_KEY) ?? "";
  } catch {
    return "";
  }
}

export function clearSelectedPlan() {
  try {
    sessionStorage.removeItem(PLAN_STORAGE_KEY);
    sessionStorage.removeItem(PLAN_DETAILS_KEY);
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
