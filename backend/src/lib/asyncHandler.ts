import type { Request, Response, NextFunction, RequestHandler } from 'express';

/** Wraps an async route handler so rejected promises hit the error middleware. */
export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>): RequestHandler =>
  (req, res, next) => {
    fn(req, res, next).catch(next);
  };

/** Throw to return a specific HTTP status from anywhere in a handler. */
export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}
