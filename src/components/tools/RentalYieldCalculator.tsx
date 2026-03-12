"use client";

import { useState } from "react";
import { TrendingUp, Chrome as Home, DollarSign, Percent } from "lucide-react";
import type { Locale } from "@/lib/types";

interface Props {
  locale: Locale;
}

export default function RentalYieldCalculator({ locale }: Props) {
  const [propertyValue, setPropertyValue] = useState<string>("300000");
  const [monthlyRent, setMonthlyRent] = useState<string>("1800");
  const [annualExpenses, setAnnualExpenses] = useState<string>("3000");

  const t = locale === "es" ? es : en;

  const propValue = parseFloat(propertyValue) || 0;
  const rent = parseFloat(monthlyRent) || 0;
  const expenses = parseFloat(annualExpenses) || 0;

  const annualRent = rent * 12;
  const netAnnualIncome = annualRent - expenses;
  const grossYield = propValue > 0 ? (annualRent / propValue) * 100 : 0;
  const netYield = propValue > 0 ? (netAnnualIncome / propValue) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
            <TrendingUp className="w-8 h-8 text-emerald-600" />
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
              <Home className="w-6 h-6 text-emerald-600" />
              {t.inputs}
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {t.propertyValue}
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="number"
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {t.monthlyRent}
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="number"
                    value={monthlyRent}
                    onChange={(e) => setMonthlyRent(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {t.annualExpenses}
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="number"
                    value={annualExpenses}
                    onChange={(e) => setAnnualExpenses(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">{t.expensesNote}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg p-8 text-white">
              <div className="flex items-center gap-2 mb-4">
                <Percent className="w-6 h-6" />
                <h3 className="text-xl font-semibold">{t.grossYield}</h3>
              </div>
              <div className="text-5xl font-bold mb-2">
                {grossYield.toFixed(2)}%
              </div>
              <p className="text-emerald-100">{t.grossYieldDesc}</p>
            </div>

            <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl shadow-lg p-8 text-white">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-6 h-6" />
                <h3 className="text-xl font-semibold">{t.netYield}</h3>
              </div>
              <div className="text-5xl font-bold mb-2">
                {netYield.toFixed(2)}%
              </div>
              <p className="text-slate-300">{t.netYieldDesc}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                {t.breakdown}
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">{t.annualRentIncome}</span>
                  <span className="font-medium text-slate-900">
                    ${annualRent.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">{t.annualExpenses}</span>
                  <span className="font-medium text-red-600">
                    -${expenses.toLocaleString()}
                  </span>
                </div>
                <div className="border-t border-slate-200 pt-3 flex justify-between">
                  <span className="font-semibold text-slate-800">
                    {t.netAnnualIncome}
                  </span>
                  <span className="font-bold text-emerald-600">
                    ${netAnnualIncome.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const en = {
  title: "Rental Yield Calculator",
  subtitle: "Calculate your property's gross and net rental yield",
  inputs: "Property Details",
  propertyValue: "Property Value",
  monthlyRent: "Monthly Rent",
  annualExpenses: "Annual Expenses",
  expensesNote: "Include property tax, insurance, maintenance, HOA fees",
  grossYield: "Gross Yield",
  grossYieldDesc: "Before expenses",
  netYield: "Net Yield",
  netYieldDesc: "After expenses",
  breakdown: "Annual Breakdown",
  annualRentIncome: "Annual Rent Income",
  netAnnualIncome: "Net Annual Income",
};

const es = {
  title: "Calculadora de Rendimiento de Alquiler",
  subtitle: "Calcula el rendimiento bruto y neto de tu propiedad",
  inputs: "Detalles de la Propiedad",
  propertyValue: "Valor de la Propiedad",
  monthlyRent: "Alquiler Mensual",
  annualExpenses: "Gastos Anuales",
  expensesNote: "Incluye impuestos, seguros, mantenimiento, HOA",
  grossYield: "Rendimiento Bruto",
  grossYieldDesc: "Antes de gastos",
  netYield: "Rendimiento Neto",
  netYieldDesc: "Después de gastos",
  breakdown: "Desglose Anual",
  annualRentIncome: "Ingresos por Alquiler",
  netAnnualIncome: "Ingresos Netos Anuales",
};
