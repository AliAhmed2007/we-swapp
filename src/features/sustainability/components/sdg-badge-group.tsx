interface SDGBadge {
  number: number;
  title: string;
  color: string;
  description: string;
}

const sdgs: SDGBadge[] = [
  {
    number: 12,
    title: 'Responsible Consumption and Production',
    color: 'bg-amber-600',
    description: 'Ensure sustainable consumption and production patterns'
  },
  {
    number: 13,
    title: 'Climate Action',
    color: 'bg-green-700',
    description: 'Take urgent action to combat climate change and its impacts'
  }
];

export function SDGBadgeGroup() {
  return (
    <div className="rounded-lg border border-border-dark bg-surface-dark p-6">
      <h3 className="text-lg font-semibold text-white mb-4">UN Sustainable Development Goals</h3>
      <p className="text-sm text-gray-400 mb-6">
        We-Swap directly contributes to these global sustainability targets
      </p>
      
      <div className="grid gap-4 sm:grid-cols-2">
        {sdgs.map((sdg) => (
          <div 
            key={sdg.number}
            className="rounded-lg border border-border-dark bg-canvas-dark p-4 hover:border-primary-mint/50 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${sdg.color} text-white font-bold text-lg`}>
                {sdg.number}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-white text-sm mb-1">{sdg.title}</h4>
                <p className="text-xs text-gray-400">{sdg.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 rounded-lg bg-primary-mint/10 border border-primary-mint/20 p-4">
        <p className="text-sm text-primary-mint">
          🌱 Every transaction on We-Swap helps build a more sustainable campus community
        </p>
      </div>
    </div>
  );
}
