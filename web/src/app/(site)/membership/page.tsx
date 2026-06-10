import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section, SectionHeading } from '@/components/ui/Section';
import { StaggerGroup } from '@/components/ui/StaggerGroup';
import { PlanCard } from '@/components/cards/PlanCard';
import { ComparisonTable } from '@/components/membership/ComparisonTable';
import { FAQ } from '@/components/membership/FAQ';
import { ContactCTA } from '@/components/home/ContactCTA';
import { getPlans } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Membership Plans',
  description:
    'Choose from flexible Hope Gym membership plans — Monthly, Quarterly, Half-Yearly and Annual. Compare features and join now. No hidden fees.',
};

export default async function MembershipPage() {
  const plans = await getPlans();
  return (
    <>
      <PageHeader
        eyebrow="Membership"
        title="Plans Built For Results"
        description="Whether you're just starting out or chasing a personal best, there's a Hope Gym plan for you. Transparent pricing, cancel anytime."
        image="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=2000&q=80"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Membership' }]}
      />

      <Section className="pt-8 sm:pt-12">
        <StaggerGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </StaggerGroup>
      </Section>

      <Section glow>
        <SectionHeading
          eyebrow="Compare Plans"
          title="Find your perfect fit"
          description="A side-by-side look at exactly what each membership unlocks."
        />
        <div className="mt-12 rounded-3xl glass p-2 sm:p-4">
          <ComparisonTable plans={plans} />
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="FAQ"
          title="Questions, answered"
          description="Everything you need to know before joining Hope Gym."
        />
        <FAQ />
      </Section>

      <ContactCTA />
    </>
  );
}
