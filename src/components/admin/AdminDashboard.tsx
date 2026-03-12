"use client";

import { useState } from "react";
import { Users, Wrench, ChartBar as BarChart3, Settings } from "lucide-react";
import type { Locale } from "@/lib/types";
import UserManagement from "./UserManagement";
import ToolManagement from "./ToolManagement";
import AnalyticsDashboard from "./AnalyticsDashboard";

interface Props {
  locale: Locale;
}

type Tab = "users" | "tools" | "analytics";

export default function AdminDashboard({ locale }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("users");

  const t = locale === "es" ? es : en;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Settings className="w-8 h-8 text-slate-700" />
            <h1 className="text-4xl font-bold text-slate-900">{t.title}</h1>
          </div>
          <p className="text-slate-600">{t.subtitle}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-6">
          <div className="flex border-b border-slate-200">
            <button
              onClick={() => setActiveTab("users")}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition ${
                activeTab === "users"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Users className="w-5 h-5" />
              {t.users}
            </button>
            <button
              onClick={() => setActiveTab("tools")}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition ${
                activeTab === "tools"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Wrench className="w-5 h-5" />
              {t.tools}
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition ${
                activeTab === "analytics"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              {t.analytics}
            </button>
          </div>

          <div className="p-6">
            {activeTab === "users" && <UserManagement locale={locale} />}
            {activeTab === "tools" && <ToolManagement locale={locale} />}
            {activeTab === "analytics" && <AnalyticsDashboard locale={locale} />}
          </div>
        </div>
      </div>
    </div>
  );
}

const en = {
  title: "Admin Dashboard",
  subtitle: "Manage users, tools, and platform analytics",
  users: "Users",
  tools: "Tools",
  analytics: "Analytics",
};

const es = {
  title: "Panel de Administración",
  subtitle: "Gestiona usuarios, herramientas y analíticas",
  users: "Usuarios",
  tools: "Herramientas",
  analytics: "Analíticas",
};
