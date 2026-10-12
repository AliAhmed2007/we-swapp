
> **We-Swap Platform Master Context & Engineering Directive**
> 
> **Brand Slogan:** _Reuse • Exchange • Connect_
> 
> **Primary Objective:** Ultra-rapid MVP delivery of a hyper-local, campus-first student exchange web platform with zero overengineering, zero external AI overhead, and zero payment processing liabilities.

## 1. Project Overview & Philosophy

### 1.1 Purpose

We-Swap is a student-to-student circular exchange platform operating strictly within university boundaries. Students list items they no longer need to:

1. **Swap** for other items (`SWAP`).
    
2. **Donate** for free (`DONATE`).
    
3. **Sell** at affordable campus rates (`SELL`).
    

### 1.2 Non-Negotiable Engineering Constraints

- **Zero Payment Infrastructure:** No Stripe, no escrow, no in-app cards. Financial transactions (if any) are settled peer-to-peer in-person (Cash / InstaPay / Local P2P).
    
- **Zero Shipping / Fulfillment:** All exchanges occur in person at designated campus safe zones.
    
- **Zero AI Dependencies:** No LLMs, computer vision, vector embeddings, or machine learning pipelines. Everything is handled via direct SQL queries, standard REST/Server Actions, and rule-based constants.
    
- **Single BaaS Provider:** Supabase is the sole backend provider (Auth, PostgreSQL DB, Storage, and Realtime messaging).
    

## 2. Core Tech Stack Specifications

- **Framework:** Next.js `15.x` (App Router) with React `19.0.0` & React DOM `19.0.0`.
    
- **Language:** TypeScript 5.x (Strict mode enabled, no loose `any`).
    
- **Styling:** Tailwind CSS + `shadcn/ui` primitives (Radix UI).
    
- **Backend & DB:** Supabase (`@supabase/ssr`, `@supabase/supabase-js`):
    
    - **Auth:** Built-in Email & Password / Magic Link.
        
    - **Database:** PostgreSQL.
        
    - **Storage:** Bucket `listing-images` (Public).
        
    - **Realtime:** Table change events over WebSockets.
        
- **Icons:** `lucide-react`.
    
- **Deployment Target:** Vercel.
    

## 3. Brand Identity & Design System Tokens

The visual design is derived directly from the **We-Swap** emblem: high-contrast dark tech canvas (`#0D1117`), crisp white typography, and vibrant circuit-loop mint/emerald green accents (`#10D08A` & `#009F6B`).

### 3.1 Color Palette Table

|**Variable Token**|**Hex Value**|**Application & Usage**|
|---|---|---|
|`--color-primary-mint`|`#10D08A`|Primary brand accent, primary CTA buttons, active state toggles, free badge.|
|`--color-primary-emerald`|`#009F6B`|Button hover states, gradient accents, active border highlights.|
|`--color-primary-dark`|`#0B4F3A`|Subtle card borders, badge backgrounds, dark active tabs.|
|`--color-brand-white`|`#FFFFFF`|Primary text in dark mode, light mode card surfaces.|
|`--color-canvas-dark`|`#0D1117`|Dark mode primary background (deep tech slate).|
|`--color-surface-dark`|`#161B22`|Card bodies, sheet backgrounds, dropdown backdrops.|
|`--color-border-dark`|`#21262D`|Dividers, card strokes, input borders.|
|`--color-canvas-light`|`#F8FAFC`|Light mode primary background (crisp canvas).|
|`--color-surface-light`|`#FFFFFF`|Light mode card surfaces and nav containers.|
|`--color-text-light`|`#0F172A`|Primary typography in light mode.|
|`--color-text-muted`|`#64748B`|Secondary labels, timestamps, metadata.|

### 3.2 Visual Component Guidelines

- **Interactive Buttons:** `rounded-lg font-medium transition-all duration-150`. Primary buttons use `bg-[#10D08A] hover:bg-[#009F6B] text-black font-semibold shadow-sm`.
    
- **Cards:** Bordered minimal containers (`border border-[#21262D] bg-[#161B22] rounded-xl`).
    
