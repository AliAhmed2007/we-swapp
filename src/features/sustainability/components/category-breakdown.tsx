"use client";

import { motion } from 'framer-motion';
import type { CategoryImpact } from '../actions';

interface CategoryBreakdownProps {
  categories: CategoryImpact[];
}

export function CategoryBreakdown({ categories }: CategoryBreakdownProps) {
  if (categories.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center shadow-sm">
        <p className="text-muted-foreground">No category data available yet</p>
      </div>
    );
  }

  const maxWaste = Math.max(...categories.map(c => c.wasteKg));

  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-foreground mb-4">Impact by Category</h3>
      <div className="space-y-4">
        {categories.map((category, index) => {
          const percentage = (category.wasteKg / maxWaste) * 100;
          
          return (
            <motion.div 
              key={category.categoryName} 
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">{category.categoryName}</span>
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground">{category.wasteKg.toFixed(1)} kg</span>
                  <span className="text-primary font-semibold">${category.moneySaved.toFixed(0)}</span>
                </div>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <motion.div 
                  className="h-full rounded-full bg-gradient-to-r from-primary-emerald to-primary-mint"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                />
              </div>
              <p className="text-xs text-muted-foreground">{category.transactionCount} transactions</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
