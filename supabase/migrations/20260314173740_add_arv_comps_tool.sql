/*
  # Add ARV & Comps Analyzer Tool

  1. Changes
    - Add ARV & Comps Analyzer tool to the tools table
    - Set as free access level
    - Add appropriate sort order
*/

INSERT INTO tools (slug, title_en, description_en, access_level, is_active, sort_order)
VALUES (
  'arv_comps',
  'ARV & Comps Analyzer',
  'Analyze comparable sales to estimate After Repair Value (ARV) for your investment property',
  'free',
  true,
  11
)
ON CONFLICT (slug) DO UPDATE SET
  title_en = EXCLUDED.title_en,
  description_en = EXCLUDED.description_en,
  access_level = EXCLUDED.access_level,
  is_active = EXCLUDED.is_active,
  sort_order = EXCLUDED.sort_order;
