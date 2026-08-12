import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("ro-RO", {
  timeZone: "Europe/Bucharest",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export function getRomaniaTime() {
  return formatter.format(new Date());
}

/** Ora locală din România (Europe/Bucharest), actualizată în timp real. */
export function useRomaniaTime() {
  const [time, setTime] = useState(getRomaniaTime);

  useEffect(() => {
    const tick = () => setTime(getRomaniaTime());
    tick();

    const now = Date.now();
    const msToNextMinute = 60_000 - (now % 60_000);
    let intervalId = 0;

    const timeoutId = window.setTimeout(() => {
      tick();
      intervalId = window.setInterval(tick, 60_000);
    }, msToNextMinute);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, []);

  return time;
}
