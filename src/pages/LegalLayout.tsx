import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../components/Logo";
import { Seo } from "../components/Seo";

type LegalPageProps = {
  title: string;
  description: string;
  path: string;
  children: ReactNode;
};

export function LegalLayout({ title, description, path, children }: LegalPageProps) {
  return (
    <div className="legal-page">
      <Seo
        title={`${title} | GetVidia`}
        description={description}
        path={path}
      />
      <header className="legal-top">
        <div className="container legal-top-inner">
          <Logo />
          <Link to="/" className="btn btn-ghost">
            Înapoi la site
          </Link>
        </div>
      </header>
      <main className="container legal-content">
        <h1>{title}</h1>
        {children}
      </main>
      <footer className="legal-bottom">
        <div className="container">
          <p>Copyright © 2026 VIDIA. Toate drepturile rezervate.</p>
        </div>
      </footer>
    </div>
  );
}
