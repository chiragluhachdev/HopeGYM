'use client';

import { useState, type FormEvent } from 'react';
import { FiSend, FiCheckCircle } from 'react-icons/fi';
import { branches } from '@/data/branches';

const initial = {
  name: '',
  email: '',
  phone: '',
  branch: branches[0].slug,
  message: '',
};

export function ContactForm() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('sending');
    // Demo only — wire this to an API route / admin enquiries endpoint later.
    setTimeout(() => {
      setStatus('sent');
      setForm(initial);
      setTimeout(() => setStatus('idle'), 5000);
    }, 900);
  }

  const field =
    'w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/35 transition-colors focus:border-brand focus:outline-none';
  const label = 'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/60';

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl glass p-10 text-center">
        <FiCheckCircle className="text-5xl text-brand" />
        <h3 className="mt-4 font-display text-3xl uppercase tracking-wide text-white">
          Message sent!
        </h3>
        <p className="mt-2 text-white/60">
          Thanks for reaching out. Our team will get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl glass p-7 sm:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Full Name
          </label>
          <input
            id="name"
            required
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="John Doe"
            className={field}
          />
        </div>
        <div>
          <label htmlFor="phone" className={label}>
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            required
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            placeholder="+91 98765 43210"
            className={field}
          />
        </div>
        <div>
          <label htmlFor="email" className={label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="you@email.com"
            className={field}
          />
        </div>
        <div>
          <label htmlFor="branch" className={label}>
            Preferred Branch
          </label>
          <select
            id="branch"
            value={form.branch}
            onChange={(e) => update('branch', e.target.value)}
            className={field}
          >
            {branches.map((b) => (
              <option key={b.id} value={b.slug} className="bg-ink-800">
                {b.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className={label}>
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          placeholder="Tell us about your fitness goals..."
          className={`${field} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 font-semibold text-ink shadow-glow transition-all hover:bg-brand-300 disabled:opacity-60 sm:w-auto"
      >
        {status === 'sending' ? 'Sending…' : 'Send Message'}
        <FiSend size={16} />
      </button>
    </form>
  );
}
