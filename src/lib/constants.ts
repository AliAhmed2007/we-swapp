/**
 * Application Constants
 * Central source of truth for enums, categories, and configuration values
 */

// ============================================
// LISTING TYPES
// ============================================
export const LISTING_TYPES = {
  SELL: 'SELL',
  DONATE: 'DONATE',
  SWAP: 'SWAP',
} as const;

export type ListingType = typeof LISTING_TYPES[keyof typeof LISTING_TYPES];

// ============================================
// LISTING CONDITIONS
// ============================================
export const LISTING_CONDITIONS = {
  NEW: 'NEW',
  LIKE_NEW: 'LIKE_NEW',
  GOOD: 'GOOD',
  USED: 'USED',
} as const;

export type ListingCondition = typeof LISTING_CONDITIONS[keyof typeof LISTING_CONDITIONS];

export const CONDITION_LABELS: Record<ListingCondition, string> = {
  NEW: 'Brand New',
  LIKE_NEW: 'Like New',
  GOOD: 'Good',
  USED: 'Used',
};

export const CONDITION_DESCRIPTIONS: Record<ListingCondition, string> = {
  NEW: 'Never used, still in original packaging',
  LIKE_NEW: 'Gently used, minimal signs of wear',
  GOOD: 'Used with normal wear, fully functional',
  USED: 'Well-used with visible wear, still functional',
};

// ============================================
// CATEGORIES
// ============================================
export interface Category {
  slug: string;
  name: string;
  icon: string;
  avg_weight_kg: number;
  avg_value_usd: number;
  description?: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: 'textbooks',
    name: 'Textbooks & Study Materials',
    icon: '📚',
    avg_weight_kg: 1.2,
    avg_value_usd: 75,
    description: 'Course books, study guides, and reference materials',
  },
  {
    slug: 'electronics',
    name: 'Electronics & Gadgets',
    icon: '💻',
    avg_weight_kg: 0.8,
    avg_value_usd: 150,
    description: 'Laptops, tablets, chargers, and accessories',
  },
  {
    slug: 'furniture',
    name: 'Furniture & Decor',
    icon: '🪑',
    avg_weight_kg: 15.0,
    avg_value_usd: 120,
    description: 'Dorm furniture, lamps, and room decorations',
  },
  {
    slug: 'clothing',
    name: 'Clothing & Accessories',
    icon: '👕',
    avg_weight_kg: 0.5,
    avg_value_usd: 30,
    description: 'Apparel, shoes, bags, and fashion accessories',
  },
  {
    slug: 'sports',
    name: 'Sports & Outdoors',
    icon: '⚽',
    avg_weight_kg: 2.0,
    avg_value_usd: 60,
    description: 'Sports equipment, bikes, and outdoor gear',
  },
  {
    slug: 'kitchen',
    name: 'Kitchen & Appliances',
    icon: '🍳',
    avg_weight_kg: 3.5,
    avg_value_usd: 45,
    description: 'Cookware, small appliances, and utensils',
  },
  {
    slug: 'stationery',
    name: 'Stationery & Supplies',
    icon: '✏️',
    avg_weight_kg: 0.3,
    avg_value_usd: 15,
    description: 'Notebooks, pens, planners, and art supplies',
  },
  {
    slug: 'media',
    name: 'Music & Entertainment',
    icon: '🎵',
    avg_weight_kg: 0.4,
    avg_value_usd: 25,
    description: 'Instruments, speakers, games, and media',
  },
  {
    slug: 'other',
    name: 'Other',
    icon: '📦',
    avg_weight_kg: 1.0,
    avg_value_usd: 40,
    description: 'Miscellaneous items',
  },
];

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return CATEGORIES.find((cat) => cat.slug === slug);
};

// ============================================
// CAMPUS SAFE MEETUP ZONES
// ============================================
export interface MeetupZone {
  id: string;
  name: string;
  description: string;
  hours?: string;
}

