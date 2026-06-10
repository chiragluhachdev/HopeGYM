import { randomBytes } from 'crypto';
import { env } from '../config/env';

/**
 * ⚠️ PLACEHOLDER ONLY — Razorpay is NOT live.
 *
 * These stubs let the app/website wire up the Razorpay UI flow without real
 * keys or charges. The working payment option is "Cash on First Visit".
 * To go live later: install the `razorpay` SDK, set RAZORPAY_KEY_* in .env,
 * and replace these with real order creation + signature verification.
 */

export function createRazorpayOrder(amount: number, currency = 'INR') {
  return {
    placeholder: true,
    enabled: env.razorpay.enabled, // false until real keys are added
    id: `order_stub_${randomBytes(8).toString('hex')}`,
    amount: amount * 100, // paise
    currency,
    status: 'created',
    note: 'Placeholder order — no real payment processed.',
  };
}

export function verifyRazorpayPayment(_payload: Record<string, unknown>) {
  // Always "succeeds" in placeholder mode.
  return { placeholder: true, verified: true };
}
