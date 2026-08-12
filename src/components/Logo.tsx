import { Link, useNavigate } from "react-router-dom";

export function Logo({ className = "" }: { className?: string }) {
  const navigate = useNavigate();

  return (
    <Link
      to="/"
      className={`logo ${className}`}
      aria-label="VIDIA — pagina principală"
      onClick={(e) => {
        e.preventDefault();
        if (window.location.hash) {
          history.replaceState(null, "", "/");
        }
        navigate("/");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <span className="logo-mark" aria-hidden="true">
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="16" fill="#E10600" />
          <circle
            cx="16"
            cy="16"
            r="12.5"
            stroke="rgba(255, 255, 255, 0.38)"
            strokeWidth="1.2"
          />
          <g
            stroke="rgba(255, 255, 255, 0.6)"
            strokeWidth="1.4"
            strokeLinecap="round"
          >
            <line x1="16" y1="4.9" x2="16" y2="6.9" />
            <line x1="27.1" y1="16" x2="25.1" y2="16" />
            <line x1="16" y1="27.1" x2="16" y2="25.1" />
            <line x1="4.9" y1="16" x2="6.9" y2="16" />
          </g>
          {/* Limbile ceasului la 10:10 formează litera V */}
          <g stroke="#fff" strokeWidth="3" strokeLinecap="round">
            <line x1="16" y1="17.2" x2="8.6" y2="12" />
            <line x1="16" y1="17.2" x2="24.4" y2="11.3" />
          </g>
          <circle cx="16" cy="17.2" r="1.9" fill="#fff" />
        </svg>
      </span>
      <span className="logo-text">VIDIA</span>
    </Link>
  );
}
