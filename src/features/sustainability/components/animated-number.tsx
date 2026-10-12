"use client";

import { useEffect } from "react";
import { useMotionValue, useTransform, animate, motion } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

export function AnimatedNumber({ value, decimals = 0, suffix = '', prefix = '' }: AnimatedNumberProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    const formatted = decimals > 0 
      ? latest.toFixed(decimals)
      : Math.round(latest).toLocaleString();
    return `${prefix}${formatted}${suffix}`;
  });

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [value, count]);

  return <motion.span>{rounded}</motion.span>;
}
