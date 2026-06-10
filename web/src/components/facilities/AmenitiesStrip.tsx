'use client';

import { motion } from 'framer-motion';
import {
  FaSnowflake,
  FaHotTub,
  FaLock,
  FaShower,
  FaParking,
  FaMusic,
  FaTint,
  FaCertificate,
} from 'react-icons/fa';
import { Section, SectionHeading } from '@/components/ui/Section';
import { StaggerGroup } from '@/components/ui/StaggerGroup';
import { fadeUp } from '@/lib/animations';

const amenities = [
  { icon: FaSnowflake, label: 'Air Conditioned Gym' },
  { icon: FaHotTub, label: 'Steam & Spa' },
  { icon: FaLock, label: 'Locker Facility' },
  { icon: FaShower, label: 'Shower Rooms' },
  { icon: FaParking, label: 'Free Parking' },
  { icon: FaMusic, label: 'Music System' },
  { icon: FaTint, label: 'Drinking Water' },
  { icon: FaCertificate, label: 'Certified Coaches' },
];

export function AmenitiesStrip() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Amenities"
        title="Comfort meets performance"
        description="Every Hope Gym & Spa branch is designed for a premium, hassle-free experience."
      />

      <StaggerGroup className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {amenities.map(({ icon: Icon, label }) => (
          <motion.div
            key={label}
            variants={fadeUp}
            className="flex flex-col items-center gap-3 rounded-2xl glass px-4 py-7 text-center transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
          >
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand/15 text-brand">
              <Icon size={24} />
            </span>
            <span className="text-sm font-medium text-white/80">{label}</span>
          </motion.div>
        ))}
      </StaggerGroup>
    </Section>
  );
}
