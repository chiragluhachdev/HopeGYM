'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { fadeUp, viewportOnce } from '@/lib/animations';

interface RevealProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  /** Render as a different element when needed. */
  as?: 'div' | 'li' | 'section' | 'article';
}

/**
 * Scroll-triggered reveal wrapper. Animates once when it enters the viewport.
 */
export function Reveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
  as = 'div',
}: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </MotionTag>
  );
}
