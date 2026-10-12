"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { cardHoverProps } from '@/lib/animations';
import type { Database } from '@/types/database.types';

type Listing = Database['public']['Tables']['listings']['Row'] & {
  profiles: {
    full_name: string;
    university_email: string;
  } | null;
  categories: {
    name: string;
    slug: string;
  } | null;
};

interface ListingCardProps {
  listing: Listing;
}

const CONDITION_COLORS = {
  NEW: 'bg-success/15 text-success border border-success/30',
  LIKE_NEW: 'bg-info/15 text-info border border-info/30',
  GOOD: 'bg-warning/15 text-warning-foreground border border-warning/30',
  USED: 'bg-muted text-muted-foreground border border-border',
};

const TYPE_BADGES = {
  SELL: { label: 'For Sale', color: 'bg-primary text-primary-foreground shadow-sm' },
  DONATE: { label: 'Free', color: 'bg-success text-success-foreground shadow-sm' },
  SWAP: { label: 'Swap', color: 'bg-info text-info-foreground shadow-sm' },
};

export function ListingCard({ listing }: ListingCardProps) {
  const coverImage = listing.images?.[0] || '/placeholder-image.jpg';
  const typeBadge = TYPE_BADGES[listing.listing_type as keyof typeof TYPE_BADGES];
  const conditionColor = CONDITION_COLORS[listing.condition as keyof typeof CONDITION_COLORS];

  return (
    <Link href={`/listings/${listing.id}`}>
      <motion.div 
        className="group relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200"
        {...cardHoverProps}
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <motion.img
            src={coverImage}
            alt={listing.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Type Badge */}
          <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${typeBadge.color}`}>
            {typeBadge.label}
          </div>

          {/* Condition Badge */}
          <div className={`absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-medium ${conditionColor}`}>
            {listing.condition.replace('_', ' ')}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Title */}
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
            {listing.title}
          </h3>

          {/* Category */}
          {listing.categories && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span>{listing.categories.name}</span>
            </div>
          )}

          {/* Price or Swap */}
          <div className="flex items-center justify-between">
            {listing.listing_type === 'SELL' && (
              <div className="text-2xl font-bold text-primary">
                ${listing.price?.toFixed(2)}
              </div>
            )}
            {listing.listing_type === 'DONATE' && (
              <div className="text-xl font-semibold text-success">
                Free
              </div>
            )}
            {listing.listing_type === 'SWAP' && listing.swap_preference && (
              <div className="text-sm text-muted-foreground">
                <span className="font-medium">Looking for:</span>
                <p className="line-clamp-1">{listing.swap_preference}</p>
              </div>
            )}
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t border-border">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{listing.campus_spot}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
