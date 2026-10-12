# WE-Swap Database Schema Documentation

## Overview

This document describes the complete PostgreSQL database schema for the WE-Swap platform, created using Supabase. All tables have been implemented with proper relationships, indexes, and constraints for optimal performance.

## Custom Enums

### `listing_type`
Defines the transaction intent for a listing.
- `SELL` - Item is for sale
- `DONATE` - Item is free/donation
- `SWAP` - Item is for exchange/swap

### `listing_condition`
Describes the physical condition of the item.
- `NEW` - Brand new, unused
- `LIKE_NEW` - Minimal use, excellent condition
- `GOOD` - Normal wear, fully functional
- `USED` - Significant wear but functional

### `listing_status`
Tracks the lifecycle of a listing.
- `AVAILABLE` - Active and available
- `RESERVED` - Pending transaction
- `COMPLETED` - Transaction finished
- `ARCHIVED` - Removed/expired

---

## Tables

### 1. `profiles`
Extends Supabase's `auth.users` with additional user information.

**Columns:**
- `id` (UUID, PK) - References `auth.users(id)`, cascade delete
- `full_name` (TEXT, NOT NULL) - User's full name
- `avatar_url` (TEXT) - Profile picture URL
- `university_email` (TEXT, UNIQUE, NOT NULL) - Verified university email
- `phone_number` (TEXT) - Optional contact number
- `campus_location` (TEXT) - Preferred campus pickup spot
- `created_at` (TIMESTAMPTZ) - Account creation timestamp
- `updated_at` (TIMESTAMPTZ) - Last profile update

**Relationships:**
- ONE-TO-ONE with `auth.users`
- ONE-TO-MANY with `listings`
- ONE-TO-MANY with `conversations` (as buyer and seller)
- ONE-TO-MANY with `messages` (as sender)
- ONE-TO-MANY with `listing_reports` (as reporter)

---

### 2. `categories`
Item categories with sustainability impact baseline data.

**Columns:**
- `id` (SERIAL, PK) - Auto-incrementing category ID
- `name` (TEXT, UNIQUE, NOT NULL) - Display name (e.g., "Textbooks")
- `slug` (TEXT, UNIQUE, NOT NULL) - URL-safe identifier (e.g., "textbooks")
- `avg_weight_kg` (NUMERIC(6,2), DEFAULT 1.00) - Average item weight for impact calculation
- `avg_value_usd` (NUMERIC(10,2), DEFAULT 15.00) - Average item value for savings calculation

**Seed Data:**
| ID | Name | Slug | Avg Weight (kg) | Avg Value (USD) |
|----|------|------|-----------------|-----------------|
| 1 | Textbooks | textbooks | 1.20 | 80.00 |
| 2 | Electronics | electronics | 0.50 | 150.00 |
| 3 | Dorm Furniture | dorm-furniture | 15.00 | 50.00 |
| 4 | Lab Equipment | lab-equipment | 2.00 | 120.00 |
| 5 | Clothing & Apparel | clothing-apparel | 0.30 | 25.00 |
| 6 | Sports & Recreation | sports-recreation | 1.50 | 45.00 |
| 7 | Kitchen & Appliances | kitchen-appliances | 3.00 | 35.00 |
| 8 | Study Materials | study-materials | 0.50 | 15.00 |
| 9 | Art Supplies | art-supplies | 0.80 | 30.00 |
| 10 | Musical Instruments | musical-instruments | 2.50 | 200.00 |

**Relationships:**
- ONE-TO-MANY with `listings`
- ONE-TO-MANY with `transaction_impact_logs`

---

### 3. `listings`
Core marketplace items with all transaction details.

