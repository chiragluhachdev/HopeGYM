'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import { AdminShell } from '@/components/admin/AdminShell';
import {
  getMembers, createMember, updateMember, deleteMember,
  assignMembership, listResource,
} from '@/lib/adminApi';

interface MemberRow {
  id: string;
  name: string;
  phone: string;
  email: string;
  branchId?: any;
  membership?: { planName: string; status: string; expiryDate: string } | null;
}

export default function MembersPage() {
  const [members, setMembers] = useState<MemberRow[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [plans, setPlans] = useState<any[]>([]);
  const [branchFilter, setBranchFilter] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<'add' | 'edit' | 'assign' | null>(null);
  const [editTarget, setEditTarget] = useState<MemberRow | null>(null);
  const [form, setForm] = useState({ name: '', phone: '', email: '', branchId: '', height: '', weight: '', goal: '' });
  const [assignForm, setAssignForm] = useState({ planId: '', paymentMethod: 'cod', paymentStatus: 'paid' });
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const [m, b, p] = await Promise.all([
        getMembers(branchFilter || undefined, search || undefined),
        listResource('branches'),
        listResource('plans'),
      ]);
      setMembers(m);
      setBranches(b);
      setPlans(p);
    } catch {}
    setLoading(false);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { load(); }, [branchFilter]);

  function openAdd() {
    setForm({ name: '', phone: '', email: '', branchId: branches[0]?.id || '', height: '', weight: '', goal: '' });
    setModal('add');
  }

  function openEdit(m: MemberRow) {
    setEditTarget(m);
    setForm({
      name: m.name,
      phone: m.phone,
      email: m.email || '',
      branchId: m.branchId?.id || m.branchId || '',
      height: '', weight: '', goal: '',
    });
    setModal('edit');
  }

  function openAssign(m: MemberRow) {
    setEditTarget(m);
    setAssignForm({ planId: plans[0]?.id || '', paymentMethod: 'cod', paymentStatus: 'paid' });
    setModal('assign');
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const body: any = { ...form, height: form.height ? Number(form.height) : undefined, weight: form.weight ? Number(form.weight) : undefined };
      if (!body.branchId) delete body.branchId;
      if (modal === 'add') await createMember(body);
      else if (modal === 'edit' && editTarget) await updateMember(editTarget.id, body);
      setModal(null);
      await load();
    } catch (err: any) {
      alert(err.message || 'Failed to save');
    }
    setSaving(false);
  }

  async function handleAssign(e: FormEvent) {
    e.preventDefault();
    if (!editTarget) return;
    setSaving(true);
    try {
      await assignMembership(editTarget.id, assignForm);
      setModal(null);
      await load();
    } catch (err: any) {
      alert(err.message || 'Failed to assign plan');
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this member and all their data?')) return;
    try {
      await deleteMember(id);
      await load();
    } catch (err: any) {
      alert(err.message || 'Failed to delete');
    }
  }

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    load();
  }

  const inputCls = 'w-full rounded-lg border border-white/15 bg-white/[0.04] px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-[#FFD400] focus:outline-none';
  const labelCls = 'mb-1 block text-xs font-semibold uppercase tracking-wide text-white/50';

  return (
    <AdminShell>
      {/* Toolbar */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <form onSubmit={handleSearch} className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-xs">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name / phone..."
              className={`${inputCls} pl-9`}
            />
          </div>
          <button type="submit" className="rounded-lg bg-white/5 px-3 py-2 text-sm text-white/60 hover:bg-white/10">Go</button>
        </form>

        <select
          value={branchFilter}
          onChange={(e) => setBranchFilter(e.target.value)}
          className={`${inputCls} max-w-[200px]`}
        >
          <option value="" className="bg-[#121212]">All Branches</option>
          {branches.map((b: any) => (
            <option key={b.id} value={b.id} className="bg-[#121212]">{b.name}</option>
          ))}
        </select>

        <button
          onClick={openAdd}
          className="flex items-center gap-2 rounded-lg bg-[#FFD400] px-4 py-2 text-sm font-semibold text-[#0B0B0B] hover:bg-[#FFDF47]"
        >
          <FiPlus size={16} /> Add Member
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex h-40 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#FFD400] border-t-transparent" />
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02]">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-white/50">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-white/50">Phone</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-white/50">Branch</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-white/50">Membership</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-white/50">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-white/50">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-sm text-white/40">No members found</td></tr>
              )}
              {members.map((m) => (
                <tr key={m.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="px-4 py-3 text-sm font-medium text-white">{m.name}</td>
                  <td className="px-4 py-3 text-sm text-white/70">{m.phone}</td>
                  <td className="px-4 py-3 text-sm text-white/70">{m.branchId?.name || '—'}</td>
                  <td className="px-4 py-3 text-sm text-white/70">{m.membership?.planName || '—'}</td>
                  <td className="px-4 py-3">
                    {m.membership ? (
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        m.membership.status === 'active' ? 'bg-green-500/15 text-green-400' : 'bg-red-500/15 text-red-400'
                      }`}>
                        {m.membership.status}
                      </span>
                    ) : (
                      <span className="text-xs text-white/30">None</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openAssign(m)} className="rounded-lg p-1.5 text-[#FFD400]/60 hover:bg-[#FFD400]/10 hover:text-[#FFD400]" title="Assign Plan">
                        <FiPlus size={16} />
                      </button>
                      <button onClick={() => openEdit(m)} className="rounded-lg p-1.5 text-white/40 hover:bg-white/5 hover:text-white" title="Edit">
                        <FiEdit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(m.id)} className="rounded-lg p-1.5 text-red-400/40 hover:bg-red-500/10 hover:text-red-400" title="Delete">
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal — Add / Edit Member */}
      {(modal === 'add' || modal === 'edit') && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4" onClick={() => setModal(null)}>
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#121212] p-6" onClick={(e) => e.stopPropagation()}>
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-display text-xl uppercase text-white">{modal === 'add' ? 'Add Member' : 'Edit Member'}</h3>
              <button onClick={() => setModal(null)} className="text-white/40 hover:text-white"><FiX size={20} /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelCls}>Name *</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Phone *</label>
                  <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Email</label>
                  <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Branch</label>
                  <select value={form.branchId} onChange={(e) => setForm({ ...form, branchId: e.target.value })} className={inputCls}>
                    <option value="" className="bg-[#121212]">None</option>
                    {branches.map((b: any) => (
                      <option key={b.id} value={b.id} className="bg-[#121212]">{b.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button type="submit" disabled={saving} className="w-full rounded-lg bg-[#FFD400] py-2.5 font-semibold text-[#0B0B0B] hover:bg-[#FFDF47] disabled:opacity-60">
                {saving ? 'Saving…' : 'Save'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal — Assign Membership */}
      {modal === 'assign' && editTarget && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4" onClick={() => setModal(null)}>
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#121212] p-6" onClick={(e) => e.stopPropagation()}>
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-display text-xl uppercase text-white">Assign Plan — {editTarget.name}</h3>
              <button onClick={() => setModal(null)} className="text-white/40 hover:text-white"><FiX size={20} /></button>
            </div>
            <form onSubmit={handleAssign} className="space-y-4">
              <div>
                <label className={labelCls}>Plan *</label>
                <select required value={assignForm.planId} onChange={(e) => setAssignForm({ ...assignForm, planId: e.target.value })} className={inputCls}>
                  {plans.map((p: any) => (
                    <option key={p.id} value={p.id} className="bg-[#121212]">{p.name} — ₹{p.price}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Payment Method</label>
                  <select value={assignForm.paymentMethod} onChange={(e) => setAssignForm({ ...assignForm, paymentMethod: e.target.value })} className={inputCls}>
                    <option value="cod" className="bg-[#121212]">Cash</option>
                    <option value="razorpay" className="bg-[#121212]">Razorpay</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Status</label>
                  <select value={assignForm.paymentStatus} onChange={(e) => setAssignForm({ ...assignForm, paymentStatus: e.target.value })} className={inputCls}>
                    <option value="paid" className="bg-[#121212]">Paid</option>
                    <option value="pending" className="bg-[#121212]">Pending</option>
                  </select>
                </div>
              </div>
              <button type="submit" disabled={saving} className="w-full rounded-lg bg-[#FFD400] py-2.5 font-semibold text-[#0B0B0B] hover:bg-[#FFDF47] disabled:opacity-60">
                {saving ? 'Assigning…' : 'Assign Membership'}
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
