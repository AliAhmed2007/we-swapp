
# We-Swap: Feature Prioritization & Systems Architecture

This document organizes development priorities by delivery tier and explains the data model behind the platform's sustainability calculations.

## Part 1: Feature Prioritization Matrix

```
┌────────────────────────────────────────────────────────────────────────┐
│                        DEVELOPMENT ROADMAP                             │
│                                                                        │
│  [PHASE 1: CRITICAL CORE]                                              │
│   ├── 1. Item Listing Creation Wizard (/listings/create)               │
│   ├── 2. Swap Hub (/swap)                                              │
│   └── 3. Buy & Free Resale Hub (/buy)                                  │
│                                                                        │
│  [PHASE 2: TRUST & ADMINISTRATION]                                     │
│   ├── User Management & Verification                                   │
│   ├── Listing Moderation Queue                                         │
│   ├── Audit Logs & Transaction Ledger                                  │
│   └── Incident Action Logger                                           │
│                                                                        │
│  [PHASE 3: SUSTAINABILITY DASHBOARD]                                   │
│   ├── Aggregated Environmental Metrics                                 │
│   ├── Category-Specific Emissions Modeler                              │
│   └── Campus SDG Report Exporter                                       │
│                                                                        │
│  [PHASE 4: EXPANSION FEATURES]                                         │
│   ├── Internal Realtime Chat                                           │
│   ├── User Reputation Badges & Hall of Fame                            │
│   └── Saved Searches & Custom Notifications                            │
└────────────────────────────────────────────────────────────────────────┘
```

## Part 2: Detailed Phase Breakdown

### Phase 1: High-Priority Pages (The Core Engine)

These three screens form the minimum viable product (MVP), enabling users to list items, offer trades, and purchase or claim donated goods.

#### 1. Add Listing Page (`/listings/create`)

The intake form for adding items to the campus catalog.

- **Media Ingestion:**
    
    - Client-side compression before uploading to the Supabase `listing-images` storage bucket.
        
    - Drag-and-drop support for up to 4 photos, with the first assigned as the primary display image.
        
- **Metadata & Categorization:**
    
    - Title, text description, category picker (Textbooks, Electronics, Dorm, Clothing, Tools).
        
    - Condition selection (`Brand New`, `Like New`, `Good`, `Fair`).
        
- **Dynamic Intent Switcher:**
    
    - **Swap Toggle:** Hides the price input and reveals a required trade preference field (e.g., _"Looking for Physics 101 or Chem Lab Kit"_).
        
    - **Sell Toggle:** Shows a numeric price field with an optional original price to calculate student savings.
        
    - **Donate Toggle:** Automatically sets the price to $0.00 and applies a free donation badge.
        
- **Campus Handoff Location:**
    
    - Dropdown of verified campus meetup locations (Main Library, Student Union, Building A Lobby, Campus North Gate).
        

#### 2. Swap Page (`/swap`)

Dedicated exchange catalog for non-monetary trades.

- **Dual-View Cards:** Displays both the offered item and the user's requested item side by side.
    
- **Reverse Swap Filter:** Enables users to search by what the owner _wants_ in return, helping them trade items they currently own.
    
- **One-Click Handshake Contact:** Launches a direct WhatsApp conversation or in-app message containing item and swap details.
    

#### 3. Buy & Free Donation Page (`/buy`)

The marketplace for direct cash purchases and free donations.

- **Affordability Filters:** Quick filters for `$0 (Donations Only)`, `< $10`, `< $25`, and `Custom Range`.
    
- **Condition & Campus Zone Filters:** Filter items by physical condition and pickup building.
    
- **Direct Seller Connection:** Contact button linking buyers directly to sellers without an in-app payment gateway or middleman fees.
    

### Phase 2: Administrative Control & Governance

Administrative features maintain safety, prevent fraud, and record system activity.

#### 1. User Management (`/admin/users`)

- **Student Roster:** Searchable list of all registered accounts displaying `.edu` email, campus location, and creation date.
    
