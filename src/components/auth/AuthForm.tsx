"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Mail, Lock, User, Loader as Loader2, CircleAlert as AlertCircle } from "lucide-react";

interface AuthFormProps {
  mode: "login" | "signup";
  locale: string;
  redirectTo?: string;
}

export default function AuthForm({ mode, locale, redirectTo }: AuthFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const supabase = createClient();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    startTransition(async () => {
      try {
        if (mode === "signup") {
          const { error: signUpErr } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: fullName.trim(),
                language: locale,
              },
              emailRedirectTo: `${window.location.origin}/${locale}/auth/callback`,
            },
          });

          if (signUpErr) {
            setError(signUpErr.message);
            return;
          }

          setSuccess(
            "Check your email for a confirmation link. You can close this tab once confirmed."
          );
        } else {
          const { error: signInErr } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (signInErr) {
            setError(signInErr.message);
            return;
          }

          // Redirect to original destination or dashboard
          router.push(redirectTo || `/${locale}/dashboard`);
          router.refresh();
        }
      } catch (err) {
        setError("An unexpected error occurred. Please try again.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <style jsx>{`
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
        }
        .af-field {
          position: relative;
        }
        .af-field .af-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted, #4a5568);
          pointer-events: none;
        }
        .af-field input {
          width: 100%;
          padding: 12px 14px 12px 42px;
          background: var(--input-bg, #0f1320);
          border: 1px solid var(--border-subtle, #2a3042);
          border-radius: 10px;
          color: var(--text-primary, #e2e8f0);
          font-size: 14px;
          outline: none;
          transition: border-color 0.15s;
          box-sizing: border-box;
        }
        .af-field input:focus {
          border-color: var(--accent, #6366f1);
        }
        .af-field input::placeholder {
          color: var(--text-muted, #4a5568);
        }
        .af-submit {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          background: var(--accent, #6366f1);
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.15s;
          margin-top: 4px;
        }
        .af-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .af-submit:hover:not(:disabled) {
          opacity: 0.9;
        }
        .af-error {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          padding: 12px 14px;
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: 10px;
          color: var(--error, #f87171);
          font-size: 13px;
          line-height: 1.4;
        }
        .af-success {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          padding: 12px 14px;
          background: rgba(34, 197, 94, 0.08);
          border: 1px solid rgba(34, 197, 94, 0.2);
          border-radius: 10px;
          color: #4ade80;
          font-size: 13px;
          line-height: 1.4;
        }
        .af-switch {
          text-align: center;
          font-size: 13px;
          color: var(--text-secondary, #94a3b8);
          margin-top: 4px;
        }
        .af-switch a {
          color: var(--accent, #6366f1);
          text-decoration: none;
          font-weight: 600;
        }
        .af-switch a:hover {
          text-decoration: underline;
        }
      `}</style>

      {mode === "signup" && (
        <div className="af-field">
          <User size={16} className="af-icon" />
          <input
            type="text"
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            autoComplete="name"
          />
        </div>
      )}

      <div className="af-field">
        <Mail size={16} className="af-icon" />
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </div>

      <div className="af-field">
        <Lock size={16} className="af-icon" />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
        />
      </div>

      {error && (
        <div className="af-error">
          <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
          {error}
        </div>
      )}

      {success && <div className="af-success">{success}</div>}

      <button type="submit" className="af-submit" disabled={isPending}>
        {isPending && <Loader2 size={16} className="animate-spin" />}
        {mode === "signup" ? "Create Account" : "Sign In"}
      </button>

      <div className="af-switch">
        {mode === "login" ? (
          <>
            Don&apos;t have an account?{" "}
            <a href={`/${locale}/signup`}>Sign up</a>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <a href={`/${locale}/login`}>Sign in</a>
          </>
        )}
      </div>
    </form>
  );
}
