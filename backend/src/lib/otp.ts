import { env } from '../config/env';

/**
 * Dummy OTP. While DUMMY_OTP=true (default) any 4–6 digit code verifies.
 * `requestOtp` is a no-op that pretends to send. Swap for a real SMS provider
 * later by checking a stored code here.
 */
export function requestOtp(_phone: string): { sent: true; dummy: boolean } {
  return { sent: true, dummy: env.dummyOtp };
}

export function verifyOtp(_phone: string, code: string): boolean {
  if (env.dummyOtp) return /^\d{4,6}$/.test(code.trim());
  // Real verification would go here.
  return false;
}
