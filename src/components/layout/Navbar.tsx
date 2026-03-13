"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import type { Locale } from "@/lib/types";

interface Props {
  locale: Locale;
}

export default function Navbar({ locale }: Props) {
  const { user } = useAuth();

  return (
    <nav className="plp-nav">
      <style>{`
        .plp-nav {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 24px; max-width: 1200px; margin: 0 auto;
          border-bottom: 1px solid var(--border-subtle, #2a3042);
        }
        .plp-nav-brand {
          font-size: 16px; font-weight: 800; color: var(--accent, #6366f1);
          text-decoration: none; letter-spacing: -0.3px;
        }
        .plp-nav-links {
          display: flex; align-items: center; gap: 24px;
        }
        .plp-nav-link {
          font-size: 13px; font-weight: 600; color: var(--text-secondary, #94a3b8);
          text-decoration: none; transition: color 0.15s;
        }
        .plp-nav-link:hover { color: var(--text-primary, #e2e8f0); }
        .plp-nav-cta {
          font-size: 13px; font-weight: 700; color: #fff;
          background: var(--accent, #6366f1); padding: 8px 18px;
          border-radius: 8px; text-decoration: none; transition: opacity 0.15s;
        }
        .plp-nav-cta:hover { opacity: 0.9; }
        .plp-locale-toggle {
          font-size: 12px; font-weight: 600; color: var(--text-muted, #4a5568);
          background: var(--surface-elevated, #1a1f2e); border: 1px solid var(--border-subtle, #2a3042);
          padding: 4px 10px; border-radius: 6px; text-decoration: none; transition: border-color 0.15s;
        }
        .plp-locale-toggle:hover { border-color: var(--border-hover, #3a4562); }
      `}</style>

      <Link href={`/${locale}`} className="plp-nav-brand">
        Property Launch Pad
      </Link>

      <div className="plp-nav-links">
        <Link href={`/${locale}/tools`} className="plp-nav-link">Tools</Link>
        <Link href={`/${locale}/pricing`} className="plp-nav-link">Pricing</Link>

        {/* Locale toggle */}
        <Link
          href={`/${locale === "en" ? "es" : "en"}`}
          className="plp-locale-toggle"
        >
          {locale === "en" ? "ES" : "EN"}
        </Link>

        {user ? (
          <Link href={`/${locale}/dashboard`} className="plp-nav-cta">
            Dashboard
          </Link>
        ) : (
          <Link href={`/${locale}/login`} className="plp-nav-cta">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
