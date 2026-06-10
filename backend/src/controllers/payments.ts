import { asyncHandler } from '../lib/asyncHandler';
import { createRazorpayOrder, verifyRazorpayPayment } from '../lib/razorpay';

// ⚠️ PLACEHOLDER — see src/lib/razorpay.ts. Cash on First Visit is the live flow.
export const postRazorpayOrder = asyncHandler(async (req, res) => {
  const amount = Number(req.body?.amount) || 0;
  res.json(createRazorpayOrder(amount));
});

export const postRazorpayVerify = asyncHandler(async (req, res) => {
  res.json(verifyRazorpayPayment(req.body || {}));
});
