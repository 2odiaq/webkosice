"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import * as React from "react";

type Props = {
  children: React.ReactNode;
};

export function PageTransition({ children }: Props) {
  const prefersReducedMotion = useReducedMotion();
  const pathname = usePathname();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
