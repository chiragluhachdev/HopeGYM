'use client';

import { motion } from 'framer-motion';
import type { Facility } from '@/types';
import { Img } from '@/components/ui/Img';
import { fadeUp } from '@/lib/animations';
import { facilityIcons } from '@/components/icons';

export function FacilityCard({ facility }: { facility: Facility }) {
  const Icon = facilityIcons[facility.icon];

  return (
    <motion.article
      variants={fadeUp}
      className="group relative flex flex-col overflow-hidden rounded-3xl glass transition-all duration-300 hover:border-white/20"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-700">
        <Img
          src={facility.image}
          alt={facility.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent" />
        <span className="absolute left-4 top-4 grid h-12 w-12 place-items-center rounded-2xl bg-brand text-ink shadow-glow backdrop-blur-sm">
          {Icon && <Icon size={22} />}
        </span>
      </div>
      <div className="p-6">
        <h3 className="font-display text-xl uppercase tracking-wide text-white">
          {facility.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/55">
          {facility.description}
        </p>
      </div>
    </motion.article>
  );
}
