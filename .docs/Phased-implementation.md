## Phased Implementation Roadmap for We-Swap

Follow these six ordered phases to build the platform progressively without broken dependencies or rework.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        IMPLEMENTATION PHASES                           │
│                                                                        │
│  Phase 1: Foundation, Design Tokens & Supabase Infrastructure          │
│       │                                                                │
│       ▼                                                                │
│  Phase 2: Authentication & Student Profiles                            │
│       │                                                                │
│       ▼                                                                │
│  Phase 3: The Add Listing Flow & Client Media Ingestion                │
│       │                                                                │
│       ▼                                                                │
│  Phase 4: Swap & Buy Directories + Handshake Bridge                    │
│       │                                                                │
│       ▼                                                                │
│  Phase 5: Automated Sustainability Impact Engine                       │
│       │                                                                │
│       ▼                                                                │
│  Phase 6: Moderation, Audit Trails & Admin Console                     │
└────────────────────────────────────────────────────────────────────────┘
```

### Phase 1: Foundation, Design Tokens & Supabase Infrastructure

- **Objective:** Establish the runtime shell, design system variables, UI components, and Supabase client bindings.
    
- **Deliverables:**
    
    - Initialize Next.js 15 App Router with React 19 and TypeScript.
        
    - Configure `tailwind.config.ts` and `src/app/globals.css` with color variables:
        
        - Primary Mint (`#10D08A`)
            
        - Primary Emerald (`#009F6B`)
            
        - Dark Accent (`#0B4F3A`)
            
        - Canvas Dark (`#0D1117`)
            
        - Surface Dark (`#161B22`)
            
        - Border Dark (`#21262D`)
            
        - Canvas Light (`#F8FAFC`)
            
    - Install `shadcn/ui` primitives: `button`, `card`, `badge`, `dialog`, `input`, `select`, `tabs`, `textarea`.
        
    - Create Supabase utility clients:
        
        - `src/lib/supabase/client.ts` (`createBrowserClient`)
            
        - `src/lib/supabase/server.ts` (`createServerClient` using `cookies`)
            
        - `src/lib/supabase/middleware.ts` (session refresh)
            
    - Set up public storage bucket: `listing-images` with public read access.
        

### Phase 2: Authentication & Student Profiles

- **Objective:** Enable student onboarding and establish user profile data.
    
- **Deliverables:**
    
    - Build `src/features/auth/components/login-form.tsx` and `register-form.tsx`.
        
    - Implement `src/features/auth/actions.ts` (`signUp`, `signIn`, `signOut`).
        
    - Add automatic profile insertion via Postgres trigger on `auth.users` creation.
        
    - Build the global navigation bar (`src/components/layout/navbar.tsx`) displaying the We-Swap emblem, auth state, search input (`Ctrl + K`), and the `+ List an Item` CTA.
        
    - Implement route protection middleware for private paths (`/listings/create`, `/chat`, `/admin/*`).
        

### Phase 3: The Add Listing Flow & Media Ingestion

- **Objective:** Deliver the listing creation flow, allowing students to publish items.
    
- **Deliverables:**
    
    - Build client-side image uploader (`src/features/listings/components/image-uploader.tsx`) uploading directly to the Supabase `listing-images` bucket.
        
    - Build `src/features/listings/components/create-listing-form.tsx`:
        
        - Title, description, category selector, condition picker.
            
        - Dynamic intent switcher:
            
            - `DONATE`: Sets price to 0.00.
                
            - `SWAP`: Hides price, requires `swap_preference`.
                
            - `SELL`: Displays numeric price field.
                
        - Campus safe meetup spot selector (populated from `src/lib/constants.ts`).
            
    - Implement Server Action `createListing` in `src/features/listings/actions.ts`.
        
    - Mount the form on `/listings/create`.
        

### Phase 4: Core Discovery Hubs (Swap & Buy) + Handshake Bridge

- **Objective:** Deploy the core discovery interfaces and communication handshakes.
    
- **Deliverables:**
    
    - Build reusable components: `listing-card.tsx`, `listing-grid.tsx`, and `listing-filters.tsx`.
        
    - Build **Swap Hub** (`src/app/(main)/swap/page.tsx`):
        
        - Filtered by `listing_type = 'SWAP'`.
            
        - Dual-intent card layout (displays item offered alongside the requested swap item).
            
        - Reverse wishlist search filter.
            
    - Build **Buy & Donate Hub** (`src/app/(main)/buy/page.tsx`):
        
        - Filtered by `listing_type IN ('SELL', 'DONATE')`.
            
        - Quick filter chips: `$0 Free Only`, `< $10`, `< $25`.
            
    - Build Single Listing View (`src/app/(main)/listings/[id]/page.tsx`):
        
        - Image gallery, condition badge, owner profile info, and safe meetup point badge.
            
        - WhatsApp direct link button via `getWhatsAppHandshakeUrl(phone, title, spot)`.
            
        - In-app chat starter creating a record in `conversations`.
            

### Phase 5: Automated Sustainability Impact Engine

- **Objective:** Aggregate and visualize campus environmental metrics.
    
- **Deliverables:**
    
    - Implement `markListingCompleted` Server Action (updates status to `COMPLETED`).
        
    - Verify the PostgreSQL trigger `log_transaction_impact()` populates `transaction_impact_logs` automatically.
        
    - Build `src/features/sustainability/actions.ts` fetching aggregated totals (`SUM(waste_diverted_kg)`, `SUM(money_saved_estimated)`, `COUNT(*)`).
        
    - Build the `/impact` page:
        
        - Metric counter cards (`src/features/sustainability/components/metric-card.tsx`).
            
        - Category weight breakdown (`category-breakdown.tsx`).
            
        - SDG alignment badges (`sdg-badge-group.tsx` highlighting SDG 12 & 13).
            

### Phase 6: Moderation, Audit Trails & Admin Console

- **Objective:** Provide campus administrators with moderation and governance tools.
    
- **Deliverables:**
    
    - Build `src/features/admin/components/moderation-table.tsx` (`/admin/listings`):
        
        - Table of reported listings with report reasons.
            
        - Actions: `Dismiss Report` or `Force Delist`.
            
    - Build User Management view (`/admin/users`):
        
        - Roster of registered users with one-click `Ban / Unban` toggles.
            
    - Implement append-only logging to `admin_audit_logs` on all moderation actions.
        
    - Build Audit Viewer (`/admin/audit-logs`) displaying the chronological history of administrative actions.