import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { StaggerGroup } from '@/components/ui/StaggerGroup';
import { FacilityCard } from '@/components/cards/FacilityCard';
import { ProgramsSection } from '@/components/facilities/ProgramsSection';
import { AmenitiesStrip } from '@/components/facilities/AmenitiesStrip';
import { ContactCTA } from '@/components/home/ContactCTA';
import { getFacilities } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Facilities & Services',
  description:
    'Explore Hope Gym & Spa facilities — Strength Training, Cardio, Functional Training, CrossFit & HIIT, Yoga, Zumba, Personal Training and Spa & Wellness.',
};

export default async function FacilitiesPage() {
  const facilities = await getFacilities();
  return (
    <>
      <PageHeader
        eyebrow="Facilities"
        title="World-Class Amenities"
        description="Every branch is equipped with premium imported gear and dedicated zones designed to help you train smarter, recover faster and perform better."
        image="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=2000&q=80"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Facilities' }]}
      />

      <Section className="pt-8 sm:pt-12">
        <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((facility) => (
            <FacilityCard key={facility.id} facility={facility} />
          ))}
        </StaggerGroup>
      </Section>

      <ProgramsSection />
      <AmenitiesStrip />

      <ContactCTA />
    </>
  );
}
