/**
 * Server-side data fetchers for public content.
 *
 * Each fetcher hits the backend with ISR (`revalidate: 60`) so admin changes
 * appear within ~a minute, and **falls back to the static `src/data/*` array**
 * if the backend is unreachable — so the site never breaks if the API is down.
 */
import type {
  Branch,
  MembershipPlan,
  Facility,
  Trainer,
  Testimonial,
  GalleryItem,
  Stat,
} from '@/types';

import { branches as branchesFallback } from '@/data/branches';
import { plans as plansFallback } from '@/data/plans';
import { facilities as facilitiesFallback } from '@/data/facilities';
import { trainers as trainersFallback } from '@/data/trainers';
import { testimonials as testimonialsFallback } from '@/data/testimonials';
import { galleryItems as galleryFallback } from '@/data/gallery';
import { stats as statsFallback } from '@/data/stats';

const API_URL =
  process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'https://hopegym.onrender.com';

async function getJson<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${API_URL}/api/${path}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`${path} → ${res.status}`);
    const data = (await res.json()) as T;
    // Guard against an empty backend masking content.
    if (Array.isArray(data) && data.length === 0) return fallback;
    return data;
  } catch {
    return fallback;
  }
}

export const getBranches = () => getJson<Branch[]>('branches', branchesFallback);
export const getPlans = () => getJson<MembershipPlan[]>('plans', plansFallback);
export const getFacilities = () =>
  getJson<Facility[]>('facilities', facilitiesFallback);
export const getTrainers = () =>
  getJson<Trainer[]>('trainers', trainersFallback);
export const getTestimonials = () =>
  getJson<Testimonial[]>('testimonials', testimonialsFallback);
export const getGallery = () =>
  getJson<GalleryItem[]>('gallery', galleryFallback);
export const getStats = () => getJson<Stat[]>('stats', statsFallback);

export async function getFeaturedBranches() {
  const all = await getBranches();
  const featured = all.filter((b) => b.featured);
  return featured.length ? featured : all.slice(0, 3);
}
