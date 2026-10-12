"use client";

import { motion } from 'framer-motion';
import { fadeInUpVariants } from '@/lib/animations';

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
    <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-foreground mb-4">UN Sustainable Development Goals</h3>
      <p className="text-sm text-muted-foreground mb-6">
        We-Swap directly contributes to these global sustainability targets
      </p>
      
      <div className="grid gap-4 sm:grid-cols-2">
        {sdgs.map((sdg, index) => (
          <motion.div 
            key={sdg.number}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.4 }}
            whileHover={{ y: -4 }}
            className="rounded-lg border border-border bg-background p-4 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-4">
              <motion.div 
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${sdg.color} text-white font-bold text-lg shadow-sm`}
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {sdg.number}
              </motion.div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground text-sm mb-1">{sdg.title}</h4>
                <p className="text-xs text-muted-foreground">{sdg.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="mt-6 rounded-lg bg-success/10 border border-success/30 p-4"
      >
        <p className="text-sm text-success-foreground">
          🌱 Every transaction on We-Swap helps build a more sustainable campus community
        </p>
      </motion.div>
    </div>
  );
}
