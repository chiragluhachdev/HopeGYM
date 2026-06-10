import type { Request, Response, NextFunction } from 'express';
import { verifyToken, type AdminToken } from '../lib/jwt';

/** Requires a valid admin JWT (role=admin). */
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const h = req.headers.authorization;
  const token = h && h.startsWith('Bearer ') ? h.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Missing token' });
  try {
    const payload = verifyToken<AdminToken>(token);
    if (payload.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    req.admin = payload;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
