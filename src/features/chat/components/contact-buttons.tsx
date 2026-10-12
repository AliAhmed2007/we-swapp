'use client';

import { useState } from 'react';
import { startConversation } from '../actions';

interface ContactButtonsProps {
  listingId: string;
  sellerId: string;
  sellerEmail: string;
  listingTitle: string;
  campusSpot: string;
}

export function ContactButtons({
  listingId,
  sellerId,
  sellerEmail,
  listingTitle,
  campusSpot,
}: ContactButtonsProps) {
  const [loading, setLoading] = useState(false);

  async function handleStartChat() {
    setLoading(true);
    await startConversation(listingId, sellerId);
  }

  function handleWhatsApp() {
    // Extract phone from email or use a placeholder
    const message = encodeURIComponent(
      `Hi! I'm interested in your listing "${listingTitle}" on We-Swap. Can we meet at ${campusSpot}?`
    );
    
    // Open WhatsApp with pre-filled message
    // In production, you'd get the actual phone number from the profile
    window.open(`https://wa.me/?text=${message}`, '_blank');
  }

  return (
    <div className="space-y-3">
      <button
        onClick={handleStartChat}
        disabled={loading}
        className="w-full px-6 py-3 bg-gradient-to-r from-primary-mint to-primary-emerald text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
      >
        {loading ? 'Starting...' : '💬 Start Chat'}
      </button>
      <button
        onClick={handleWhatsApp}
        className="w-full px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition-colors"
      >
        📱 Contact via WhatsApp
      </button>
    </div>
  );
}