**Columns:**
- `id` (UUID, PK, DEFAULT gen_random_uuid()) - Unique listing identifier
- `user_id` (UUID, NOT NULL, FK → profiles.id) - Listing owner
- `category_id` (INT, NOT NULL, FK → categories.id) - Item category
- `title` (TEXT, NOT NULL) - Listing title
- `description` (TEXT, NOT NULL) - Detailed item description
- `listing_type` (listing_type ENUM, NOT NULL) - Transaction intent
- `condition` (listing_condition ENUM, NOT NULL) - Item condition
- `price` (NUMERIC(10,2), DEFAULT 0.00) - Sale price (0 for donate/swap)
- `swap_preference` (TEXT) - Desired items for swap
- `images` (TEXT[], DEFAULT '{}') - Array of image URLs
- `campus_spot` (TEXT, DEFAULT 'Campus Library Lobby') - Meetup location
- `status` (listing_status ENUM, DEFAULT 'AVAILABLE') - Current status
- `views_count` (INT, DEFAULT 0) - View counter
- `created_at` (TIMESTAMPTZ) - Listing creation time
- `updated_at` (TIMESTAMPTZ) - Last update time

**Indexes:**
- `idx_listings_user_id` on `user_id`
- `idx_listings_category_id` on `category_id`
- `idx_listings_type` on `listing_type`
- `idx_listings_status` on `status`

**Relationships:**
- MANY-TO-ONE with `profiles` (user_id)
- MANY-TO-ONE with `categories` (category_id)
- ONE-TO-MANY with `conversations`
- ONE-TO-MANY with `listing_reports`
- ONE-TO-ONE with `transaction_impact_logs`

---

### 4. `conversations`
Peer-to-peer communication threads between buyer and seller.

**Columns:**
- `id` (UUID, PK, DEFAULT gen_random_uuid()) - Conversation identifier
- `listing_id` (UUID, FK → listings.id, ON DELETE SET NULL) - Related listing
- `buyer_id` (UUID, NOT NULL, FK → profiles.id) - Interested buyer
- `seller_id` (UUID, NOT NULL, FK → profiles.id) - Listing owner
- `created_at` (TIMESTAMPTZ) - Conversation start time

**Constraints:**
- `unique_listing_conversation` UNIQUE(listing_id, buyer_id, seller_id)

**Indexes:**
- `idx_conversations_buyer_id` on `buyer_id`
- `idx_conversations_seller_id` on `seller_id`

**Relationships:**
- MANY-TO-ONE with `listings` (listing_id)
- MANY-TO-ONE with `profiles` (buyer_id)
- MANY-TO-ONE with `profiles` (seller_id)
- ONE-TO-MANY with `messages`

---

### 5. `messages`
Individual messages within conversations (Realtime enabled).

**Columns:**
- `id` (UUID, PK, DEFAULT gen_random_uuid()) - Message identifier
- `conversation_id` (UUID, NOT NULL, FK → conversations.id, CASCADE DELETE) - Parent conversation
- `sender_id` (UUID, NOT NULL, FK → profiles.id) - Message sender
- `content` (TEXT, NOT NULL) - Message text
- `created_at` (TIMESTAMPTZ) - Send timestamp

**Indexes:**
- `idx_messages_conversation_id` on `conversation_id`
- `idx_messages_created_at` on `created_at`

**Realtime:**
- Enabled via `supabase_realtime` publication for live chat

**Relationships:**
- MANY-TO-ONE with `conversations` (conversation_id)
- MANY-TO-ONE with `profiles` (sender_id)

---

### 6. `transaction_impact_logs`
Sustainability impact tracking for completed transactions.

**Columns:**
- `id` (UUID, PK, DEFAULT gen_random_uuid()) - Log identifier
- `listing_id` (UUID, FK → listings.id, ON DELETE SET NULL) - Related listing
- `seller_id` (UUID, FK → profiles.id) - Seller profile
- `category_id` (INT, FK → categories.id) - Item category
- `transaction_type` (listing_type ENUM, NOT NULL) - Transaction type
- `waste_diverted_kg` (NUMERIC(6,2), NOT NULL) - Weight diverted from waste
- `money_saved_estimated` (NUMERIC(10,2), NOT NULL) - Estimated value saved
- `completed_at` (TIMESTAMPTZ) - Completion timestamp

**Purpose:**
- Track environmental impact (waste reduction)
- Calculate economic benefits (money saved)
- Power sustainability dashboard
- Support SDG 12 & 13 reporting

