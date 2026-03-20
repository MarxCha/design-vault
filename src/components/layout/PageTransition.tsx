'use client';

import { motion } from 'motion/react';
import { type ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wraps page content with enter/exit animations.
 * Use in individual page components for smooth transitions.
 * 
 * Note: For full page transitions between routes,
 * you'd need to wrap this in AnimatePresence at the layout level
 * with a key based on pathname. Next.js App Router doesn't
 * support this natively yet — consider using next-view-transitions
 * or the experimental viewTransitions API.
 */
export function PageTransition({ children, className = '' }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
