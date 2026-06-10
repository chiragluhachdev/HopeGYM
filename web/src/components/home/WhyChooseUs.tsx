'use client';

import { motion } from 'framer-motion';
import {
  FiUsers,
  FiTrendingUp,
  FiClock,
  FiMapPin,
  FiHeart,
  FiShield,
} from 'react-icons/fi';
import { Section, SectionHeading } from '@/components/ui/Section';
import { StaggerGroup } from '@/components/ui/StaggerGroup';
import { fadeUp } from '@/lib/animations';

const reasons = [
  {
    icon: FiUsers,
    title: 'Expert Trainers',
    text: 'Certified coaches who craft programs around your goals and keep you accountable.',
  },
  {
    icon: FiTrendingUp,
    title: 'Proven Results',
    text: 'Thousands of transformations powered by science-backed training and nutrition.',
  },
  {
    icon: FiMapPin,
    title: '5 Convenient Branches',
    text: 'Train anywhere across the city with a single all-access membership.',
  },
  {
    icon: FiClock,
    title: 'Open Early & Late',
    text: 'Flexible hours from early morning to late night so your schedule never gets in the way.',
  },
  {
    icon: FiHeart,
    title: 'Vibrant Community',
    text: 'An electric, judgement-free atmosphere that keeps you motivated daily.',
  },
  {
    icon: FiShield,
    title: 'Hygiene First',
    text: 'Spotless facilities, sanitised equipment and premium locker rooms.',
  },
];

export function WhyChooseUs() {
  return (
    <Section glow>
      <SectionHeading
        eyebrow="Why Hope Gym"
        title="Built to make you better"
        description="We obsess over every detail so you can focus on one thing — becoming your strongest self."
      />

      <StaggerGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map(({ icon: Icon, title, text }) => (
          <motion.div
            key={title}
            variants={fadeUp}
            className="group rounded-3xl glass p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
          >
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand/15 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-ink">
              <Icon size={26} />
            </span>
            <h3 className="mt-5 font-display text-2xl uppercase tracking-wide text-white">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/55">{text}</p>
          </motion.div>
        ))}
      </StaggerGroup>
    </Section>
  );
}