**Relationships:**
- MANY-TO-ONE with `listings` (listing_id)
- MANY-TO-ONE with `profiles` (seller_id)
- MANY-TO-ONE with `categories` (category_id)

---

### 7. `listing_reports`
User-submitted reports for moderation.

**Columns:**
- `id` (UUID, PK, DEFAULT gen_random_uuid()) - Report identifier
- `listing_id` (UUID, NOT NULL, FK → listings.id, CASCADE DELETE) - Reported listing
- `reporter_id` (UUID, NOT NULL, FK → profiles.id) - User who reported
- `reason` (TEXT, NOT NULL) - Report reason/description
- `status` (TEXT, DEFAULT 'PENDING') - Moderation status
- `created_at` (TIMESTAMPTZ) - Report submission time

**Relationships:**
- MANY-TO-ONE with `listings` (listing_id)
- MANY-TO-ONE with `profiles` (reporter_id)

---

## Migration Files

All schema changes are tracked in migrations:

1. `20261012184414_create_profiles_table.sql` - Initial profiles table (superseded)
2. `20261012191815_create_weswap_schema.sql` - Complete WE-Swap schema with all tables, enums, indexes, and relationships

---

## Database Performance Optimizations

### Indexes
- **Foreign key indexes** on all FK columns for fast joins
- **Status/type indexes** on frequently filtered columns
- **Timestamp indexes** for chronological queries
- **Composite unique constraint** on conversations to prevent duplicates

### Data Types
- **UUID** for globally unique identifiers
- **TIMESTAMPTZ** for timezone-aware timestamps
- **NUMERIC** with precision for monetary values
- **TEXT[]** arrays for efficient image URL storage
- **ENUMS** for constrained categorical data

### Realtime
- Messages table enabled for live chat functionality
- Optimized with conversation_id and created_at indexes

---

## Row Level Security (RLS) - To Be Implemented

Future RLS policies will include:
- Users can only view their own profile data
- Users can only create listings for themselves
- Users can view all available listings
- Only conversation participants can view messages
- Users can only report listings (not delete)
- Admins have full access to all tables

---

## TypeScript Types

All database types are auto-generated and available in:
```typescript
import type { Database } from '@/types/database.types';

// Example usage:
type Listing = Database['public']['Tables']['listings']['Row'];
type ListingInsert = Database['public']['Tables']['listings']['Insert'];
type ListingUpdate = Database['public']['Tables']['listings']['Update'];
type ListingType = Database['public']['Enums']['listing_type'];
```

---

## Quick Reference Commands

### Generate Types
```bash
supabase gen types --local typescript > src/types/database.types.ts
```

### Create Migration
```bash
supabase db pull <migration_name> --local --yes
```

### View Schema Changes
```bash
supabase db diff --local
```

### Query Database
```bash
echo "SELECT * FROM listings LIMIT 5;" | supabase db query --local
```

---

## Entity Relationship Diagram (Simplified)

```
auth.users (Supabase Auth)
    ↓ 1:1
profiles
    ↓ 1:N
    ├─→ listings ←─┐
    ├─→ conversations (as buyer)
    ├─→ conversations (as seller)
    ├─→ messages (as sender)
    ├─→ listing_reports
    └─→ transaction_impact_logs
            │
categories  │
    ↓ 1:N   │
    ├───────┘
    └─→ transaction_impact_logs

listings
    ↓ 1:N
    ├─→ conversations
    ├─→ listing_reports
    └─→ transaction_impact_logs

conversations
    ↓ 1:N
    └─→ messages
```

---

## Schema Status

✅ **Completed:**
- All 7 tables created
- All enums defined
- All indexes created
- All foreign keys established
- Realtime enabled for messages
- Category seed data inserted
- TypeScript types generated
- Migration files created

⏳ **Pending:**
- Row Level Security (RLS) policies
- Database triggers for auto-updating timestamps
- Additional seed data for testing
- Storage bucket configuration for images

---

*Last Updated: 2026-10-12*
*Migration: 20261012191815_create_weswap_schema.sql*
