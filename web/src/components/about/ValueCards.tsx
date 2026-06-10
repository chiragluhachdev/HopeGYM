'use client';

import { motion } from 'framer-motion';
import { FiHeart, FiUsers, FiZap, FiAward } from 'react-icons/fi';
import { StaggerGroup } from '@/components/ui/StaggerGroup';
import { fadeUp } from '@/lib/animations';

const values = [
  {
    icon: FiHeart,
    title: 'Passion',
    text: 'We live and breathe fitness, and that energy is contagious across every branch.',
  },
  {
    icon: FiUsers,
    title: 'Community',
    text: 'A welcoming, judgement-free family that lifts each other up — literally.',
  },
  {
    icon: FiZap,
    title: 'Excellence',
    text: 'Premium equipment, expert coaching and spotless spaces, every single day.',
  },
  {
    icon: FiAward,
    title: 'Integrity',
    text: 'Honest guidance and transparent plans. Your goals always come first.',
  },
];

export function ValueCards() {
  return (
    <StaggerGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {values.map(({ icon: Icon, title, text }) => (
        <motion.div
          key={title}
          variants={fadeUp}
          className="group rounded-3xl glass p-7 text-center transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
        >
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand/15 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-ink">
            <Icon size={28} />
          </span>
          <h3 className="mt-5 font-display text-2xl uppercase tracking-wide text-white">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white/55">{text}</p>
        </motion.div>
      ))}
    </StaggerGroup>
  );
}