- **Listing Type Badges:**
    
    - `DONATE`: `bg-[#10D08A]/15 text-[#10D08A] border border-[#10D08A]/30` (Mint).
        
    - `SWAP`: `bg-emerald-500/15 text-emerald-400 border border-emerald-500/30` (Emerald).
        
    - `SELL`: `bg-slate-700/30 text-slate-200 border border-slate-600/40` (Slate with bold currency).
        

## 4. Feature Roadmap & Page Prioritization

### Phase 1: High-Priority Core Pages (Build First)

1. **Add Listing Page (`/listings/create`):**
    
    - Multi-image upload direct to Supabase Storage bucket `listing-images`.
        
    - Title, description, category selector, condition picker (`NEW`, `LIKE_NEW`, `GOOD`, `USED`).
        
    - Dynamic intent toggle:
        
        - `DONATE`: Forces price to $0.00.
            
        - `SWAP`: Hides price, activates mandatory "Target Swap Item" text field.
            
        - `SELL`: Activates numeric price field.
            
    - Preset campus handoff location selector (e.g., "Library Lobby", "Student Union").
        
2. **Swap Hub (`/swap`):**
    
    - Exchange-exclusive directory (`listing_type = 'SWAP'`).
        
    - Reverse search: Filter items by what the owner _wants_ in exchange.
        
    - Dual item card display: Shows item offered alongside requested swap item.
        
3. **Buy & Free Directory (`/buy`):**
    
    - Marketplace for low-cost student items (`SELL`) and $0.00 giveaways (`DONATE`).
        
    - Price filters: `Donations Only ($0)`, `< $10`, `< $25`, custom range.
        
    - Direct contact handoff button (In-app chat or prefilled WhatsApp link).
        

### Phase 2: Administrative Control & Governance

1. **User Management (`/admin/users`):** Roster of registered students, status toggle (Active / Banned), campus email audit.
    
2. **Listings Moderation Queue (`/admin/listings`):** Review user-reported listings; one-click actions: `Approve / Dismiss Flag`, `Force Delist`.
    
3. **Audit Trails & Incident Logs (`/admin/audit-logs`):** Append-only table logging admin interventions, deletions, suspensions, and manual status updates.
    

### Phase 3: Sustainability Metrics Engine (`/impact`)

Aggregates circular economy impact metrics calculated when items are marked `COMPLETED`.

## 5. Sustainability Calculations & Data Model

Every completed listing triggers automated metrics logging without external data calls.

### 5.1 Category Constant Reference Table

|**Category Slug**|**Category Name**|**Average Unit Weight (Wavg​)**|**Baseline Retail Value (Vbase​)**|
|---|---|---|---|
|`textbooks`|Textbooks & Course Packs|**1.80 kg**|**$45.00**|
|`heavy-electronics`|Laptops & Heavy Tech|**2.20 kg**|**$250.00**|
|`small-electronics`|Calculators, Gear, Chargers|**0.45 kg**|**$30.00**|
|`dorm-appliances`|Kettles, Lamps, Fans|**2.50 kg**|**$35.00**|
|`lab-gear`|Lab Coats, Safety Goggles|**0.60 kg**|**$20.00**|
|`general`|Stationery & Miscellaneous|**0.80 kg**|**$10.00**|

### 5.2 Mathematical Formulation

- **Solid Waste Diverted ($W_{div}$):**
    
    $$W_{div} = \sum_{i=1}^{N} \text{Category Weight Constant}_i$$
    
- **Estimated Dollars Saved ($S_{usd}$):**
    
    - `DONATE`: $S = V_{base}$ (Seeker pays nothing for full retail value).
        
    - `SWAP`: $S = V_{base} \times 1.5$ (Both students avoid buying replacement goods).
        
    - `SELL`: $S = \max(0, V_{base} - \text{Resale Price})$ (Discount below retail).
        
- **Emissions Avoided ($E_{co2}$):**
    
    $$E_{co2} = W_{div} \times 2.0\text{ kg } CO_2e\text{ per kg diverted}$$
    

## 6. PostgreSQL Database Schema (Supabase)

