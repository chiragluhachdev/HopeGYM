'use client';

import { useState, type FormEvent } from 'react';
import { FiSend, FiCheck } from 'react-icons/fi';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    // Demo only — wire to an email service / admin API later.
    setDone(true);
    setEmail('');
    setTimeout(() => setDone(false), 4000);
  }

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-wide text-white">
        Join our newsletter
      </p>
      <p className="mt-1 text-xs text-white/50">
        Fitness tips, offers & news — straight to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          aria-label="Email address"
          className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-brand focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand text-ink transition-colors hover:bg-brand-300"
        >
          {done ? <FiCheck size={18} /> : <FiSend size={16} />}
        </button>
      </form>
      {done && (
        <p className="mt-2 text-xs text-brand-300">
          Thanks for subscribing! 🎉
        </p>
      )}
    </div>
  );
}
