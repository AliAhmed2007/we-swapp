# We-Swap 🔄🌱

> **Reuse • Exchange • Connect**
> 
> A hyper-localized, campus-first circular economy web platform designed for university students to swap, donate, and resell items with zero friction, zero fees, and measurable environmental impact.

## 📖 Table of Contents

1. [Project Overview](https://www.google.com/search?q=%23-project-overview)
    
2. [Key Problem & Solution](https://www.google.com/search?q=%23-key-problem--solution)
    
3. [Core Philosophy & Architecture Principles](https://www.google.com/search?q=%23-core-philosophy--architecture-principles)
    
4. [Primary Features](https://www.google.com/search?q=%23-primary-features)
    
5. [Brand Identity & Design System](https://www.google.com/search?q=%23-brand-identity--design-system)
    
6. [Tech Stack](https://www.google.com/search?q=%23-tech-stack)
    
7. [Automated Sustainability Engine](https://www.google.com/search?q=%23-automated-sustainability-engine)
    
8. [Folder Structure](https://www.google.com/search?q=%23-folder-structure)
    
9. [Database Schema (PostgreSQL)](https://www.google.com/search?q=%23-database-schema-postgresql)
    
10. [Getting Started & Local Setup](https://www.google.com/search?q=%23-getting-started--local-setup)
    
11. [Roadmap & Phased Rollout](https://www.google.com/search?q=%23-roadmap--phased-rollout)
    

## 📌 Project Overview

**We-Swap** is an open-source, web-based platform tailored specifically for university campus communities. Rather than discarding used textbooks, electronics, dorm essentials, lab equipment, or clothing, students can easily list their items for peer-to-peer circulation.

The platform provides a decentralized exchange space that eliminates middleman markups, avoids courier logistics, and tracks aggregated physical waste diversion alongside economic savings.

## ⚡ Key Problem & Solution

### The Campus Dilemma

- **Environmental Strain:** At the end of every semester, functional textbooks, monitors, furniture, and stationery are discarded into local landfills.
    
- **Financial Burden:** Freshmen and returning students spend substantial money on brand-new course materials and dorm supplies that seniors no longer use.
    
- **Logistical Friction:** Mainstream classified sites (e.g., Craigslist, Facebook Marketplace) carry trust concerns, lack campus context, and involve complicated shipping or off-campus travel.
    

### The We-Swap Solution

- **Verified Campus Community:** Accessible within university boundaries using student email credentials.
    
- **Direct Handshake Model:** All exchanges happen in person at designated campus safe meeting spots (e.g., Main Library, Student Union, Building A Lobby).
    
- **Zero Payment Gateway Overhead:** Purchases are paid directly via cash or peer-to-peer mobile apps, avoiding payment processing fees and escrow systems.
    
- **Quantified Sustainability:** Transactions automatically populate a real-time campus dashboard showing total waste diverted and financial capital retained.
    

## 🎯 Core Philosophy & Architecture Principles

- **Pragmatic & Fast (MVP First):** Zero overengineering. No distributed microservices, separate backend repos, or Docker orchestration required for simple deployments.
    
- **Zero AI / Zero ML Complexity:** No expensive LLM APIs, embeddings, or computer-vision defect assessors. Discovery runs on indexed PostgreSQL queries and simple client-side form controls.
    
- **BaaS-Native Velocity:** Built on Next.js 15 and Supabase (PostgreSQL, Auth, Storage, and Realtime subscriptions) for reliable, serverless execution.
    
- **Feature-Driven Colocation:** Code is grouped strictly by domain modules (`src/features/*`), keeping pages thin and business logic encapsulated.
    

## ✨ Primary Features

### 1. Unified Listing Wizard (`/listings/create`)

- **Multi-Intent Switcher:**
    
    - **Swap (`SWAP`):** Removes price inputs and prompts for trade wishes (e.g., _"Looking for Physics 101 or Lab Kit"_).
        
    - **Donate (`DONATE`):** Locks the price to `$0.00` and displays a high-visibility green gift badge.
        
    - **Sell (`SELL`):** Enforces an affordable student price cap.
        
- **Direct Image Uploads:** Direct-to-bucket client uploads to Supabase Storage (`listing-images`) to keep web dynos lightweight.
    
- **Campus Safe Meetup Selector:** Dropdown menu of pre-approved, high-foot-traffic campus spots.
    

### 2. Dedicated Hubs

- **The Swap Hub (`/swap`):** Dual-card layout showing the item offered alongside the requested exchange item, complete with reverse wishlist filtering.
    
- **Buy & Free Directory (`/buy`):** Faceted filtering for `$0 Free Only`, `< $10`, `< $25`, and item condition (`New`, `Like New`, `Good`, `Fair`).
    

### 3. Contact & Handshake Bridge

- **WhatsApp Quick Bridge:** Generates pre-formatted WhatsApp chat links with populated listing context and pickup spot recommendations.
    
- **In-App Realtime Messaging:** Native messaging powered by Supabase Realtime channel subscriptions for students who prefer internal messaging.
    

### 4. Campus Sustainability Dashboard (`/impact`)

- Live statistics displaying:
    
    - Total items diverted from landfills.
        
    - Total weight of physical waste avoided (kg).
        
    - Estimated student financial savings ($).
        
    - Category distribution breakdowns aligned with **UN SDG 12** (Responsible Consumption) and **UN SDG 13** (Climate Action).
        

### 5. Administrative Moderation & Audit Console (`/admin`)

- **User Management:** Verify student credentials, monitor activity, or ban policy violators.
    
- **Listing Moderation:** Review flagged listings with quick options to `Approve` or `Force Delist`.
    
- **Audit Trails:** Append-only activity logs capturing moderator actions and status changes.
    

## 🎨 Brand Identity & Design System

The visual design is inspired by the **We-Swap** emblem: modern tech slate, clean white typography, and mint-to-emerald looping circuit arrows.

|**Token Name**|**Hex Code**|**UI Role**|
|---|---|---|
|**Primary Mint**|`#10D08A`|Primary CTAs, active pills, donate badges, success states|
|**Primary Emerald**|`#009F6B`|Button hover states, gradient accents, borders|
|**Primary Forest**|`#0B4F3A`|Subtle card borders, badge container backdrops|
|**Brand White**|`#FFFFFF`|Primary headers, clean surfaces, contrast typography|
|**Canvas Dark**|`#0D1117`|High-contrast dark tech background|
|**Surface Dark**|`#161B22`|Cards, popovers, dropdowns, modal windows|
|**Border Dark**|`#21262D`|Divider lines and container outlines|
|**Canvas Light**|`#F8FAFC`|Clean light mode background|
|**Text Primary (Light)**|`#0F172A`|Primary typography in light mode|
|**Text Muted**|`#64748B`|Timestamps, metadata, and placeholder text|

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://www.google.com/search?q=https://nextjs.org/) (App Router, React Server Components)
    
- **Frontend Library:** [React 19](https://www.google.com/search?q=https://react.dev/) + React DOM 19
    
- **Language:** TypeScript 5.x (Strict mode)
    
- **Styling & UI:** [Tailwind CSS](https://www.google.com/search?q=https://tailwindcss.com/) + [shadcn/ui](https://www.google.com/search?q=https://ui.shadcn.com/) (Radix UI primitives)
    
- **Icons:** [Lucide React](https://www.google.com/search?q=https://lucide.dev/)
    
- **Backend as a Service:** [Supabase](https://www.google.com/search?q=https://supabase.com/)
    
    - **Database:** PostgreSQL (with triggers & views)
        
    - **Authentication:** Supabase Auth (Email / Magic Link)
        
    - **Storage:** Supabase Storage (`listing-images` bucket)
        
    - **Realtime:** Postgres Change Subscriptions via WebSockets
        
- **Deployment:** [Vercel](https://www.google.com/search?q=https://vercel.com/)
    

## 📊 Automated Sustainability Engine

Whenever an item owner toggles a listing status to **`COMPLETED`**, a PostgreSQL database trigger calculates and logs the environmental savings using category constants:

### Category Constants Table

|**Category**|**Slug**|**Average Weight (Wavg​)**|**Baseline Value (Vbase​)**|
|---|---|---|---|
|**Textbooks & Course Packs**|`textbooks`|**1.80 kg**|**$45.00**|
|**Heavy Electronics & Laptops**|`heavy-electronics`|**2.20 kg**|**$250.00**|
|**Small Electronics & Accessories**|`small-electronics`|**0.45 kg**|**$30.00**|
|**Dorm Living & Small Appliances**|`dorm-appliances`|**2.50 kg**|**$35.00**|
|**Lab Attire & Clothing**|`lab-gear`|**0.60 kg**|**$20.00**|
|**General Items & Stationery**|`general`|**0.80 kg**|**$10.00**|

### Mathematical Model

- **Waste Diverted:**
    
    $$\text{Waste Diverted (kg)} = \sum W_{avg}$$
    
- **Carbon Emissions Avoided ($CO_2e$):**
    
    $$\text{Carbon Avoided} = \text{Waste Diverted (kg)} \times 2.0\text{ kg } CO_2e/\text{kg}$$
    
- **Economic Savings:**
    
    - `DONATE`: $\text{Savings} = V_{base}$
        
    - `SWAP`: $\text{Savings} = V_{base} \times 1.5$ (accounting for trade utility)
        
    - `SELL`: $\text{Savings} = \max(0, V_{base} - \text{Resale Price})$
        

## 📂 Folder Structure

We-Swap follows a clean **feature-driven** architecture:

Plaintext

```
we-swap/
├── public/
│   ├── brand/               # SVG logo and icons
│   └── placeholders/
├── src/
│   ├── app/                 # Next.js App Router (thin route wrappers)
│   │   ├── (auth)/          # /login, /register
│   │   ├── (main)/          # /, /swap, /buy, /listings/*, /chat/*, /impact, /profile
│   │   ├── admin/           # /admin/users, /admin/listings, /admin/audit-logs
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── features/            # Feature-driven domain modules
│   │   ├── auth/            # Auth forms and server actions
│   │   ├── listings/        # Listing forms, grid, filters, and mutations
│   │   ├── chat/            # Realtime chat client, hooks, and inbox
│   │   ├── sustainability/  # Metrics cards, category breakdowns, and math utilities
│   │   └── admin/           # Moderation queue and audit log visualizers
│   ├── components/
│   │   ├── ui/              # shadcn/ui components (button, card, dialog, etc.)
│   │   └── layout/          # Global navbar, user navigation, and footer
│   ├── lib/
│   │   ├── supabase/        # Browser, server, and middleware clients
│   │   ├── constants.ts     # Campus safe zones, category constants
│   │   └── utils.ts         # cn() utility and WhatsApp link generator
│   └── types/
│       └── database.types.ts# Supabase generated database types
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

## 🗄️ Database Schema (PostgreSQL)

SQL

```
-- Enums
CREATE TYPE listing_type AS ENUM ('SELL', 'DONATE', 'SWAP');
CREATE TYPE listing_condition AS ENUM ('NEW', 'LIKE_NEW', 'GOOD', 'USED');
CREATE TYPE listing_status AS ENUM ('AVAILABLE', 'RESERVED', 'COMPLETED', 'ARCHIVED');
CREATE TYPE admin_action_type AS ENUM ('BAN_USER', 'UNBAN_USER', 'REMOVE_LISTING', 'RESTORE_LISTING', 'DISMISS_REPORT');

-- Profiles
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

-- Categories
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    avg_weight_kg NUMERIC(6, 2) NOT NULL DEFAULT 1.00,
    avg_value_usd NUMERIC(10, 2) NOT NULL DEFAULT 20.00
);

-- Listings
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

-- Realtime Messaging
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

-- Automated Impact Logging Table
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

-- Moderation & Audits
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
```

## 🚀 Getting Started & Local Setup

### 1. Prerequisites

- [Node.js](https://www.google.com/search?q=https://nodejs.org/) (version 20+ recommended)
    
- A [Supabase](https://www.google.com/search?q=https://supabase.com/) project
    

### 2. Clone Repository & Install Dependencies

Bash

```
git clone https://github.com/your-org/we-swap.git
cd we-swap

npm install next@15.5.27 react@19.0.0 react-dom@19.0.0
npm install @supabase/ssr @supabase/supabase-js lucide-react clsx tailwind-merge
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

Code snippet

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Database Setup

1. Open your Supabase project dashboard and navigate to the **SQL Editor**.
    
2. Run the provided database schema script to create tables, enums, and triggers.
    
3. Open **Storage** in the Supabase dashboard and create a public bucket named `listing-images`.
    
4. Ensure public read access is enabled for `listing-images` so uploaded images are visible to users.
    

### 5. Start the Development Server

Bash

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 📅 Roadmap & Phased Rollout

- [x] **Phase 1: Foundations** — Design system tokens, Tailwind setup, layout, and Supabase client bindings.
    
- [x] **Phase 2: Authentication** — Student email verification, session management, and profile creation.
    
- [ ] **Phase 3: Core Listings Engine** — Multi-image upload and creation wizard (`/listings/create`).
    
- [ ] **Phase 4: Discovery Hubs** — Swap hub (`/swap`) and Buy/Donate directory (`/buy`).
    
- [ ] **Phase 5: Automated Sustainability Engine** — Transaction completion hooks and impact metrics dashboard (`/impact`).
    
- [ ] **Phase 6: Moderation & Governance** — Reporting queue, admin console, and system audit logs (`/admin`).
    

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](https://www.google.com/search?q=LICENSE) file for details.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
