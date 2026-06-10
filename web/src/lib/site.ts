/**
 * Central site configuration — brand info, contact details, navigation and
 * social links. Single source of truth referenced across the app so the owner
 * (or a future admin panel) only edits one file.
 */

export const siteConfig = {
  name: 'Hope Gym & Spa',
  tagline: 'Transform Your Body, Transform Your Life',
  description:
    "Hope Gym & Spa is Faridabad's premium fitness destination with world-class equipment, certified trainers, personalized coaching, CrossFit, Zumba, Yoga and spa & wellness. Join now and transform your life.",
  url: 'https://www.hopegymspa.com',
  keywords: [
    'Hope Gym & Spa',
    'gym in Faridabad',
    'best gym Faridabad',
    'premium gym',
    'fitness center Faridabad',
    'personal training',
    'crossfit Faridabad',
    'zumba classes',
    'yoga',
    'spa and wellness',
    'weight loss program',
    'body transformation',
  ],
  contact: {
    phone: '+91 87967 97503',
    phoneHref: 'tel:+918796797503',
    whatsapp: '918796797503',
    email: 'info@hopegymspa.com',
    // Main branch
    address:
      'Hope Gym & Spa, Green Fields Colony, Sector 43, Faridabad, Haryana 121010',
  },
  social: {
    instagram: 'https://instagram.com/hopegym_spa',
    facebook: 'https://facebook.com/hopegymandspa',
  },
} as const;

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Branches', href: '/branches' },
  { label: 'Membership', href: '/membership' },
  { label: 'Facilities', href: '/facilities' },
  { label: 'Trainers', href: '/trainers' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
] as const;

/** Builds a pre-filled WhatsApp deep link. */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${siteConfig.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
