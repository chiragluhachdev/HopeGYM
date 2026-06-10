import type { Branch } from '@/types';

/**
 * NOTE: Phone numbers below are placeholders — replace with each branch's
 * real contact number before going live. Addresses, hours and ratings are
 * based on the brand's known locations.
 */
export const branches: Branch[] = [
  {
    id: 'br-dlf-11',
    name: 'Hope Gym & Spa — DLF Sector 11',
    slug: 'dlf-sector-11',
    city: 'Faridabad',
    address: 'Sector 11D, SCF-25, 1st & 2nd Floor, Faridabad 121006',
    phone: '+91 87967 97503',
    whatsapp: '918796797503',
    email: 'dlf11@hopegymspa.com',
    hours: 'Open Daily: 6:00 AM – 10:00 PM',
    image:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    mapsQuery: 'Hope Gym Spa Sector 11D SCF 25 Faridabad',
    featured: true,
  },
  {
    id: 'br-nit',
    name: 'Hope Gym & Spa — NIT Faridabad',
    slug: 'nit-faridabad',
    city: 'Faridabad',
    address: 'Fruit Garden, NIT 5, Faridabad 121001',
    phone: '+91 87967 97503',
    whatsapp: '918796797503',
    email: 'nit@hopegymspa.com',
    hours: 'Open Daily: 5:30 AM – 10:30 PM',
    image:
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1200&q=80',
    mapsQuery: 'Hope Gym Spa Fruit Garden NIT 5 Faridabad',
    featured: true,
  },
  {
    id: 'br-sec-85',
    name: 'Hope Gym & Spa — Sector 85',
    slug: 'sector-85',
    city: 'Faridabad',
    address: 'BPTP Parkstreet, Sector 85, Faridabad 121002',
    phone: '+91 87967 97503',
    whatsapp: '918796797503',
    email: 'sector85@hopegymspa.com',
    hours: 'Open Daily: 5:00 AM – 10:00 PM',
    image:
      'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=1200&q=80',
    mapsQuery: 'Hope Gym Spa BPTP Parkstreet Sector 85 Faridabad',
    featured: true,
  },
  {
    id: 'br-sec-43',
    name: 'Hope Gym & Spa — Sector 43',
    slug: 'sector-43',
    city: 'Faridabad',
    address: 'Green Fields Colony, Sector 43, Faridabad 121010',
    phone: '+91 87967 97503',
    whatsapp: '918796797503',
    email: 'sector43@hopegymspa.com',
    hours: 'Open Daily: 6:00 AM – 10:00 PM',
    image:
      'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1200&q=80',
    mapsQuery: 'Hope Gym Spa Green Fields Colony Sector 43 Faridabad',
    featured: false,
  },
  {
    id: 'br-gurugram',
    name: 'Hope Gym — Gurugram',
    slug: 'gurugram',
    city: 'Gurugram',
    address: 'Gurugram, Haryana',
    phone: '+91 87967 97503',
    whatsapp: '918796797503',
    email: 'gurugram@hopegymspa.com',
    hours: 'Open Daily: 5:30 AM – 10:30 PM',
    image:
      'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80',
    mapsQuery: 'Hope Gym Gurugram',
    featured: false,
  },
];

export const featuredBranches = branches.filter((b) => b.featured);

export function getBranch(slug: string) {
  return branches.find((b) => b.slug === slug);
}
