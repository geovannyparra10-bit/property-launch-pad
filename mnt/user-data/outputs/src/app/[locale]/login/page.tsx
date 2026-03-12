import AuthForm from "@/components/auth/AuthForm";

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ redirect?: string; error?: string }>;
}

export default async function LoginPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { redirect, error } = await searchParams;

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
        .auth-error-banner {
          padding: 10px 14px;
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: 8px;
          color: var(--error, #f87171);
          font-size: 13px;
          margin-bottom: 20px;
          text-align: center;
        }
      `}</style>

      <div className="auth-card">
        <h1>Welcome Back</h1>
        <p className="subtitle">Sign in to your Property Launch Pad account</p>

        {error && (
          <div className="auth-error-banner">
            {error === "auth_callback_failed"
              ? "Authentication failed. Please try again."
              : "An error occurred. Please try again."}
          </div>
        )}

        <AuthForm mode="login" locale={locale} redirectTo={redirect} />
      </div>
    </div>
  );
}
