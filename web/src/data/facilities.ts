import type { Facility } from '@/types';

/**
 * `icon` is a string key resolved against an icon map in the UI layer
 * (see `src/components/icons.tsx`). Keeping it as a string keeps this data
 * serialisable and CMS-friendly.
 */
export const facilities: Facility[] = [
  {
    id: 'fac-strength',
    name: 'Strength Training',
    description:
      'Premium imported free weights, plate-loaded machines and Olympic platforms for every level.',
    icon: 'strength',
    image:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'fac-cardio',
    name: 'Cardio Zone',
    description:
      'State-of-the-art treadmills, ellipticals, rowers and bikes with immersive entertainment.',
    icon: 'cardio',
    image:
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'fac-functional',
    name: 'Functional Training',
    description:
      'Kettlebells, battle ropes, sleds and rigs for explosive, real-world strength.',
    icon: 'functional',
    image:
      'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'fac-crossfit',
    name: 'CrossFit & HIIT',
    description:
      'High-intensity interval training and a dedicated CrossFit box with competition-grade gear.',
    icon: 'crossfit',
    image:
      'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'fac-yoga',
    name: 'Yoga',
    description:
      'Restorative yoga and mobility sessions to build flexibility, balance and calm.',
    icon: 'yoga',
    image:
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'fac-zumba',
    name: 'Zumba Classes',
    description:
      'High-energy dance-fitness classes that torch calories while you have a blast.',
    icon: 'zumba',
    image:
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'fac-personal',
    name: 'Personal Training',
    description:
      'One-on-one coaching from certified trainers with tailored programs and accountability.',
    icon: 'personal',
    image:
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'fac-spa',
    name: 'Spa & Wellness',
    description:
      'Unwind and recover with steam, sauna and spa services (at selected branches).',
    icon: 'spa',
    image:
      'https://images.unsplash.com/photo-1554344728-77cf90d9ed26?auto=format&fit=crop&w=1200&q=80',
  },
];
