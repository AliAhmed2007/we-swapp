import { Suspense } from 'react';
import { getListings } from '@/features/listings/actions';
import { ListingGrid } from '@/features/listings/components/listing-grid';

export default async function BuyFreePage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string; priceMax?: string };
}) {
  const { listings } = await getListings({
    category: searchParams.category ? parseInt(searchParams.category) : undefined,
    search: searchParams.search,
  });

  // Filter to only SELL and DONATE types
  const filteredListings = listings.filter(
    (listing) => listing.listing_type === 'SELL' || listing.listing_type === 'DONATE'
  );

  // Apply price filter if specified
  let displayListings = filteredListings;
  if (searchParams.priceMax) {
    const maxPrice = parseFloat(searchParams.priceMax);
    displayListings = filteredListings.filter(
      (listing) => listing.listing_type === 'DONATE' || (listing.price || 0) <= maxPrice
    );
  }

  // Separate free and for-sale items
  const freeItems = displayListings.filter((l) => l.listing_type === 'DONATE');
  const forSaleItems = displayListings.filter((l) => l.listing_type === 'SELL');

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-primary-mint rounded-full flex items-center justify-center text-2xl">
            💵
          </div>
          <div>
            <h1 className="text-4xl font-bold">Buy & Free</h1>
            <p className="text-muted-foreground">
              Purchase items or claim free donations from your peers
            </p>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-3">
          <a
            href="/buy-free"
            className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg text-sm font-medium transition-colors"
          >
            All Items
          </a>
          <a
            href="/buy-free?priceMax=0"
            className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg text-sm font-medium transition-colors dark:bg-green-900/30 dark:text-green-400"
          >
            🎁 Free Only ({freeItems.length})
          </a>
          <a
            href="/buy-free?priceMax=10"
            className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg text-sm font-medium transition-colors dark:bg-blue-900/30 dark:text-blue-400"
          >
            &lt; $10 ({forSaleItems.filter((l) => (l.price || 0) < 10).length})
          </a>
          <a
            href="/buy-free?priceMax=25"
            className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-lg text-sm font-medium transition-colors dark:bg-purple-900/30 dark:text-purple-400"
          >
            &lt; $25 ({forSaleItems.filter((l) => (l.price || 0) < 25).length})
          </a>
        </div>
      </div>

      {/* Free Section */}
      {freeItems.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-2xl font-bold">Free Items</h2>
            <span className="px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded-full">
              {freeItems.length}
            </span>
          </div>
          <ListingGrid listings={freeItems} />
        </section>
      )}

      {/* For Sale Section */}
      {forSaleItems.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-2xl font-bold">For Sale</h2>
            <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
              {forSaleItems.length}
            </span>
          </div>
          <ListingGrid listings={forSaleItems} />
        </section>
      )}

      {/* Empty State */}
      {displayListings.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No items match your filters</p>
        </div>
      )}
    </div>
  );
}
