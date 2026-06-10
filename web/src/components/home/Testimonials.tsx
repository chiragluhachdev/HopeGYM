'use client';

import { useState } from 'react';
import { Img } from '@/components/ui/Img';
import { AnimatePresence, motion } from 'framer-motion';
import { FaStar, FaQuoteRight } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Section, SectionHeading } from '@/components/ui/Section';
import type { Testimonial } from '@/types';

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const active = testimonials[index];

  const go = (dir: number) =>
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);

  return (
    <Section>
      <SectionHeading
        eyebrow="Success Stories"
        title="Real people. Real results."
        description="Don't just take our word for it — hear from the Hope Gym community."
      />

      <div className="mx-auto mt-10 max-w-4xl">
        <div className="relative rounded-[2rem] glass p-8 sm:p-12">
          <FaQuoteRight className="absolute right-8 top-8 text-5xl text-brand/20" />

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
            >
              <div className="flex gap-1 text-brand">
                {Array.from({ length: active.rating }).map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              <blockquote className="mt-5 text-xl leading-relaxed text-white/85 sm:text-2xl">
                “{active.quote}”
              </blockquote>

              <div className="mt-8 flex items-center gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-full bg-ink-700 ring-2 ring-brand/40">
                  <Img
                    src={active.image}
                    alt={active.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-white">{active.name}</p>
                  <p className="text-sm text-brand-300">{active.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-7 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => go(-1)}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-brand hover:bg-brand hover:text-ink"
          >
            <FiChevronLeft size={20} />
          </button>

          <div className="flex gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                type="button"
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? 'w-8 bg-brand' : 'w-2 bg-white/25'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => go(1)}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-brand hover:bg-brand hover:text-ink"
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>
    </Section>
  );
}
