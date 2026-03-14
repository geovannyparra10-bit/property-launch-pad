/*
  # Add Owner Finance Calculator Tool

  Inserts the owner_finance tool entry into the tools table so it
  appears in the tools list and can be referenced by ScenarioPanel
  via the calculator_scenarios table.

  - slug: owner_finance
  - Title: Owner Finance Calculator
  - Description: Model seller-financed deals with balloon payments,
    custom terms, and a comparison against traditional financing.
  - Access level: free
  - Sort order: 10 (between portfolio_analyzer and arv_comps)
*/

INSERT INTO tools (slug, title_en, description_en, access_level, is_active, sort_order)
VALUES (
  'owner_finance',
  'Owner Finance Calculator',
  'Model seller-financed deals with balloon payments, custom terms, and a side-by-side comparison against a traditional 30-year mortgage.',
  'free',
  true,
  10
)
ON CONFLICT (slug) DO NOTHING;
