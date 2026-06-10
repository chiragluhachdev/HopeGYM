import { asyncHandler } from '../lib/asyncHandler';
import {
  Branch,
  MembershipPlan,
  Facility,
  Trainer,
  Testimonial,
  GalleryItem,
  Stat,
  Announcement,
} from '../models/content';

export const getBranches = asyncHandler(async (_req, res) => {
  res.json(await Branch.find().sort({ featured: -1, createdAt: 1 }));
});

export const getPlans = asyncHandler(async (_req, res) => {
  res.json(await MembershipPlan.find().sort({ order: 1, price: 1 }));
});

export const getFacilities = asyncHandler(async (_req, res) => {
  res.json(await Facility.find().sort({ order: 1, createdAt: 1 }));
});

export const getTrainers = asyncHandler(async (_req, res) => {
  res.json(await Trainer.find().sort({ order: 1, createdAt: 1 }));
});

export const getTestimonials = asyncHandler(async (_req, res) => {
  res.json(await Testimonial.find().sort({ createdAt: 1 }));
});

export const getGallery = asyncHandler(async (_req, res) => {
  res.json(await GalleryItem.find().sort({ createdAt: 1 }));
});

export const getStats = asyncHandler(async (_req, res) => {
  res.json(await Stat.find().sort({ order: 1 }));
});

export const getAnnouncements = asyncHandler(async (_req, res) => {
  res.json(await Announcement.find().sort({ date: -1 }));
});
