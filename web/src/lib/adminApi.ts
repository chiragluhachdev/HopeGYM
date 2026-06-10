/**
 * Admin API client.
 * Uses Bearer token stored in localStorage. All requests go to the backend.
 */

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://hopegym.onrender.com';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('admin_token');
}

export function setToken(token: string) {
  localStorage.setItem('admin_token', token);
}

export function clearToken() {
  localStorage.removeItem('admin_token');
}

export function isLoggedIn(): boolean {
  return !!getToken();
}

async function adminFetch<T = any>(
  path: string,
  opts: RequestInit = {},
): Promise<T> {
  const token = getToken();
  const res = await fetch(`${API_URL}/api${path}`, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(opts.headers || {}),
    },
  });
  if (res.status === 401) {
    clearToken();
    if (typeof window !== 'undefined') window.location.href = '/admin';
    throw new Error('Unauthorized');
  }
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || data.message || `Error ${res.status}`);
  }
  return res.json();
}

/* ── Auth ─────────────────────────────────────────── */
export async function adminLogin(username: string, password: string) {
  const data = await adminFetch<{ token: string; admin: any }>('/admin/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
  setToken(data.token);
  return data;
}

/* ── Dashboard ────────────────────────────────────── */
export function getOverview() {
  return adminFetch<{
    totalMembers: number;
    activeMemberships: number;
    expiredMemberships: number;
    plans: number;
    branches: number;
    perBranch: { branchId: string; name: string; count: number }[];
  }>('/admin/overview');
}

/* ── Members ──────────────────────────────────────── */
export function getMembers(branch?: string, q?: string) {
  const params = new URLSearchParams();
  if (branch) params.set('branch', branch);
  if (q) params.set('q', q);
  const qs = params.toString();
  return adminFetch<any[]>(`/admin/members${qs ? `?${qs}` : ''}`);
}

export function getMember(id: string) {
  return adminFetch<any>(`/admin/members/${id}`);
}

export function createMember(body: any) {
  return adminFetch('/admin/members', { method: 'POST', body: JSON.stringify(body) });
}

export function updateMember(id: string, body: any) {
  return adminFetch(`/admin/members/${id}`, { method: 'PUT', body: JSON.stringify(body) });
}

export function deleteMember(id: string) {
  return adminFetch(`/admin/members/${id}`, { method: 'DELETE' });
}

export function assignMembership(memberId: string, body: any) {
  return adminFetch(`/admin/members/${memberId}/membership`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

/* ── Generic resource CRUD ────────────────────────── */
export function listResource(resource: string) {
  return adminFetch<any[]>(`/admin/${resource}`);
}

export function getResource(resource: string, id: string) {
  return adminFetch<any>(`/admin/${resource}/${id}`);
}

export function createResource(resource: string, body: any) {
  return adminFetch(`/admin/${resource}`, { method: 'POST', body: JSON.stringify(body) });
}

export function updateResource(resource: string, id: string, body: any) {
  return adminFetch(`/admin/${resource}/${id}`, { method: 'PUT', body: JSON.stringify(body) });
}

export function deleteResource(resource: string, id: string) {
  return adminFetch(`/admin/${resource}/${id}`, { method: 'DELETE' });
}
