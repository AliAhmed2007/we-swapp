"use server";

import { createClient } from "@/lib/supabase/server";

export interface SustainabilityTotals {
  totalWasteDiverted: number;
  totalMoneySaved: number;
  totalTransactions: number;
}

export interface CategoryImpact {
  categoryName: string;
  wasteKg: number;
  moneySaved: number;
  transactionCount: number;
}

/**
 * Get aggregated sustainability metrics across all completed transactions
 */
export async function getSustainabilityTotals(): Promise<SustainabilityTotals> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("transaction_impact_logs")
    .select("waste_diverted_kg, money_saved_estimated");

  if (error) {
    console.error("Error fetching sustainability totals:", error);
    return {
      totalWasteDiverted: 0,
      totalMoneySaved: 0,
      totalTransactions: 0,
    };
  }

  const totalWasteDiverted = data.reduce(
    (sum, log) => sum + Number(log.waste_diverted_kg),
    0
  );
  const totalMoneySaved = data.reduce(
    (sum, log) => sum + Number(log.money_saved_estimated),
    0
  );
  const totalTransactions = data.length;

  return {
    totalWasteDiverted,
    totalMoneySaved,
    totalTransactions,
  };
}

/**
 * Get sustainability impact broken down by category
 */
export async function getCategoryBreakdown(): Promise<CategoryImpact[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("transaction_impact_logs")
    .select(
      `
      waste_diverted_kg,
      money_saved_estimated,
      category_id,
      categories (
        name
      )
    `
    );

  if (error) {
    console.error("Error fetching category breakdown:", error);
    return [];
  }

  // Group by category
  const categoryMap = new Map<string, CategoryImpact>();

  data.forEach((log: { categories?: { name: string } | null; waste_diverted_kg: number; money_saved_estimated: number }) => {
    const categoryName = log.categories?.name || "Unknown";

    if (!categoryMap.has(categoryName)) {
      categoryMap.set(categoryName, {
        categoryName,
        wasteKg: 0,
        moneySaved: 0,
        transactionCount: 0,
      });
    }

    const category = categoryMap.get(categoryName)!;
    category.wasteKg += Number(log.waste_diverted_kg);
    category.moneySaved += Number(log.money_saved_estimated);
    category.transactionCount += 1;
  });

  // Convert to array and sort by waste diverted
  return Array.from(categoryMap.values()).sort((a, b) => b.wasteKg - a.wasteKg);
}
