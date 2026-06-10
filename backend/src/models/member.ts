import { Schema, model } from 'mongoose';
import { withJsonId } from './base';

/* ── Member ─────────────────────────────────────────────── */
const memberSchema = withJsonId(
  new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, default: '' },
    height: { type: Number },
    weight: { type: Number },
    goal: { type: String, default: '' },
    branchId: { type: Schema.Types.ObjectId, ref: 'Branch', default: null },
    photo: { type: String, default: '' },
  })
);
export const Member = model('Member', memberSchema);

/* ── Membership (a member's current subscription) ───────── */
const membershipSchema = withJsonId(
  new Schema({
    memberId: { type: Schema.Types.ObjectId, ref: 'Member', required: true },
    planId: { type: Schema.Types.ObjectId, ref: 'MembershipPlan' },
    planName: { type: String, required: true },
    startDate: { type: Date, default: Date.now },
    expiryDate: { type: Date, required: true },
    status: { type: String, enum: ['active', 'expired'], default: 'active' },
    paymentMethod: { type: String, enum: ['cod', 'razorpay'], default: 'cod' },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid'],
      default: 'pending',
    },
  })
);
export const Membership = model('Membership', membershipSchema);

/* ── Attendance ─────────────────────────────────────────── */
const attendanceSchema = withJsonId(
  new Schema({
    memberId: { type: Schema.Types.ObjectId, ref: 'Member', required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['present', 'absent'], default: 'present' },
  })
);
attendanceSchema.index({ memberId: 1, date: 1 }, { unique: true });
export const Attendance = model('Attendance', attendanceSchema);

/* ── Payment ────────────────────────────────────────────── */
const paymentSchema = withJsonId(
  new Schema({
    memberId: { type: Schema.Types.ObjectId, ref: 'Member', required: true },
    membershipId: { type: Schema.Types.ObjectId, ref: 'Membership' },
    amount: { type: Number, required: true },
    currency: { type: String, default: '₹' },
    method: { type: String, enum: ['cod', 'razorpay'], default: 'cod' },
    status: { type: String, enum: ['pending', 'paid'], default: 'pending' },
    reference: { type: String, default: '' },
    description: { type: String, default: '' },
  })
);
export const Payment = model('Payment', paymentSchema);

/* ── Notification ───────────────────────────────────────── */
const notificationSchema = withJsonId(
  new Schema({
    // null memberId = broadcast to everyone
    memberId: { type: Schema.Types.ObjectId, ref: 'Member', default: null },
    title: { type: String, required: true },
    body: { type: String, default: '' },
    type: {
      type: String,
      enum: ['membership', 'offer', 'event', 'class', 'holiday', 'general'],
      default: 'general',
    },
    read: { type: Boolean, default: false },
  })
);
export const Notification = model('Notification', notificationSchema);
