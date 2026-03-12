import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// ---------------------------------------------------------------------------
// next-intl middleware (handles locale prefix, redirects, etc.)
// ---------------------------------------------------------------------------
const intlMiddleware = createMiddleware(routing);

// ---------------------------------------------------------------------------
// Route classification
// ---------------------------------------------------------------------------
const PUBLIC_PATHS = ["/", "/pricing", "/auth/callback"];
const GUEST_ONLY_PATHS = ["/login", "/signup"]; // redirect away if already logged in
const AUTH_ONLY_PATHS = ["/dashboard", "/onboarding", "/tools", "/settings"];
const ADMIN_PATHS = ["/admin"];
const ONBOARDING_EXEMPT = ["/onboarding", "/auth/callback"]; // don't redirect these to onboarding

function classifyRoute(pathname: string) {
  if (ADMIN_PATHS.some((p) => pathname.startsWith(p))) return "admin" as const;
  if (GUEST_ONLY_PATHS.some((p) => pathname.startsWith(p)))
    return "guest" as const;
  if (AUTH_ONLY_PATHS.some((p) => pathname.startsWith(p)))
    return "auth" as const;
  return "public" as const;
}

// ---------------------------------------------------------------------------
// Main middleware
// ---------------------------------------------------------------------------
export async function middleware(request: NextRequest) {
  // 1. Run next-intl first — produces response with locale headers/cookies
  const intlResponse = intlMiddleware(request);

  // 2. Create ONE stable supabase response — reuse intlResponse, never recreate
  const supabaseResponse = intlResponse;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: Array<{ name: string; value: string; options: Record<string, unknown> }>) {
          // Write cookies ONLY to the response, never mutate request.cookies
          // Do NOT recreate NextResponse.next() — reuse supabaseResponse
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options as Parameters<typeof supabaseResponse.cookies.set>[2]);
          });
        },
      },
    }
  );

  // 3. Refresh the session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 4. Determine pathname without locale prefix
  const { pathname } = request.nextUrl;
  const localePattern = /^\/(?:en|es)(?=\/|$)/;
  const pathnameWithoutLocale = pathname.replace(localePattern, "") || "/";
  const detectedLocale =
    pathname.match(localePattern)?.[0]?.slice(1) ?? "en";

  const routeType = classifyRoute(pathnameWithoutLocale);

  // 5. Guest-only routes: redirect authenticated users to dashboard
  if (routeType === "guest" && user) {
    const dashUrl = request.nextUrl.clone();
    dashUrl.pathname = `/${detectedLocale}/dashboard`;
    return NextResponse.redirect(dashUrl);
  }

  // 6. Auth-only routes: redirect unauthenticated users to login
  if (routeType === "auth" && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = `/${detectedLocale}/login`;
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 7. Admin routes: must be authenticated + profiles.is_admin
  if (routeType === "admin") {
    if (!user) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = `/${detectedLocale}/login`;
      return NextResponse.redirect(loginUrl);
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("user_id", user.id)
      .single();

    if (!profile?.is_admin) {
      const dashUrl = request.nextUrl.clone();
      dashUrl.pathname = `/${detectedLocale}/dashboard`;
      return NextResponse.redirect(dashUrl);
    }
  }

  // 8. Onboarding guard: authenticated users who haven't completed onboarding
  //    get redirected to /onboarding (except when already on exempt paths)
  if (
    user &&
    (routeType === "auth" || routeType === "admin") &&
    !ONBOARDING_EXEMPT.some((p) => pathnameWithoutLocale.startsWith(p))
  ) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("onboarding_completed")
      .eq("user_id", user.id)
      .single();

    if (profile && !profile.onboarding_completed) {
      const obUrl = request.nextUrl.clone();
      obUrl.pathname = `/${detectedLocale}/onboarding`;
      return NextResponse.redirect(obUrl);
    }
  }

  // 9. Return stable response with all auth cookies
  return supabaseResponse;
}

export const config = {
  matcher: [
    // Match all pathnames except static files and API routes
    "/((?!_next/static|_next/image|favicon.ico|api/).*)",
  ],
};
