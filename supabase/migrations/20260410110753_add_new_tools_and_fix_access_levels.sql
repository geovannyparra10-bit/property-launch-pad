/*
  # Add New Tools and Fix Access Levels

  1. Fix existing tool access levels
     - BRRR, Flip, Portfolio Analyzer should be 'premium' (they use PremiumRoute)
     - Rename Stamp Duty to Transfer Tax Calculator
     - Rental Yield should be 'free' (it does not use PremiumRoute in App.tsx)

  2. Add new tools
     - deal_screener (free) - Quick Deal Screener with 1% Rule
     - refinance (free) - Refinance Break-Even Calculator
     - dscr (premium) - DSCR Calculator

  3. No data loss — only UPDATE and INSERT operations
*/

UPDATE tools SET
  access_level = 'premium'
WHERE slug IN ('brrr', 'flip', 'portfolio_analyzer');

UPDATE tools SET
  access_level = 'free'
WHERE slug = 'rental_yield';

UPDATE tools SET
  title_en = 'Transfer Tax Calculator',
  title_es = 'Calculadora de Impuesto de Transferencia',
  description_en = 'Estimate property transfer taxes at closing based on purchase price and property type.',
  description_es = 'Calcule los impuestos de transferencia de propiedad al cierre.'
WHERE slug = 'stamp_duty';

INSERT INTO tools (slug, access_level, is_active, category, icon, sort_order, title_en, title_es, description_en, description_es)
VALUES
  (
    'deal_screener',
    'free',
    true,
    'financial',
    'Search',
    13,
    'Quick Deal Screener',
    'Evaluador Rápido de Negocios',
    'Instantly screen investment deals using the 1% Rule, Cap Rate, GRM, and cash flow analysis.',
    'Evalúe negocios de inversión al instante usando la Regla del 1%, Tasa de Capitalización y flujo de caja.'
  ),
  (
    'refinance',
    'free',
    true,
    'financial',
    'RefreshCw',
    14,
    'Refinance Break-Even Calculator',
    'Calculadora de Punto de Equilibrio de Refinanciamiento',
    'Calculate your monthly savings, break-even point, and lifetime interest savings when refinancing.',
    'Calcule sus ahorros mensuales y el punto de equilibrio al refinanciar su hipoteca.'
  ),
  (
    'dscr',
    'premium',
    true,
    'financial',
    'ShieldCheck',
    15,
    'DSCR Calculator',
    'Calculadora DSCR',
    'Calculate Debt Service Coverage Ratio to qualify investment property loans by rental income.',
    'Calcule la Cobertura del Servicio de Deuda para calificar préstamos de propiedades de inversión.'
  )
ON CONFLICT (slug) DO UPDATE SET
  access_level = EXCLUDED.access_level,
  is_active = EXCLUDED.is_active,
  title_en = EXCLUDED.title_en,
  title_es = EXCLUDED.title_es,
  description_en = EXCLUDED.description_en,
  description_es = EXCLUDED.description_es;
