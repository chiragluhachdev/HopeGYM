'use client';

import { useState, type FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiCreditCard, FiDollarSign } from 'react-icons/fi';
import type { MembershipPlan, Branch } from '@/types';
import { cn } from '@/lib/cn';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://hopegym.onrender.com';

interface JoinFormProps {
  plans: MembershipPlan[];
  branches: Branch[];
}

export function JoinForm({ plans, branches }: JoinFormProps) {
  const searchParams = useSearchParams();
  const preselected = searchParams.get('plan') || plans[0]?.id || '';

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    planId: preselected,
    branchId: branches[0]?.id || '',
    paymentMethod: 'cod' as 'cod' | 'razorpay',
    height: '',
    weight: '',
    goal: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const selectedPlan = plans.find((p) => p.id === form.planId);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch(`${API_URL}/api/enroll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          height: form.height ? Number(form.height) : undefined,
          weight: form.weight ? Number(form.weight) : undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || `Error ${res.status}`);
      }
      setStatus('success');
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  }

  const field =
    'w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/35 transition-colors focus:border-brand focus:outline-none';
  const label =
    'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/60';

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-xl rounded-3xl glass p-10 text-center"
      >
        <FiCheckCircle className="mx-auto text-6xl text-brand" />
        <h2 className="mt-5 font-display text-4xl uppercase tracking-wide text-white">
          You&apos;re in!
        </h2>
        <p className="mt-3 text-white/60">
          {form.paymentMethod === 'cod'
            ? 'Your membership is reserved. Pay in cash on your first visit to activate.'
            : 'Payment processed (placeholder). Your membership is now active!'}
        </p>
        <p className="mt-6 text-sm text-white/40">
          We&apos;ll reach out at <span className="text-brand">{form.phone}</span> with next steps.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-3xl rounded-3xl glass p-7 sm:p-10"
    >
      <h2 className="mb-8 font-display text-3xl uppercase tracking-wide text-white sm:text-4xl">
        Your Details
      </h2>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="join-name" className={label}>Full Name *</label>
          <input id="join-name" required value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Your name" className={field} />
        </div>
        <div>
          <label htmlFor="join-phone" className={label}>Phone *</label>
          <input id="join-phone" type="tel" required value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+91 98765 43210" className={field} />
        </div>
        <div>
          <label htmlFor="join-email" className={label}>Email</label>
          <input id="join-email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@email.com" className={field} />
        </div>
        <div>
          <label htmlFor="join-branch" className={label}>Preferred Branch *</label>
          <select id="join-branch" required value={form.branchId} onChange={(e) => update('branchId', e.target.value)} className={field}>
            {branches.map((b) => (
              <option key={b.id} value={b.id} className="bg-ink-800">{b.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="join-height" className={label}>Height (cm)</label>
          <input id="join-height" type="number" value={form.height} onChange={(e) => update('height', e.target.value)} placeholder="175" className={field} />
        </div>
        <div>
          <label htmlFor="join-weight" className={label}>Weight (kg)</label>
          <input id="join-weight" type="number" value={form.weight} onChange={(e) => update('weight', e.target.value)} placeholder="70" className={field} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="join-goal" className={label}>Fitness Goal</label>
          <input id="join-goal" value={form.goal} onChange={(e) => update('goal', e.target.value)} placeholder="Weight loss, muscle gain, general fitness..." className={field} />
        </div>
      </div>

      {/* Plan selection */}
      <h3 className="mb-4 mt-10 font-display text-2xl uppercase tracking-wide text-white">
        Choose Your Plan
      </h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => (
          <button
            key={plan.id}
            type="button"
            onClick={() => update('planId', plan.id)}
            className={cn(
              'rounded-2xl border p-4 text-left transition-all',
              form.planId === plan.id
                ? 'border-brand bg-brand/10 shadow-glow'
                : 'border-white/10 bg-white/[0.02] hover:border-white/20'
            )}
          >
            <span className="font-display text-lg uppercase text-white">{plan.name}</span>
            <span className="mt-1 block font-display text-2xl text-brand">
              {plan.currency}{plan.price.toLocaleString('en-IN')}
            </span>
            <span className="block text-xs text-white/50">{plan.period}</span>
            {plan.savings && (
              <span className="mt-2 inline-block rounded-full bg-brand/15 px-2 py-0.5 text-xs font-semibold text-brand">
                {plan.savings}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Payment method */}
      <h3 className="mb-4 mt-10 font-display text-2xl uppercase tracking-wide text-white">
        Payment Method
      </h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => update('paymentMethod', 'cod')}
          className={cn(
            'flex items-center gap-4 rounded-2xl border p-5 text-left transition-all',
            form.paymentMethod === 'cod'
              ? 'border-brand bg-brand/10 shadow-glow'
              : 'border-white/10 bg-white/[0.02] hover:border-white/20'
          )}
        >
          <FiDollarSign className="text-2xl text-brand" />
          <div>
            <span className="block font-semibold text-white">Cash on First Visit</span>
            <span className="text-xs text-white/50">Pay when you visit the gym</span>
          </div>
        </button>
        <button
          type="button"
          onClick={() => update('paymentMethod', 'razorpay')}
          className={cn(
            'flex items-center gap-4 rounded-2xl border p-5 text-left transition-all',
            form.paymentMethod === 'razorpay'
              ? 'border-brand bg-brand/10 shadow-glow'
              : 'border-white/10 bg-white/[0.02] hover:border-white/20'
          )}
        >
          <FiCreditCard className="text-2xl text-brand" />
          <div>
            <span className="block font-semibold text-white">Pay Online</span>
            <span className="text-xs text-white/50">Razorpay (placeholder)</span>
          </div>
        </button>
      </div>

      {/* Summary */}
      {selectedPlan && (
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/60">Selected Plan</span>
            <span className="font-display text-xl text-white">{selectedPlan.name}</span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm text-white/60">Total</span>
            <span className="font-display text-3xl text-brand">
              {selectedPlan.currency}{selectedPlan.price.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      )}

      {/* Error */}
      <AnimatePresence>
        {status === 'error' && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-4 rounded-xl bg-red-500/10 p-3 text-center text-sm text-red-400"
          >
            {errorMsg}
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-8 w-full rounded-full bg-brand px-8 py-4 font-semibold text-ink shadow-glow transition-all hover:bg-brand-300 hover:-translate-y-0.5 disabled:opacity-60"
      >
        {status === 'submitting' ? 'Processing…' : 'Complete Registration'}
      </button>
    </form>
  );
}
