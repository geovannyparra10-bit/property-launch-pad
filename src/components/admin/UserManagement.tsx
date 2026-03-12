"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Search, Crown, Mail, Calendar, Shield } from "lucide-react";
import type { Locale } from "@/lib/types";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useToast } from "@/components/ui/Toast";

interface User {
  user_id: string;
  email: string;
  subscription_status: string;
  is_admin: boolean;
  onboarding_completed: boolean;
  created_at: string;
}

interface Props {
  locale: Locale;
}

export default function UserManagement({ locale }: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { showToast } = useToast();

  const t = locale === "es" ? es : en;

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("user_id, email, subscription_status, is_admin, onboarding_completed, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      showToast(t.errorLoading, "error");
      setLoading(false);
      return;
    }

    setUsers((data as User[]) || []);
    setLoading(false);
  }

  async function toggleAdmin(userId: string, currentStatus: boolean) {
    const supabase = createClient();
    const { error } = await supabase
      .from("profiles")
      .update({ is_admin: !currentStatus })
      .eq("user_id", userId);

    if (error) {
      showToast(t.errorUpdate, "error");
      return;
    }

    showToast(t.successUpdate, "success");
    loadUsers();
  }

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.user_id.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <LoadingSpinner size="lg" className="py-12" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{t.title}</h2>
          <p className="text-slate-600">
            {t.totalUsers}: {users.length}
          </p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-semibold text-slate-700">
                {t.email}
              </th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-slate-700">
                {t.status}
              </th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-slate-700">
                {t.joined}
              </th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-slate-700">
                {t.actions}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredUsers.map((user) => (
              <tr key={user.user_id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-900">{user.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {user.subscription_status === "premium" ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                        <Crown className="w-3 h-3" />
                        {t.premium}
                      </span>
                    ) : (
                      <span className="inline-flex px-2 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded">
                        {t.free}
                      </span>
                    )}
                    {user.is_admin && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                        <Shield className="w-3 h-3" />
                        {t.admin}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar className="w-4 h-4" />
                    {new Date(user.created_at).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleAdmin(user.user_id, user.is_admin)}
                    className={`px-3 py-1 text-xs font-medium rounded transition ${
                      user.is_admin
                        ? "bg-red-100 text-red-700 hover:bg-red-200"
                        : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                    }`}
                  >
                    {user.is_admin ? t.removeAdmin : t.makeAdmin}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12 text-slate-500">{t.noUsers}</div>
      )}
    </div>
  );
}

const en = {
  title: "User Management",
  totalUsers: "Total Users",
  searchPlaceholder: "Search by email or ID...",
  email: "Email",
  status: "Status",
  joined: "Joined",
  actions: "Actions",
  premium: "Premium",
  free: "Free",
  admin: "Admin",
  makeAdmin: "Make Admin",
  removeAdmin: "Remove Admin",
  noUsers: "No users found",
  errorLoading: "Failed to load users",
  errorUpdate: "Failed to update user",
  successUpdate: "User updated successfully",
};

const es = {
  title: "Gestión de Usuarios",
  totalUsers: "Total de Usuarios",
  searchPlaceholder: "Buscar por email o ID...",
  email: "Email",
  status: "Estado",
  joined: "Registrado",
  actions: "Acciones",
  premium: "Premium",
  free: "Gratis",
  admin: "Admin",
  makeAdmin: "Hacer Admin",
  removeAdmin: "Quitar Admin",
  noUsers: "No se encontraron usuarios",
  errorLoading: "Error al cargar usuarios",
  errorUpdate: "Error al actualizar usuario",
  successUpdate: "Usuario actualizado exitosamente",
};
