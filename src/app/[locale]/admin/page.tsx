"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import AdminDashboard from "@/components/admin/AdminDashboard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import type { Locale } from "@/lib/types";

export default function AdminPage() {
  const params = useParams();
  const router = useRouter();
  const { user, profile, loading } = useAuth();
  const locale = (params?.locale as Locale) || "en";

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(`/${locale}/login`);
      } else if (!profile?.is_admin) {
        router.push(`/${locale}/dashboard`);
      }
    }
  }, [user, profile, loading, locale, router]);

  if (loading || !user || !profile?.is_admin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return <AdminDashboard locale={locale} />;
}
