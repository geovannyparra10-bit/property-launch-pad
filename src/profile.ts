"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { Locale } from "@/lib/types";

interface UpdateProfileData {
  fullName: string;
  language: Locale;
}

export async function updateProfile(
  data: UpdateProfileData,
  locale: Locale
): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
    error: authErr,
  } = await supabase.auth.getUser();

  if (authErr || !user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: data.fullName,
      language: data.language,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);

  revalidatePath(`/${locale}/settings`);
  revalidatePath(`/${data.language}/settings`);
}
