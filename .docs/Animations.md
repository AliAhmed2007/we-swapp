
# We-Swap Motion System & Framer Motion Guidelines

> **Motion Philosophy:** Functional, Snappy, Minimal.
> 
> Animation exists solely to provide spatial hierarchy, tactile feedback, and reduce perceived latency. Avoid cartoonish, bouncy, or slow animations that impede workflow. Adhere to Apple-grade micro-interactions: high spring damping, low duration (sub-250ms for micro-actions, sub-400ms for structural transitions), and GPU-accelerated properties (`opacity` and `transform` only).

## 1. Global Motion Configuration & Physics Curves

Add the core motion tokens and curve presets to `src/lib/animations.ts`.

### 1.1 Transition Curves & Springs

- **Snappy Spring (Buttons, Badges, Toggles):**
    
    `{ type: "spring", stiffness: 400, damping: 30, mass: 0.8 }`
    
- **Smooth Spring (Modals, Dialogs, Drawers):**
    
    `{ type: "spring", stiffness: 260, damping: 25, mass: 1 }`
    
- **Snappy Easing (Page Enter, Grid Stagger):**
    
    `{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }` (Custom quint-out curve)
    
- **Exit Easing (Fast Disappear):**
    
    `{ duration: 0.18, ease: [0.7, 0, 0.84, 0] }`
    

## 2. Reusable Motion Library (`src/lib/animations.ts`)

TypeScript

```
import { Variants, Transition } from "framer-motion";

// 1. Shared Transitions
export const springSnappy: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};

export const springSmooth: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 25,
};

export const easeSnappy: Transition = {
  duration: 0.28,
  ease: [0.16, 1, 0.3, 1],
};

// 2. Global Fade & Slide Variants
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: easeSnappy },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

export const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: easeSnappy },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
};

// 3. Staggered Grid Container (Feed, Categories, Lists)
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04, // Sub-frame stagger prevents waterfall delay
      delayChildren: 0.02,
    },
  },
};

// 4. Modal / Dialog Scale Entry
export const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 6 },
  visible: { opacity: 1, scale: 1, y: 0, transition: springSmooth },
  exit: { opacity: 0, scale: 0.97, y: 4, transition: { duration: 0.15 } },
};

// 5. Drawer / Slide-Over (Bottom on Mobile, Right on Desktop)
export const sheetVariants: Variants = {
  hidden: { x: "100%", opacity: 0.8 },
  visible: { x: 0, opacity: 1, transition: springSmooth },
  exit: { x: "100%", opacity: 0.8, transition: { duration: 0.2 } },
};

// 6. Interactive Card / Button Micro-Interactions
export const cardHoverProps = {
  whileHover: { y: -2, transition: { duration: 0.15 } },
  whileTap: { y: 0, scale: 0.99 },
};

export const buttonTapProps = {
  whileHover: { scale: 1.01 },
  whileTap: { scale: 0.97 },
  transition: springSnappy,
};
```

## 3. Page-by-Page Animation Specifications

### 3.1 App Shell & Page Transitions (`src/app/template.tsx`)

Avoid full-page flashes. Use a lightweight fade-up for each route transition:

TypeScript

```
"use client";

import { motion } from "framer-motion";
import { fadeInUpVariants } from "@/lib/animations";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      variants={fadeInUpVariants}
      initial="hidden"
      animate="visible"
      className="flex-1 flex flex-col"
    >
      {children}
    </motion.main>
  );
}
```

### 3.2 Discovery Feed & Hubs (`/`, `/swap`, `/buy`)

#### A. Interactive Category & Intent Filter Bar

Use Framer Motion's `layoutId` to slide an active highlight pill smoothly behind tabs:

TypeScript

```
"use client";

import { motion } from "framer-motion";

interface TabProps {
  id: string;
  label: string;
  isSelected: boolean;
  onSelect: () => void;
}

export function FilterTab({ id, label, isSelected, onSelect }: TabProps) {
  return (
    <button
      onClick={onSelect}
      className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
        isSelected ? "text-black" : "text-slate-400 hover:text-white"
      }`}
    >
      {isSelected && (
        <motion.div
          layoutId="activeFilterIndicator"
          className="absolute inset-0 bg-[#10D08A] rounded-full shadow-sm"
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </button>
  );
}
```

#### B. Staggered Listing Grid

Items enter sequentially without lagging the UI thread:

TypeScript

```
"use client";

import { motion } from "framer-motion";
import { staggerContainerVariants, fadeInUpVariants, cardHoverProps } from "@/lib/animations";

export function ListingGrid({ listings }: { listings: any[] }) {
  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      {listings.map((item) => (
        <motion.div
          key={item.id}
          variants={fadeInUpVariants}
          {...cardHoverProps}
          className="border border-[#21262D] bg-[#161B22] rounded-xl overflow-hidden hover:border-[#10D08A]/40 transition-colors"
        >
          {/* Card Content */}
        </motion.div>
      ))}
    </motion.div>
  );
}
```

### 3.3 Listing Creation Wizard (`/listings/create`)

#### Dynamic Step Carousel with Directional Sliding

When moving forward, the next step slides in from the right (`x: 40`). When moving backward, it slides in from the left (`x: -40`).

TypeScript

```
"use client";

