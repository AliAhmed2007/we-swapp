import { ListingCard } from './listing-card';
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

interface ListingGridProps {
  listings: Listing[];
  emptyMessage?: string;
}

export function ListingGrid({ listings, emptyMessage = 'No listings found' }: ListingGridProps) {
  if (listings.length === 0) {
    return (
      <div className="text-center py-16">
        <svg
          className="w-24 h-24 mx-auto mb-4 text-muted-foreground/30"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <h3 className="text-xl font-semibold mb-2">{emptyMessage}</h3>
        <p className="text-muted-foreground">Try adjusting your filters or check back later</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}
