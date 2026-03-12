import type { ComponentType } from "react";
import type { Locale } from "@/lib/types";
import MortgageCalculator from "@/components/tools/MortgageCalculator";
import RentalYieldCalculator from "@/components/tools/RentalYieldCalculator";
import StampDutyCalculator from "@/components/tools/StampDutyCalculator";
import DealAnalyzer from "@/components/tools/DealAnalyzer";

/**
 * Maps tool slug (from DB) → React component.
 *
 * This is the only hardcoded mapping needed. Tool metadata (title, description,
 * access_level, is_active) always comes from the `tools` DB table.
 *
 * When adding a new tool:
 * 1. Insert it into the `tools` DB table
 * 2. Add the slug → component mapping here
 * 3. Create the component in components/tools/
 */
export const TOOL_COMPONENTS: Record<
  string,
  ComponentType<{ locale: Locale }>
> = {
  mortgage_calculator: MortgageCalculator,
  rental_yield: RentalYieldCalculator,
  stamp_duty: StampDutyCalculator,
  deal_analyzer: DealAnalyzer,
};
