# We-Swap: Unified Production Engineering Context & Technical Specification

This document provides a single, self-contained reference containing all technical specifications, business rules, design tokens, schemas, directory trees, page wireframes, and capabilities for the **We-Swap** platform.

## 1. Project Overview & Business Requirements Document (BRD)

### 1.1 Executive Summary

**We-Swap** (tagline: _Reuse • Exchange • Connect_) is a hyper-localized, campus-first web application enabling university students to exchange, donate, or sell items they no longer need directly to peers. The platform avoids external hardware, shipping logistics, escrow payment gateways, and complex AI dependencies to prioritize rapid development and zero-overhead maintenance.

### 1.2 Core Pillars & SDG Alignment

- **SDG 12 (Responsible Consumption and Production):** Prevents premature disposal of functional textbooks, electronics, dorm essentials, and lab gear by extending lifecycle circulation.
    
- **SDG 13 (Climate Action):** Avoids embedded manufacturing and transport carbon emissions by redistributing localized goods within campus borders.
    
- **Economic & Social Equity:** Reduces student expenditure through zero-cost donations, direct one-to-one item swaps, and low-cost sales.
    

### 1.3 User Roles & Scenarios

- **Sellers / Donors / Swappers:** Students listing items with defined intent (`Donate`, `Swap`, `Sell`), condition indicators, and meetup preferences.
    
- **Seekers / Buyers:** Students filtering the campus feed by category, condition, transaction type, and pickup spot.
    
- **Campus Administrators:** Privileged accounts auditing reported listings, enforcing community rules, and reviewing sustainability metrics.
    

## 2. Design System & Brand Identity

The visual identity is derived directly from the **We-Swap** emblem, utilizing high-contrast deep tech slate surfaces, clean white text, and mint-to-emerald looping circuit accents:

### 2.1 Color Tokens

|**Token Name**|**Hex Code**|**Role & Usage**|
|---|---|---|
|**Primary Mint**|`#10D08A`|Primary CTA buttons, brand badges, active highlights, success states.|
|**Primary Emerald**|`#009F6B`|Gradient transitions, button hover states, category pill borders.|
|**Primary Forest / Dark Accent**|`#0B4F3A`|Subtle card borders, active filter backgrounds, chip text contrast.|
|**Brand White**|`#FFFFFF`|Primary headers, clean card backgrounds, icon highlights.|
|**Canvas Dark**|`#0D1117`|Dark mode background (high-contrast deep tech slate).|
|**Surface Dark**|`#161B22`|Card wrappers, dropdown menus, modal containers.|
|**Border Dark**|`#21262D`|Dividers and border accents.|
|**Canvas Light**|`#F8FAFC`|Light mode background (crisp modern canvas).|
|**Surface Light**|`#FFFFFF`|Light mode card and navigation containers.|
|**Text Primary (Light)**|`#0F172A`|Primary slate-900 typography.|
|**Text Muted**|`#64748B`|Secondary descriptions, timestamps, subheaders.|

### 2.2 Typography & UI Components

- **Font Family:** Inter or Plus Jakarta Sans (`font-sans`).
    
- **Icons:** Lucide React (`lucide-react`).
    
- **Card Style:** Clean 1px border (`border-slate-200 dark:border-neutral-800`), rounded corners (`rounded-xl`), subtle hover lift (`translate-y-[-2px]`).
    
- **Transaction Chips:**
    
    - `Donate`: `#10D08A` background with `#0B4F3A` text or mint glow border.
        
    - `Swap`: Deep emerald border with mint text.
        
    - `Sell`: Neutral slate pill with bold price tag.
        

## 3. Technology Stack & Architectural Decisions

- **Client & Server:** Next.js 15 (App Router), React 19, TypeScript.
    
- **Styling & Components:** Tailwind CSS, `shadcn/ui` primitives (Radix UI).
    
