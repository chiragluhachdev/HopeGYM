import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { JoinForm } from '@/components/membership/JoinForm';
import { getPlans, getBranches } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Join Now',
  description:
    'Register for your Hope Gym & Spa membership. Choose your plan, fill in your details, and start your transformation today.',
};

export default async function JoinPage() {
  const [plans, branches] = await Promise.all([getPlans(), getBranches()]);

  return (
    <>
      <PageHeader
        eyebrow="Membership"
        title="Join Hope Gym"
        description="Fill in your details, pick a payment method and you&apos;re in. Your transformation starts today."
        image="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2000&q=80"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Membership', href: '/membership' },
          { label: 'Join Now' },
        ]}
      />

      <Section className="pt-8 sm:pt-12">
        <Suspense fallback={<div className="mx-auto max-w-3xl rounded-3xl glass p-10 text-center text-white/40">Loading...</div>}>
          <JoinForm plans={plans} branches={branches} />
        </Suspense>
      </Section>
    </>
  );
}

