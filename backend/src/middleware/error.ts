import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { HttpError } from '../lib/asyncHandler';

export function notFound(_req: Request, res: Response) {
  res.status(404).json({ error: 'Not found' });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof ZodError) {
    return res.status(400).json({ error: 'Validation failed', details: err.flatten() });
  }
  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: err.message });
  }
  // Mongoose duplicate key
  if (typeof err === 'object' && err && (err as { code?: number }).code === 11000) {
    return res.status(409).json({ error: 'Duplicate value', details: (err as any).keyValue });
  }
  // Mongoose ValidationError
  if (typeof err === 'object' && err && (err as { name?: string }).name === 'ValidationError') {
    return res.status(400).json({ error: (err as any).message });
  }
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
}
