import dotenv from 'dotenv';

dotenv.config();

function bool(v: string | undefined, fallback: boolean) {
  if (v === undefined) return fallback;
  return v === 'true' || v === '1';
}

export const env = {
  mongoUri: process.env.MONGODB_URI || '',
  port: Number(process.env.PORT || 4000),
  corsOrigin: process.env.CORS_ORIGIN || '*',
  jwtSecret: process.env.JWT_SECRET || 'change-me-in-production',
  dummyOtp: bool(process.env.DUMMY_OTP, true),
  admin: {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || 'admin123',
  },
  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID || '',
    keySecret: process.env.RAZORPAY_KEY_SECRET || '',
    enabled: Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET),
  },
};
