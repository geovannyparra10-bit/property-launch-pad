"use client";

import { useState, useEffect, useCallback, useTransition } from "react";
import { Calculator, DollarSign, Info } from "lucide-react";
import ScenarioPanel from "@/components/tools/ScenarioPanel";
import { loadScenarios, type ScenarioDTO } from "@/actions/scenarios";
import type { Locale } from "@/lib/types";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface MortgageInputs {
  homePrice: number;
  downPayment: number;
  interestRate: number;
  termYears: number;
  propertyTaxRate: number;
  insuranceAnnual: number;
}

interface MortgageResults {
  monthlyPrincipalInterest: number;
  monthlyTax: number;
  monthlyInsurance: number;
  monthlyPITI: number;
  totalPaid: number;
  loanAmount: number;
  downPaymentClamped: number;
}

interface Props {
  locale: Locale;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const TOOL_SLUG = "mortgage_calculator"; // snake_case — matches DB tools.slug

const DEFAULTS: MortgageInputs = {
  homePrice: 350000,
  downPayment: 70000,
  interestRate: 6.5,
  termYears: 30,
  propertyTaxRate: 1.2,
  insuranceAnnual: 1800,
};

// ---------------------------------------------------------------------------
// Calculation
// ---------------------------------------------------------------------------
function calculate(inputs: MortgageInputs): MortgageResults {
  const { homePrice, downPayment, interestRate, termYears, propertyTaxRate, insuranceAnnual } = inputs;

  // Clamp down payment to [0, homePrice]
  const downPaymentClamped = Math.max(0, Math.min(downPayment, homePrice));
  const loanAmount = homePrice - downPaymentClamped;

  let monthlyPrincipalInterest = 0;
  if (loanAmount > 0 && interestRate > 0) {
    const r = interestRate / 100 / 12;
    const n = termYears * 12;
    monthlyPrincipalInterest = (loanAmount * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
  } else if (loanAmount > 0) {
    monthlyPrincipalInterest = loanAmount / (termYears * 12);
  }

  const monthlyTax = (homePrice * (propertyTaxRate / 100)) / 12;
  const monthlyInsurance = insuranceAnnual / 12;
  const monthlyPITI = monthlyPrincipalInterest + monthlyTax + monthlyInsurance;

  // totalPaid = all monthly payments over loan life + down payment
  const totalPaid = monthlyPITI * termYears * 12 + downPaymentClamped;

  return { monthlyPrincipalInterest, monthlyTax, monthlyInsurance, monthlyPITI, totalPaid, loanAmount, downPaymentClamped };
}

// ---------------------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------------------
const fmt = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const fmtFull = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 });

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function MortgageCalculator({ locale }: Props) {
  const [inputs, setInputs] = useState<MortgageInputs>(DEFAULTS);
  const [results, setResults] = useState<MortgageResults>(() => calculate(DEFAULTS));
  const [scenarios, setScenarios] = useState<ScenarioDTO[]>([]);
  const [, startTransition] = useTransition();

  // Load saved scenarios on mount (silent fail if not logged in)
  useEffect(() => {
    startTransition(async () => {
      try {
        setScenarios(await loadScenarios(TOOL_SLUG));
      } catch {
        /* not authenticated or tool missing — fine */
      }
    });
  }, []);

  // Recalculate whenever inputs change
  useEffect(() => {
    setResults(calculate(inputs));
  }, [inputs]);

  const update = useCallback(<K extends keyof MortgageInputs>(key: K, val: MortgageInputs[K]) => {
    setInputs((prev) => ({ ...prev, [key]: val }));
  }, []);

  const handleLoadScenario = useCallback((saved: Record<string, unknown>) => {
    setInputs({
      homePrice: Number(saved.homePrice ?? DEFAULTS.homePrice),
      downPayment: Number(saved.downPayment ?? DEFAULTS.downPayment),
      interestRate: Number(saved.interestRate ?? DEFAULTS.interestRate),
      termYears: Number(saved.termYears ?? DEFAULTS.termYears),
      propertyTaxRate: Number(saved.propertyTaxRate ?? DEFAULTS.propertyTaxRate),
      insuranceAnnual: Number(saved.insuranceAnnual ?? DEFAULTS.insuranceAnnual),
    });
  }, []);

  const downPct =
    inputs.homePrice > 0
      ? ((Math.min(inputs.downPayment, inputs.homePrice) / inputs.homePrice) * 100).toFixed(1)
      : "0.0";

  // Build outputs snapshot for scenario saving
  const outputsSnapshot: Record<string, unknown> = results
    ? {
        monthlyPITI: results.monthlyPITI,
        totalPaid: results.totalPaid,
        loanAmount: results.loanAmount,
      }
    : {};

  return (
    <div className="mc-root">
      <style jsx>{`
        .mc-root {
          display: flex;
          flex-direction: column;
          gap: 24px;
          max-width: 840px;
          margin: 0 auto;
        }
        .mc-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        @media (max-width: 700px) {
          .mc-grid { grid-template-columns: 1fr; }
        }
        .mc-panel {
          background: var(--surface-elevated, #1a1f2e);
          border: 1px solid var(--border-subtle, #2a3042);
          border-radius: 14px;
          padding: 24px;
        }
        .mc-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary, #e2e8f0);
          margin: 0 0 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .mc-field { margin-bottom: 18px; }
        .mc-field:last-child { margin-bottom: 0; }
        .mc-label {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary, #94a3b8);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }
        .mc-hint {
          font-weight: 400;
          text-transform: none;
          letter-spacing: 0;
          color: var(--text-muted, #4a5568);
        }
        .mc-input-wrap {
          position: relative;
        }
        .mc-input-wrap .pfx,
        .mc-input-wrap .sfx {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted, #4a5568);
          font-size: 13px;
          pointer-events: none;
        }
        .mc-input-wrap .pfx { left: 12px; }
        .mc-input-wrap .sfx { right: 12px; }
        .mc-input-wrap input {
          width: 100%;
          padding: 10px 12px;
          background: var(--input-bg, #0f1320);
          border: 1px solid var(--border-subtle, #2a3042);
          border-radius: 8px;
          color: var(--text-primary, #e2e8f0);
          font-size: 15px;
          font-weight: 500;
          outline: none;
          transition: border-color 0.15s;
          box-sizing: border-box;
        }
        .mc-input-wrap input:focus {
          border-color: var(--accent, #6366f1);
        }
        .mc-input-wrap.has-pfx input { padding-left: 28px; }
        .mc-input-wrap.has-sfx input { padding-right: 36px; }
        .mc-terms {
          display: flex;
          gap: 8px;
        }
        .mc-term-btn {
          flex: 1;
          padding: 10px;
          border: 1px solid var(--border-subtle, #2a3042);
          border-radius: 8px;
          background: var(--input-bg, #0f1320);
          color: var(--text-secondary, #94a3b8);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s;
        }
        .mc-term-btn:hover { border-color: var(--border-hover, #3a4562); }
        .mc-term-btn.active {
          background: var(--accent, #6366f1);
          border-color: var(--accent, #6366f1);
          color: #fff;
        }
        .mc-result-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid rgba(42, 48, 66, 0.5);
        }
        .mc-result-row:last-child { border-bottom: none; }
        .mc-rl { font-size: 13px; color: var(--text-secondary, #94a3b8); }
        .mc-rv { font-size: 15px; font-weight: 700; color: var(--text-primary, #e2e8f0); font-variant-numeric: tabular-nums; }
        .mc-highlight {
          margin-top: 8px;
          padding: 18px;
          background: linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.08));
          border: 1px solid rgba(99,102,241,0.2);
          border-radius: 10px;
          text-align: center;
        }
        .mc-highlight .hl-label {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-secondary, #94a3b8);
          margin-bottom: 6px;
        }
        .mc-highlight .hl-amount {
          font-size: 28px;
          font-weight: 800;
          color: var(--accent-light, #818cf8);
          font-variant-numeric: tabular-nums;
        }
        .mc-highlight .hl-sub {
          font-size: 12px;
          color: var(--text-muted, #4a5568);
          margin-top: 4px;
        }
        .mc-total {
          background: rgba(15,19,32,0.5);
          border-radius: 8px;
          padding: 14px 16px;
          margin-top: 12px;
        }
        .mc-total .mc-rl { font-weight: 600; color: var(--text-primary, #e2e8f0); }
        .mc-total .mc-rv { font-size: 16px; color: var(--accent-light, #818cf8); }
      `}</style>

      {/* Scenario Save / Load */}
      <ScenarioPanel
        toolSlug={TOOL_SLUG}
        locale={locale}
        currentInputs={inputs as unknown as Record<string, unknown>}
        currentOutputs={outputsSnapshot}
        onLoadScenario={handleLoadScenario}
        scenarios={scenarios}
        onScenariosChange={setScenarios}
      />

      <div className="mc-grid">
        {/* ─── Inputs Panel ─── */}
        <div className="mc-panel">
          <h3 className="mc-title"><Calculator size={18} /> Loan Details</h3>

          <div className="mc-field">
            <label className="mc-label">Home Price</label>
            <div className="mc-input-wrap has-pfx">
              <span className="pfx">$</span>
              <input type="number" min={0} step={1000} value={inputs.homePrice || ""}
                onChange={(e) => update("homePrice", Math.max(0, Number(e.target.value)))} />
            </div>
          </div>

          <div className="mc-field">
            <label className="mc-label">
              Down Payment <span className="mc-hint">{downPct}%</span>
            </label>
            <div className="mc-input-wrap has-pfx">
              <span className="pfx">$</span>
              <input type="number" min={0} step={1000} value={inputs.downPayment}
                onChange={(e) => update("downPayment", Math.max(0, Number(e.target.value)))} />
            </div>
          </div>

          <div className="mc-field">
            <label className="mc-label">Interest Rate</label>
            <div className="mc-input-wrap has-sfx">
              <input type="number" min={0} max={30} step={0.125} value={inputs.interestRate || ""}
                onChange={(e) => update("interestRate", Math.max(0, Number(e.target.value)))} />
              <span className="sfx">%</span>
            </div>
          </div>

          <div className="mc-field">
            <label className="mc-label">Loan Term</label>
            <div className="mc-terms">
              {[15, 20, 25, 30].map((yr) => (
                <button key={yr} className={`mc-term-btn ${inputs.termYears === yr ? "active" : ""}`}
                  onClick={() => update("termYears", yr)}>
                  {yr}yr
                </button>
              ))}
            </div>
          </div>

          <div className="mc-field">
            <label className="mc-label">Property Tax Rate</label>
            <div className="mc-input-wrap has-sfx">
              <input type="number" min={0} max={10} step={0.1} value={inputs.propertyTaxRate || ""}
                onChange={(e) => update("propertyTaxRate", Math.max(0, Number(e.target.value)))} />
              <span className="sfx">%</span>
            </div>
          </div>

          <div className="mc-field">
            <label className="mc-label">Annual Insurance</label>
            <div className="mc-input-wrap has-pfx">
              <span className="pfx">$</span>
              <input type="number" min={0} step={100} value={inputs.insuranceAnnual || ""}
                onChange={(e) => update("insuranceAnnual", Math.max(0, Number(e.target.value)))} />
            </div>
          </div>
        </div>

        {/* ─── Results Panel ─── */}
        <div className="mc-panel">
          <h3 className="mc-title"><DollarSign size={18} /> Monthly Payment</h3>

          <div className="mc-highlight">
            <div className="hl-label">Monthly PITI Payment</div>
            <div className="hl-amount">{fmtFull(results.monthlyPITI)}</div>
            <div className="hl-sub">Principal + Interest + Tax + Insurance</div>
          </div>

          <div style={{ marginTop: 20 }}>
            <div className="mc-result-row">
              <span className="mc-rl">Principal &amp; Interest</span>
              <span className="mc-rv">{fmtFull(results.monthlyPrincipalInterest)}</span>
            </div>
            <div className="mc-result-row">
              <span className="mc-rl">Property Tax</span>
              <span className="mc-rv">{fmtFull(results.monthlyTax)}</span>
            </div>
            <div className="mc-result-row">
              <span className="mc-rl">Insurance</span>
              <span className="mc-rv">{fmtFull(results.monthlyInsurance)}</span>
            </div>
            <div className="mc-result-row">
              <span className="mc-rl">Loan Amount</span>
              <span className="mc-rv">{fmt(results.loanAmount)}</span>
            </div>
            <div className="mc-result-row">
              <span className="mc-rl">Down Payment</span>
              <span className="mc-rv">
                {fmt(results.downPaymentClamped)}
                {results.downPaymentClamped !== inputs.downPayment && (
                  <span title="Clamped to home price" style={{ marginLeft: 6 }}><Info size={12} /></span>
                )}
              </span>
            </div>
          </div>

          <div className="mc-total">
            <div className="mc-result-row" style={{ borderBottom: "none" }}>
              <span className="mc-rl">Total Paid Over Loan Life</span>
              <span className="mc-rv">{fmt(results.totalPaid)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
