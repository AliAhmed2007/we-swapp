import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getConversation } from '@/features/chat/actions';
import { ChatWindow } from '@/features/chat/components/chat-window';
import { getUser } from '@/features/auth/actions';

export default async function ConversationPage({
  params,
}: {
  params: { id: string };
}) {
  const [{ conversation, messages, error }, user] = await Promise.all([
    getConversation(params.id),
    getUser(),
  ]);

  if (error || !conversation || !user) {
    notFound();
  }

  const listing = conversation.listings;
  const otherUser =
    conversation.buyer_id === user.id
      ? conversation.seller
      : conversation.buyer;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/chat"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Messages
        </Link>

        {/* Listing Context Card */}
        {listing && (
          <div className="bg-card border border-border rounded-lg p-4 mb-6">
            <div className="flex gap-4">
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                <img
                  src={listing.images?.[0] || '/placeholder-image.jpg'}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <Link href={`/listings/${listing.id}`} className="hover:underline">
                  <h3 className="font-semibold mb-1">{listing.title}</h3>
                </Link>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  {listing.listing_type === 'SELL' && (
                    <span className="font-semibold text-primary">
                      ${listing.price?.toFixed(2)}
                    </span>
                  )}
                  {listing.listing_type === 'DONATE' && (
                    <span className="font-semibold text-green-600">Free</span>
                  )}
                  {listing.listing_type === 'SWAP' && (
                    <span className="font-semibold text-blue-600">Swap</span>
                  )}
                  <span>•</span>
                  <span>📍 {listing.campus_spot}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Chat Header */}
        <div className="bg-card border border-border rounded-t-lg p-4">
          <h2 className="font-semibold">
            Chatting with {otherUser?.full_name}
          </h2>
          <p className="text-sm text-muted-foreground">
            {otherUser?.university_email}
          </p>
        </div>

        {/* Chat Window */}
        <ChatWindow
          conversationId={params.id}
          currentUserId={user.id}
          initialMessages={messages}
        />
      </div>
    </div>
  );
}
