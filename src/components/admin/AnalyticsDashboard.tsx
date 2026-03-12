"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Users, Crown, Calculator, TrendingUp } from "lucide-react";
import type { Locale } from "@/lib/types";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface Stats {
  totalUsers: number;
  premiumUsers: number;
  freeUsers: number;
  totalScenarios: number;
  activeTools: number;
}

interface Props {
  locale: Locale;
}

export default function AnalyticsDashboard({ locale }: Props) {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    premiumUsers: 0,
    freeUsers: 0,
    totalScenarios: 0,
    activeTools: 0,
  });
  const [loading, setLoading] = useState(true);

  const t = locale === "es" ? es : en;

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    const supabase = createClient();

    const [usersRes, scenariosRes, toolsRes] = await Promise.all([
      supabase.from("profiles").select("subscription_status"),
      supabase.from("scenarios").select("id", { count: "exact", head: true }),
      supabase.from("tools").select("id", { count: "exact", head: true }).eq("is_active", true),
    ]);

    const users = usersRes.data || [];
    const totalUsers = users.length;
    const premiumUsers = users.filter(
      (u) => u.subscription_status === "premium"
    ).length;
    const freeUsers = totalUsers - premiumUsers;

    setStats({
      totalUsers,
      premiumUsers,
      freeUsers,
      totalScenarios: scenariosRes.count || 0,
      activeTools: toolsRes.count || 0,
    });

    setLoading(false);
  }

  if (loading) {
    return <LoadingSpinner size="lg" className="py-12" />;
  }

  const conversionRate = stats.totalUsers > 0
    ? ((stats.premiumUsers / stats.totalUsers) * 100).toFixed(1)
    : "0.0";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">{t.title}</h2>
        <p className="text-slate-600">{t.subtitle}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 opacity-80" />
            <span className="text-3xl font-bold">{stats.totalUsers}</span>
          </div>
          <h3 className="font-semibold">{t.totalUsers}</h3>
          <p className="text-sm text-blue-100">{t.allRegistered}</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Crown className="w-8 h-8 opacity-80" />
            <span className="text-3xl font-bold">{stats.premiumUsers}</span>
          </div>
          <h3 className="font-semibold">{t.premiumUsers}</h3>
          <p className="text-sm text-yellow-100">
            {conversionRate}% {t.conversion}
          </p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Calculator className="w-8 h-8 opacity-80" />
            <span className="text-3xl font-bold">{stats.totalScenarios}</span>
          </div>
          <h3 className="font-semibold">{t.totalScenarios}</h3>
          <p className="text-sm text-emerald-100">{t.savedByUsers}</p>
        </div>

        <div className="bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 opacity-80" />
            <span className="text-3xl font-bold">{stats.activeTools}</span>
          </div>
          <h3 className="font-semibold">{t.activeTools}</h3>
          <p className="text-sm text-violet-100">{t.availableNow}</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          {t.userBreakdown}
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-600">{t.freeUsers}</span>
            <span className="font-semibold text-slate-900">{stats.freeUsers}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600">{t.premiumUsers}</span>
            <span className="font-semibold text-yellow-600">
              {stats.premiumUsers}
            </span>
          </div>
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
            <span className="font-semibold text-slate-800">{t.total}</span>
            <span className="font-bold text-slate-900">{stats.totalUsers}</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>{t.note}:</strong> {t.noteText}
        </p>
      </div>
    </div>
  );
}

const en = {
  title: "Platform Analytics",
  subtitle: "Overview of platform usage and performance",
  totalUsers: "Total Users",
  premiumUsers: "Premium Users",
  freeUsers: "Free Users",
  totalScenarios: "Total Scenarios",
  activeTools: "Active Tools",
  allRegistered: "All registered users",
  conversion: "conversion",
  savedByUsers: "Saved by users",
  availableNow: "Available now",
  userBreakdown: "User Breakdown",
  total: "Total",
  note: "Note",
  noteText:
    "Analytics update in real-time. Conversion rate is calculated as premium users divided by total users.",
};

const es = {
  title: "Analíticas de la Plataforma",
  subtitle: "Resumen de uso y rendimiento de la plataforma",
  totalUsers: "Total de Usuarios",
  premiumUsers: "Usuarios Premium",
  freeUsers: "Usuarios Gratis",
  totalScenarios: "Total de Escenarios",
  activeTools: "Herramientas Activas",
  allRegistered: "Todos los usuarios registrados",
  conversion: "conversión",
  savedByUsers: "Guardados por usuarios",
  availableNow: "Disponibles ahora",
  userBreakdown: "Desglose de Usuarios",
  total: "Total",
  note: "Nota",
  noteText:
    "Las analíticas se actualizan en tiempo real. La tasa de conversión se calcula como usuarios premium dividido por usuarios totales.",
};
