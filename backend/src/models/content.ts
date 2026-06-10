import { Schema, model } from 'mongoose';
import { withJsonId } from './base';

/* ── Branch ─────────────────────────────────────────────── */
const branchSchema = withJsonId(
  new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    whatsapp: { type: String, required: true },
    email: { type: String, default: '' },
    hours: { type: String, default: '' },
    image: { type: String, default: '' },
    mapsQuery: { type: String, default: '' },
    featured: { type: Boolean, default: false },
  })
);
export const Branch = model('Branch', branchSchema);

/* ── Membership plan ────────────────────────────────────── */
const planSchema = withJsonId(
  new Schema({
    name: { type: String, required: true },
    interval: {
      type: String,
      enum: ['monthly', 'quarterly', 'half-yearly', 'annual'],
      required: true,
    },
    price: { type: Number, required: true },
    currency: { type: String, default: '₹' },
    period: { type: String, default: '' },
    savings: { type: String },
    description: { type: String, default: '' },
    features: { type: [String], default: [] },
    highlighted: { type: Boolean, default: false },
    cta: { type: String, default: 'Join Now' },
    order: { type: Number, default: 0 },
  })
);
export const MembershipPlan = model('MembershipPlan', planSchema);

/* ── Facility ───────────────────────────────────────────── */
const facilitySchema = withJsonId(
  new Schema({
    name: { type: String, required: true },
    description: { type: String, default: '' },
    icon: { type: String, default: 'strength' },
    image: { type: String, default: '' },
    order: { type: Number, default: 0 },
  })
);
export const Facility = model('Facility', facilitySchema);

/* ── Trainer ────────────────────────────────────────────── */
const trainerSchema = withJsonId(
  new Schema({
    name: { type: String, required: true },
    role: { type: String, default: '' },
    experience: { type: String, default: '' },
    specialization: { type: String, default: '' },
    certifications: { type: [String], default: [] },
    image: { type: String, default: '' },
    socials: {
      instagram: String,
      twitter: String,
      linkedin: String,
    },
    order: { type: Number, default: 0 },
  })
);
export const Trainer = model('Trainer', trainerSchema);

/* ── Testimonial ────────────────────────────────────────── */
const testimonialSchema = withJsonId(
  new Schema({
    name: { type: String, required: true },
    role: { type: String, default: '' },
    quote: { type: String, required: true },
    rating: { type: Number, default: 5 },
    image: { type: String, default: '' },
  })
);
export const Testimonial = model('Testimonial', testimonialSchema);

/* ── Gallery ────────────────────────────────────────────── */
const gallerySchema = withJsonId(
  new Schema({
    src: { type: String, required: true },
    alt: { type: String, default: '' },
    category: {
      type: String,
      enum: ['cardio', 'strength', 'classes', 'facility'],
      default: 'facility',
    },
  })
);
export const GalleryItem = model('GalleryItem', gallerySchema);

/* ── Stat ───────────────────────────────────────────────── */
const statSchema = withJsonId(
  new Schema({
    label: { type: String, required: true },
    value: { type: Number, required: true },
    suffix: { type: String },
    prefix: { type: String },
    order: { type: Number, default: 0 },
  })
);
export const Stat = model('Stat', statSchema);

/* ── Announcement ───────────────────────────────────────── */
const announcementSchema = withJsonId(
  new Schema({
    title: { type: String, required: true },
    body: { type: String, default: '' },
    image: { type: String, default: '' },
    type: {
      type: String,
      enum: ['offer', 'event', 'holiday', 'news'],
      default: 'news',
    },
    date: { type: Date, default: Date.now },
  })
);
export const Announcement = model('Announcement', announcementSchema);

/* ── Workout plan ───────────────────────────────────────── */
const exerciseSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, default: '' },
    sets: { type: String, default: '' },
    reps: { type: String, default: '' },
    rest: { type: String, default: '' },
    instructions: { type: String, default: '' },
  },
  { _id: false }
);
const workoutSchema = withJsonId(
  new Schema({
    category: {
      type: String,
      enum: ['weight-loss', 'muscle-gain', 'strength', 'cardio'],
      required: true,
    },
    title: { type: String, required: true },
    image: { type: String, default: '' },
    exercises: { type: [exerciseSchema], default: [] },
  })
);
export const WorkoutPlan = model('WorkoutPlan', workoutSchema);

/* ── Diet plan ──────────────────────────────────────────── */
const dietSchema = withJsonId(
  new Schema({
    title: { type: String, default: 'Daily Plan' },
    memberId: { type: Schema.Types.ObjectId, ref: 'Member', default: null },
    meals: {
      breakfast: { type: [String], default: [] },
      lunch: { type: [String], default: [] },
      snacks: { type: [String], default: [] },
      dinner: { type: [String], default: [] },
    },
    water: { type: String, default: '3–4 L' },
    calories: { type: Number, default: 0 },
    protein: { type: Number, default: 0 },
    preparedBy: { type: String, default: 'Hope Gym & Spa Coaches' },
  })
);
export const DietPlan = model('DietPlan', dietSchema);

/* ── Motivational quote ─────────────────────────────────── */
const quoteSchema = withJsonId(
  new Schema({
    text: { type: String, required: true },
    author: { type: String, default: '' },
  })
);
export const Quote = model('Quote', quoteSchema);
