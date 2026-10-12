"use client";

import { motion } from "framer-motion";
import { fadeInUpVariants } from "@/lib/animations";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={fadeInUpVariants}
      initial="hidden"
      animate="visible"
      className="flex-1 flex flex-col"
    >
      {children}
    </motion.div>
  );
}
