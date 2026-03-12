import Link from "next/link";
import { Check } from "lucide-react";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function PricingPage({ params }: Props) {
  const { locale } = await params;

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Get started with essential tools",
      cta: "Sign Up Free",
      href: `/${locale}/signup`,
      highlighted: false,
      features: [
        "Mortgage calculator",
        "1 saved scenario per tool",
        "English & Spanish",
        "Basic support",
      ],
    },
    {
      name: "Premium",
      price: "$9",
      period: "/month",
      description: "Unlock all tools and unlimited scenarios",
      cta: "Upgrade to Premium",
      href: `/${locale}/signup`,
      highlighted: true,
      features: [
        "All calculators & analyzers",
        "Unlimited saved scenarios",
        "Deal analyzer with projections",
        "Rental yield calculator",
        "Priority support",
        "Early access to new tools",
      ],
    },
  ];

  return (
    <div className="pricing-page">
      <style>{`
        .pricing-page { max-width: 820px; margin: 0 auto; padding: 64px 24px 100px; }
        .pricing-header { text-align: center; margin-bottom: 48px; }
        .pricing-header h1 {
          font-size: 36px; font-weight: 800; color: var(--text-primary, #e2e8f0);
          margin: 0 0 12px; letter-spacing: -0.5px;
        }
        .pricing-header p { font-size: 16px; color: var(--text-secondary, #94a3b8); margin: 0; }
        .pricing-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        @media (max-width: 600px) { .pricing-grid { grid-template-columns: 1fr; } }
        .plan-card {
          display: flex; flex-direction: column; padding: 32px;
          background: var(--surface-elevated, #1a1f2e); border: 1px solid var(--border-subtle, #2a3042);
          border-radius: 16px; position: relative;
        }
        .plan-card.highlighted {
          border-color: var(--accent, #6366f1);
          box-shadow: 0 0 0 1px var(--accent, #6366f1), 0 12px 40px rgba(99,102,241,0.15);
        }
        .plan-popular {
          position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
          font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
          background: var(--accent, #6366f1); color: #fff; padding: 4px 14px; border-radius: 20px;
        }
        .plan-name { font-size: 18px; font-weight: 700; color: var(--text-primary, #e2e8f0); margin: 0 0 4px; }
        .plan-desc { font-size: 13px; color: var(--text-secondary, #94a3b8); margin: 0 0 20px; }
        .plan-price { display: flex; align-items: baseline; gap: 4px; margin-bottom: 24px; }
        .plan-price .amount { font-size: 40px; font-weight: 900; color: var(--text-primary, #e2e8f0); }
        .plan-price .period { font-size: 14px; color: var(--text-muted, #4a5568); }
        .plan-features { display: flex; flex-direction: column; gap: 10px; margin-bottom: 28px; flex: 1; }
        .plan-feature {
          display: flex; align-items: center; gap: 10px;
          font-size: 13px; color: var(--text-secondary, #94a3b8);
        }
        .plan-feature svg { color: #4ade80; flex-shrink: 0; }
        .plan-cta {
          display: block; text-align: center; padding: 14px; border-radius: 10px;
          font-size: 15px; font-weight: 700; text-decoration: none; transition: opacity 0.15s;
        }
        .plan-cta:hover { opacity: 0.9; }
        .plan-cta-primary { background: var(--accent, #6366f1); color: #fff; }
        .plan-cta-secondary {
          background: transparent; color: var(--text-primary, #e2e8f0);
          border: 1px solid var(--border-subtle, #2a3042);
        }
      `}</style>

      <div className="pricing-header">
        <h1>Simple Pricing</h1>
        <p>Start free. Upgrade when you need more power.</p>
      </div>

      <div className="pricing-grid">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`plan-card ${plan.highlighted ? "highlighted" : ""}`}
          >
            {plan.highlighted && (
              <span className="plan-popular">Most Popular</span>
            )}
            <h2 className="plan-name">{plan.name}</h2>
            <p className="plan-desc">{plan.description}</p>
            <div className="plan-price">
              <span className="amount">{plan.price}</span>
              <span className="period">{plan.period}</span>
            </div>
            <div className="plan-features">
              {plan.features.map((f) => (
                <div key={f} className="plan-feature">
                  <Check size={16} />
                  {f}
                </div>
              ))}
            </div>
            <Link
              href={plan.href}
              className={`plan-cta ${plan.highlighted ? "plan-cta-primary" : "plan-cta-secondary"}`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
