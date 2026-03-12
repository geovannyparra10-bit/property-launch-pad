"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff, CreditCard as Edit, Save, X } from "lucide-react";
import type { Locale } from "@/lib/types";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useToast } from "@/components/ui/Toast";

interface Tool {
  id: string;
  slug: string;
  title_en: string;
  title_es: string;
  description_en: string;
  description_es: string;
  access_level: string;
  sort_order: number;
  is_active: boolean;
}

interface Props {
  locale: Locale;
}

export default function ToolManagement({ locale }: Props) {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Tool>>({});
  const { showToast } = useToast();

  const t = locale === "es" ? es : en;

  useEffect(() => {
    loadTools();
  }, []);

  async function loadTools() {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("tools")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      showToast(t.errorLoading, "error");
      setLoading(false);
      return;
    }

    setTools((data as Tool[]) || []);
    setLoading(false);
  }

  async function toggleActive(id: string, currentStatus: boolean) {
    const supabase = createClient();
    const { error } = await supabase
      .from("tools")
      .update({ is_active: !currentStatus })
      .eq("id", id);

    if (error) {
      showToast(t.errorUpdate, "error");
      return;
    }

    showToast(t.successUpdate, "success");
    loadTools();
  }

  function startEdit(tool: Tool) {
    setEditingId(tool.id);
    setEditForm(tool);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm({});
  }

  async function saveEdit() {
    if (!editingId) return;

    const supabase = createClient();
    const { error } = await supabase
      .from("tools")
      .update({
        title_en: editForm.title_en,
        title_es: editForm.title_es,
        description_en: editForm.description_en,
        description_es: editForm.description_es,
        access_level: editForm.access_level,
        sort_order: editForm.sort_order,
      })
      .eq("id", editingId);

    if (error) {
      showToast(t.errorUpdate, "error");
      return;
    }

    showToast(t.successUpdate, "success");
    setEditingId(null);
    setEditForm({});
    loadTools();
  }

  if (loading) {
    return <LoadingSpinner size="lg" className="py-12" />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">{t.title}</h2>
        <p className="text-slate-600">
          {t.totalTools}: {tools.length}
        </p>
      </div>

      <div className="space-y-4">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className="bg-white border border-slate-200 rounded-lg p-6"
          >
            {editingId === tool.id ? (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      {t.titleEn}
                    </label>
                    <input
                      type="text"
                      value={editForm.title_en || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, title_en: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      {t.titleEs}
                    </label>
                    <input
                      type="text"
                      value={editForm.title_es || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, title_es: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      {t.descEn}
                    </label>
                    <textarea
                      value={editForm.description_en || ""}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          description_en: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      {t.descEs}
                    </label>
                    <textarea
                      value={editForm.description_es || ""}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          description_es: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      {t.accessLevel}
                    </label>
                    <select
                      value={editForm.access_level || "free"}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          access_level: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="free">{t.free}</option>
                      <option value="premium">{t.premium}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      {t.sortOrder}
                    </label>
                    <input
                      type="number"
                      value={editForm.sort_order || 0}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          sort_order: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={saveEdit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {t.save}
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    {t.cancel}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {locale === "es" ? tool.title_es : tool.title_en}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${
                        tool.access_level === "premium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {tool.access_level === "premium" ? t.premium : t.free}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${
                        tool.is_active
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {tool.is_active ? t.active : t.inactive}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-1">
                    {locale === "es" ? tool.description_es : tool.description_en}
                  </p>
                  <p className="text-xs text-slate-500">
                    {t.slug}: {tool.slug} • {t.order}: {tool.sort_order}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(tool)}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 flex items-center gap-1"
                  >
                    <Edit className="w-4 h-4" />
                    {t.edit}
                  </button>
                  <button
                    onClick={() => toggleActive(tool.id, tool.is_active)}
                    className={`px-3 py-1 rounded flex items-center gap-1 ${
                      tool.is_active
                        ? "bg-red-100 text-red-700 hover:bg-red-200"
                        : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                    }`}
                  >
                    {tool.is_active ? (
                      <>
                        <EyeOff className="w-4 h-4" />
                        {t.deactivate}
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4" />
                        {t.activate}
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const en = {
  title: "Tool Management",
  totalTools: "Total Tools",
  titleEn: "Title (English)",
  titleEs: "Title (Spanish)",
  descEn: "Description (English)",
  descEs: "Description (Spanish)",
  accessLevel: "Access Level",
  sortOrder: "Sort Order",
  free: "Free",
  premium: "Premium",
  active: "Active",
  inactive: "Inactive",
  slug: "Slug",
  order: "Order",
  edit: "Edit",
  save: "Save",
  cancel: "Cancel",
  activate: "Activate",
  deactivate: "Deactivate",
  errorLoading: "Failed to load tools",
  errorUpdate: "Failed to update tool",
  successUpdate: "Tool updated successfully",
};

const es = {
  title: "Gestión de Herramientas",
  totalTools: "Total de Herramientas",
  titleEn: "Título (Inglés)",
  titleEs: "Título (Español)",
  descEn: "Descripción (Inglés)",
  descEs: "Descripción (Español)",
  accessLevel: "Nivel de Acceso",
  sortOrder: "Orden",
  free: "Gratis",
  premium: "Premium",
  active: "Activo",
  inactive: "Inactivo",
  slug: "Slug",
  order: "Orden",
  edit: "Editar",
  save: "Guardar",
  cancel: "Cancelar",
  activate: "Activar",
  deactivate: "Desactivar",
  errorLoading: "Error al cargar herramientas",
  errorUpdate: "Error al actualizar herramienta",
  successUpdate: "Herramienta actualizada exitosamente",
};