SQL

```
-- 1. ENUMS
CREATE TYPE listing_type AS ENUM ('SELL', 'DONATE', 'SWAP');
CREATE TYPE listing_condition AS ENUM ('NEW', 'LIKE_NEW', 'GOOD', 'USED');
CREATE TYPE listing_status AS ENUM ('AVAILABLE', 'RESERVED', 'COMPLETED', 'ARCHIVED');
CREATE TYPE admin_action_type AS ENUM ('BAN_USER', 'UNBAN_USER', 'REMOVE_LISTING', 'RESTORE_LISTING', 'DISMISS_REPORT');

-- 2. PROFILES (Matches auth.users)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    university_email TEXT UNIQUE NOT NULL,
    phone_number TEXT,
    campus_location TEXT NOT NULL DEFAULT 'Main Campus',
    is_admin BOOLEAN NOT NULL DEFAULT FALSE,
    is_banned BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CATEGORIES
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    avg_weight_kg NUMERIC(6, 2) NOT NULL DEFAULT 1.00,
    avg_value_usd NUMERIC(10, 2) NOT NULL DEFAULT 20.00
);

-- 4. LISTINGS
CREATE TABLE listings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    category_id INT NOT NULL REFERENCES categories(id),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    listing_type listing_type NOT NULL,
    condition listing_condition NOT NULL,
    price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    swap_preference TEXT,
    images TEXT[] NOT NULL DEFAULT '{}',
    campus_spot TEXT NOT NULL DEFAULT 'Main Library Lobby',
    status listing_status NOT NULL DEFAULT 'AVAILABLE',
    views_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. CONVERSATIONS & MESSAGES
CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID REFERENCES listings(id) ON DELETE SET NULL,
    buyer_id UUID NOT NULL REFERENCES profiles(id),
    seller_id UUID NOT NULL REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_listing_conversation UNIQUE(listing_id, buyer_id, seller_id)
);

CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES profiles(id),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. SUSTAINABILITY LOGS
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

-- 7. REPORTS & AUDIT LOGS
CREATE TABLE listing_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    reporter_id UUID NOT NULL REFERENCES profiles(id),
    reason TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE admin_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID NOT NULL REFERENCES profiles(id),
    action admin_action_type NOT NULL,
    target_entity_type TEXT NOT NULL,
    target_entity_id UUID NOT NULL,
    reason_note TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. DATABASE TRIGGER: AUTOMATED IMPACT LOGGING
CREATE OR REPLACE FUNCTION log_transaction_impact()
RETURNS TRIGGER AS $$
DECLARE
    cat_weight NUMERIC(6, 2);
    cat_val NUMERIC(10, 2);
    calculated_savings NUMERIC(10, 2);
BEGIN
    IF NEW.status = 'COMPLETED' AND OLD.status != 'COMPLETED' THEN
        SELECT avg_weight_kg, avg_value_usd INTO cat_weight, cat_val
        FROM categories WHERE id = NEW.category_id;

        IF NEW.listing_type = 'DONATE' THEN
            calculated_savings := cat_val;
        ELSIF NEW.listing_type = 'SWAP' THEN
            calculated_savings := cat_val * 1.5;
        ELSIF NEW.listing_type = 'SELL' THEN
            calculated_savings := GREATEST(0, cat_val - NEW.price);
        END IF;

        INSERT INTO transaction_impact_logs (
            listing_id, seller_id, category_id, transaction_type, waste_diverted_kg, money_saved_estimated
        ) VALUES (
            NEW.id, NEW.user_id, NEW.category_id, NEW.listing_type, cat_weight, calculated_savings
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_listing_completed
AFTER UPDATE ON listings
FOR EACH ROW
EXECUTE FUNCTION log_transaction_impact();
```

## 7. Feature-Driven File Tree

Agents must strictly place code into these specified paths:

Plaintext