- **Backend as a Service:** Supabase:
    
    - **Auth:** Built-in Email & Password authentication.
        
    - **Database:** Managed PostgreSQL.
        
    - **File Storage:** Supabase Storage (`listing-images` public bucket).
        
    - **Realtime:** Supabase Realtime channel subscriptions for peer messaging.
        
- **Hosting:** Vercel (Edge deployment, zero custom DevOps pipelines).
    

## 4. Production-Grade PostgreSQL Database Schema

SQL

```
-- 1. Enums
CREATE TYPE listing_type AS ENUM ('SELL', 'DONATE', 'SWAP');
CREATE TYPE listing_condition AS ENUM ('NEW', 'LIKE_NEW', 'GOOD', 'USED');
CREATE TYPE listing_status AS ENUM ('AVAILABLE', 'RESERVED', 'COMPLETED', 'ARCHIVED');

-- 2. User Profiles (extends Supabase auth.users)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    university_email TEXT UNIQUE NOT NULL,
    phone_number TEXT,
    campus_location TEXT, -- e.g., "Main Library / Engineering Gate"
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Categories with Impact Baseline Constants
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    avg_weight_kg NUMERIC(6, 2) DEFAULT 1.00,
    avg_value_usd NUMERIC(10, 2) DEFAULT 15.00
);

-- 4. Listings Table
CREATE TABLE listings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    category_id INT NOT NULL REFERENCES categories(id),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    listing_type listing_type NOT NULL,
    condition listing_condition NOT NULL,
    price NUMERIC(10, 2) DEFAULT 0.00,
    swap_preference TEXT,
    images TEXT[] NOT NULL DEFAULT '{}',
    campus_spot TEXT NOT NULL DEFAULT 'Campus Library Lobby',
    status listing_status DEFAULT 'AVAILABLE',
    views_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Conversations
CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID REFERENCES listings(id) ON DELETE SET NULL,
    buyer_id UUID NOT NULL REFERENCES profiles(id),
    seller_id UUID NOT NULL REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_listing_conversation UNIQUE(listing_id, buyer_id, seller_id)
);

-- 6. Messages (Realtime enabled)
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES profiles(id),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Sustainability Impact Logs (Populated on completion)
CREATE TABLE transaction_impact_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID REFERENCES listings(id) ON DELETE SET NULL,
    seller_id UUID REFERENCES profiles(id),
    category_id INT REFERENCES categories(id),
    transaction_type listing_type NOT NULL,
    waste_diverted_kg NUMERIC(6, 2) NOT NULL,
    money_saved_estimated NUMERIC(10, 2) NOT NULL,
    completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Moderation & Listing Reports
CREATE TABLE listing_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    reporter_id UUID NOT NULL REFERENCES profiles(id),
    reason TEXT NOT NULL,
    status TEXT DEFAULT 'PENDING',
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## 5. Complete Folder Structure

Plaintext

```
we-swap/
├── public/
│   ├── brand/
│   │   ├── logo.svg
│   │   └── favicon.ico
│   └── placeholders/
├── src/
│   ├── app/                                 # Thin Next.js App Router Layer
│   │   ├── (auth)/                          # Auth Route Group
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── (main)/                          # Core Student Application
│   │   │   ├── layout.tsx                   # Main layout (Navbar + Footer)
│   │   │   ├── page.tsx                     # Landing / Global Feed
│   │   │   ├── swap/page.tsx                # Swap-only directory
│   │   │   ├── buy/page.tsx                 # Buy & Donate directory
│   │   │   ├── listings/
│   │   │   │   ├── create/page.tsx          # New listing wizard
│   │   │   │   └── [id]/page.tsx            # Listing detail view
│   │   │   ├── chat/
│   │   │   │   ├── page.tsx                 # Conversations inbox
│   │   │   │   └── [id]/page.tsx            # Active message thread
│   │   │   ├── impact/page.tsx              # Sustainability dashboard
│   │   │   └── profile/page.tsx             # Student profile & personal items
│   │   ├── admin/                           # Management & Governance
│   │   │   ├── layout.tsx                   # Admin sidebar layout
│   │   │   ├── users/page.tsx               # Student user management
│   │   │   ├── listings/page.tsx            # Moderation & flagged listings
│   │   │   └── audit-logs/page.tsx          # Incident & audit history
│   │   ├── api/
│   │   │   └── webhooks/route.ts
│   │   ├── globals.css
│   │   └── layout.tsx
│   │
│   ├── features/                            # Domain-Driven Core Modules
│   │   ├── auth/                            # 1. Auth Feature
│   │   │   ├── components/
│   │   │   │   ├── login-form.tsx
│   │   │   │   └── register-form.tsx
│   │   │   └── actions.ts                   # signIn, signUp, signOut
│   │   │
│   │   ├── listings/                        # 2. Marketplace & Exchange Engine
│   │   │   ├── components/
│   │   │   │   ├── listing-card.tsx
│   │   │   │   ├── listing-grid.tsx
│   │   │   │   ├── listing-filters.tsx      # Category & intent toggles
│   │   │   │   ├── image-uploader.tsx       # Direct client upload to Supabase
│   │   │   │   └── create-listing-form.tsx  # Multi-step wizard
│   │   │   ├── actions.ts                   # createListing, updateListingStatus
│   │   │   └── types.ts                     # Local types & schemas (Zod)
│   │   │
│   │   ├── chat/                            # 3. Direct Peer Handshake & Comms
│   │   │   ├── components/
│   │   │   │   ├── conversation-list.tsx
│   │   │   │   ├── chat-window.tsx
│   │   │   │   ├── message-bubble.tsx
│   │   │   │   └── safe-meetup-picker.tsx
│   │   │   ├── hooks/
│   │   │   │   └── use-chat.ts              # Supabase Realtime subscription hook
│   │   │   └── actions.ts                   # sendMessage, getConversations
│   │   │
│   │   ├── sustainability/                  # 4. Metrics & Environmental Impact
│   │   │   ├── components/
│   │   │   │   ├── metric-card.tsx          # Waste diverted, $ saved counters
│   │   │   │   ├── category-breakdown.tsx   # Visual category weights breakdown
│   │   │   │   └── sdg-badge-group.tsx      # SDG 12 & 13 indicators
│   │   │   ├── actions.ts                   # getSustainabilityTotals
│   │   │   └── utils.ts                     # Weight-to-CO2 calculation helpers
│   │   │
│   │   └── admin/                           # 5. Governance & Audit Trails
│   │       ├── components/
│   │       │   ├── moderation-table.tsx     # Flagged listing queue
│   │       │   ├── user-management-row.tsx  # Ban/Verify actions
│   │       │   └── audit-log-viewer.tsx     # System event trail
│   │       └── actions.ts                   # banUser, deleteListing, resolveReport
│   │
│   ├── components/                          # Cross-Feature Shared Components
│   │   ├── ui/                              # shadcn/ui primitives
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   └── tabs.tsx
│   │   └── layout/                          # Global Shell
│   │       ├── navbar.tsx
│   │       ├── user-nav.tsx
│   │       └── footer.tsx
│   │
│   ├── lib/                                 # Shared Infrastructure
│   │   ├── supabase/
│   │   │   ├── client.ts                    # Browser client
│   │   │   ├── server.ts                    # Server Action & SSR client
│   │   │   └── middleware.ts                # Protected routes & session refresh
│   │   ├── constants.ts                     # Categories, weights, campus spots
│   │   └── utils.ts                         # cn() helper
│   │
│   ├── hooks/                               # Global Shared Hooks
│   │   └── use-debounce.ts
│   │
│   └── types/
│       └── database.types.ts                # Auto-generated Supabase schema types
│
├── .env.example
├── components.json
├── next.config.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 6. Page Specifications, Features & Wireframes

