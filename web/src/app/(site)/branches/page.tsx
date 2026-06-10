import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { StaggerGroup } from '@/components/ui/StaggerGroup';
import { BranchCard } from '@/components/cards/BranchCard';
import { ContactCTA } from '@/components/home/ContactCTA';
import { getBranches } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Our Branches',
  description:
    'Find your nearest Hope Gym. Explore all 5 premium branches with addresses, working hours, contact details and directions.',
};

export default async function BranchesPage() {
  const branches = await getBranches();
  return (
    <>
      <PageHeader
        eyebrow="Our Locations"
        title="5 Branches. One Standard."
        description="Premium fitness, wherever you are in the city. Pick a branch, check the hours and walk in for a free trial."
        image="https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=2000&q=80"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Branches' }]}
      />

      <Section className="pt-8 sm:pt-12">
        <StaggerGroup className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {branches.map((branch) => (
            <BranchCard key={branch.id} branch={branch} />
          ))}
        </StaggerGroup>
      </Section>

      <ContactCTA />
    </>
  );
}
