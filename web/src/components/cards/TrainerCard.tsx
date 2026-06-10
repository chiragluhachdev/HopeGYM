'use client';

import { motion } from 'framer-motion';
import { FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { FiAward } from 'react-icons/fi';
import type { Trainer } from '@/types';
import { Img } from '@/components/ui/Img';
import { fadeUp } from '@/lib/animations';

export function TrainerCard({ trainer }: { trainer: Trainer }) {
  return (
    <motion.article
      variants={fadeUp}
      className="group relative overflow-hidden rounded-3xl glass"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-ink-700">
        <Img
          src={trainer.image}
          alt={trainer.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-transparent" />

        {/* Socials slide in on hover */}
        {trainer.socials && (
          <div className="absolute right-4 top-4 flex translate-x-16 flex-col gap-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            {trainer.socials.instagram && (
              <SocialIcon href={trainer.socials.instagram} label="Instagram">
                <FaInstagram size={15} />
              </SocialIcon>
            )}
            {trainer.socials.twitter && (
              <SocialIcon href={trainer.socials.twitter} label="Twitter">
                <FaTwitter size={15} />
              </SocialIcon>
            )}
            {trainer.socials.linkedin && (
              <SocialIcon href={trainer.socials.linkedin} label="LinkedIn">
                <FaLinkedinIn size={15} />
              </SocialIcon>
            )}
          </div>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
          {trainer.role}
        </span>
        <h3 className="mt-1 font-display text-2xl uppercase tracking-wide text-white">
          {trainer.name}
        </h3>
        <p className="mt-1 text-sm text-white/60">
          {trainer.experience} • {trainer.specialization}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {trainer.certifications.map((cert) => (
            <span
              key={cert}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/75"
            >
              <FiAward size={11} className="text-brand" />
              {cert}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md transition-colors hover:bg-brand hover:text-ink"
    >
      {children}
    </a>
  );
}
