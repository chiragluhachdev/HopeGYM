import type { Request, Response, NextFunction } from 'express';
import { verifyToken, type MemberToken } from '../lib/jwt';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      member?: MemberToken;
      admin?: { sub: string; username: string; role: 'admin' };
    }
  }
}

function bearer(req: Request): string | null {
  const h = req.headers.authorization;
  if (!h || !h.startsWith('Bearer ')) return null;
  return h.slice(7);
}

/** Requires a valid member JWT. */
export function requireMember(req: Request, res: Response, next: NextFunction) {
  const token = bearer(req);
  if (!token) return res.status(401).json({ error: 'Missing token' });
  try {
    const payload = verifyToken<MemberToken>(token);
    if (payload.role !== 'member') {
      return res.status(403).json({ error: 'Member access required' });
    }
    req.member = payload;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
