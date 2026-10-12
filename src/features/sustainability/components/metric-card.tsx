interface MetricCardProps {
  title: string;
  value: string | number | React.ReactNode;
  unit: string;
  icon: React.ReactNode;
  description?: string;
}

export function MetricCard({ title, value, unit, icon, description }: MetricCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <p className="text-3xl font-bold text-foreground">{value}</p>
            <p className="text-lg font-medium text-muted-foreground">{unit}</p>
          </div>
          {description && (
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <div className="rounded-lg bg-primary/10 p-3 text-primary">
          {icon}
        </div>
      </div>
    </div>
  );
}
