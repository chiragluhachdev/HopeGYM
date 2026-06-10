'use client';

import { useEffect, useState } from 'react';
import { FiUsers, FiActivity, FiAlertCircle, FiMapPin } from 'react-icons/fi';
import { AdminShell } from '@/components/admin/AdminShell';
import { getOverview } from '@/lib/adminApi';

interface Overview {
  totalMembers: number;
  activeMemberships: number;
  expiredMemberships: number;
  plans: number;
  branches: number;
  perBranch: { branchId: string; name: string; count: number }[];
}

function StatCard({ icon: Icon, label, value, accent }: { icon: any; label: string; value: number | string; accent?: boolean }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-center gap-3">
        <div className={`grid h-10 w-10 place-items-center rounded-xl ${accent ? 'bg-[#FFD400]/15 text-[#FFD400]' : 'bg-white/5 text-white/50'}`}>
          <Icon size={20} />
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{value}</p>
          <p className="text-xs text-white/50">{label}</p>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [data, setData] = useState<Overview | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getOverview()
      .then(setData)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <AdminShell>
      {error && (
        <p className="mb-4 rounded-xl bg-red-500/10 p-3 text-sm text-red-400">{error}</p>
      )}

      {!data ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#FFD400] border-t-transparent" />
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard icon={FiUsers} label="Total Members" value={data.totalMembers} accent />
            <StatCard icon={FiActivity} label="Active Memberships" value={data.activeMemberships} accent />
            <StatCard icon={FiAlertCircle} label="Expired Memberships" value={data.expiredMemberships} />
            <StatCard icon={FiMapPin} label="Branches" value={data.branches} />
          </div>

          <div className="mt-8">
            <h2 className="mb-4 font-display text-2xl uppercase tracking-wide text-white">
              Members by Branch
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {data.perBranch.map((b) => (
                <div
                  key={b.branchId}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4"
                >
                  <span className="text-sm font-medium text-white/80">{b.name}</span>
                  <span className="rounded-full bg-[#FFD400]/10 px-3 py-1 text-sm font-bold text-[#FFD400]">
                    {b.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </AdminShell>
  );
}
