import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export interface MemberToken {
  sub: string; // member id
  phone: string;
  role: 'member';
}

export interface AdminToken {
  sub: string; // admin id
  username: string;
  role: 'admin';
}

export function signMemberToken(payload: Omit<MemberToken, 'role'>): string {
  return jwt.sign({ ...payload, role: 'member' }, env.jwtSecret, {
    expiresIn: '30d',
  });
}

export function signAdminToken(payload: Omit<AdminToken, 'role'>): string {
  return jwt.sign({ ...payload, role: 'admin' }, env.jwtSecret, {
    expiresIn: '7d',
  });
}

export function verifyToken<T extends object = MemberToken | AdminToken>(
  token: string
): T {
  return jwt.verify(token, env.jwtSecret) as T;
}
