# Property Launch Pad — Lovable AI Handoff Document

## Product Overview

Property Launch Pad is a bilingual (EN/ES) SaaS platform for property investors. Users sign up, complete onboarding, and access financial calculators (mortgage, rental yield, stamp duty, deal analysis). They can save/compare scenarios. Free users get basic tools + 1 saved scenario per tool. Premium users get all tools + unlimited scenarios.

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js App Router | 15.x |
| Language | TypeScript | 5.7+ |
| Database + Auth | Supabase (Postgres + Auth) | Latest |
| i18n | next-intl | 3.25+ |
| Styling | CSS custom properties + Tailwind | 3.4 |
| Icons | lucide-react | 0.460+ |
| Rendering | Server Components + Server Actions | — |
| Payments | Stripe (NOT YET WIRED) | — |

---

## Architecture Decisions (DO NOT CHANGE)

### Slug Format: snake_case
All tool slugs use `snake_case` (e.g. `mortgage_calculator`). This matches the DB `tools.slug` column. URLs are `/{locale}/tools/mortgage_calculator`.

### Profile lookup: profiles.user_id
The `profiles` table has its own `id` (PK) AND a `user_id` (FK to auth.users.id). ALL code lookups use `.eq("user_id", user.id)`. NEVER use `.eq("id", user.id)`.

### Subscription field: subscription_status
The column is `profiles.subscription_status` with values `free | premium | past_due | canceled`. There is NO column called `subscription_tier`. Never reference it.

