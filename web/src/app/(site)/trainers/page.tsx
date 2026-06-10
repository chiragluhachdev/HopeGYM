import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { StaggerGroup } from '@/components/ui/StaggerGroup';
import { TrainerCard } from '@/components/cards/TrainerCard';
import { ContactCTA } from '@/components/home/ContactCTA';
import { getTrainers } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Trainers',
  description:
    'Meet the Hope Gym team of certified expert trainers specialising in strength, functional training, CrossFit, yoga, personal training and more.',
};

export default async function TrainersPage() {
  const trainers = await getTrainers();
  return (
    <>
      <PageHeader
        eyebrow="Our Team"
        title="Meet Your Coaches"
        description="Certified, passionate and relentlessly committed to your progress. Our trainers don't just guide workouts — they build champions."
        image="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=2000&q=80"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Trainers' }]}
      />

      <Section className="pt-8 sm:pt-12">
        <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trainers.map((trainer) => (
            <TrainerCard key={trainer.id} trainer={trainer} />
          ))}
        </StaggerGroup>
      </Section>

      <ContactCTA />
    </>
  );
}
