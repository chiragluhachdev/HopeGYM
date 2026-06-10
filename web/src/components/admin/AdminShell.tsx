'use client';

import { useState, useEffect, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  FiHome, FiUsers, FiGrid, FiMapPin, FiStar, FiImage, FiAward,
  FiMessageSquare, FiLogOut, FiMenu, FiX, FiTarget, FiActivity,
  FiHeart,
} from 'react-icons/fi';
import { isLoggedIn, clearToken } from '@/lib/adminApi';
import { cn } from '@/lib/cn';

const sidebarLinks = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: FiHome },
  { label: 'Members', href: '/admin/members', icon: FiUsers },
  { label: 'Plans', href: '/admin/resources/plans', icon: FiStar },
  { label: 'Branches', href: '/admin/resources/branches', icon: FiMapPin },
  { label: 'Facilities', href: '/admin/resources/facilities', icon: FiGrid },
  { label: 'Trainers', href: '/admin/resources/trainers', icon: FiTarget },
  { label: 'Gallery', href: '/admin/resources/gallery', icon: FiImage },
  { label: 'Announcements', href: '/admin/resources/announcements', icon: FiMessageSquare },
  { label: 'Testimonials', href: '/admin/resources/testimonials', icon: FiAward },
  { label: 'Workouts', href: '/admin/resources/workouts', icon: FiActivity },
  { label: 'Diets', href: '/admin/resources/diets', icon: FiHeart },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace('/admin');
    } else {
      setReady(true);
    }
  }, [router]);

  if (!ready) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0B0B0B]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#FFD400] border-t-transparent" />
      </div>
    );
  }

  function handleLogout() {
    clearToken();
    router.replace('/admin');
  }

  return (
    <div className="flex h-screen bg-[#0B0B0B] text-white">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/10 bg-[#0F0F0F] transition-transform duration-300 lg:static lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <span className="font-display text-2xl tracking-wider text-[#FFD400]">HOPE</span>
            <span className="text-xs font-semibold uppercase tracking-widest text-white/50">Admin</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="text-white/50 lg:hidden">
            <FiX size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {sidebarLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'mb-1 flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all',
                  active
                    ? 'bg-[#FFD400]/10 text-[#FFD400]'
                    : 'text-white/50 hover:bg-white/5 hover:text-white'
                )}
              >
                <link.icon size={18} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-white/50 transition-all hover:bg-red-500/10 hover:text-red-400"
          >
            <FiLogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex items-center gap-4 border-b border-white/10 bg-[#0B0B0B] px-5 py-3 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white/60 hover:text-white lg:hidden"
          >
            <FiMenu size={22} />
          </button>
          <h1 className="font-display text-xl uppercase tracking-wider text-white">
            {sidebarLinks.find((l) => pathname.startsWith(l.href))?.label || 'Admin'}
          </h1>
        </header>

        <main className="flex-1 overflow-y-auto p-5 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
