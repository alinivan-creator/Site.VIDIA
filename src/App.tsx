import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Home } from "./pages/Home";
import { TikTokLanding } from "./pages/TikTokLanding";
import { TikTokAdCapture } from "./pages/TikTokAdCapture";
import { Terms } from "./pages/Terms";
import { Privacy } from "./pages/Privacy";
import { Cookies } from "./pages/Cookies";
import "./App.css";

function ScrollManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    // Evită saltul la secțiuni vechi (#despre etc.) la refresh / reintrare.
    if (window.location.hash) {
      history.replaceState(null, "", pathname || "/");
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tiktok" element={<TikTokLanding />} />
        <Route path="/tiktok-ad" element={<TikTokAdCapture />} />
        <Route path="/termeni" element={<Terms />} />
        <Route path="/confidentialitate" element={<Privacy />} />
        <Route path="/cookies" element={<Cookies />} />
      </Routes>
    </BrowserRouter>
  );
}
