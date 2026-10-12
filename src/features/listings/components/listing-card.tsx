import Link from 'next/link';
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
  NEW: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  LIKE_NEW: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  GOOD: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  USED: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
};

const TYPE_BADGES = {
  SELL: { label: 'For Sale', color: 'bg-primary text-primary-foreground' },
  DONATE: { label: 'Free', color: 'bg-green-500 text-white' },
  SWAP: { label: 'Swap', color: 'bg-blue-500 text-white' },
};

export function ListingCard({ listing }: ListingCardProps) {
  const coverImage = listing.images?.[0] || '/placeholder-image.jpg';
  const typeBadge = TYPE_BADGES[listing.listing_type as keyof typeof TYPE_BADGES];
  const conditionColor = CONDITION_COLORS[listing.condition as keyof typeof CONDITION_COLORS];

  return (
    <Link href={`/listings/${listing.id}`}>
      <div className="group relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={coverImage}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Type Badge */}
          <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${typeBadge.color}`}>
            {typeBadge.label}
          </div>

          {/* Condition Badge */}
          <div className={`absolute top-3 right-3 px-2 py-1 rounded text-xs font-medium ${conditionColor}`}>
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
              <div className="text-xl font-semibold text-green-600">
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
      </div>
    </Link>
  );
}
