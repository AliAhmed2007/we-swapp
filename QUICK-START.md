# We-Swap Quick Start Guide

## 🎯 Phase 1 Complete!

All foundation files have been generated. Follow these steps to get started:

---

## 1️⃣ Install Dependencies

Run the PowerShell installation script:

```powershell
.\install-dependencies.ps1
```

Or manually install packages:

```bash
npm install @supabase/supabase-js @supabase/ssr clsx tailwind-merge class-variance-authority tailwindcss-animate lucide-react
```

---

## 2️⃣ Set Up Supabase

### Create Project
1. Visit [supabase.com](https://supabase.com)
2. Create a new project named "we-swap"
3. Note your **Project URL** and **anon key**

### Configure Environment
1. Copy the template:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

---

## 3️⃣ Start Development Server

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 📂 What Was Created

### ✅ Configuration
- `tailwind.config.ts` - Custom Mint/Emerald theme
- `src/app/globals.css` - Tailwind with dark mode
- `middleware.ts` - Authentication middleware

### ✅ Utilities
- `src/lib/constants.ts` - Categories, conditions, meetup zones
- `src/lib/utils.ts` - Helper functions (cn, WhatsApp, formatters)

### ✅ Supabase Integration
- `src/lib/supabase/client.ts` - Browser client
- `src/lib/supabase/server.ts` - Server client  
- `src/lib/supabase/middleware.ts` - Session refresh
- `src/types/supabase.ts` - TypeScript types

### ✅ UI Components
- `src/components/layout/navbar.tsx` - Responsive navigation
- Updated `src/app/layout.tsx` - Root layout with navbar

---

## 🎨 Using the Theme

### Colors in Tailwind
```tsx
// Primary brand colors
<div className="bg-mint text-white">
<button className="bg-emerald hover:bg-mint">

// Dark mode aware
<div className="bg-background text-foreground">
<div className="bg-card border-border">
```

### Utility Functions
```tsx
import { cn, getWhatsAppHandshakeUrl, formatPrice } from '@/lib/utils';

// Merge classes
<div className={cn("base-class", isActive && "active-class")} />

// WhatsApp link
const url = getWhatsAppHandshakeUrl("+1234567890", "Textbook", "Library Lobby");

// Format price
formatPrice(49.99) // "$50"
formatPrice(0) // "Free"
```

### Constants
```tsx
import { CATEGORIES, LISTING_TYPES, CAMPUS_MEETUP_ZONES } from '@/lib/constants';

// Use categories
CATEGORIES.map(cat => (
  <div key={cat.slug}>{cat.icon} {cat.name}</div>
))

// Use listing types
<select>
  <option value={LISTING_TYPES.SELL}>Sell</option>
  <option value={LISTING_TYPES.DONATE}>Donate</option>
  <option value={LISTING_TYPES.SWAP}>Swap</option>
</select>
```

---

## 🔍 Verify Installation

### Check Dependencies
```bash
npm list @supabase/ssr @supabase/supabase-js
```

### Check Environment
```bash
# Should show your Supabase URL
echo $env:NEXT_PUBLIC_SUPABASE_URL
```

### Check Build
```bash
npm run build
```

---

## 🐛 Common Issues

### Missing Dependencies Error
```bash
npm install
```

### Tailwind Not Working
1. Delete `.next` folder
2. Restart dev server

### TypeScript Errors
Install missing type packages:
```bash
npm install -D @types/node @types/react @types/react-dom
```

### Supabase Type Errors
The base types are provided. Generate exact types in Phase 2:
```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/supabase.ts
```

---

## 📚 Key Files to Know

| File | Purpose |
|------|---------|
| `tailwind.config.ts` | Theme customization |
| `src/lib/constants.ts` | App-wide constants |
| `src/lib/utils.ts` | Utility functions |
| `src/lib/supabase/client.ts` | Use in client components |
| `src/lib/supabase/server.ts` | Use in server components |
| `middleware.ts` | Auth & route protection |

---

## 🎯 Next: Phase 2

Once Phase 1 is working, you'll build:
- ✅ Database schema (tables, RLS policies)
- ✅ Authentication pages (sign up, login)
- ✅ Image storage buckets
- ✅ Listing creation form
- ✅ Browse & search pages

---

## 💬 Need Help?

See detailed documentation: `PHASE-1-SETUP.md`

---

**You're all set! The foundation is solid. Ready to build! 🚀**