### Page 1: Landing & Discovery Feed (`/`)

- **Hero Impact Ticker:** Live counters for items diverted, estimated kilograms saved, and money saved.
    
- **Filter System:** Single-click intent filters (`All`, `🎁 Donate`, `🔁 Swap`, `🏷️ Sell`) and category chips.
    
- **Listing Grid:** Responsive 4-column layout with condition tags, safe spot tags, and pricing badges.
    

```
+------------------------------------------------------------------------------------+
| [WS Logo]    [ Search textbooks, lab gear, dorm items... (Ctrl+K) ]   [+ List Item] |
+------------------------------------------------------------------------------------+
| HERO BANNER (#0D1117 background with mint circuit accents)                         |
| "Reuse More. Waste Less. Share Better."                                            |
| [ 1,420 Items Swapped  •  3.8 Tons Diverted  •  $24k Saved ]                       |
+------------------------------------------------------------------------------------+
| FILTER PILLS: [ All ] [ 🎁 Free Donation ] [ 🔁 Swap ] [ 🏷️ For Sale ] [ 📚 Books ]|
+------------------------------------------------------------------------------------+
| ITEM CARDS: [Image] [Condition] [Title] [Location Tag] [Intent Chip]               |
+------------------------------------------------------------------------------------+
```

### Page 2: Listing Detail Page (`/listings/[id]`)

