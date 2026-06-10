'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { staggerContainer, viewportOnce } from '@/lib/animations';

/**
 * Wraps a group of motion children (cards using `fadeUp`) and staggers their
 * reveal as the group scrolls into view.
 */
export function StaggerGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </motion.div>
  );
}
