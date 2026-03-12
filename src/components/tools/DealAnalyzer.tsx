"use client";

import { useState } from "react";
import { TrendingUp, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, DollarSign } from "lucide-react";
import type { Locale } from "@/lib/types";

interface Props {
  locale: Locale;
}

export default function DealAnalyzer({ locale }: Props) {
  const [purchasePrice, setPurchasePrice] = useState<string>("350000");
  const [rehabCost, setRehabCost] = useState<string>("30000");
  const [afterRepairValue, setAfterRepairValue] = useState<string>("450000");
  const [monthlyRent, setMonthlyRent] = useState<string>("2000");
  const [downPaymentPercent, setDownPaymentPercent] = useState<string>("20");
  const [interestRate, setInterestRate] = useState<string>("6.5");
  const [loanTerm, setLoanTerm] = useState<string>("30");
  const [monthlyExpenses, setMonthlyExpenses] = useState<string>("500");

  const t = locale === "es" ? es : en;

  const price = parseFloat(purchasePrice) || 0;
  const rehab = parseFloat(rehabCost) || 0;
  const arv = parseFloat(afterRepairValue) || 0;
  const rent = parseFloat(monthlyRent) || 0;
  const downPct = parseFloat(downPaymentPercent) || 0;
  const rate = parseFloat(interestRate) || 0;
  const term = parseFloat(loanTerm) || 0;
  const expenses = parseFloat(monthlyExpenses) || 0;

  const totalInvestment = price + rehab;
  const downPayment = (price * downPct) / 100;
  const loanAmount = price - downPayment;
  const totalCashNeeded = downPayment + rehab;

  const monthlyRate = rate / 100 / 12;
  const numPayments = term * 12;
  const monthlyPayment =
    loanAmount && monthlyRate
      ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
        (Math.pow(1 + monthlyRate, numPayments) - 1)
      : 0;

  const monthlyCashFlow = rent - monthlyPayment - expenses;
  const annualCashFlow = monthlyCashFlow * 12;
  const cashOnCashReturn =
    totalCashNeeded > 0 ? (annualCashFlow / totalCashNeeded) * 100 : 0;

  const equity = arv - price;
  const roi = totalInvestment > 0 ? (equity / totalInvestment) * 100 : 0;

  const seventyPercentRule = arv * 0.7;
  const maxPurchasePrice = seventyPercentRule - rehab;
  const meetsSeventy = price <= maxPurchasePrice;

  const onePercentRule = (rent / price) * 100;
  const meetsOne = onePercentRule >= 1;

  const dealScore = calculateDealScore(
    cashOnCashReturn,
    roi,
    meetsSeventy,
    meetsOne,
    monthlyCashFlow
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-violet-100 rounded-full mb-4">
            <TrendingUp className="w-8 h-8 text-violet-600" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">{t.title}</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">
                {t.propertyDetails}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t.purchasePrice}
                  </label>
                  <input
                    type="number"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t.rehabCost}
                  </label>
                  <input
                    type="number"
                    value={rehabCost}
                    onChange={(e) => setRehabCost(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t.afterRepairValue}
                  </label>
                  <input
                    type="number"
                    value={afterRepairValue}
                    onChange={(e) => setAfterRepairValue(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t.monthlyRent}
                  </label>
                  <input
                    type="number"
                    value={monthlyRent}
                    onChange={(e) => setMonthlyRent(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">
                {t.financing}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t.downPayment}
                  </label>
                  <input
                    type="number"
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t.interestRate}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t.loanTerm}
                  </label>
                  <input
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t.monthlyExpenses}
                  </label>
                  <input
                    type="number"
                    value={monthlyExpenses}
                    onChange={(e) => setMonthlyExpenses(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div
              className={`rounded-2xl shadow-lg p-8 text-white ${
                dealScore >= 70
                  ? "bg-gradient-to-br from-emerald-500 to-emerald-600"
                  : dealScore >= 50
                  ? "bg-gradient-to-br from-amber-500 to-amber-600"
                  : "bg-gradient-to-br from-red-500 to-red-600"
              }`}
            >
              <h3 className="text-lg font-semibold mb-2">{t.dealScore}</h3>
              <div className="text-6xl font-bold mb-4">{dealScore}</div>
              <div className="flex items-center gap-2">
                {dealScore >= 70 ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>{t.goodDeal}</span>
                  </>
                ) : dealScore >= 50 ? (
                  <>
                    <AlertTriangle className="w-5 h-5" />
                    <span>{t.okayDeal}</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-5 h-5" />
                    <span>{t.poorDeal}</span>
                  </>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                {t.keyMetrics}
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">{t.cashOnCashReturn}</span>
                    <span className="font-semibold text-slate-900">
                      {cashOnCashReturn.toFixed(1)}%
                    </span>
                  </div>
                  <div className="text-xs text-slate-500">
                    {cashOnCashReturn >= 8 ? t.excellent : t.belowTarget}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">{t.roi}</span>
                    <span className="font-semibold text-slate-900">
                      {roi.toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">{t.monthlyCashFlow}</span>
                    <span
                      className={`font-semibold ${
                        monthlyCashFlow >= 0
                          ? "text-emerald-600"
                          : "text-red-600"
                      }`}
                    >
                      ${monthlyCashFlow.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">{t.totalCashNeeded}</span>
                    <span className="font-semibold text-slate-900">
                      ${totalCashNeeded.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                {t.investmentRules}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  {meetsSeventy ? (
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  )}
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-800">
                      {t.seventyPercentRule}
                    </div>
                    <div className="text-xs text-slate-500">
                      {t.maxPrice}: ${maxPurchasePrice.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {meetsOne ? (
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  )}
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-800">
                      {t.onePercentRule}
                    </div>
                    <div className="text-xs text-slate-500">
                      {t.currentRatio}: {onePercentRule.toFixed(2)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function calculateDealScore(
  coc: number,
  roi: number,
  meets70: boolean,
  meets1: boolean,
  cashFlow: number
): number {
  let score = 0;

  if (coc >= 12) score += 30;
  else if (coc >= 8) score += 20;
  else if (coc >= 5) score += 10;

  if (roi >= 25) score += 20;
  else if (roi >= 15) score += 15;
  else if (roi >= 10) score += 10;

  if (meets70) score += 15;
  if (meets1) score += 15;

  if (cashFlow >= 300) score += 20;
  else if (cashFlow >= 200) score += 15;
  else if (cashFlow >= 100) score += 10;
  else if (cashFlow >= 0) score += 5;

  return Math.min(100, score);
}

const en = {
  title: "Investment Deal Analyzer",
  subtitle: "Comprehensive analysis for real estate investment properties",
  propertyDetails: "Property Details",
  financing: "Financing",
  purchasePrice: "Purchase Price",
  rehabCost: "Rehab Cost",
  afterRepairValue: "After Repair Value (ARV)",
  monthlyRent: "Monthly Rent",
  downPayment: "Down Payment (%)",
  interestRate: "Interest Rate (%)",
  loanTerm: "Loan Term (years)",
  monthlyExpenses: "Monthly Expenses",
  dealScore: "Deal Score",
  goodDeal: "Strong Investment",
  okayDeal: "Marginal Deal",
  poorDeal: "Weak Investment",
  keyMetrics: "Key Metrics",
  cashOnCashReturn: "Cash-on-Cash Return",
  roi: "Return on Investment",
  monthlyCashFlow: "Monthly Cash Flow",
  totalCashNeeded: "Total Cash Needed",
  excellent: "Excellent",
  belowTarget: "Below target",
  investmentRules: "Investment Rules",
  seventyPercentRule: "70% Rule",
  onePercentRule: "1% Rule",
  maxPrice: "Max price",
  currentRatio: "Current ratio",
};

const es = {
  title: "Analizador de Inversiones",
  subtitle: "Análisis completo para propiedades de inversión inmobiliaria",
  propertyDetails: "Detalles de la Propiedad",
  financing: "Financiamiento",
  purchasePrice: "Precio de Compra",
  rehabCost: "Costo de Renovación",
  afterRepairValue: "Valor Después de Reparar",
  monthlyRent: "Alquiler Mensual",
  downPayment: "Enganche (%)",
  interestRate: "Tasa de Interés (%)",
  loanTerm: "Plazo del Préstamo (años)",
  monthlyExpenses: "Gastos Mensuales",
  dealScore: "Puntuación",
  goodDeal: "Inversión Sólida",
  okayDeal: "Inversión Marginal",
  poorDeal: "Inversión Débil",
  keyMetrics: "Métricas Clave",
  cashOnCashReturn: "Retorno sobre Efectivo",
  roi: "Retorno de Inversión",
  monthlyCashFlow: "Flujo de Caja Mensual",
  totalCashNeeded: "Efectivo Total Necesario",
  excellent: "Excelente",
  belowTarget: "Por debajo del objetivo",
  investmentRules: "Reglas de Inversión",
  seventyPercentRule: "Regla del 70%",
  onePercentRule: "Regla del 1%",
  maxPrice: "Precio máx",
  currentRatio: "Ratio actual",
};