```
we-swap/
├── public/
│   ├── brand/
│   │   ├── logo.svg
│   │   └── favicon.ico
│   └── placeholders/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── (main)/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── swap/page.tsx
│   │   │   ├── buy/page.tsx
│   │   │   ├── listings/
│   │   │   │   ├── create/page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   ├── chat/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   ├── impact/page.tsx
│   │   │   └── profile/page.tsx
│   │   ├── admin/
│   │   │   ├── layout.tsx
│   │   │   ├── users/page.tsx
│   │   │   ├── listings/page.tsx
│   │   │   └── audit-logs/page.tsx
│   │   ├── api/
│   │   │   └── webhooks/route.ts
│   │   ├── globals.css
│   │   └── layout.tsx
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   ├── login-form.tsx
│   │   │   │   └── register-form.tsx
│   │   │   └── actions.ts
│   │   ├── listings/
│   │   │   ├── components/
│   │   │   │   ├── listing-card.tsx
│   │   │   │   ├── listing-grid.tsx
│   │   │   │   ├── listing-filters.tsx
│   │   │   │   ├── image-uploader.tsx
│   │   │   │   └── create-listing-form.tsx
│   │   │   ├── actions.ts
│   │   │   └── types.ts
│   │   ├── chat/
│   │   │   ├── components/
│   │   │   │   ├── conversation-list.tsx
│   │   │   │   ├── chat-window.tsx
│   │   │   │   ├── message-bubble.tsx
│   │   │   │   └── safe-meetup-picker.tsx
│   │   │   ├── hooks/
│   │   │   │   └── use-chat.ts
│   │   │   └── actions.ts
│   │   ├── sustainability/
│   │   │   ├── components/
│   │   │   │   ├── metric-card.tsx
│   │   │   │   ├── category-breakdown.tsx
│   │   │   │   └── sdg-badge-group.tsx
│   │   │   ├── actions.ts
│   │   │   └── utils.ts
│   │   └── admin/
│   │       ├── components/
│   │       │   ├── moderation-table.tsx
│   │       │   ├── user-management-row.tsx
│   │       │   └── audit-log-viewer.tsx
│   │       └── actions.ts
│   │
│   ├── components/
│   │   ├── ui/                         # shadcn/ui primitives
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   └── tabs.tsx
│   │   └── layout/
│   │       ├── navbar.tsx
│   │       ├── user-nav.tsx
│   │       └── footer.tsx
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts               # createBrowserClient
│   │   │   ├── server.ts               # createServerClient (cookies)
│   │   │   └── middleware.ts           # updateSession handler
│   │   ├── constants.ts                # Campus meetup locations & category seeds
│   │   └── utils.ts                    # cn() helper
│   │
│   ├── hooks/
│   │   └── use-debounce.ts
│   │
│   └── types/
│       └── database.types.ts           # Supabase auto-generated schema types
│
├── .env.example
├── components.json
├── next.config.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 7. Agent Coding Rules & Conventions

When contributing code to We-Swap, all AI agents must follow these standards:

1. **Server Components by Default:** Keep components as React Server Components (RSC) unless interactivity (hooks, state, event listeners) requires `'use client'`.
    
2. **Mutations via Server Actions:** Execute database mutations using Server Actions located within the relevant feature directory (`src/features/[feature]/actions.ts`), rather than creating standalone REST API routes.
    
3. **No Direct `any` Types:** Use generated Supabase types (`src/types/database.types.ts`). Explicitly define parameters and return types.
    
4. **Style Consistency:** Rely on the provided CSS token aliases (`text-primary-mint`, `bg-surface-dark`, `border-border-dark`). Do not invent arbitrary hex codes.
    
5. **Direct Image Uploads:** Upload images from the client straight to Supabase Storage (`listing-images`) using `supabase.storage.from('listing-images').upload(...)` to avoid streaming multi-megabyte payloads through Next.js server memory.
    
6. **WhatsApp Handshake Utility:** When generating direct external connection links, use the standard format:
    
    TypeScript
    
    ```
    export function getWhatsAppHandshakeUrl(phone: string, title: string, spot: string) {
      const text = encodeURIComponent(
        `Hi! I saw your listing "${title}" on We-Swap. Is it still available to meet at ${spot}?`
      );
      return `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${text}`;
    }
    ```