import { Suspense } from 'react';
import { getListings } from '@/features/listings/actions';
import { ListingGrid } from '@/features/listings/components/listing-grid';
import { ListingFilters } from '@/features/listings/components/listing-filters';

export default async function SwapPage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string };
}) {
  const { listings } = await getListings({
    type: 'SWAP',
    category: searchParams.category ? parseInt(searchParams.category) : undefined,
    search: searchParams.search,
  });

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-2xl">
            🔁
          </div>
          <div>
            <h1 className="text-4xl font-bold">Swap Hub</h1>
            <p className="text-muted-foreground">
              Trade items directly with fellow students - zero money needed
            </p>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-sm text-blue-900 dark:text-blue-300">
            💡 <span className="font-medium">How it works:</span> Browse items others want to swap, 
            and see what they&apos;re looking for. If you have what they need, start a conversation!
          </p>
        </div>
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
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {listings.length} swap {listings.length === 1 ? 'opportunity' : 'opportunities'}
            </div>
          </div>
          <ListingGrid 
            listings={listings}
            emptyMessage="No swap listings available right now"
          />
        </main>
      </div>
    </div>
  );
}
