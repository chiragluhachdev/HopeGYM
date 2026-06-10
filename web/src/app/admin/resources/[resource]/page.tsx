'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { useParams } from 'next/navigation';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import { AdminShell } from '@/components/admin/AdminShell';
import { listResource, createResource, updateResource, deleteResource } from '@/lib/adminApi';

/** Maps resource keys to the fields we show in the table and form. */
const resourceConfig: Record<string, { label: string; columns: string[]; formFields: { key: string; label: string; type?: string; required?: boolean }[] }> = {
  plans: {
    label: 'Membership Plans',
    columns: ['name', 'price', 'interval'],
    formFields: [
      { key: 'name', label: 'Name', required: true },
      { key: 'interval', label: 'Interval (monthly/quarterly/half-yearly/annual)', required: true },
      { key: 'price', label: 'Price', type: 'number', required: true },
      { key: 'currency', label: 'Currency' },
      { key: 'period', label: 'Period Label (/month)' },
      { key: 'savings', label: 'Savings Label' },
      { key: 'description', label: 'Description' },
      { key: 'cta', label: 'CTA Text' },
    ],
  },
  branches: {
    label: 'Branches',
    columns: ['name', 'city', 'phone'],
    formFields: [
      { key: 'name', label: 'Name', required: true },
      { key: 'slug', label: 'Slug', required: true },
      { key: 'city', label: 'City', required: true },
      { key: 'address', label: 'Address', required: true },
      { key: 'phone', label: 'Phone' },
      { key: 'whatsapp', label: 'WhatsApp' },
      { key: 'email', label: 'Email' },
      { key: 'hours', label: 'Hours' },
      { key: 'image', label: 'Image URL' },
      { key: 'mapsQuery', label: 'Maps Query' },
    ],
  },
  facilities: {
    label: 'Facilities',
    columns: ['name', 'description'],
    formFields: [
      { key: 'name', label: 'Name', required: true },
      { key: 'description', label: 'Description', required: true },
      { key: 'icon', label: 'Icon Key' },
      { key: 'image', label: 'Image URL' },
    ],
  },
  trainers: {
    label: 'Trainers',
    columns: ['name', 'role', 'experience'],
    formFields: [
      { key: 'name', label: 'Name', required: true },
      { key: 'role', label: 'Role', required: true },
      { key: 'experience', label: 'Experience' },
      { key: 'specialization', label: 'Specialization' },
      { key: 'image', label: 'Image URL' },
    ],
  },
  gallery: {
    label: 'Gallery',
    columns: ['alt', 'category'],
    formFields: [
      { key: 'src', label: 'Image URL', required: true },
      { key: 'alt', label: 'Alt Text', required: true },
      { key: 'category', label: 'Category (cardio/strength/classes/facility)', required: true },
    ],
  },
  announcements: {
    label: 'Announcements',
    columns: ['title', 'type'],
    formFields: [
      { key: 'title', label: 'Title', required: true },
      { key: 'body', label: 'Body', required: true },
      { key: 'type', label: 'Type' },
    ],
  },
  testimonials: {
    label: 'Testimonials',
    columns: ['name', 'role', 'rating'],
    formFields: [
      { key: 'name', label: 'Name', required: true },
      { key: 'role', label: 'Role', required: true },
      { key: 'quote', label: 'Quote', required: true },
      { key: 'rating', label: 'Rating (1-5)', type: 'number', required: true },
      { key: 'image', label: 'Image URL' },
    ],
  },
  workouts: {
    label: 'Workout Plans',
    columns: ['title', 'category'],
    formFields: [
      { key: 'title', label: 'Title', required: true },
      { key: 'category', label: 'Category', required: true },
      { key: 'image', label: 'Image URL' },
    ],
  },
  diets: {
    label: 'Diet Plans',
    columns: ['title', 'calories'],
    formFields: [
      { key: 'title', label: 'Title', required: true },
      { key: 'water', label: 'Water' },
      { key: 'calories', label: 'Calories', type: 'number' },
      { key: 'protein', label: 'Protein (g)', type: 'number' },
    ],
  },
};

