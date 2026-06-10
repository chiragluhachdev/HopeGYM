'use client';

import { motion } from 'framer-motion';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import { FiBell } from 'react-icons/fi';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Img } from '@/components/ui/Img';

const appFeatures = [
  'Book classes & PT sessions',
  'Track workouts & progress',
  'Scan-to-enter at any branch',
  'Exclusive member offers',
];

export function DownloadApp() {
  return (
    <Section>
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gold-gradient">
        <div className="absolute inset-0 opacity-20 mix-blend-overlay">
          <Img
            src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1600&q=80"
            alt=""
            aria-hidden
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="relative grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-ink/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink backdrop-blur-md">
              <FiBell /> Coming Soon
            </span>
            <h2 className="mt-5 font-display text-4xl uppercase leading-none tracking-tight text-ink sm:text-5xl md:text-6xl">
              The Hope Gym &amp; Spa App
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ink/80">
              Your entire fitness journey in your pocket. Be the first to know
              when we launch on iOS and Android.
            </p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {appFeatures.map((f) => (
                <li key={f} className="flex items-center gap-2 font-medium text-ink/90">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-ink/15 text-xs text-ink">
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <StoreBadge
                icon={<FaApple size={24} />}
                top="Coming soon on"
                bottom="App Store"
              />
              <StoreBadge
                icon={<FaGooglePlay size={20} />}
                top="Coming soon on"
                bottom="Google Play"
              />
            </div>
          </Reveal>

          {/* Phone mockup */}
          <Reveal className="relative hidden justify-center lg:flex">
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative h-[460px] w-[230px] rounded-[2.5rem] border-[10px] border-ink-900 bg-ink-900 shadow-2xl"
            >
              <div className="absolute left-1/2 top-3 h-1.5 w-16 -translate-x-1/2 rounded-full bg-white/20" />
              <div className="relative h-full w-full overflow-hidden rounded-[1.7rem]">
                <Img
                  src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=600&q=80"
                  alt="Hope Gym app preview"
                  fill
                  sizes="230px"
                  className="object-cover"
                />
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

function StoreBadge({
  icon,
  top,
  bottom,
}: {
  icon: React.ReactNode;
  top: string;
  bottom: string;
}) {
  return (
    <span className="flex cursor-not-allowed items-center gap-3 rounded-2xl bg-ink-900/90 px-5 py-3 text-white opacity-90">
      {icon}
      <span className="text-left leading-tight">
        <span className="block text-[10px] uppercase tracking-wide text-white/60">
          {top}
        </span>
        <span className="block font-semibold">{bottom}</span>
      </span>
    </span>
  );
}