- **Gallery & Info:** Image viewer, item description, and condition badge.
    
- **Intent Container:** Clear swap wishlists or $0.00 donation indicators.
    
- **Handshake CTAs:** In-app chat launcher and WhatsApp pre-filled connection link.
    

```
+---------------------------------------------------+--------------------------------+
| IMAGE GALLERY (Left 60%)                          | ITEM SPEC & ACTION (Right 40%) |
| [ Large Item Image ]                              | Title: Stewart Calculus 8th    |
| [ Thumb 1 ] [ Thumb 2 ]                           | Condition: Like New            |
|                                                   | Type: 🔁 SWAP ONLY             |
| Description: Complete with access code.           | Looking for: Linear Algebra    |
| Pickup Location: Engineering Library Lobby        | [ 💬 Chat on We-Swap ]         |
|                                                   | [ 📱 Open WhatsApp Chat ]      |
+---------------------------------------------------+--------------------------------+
```

### Page 3: Item Creation Flow (`/listings/create`)

- **Photo Upload:** Multi-image selection direct to Supabase Storage.
    
- **Intent Toggles:** Select `Donate`, `Swap`, or `Sell` (dynamically adapts price and swap preference inputs).
    
- **Campus Spot Picker:** Preset campus safe meeting locations.
    

```
+------------------------------------------------------------------------------------+
| Form: Title -> Category -> Condition -> Intent (Donate/Swap/Sell) -> Campus Spot   |
| [ Drag & Drop Images ] [ Price / Swap Wishlist Input ] [ Submit Listing Button ]   |
+------------------------------------------------------------------------------------+
```

### Page 4: Realtime Communication (`/chat` & `/chat/[id]`)

- **Chat Thread:** Live message list powered by Supabase Realtime table events.
    
- **Listing Header:** Contextual item bar pinned above messages with a `Mark as Completed` button.
    

### Page 5: Sustainability Dashboard (`/impact`)

- **Aggregated Visuals:** Metric cards for waste diverted, items circulated, and economic value preserved.
    
- **Category Breakdown:** Percentage distribution of items reused.
    
- **SDG Tracker:** Visual summary of contributions to SDG 12 and 13.
    

### Page 6: User Profile & Admin Moderation (`/profile` & `/admin`)

- **User Profile:** Manage active listings, view completed trades, and review personal impact numbers.
    
- **Admin Moderation:** Queue of flagged items with single-click `Dismiss` or `Delete Listing` actions.