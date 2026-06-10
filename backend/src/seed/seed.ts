/**
 * Seeds MongoDB with Hope Gym & Spa content (mirrors web/src/data) plus demo
 * members, memberships, attendance, notifications and an admin login.
 *
 * Run: `npm run seed`  (requires MONGODB_URI in backend/.env)
 */
import mongoose from 'mongoose';
import { connectDB } from '../config/db';
import { env } from '../config/env';
import { hashPassword } from '../lib/password';
import { expiryFrom, type PlanInterval } from '../lib/membership';
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
import { Member, Membership, Attendance, Payment, Notification } from '../models/member';
import { Admin } from '../models/admin';

const u = (id: string, w = 1200, q = 70) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;

const PHONE = '8796797503';

async function run() {
  await connectDB();
  console.log('Clearing collections…');
  await Promise.all([
    Branch.deleteMany({}),
    MembershipPlan.deleteMany({}),
    Facility.deleteMany({}),
    Trainer.deleteMany({}),
    Testimonial.deleteMany({}),
    GalleryItem.deleteMany({}),
    Stat.deleteMany({}),
    Announcement.deleteMany({}),
    WorkoutPlan.deleteMany({}),
    DietPlan.deleteMany({}),
    Quote.deleteMany({}),
    Member.deleteMany({}),
    Membership.deleteMany({}),
    Attendance.deleteMany({}),
    Payment.deleteMany({}),
    Notification.deleteMany({}),
    Admin.deleteMany({}),
  ]);

  /* ── Branches ─────────────────────────────────────────── */
  const branches = await Branch.insertMany([
    {
      name: 'Hope Gym & Spa — DLF Sector 11', slug: 'dlf-sector-11', city: 'Faridabad',
      address: 'Sector 11D, SCF-25, 1st & 2nd Floor, Faridabad 121006',
      phone: '+91 87967 97503', whatsapp: '918796797503', email: 'dlf11@hopegymspa.com',
      hours: 'Open Daily: 6:00 AM – 10:00 PM', image: u('1534438327276-14e5300c3a48'),
      mapsQuery: 'Hope Gym Spa Sector 11D SCF 25 Faridabad', featured: true,
    },
    {
      name: 'Hope Gym & Spa — NIT Faridabad', slug: 'nit-faridabad', city: 'Faridabad',
      address: 'Fruit Garden, NIT 5, Faridabad 121001',
      phone: '+91 87967 97503', whatsapp: '918796797503', email: 'nit@hopegymspa.com',
      hours: 'Open Daily: 5:30 AM – 10:30 PM', image: u('1571902943202-507ec2618e8f'),
      mapsQuery: 'Hope Gym Spa Fruit Garden NIT 5 Faridabad', featured: true,
    },
    {
      name: 'Hope Gym & Spa — Sector 85', slug: 'sector-85', city: 'Faridabad',
      address: 'BPTP Parkstreet, Sector 85, Faridabad 121002',
      phone: '+91 87967 97503', whatsapp: '918796797503', email: 'sector85@hopegymspa.com',
      hours: 'Open Daily: 5:00 AM – 10:00 PM', image: u('1558611848-73f7eb4001a1'),
      mapsQuery: 'Hope Gym Spa BPTP Parkstreet Sector 85 Faridabad', featured: true,
    },
    {
      name: 'Hope Gym & Spa — Sector 43', slug: 'sector-43', city: 'Faridabad',
      address: 'Green Fields Colony, Sector 43, Faridabad 121010',
      phone: '+91 87967 97503', whatsapp: '918796797503', email: 'sector43@hopegymspa.com',
      hours: 'Open Daily: 6:00 AM – 10:00 PM', image: u('1605296867304-46d5465a13f1'),
      mapsQuery: 'Hope Gym Spa Green Fields Colony Sector 43 Faridabad', featured: false,
    },
    {
      name: 'Hope Gym — Gurugram', slug: 'gurugram', city: 'Gurugram',
      address: 'Gurugram, Haryana',
      phone: '+91 87967 97503', whatsapp: '918796797503', email: 'gurugram@hopegymspa.com',
      hours: 'Open Daily: 5:30 AM – 10:30 PM', image: u('1540497077202-7c8a3999166f'),
      mapsQuery: 'Hope Gym Gurugram', featured: false,
    },
  ]);

  /* ── Plans ────────────────────────────────────────────── */
  const plans = await MembershipPlan.insertMany([
    { name: 'Monthly', interval: 'monthly', price: 1999, period: '/month', order: 1,
      description: 'Perfect for trying us out with full access, zero commitment.',
      features: ['Access to home branch', 'Cardio & strength zones', '2 group classes / week', 'Locker access', 'Fitness assessment'] },
    { name: 'Quarterly', interval: 'quarterly', price: 4999, period: '/3 months', savings: 'Save 16%', order: 2,
      description: 'Build momentum with a season of unlimited training.',
      features: ['Access to home branch', 'Unlimited group classes', '1 personal training session', 'Locker + towel service', 'Diet & nutrition guide'] },
    { name: 'Half-Yearly', interval: 'half-yearly', price: 8999, period: '/6 months', savings: 'Save 25%', highlighted: true, order: 3,
      description: 'Our most popular plan — serious progress, serious value.',
      features: ['Access to ALL branches', 'Unlimited group classes', '4 personal training sessions', 'Locker + towel + steam room', 'Personalised workout plan', 'Priority class booking'] },
    { name: 'Annual', interval: 'annual', price: 14999, period: '/year', savings: 'Save 37%', order: 4,
      description: 'The ultimate commitment to your transformation.',
      features: ['Access to ALL branches', 'Unlimited everything', '12 personal training sessions', 'Full spa & steam access', 'Quarterly body composition scan', 'Free Hope Gym merch kit', 'Guest passes (4 / year)'] },
  ]);

  /* ── Facilities ───────────────────────────────────────── */
  await Facility.insertMany([
    { name: 'Strength Training', icon: 'strength', order: 1, description: 'Premium imported free weights, plate-loaded machines and Olympic platforms for every level.', image: u('1534438327276-14e5300c3a48') },
    { name: 'Cardio Zone', icon: 'cardio', order: 2, description: 'State-of-the-art treadmills, ellipticals, rowers and bikes with immersive entertainment.', image: u('1517836357463-d25dfeac3438') },
    { name: 'Functional Training', icon: 'functional', order: 3, description: 'Kettlebells, battle ropes, sleds and rigs for explosive, real-world strength.', image: u('1599058917212-d750089bc07e') },
    { name: 'CrossFit & HIIT', icon: 'crossfit', order: 4, description: 'High-intensity interval training and a dedicated CrossFit box with competition-grade gear.', image: u('1549060279-7e168fcee0c2') },
    { name: 'Yoga', icon: 'yoga', order: 5, description: 'Restorative yoga and mobility sessions to build flexibility, balance and calm.', image: u('1601925260368-ae2f83cf8b7f') },
    { name: 'Zumba Classes', icon: 'zumba', order: 6, description: 'High-energy dance-fitness classes that torch calories while you have a blast.', image: u('1518611012118-696072aa579a') },
    { name: 'Personal Training', icon: 'personal', order: 7, description: 'One-on-one coaching from certified trainers with tailored programs and accountability.', image: u('1571019614242-c5c5dee9f50b') },
    { name: 'Spa & Wellness', icon: 'spa', order: 8, description: 'Unwind and recover with steam, sauna and spa services (at selected branches).', image: u('1554344728-77cf90d9ed26') },
  ]);

  /* ── Trainers ─────────────────────────────────────────── */
  await Trainer.insertMany([
    { name: 'Arjun Mehta', role: 'Head Strength Coach', experience: '12+ years', specialization: 'Powerlifting & Hypertrophy', certifications: ['NSCA-CSCS', 'IFBB Pro Coach'], image: u('1567013127542-490d757e51fc', 800), order: 1 },
    { name: 'Priya Nair', role: 'Functional & HIIT Specialist', experience: '8+ years', specialization: 'Fat Loss & Conditioning', certifications: ['ACE-CPT', 'CrossFit L2'], image: u('1594381898411-846e7d193883', 800), order: 2 },
    { name: 'Rohan Kapoor', role: 'CrossFit Head Trainer', experience: '10+ years', specialization: 'Olympic Lifting & WODs', certifications: ['CrossFit L3', 'USAW'], image: u('1583454110551-21f2fa2afe61', 800), order: 3 },
    { name: 'Sneha Reddy', role: 'Yoga & Mobility Coach', experience: '9+ years', specialization: 'Yoga, Flexibility & Recovery', certifications: ['RYT-500', 'FRC Mobility'], image: u('1574680178050-55c6a6a96e0a', 800), order: 4 },
    { name: 'Vikram Singh', role: 'Personal Training Lead', experience: '11+ years', specialization: 'Body Recomposition', certifications: ['NASM-CPT', 'PN-1 Nutrition'], image: u('1583468982228-19f19164aee2', 800), order: 5 },
    { name: 'Ananya Iyer', role: 'Dance Fitness & Zumba', experience: '7+ years', specialization: 'Zumba & Cardio Dance', certifications: ['Zumba ZIN', 'ACE Group Fitness'], image: u('1548690312-e3b507d8c110', 800), order: 6 },
  ]);

  /* ── Testimonials ─────────────────────────────────────── */
  await Testimonial.insertMany([
    { name: 'Rahul Sharma', role: 'Member • DLF Sector 11', rating: 5, image: u('1500648767791-00dcc994a43e', 400), quote: 'Excellent trainers and modern equipment. The atmosphere keeps me motivated every single day. Easily one of the best gyms in Faridabad.' },
    { name: 'Pooja Verma', role: 'Lost 14 kg • NIT Faridabad', rating: 5, image: u('1544005313-94ddf0286df2', 400), quote: 'One of the best gyms in Faridabad for body transformation and personal training. The diet guidance made all the difference for me.' },
    { name: 'Aman Gupta', role: 'Member • Sector 85', rating: 5, image: u('1506794778202-cad84cf45f1d', 400), quote: 'Spacious, air-conditioned and spotless. The CrossFit and functional zones are top class, and the trainers genuinely care about your progress.' },
    { name: 'Neha Singh', role: 'Zumba & Yoga • Sector 43', rating: 5, image: u('1438761681033-6461ffad8d80', 400), quote: 'I love the Zumba and Yoga sessions! Such a friendly community and the spa after a workout is the perfect way to unwind. Highly recommend.' },
  ]);

  /* ── Gallery ──────────────────────────────────────────── */
  await GalleryItem.insertMany([
    { src: u('1534438327276-14e5300c3a48', 900), alt: 'Members training with free weights', category: 'strength' },
    { src: u('1517836357463-d25dfeac3438', 900), alt: 'Rows of treadmills in the cardio zone', category: 'cardio' },
    { src: u('1518611012118-696072aa579a', 900), alt: 'High-energy group fitness class', category: 'classes' },
    { src: u('1571902943202-507ec2618e8f', 900), alt: 'Spacious gym floor with premium machines', category: 'facility' },
    { src: u('1599058917212-d750089bc07e', 900), alt: 'Functional training with battle ropes', category: 'strength' },
    { src: u('1574680096145-d05b474e2155', 900), alt: 'Member running on a treadmill', category: 'cardio' },
    { src: u('1601422407692-ec4eeec1d9b3', 900), alt: 'Yoga and stretching class', category: 'classes' },
    { src: u('1558611848-73f7eb4001a1', 900), alt: 'Modern gym reception and lounge', category: 'facility' },
    { src: u('1581009146145-b5ef050c2e1e', 900), alt: 'Dumbbell rack in the weights area', category: 'strength' },
    { src: u('1533560904424-a0c61dc306fc', 900), alt: 'CrossFit box with rigs and equipment', category: 'classes' },
    { src: u('1526506118085-60ce8714f8c5', 900), alt: 'Spin cycling studio', category: 'cardio' },
    { src: u('1554344728-77cf90d9ed26', 900), alt: 'Steam room and recovery area', category: 'facility' },
  ]);

  /* ── Stats ────────────────────────────────────────────── */
  await Stat.insertMany([
    { label: 'Active Members', value: 1000, suffix: '+', order: 1 },
    { label: 'Transformations', value: 10000, suffix: '+', order: 2 },
    { label: 'Certified Trainers', value: 20, suffix: '+', order: 3 },
    { label: 'Years of Excellence', value: 8, suffix: '+', order: 4 },
  ]);

  /* ── Announcements ────────────────────────────────────── */
  await Announcement.insertMany([
    { title: 'New Year Transformation Offer', type: 'offer', date: new Date(), body: 'Flat 25% off on Annual memberships this month. Start your journey now!' },
    { title: 'Free Zumba Marathon', type: 'event', date: new Date(), body: 'Join our 2-hour Zumba marathon this Saturday at all branches. Open to all members.' },
    { title: 'Holiday Timings', type: 'holiday', date: new Date(), body: 'Gym will operate 7 AM – 12 PM on the upcoming public holiday.' },
  ]);

  /* ── Quotes ───────────────────────────────────────────── */
  await Quote.insertMany([
    { text: 'The body achieves what the mind believes.', author: 'Hope Gym & Spa' },
    { text: 'Push yourself, because no one else is going to do it for you.', author: 'Unknown' },
    { text: 'Success starts with self-discipline.', author: 'Unknown' },
    { text: "Don't limit your challenges. Challenge your limits.", author: 'Unknown' },
    { text: 'Sweat is just fat crying.', author: 'Hope Gym & Spa' },
  ]);

  /* ── Workouts (4 categories) ──────────────────────────── */
  await WorkoutPlan.insertMany([
    { category: 'weight-loss', title: 'Fat-Burn Circuit', image: u('1517836357463-d25dfeac3438', 900), exercises: [
      { name: 'Treadmill Intervals', sets: '1', reps: '20 min', rest: '—', instructions: 'Alternate 1 min sprint / 2 min jog.' },
      { name: 'Kettlebell Swings', sets: '4', reps: '15', rest: '45s', instructions: 'Drive from the hips, keep core tight.' },
      { name: 'Burpees', sets: '4', reps: '12', rest: '45s', instructions: 'Explosive jump, full chest-to-floor.' },
      { name: 'Mountain Climbers', sets: '3', reps: '40', rest: '30s', instructions: 'Fast pace, hips low.' },
    ] },
    { category: 'muscle-gain', title: 'Hypertrophy Push', image: u('1534438327276-14e5300c3a48', 900), exercises: [
      { name: 'Bench Press', sets: '4', reps: '8–10', rest: '90s', instructions: 'Controlled descent, full lockout.' },
      { name: 'Incline Dumbbell Press', sets: '4', reps: '10', rest: '75s', instructions: 'Squeeze at the top.' },
      { name: 'Shoulder Press', sets: '3', reps: '10', rest: '75s', instructions: 'Keep core braced.' },
      { name: 'Tricep Pushdown', sets: '3', reps: '12–15', rest: '60s', instructions: 'Elbows pinned to sides.' },
    ] },
    { category: 'strength', title: 'Powerlifting Base', image: u('1599058917212-d750089bc07e', 900), exercises: [
      { name: 'Back Squat', sets: '5', reps: '5', rest: '3 min', instructions: 'Brace, break at hips, drive up.' },
      { name: 'Deadlift', sets: '4', reps: '4', rest: '3 min', instructions: 'Neutral spine, bar close to shins.' },
      { name: 'Overhead Press', sets: '4', reps: '5', rest: '2 min', instructions: 'Glutes tight, no leg drive.' },
      { name: 'Pull-Ups', sets: '4', reps: 'AMRAP', rest: '2 min', instructions: 'Full hang to chin over bar.' },
    ] },
    { category: 'cardio', title: 'Endurance Builder', image: u('1526506118085-60ce8714f8c5', 900), exercises: [
      { name: 'Rowing', sets: '1', reps: '15 min', rest: '—', instructions: 'Steady pace, drive with legs.' },
      { name: 'Cycling', sets: '1', reps: '20 min', rest: '—', instructions: 'Moderate resistance, 80–90 rpm.' },
      { name: 'Jump Rope', sets: '5', reps: '2 min', rest: '60s', instructions: 'Light on the feet.' },
      { name: 'Incline Walk', sets: '1', reps: '10 min', rest: '—', instructions: 'Cooldown at 8–10% incline.' },
    ] },
  ]);

  /* ── Generic diet plan ────────────────────────────────── */
  await DietPlan.create({
    title: 'Balanced Daily Plan', memberId: null,
    meals: {
      breakfast: ['4 egg-white omelette', 'Oats with banana', 'Black coffee'],
      lunch: ['Grilled chicken / paneer', 'Brown rice', 'Mixed salad', 'Curd'],
      snacks: ['Whey protein shake', 'Handful of almonds', 'Green tea'],
      dinner: ['Grilled fish / tofu', 'Sautéed veggies', 'Quinoa'],
    },
    water: '3–4 L', calories: 2100, protein: 150, preparedBy: 'Hope Gym & Spa Coaches',
  });

  /* ── Admin ────────────────────────────────────────────── */
  await Admin.create({
    username: env.admin.username,
    passwordHash: hashPassword(env.admin.password),
    name: 'Gym Owner',
  });

  /* ── Members ──────────────────────────────────────────── */
  const sector43 = branches.find((b) => b.get('slug') === 'sector-43')!;
  const annual = plans.find((p) => p.get('interval') === 'annual')!;

  const main = await Member.create({
    name: 'Chirag', phone: PHONE, email: 'chirag@example.com',
    height: 178, weight: 74, goal: 'Muscle Gain', branchId: sector43._id,
  });

  // a few more members spread across branches so the admin branch filter is useful
  const extra = await Member.insertMany(
    [
      ['Rohit Sharma', '9810000001', 0, 'monthly'],
      ['Anjali Mehta', '9810000002', 1, 'quarterly'],
      ['Karan Verma', '9810000003', 2, 'half-yearly'],
      ['Simran Kaur', '9810000004', 3, 'monthly'],
      ['Dev Patel', '9810000005', 1, 'annual'],
    ].map(([name, phone, bIdx]) => ({
      name, phone, branchId: branches[bIdx as number]._id, goal: 'Fat Loss',
    }))
  );

  // Gold/Annual membership for the main member — expiry 15 Jan 2027 (matches app mockup)
  const mainMembership = await Membership.create({
    memberId: main._id, planId: annual._id, planName: annual.get('name'),
    startDate: new Date('2026-01-16'), expiryDate: new Date('2027-01-15'),
    status: 'active', paymentMethod: 'razorpay', paymentStatus: 'paid',
  });
  await Payment.create({
    memberId: main._id, membershipId: mainMembership._id, amount: annual.get('price'),
    method: 'razorpay', status: 'paid', description: 'Annual membership', reference: 'razorpay_placeholder',
  });

  // memberships for the extra members
  await Promise.all(
    extra.map((m, i) => {
      const plan = plans[i % plans.length];
      const start = new Date();
      return Membership.create({
        memberId: m._id, planId: plan._id, planName: plan.get('name'),
        startDate: start, expiryDate: expiryFrom(plan.get('interval') as PlanInterval, start),
        status: 'active', paymentMethod: 'cod', paymentStatus: 'pending',
      });
    })
  );

  /* ── Attendance for main member (last 30 days) ────────── */
  const attendance: { memberId: any; date: Date; status: string }[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - i);
    // present most days; skip Sundays + a couple random misses
    const present = d.getDay() !== 0 && !(i === 5 || i === 12);
    attendance.push({ memberId: main._id, date: d, status: present ? 'present' : 'absent' });
  }
  await Attendance.insertMany(attendance);

  /* ── Notifications for main member ────────────────────── */
  await Notification.insertMany([
    { memberId: main._id, title: 'Welcome to Hope Gym & Spa! 🎉', body: 'Your Annual membership is active. Crush your goals!', type: 'membership' },
    { memberId: null, title: '25% off Annual plans', body: 'New Year transformation offer — this month only.', type: 'offer' },
    { memberId: null, title: 'Free Zumba Marathon', body: 'This Saturday at all branches. See you there!', type: 'event' },
  ]);

  console.log('✓ Seed complete');
  console.log(`  Admin login: ${env.admin.username} / ${env.admin.password}`);
  console.log(`  Demo member phone: ${PHONE} (any OTP)`);
  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
