import type { CategoryImpact } from '../actions';

interface CategoryBreakdownProps {
  categories: CategoryImpact[];
}

export function CategoryBreakdown({ categories }: CategoryBreakdownProps) {
  if (categories.length === 0) {
    return (
      <div className="rounded-lg border border-border-dark bg-surface-dark p-8 text-center">
        <p className="text-gray-400">No category data available yet</p>
      </div>
    );
  }

  const maxWaste = Math.max(...categories.map(c => c.wasteKg));

  return (
    <div className="rounded-lg border border-border-dark bg-surface-dark p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Impact by Category</h3>
      <div className="space-y-4">
        {categories.map((category) => {
          const percentage = (category.wasteKg / maxWaste) * 100;
          
          return (
            <div key={category.categoryName} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-300">{category.categoryName}</span>
                <div className="flex items-center gap-4">
                  <span className="text-gray-400">{category.wasteKg.toFixed(1)} kg</span>
                  <span className="text-primary-mint">${category.moneySaved.toFixed(0)}</span>
                </div>
              </div>
              <div className="h-2 rounded-full bg-canvas-dark overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-primary-emerald to-primary-mint transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <p className="text-xs text-gray-500">{category.transactionCount} transactions</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
