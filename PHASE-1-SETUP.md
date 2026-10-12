# Phase 1 Setup Guide

## ✅ Files Created

### Configuration Files
- ✅ `tailwind.config.ts` - Custom theme with Mint/Emerald brand colors
- ✅ `src/app/globals.css` - Tailwind CSS with light/dark mode support
- ✅ `middleware.ts` - Supabase authentication middleware

### Utilities & Constants
- ✅ `src/lib/constants.ts` - Categories, meetup zones, enums
- ✅ `src/lib/utils.ts` - Helper functions (cn, WhatsApp URL, formatting)
- ✅ `src/types/supabase.ts` - TypeScript types for Supabase

### Supabase Integration
- ✅ `src/lib/supabase/client.ts` - Browser client
- ✅ `src/lib/supabase/server.ts` - Server client
- ✅ `src/lib/supabase/middleware.ts` - Session management

### UI Components
- ✅ `src/components/layout/navbar.tsx` - Responsive navigation bar

### Environment Template
- ✅ `.env.local.example` - Environment variables template

---

## 📦 Required Dependencies

Run the following command to install all required packages:

```bash
npm install @supabase/supabase-js @supabase/ssr clsx tailwind-merge class-variance-authority lucide-react
```

### Package Breakdown:
- `@supabase/supabase-js` - Supabase JavaScript client
- `@supabase/ssr` - Supabase SSR helpers for Next.js
- `clsx` - Conditional className utility
- `tailwind-merge` - Merge Tailwind CSS classes without conflicts
- `class-variance-authority` - For variant-based component styling (shadcn/ui dependency)
- `lucide-react` - Icon library (optional but recommended)

---

## 🔧 Supabase Setup

### 1. Create Supabase Project
1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Choose your organization
5. Set project name: `we-swap`
6. Set database password (save this securely!)
7. Choose region closest to your users
8. Click "Create new project"

### 2. Get API Keys
Once your project is created:
1. Go to Project Settings → API
2. Copy the following values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key

### 3. Configure Environment Variables
1. Copy the example file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXT_PUBLIC_APP_NAME=We-Swap
   ```

### 4. Database Setup (Coming in Phase 2)
In the next phase, we'll create:
- Tables: `profiles`, `listings`, `exchanges`, `notifications`
- Storage buckets for images
- Row Level Security (RLS) policies
- Database functions and triggers

---

## 🚀 Running the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app.

---

## 📁 Project Structure

```
src/
├── app/                      # Next.js app directory
│   ├── globals.css          # Global styles with Tailwind
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/
│   └── layout/
│       └── navbar.tsx       # Navigation component
├── lib/
│   ├── constants.ts         # App constants
│   ├── utils.ts             # Utility functions
│   └── supabase/            # Supabase clients
│       ├── client.ts        # Browser client
│       ├── server.ts        # Server client
│       └── middleware.ts    # Auth middleware
└── types/
    └── supabase.ts          # Database types
```

---

## 🎨 Theme Tokens

### Brand Colors
- **Primary Mint**: `#10D08A` - Main CTAs, links
- **Primary Emerald**: `#009F6B` - Hover states, accents
- **Dark Accent**: `#0B4F3A` - Deep green for text/borders

### Canvas & Surfaces
- **Canvas Dark**: `#0D1117` - Dark mode background
- **Surface Dark**: `#161B22` - Dark mode cards
- **Canvas Light**: `#F8FAFC` - Light mode background
- **Surface Light**: `#FFFFFF` - Light mode cards

### Usage in Code
```tsx
// Using Tailwind classes
<div className="bg-mint text-white">
<button className="bg-emerald hover:bg-mint">

// Using HSL variables
<div className="bg-primary text-primary-foreground">
```

---

## 🔐 Security Notes

1. **Never commit `.env.local`** - It's already in `.gitignore`
2. **Use environment variables** for all sensitive data
3. **Row Level Security** will be enabled in Phase 2
4. **Anon key is safe** to expose in client-side code

---

## ✨ What's Working Now

- ✅ Tailwind CSS with custom theme
- ✅ Light/Dark mode support
- ✅ Responsive navbar with mobile menu
- ✅ Supabase client configuration
- ✅ TypeScript strict mode
- ✅ Utility functions and constants
- ✅ Authentication middleware structure

---

## 📝 Next Steps (Phase 2)

1. **Database Schema**
   - Create tables in Supabase
   - Set up Row Level Security
   - Configure storage buckets

2. **Authentication**
   - Sign up/login pages
   - Social auth integration
   - Protected routes

3. **Core Features**
   - Listing creation flow
   - Browse/search functionality
   - Image upload system

---

## 🐛 Troubleshooting

### "Cannot find module '@supabase/ssr'"
Run: `npm install @supabase/supabase-js @supabase/ssr`

### "Missing environment variables"
Check that `.env.local` exists and has all required variables

### Tailwind styles not loading
1. Restart dev server
2. Delete `.next` folder and rebuild
3. Check `tailwind.config.ts` paths

### TypeScript errors in Supabase files
The types will be fully accurate once we generate them in Phase 2:
```bash
npx supabase gen types typescript --project-id your-project-id > src/types/supabase.ts
```

---

## 📚 Resources

- [Next.js 15 Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)

---

**Phase 1 Complete! 🎉**

You now have a solid foundation with theming, utilities, and Supabase configuration. Ready for Phase 2!
