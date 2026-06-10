'use client';

import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import type { MembershipPlan } from '@/types';
import { fadeUp } from '@/lib/animations';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/Button';


export function PlanCard({ plan }: { plan: MembershipPlan }) {
  const hl = plan.highlighted;
  return (
    <motion.div
      variants={fadeUp}
      className={cn(
        'relative flex flex-col rounded-3xl p-7 transition-all duration-300',
        hl ? 'bg-gold-gradient shadow-glow lg:-translate-y-4' : 'glass hover:border-white/20'
      )}
    >
      {hl && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-ink px-4 py-1 text-xs font-bold uppercase tracking-wider text-brand">
          Most Popular
        </span>
      )}

      <div className="flex items-center justify-between">
        <h3
          className={cn(
            'font-display text-2xl uppercase tracking-wide',
            hl ? 'text-ink' : 'text-white'
          )}
        >
          {plan.name}
        </h3>
        {plan.savings && (
          <span
            className={cn(
              'rounded-full px-3 py-1 text-xs font-semibold',
              hl ? 'bg-ink/15 text-ink' : 'bg-brand/15 text-brand-300'
            )}
          >
            {plan.savings}
          </span>
        )}
      </div>

      <p className={cn('mt-2 text-sm', hl ? 'text-ink/75' : 'text-white/50')}>
        {plan.description}
      </p>

      <div className="mt-6 flex items-end gap-1">
        <span
          className={cn(
            'font-display text-5xl leading-none',
            hl ? 'text-ink' : 'text-white'
          )}
        >
          {plan.currency}
          {plan.price.toLocaleString('en-IN')}
        </span>
        <span className={cn('pb-1 text-sm', hl ? 'text-ink/70' : 'text-white/50')}>
          {plan.period}
        </span>
      </div>

      <ul className="mt-7 flex-1 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <span
              className={cn(
                'mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full',
                hl ? 'bg-ink/15' : 'bg-brand/15'
              )}
            >
              <FaCheck size={10} className={hl ? 'text-ink' : 'text-brand'} />
            </span>
            <span className={hl ? 'text-ink/90' : 'text-white/70'}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Button
          href={`/membership/join?plan=${plan.id}`}
          variant={hl ? 'dark' : 'primary'}
          className="w-full"
        >
          {plan.cta}
        </Button>
      </div>
    </motion.div>
  );
}
