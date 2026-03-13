"use client";

import { useParams } from "next/navigation";
import AuthForm from "@/components/auth/AuthForm";

export default function SignupPage() {
  const params = useParams();
  const locale = params?.locale as string;

  return (
    <div className="auth-page">
      <style>{`
        .auth-page {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 24px;
          background: var(--bg-base, #0a0e1a);
        }
        .auth-card {
          width: 100%;
          max-width: 400px;
          background: var(--surface-elevated, #1a1f2e);
          border: 1px solid var(--border-subtle, #2a3042);
          border-radius: 16px;
          padding: 40px 32px;
        }
        .auth-card h1 {
          font-size: 24px;
          font-weight: 800;
          color: var(--text-primary, #e2e8f0);
          margin: 0 0 8px;
          text-align: center;
        }
        .auth-card .subtitle {
          font-size: 14px;
          color: var(--text-secondary, #94a3b8);
          text-align: center;
          margin: 0 0 28px;
        }
      `}</style>

      <div className="auth-card">
        <h1>Create Account</h1>
        <p className="subtitle">
          Get started with Property Launch Pad — it&apos;s free
        </p>

        <AuthForm mode="signup" locale={locale} />
      </div>
    </div>
  );
}
