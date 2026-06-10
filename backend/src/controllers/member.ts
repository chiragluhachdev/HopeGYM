import { z } from 'zod';
import { asyncHandler, HttpError } from '../lib/asyncHandler';
import {
  Member,
  Membership,
  Attendance,
  Payment,
  Notification,
} from '../models/member';
import { WorkoutPlan, DietPlan, Quote, MembershipPlan } from '../models/content';
import { expiryFrom, type PlanInterval } from '../lib/membership';

function memberId(req: any): string {
  return req.member.sub as string;
}

/* ── Profile ────────────────────────────────────────────── */
export const getMe = asyncHandler(async (req, res) => {
  const member = await Member.findById(memberId(req)).populate('branchId');
  if (!member) throw new HttpError(404, 'Member not found');
  res.json(member);
});

const updateMeSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional().or(z.literal('')),
  height: z.number().optional(),
  weight: z.number().optional(),
  goal: z.string().optional(),
  branchId: z.string().optional(),
  photo: z.string().optional(),
});

export const updateMe = asyncHandler(async (req, res) => {
  const body = updateMeSchema.parse(req.body);
  const member = await Member.findByIdAndUpdate(memberId(req), body, {
    new: true,
  });
  if (!member) throw new HttpError(404, 'Member not found');
  res.json(member);
});

/* ── Membership ─────────────────────────────────────────── */
export const getMyMembership = asyncHandler(async (req, res) => {
  const membership = await Membership.findOne({ memberId: memberId(req) })
    .sort({ createdAt: -1 })
    .populate('planId');
  if (!membership) return res.json(null);

  // Auto-flag expiry and compute remaining days.
  const now = new Date();
  if (membership.expiryDate < now && membership.status === 'active') {
    membership.status = 'expired';
    await membership.save();
  }
  const remainingDays = Math.max(
    0,
    Math.ceil((membership.expiryDate.getTime() - now.getTime()) / 86400000)
  );
  res.json({ ...membership.toJSON(), remainingDays });
});

const renewSchema = z.object({
  planId: z.string(),
  paymentMethod: z.enum(['cod', 'razorpay']).default('cod'),
});

export const renewMembership = asyncHandler(async (req, res) => {
  const { planId, paymentMethod } = renewSchema.parse(req.body);
  const plan = await MembershipPlan.findById(planId);
  if (!plan) throw new HttpError(404, 'Plan not found');

  const start = new Date();
  const paid = paymentMethod === 'razorpay';
  const membership = await Membership.create({
    memberId: memberId(req),
    planId: plan.id,
    planName: plan.name,
    startDate: start,
    expiryDate: expiryFrom(plan.interval as PlanInterval, start),
    status: 'active',
    paymentMethod,
    paymentStatus: paid ? 'paid' : 'pending',
  });
  await Payment.create({
    memberId: memberId(req),
    membershipId: membership.id,
    amount: plan.price,
    currency: plan.currency,
    method: paymentMethod,
    status: paid ? 'paid' : 'pending',
    description: `${plan.name} renewal`,
    reference: paid ? 'razorpay_placeholder' : 'cash_on_first_visit',
  });
  res.status(201).json(membership);
});

export const getMyPayments = asyncHandler(async (req, res) => {
  res.json(await Payment.find({ memberId: memberId(req) }).sort({ createdAt: -1 }));
});

/* ── Attendance ─────────────────────────────────────────── */
export const getMyAttendance = asyncHandler(async (req, res) => {
  const records = await Attendance.find({ memberId: memberId(req) }).sort({
    date: 1,
  });

  // Monthly percentage (current month) + current streak.
  const now = new Date();
  const monthRecords = records.filter(
    (r) =>
      r.date.getMonth() === now.getMonth() &&
      r.date.getFullYear() === now.getFullYear()
  );
  const present = monthRecords.filter((r) => r.status === 'present').length;
  const percentage = monthRecords.length
    ? Math.round((present / monthRecords.length) * 100)
    : 0;

  // Streak: consecutive present days ending today/yesterday.
  const presentDates = new Set(
    records
      .filter((r) => r.status === 'present')
      .map((r) => r.date.toISOString().slice(0, 10))
  );
  let streak = 0;
  const cursor = new Date();
  // allow today not yet marked
  if (!presentDates.has(cursor.toISOString().slice(0, 10))) {
    cursor.setDate(cursor.getDate() - 1);
  }
  while (presentDates.has(cursor.toISOString().slice(0, 10))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }

  res.json({
    records,
    stats: {
      monthPresent: present,
      monthTotal: monthRecords.length,
      percentage,
      streak,
    },
  });
});

export const checkInAttendance = asyncHandler(async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const record = await Attendance.findOneAndUpdate(
    { memberId: memberId(req), date: today },
    { status: 'present' },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  res.json(record);
});

/* ── Workouts / Diet ────────────────────────────────────── */
export const getWorkouts = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const filter = category ? { category: String(category) } : {};
  res.json(await WorkoutPlan.find(filter));
});

export const getDiet = asyncHandler(async (req, res) => {
  // member-specific plan if present, else the generic one
  const mine = await DietPlan.findOne({ memberId: memberId(req) });
  const plan = mine || (await DietPlan.findOne({ memberId: null }));
  res.json(plan);
});

/* ── Notifications ──────────────────────────────────────── */
export const getMyNotifications = asyncHandler(async (req, res) => {
  const id = memberId(req);
  res.json(
    await Notification.find({ $or: [{ memberId: id }, { memberId: null }] }).sort({
      createdAt: -1,
    })
  );
});

export const markNotificationRead = asyncHandler(async (req, res) => {
  const n = await Notification.findByIdAndUpdate(
    req.params.id,
    { read: true },
    { new: true }
  );
  if (!n) throw new HttpError(404, 'Notification not found');
  res.json(n);
});

/* ── Motivation ─────────────────────────────────────────── */
export const getMotivation = asyncHandler(async (_req, res) => {
  const count = await Quote.countDocuments();
  if (!count) return res.json({ text: 'Push yourself. No one else will.', author: 'Hope Gym & Spa' });
  const random = await Quote.findOne().skip(Math.floor(Math.random() * count));
  res.json(random);
});
