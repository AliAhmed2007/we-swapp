interface MetricCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: React.ReactNode;
  description?: string;
}

export function MetricCard({ title, value, unit, icon, description }: MetricCardProps) {
  return (
    <div className="rounded-lg border border-border-dark bg-surface-dark p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <p className="text-3xl font-bold text-white">{value}</p>
            <p className="text-lg font-medium text-gray-400">{unit}</p>
          </div>
          {description && (
            <p className="mt-2 text-sm text-gray-500">{description}</p>
          )}
        </div>
        <div className="rounded-lg bg-primary-mint/10 p-3 text-primary-mint">
          {icon}
        </div>
      </div>
    </div>
  );
}