### Tool metadata from DB, not code
Tool titles, descriptions, access_level, is_active all come from the `tools` DB table. The ONLY hardcoded mapping is `config/tool-components.ts` which maps slug → React component (necessary since components can't be stored in a DB).

### Scenario table: calculator_scenarios
The table is `calculator_scenarios`. There is NO table called `scenarios`. It links via `user_id` (FK to auth.users.id) and `tool_id` (FK to tools.id).

### Middleware: single stable response
The middleware creates ONE `supabaseResponse` object (from intlMiddleware output) and reuses it. The `setAll` cookie callback writes ONLY to this response. It NEVER creates a new `NextResponse.next()` and NEVER mutates `request.cookies`.

### Locale prefix: always
next-intl is configured with `localePrefix: "always"`. Every URL has `/en/` or `/es/` prefix. `revalidatePath` must always include the locale: `revalidatePath(\`/\${locale}/tools/\${toolSlug}\`)`.

---

## Database Schema (Supabase)

Run `supabase/schema.sql` once. It creates everything:

### profiles
```
id                    uuid PK
user_id               uuid UNIQUE FK → auth.users.id
email                 text
full_name             text
language              text ('en' | 'es')
subscription_status   text ('free' | 'premium' | 'past_due' | 'canceled')
stripe_customer_id    text (nullable, for Phase 4)
is_admin              boolean
onboarding_completed  boolean
created_at            timestamptz
updated_at            timestamptz
```
Auto-created by trigger `on_auth_user_created` when a user signs up.

### tools
```
id              uuid PK
slug            text UNIQUE (snake_case)
access_level    text ('free' | 'premium')
is_active       boolean
category        text
icon            text (Lucide icon name)
sort_order      integer
title_en        text
title_es        text
description_en  text
description_es  text
created_at      timestamptz
```
Seeded by `schema.sql`. Add new tools by inserting rows.

### calculator_scenarios
```
id              uuid PK
user_id         uuid FK → auth.users.id
tool_id         uuid FK → tools.id
scenario_name   text
inputs          jsonb
outputs         jsonb (nullable)
is_pinned       boolean
created_at      timestamptz
updated_at      timestamptz
```
Free users: max 1 row per (user_id, tool_id). Enforced in server action, not DB constraint.

### onboarding_responses
```
id          uuid PK
user_id     uuid FK → auth.users.id
step_key    text
response    jsonb
created_at  timestamptz
updated_at  timestamptz
UNIQUE(user_id, step_key)
```

### RLS Policies
All tables have RLS enabled. Users can only read/write their own rows. `tools` table is publicly readable.

---

## File Structure

```
property-launch-pad/
├── .env.local.example
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.js
├── supabase/
│   └── schema.sql              # RUN THIS FIRST — creates all tables, trigger, seed
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout (imports globals.css)
│   │   ├── not-found.tsx        # 404 page
│   │   └── [locale]/
│   │       ├── layout.tsx       # Locale layout (Navbar, Footer, NextIntlClientProvider)
│   │       ├── page.tsx         # Landing page (public)
│   │       ├── pricing/page.tsx # Pricing page (public)
│   │       ├── login/page.tsx   # Login (guest-only)
│   │       ├── signup/page.tsx  # Signup (guest-only)
│   │       ├── auth/callback/route.ts   # Supabase auth code exchange
│   │       ├── onboarding/page.tsx      # 3-step wizard (auth, pre-dashboard)
│   │       ├── dashboard/page.tsx       # Post-onboarding home (auth)
│   │       ├── settings/page.tsx        # Profile + language + plan (auth)
│   │       └── tools/
│   │           ├── page.tsx             # Tools library grid (auth)
│   │           └── [slug]/page.tsx      # Dynamic tool route (auth, gated)
│   ├── actions/
│   │   ├── onboarding.ts       # loadProgress, saveStep, completeOnboarding
│   │   ├── profile.ts          # updateProfile
│   │   └── scenarios.ts        # loadScenarios, saveScenario, togglePin, deleteScenario
│   ├── components/
│   │   ├── auth/AuthForm.tsx              # Login/signup form (client)
│   │   ├── gates/PremiumGate.tsx          # Tool-aware subscription gate (server)
│   │   ├── layout/Navbar.tsx              # Auth-aware nav (server)
│   │   ├── layout/Footer.tsx              # Simple footer
│   │   ├── onboarding/OnboardingWizard.tsx # Multi-step wizard (client)
│   │   ├── settings/SettingsForm.tsx      # Profile editor + logout (client)
│   │   └── tools/
│   │       ├── MortgageCalculator.tsx     # Tool #1 (client)
│   │       └── ScenarioPanel.tsx          # Reusable save/load/pin/delete (client)
│   ├── config/
│   │   └── tool-components.ts  # slug → React component map
│   ├── i18n/
│   │   ├── routing.ts          # Locale config (en, es, prefix: always)
│   │   └── request.ts          # Server-side message loader
│   ├── lib/
│   │   ├── types.ts            # TS interfaces matching DB schema
│   │   ├── tools.ts            # DB queries: getToolBySlug, getActiveTools
│   │   └── supabase/
│   │       ├── server.ts       # Server client (cookies API)
│   │       └── client.ts       # Browser client
│   ├── messages/
│   │   ├── en.json
│   │   └── es.json
│   ├── middleware.ts            # Auth + intl + onboarding guard
│   └── styles/
│       └── globals.css          # CSS variables + Tailwind + resets
```

---

## Route Map

| Route | Auth | Purpose |
|-------|------|---------|
| `/[locale]` | Public | Landing page |
| `/[locale]/pricing` | Public | Plan comparison |
| `/[locale]/login` | Guest-only | Login form (redirects to dashboard if logged in) |
| `/[locale]/signup` | Guest-only | Signup form |
| `/[locale]/auth/callback` | Public | Supabase code exchange |
| `/[locale]/onboarding` | Auth | 3-step wizard (skips if completed) |
| `/[locale]/dashboard` | Auth | Home after onboarding |
| `/[locale]/settings` | Auth | Profile + language + plan display |
| `/[locale]/tools` | Auth | Tool library grid |
| `/[locale]/tools/[slug]` | Auth + gate | Individual tool (PremiumGate wraps premium tools) |

---

## User Flow

1. Visit `/en` → landing page
2. Click "Get Started" → `/en/signup`
3. Fill form → Supabase creates auth.users row → trigger creates profiles row
4. Email confirmation → `/en/auth/callback` exchanges code → redirects to `/en/dashboard`
5. Middleware detects `onboarding_completed = false` → redirects to `/en/onboarding`
6. Complete 3 steps → `completeOnboarding()` sets `onboarding_completed = true`
7. Redirect to `/en/dashboard` → shows tools grid
8. Open `/en/tools/mortgage_calculator` → PremiumGate checks tools.access_level → "free" → renders
9. Save scenario → `saveScenario()` checks free-tier limit → saves to `calculator_scenarios`
10. Settings → change language to ES → redirects to `/es/settings`

---

## WHAT IS COMPLETE (Built & Working)

- Full Supabase schema with all tables, RLS, trigger, seed data
- Middleware with auth/guest/admin/onboarding guards
- Supabase server + browser clients
- next-intl routing + message loading (EN + ES)
- Auth flow: signup → email confirm → callback → session
- Profile auto-creation trigger
- Login page with redirect support + error handling
- Signup page
- Onboarding: 3-step wizard with progress resume
- Dashboard: auth-gated, onboarding-gated, shows tools
- Tools library: reads from DB, renders cards by category
- Dynamic tool routing: DB lookup + PremiumGate + component resolution
- PremiumGate: tool-registry-driven, subscription_status-based, i18n prompts
- Mortgage Calculator: full PITI calculation, clamped down payment, correct totalPaid
- Scenario system: save/load/pin/delete with free-tier limit enforcement
- ScenarioPanel: reusable UI component
- Settings page: profile edit, language switch, logout
- Pricing page: free vs premium comparison
- Landing page with feature cards
- Navbar (auth-aware) + Footer
- 404 page
- Full i18n message files (EN + ES)
- CSS custom properties design system
- Root + locale layouts

---

## WHAT STILL NEEDS TO BE BUILT

### Priority 1 — Stripe Integration (Payments)
- Stripe Checkout: create checkout session server action
- Webhook handler: `/api/stripe/webhook` route to update `subscription_status` on payment events
- Customer portal: link from settings to manage subscription
- Update pricing page CTAs to trigger Stripe checkout
- Handle `past_due` and `canceled` states in PremiumGate

### Priority 2 — Additional Tools
Each new tool needs:
1. INSERT into `tools` table (slug, titles, access_level)
2. Create component in `src/components/tools/`
3. Add mapping in `src/config/tool-components.ts`
4. That's it — routing, gating, scenario save/load all work automatically

Planned tools:
- `rental_yield` (premium) — gross/net yield calculator
- `stamp_duty` (free) — regional tax calculator
- `deal_analyzer` (premium) — full cash flow projection

### Priority 3 — Visual Polish
- Make landing page more distinctive (animations, better copy)
- Add loading skeletons for tool pages
- Improve mobile responsiveness throughout
- Add toast notifications for save/delete/error feedback
- Consider a more polished dark theme

### Priority 4 — Admin Dashboard
- `/[locale]/admin` route (middleware already guards it)
- Admin pages: manage tools (toggle is_active, change access_level), view users
- Already have `profiles.is_admin` and middleware guard

### Priority 5 — Production Hardening
- Error boundaries for each route
- Rate limiting on server actions
- Email templates for auth (customize Supabase templates)
- SEO: meta tags, OG images per page
- Analytics integration
- CSRF protection review

---

## CRITICAL RULES FOR LOVABLE AI

These are non-negotiable. Violating any of them will break the app:

1. **Profile lookup is ALWAYS `.eq("user_id", user.id)`** — never `.eq("id", user.id)`
2. **Subscription column is `subscription_status`** — never `subscription_tier`
3. **Scenario table is `calculator_scenarios`** — never `scenarios`
4. **Tool slugs are snake_case** — `mortgage_calculator` not `mortgage-calculator`
5. **Tools come from the DB** — never hardcode a TOOLS array for routing or display
6. **revalidatePath always includes locale** — `revalidatePath(\`/\${locale}/...\`)`
7. **Middleware uses ONE response object** — never create new NextResponse.next() in setAll
8. **setAll writes to response only** — never mutate request.cookies
9. **PremiumGate checks tools.access_level first** — if tool is "free", skip subscription check entirely
10. **Free-tier scenario limit: 1 per tool** — enforced in saveScenario server action
11. **Locale prefix is "always"** — every route has /en/ or /es/
12. **Server Components for data fetching** — Client Components only for interactivity

---

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_APP_URL=http://localhost:3000
# STRIPE_SECRET_KEY=sk_test_...          (Phase 4)
# STRIPE_WEBHOOK_SECRET=whsec_...        (Phase 4)
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...  (Phase 4)
```

---

## Setup Instructions

```bash
# 1. Clone and install
npm install

# 2. Copy env
cp .env.local.example .env.local
# Fill in Supabase URL and anon key

# 3. Run schema SQL in Supabase SQL Editor
# Open supabase/schema.sql → paste into SQL Editor → Run

# 4. Configure Supabase Auth
# - Enable email auth in Supabase dashboard
# - Set Site URL to http://localhost:3000
# - Add redirect URL: http://localhost:3000/*/auth/callback

# 5. Start dev server
npm run dev

# 6. Test the flow
# Visit /en/signup → create account → confirm email → onboarding → dashboard → tools
```