import { motion, AnimatePresence } from "framer-motion";

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 30 : -30,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.24, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -30 : 30,
    opacity: 0,
    transition: { duration: 0.18, ease: "easeIn" },
  }),
};

export function WizardStepContainer({
  step,
  direction,
  children,
}: {
  step: number;
  direction: number;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden relative w-full">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step}
          custom={direction}
          variants={stepVariants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
```

#### Accordion / Dynamic Conditional Field Reveal

When toggling `SWAP` (showing "Target Swap Item") or `SELL` (showing Price), animate height smoothly to prevent content jumps:

TypeScript

```
<AnimatePresence initial={false}>
  {listingType === "SWAP" && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      <div className="pt-3">
        <label className="text-sm font-medium">Looking for in return:</label>
        <input className="input-field mt-1" placeholder="e.g. Linear Algebra 4th Ed" />
      </div>
    </motion.div>
  )}
</AnimatePresence>
```

### 3.4 Listing Detail View (`/listings/[id]`)

#### Image Gallery Crossfade & Zoom

Clicking thumbnails swaps images smoothly without layout shift:

TypeScript

```
<AnimatePresence mode="wait">
  <motion.img
    key={selectedImage}
    src={selectedImage}
    initial={{ opacity: 0.5, scale: 0.99 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0.5 }}
    transition={{ duration: 0.18 }}
    className="w-full h-80 object-cover rounded-xl"
  />
</AnimatePresence>
```

### 3.5 Realtime Peer Handshake & Chat (`/chat/[id]`)

#### Message Bubble Ingestion

New incoming messages pop in gently with slight vertical lift:

TypeScript

```
export function MessageBubble({ message, isOwn }: { message: any; isOwn: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={springSnappy}
      className={`flex ${isOwn ? "justify-end" : "justify-start"} my-1.5`}
    >
      <div
        className={`px-3.5 py-2 rounded-2xl max-w-sm text-sm ${
          isOwn
            ? "bg-[#10D08A] text-black font-medium rounded-br-xs"
            : "bg-[#161B22] text-slate-100 border border-[#21262D] rounded-bl-xs"
        }`}
      >
        {message.content}
      </div>
    </motion.div>
  );
}
```

### 3.6 Sustainability Dashboard (`/impact`)

#### Counting Numbers with Spring Dynamics

Counters smoothly spin up from 0 to their actual metric value:

TypeScript

```
"use client";

import { useEffect } from "react";
import { useMotionValue, useTransform, animate, motion } from "framer-motion";

export function AnimatedNumber({ value }: { value: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [value, count]);

  return <motion.span>{rounded}</motion.span>;
}
```

#### Expanding Impact Bars

Category progress bars animate from `width: 0%` when scrolled into view:

TypeScript

```
export function ProgressBar({ percentage }: { percentage: number }) {
  return (
    <div className="h-2 w-full bg-[#21262D] rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="h-full bg-gradient-to-r from-[#10D08A] to-[#009F6B]"
      />
    </div>
  );
}
```

### 3.7 Admin & Moderation Queue (`/admin/listings`)

#### Animated List Dismissal

When an admin approves or removes a reported listing, the item collapses its height and fades out without jarring sibling elements:

TypeScript

```
<AnimatePresence>
  {reports.map((report) => (
    <motion.tr
      key={report.id}
      initial={{ opacity: 1, height: "auto" }}
      exit={{
        opacity: 0,
        height: 0,
        paddingTop: 0,
        paddingBottom: 0,
        transition: { duration: 0.2 },
      }}
      className="border-b border-[#21262D]"
    >
      {/* Table Data Columns */}
    </motion.tr>
  ))}
</AnimatePresence>
```

## 4. Accessibility & Performance Checklist

1. **Reduced Motion (`prefers-reduced-motion`):** Wrap motion declarations or set Framer Motion's global config to eliminate positional changes when user prefers reduced motion:
    
    TypeScript
    
    ```
    import { useReducedMotion } from "framer-motion";
    // If reduced motion is requested, swap y/x transformations with pure opacity transitions.
    ```
    
2. **GPU Acceleration Rule:** Never animate CSS properties like `top`, `left`, `margin`, or `padding` directly. Only animate:
    
    - `opacity`
        
    - `transform` (`scale`, `x`, `y`, `rotate`)
        
    - `height` only where strictly required for accordions/collapsibles.
        
3. **Server Components:** Framer Motion components require `'use client'`. Keep container shells as Server Components, encapsulating motion to small leaves (e.g., `<AnimatedCard>`, `<AnimatedNumber>`).