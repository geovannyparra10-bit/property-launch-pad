import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * GET /[locale]/auth/callback
 *
 * Supabase redirects here after email confirmation or OAuth sign-in.
 * Exchanges the `code` query param for a session, then redirects the user
 * to their intended destination (or dashboard by default).
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const redirectTo = searchParams.get("redirect");

  // Detect locale from the URL path
  const locale = request.nextUrl.pathname.split("/")[1] || "en";

  if (code) {
    const response = NextResponse.redirect(
      new URL(redirectTo || `/${locale}/dashboard`, origin)
    );

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options);
            });
          },
        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return response;
    }
  }

  // If no code or exchange failed, redirect to login with error
  return NextResponse.redirect(
    new URL(`/${locale}/login?error=auth_callback_failed`, origin)
  );
}
