# Phase 1 Implementation Checklist

## 📋 Setup Tasks

### 1. Install Dependencies
- [ ] Run `npm install @supabase/supabase-js @supabase/ssr`
- [ ] Run `npm install clsx tailwind-merge class-variance-authority`
- [ ] Run `npm install -D tailwindcss-animate`
- [ ] Run `npm install lucide-react` (optional)
- [ ] Verify installation: `npm list @supabase/ssr`

**OR** use the PowerShell script:
- [ ] Run `.\install-dependencies.ps1`

---

### 2. Supabase Configuration
- [ ] Create account at [supabase.com](https://supabase.com)
- [ ] Create new project named "we-swap"
- [ ] Copy Project URL from Settings → API
- [ ] Copy anon public key from Settings → API
- [ ] Create `.env.local` from `.env.local.example`
- [ ] Add `NEXT_PUBLIC_SUPABASE_URL` to `.env.local`
- [ ] Add `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env.local`
- [ ] Verify `.env.local` is in `.gitignore`

---

### 3. Development Server
- [ ] Run `npm run dev`
- [ ] Visit `http://localhost:3000`
- [ ] Verify navbar appears
- [ ] Test mobile menu (resize browser)
- [ ] Check console for errors
- [ ] Test navigation links
- [ ] Verify "List an Item" button shows

---

### 4. Build Verification
- [ ] Run `npm run build`
- [ ] Verify build completes without errors
- [ ] Check for TypeScript errors
- [ ] Review build output size
- [ ] Test production build: `npm start`

---

## ✅ Files Created

### Configuration (3 files)
- [x] `tailwind.config.ts` - Custom theme configuration
- [x] `src/app/globals.css` - Global styles with Tailwind
- [x] `middleware.ts` - Authentication middleware

### Core Libraries (2 files)
- [x] `src/lib/constants.ts` - App constants and enums
- [x] `src/lib/utils.ts` - Utility functions

### Supabase Integration (4 files)
- [x] `src/lib/supabase/client.ts` - Browser client
- [x] `src/lib/supabase/server.ts` - Server client
- [x] `src/lib/supabase/middleware.ts` - Session management
- [x] `src/types/supabase.ts` - TypeScript types

### UI Components (2 files)
- [x] `src/components/layout/navbar.tsx` - Navigation bar
- [x] `src/app/layout.tsx` - Root layout (updated)

### Documentation (4 files)
- [x] `.env.local.example` - Environment template
- [x] `PHASE-1-SETUP.md` - Detailed setup guide
- [x] `QUICK-START.md` - Quick reference
- [x] `install-dependencies.ps1` - Installation script

---

## 🧪 Feature Testing

### Theme System
- [ ] Verify mint color (`#10D08A`) displays correctly
- [ ] Verify emerald color (`#009F6B`) displays correctly
- [ ] Check light mode renders properly
- [ ] Check dark mode toggle works (when implemented)
- [ ] Test responsive breakpoints (sm, md, lg, xl)

### Navbar Component
- [ ] Logo displays with gradient
- [ ] Logo link navigates to home
- [ ] Navigation links are visible (desktop)
- [ ] Search button shows keyboard shortcut
- [ ] "List an Item" button has gradient
- [ ] Mobile menu button appears on small screens
- [ ] Mobile menu opens/closes smoothly
- [ ] Active link highlighting works

### Utility Functions
Test in browser console or a test file:
- [ ] `cn()` merges classes correctly
- [ ] `formatPrice(0)` returns "Free"
- [ ] `formatPrice(49.99)` returns "$50"
- [ ] `formatRelativeTime()` works with dates
- [ ] `getWhatsAppHandshakeUrl()` generates valid URLs
- [ ] `calculateCO2Savings()` returns reasonable values

### Constants
- [ ] `CATEGORIES` array has 9 items
- [ ] Each category has slug, name, icon, weights
- [ ] `CAMPUS_MEETUP_ZONES` has 6 locations
- [ ] `LISTING_TYPES` exports SELL, DONATE, SWAP
- [ ] `LISTING_CONDITIONS` exports 4 conditions
- [ ] `ROUTES` object has all route patterns

### Supabase Integration
- [ ] Browser client creates without errors
- [ ] Server client creates without errors
- [ ] Middleware runs on page load
- [ ] Protected routes redirect to login (when implemented)
- [ ] Environment variables load correctly

---

## 🐛 Common Issues Checklist

### If build fails:
- [ ] Check Node.js version (should be 18+)
- [ ] Delete `node_modules` and reinstall
- [ ] Delete `.next` folder
- [ ] Clear npm cache: `npm cache clean --force`

### If Tailwind doesn't work:
- [ ] Restart dev server
- [ ] Check `tailwind.config.ts` content paths
- [ ] Verify `globals.css` imports in `layout.tsx`
- [ ] Check for CSS syntax errors

### If Supabase client fails:
- [ ] Verify `.env.local` exists
- [ ] Check environment variable names (NEXT_PUBLIC prefix)
- [ ] Restart dev server after adding env vars
- [ ] Verify Supabase URL format (https://xxx.supabase.co)

### If TypeScript errors appear:
- [ ] Run `npm install --save-dev @types/node`
- [ ] Check `tsconfig.json` paths configuration
- [ ] Verify all imports use `@/` alias correctly
- [ ] Run `npx tsc --noEmit` to see all errors

---

## 📊 Code Quality Checks

### Before Committing
- [ ] No TypeScript errors: `npx tsc --noEmit`
- [ ] No ESLint errors: `npm run lint`
- [ ] Build succeeds: `npm run build`
- [ ] No console errors in browser
- [ ] All imports use path aliases (`@/lib/...`)
- [ ] Comments are clear and helpful
- [ ] File naming follows conventions

### Performance
- [ ] Initial bundle size is reasonable
- [ ] No duplicate dependencies
- [ ] Images are optimized (if any)
- [ ] No memory leaks in components

---

## 🎯 Ready for Phase 2?

### Prerequisites Complete
- [ ] All dependencies installed
- [ ] Supabase project created
- [ ] Environment variables configured
- [ ] Dev server runs without errors
- [ ] Navbar displays correctly
- [ ] Build completes successfully
- [ ] TypeScript has no errors
- [ ] All documentation reviewed

### Understanding Check
- [ ] I understand the theme system
- [ ] I know how to use constants
- [ ] I know how to use utility functions
- [ ] I understand Supabase client/server split
- [ ] I know where to add new components
- [ ] I understand the middleware purpose
- [ ] I've read the setup documentation

---

## 📝 Notes & Issues

Use this space to track any issues or customizations:

```
Issue 1: _______________________________________________
Resolution: ___________________________________________

Issue 2: _______________________________________________
Resolution: ___________________________________________

Custom Changes: _______________________________________
_______________________________________________________
```

---

## ✅ Phase 1 Completion Sign-Off

When all items are checked:
- [ ] All setup tasks completed
- [ ] All files verified
- [ ] All features tested
- [ ] All quality checks passed
- [ ] Documentation reviewed
- [ ] Ready to begin Phase 2

**Date Completed:** ___________________

**Next Phase:** Database Schema & Authentication

---

## 🚀 What's Next in Phase 2

Preview of upcoming work:
1. Create database tables (profiles, listings, exchanges)
2. Set up Row Level Security policies
3. Configure image storage buckets
4. Build authentication pages (signup, login)
5. Implement social auth (Google, GitHub)
6. Create listing form with validation
7. Set up image upload system

**Estimated Time:** 4-6 hours

---

**Keep this checklist handy as you build!** ✨
