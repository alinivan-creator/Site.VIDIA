import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Home } from "./pages/Home";
import { TikTokLanding } from "./pages/TikTokLanding";
import { TikTokAdCapture } from "./pages/TikTokAdCapture";
import { Terms } from "./pages/Terms";
import { Privacy } from "./pages/Privacy";
import { Cookies } from "./pages/Cookies";
import { NichePage } from "./pages/nishe/NichePage";
import { ServicePage } from "./pages/servicii/ServicePage";
import { NICHE_SLUGS } from "./nishe/config";
import { CookieBanner } from "./components/CookieBanner";
import "./App.css";

function ScrollManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      requestAnimationFrame(() => {
        const target = document.getElementById(hash);
        if (!target) return;
        const header = document.querySelector(".site-header") as HTMLElement | null;
        const offset = (header?.offsetHeight ?? 72) + 12;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
      });
      return;
    }

    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <CookieBanner />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tiktok" element={<TikTokLanding />} />
        <Route path="/tiktok-ad" element={<TikTokAdCapture />} />
        <Route path="/termeni" element={<Terms />} />
        <Route path="/confidentialitate" element={<Privacy />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/nishe/:slug" element={<NichePage />} />
        <Route path="/servicii/:slug" element={<ServicePage />} />
        {NICHE_SLUGS.map((slug) => (
          <Route key={slug} path={`/${slug}`} element={<NichePage />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
