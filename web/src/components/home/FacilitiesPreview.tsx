import { FiArrowRight } from 'react-icons/fi';
import { Section, SectionHeading } from '@/components/ui/Section';
import { StaggerGroup } from '@/components/ui/StaggerGroup';
import { Button } from '@/components/ui/Button';
import { FacilityCard } from '@/components/cards/FacilityCard';
import { getFacilities } from '@/lib/api';

export async function FacilitiesPreview() {
  const facilities = await getFacilities();
  return (
    <Section>
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading
          align="left"
          eyebrow="World-class facilities"
          title="Everything you need under one roof"
          className="mx-0"
        />
        <Button href="/facilities" variant="outline" className="shrink-0">
          View all <FiArrowRight />
        </Button>
      </div>

      <StaggerGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {facilities.slice(0, 6).map((facility) => (
          <FacilityCard key={facility.id} facility={facility} />
        ))}
      </StaggerGroup>
    </Section>
  );
}
