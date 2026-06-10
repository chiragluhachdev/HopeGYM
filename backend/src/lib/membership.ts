export type PlanInterval = 'monthly' | 'quarterly' | 'half-yearly' | 'annual';

const MONTHS: Record<PlanInterval, number> = {
  monthly: 1,
  quarterly: 3,
  'half-yearly': 6,
  annual: 12,
};

/** Returns an expiry date `interval` months after `from`. */
export function expiryFrom(interval: PlanInterval, from = new Date()): Date {
  const d = new Date(from);
  d.setMonth(d.getMonth() + (MONTHS[interval] ?? 1));
  return d;
}
