/**
 * Shared domain types for Hope Gym.
 *
 * These mirror what a future admin dashboard / API would return, so swapping
 * the static data in `src/data` for a CMS or REST/GraphQL backend later only
 * means changing the data-fetching layer — components stay untouched.
 */

export interface Branch {
  id: string;
  name: string;
  slug: string;
  city: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  hours: string;
  image: string;
  mapsQuery: string; // used to build the Google Maps embed/link
  featured: boolean;
}

export type PlanInterval = 'monthly' | 'quarterly' | 'half-yearly' | 'annual';

export interface MembershipPlan {
  id: string;
  name: string;
  interval: PlanInterval;
  price: number;
  currency: string;
  period: string; // human label e.g. "/month"
  savings?: string; // e.g. "Save 20%"
  description: string;
  features: string[];
  highlighted: boolean; // visually featured ("Most Popular")
  cta: string;
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  icon: string; // react-icons key, resolved in the UI
  image: string;
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialization: string;
  certifications: string[];
  image: string;
  socials?: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  image: string;
}

export type GalleryCategory =
  | 'all'
  | 'cardio'
  | 'strength'
  | 'classes'
  | 'facility';

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: Exclude<GalleryCategory, 'all'>;
}

export interface Stat {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}
