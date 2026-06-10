'use client';

import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiClock } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import type { Branch } from '@/types';
import { Img } from '@/components/ui/Img';
import { fadeUp } from '@/lib/animations';
import { Button } from '@/components/ui/Button';
import { whatsappLink } from '@/lib/site';

export function BranchCard({ branch }: { branch: Branch }) {
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    branch.mapsQuery
  )}`;

  return (
    <motion.article
      variants={fadeUp}
      className="group flex flex-col overflow-hidden rounded-3xl glass transition-all duration-300 hover:border-white/20 hover:shadow-card"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-ink-700">
        <Img
          src={branch.image}
          alt={branch.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/20 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-brand px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink shadow-glow">
          {branch.city}
        </span>
        <h3 className="absolute bottom-4 left-5 right-5 font-display text-2xl uppercase tracking-wide text-white">
          {branch.name}
        </h3>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <ul className="space-y-3 text-sm text-white/60">
          <li className="flex gap-3">
            <FiMapPin className="mt-0.5 shrink-0 text-brand" />
            {branch.address}
          </li>
          <li className="flex gap-3">
            <FiClock className="mt-0.5 shrink-0 text-brand" />
            {branch.hours}
          </li>
          <li>
            <a
              href={`tel:${branch.phone.replace(/\s/g, '')}`}
              className="flex gap-3 transition-colors hover:text-brand"
            >
              <FiPhone className="mt-0.5 shrink-0 text-brand" />
              {branch.phone}
            </a>
          </li>
        </ul>

        {/* Embedded map */}
        <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
          <iframe
            title={`Map of ${branch.name}`}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(
              branch.mapsQuery
            )}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-40 w-full grayscale transition-all duration-500 hover:grayscale-0"
          />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button
            href={whatsappLink(
              `Hi Hope Gym & Spa! I'd like to enquire about the ${branch.name} branch.`
            )}
            size="sm"
          >
            <FaWhatsapp size={16} /> Enquire
          </Button>
          <Button href={mapsLink} variant="outline" size="sm">
            Directions
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