export const CAMPUS_MEETUP_ZONES: MeetupZone[] = [
  {
    id: 'main-library-lobby',
    name: 'Main Library Lobby',
    description: 'Well-lit, high-traffic area with seating',
    hours: '7:00 AM - 11:00 PM',
  },
  {
    id: 'student-union-gate',
    name: 'Student Union Gate',
    description: 'Central campus location, easy to find',
    hours: '8:00 AM - 10:00 PM',
  },
  {
    id: 'engineering-hall',
    name: 'Engineering Hall Main Entrance',
    description: 'Near security desk, monitored area',
    hours: '7:00 AM - 9:00 PM',
  },
  {
    id: 'campus-north-gate',
    name: 'Campus North Gate',
    description: 'Main entrance with security presence',
    hours: '24/7',
  },
  {
    id: 'rec-center-lobby',
    name: 'Recreation Center Lobby',
    description: 'Indoor space with staff on duty',
    hours: '6:00 AM - 11:00 PM',
  },
  {
    id: 'dining-hall-commons',
    name: 'Dining Hall Commons Area',
    description: 'Public space with high foot traffic',
    hours: '7:00 AM - 9:00 PM',
  },
];

export const getMeetupZoneById = (id: string): MeetupZone | undefined => {
  return CAMPUS_MEETUP_ZONES.find((zone) => zone.id === id);
};

// ============================================
// PAGINATION & LIMITS
// ============================================
export const DEFAULT_PAGE_SIZE = 24;
export const MAX_PAGE_SIZE = 100;
export const SEARCH_DEBOUNCE_MS = 300;

// ============================================
// FILE UPLOAD LIMITS
// ============================================
export const MAX_IMAGE_SIZE_MB = 5;
export const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;
export const MAX_IMAGES_PER_LISTING = 6;
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

// ============================================
// VALIDATION RULES
// ============================================
export const VALIDATION = {
  TITLE_MIN_LENGTH: 5,
  TITLE_MAX_LENGTH: 100,
  DESCRIPTION_MIN_LENGTH: 20,
  DESCRIPTION_MAX_LENGTH: 1000,
  PRICE_MIN: 0,
  PRICE_MAX: 10000,
  PHONE_REGEX: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
} as const;

// ============================================
// FEATURE FLAGS
// ============================================
export const FEATURES = {
  ENABLE_SWAP: true,
  ENABLE_DONATIONS: true,
  ENABLE_NOTIFICATIONS: true,
  ENABLE_ANALYTICS: false, // Will enable in Phase 3
} as const;

// ============================================
// SOCIAL & CONTACT
// ============================================
export const CONTACT = {
  SUPPORT_EMAIL: 'support@we-swap.campus',
  FEEDBACK_EMAIL: 'feedback@we-swap.campus',
  EMERGENCY_CONTACT: 'Campus Security: (555) 123-4567',
} as const;

// ============================================
// URL PATTERNS
// ============================================
export const ROUTES = {
  HOME: '/',
  BROWSE: '/browse',
  SWAP_HUB: '/swap',
  BUY_FREE: '/buy-free',
  IMPACT: '/impact',
  LISTINGS_CREATE: '/listings/create',
  LISTINGS_DETAIL: (id: string) => `/listings/${id}`,
  PROFILE: (username: string) => `/profile/${username}`,
  SEARCH: '/search',
  AUTH_LOGIN: '/auth/login',
  AUTH_SIGNUP: '/auth/signup',
  DASHBOARD: '/dashboard',
} as const;

// ============================================
// EXPORT ALL
// ============================================
export default {
  LISTING_TYPES,
  LISTING_CONDITIONS,
  CONDITION_LABELS,
  CONDITION_DESCRIPTIONS,
  CATEGORIES,
  CAMPUS_MEETUP_ZONES,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  SEARCH_DEBOUNCE_MS,
  MAX_IMAGE_SIZE_MB,
  MAX_IMAGE_SIZE_BYTES,
  MAX_IMAGES_PER_LISTING,
  ACCEPTED_IMAGE_TYPES,
  VALIDATION,
  FEATURES,
  CONTACT,
  ROUTES,
};
