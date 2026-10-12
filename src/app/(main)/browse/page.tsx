import { Suspense } from 'react';
import { getListings } from '@/features/listings/actions';
import { ListingGrid } from '@/features/listings/components/listing-grid';
import { ListingFilters } from '@/features/listings/components/listing-filters';

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: { type?: string; category?: string; search?: string };
}) {
  const { listings } = await getListings({
    type: searchParams.type as 'SELL' | 'DONATE' | 'SWAP' | undefined,
    category: searchParams.category ? parseInt(searchParams.category) : undefined,
    search: searchParams.search,
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Browse All Listings</h1>
        <p className="text-muted-foreground">
          Discover items from your campus community
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1">
          <Suspense fallback={<div>Loading filters...</div>}>
            <ListingFilters />
          </Suspense>
        </aside>

        {/* Listings Grid */}
        <main className="lg:col-span-3">
          <div className="mb-4 text-sm text-muted-foreground">
            {listings.length} {listings.length === 1 ? 'listing' : 'listings'} found
          </div>
          <ListingGrid listings={listings} />
        </main>
      </div>
    </div>
  );
}
