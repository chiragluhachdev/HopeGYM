import { z } from 'zod';
import type { Model } from 'mongoose';
import { asyncHandler, HttpError } from '../lib/asyncHandler';
import { signAdminToken } from '../lib/jwt';
import { verifyPassword } from '../lib/password';
import { expiryFrom, type PlanInterval } from '../lib/membership';
import { Admin } from '../models/admin';
import { Member, Membership, Payment, Attendance, Notification } from '../models/member';
import {
  Branch,
  MembershipPlan,
  Facility,
  Trainer,
  Testimonial,
  GalleryItem,
  Stat,
  Announcement,
  WorkoutPlan,
  DietPlan,
  Quote,
} from '../models/content';

/* ── Auth ───────────────────────────────────────────────── */
const loginSchema = z.object({ username: z.string(), password: z.string() });

export const adminLogin = asyncHandler(async (req, res) => {
  const { username, password } = loginSchema.parse(req.body);
  const admin = await Admin.findOne({ username });
  if (!admin || !verifyPassword(password, String(admin.get('passwordHash')))) {
    throw new HttpError(401, 'Invalid credentials');
  }
  const token = signAdminToken({ sub: admin.id, username: String(admin.get('username')) });
  res.json({ token, admin });
});

/* ── Dashboard ──────────────────────────────────────────── */
export const adminOverview = asyncHandler(async (_req, res) => {
  const [totalMembers, branches, activeMemberships, expiredMemberships, plans] =
    await Promise.all([
      Member.countDocuments(),
      Branch.find(),
      Membership.countDocuments({ status: 'active' }),
      Membership.countDocuments({ status: 'expired' }),
      MembershipPlan.countDocuments(),
    ]);

  const perBranchAgg = await Member.aggregate([
    { $group: { _id: '$branchId', count: { $sum: 1 } } },
  ]);
  const perBranch = branches.map((b) => ({
    branchId: b.id,
    name: b.get('name'),
    count:
      perBranchAgg.find((x) => String(x._id) === String(b._id))?.count || 0,
  }));

  res.json({
    totalMembers,
    activeMemberships,
    expiredMemberships,
    plans,
    branches: branches.length,
    perBranch,
  });
});

/* ── Members ────────────────────────────────────────────── */
export const adminListMembers = asyncHandler(async (req, res) => {
  const { branch, q } = req.query;
  const filter: Record<string, unknown> = {};
  if (branch) filter.branchId = String(branch);
  if (q) {
    const rx = new RegExp(String(q), 'i');
    filter.$or = [{ name: rx }, { phone: rx }, { email: rx }];
  }
  const members = await Member.find(filter)
    .populate('branchId')
    .sort({ createdAt: -1 });

  // attach current membership for each
  const memberships = await Membership.find({
    memberId: { $in: members.map((m) => m._id) },
  }).sort({ createdAt: -1 });
  const byMember = new Map<string, any>();
  for (const ms of memberships) {
    const key = String(ms.get('memberId'));
    if (!byMember.has(key)) byMember.set(key, ms);
  }
  res.json(
    members.map((m) => ({
      ...m.toJSON(),
      membership: byMember.get(String(m._id))?.toJSON() || null,
    }))
  );
});

export const adminGetMember = asyncHandler(async (req, res) => {
  const member = await Member.findById(req.params.id).populate('branchId');
  if (!member) throw new HttpError(404, 'Member not found');
  const [membership, payments, attendance] = await Promise.all([
    Membership.findOne({ memberId: member._id }).sort({ createdAt: -1 }),
    Payment.find({ memberId: member._id }).sort({ createdAt: -1 }),
    Attendance.find({ memberId: member._id }).sort({ date: -1 }).limit(60),
  ]);
  res.json({ ...member.toJSON(), membership, payments, attendance });
});

const memberSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().optional(),
  height: z.number().optional(),
  weight: z.number().optional(),
  goal: z.string().optional(),
  branchId: z.string().optional().nullable(),
  photo: z.string().optional(),
});

export const adminCreateMember = asyncHandler(async (req, res) => {
  const body = memberSchema.parse(req.body);
  const member = await Member.create(body);
  res.status(201).json(member);
});

export const adminUpdateMember = asyncHandler(async (req, res) => {
  const body = memberSchema.partial().parse(req.body);
  const member = await Member.findByIdAndUpdate(req.params.id, body, { new: true });
  if (!member) throw new HttpError(404, 'Member not found');
  res.json(member);
});

export const adminDeleteMember = asyncHandler(async (req, res) => {
  const member = await Member.findByIdAndDelete(req.params.id);
  if (!member) throw new HttpError(404, 'Member not found');
  await Promise.all([
    Membership.deleteMany({ memberId: member._id }),
    Payment.deleteMany({ memberId: member._id }),
    Attendance.deleteMany({ memberId: member._id }),
  ]);
  res.json({ ok: true });
});

const assignSchema = z.object({
  planId: z.string(),
  paymentMethod: z.enum(['cod', 'razorpay']).default('cod'),
  paymentStatus: z.enum(['pending', 'paid']).default('paid'),
});

export const adminAssignMembership = asyncHandler(async (req, res) => {
  const member = await Member.findById(req.params.id);
  if (!member) throw new HttpError(404, 'Member not found');
  const { planId, paymentMethod, paymentStatus } = assignSchema.parse(req.body);
  const plan = await MembershipPlan.findById(planId);
  if (!plan) throw new HttpError(404, 'Plan not found');

  const start = new Date();
  const membership = await Membership.create({
    memberId: member.id,
    planId: plan.id,
    planName: plan.name,
    startDate: start,
    expiryDate: expiryFrom(plan.interval as PlanInterval, start),
    status: 'active',
    paymentMethod,
    paymentStatus,
  });
  await Payment.create({
    memberId: member.id,
    membershipId: membership.id,
    amount: plan.price,
    currency: plan.currency,
    method: paymentMethod,
    status: paymentStatus,
    description: `${plan.name} (assigned by admin)`,
  });
  res.status(201).json(membership);
});

/* ── Generic CRUD factory for content entities ──────────── */
function crud(Entity: Model<any>) {
  return {
    list: asyncHandler(async (_req, res) => res.json(await Entity.find().sort({ createdAt: -1 }))),
    get: asyncHandler(async (req, res) => {
      const doc = await Entity.findById(req.params.id);
      if (!doc) throw new HttpError(404, 'Not found');
      res.json(doc);
    }),
    create: asyncHandler(async (req, res) => {
      const doc = await Entity.create(req.body);
      res.status(201).json(doc);
    }),
    update: asyncHandler(async (req, res) => {
      const doc = await Entity.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!doc) throw new HttpError(404, 'Not found');
      res.json(doc);
    }),
    remove: asyncHandler(async (req, res) => {
      const doc = await Entity.findByIdAndDelete(req.params.id);
      if (!doc) throw new HttpError(404, 'Not found');
      res.json({ ok: true });
    }),
  };
}

/** Map of admin-manageable content resources → CRUD handlers. */
export const adminResources: Record<string, ReturnType<typeof crud>> = {
  plans: crud(MembershipPlan),
  branches: crud(Branch),
  facilities: crud(Facility),
  trainers: crud(Trainer),
  testimonials: crud(Testimonial),
  gallery: crud(GalleryItem),
  stats: crud(Stat),
  announcements: crud(Announcement),
  workouts: crud(WorkoutPlan),
  diets: crud(DietPlan),
  quotes: crud(Quote),
  memberships: crud(Membership),
  notifications: crud(Notification),
};
