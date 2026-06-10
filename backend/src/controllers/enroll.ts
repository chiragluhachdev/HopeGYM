import { z } from 'zod';
import { asyncHandler, HttpError } from '../lib/asyncHandler';
import { Member, Membership, Payment, Notification } from '../models/member';
import { MembershipPlan } from '../models/content';
import { expiryFrom, type PlanInterval } from '../lib/membership';

const enrollSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email().optional().or(z.literal('')),
  branchId: z.string().optional(),
  planId: z.string(),
  paymentMethod: z.enum(['cod', 'razorpay']).default('cod'),
  height: z.number().optional(),
  weight: z.number().optional(),
  goal: z.string().optional(),
});

/**
 * Public registration: a new customer picks a plan, fills details and chooses
 * Cash on First Visit (cod) or the Razorpay placeholder. Creates/updates the
 * Member, an active Membership, a Payment, and a welcome Notification.
 */
export const postEnroll = asyncHandler(async (req, res) => {
  const body = enrollSchema.parse(req.body);

  const plan = await MembershipPlan.findById(body.planId);
  if (!plan) throw new HttpError(404, 'Plan not found');

  // Upsert member by phone.
  let member = await Member.findOne({ phone: body.phone });
  if (member) {
    member.name = body.name;
    if (body.email) member.email = body.email;
    if (body.branchId) member.set('branchId', body.branchId);
    if (body.height != null) member.height = body.height;
    if (body.weight != null) member.weight = body.weight;
    if (body.goal) member.goal = body.goal;
    await member.save();
  } else {
    member = await Member.create({
      name: body.name,
      phone: body.phone,
      email: body.email || '',
      branchId: body.branchId || null,
      height: body.height,
      weight: body.weight,
      goal: body.goal || '',
    });
  }

  const startDate = new Date();
  const expiryDate = expiryFrom(plan.interval as PlanInterval, startDate);
  const paid = body.paymentMethod === 'razorpay'; // placeholder marks paid

  const membership = await Membership.create({
    memberId: member.id,
    planId: plan.id,
    planName: plan.name,
    startDate,
    expiryDate,
    status: 'active',
    paymentMethod: body.paymentMethod,
    paymentStatus: paid ? 'paid' : 'pending',
  });

  await Payment.create({
    memberId: member.id,
    membershipId: membership.id,
    amount: plan.price,
    currency: plan.currency,
    method: body.paymentMethod,
    status: paid ? 'paid' : 'pending',
    description: `${plan.name} membership`,
    reference: paid ? 'razorpay_placeholder' : 'cash_on_first_visit',
  });

  await Notification.create({
    memberId: member.id,
    title: 'Welcome to Hope Gym & Spa! 🎉',
    body:
      body.paymentMethod === 'cod'
        ? `Your ${plan.name} plan is reserved. Pay in cash on your first visit to activate.`
        : `Your ${plan.name} plan is active. See you at the gym!`,
    type: 'membership',
  });

  res.status(201).json({ member, membership });
});
