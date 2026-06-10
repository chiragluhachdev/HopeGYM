'use client';

import { motion } from 'framer-motion';
import {
  FaWeight,
  FaDumbbell,
  FaFireAlt,
  FaUserCheck,
  FaRunning,
  FaBolt,
  FaFemale,
  FaUserFriends,
} from 'react-icons/fa';
import { Section, SectionHeading } from '@/components/ui/Section';
import { StaggerGroup } from '@/components/ui/StaggerGroup';
import { fadeUp } from '@/lib/animations';

const programs = [
  { icon: FaWeight, title: 'Weight Loss Program' },
  { icon: FaDumbbell, title: 'Muscle Gain Program' },
  { icon: FaFireAlt, title: 'Body Transformation' },
  { icon: FaUserCheck, title: 'Personal Training' },
  { icon: FaRunning, title: 'Functional Training' },
  { icon: FaBolt, title: 'Strength & Conditioning' },
  { icon: FaFemale, title: "Women's Fitness" },
  { icon: FaUserFriends, title: 'Senior Fitness' },
];

export function ProgramsSection() {
  return (
    <Section glow>
      <SectionHeading
        eyebrow="Our Programs"
        title="Goals, meet your game plan"
        description="Whatever you're chasing, we have a structured, coach-led program to get you there faster."
      />

      <StaggerGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {programs.map(({ icon: Icon, title }) => (
          <motion.div
            key={title}
            variants={fadeUp}
            className="group flex items-center gap-4 rounded-2xl glass p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand/15 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-ink">
              <Icon size={22} />
            </span>
            <h3 className="font-display text-lg uppercase tracking-wide text-white">
              {title}
            </h3>
          </motion.div>
        ))}
      </StaggerGroup>
    </Section>
  );
}
