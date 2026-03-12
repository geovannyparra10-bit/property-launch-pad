import Link from "next/link";
import { ArrowRight, Calculator, Shield, Globe } from "lucide-react";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  return (
    <div className="landing">
      <style>{`
        .landing { max-width: 800px; margin: 0 auto; padding: 80px 24px 100px; text-align: center; }
        .landing-badge {
          display: inline-block; font-size: 12px; font-weight: 600; text-transform: uppercase;
          letter-spacing: 1px; color: var(--accent, #6366f1); background: rgba(99,102,241,0.1);
          padding: 6px 14px; border-radius: 20px; margin-bottom: 24px;
          animation: fade-in 0.5s ease-out;
        }
        .landing h1 {
          font-size: 48px; font-weight: 900; color: var(--text-primary, #e2e8f0);
          line-height: 1.1; margin: 0 0 20px; letter-spacing: -1px;
          animation: slide-up 0.6s ease-out 0.1s both;
        }
        .landing h1 em {
          font-style: normal; color: var(--accent, #6366f1);
        }
        .landing .sub {
          font-size: 18px; color: var(--text-secondary, #94a3b8); line-height: 1.6;
          max-width: 560px; margin: 0 auto 40px;
          animation: slide-up 0.6s ease-out 0.2s both;
        }
        .landing-ctas { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-bottom: 72px; animation: slide-up 0.6s ease-out 0.3s both; }
        .cta-primary {
          display: inline-flex; align-items: center; gap: 8px; padding: 14px 32px;
          background: var(--accent, #6366f1); color: #fff; border-radius: 12px;
          font-size: 16px; font-weight: 700; text-decoration: none; transition: all 0.2s ease;
        }
        .cta-primary:hover { opacity: 0.9; transform: translateY(-2px); }
        .cta-secondary {
          display: inline-flex; align-items: center; gap: 8px; padding: 14px 32px;
          background: var(--surface-elevated, #1a1f2e); color: var(--text-primary, #e2e8f0);
          border: 1px solid var(--border-subtle, #2a3042); border-radius: 12px;
          font-size: 16px; font-weight: 700; text-decoration: none; transition: all 0.2s ease;
        }
        .cta-secondary:hover { border-color: var(--border-hover, #3a4562); transform: translateY(-2px); }
        .features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; text-align: left; animation: fade-in 0.8s ease-out 0.4s both; }
        @media (max-width: 640px) { .features { grid-template-columns: 1fr; } }
        .feature-card {
          padding: 28px; background: var(--surface-elevated, #1a1f2e);
          border: 1px solid var(--border-subtle, #2a3042); border-radius: 14px;
          transition: all 0.2s ease;
        }
        .feature-card:hover {
          transform: translateY(-4px);
          border-color: var(--border-hover, #3a4562);
          box-shadow: 0 12px 24px -10px rgba(0, 0, 0, 0.3);
        }
        .feature-icon {
          width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;
          border-radius: 10px; background: rgba(99,102,241,0.12); color: var(--accent, #6366f1);
          margin-bottom: 16px;
        }
        .feature-card h3 { font-size: 15px; font-weight: 700; color: var(--text-primary, #e2e8f0); margin: 0 0 8px; }
        .feature-card p { font-size: 13px; color: var(--text-secondary, #94a3b8); line-height: 1.5; margin: 0; }
      `}</style>

      <div className="landing-badge">Property Investment Platform</div>
      <h1>Make smarter <em>property</em> decisions</h1>
      <p className="sub">
        Professional calculators and analysis tools that help you evaluate
        deals, compare scenarios, and invest with confidence.
      </p>

      <div className="landing-ctas">
        <Link href={`/${locale}/signup`} className="cta-primary">
          Get Started Free <ArrowRight size={18} />
        </Link>
        <Link href={`/${locale}/tools`} className="cta-secondary">
          Browse Tools
        </Link>
      </div>

      <div className="features">
        <div className="feature-card">
          <div className="feature-icon"><Calculator size={20} /></div>
          <h3>Professional Calculators</h3>
          <p>Mortgage, rental yield, stamp duty, and deal analysis — all in one place.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon"><Shield size={20} /></div>
          <h3>Save & Compare</h3>
          <p>Save scenarios, pin your favorites, and compare side-by-side to find the best deal.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon"><Globe size={20} /></div>
          <h3>English & Spanish</h3>
          <p>Full bilingual support so you can work in the language you're most comfortable with.</p>
        </div>
      </div>
    </div>
  );
}
