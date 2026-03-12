"use client";

import { useState } from "react";
import { FileText, Chrome as Home, Building, User } from "lucide-react";
import type { Locale } from "@/lib/types";

interface Props {
  locale: Locale;
}

export default function StampDutyCalculator({ locale }: Props) {
  const [purchasePrice, setPurchasePrice] = useState<string>("400000");
  const [isFirstHome, setIsFirstHome] = useState<boolean>(true);
  const [isAdditionalProperty, setIsAdditionalProperty] = useState<boolean>(false);

  const t = locale === "es" ? es : en;

  const price = parseFloat(purchasePrice) || 0;
  const stampDuty = calculateStampDuty(price, isFirstHome, isAdditionalProperty);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            {t.title}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
              <Home className="w-6 h-6 text-blue-600" />
              {t.inputs}
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {t.purchasePrice}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                    $
                  </span>
                  <input
                    type="number"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex items-start gap-3 p-4 border-2 border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition">
                  <input
                    type="checkbox"
                    checked={isFirstHome}
                    onChange={(e) => setIsFirstHome(e.target.checked)}
                    className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <div>
                    <div className="flex items-center gap-2 font-medium text-slate-800">
                      <User className="w-5 h-5 text-blue-600" />
                      {t.firstTimeBuyer}
                    </div>
                    <p className="text-sm text-slate-600 mt-1">
                      {t.firstTimeBuyerDesc}
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 border-2 border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition">
                  <input
                    type="checkbox"
                    checked={isAdditionalProperty}
                    onChange={(e) => setIsAdditionalProperty(e.target.checked)}
                    className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <div>
                    <div className="flex items-center gap-2 font-medium text-slate-800">
                      <Building className="w-5 h-5 text-blue-600" />
                      {t.additionalProperty}
                    </div>
                    <p className="text-sm text-slate-600 mt-1">
                      {t.additionalPropertyDesc}
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-8 text-white">
              <h3 className="text-xl font-semibold mb-4">{t.estimatedDuty}</h3>
              <div className="text-5xl font-bold mb-4">
                ${stampDuty.total.toLocaleString()}
              </div>
              <div className="flex justify-between text-blue-100 border-t border-blue-400 pt-4">
                <span>{t.effectiveRate}</span>
                <span className="font-semibold text-white">
                  {((stampDuty.total / price) * 100).toFixed(2)}%
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                {t.breakdown}
              </h3>
              <div className="space-y-3">
                {stampDuty.brackets.map((bracket, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-start text-sm"
                  >
                    <div className="flex-1">
                      <div className="text-slate-600">{bracket.label}</div>
                      <div className="text-xs text-slate-500">
                        {bracket.rate}% rate
                      </div>
                    </div>
                    <span className="font-medium text-slate-900">
                      ${bracket.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-sm text-amber-800">
                <strong>{t.note}:</strong> {t.noteText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function calculateStampDuty(
  price: number,
  isFirstHome: boolean,
  isAdditional: boolean
) {
  const brackets = [];
  let total = 0;

  if (isFirstHome && price <= 500000) {
    if (price <= 300000) {
      brackets.push({
        label: "First $300,000",
        rate: 0,
        amount: 0,
      });
      return { total: 0, brackets };
    }

    brackets.push({
      label: "First $300,000",
      rate: 0,
      amount: 0,
    });

    const over300k = price - 300000;
    const tax300to500 = over300k * 0.05;
    total += tax300to500;
    brackets.push({
      label: "$300,000 - $500,000",
      rate: 5,
      amount: tax300to500,
    });

    return { total, brackets };
  }

  const rates = isAdditional
    ? [
        { threshold: 125000, rate: 0.03 },
        { threshold: 250000, rate: 0.05 },
        { threshold: 925000, rate: 0.08 },
        { threshold: 1500000, rate: 0.13 },
        { threshold: Infinity, rate: 0.15 },
      ]
    : [
        { threshold: 125000, rate: 0 },
        { threshold: 250000, rate: 0.02 },
        { threshold: 925000, rate: 0.05 },
        { threshold: 1500000, rate: 0.1 },
        { threshold: Infinity, rate: 0.12 },
      ];

  let remaining = price;
  let prevThreshold = 0;

  for (const { threshold, rate } of rates) {
    if (remaining <= 0) break;

    const bandSize = Math.min(threshold - prevThreshold, remaining);
    const bandTax = bandSize * rate;
    total += bandTax;

    const maxThreshold =
      threshold === Infinity ? "+" : threshold.toLocaleString();
    brackets.push({
      label: `$${prevThreshold.toLocaleString()} - $${maxThreshold}`,
      rate: rate * 100,
      amount: bandTax,
    });

    remaining -= bandSize;
    prevThreshold = threshold;
  }

  return { total, brackets };
}

const en = {
  title: "Stamp Duty Calculator",
  subtitle: "Calculate UK stamp duty land tax on property purchases",
  inputs: "Purchase Details",
  purchasePrice: "Purchase Price",
  firstTimeBuyer: "First-Time Buyer",
  firstTimeBuyerDesc: "Relief available up to £500,000",
  additionalProperty: "Additional Property",
  additionalPropertyDesc: "Second home or buy-to-let (3% surcharge)",
  estimatedDuty: "Estimated Stamp Duty",
  effectiveRate: "Effective Rate",
  breakdown: "Tax Breakdown",
  note: "Note",
  noteText:
    "This is an estimate based on UK rates. Actual rates may vary by region and circumstances.",
};

const es = {
  title: "Calculadora de Impuesto de Timbre",
  subtitle: "Calcula el impuesto de transmisiones patrimoniales",
  inputs: "Detalles de Compra",
  purchasePrice: "Precio de Compra",
  firstTimeBuyer: "Primera Vivienda",
  firstTimeBuyerDesc: "Desgravación disponible hasta £500,000",
  additionalProperty: "Propiedad Adicional",
  additionalPropertyDesc: "Segunda vivienda o alquiler (recargo del 3%)",
  estimatedDuty: "Impuesto Estimado",
  effectiveRate: "Tasa Efectiva",
  breakdown: "Desglose del Impuesto",
  note: "Nota",
  noteText:
    "Esta es una estimación basada en las tasas del Reino Unido. Las tasas reales pueden variar.",
};
