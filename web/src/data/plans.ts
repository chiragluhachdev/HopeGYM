import type { MembershipPlan } from '@/types';

export const plans: MembershipPlan[] = [
  {
    id: 'plan-monthly',
    name: 'Monthly',
    interval: 'monthly',
    price: 1999,
    currency: '₹',
    period: '/month',
    description: 'Perfect for trying us out with full access, zero commitment.',
    features: [
      'Access to home branch',
      'Cardio & strength zones',
      '2 group classes / week',
      'Locker access',
      'Fitness assessment',
    ],
    highlighted: false,
    cta: 'Join Now',
  },
  {
    id: 'plan-quarterly',
    name: 'Quarterly',
    interval: 'quarterly',
    price: 4999,
    currency: '₹',
    period: '/3 months',
    savings: 'Save 16%',
    description: 'Build momentum with a season of unlimited training.',
    features: [
      'Access to home branch',
      'Unlimited group classes',
      '1 personal training session',
      'Locker + towel service',
      'Diet & nutrition guide',
    ],
    highlighted: false,
    cta: 'Join Now',
  },
  {
    id: 'plan-half-yearly',
    name: 'Half-Yearly',
    interval: 'half-yearly',
    price: 8999,
    currency: '₹',
    period: '/6 months',
    savings: 'Save 25%',
    description: 'Our most popular plan — serious progress, serious value.',
    features: [
      'Access to ALL 5 branches',
      'Unlimited group classes',
      '4 personal training sessions',
      'Locker + towel + steam room',
      'Personalised workout plan',
      'Priority class booking',
    ],
    highlighted: true,
    cta: 'Join Now',
  },
  {
    id: 'plan-annual',
    name: 'Annual',
    interval: 'annual',
    price: 14999,
    currency: '₹',
    period: '/year',
    savings: 'Save 37%',
    description: 'The ultimate commitment to your transformation.',
    features: [
      'Access to ALL 5 branches',
      'Unlimited everything',
      '12 personal training sessions',
      'Full spa & steam access',
      'Quarterly body composition scan',
      'Free Hope Gym merch kit',
      'Guest passes (4 / year)',
    ],
    highlighted: false,
    cta: 'Join Now',
  },
];

/** Feature matrix used by the comparison table on the membership page. */
export const comparisonFeatures: {
  label: string;
  values: Record<MembershipPlan['interval'], boolean | string>;
}[] = [
  {
    label: 'Branch access',
    values: {
      monthly: 'Home',
      quarterly: 'Home',
      'half-yearly': 'All 5',
      annual: 'All 5',
    },
  },
  {
    label: 'Group classes',
    values: {
      monthly: '2 / week',
      quarterly: 'Unlimited',
      'half-yearly': 'Unlimited',
      annual: 'Unlimited',
    },
  },
  {
    label: 'Personal training',
    values: {
      monthly: false,
      quarterly: '1 session',
      'half-yearly': '4 sessions',
      annual: '12 sessions',
    },
  },
  {
    label: 'Steam & spa',
    values: {
      monthly: false,
      quarterly: false,
      'half-yearly': true,
      annual: true,
    },
  },
  {
    label: 'Nutrition plan',
    values: {
      monthly: false,
      quarterly: true,
      'half-yearly': true,
      annual: true,
    },
  },
  {
    label: 'Body composition scan',
    values: {
      monthly: false,
      quarterly: false,
      'half-yearly': false,
      annual: 'Quarterly',
    },
  },
  {
    label: 'Guest passes',
    values: {
      monthly: false,
      quarterly: false,
      'half-yearly': false,
      annual: '4 / year',
    },
  },
];
