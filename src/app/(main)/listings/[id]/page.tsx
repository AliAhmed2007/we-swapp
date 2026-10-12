import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getListing } from '@/features/listings/actions';
import { ContactButtons } from '@/features/chat/components/contact-buttons';

const CONDITION_LABELS = {
  NEW: 'Brand New',
  LIKE_NEW: 'Like New',
  GOOD: 'Good',
  USED: 'Used',
};

export default async function ListingDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { listing, error } = await getListing(params.id);

  if (error || !listing) {
    notFound();
  }

  const mainImage = listing.images?.[0] || '/placeholder-image.jpg';
  const additionalImages = listing.images?.slice(1) || [];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link
          href="/browse"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Browse
        </Link>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-xl overflow-hidden bg-muted">
              <img
                src={mainImage}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {additionalImages.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {additionalImages.map((img, idx) => (
                  <div key={idx} className="aspect-square rounded-lg overflow-hidden bg-muted">
                    <img
                      src={img}
                      alt={`${listing.title} ${idx + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                {listing.listing_type === 'SELL' && (
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                    For Sale
                  </span>
                )}
                {listing.listing_type === 'DONATE' && (
                  <span className="px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded-full">
                    Free
                  </span>
                )}
                {listing.listing_type === 'SWAP' && (
                  <span className="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full">
                    Swap
                  </span>
                )}
                <span className="px-3 py-1 bg-muted text-foreground text-sm rounded-full">
                  {CONDITION_LABELS[listing.condition as keyof typeof CONDITION_LABELS]}
                </span>
              </div>

              <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
              
              {listing.listing_type === 'SELL' && (
                <div className="text-4xl font-bold text-primary">
                  ${listing.price?.toFixed(2)}
                </div>
              )}
              {listing.listing_type === 'DONATE' && (
                <div className="text-3xl font-bold text-green-600">Free to Good Home</div>
              )}
              {listing.listing_type === 'SWAP' && listing.swap_preference && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-1">
                    Looking to swap for:
                  </p>
                  <p className="text-blue-700 dark:text-blue-400">{listing.swap_preference}</p>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-muted-foreground whitespace-pre-wrap">{listing.description}</p>
            </div>

            {/* Details */}
            <div className="border-t border-b border-border py-4 space-y-3">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span className="text-sm">
                  <span className="font-medium">Category:</span> {listing.categories?.name}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm">
                  <span className="font-medium">Meetup Location:</span> {listing.campus_spot}
                </span>
              </div>
            </div>

            {/* Seller Info */}
            {listing.profiles && (
              <div className="bg-muted rounded-lg p-4">
                <h3 className="font-semibold mb-2">Listed by</h3>
                <p className="text-sm font-medium">{listing.profiles.full_name}</p>
                {listing.profiles.campus_location && (
                  <p className="text-sm text-muted-foreground">{listing.profiles.campus_location}</p>
                )}
              </div>
            )}

            {/* Contact Buttons */}
            <ContactButtons 
              listingId={listing.id}
              sellerId={listing.user_id}
              sellerEmail={listing.profiles?.university_email || ''}
              listingTitle={listing.title}
              campusSpot={listing.campus_spot}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