export default function ResourcePage() {
  const params = useParams();
  const resource = params.resource as string;
  const config = resourceConfig[resource];

  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<'add' | 'edit' | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const data = await listResource(resource);
      setItems(data);
    } catch {}
    setLoading(false);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { load(); }, [resource]);

  if (!config) {
    return (
      <AdminShell>
        <p className="text-white/50">Unknown resource: {resource}</p>
      </AdminShell>
    );
  }

  function openAdd() {
    const initial: Record<string, any> = {};
    config.formFields.forEach((f) => (initial[f.key] = ''));
    setForm(initial);
    setEditId(null);
    setModal('add');
  }

  function openEdit(item: any) {
    const initial: Record<string, any> = {};
    config.formFields.forEach((f) => (initial[f.key] = item[f.key] ?? ''));
    setForm(initial);
    setEditId(item.id);
    setModal('edit');
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const body = { ...form };
      // Convert numeric fields
      config.formFields.forEach((f) => {
        if (f.type === 'number' && body[f.key] !== '') body[f.key] = Number(body[f.key]);
      });
      if (modal === 'add') await createResource(resource, body);
      else if (modal === 'edit' && editId) await updateResource(resource, editId, body);
      setModal(null);
      await load();
    } catch (err: any) {
      alert(err.message || 'Failed to save');
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this item?')) return;
    try {
      await deleteResource(resource, id);
      await load();
    } catch (err: any) {
      alert(err.message || 'Failed to delete');
    }
  }

  const inputCls = 'w-full rounded-lg border border-white/15 bg-white/[0.04] px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-[#FFD400] focus:outline-none';
  const labelCls = 'mb-1 block text-xs font-semibold uppercase tracking-wide text-white/50';

  return (
    <AdminShell>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-2xl uppercase tracking-wide text-white">{config.label}</h2>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 rounded-lg bg-[#FFD400] px-4 py-2 text-sm font-semibold text-[#0B0B0B] hover:bg-[#FFDF47]"
        >
          <FiPlus size={16} /> Add
        </button>
      </div>

      {loading ? (
        <div className="flex h-40 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#FFD400] border-t-transparent" />
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02]">
                {config.columns.map((col) => (
                  <th key={col} className="px-4 py-3 text-left text-xs font-semibold uppercase text-white/50">
                    {col}
                  </th>
                ))}
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-white/50">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr><td colSpan={config.columns.length + 1} className="px-4 py-8 text-center text-sm text-white/40">No items</td></tr>
              )}
              {items.map((item) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                  {config.columns.map((col) => (
                    <td key={col} className="px-4 py-3 text-sm text-white/70">
                      {typeof item[col] === 'object' ? JSON.stringify(item[col]) : String(item[col] ?? '—')}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(item)} className="rounded-lg p-1.5 text-white/40 hover:bg-white/5 hover:text-white" title="Edit">
                        <FiEdit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="rounded-lg p-1.5 text-red-400/40 hover:bg-red-500/10 hover:text-red-400" title="Delete">
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

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4" onClick={() => setModal(null)}>
          <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-[#121212] p-6" onClick={(e) => e.stopPropagation()}>
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-display text-xl uppercase text-white">
                {modal === 'add' ? `Add ${config.label}` : `Edit ${config.label}`}
              </h3>
              <button onClick={() => setModal(null)} className="text-white/40 hover:text-white"><FiX size={20} /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              {config.formFields.map((f) => (
                <div key={f.key}>
                  <label className={labelCls}>{f.label}{f.required ? ' *' : ''}</label>
                  <input
                    required={f.required}
                    type={f.type || 'text'}
                    value={form[f.key] ?? ''}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    className={inputCls}
                  />
                </div>
              ))}
              <button type="submit" disabled={saving} className="w-full rounded-lg bg-[#FFD400] py-2.5 font-semibold text-[#0B0B0B] hover:bg-[#FFDF47] disabled:opacity-60">
                {saving ? 'Saving…' : 'Save'}
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
