'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ImageUploader } from './image-uploader';
import { createListing } from '../actions';

const CATEGORIES = [
  { id: 1, name: 'Textbooks', slug: 'textbooks' },
  { id: 2, name: 'Electronics', slug: 'electronics' },
  { id: 3, name: 'Dorm Furniture', slug: 'dorm-furniture' },
  { id: 4, name: 'Lab Equipment', slug: 'lab-equipment' },
  { id: 5, name: 'Clothing & Apparel', slug: 'clothing-apparel' },
  { id: 6, name: 'Sports & Recreation', slug: 'sports-recreation' },
  { id: 7, name: 'Kitchen & Appliances', slug: 'kitchen-appliances' },
  { id: 8, name: 'Study Materials', slug: 'study-materials' },
  { id: 9, name: 'Art Supplies', slug: 'art-supplies' },
  { id: 10, name: 'Musical Instruments', slug: 'musical-instruments' },
];

const CONDITIONS = [
  { value: 'NEW', label: 'Brand New', description: 'Never used, original packaging' },
  { value: 'LIKE_NEW', label: 'Like New', description: 'Minimal wear, excellent condition' },
  { value: 'GOOD', label: 'Good', description: 'Normal wear, fully functional' },
  { value: 'USED', label: 'Used', description: 'Visible wear, still functional' },
];

const LISTING_TYPES = [
  { value: 'SELL', label: 'Sell', icon: '💵', description: 'List for a price' },
  { value: 'DONATE', label: 'Donate', icon: '🎁', description: 'Give away for free' },
  { value: 'SWAP', label: 'Swap', icon: '🔁', description: 'Exchange for another item' },
];

const CAMPUS_SPOTS = [
  'Campus Library Lobby',
  'Engineering Building Gate',
  'Student Union Center',
  'Main Cafeteria Entrance',
  'Sports Complex Lobby',
  'Residential Hall Commons',
];

export function CreateListingForm() {
  const router = useRouter();
  const [listingType, setListingType] = useState<'SELL' | 'DONATE' | 'SWAP'>('SELL');
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    
    // Add images to form data
    formData.set('images', JSON.stringify(images));

    const result = await createListing(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push('/browse');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8">
      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
          {error}
        </div>
      )}

      {/* Images */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Photos</h2>
          <p className="text-sm text-muted-foreground">
            Add up to 5 photos. First photo will be the cover image.
          </p>
        </div>
        <ImageUploader onImagesChange={setImages} maxImages={5} />
      </section>

      {/* Basic Info */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Basic Information</h2>

        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            maxLength={100}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="e.g., Calculus Textbook 8th Edition"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            maxLength={1000}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            placeholder="Describe the item's condition, features, and any important details..."
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="category_id" className="block text-sm font-medium mb-2">
              Category *
            </label>
            <select
              id="category_id"
              name="category_id"
              required
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="condition" className="block text-sm font-medium mb-2">
              Condition *
            </label>
            <select
              id="condition"
              name="condition"
              required
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select condition</option>
              {CONDITIONS.map((cond) => (
                <option key={cond.value} value={cond.value}>
                  {cond.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Transaction Type */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Transaction Type</h2>

        <div className="grid md:grid-cols-3 gap-4">
          {LISTING_TYPES.map((type) => (
            <label
              key={type.value}
              className={`
                relative flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition-all
                ${listingType === type.value ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}
              `}
            >
              <input
                type="radio"
                name="listing_type"
                value={type.value}
                checked={listingType === type.value}
                onChange={(e) => setListingType(e.target.value as any)}
                className="sr-only"
              />
              <span className="text-3xl mb-2">{type.icon}</span>
              <span className="font-semibold mb-1">{type.label}</span>
              <span className="text-xs text-muted-foreground text-center">{type.description}</span>
            </label>
          ))}
        </div>

        {/* Dynamic Fields Based on Type */}
        {listingType === 'SELL' && (
          <div>
            <label htmlFor="price" className="block text-sm font-medium mb-2">
              Price (USD) *
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              required
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="0.00"
            />
          </div>
        )}

        {listingType === 'SWAP' && (
          <div>
            <label htmlFor="swap_preference" className="block text-sm font-medium mb-2">
              What are you looking for? *
            </label>
            <input
              id="swap_preference"
              name="swap_preference"
              type="text"
              required
              maxLength={200}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="e.g., Linear Algebra textbook or scientific calculator"
            />
          </div>
        )}

        {listingType === 'DONATE' && (
          <input type="hidden" name="price" value="0" />
        )}
      </section>

      {/* Meetup Location */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Meetup Location</h2>
        <div>
          <label htmlFor="campus_spot" className="block text-sm font-medium mb-2">
            Safe Campus Spot *
          </label>
          <select
            id="campus_spot"
            name="campus_spot"
            required
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {CAMPUS_SPOTS.map((spot) => (
              <option key={spot} value={spot}>
                {spot}
              </option>
            ))}
          </select>
          <p className="mt-2 text-xs text-muted-foreground">
            Choose a public, well-lit campus location for safe exchanges
          </p>
        </div>
      </section>

      {/* Submit Button */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 px-6 py-3 border border-border rounded-lg font-medium hover:bg-accent transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading || images.length === 0}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-mint to-primary-emerald text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          {loading ? 'Creating...' : 'Create Listing'}
        </button>
      </div>
    </form>
  );
}
