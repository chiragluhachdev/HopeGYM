import { FiArrowRight } from 'react-icons/fi';
import { Section, SectionHeading } from '@/components/ui/Section';
import { StaggerGroup } from '@/components/ui/StaggerGroup';
import { Button } from '@/components/ui/Button';
import { PlanCard } from '@/components/cards/PlanCard';
import { getPlans } from '@/lib/api';

export async function MembershipHighlights() {
  const plans = await getPlans();
  return (
    <Section glow>
      <SectionHeading
        eyebrow="Membership Plans"
        title="Pick your power plan"
        description="Flexible plans for every commitment level. No hidden fees — just results. Cancel anytime."
      />

      <StaggerGroup className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </StaggerGroup>

      <div className="mt-12 text-center">
        <Button href="/membership" variant="outline">
          Compare all plans <FiArrowRight />
        </Button>
      </div>
    </Section>
  );
}
