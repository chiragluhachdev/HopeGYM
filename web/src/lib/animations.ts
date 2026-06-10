/**
 * Reusable Framer Motion variants. Centralised so animation feel stays
 * consistent across the site and can be tuned in one place.
 */
import type { Variants } from 'framer-motion';

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6 } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Parent container that staggers its children. */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

// Pre-trigger ~140px before the element scrolls into view so reveals (and the
// lazy images inside them) start a touch early and never feel like they're
// "waiting for a scroll".
export const viewportOnce = { once: true, margin: '0px 0px 140px 0px' } as const;
