'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { Button } from '@/components/ui/Button';
import type { Stat } from '@/types';
import { CountUp } from '@/components/ui/CountUp';
import { whatsappLink } from '@/lib/site';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero({ stats }: { stats: Stat[] }) {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2000&q=80"
          alt="Athlete training at Hope Gym"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/85 to-ink-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-ink-900/60" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 pt-28 pb-16 sm:px-8 sm:pt-32">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-brand" />
            Faridabad&apos;s Premium Fitness Destination
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 font-display text-6xl uppercase leading-[0.9] tracking-tight text-white sm:text-7xl md:text-8xl"
          >
            Train Hard. Stay Strong.
            <br />
            <span className="text-brand-gradient">Become Your Best.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
          >
            Join Faridabad&apos;s premium fitness destination — world-class
            equipment, certified trainers, personalized coaching and an
            inspiring environment built to transform your body and your life.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button href="/membership" size="lg">
              Join Now <FiArrowRight />
            </Button>
            <Button
              href={whatsappLink(
                'Hi Hope Gym & Spa! I would like to book a free trial session.'
              )}
              variant="outline"
              size="lg"
            >
              <FaWhatsapp size={18} /> Book Free Trial
            </Button>
          </motion.div>

          {/* Inline stats */}
          <motion.div
            variants={item}
            className="mt-10 grid max-w-2xl grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.id}>
                <p className="font-display text-3xl text-white sm:text-4xl">
                  <CountUp end={s.value} prefix={s.prefix} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-xs uppercase tracking-wide text-white/50">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block">
        <div className="flex h-10 w-6 justify-center rounded-full border border-white/25 p-1.5">
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="h-1.5 w-1.5 rounded-full bg-brand"
          />
        </div>
      </div>
    </section>
  );
}
