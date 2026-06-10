import { z } from 'zod';
import { asyncHandler, HttpError } from '../lib/asyncHandler';
import { requestOtp, verifyOtp } from '../lib/otp';
import { signMemberToken } from '../lib/jwt';
import { Member } from '../models/member';

const phoneSchema = z.object({ phone: z.string().min(8) });
const verifySchema = z.object({ phone: z.string().min(8), otp: z.string().min(4) });

export const postRequestOtp = asyncHandler(async (req, res) => {
  const { phone } = phoneSchema.parse(req.body);
  const result = requestOtp(phone);
  // In dummy mode we tell the client any 4–6 digit code works.
  res.json({ ...result, message: result.dummy ? 'Enter any 4–6 digit code to continue.' : 'OTP sent.' });
});

export const postVerifyOtp = asyncHandler(async (req, res) => {
  const { phone, otp } = verifySchema.parse(req.body);
  if (!verifyOtp(phone, otp)) throw new HttpError(401, 'Invalid OTP');

  // Find existing member or create a lightweight one on first login.
  let member = await Member.findOne({ phone });
  if (!member) {
    member = await Member.create({ name: 'Member', phone });
  }

  const token = signMemberToken({ sub: member.id, phone: member.phone });
  res.json({ token, member });
});
