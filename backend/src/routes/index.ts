import { Router } from 'express';
import * as content from '../controllers/content';
import * as auth from '../controllers/auth';
import { postEnroll } from '../controllers/enroll';
import * as payments from '../controllers/payments';
import * as me from '../controllers/member';
import * as admin from '../controllers/admin';
import { requireMember } from '../middleware/auth';
import { requireAdmin } from '../middleware/admin';
import { HttpError } from '../lib/asyncHandler';

const router = Router();

/* ── Public content ─────────────────────────────────────── */
router.get('/branches', content.getBranches);
router.get('/plans', content.getPlans);
router.get('/facilities', content.getFacilities);
router.get('/trainers', content.getTrainers);
router.get('/testimonials', content.getTestimonials);
router.get('/gallery', content.getGallery);
router.get('/stats', content.getStats);
router.get('/announcements', content.getAnnouncements);

/* ── Auth + enrollment ──────────────────────────────────── */
router.post('/auth/request-otp', auth.postRequestOtp);
router.post('/auth/verify-otp', auth.postVerifyOtp);
router.post('/enroll', postEnroll);

/* ── Payments (Razorpay placeholder) ────────────────────── */
router.post('/payments/razorpay/order', payments.postRazorpayOrder);
router.post('/payments/razorpay/verify', payments.postRazorpayVerify);

/* ── Member-protected ───────────────────────────────────── */
router.get('/me', requireMember, me.getMe);
router.put('/me', requireMember, me.updateMe);
router.get('/me/membership', requireMember, me.getMyMembership);
router.post('/me/membership/renew', requireMember, me.renewMembership);
router.get('/me/payments', requireMember, me.getMyPayments);
router.get('/me/attendance', requireMember, me.getMyAttendance);
router.post('/me/attendance/checkin', requireMember, me.checkInAttendance);
router.get('/me/notifications', requireMember, me.getMyNotifications);
router.put('/me/notifications/:id/read', requireMember, me.markNotificationRead);
router.get('/workouts', requireMember, me.getWorkouts);
router.get('/diet', requireMember, me.getDiet);
router.get('/motivation', requireMember, me.getMotivation);

/* ── Admin ──────────────────────────────────────────────── */
router.post('/admin/login', admin.adminLogin);
router.get('/admin/overview', requireAdmin, admin.adminOverview);
router.get('/admin/members', requireAdmin, admin.adminListMembers);
router.get('/admin/members/:id', requireAdmin, admin.adminGetMember);
router.post('/admin/members', requireAdmin, admin.adminCreateMember);
router.put('/admin/members/:id', requireAdmin, admin.adminUpdateMember);
router.delete('/admin/members/:id', requireAdmin, admin.adminDeleteMember);
router.post('/admin/members/:id/membership', requireAdmin, admin.adminAssignMembership);

// Generic CRUD for content resources: /admin/:resource[/:id]
router.use('/admin/:resource', requireAdmin, (req, res, next) => {
  const handlers = admin.adminResources[req.params.resource];
  if (!handlers) return next(new HttpError(404, `Unknown resource: ${req.params.resource}`));
  (req as any).crud = handlers;
  next();
});
router.get('/admin/:resource', (req, res, next) => (req as any).crud.list(req, res, next));
router.post('/admin/:resource', (req, res, next) => (req as any).crud.create(req, res, next));
router.get('/admin/:resource/:id', (req, res, next) => (req as any).crud.get(req, res, next));
router.put('/admin/:resource/:id', (req, res, next) => (req as any).crud.update(req, res, next));
router.delete('/admin/:resource/:id', (req, res, next) => (req as any).crud.remove(req, res, next));

export default router;
