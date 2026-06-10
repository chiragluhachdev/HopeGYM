'use client';

import { useState, type FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { adminLogin, isLoggedIn } from '@/lib/adminApi';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn()) router.replace('/admin/dashboard');
  }, [router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await adminLogin(username, password);
      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B0B0B] px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="font-display text-5xl tracking-wider text-[#FFD400]">HOPE</h1>
          <p className="mt-1 text-sm font-semibold uppercase tracking-[0.3em] text-white/40">
            Admin Panel
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
        >
          <h2 className="mb-6 text-center text-lg font-semibold text-white">Sign In</h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="admin-user" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/50">
                Username
              </label>
              <input
                id="admin-user"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#FFD400] focus:outline-none"
                placeholder="admin"
              />
            </div>
            <div>
              <label htmlFor="admin-pass" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/50">
                Password
              </label>
              <input
                id="admin-pass"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#FFD400] focus:outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <p className="mt-4 rounded-lg bg-red-500/10 p-3 text-center text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-full bg-[#FFD400] px-6 py-3 font-semibold text-[#0B0B0B] transition-all hover:bg-[#FFDF47] disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-white/30">
          Default: admin / admin123
        </p>
      </div>
    </div>
  );
}
