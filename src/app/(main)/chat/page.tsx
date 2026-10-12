import Link from 'next/link';
import { getConversations } from '@/features/chat/actions';

export default async function ChatPage() {
  const { conversations } = await getConversations();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Messages</h1>

        {conversations.length === 0 ? (
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
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <h3 className="text-xl font-semibold mb-2">No messages yet</h3>
            <p className="text-muted-foreground mb-6">
              Start browsing listings and reach out to sellers
            </p>
            <Link
              href="/browse"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Browse Listings
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {conversations.map((conversation) => {
              const listing = conversation.listings;
              const otherUser = conversation.buyer?.full_name || conversation.seller?.full_name;
              const coverImage = listing?.images?.[0] || '/placeholder-image.jpg';

              return (
                <Link
                  key={conversation.id}
                  href={`/chat/${conversation.id}`}
                  className="block bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4">
                    {/* Listing Image */}
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={coverImage}
                        alt={listing?.title || 'Listing'}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate mb-1">
                        {listing?.title || 'Deleted Listing'}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        with {otherUser}
                      </p>
                      {listing && (
                        <div className="flex items-center gap-2">
                          {listing.listing_type === 'SELL' && (
                            <span className="text-sm font-semibold text-primary">
                              ${listing.price?.toFixed(2)}
                            </span>
                          )}
                          {listing.listing_type === 'DONATE' && (
                            <span className="text-sm font-semibold text-green-600">Free</span>
                          )}
                          {listing.listing_type === 'SWAP' && (
                            <span className="text-sm font-semibold text-blue-600">Swap</span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-muted-foreground"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
