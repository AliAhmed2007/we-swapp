import { Variants, Transition } from "framer-motion";

// 1. Shared Transitions
export const springSnappy: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
  mass: 0.8,
};

export const springSmooth: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 25,
  mass: 1,
};

export const easeSnappy: Transition = {
  duration: 0.28,
  ease: [0.16, 1, 0.3, 1],
};

export const easeExit: Transition = {
  duration: 0.18,
  ease: [0.7, 0, 0.84, 0],
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
