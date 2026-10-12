'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const LISTING_TYPES = [
  { value: '', label: 'All' },
  { value: 'SELL', label: '💵 For Sale' },
  { value: 'DONATE', label: '🎁 Free' },
  { value: 'SWAP', label: '🔁 Swap' },
];

const CATEGORIES = [
  { id: '', name: 'All Categories' },
  { id: '1', name: 'Textbooks' },
  { id: '2', name: 'Electronics' },
  { id: '3', name: 'Dorm Furniture' },
  { id: '4', name: 'Lab Equipment' },
  { id: '5', name: 'Clothing & Apparel' },
  { id: '6', name: 'Sports & Recreation' },
  { id: '7', name: 'Kitchen & Appliances' },
  { id: '8', name: 'Study Materials' },
  { id: '9', name: 'Art Supplies' },
  { id: '10', name: 'Musical Instruments' },
];

export function ListingFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentType = searchParams.get('type') || '';
  const currentCategory = searchParams.get('category') || '';
  const currentSearch = searchParams.get('search') || '';

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="space-y-4 bg-card border border-border rounded-lg p-4">
      {/* Search */}
      <div>
        <label htmlFor="search" className="block text-sm font-medium mb-2">
          Search
        </label>
        <input
          id="search"
          type="text"
          value={currentSearch}
          onChange={(e) => updateFilters('search', e.target.value)}
          placeholder="Search listings..."
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Type Filter */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Transaction Type
        </label>
        <div className="flex flex-wrap gap-2">
          {LISTING_TYPES.map((type) => (
            <button
              key={type.value}
              onClick={() => updateFilters('type', type.value)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${currentType === type.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
                }
              `}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium mb-2">
          Category
        </label>
        <select
          id="category"
          value={currentCategory}
          onChange={(e) => updateFilters('category', e.target.value)}
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Clear Filters */}
      {(currentType || currentCategory || currentSearch) && (
        <button
          onClick={() => router.push('/browse')}
          className="w-full px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-accent transition-colors"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
}
