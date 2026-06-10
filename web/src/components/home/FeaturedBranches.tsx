import { FiArrowRight } from 'react-icons/fi';
import { Section, SectionHeading } from '@/components/ui/Section';
import { StaggerGroup } from '@/components/ui/StaggerGroup';
import { Button } from '@/components/ui/Button';
import { BranchCard } from '@/components/cards/BranchCard';
import { getFeaturedBranches } from '@/lib/api';

export async function FeaturedBranches() {
  const featuredBranches = await getFeaturedBranches();
  return (
    <Section glow>
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading
          align="left"
          eyebrow="Our Locations"
          title="Find your nearest branch"
          description="5 premium destinations, all backed by the same Hope Gym standard."
          className="mx-0"
        />
        <Button href="/branches" variant="outline" className="shrink-0">
          All branches <FiArrowRight />
        </Button>
      </div>

      <StaggerGroup className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featuredBranches.map((branch) => (
          <BranchCard key={branch.id} branch={branch} />
        ))}
      </StaggerGroup>
    </Section>
  );
}
