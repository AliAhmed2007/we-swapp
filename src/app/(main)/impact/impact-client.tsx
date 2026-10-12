"use client";

import { motion } from 'framer-motion';
import { MetricCard } from '@/features/sustainability/components/metric-card';
import { CategoryBreakdown } from '@/features/sustainability/components/category-breakdown';
import { SDGBadgeGroup } from '@/features/sustainability/components/sdg-badge-group';
import { AnimatedNumber } from '@/features/sustainability/components/animated-number';
import { staggerContainerVariants, fadeInUpVariants } from '@/lib/animations';
import type { SustainabilityTotals, CategoryImpact } from '@/features/sustainability/actions';

interface ImpactClientProps {
  totals: SustainabilityTotals;
  categoryData: CategoryImpact[];
}

export function ImpactClient({ totals, categoryData }: ImpactClientProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">Campus Sustainability Impact</h1>
          <p className="text-muted-foreground">
            Tracking the collective environmental and economic impact of our campus exchange community
          </p>
        </motion.div>

        {/* Metric Cards */}
        <motion.div 
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8"
          variants={staggerContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUpVariants}>
            <MetricCard
              title="Waste Diverted"
              value={<AnimatedNumber value={totals.totalWasteDiverted} decimals={1} />}
              unit="kg"
              description="Items kept out of landfills"
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              }
            />
          </motion.div>
          
          <motion.div variants={fadeInUpVariants}>
            <MetricCard
              title="Money Saved"
              value={<AnimatedNumber value={totals.totalMoneySaved} decimals={0} prefix="$" />}
              unit="USD"
              description="Value retained in student community"
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
          </motion.div>
          
          <motion.div variants={fadeInUpVariants}>
            <MetricCard
              title="Transactions"
              value={<AnimatedNumber value={totals.totalTransactions} />}
              unit="items"
              description="Successfully exchanged"
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              }
            />
          </motion.div>
        </motion.div>

        {/* Empty State */}
        {totals.totalTransactions === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="rounded-lg border border-border bg-card p-12 text-center mb-8 shadow-sm"
          >
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Start Making an Impact</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Once students complete their first exchanges, we&apos;ll start tracking our collective sustainability metrics here
            </p>
            <motion.a 
              href="/browse"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Browse Listings
            </motion.a>
          </motion.div>
        )}

        {/* Category Breakdown & SDGs */}
        {totals.totalTransactions > 0 && (
          <motion.div 
            className="grid gap-6 lg:grid-cols-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <CategoryBreakdown categories={categoryData} />
            <SDGBadgeGroup />
          </motion.div>
        )}

        {/* Info Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 rounded-lg border border-border bg-card p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">How We Calculate Impact</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h4 className="font-medium text-primary mb-2">Waste Diverted</h4>
              <p className="text-sm text-muted-foreground">
                Each item category has an estimated weight. When an item is exchanged instead of discarded, 
                we count that weight as diverted from landfills.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-primary mb-2">Money Saved</h4>
              <p className="text-sm text-muted-foreground">
                For donations and swaps, we use average retail value. For sales, we use the actual price. 
                This represents money kept within the student community.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