- **Access Control:** Suspend or ban bad actors with a single click, immediately revoking active sessions.
    
- **Verification Status:** View student verification tags and monitor suspicious account activity.
    

#### 2. Listing Moderation Queue (`/admin/listings`)

- **Report Inbox:** Centralized queue of items flagged by students for misleading descriptions, inappropriate content, or prohibited goods.
    
- **Review Interface:** Side-by-side view of the report reason alongside item photos and details.
    
- **Moderation Actions:**
    
    - `Approve & Clear Flag`: Resolves report and keeps the listing active.
        
    - `Force Delist`: Removes the listing from the feed and notifies the owner.
        

#### 3. Audit Logs & System Action Trails (`/admin/audit-logs`)

- **Immutable Activity Log:** Tracks administrative actions, listing status changes, user bans, and resolved reports.
    
- **Log Schema:** Records `timestamp`, `actor_id`, `action_type`, `target_entity_id`, and `metadata_diff`.
    

### Phase 3: Sustainability Metrics Page

Tracks environmental impact and cost savings, translating everyday exchanges into metrics for campus accreditation and sustainability reporting.

#### Features

- **Live Campus Ticker:** Displays real-time counts for items diverted, estimated kilograms of waste avoided, and money saved.
    
- **Impact by Category:** Bar charts breaking down diversion numbers across textbooks, electronics, and household goods.
    
- **SDG Tracker:** Visual summary of contributions to UN Sustainable Development Goals 12 (Responsible Consumption) and 13 (Climate Action).
    
- **Export Tool:** One-click CSV/PDF export of semester sustainability metrics for university administrators.
    

### Phase 4: Supporting Features

Non-critical features scheduled for post-MVP releases:

- **Internal Realtime Chat:** Built-in messaging alternative to WhatsApp.
    
- **Reputation Badges:** "Super Swapper" indicators for reliable, highly rated students.
    
- **Saved Search Alerts:** Email notifications for newly listed items matching specific keywords.
    

## Part 3: Sustainability Metrics Deep Dive

### 1. Conceptual Framework

Campus waste operates on a linear consumption model: students buy new goods each semester, use them briefly, and discard them during graduation or move-outs.

```
Linear Model (Traditional):
Raw Materials ──> Manufacturing ──> Packaging ──> Shipping ──> Student ──> Landfill

Circular Model (We-Swap):
Student A ─────────────── Handshake on Campus ───────────────> Student B
                  [Zero Packaging & Transport]
```

When an item is exchanged through We-Swap, it produces three measurable impacts:

1. **Direct Solid Waste Diversion:** Diverts physical materials (paper, plastics, silicon, metals) from local landfills.
    
2. **Avoided Upstream Emissions ($CO_2e$):** Eliminates the greenhouse gas emissions required to manufacture, package, and transport a brand-new replacement product.
    
3. **Preserved Economic Capital:** Retains money within the student community by avoiding new purchases.
    

### 2. Concrete Calculations & Baselines

Metrics update automatically when a listing owner marks an item as **`Completed`**.

#### Solid Waste Avoided ($W_{diverted}$)

Uses fixed, industry-standard average unit weights by category:

$$W_{diverted} = \sum (\text{Items Completed in Category}_i \times \text{Average Weight}_i)$$

|**Category**|**Average Weight**|**Baseline Source & Material Makeup**|
|---|---|---|
|**Textbooks & Course Packs**|**1.80 kg**|High-density pulp, paper stock, hardcover binding|
|**Laptops & Heavy Electronics**|**2.20 kg**|Circuit boards, aluminum casing, lithium components|
|**Small Electronics & Accessories**|**0.45 kg**|Graphing calculators, chargers, lab sensors, copper/plastics|
|**Dorm Living & Small Appliances**|**2.50 kg**|Desk lamps, electric kettles, fans, mini-heaters|
|**Lab Attire & Clothing**|**0.60 kg**|Cotton/poly lab coats, specialized campus attire|

_Example:_ Exchanging 50 textbooks and 20 graphing calculators prevents:

$$(50 \times 1.80) + (20 \times 0.45) = 90 + 9 = 99\text{ kg of solid waste}$$

#### Avoided Greenhouse Gas Emissions ($E_{avoided}$)

Calculates avoided lifecycle emissions ($CO_2$ equivalent) from raw material extraction, factory assembly, and freight transportation:

$$E_{avoided} = \sum (\text{Items Completed in Category}_i \times \text{Emission Factor}_i)$$

- **Electronics:** Avoids an estimated **$25.0\text{ to }45.0\text{ kg } CO_2e$** per functional device (electronics carry high manufacturing carbon footprints).
    
- **Textbooks & Paper:** Avoids an estimated **$1.8\text{ kg } CO_2e\text{ per kg}$** of virgin paper production, equating to roughly **$3.24\text{ kg } CO_2e$** per reused textbook.
    
- **General Commodities:** Avoids roughly **$2.0\text{ kg } CO_2e\text{ per kg}$** of manufactured product weight.
    

#### Estimated Financial Capital Preserved ($S_{financial}$)

Measures student savings from donations, trades, and discounted purchases:

- **For Donations (`DONATE`):** Full estimated replacement value (MSRP) is saved:
    
    $$S = \text{Average Category Market Value}$$
    
- **For Trades (`SWAP`):** Both students avoid purchasing new equivalents:
    
    $$S = 2 \times \text{Average Category Market Value}$$
    
- **For Resale (`SELL`):** Savings equal the difference between retail price and platform price:
    
    $$S = \max(0, \text{Average Market Value} - \text{Resale Price})$$
    

### 3. Database Execution Pattern

The metrics engine avoids complex calculations by using an aggregation trigger whenever an item is marked as completed.

SQL

```
-- Trigger executed upon item completion
CREATE OR REPLACE FUNCTION log_transaction_impact()
RETURNS TRIGGER AS $$
DECLARE
    cat_weight NUMERIC(6, 2);
    cat_val NUMERIC(10, 2);
    calculated_savings NUMERIC(10, 2);
BEGIN
    IF NEW.status = 'COMPLETED' AND OLD.status != 'COMPLETED' THEN
        -- 1. Fetch category constants
        SELECT avg_weight_kg, avg_value_usd 
        INTO cat_weight, cat_val
        FROM categories WHERE id = NEW.category_id;

        -- 2. Determine financial savings based on transaction type
        IF NEW.listing_type = 'DONATE' THEN
            calculated_savings := cat_val;
        ELSIF NEW.listing_type = 'SWAP' THEN
            calculated_savings := cat_val * 1.5; -- Mutual trade value
        ELSIF NEW.listing_type = 'SELL' THEN
            calculated_savings := GREATEST(0, cat_val - NEW.price);
        END IF;

        -- 3. Insert immutable impact entry
        INSERT INTO transaction_impact_logs (
            listing_id,
            seller_id,
            category_id,
            transaction_type,
            waste_diverted_kg,
            money_saved_estimated
        ) VALUES (
            NEW.id,
            NEW.user_id,
            NEW.category_id,
            NEW.listing_type,
            cat_weight,
            calculated_savings
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

### 4. Admin Audit & Action Logs Table

SQL

```
CREATE TYPE admin_action_type AS ENUM (
    'BAN_USER',
    'UNBAN_USER',
    'REMOVE_LISTING',
    'RESTORE_LISTING',
    'DISMISS_REPORT',
    'RESOLVE_REPORT'
);

CREATE TABLE admin_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID NOT NULL REFERENCES profiles(id),
    action admin_action_type NOT NULL,
    target_entity_type TEXT NOT NULL, -- 'USER' or 'LISTING'
    target_entity_id UUID NOT NULL,
    reason_note TEXT,
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for administrative query performance
CREATE INDEX idx_admin_logs_target ON admin_audit_logs(target_entity_id);
CREATE INDEX idx_admin_logs_created ON admin_audit_logs(created_at DESC);
```