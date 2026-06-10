import type { Metadata } from 'next';
import { FiTarget, FiEye } from 'react-icons/fi';
import { Img } from '@/components/ui/Img';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { ContactCTA } from '@/components/home/ContactCTA';
import { StatsBand } from '@/components/home/StatsBand';
import { ValueCards } from '@/components/about/ValueCards';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Discover the Hope Gym story — our mission, vision and the values that drive thousands of transformations across our 5 premium branches.',
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="The Hope Gym & Spa Story"
        description="From a single studio to a thriving fitness chain across Faridabad — built on a simple belief that everyone deserves a place to become their strongest self."
        image="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=2000&q=80"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />

      {/* Story */}
      <Section className="pt-8 sm:pt-12">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-ink-700">
              <Img
                src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1200&q=80"
                alt="Hope Gym & Spa training floor"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal className="order-1 lg:order-2">
            <span className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              <span className="h-px w-6 bg-brand" />
              Our Journey
            </span>
            <h2 className="font-display text-4xl uppercase leading-none tracking-tight text-white sm:text-5xl">
              Where it all began
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-white/60">
              <p>
                Hope Gym &amp; Spa started with a single room, a handful of
                barbells, and a big dream — to make world-class fitness
                accessible and inspiring for everyone in Faridabad, regardless
                of where they were starting from.
              </p>
              <p>
                Over 8+ years, that dream has grown into a premium fitness chain
                with multiple branches, 20+ certified trainers and a community
                of 1,000+ members who walk through our doors every day to chase
                something greater — powering over 10,000 transformations.
              </p>
              <p>
                We&apos;re not just building bodies — we&apos;re building
                confidence, discipline and hope. Because we believe the gym is
                where the best version of you is forged.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Mission & Vision */}
      <Section glow>
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal className="rounded-3xl glass p-9">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand/15 text-brand">
              <FiTarget size={26} />
            </span>
            <h3 className="mt-5 font-display text-3xl uppercase tracking-wide text-white">
              Our Mission
            </h3>
            <p className="mt-3 text-base leading-relaxed text-white/60">
              To empower every individual to lead a healthier, stronger life by
              providing premium facilities, expert guidance and an inspiring
              community — all under one roof, across the city.
            </p>
          </Reveal>

          <Reveal className="rounded-3xl glass p-9" delay={0.1}>
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand/15 text-brand">
              <FiEye size={26} />
            </span>
            <h3 className="mt-5 font-display text-3xl uppercase tracking-wide text-white">
              Our Vision
            </h3>
            <p className="mt-3 text-base leading-relaxed text-white/60">
              To become the most loved and trusted fitness brand in the country
              — a place where transformation is a way of life and hope is the
              fuel that drives every rep.
            </p>
          </Reveal>
        </div>
      </Section>

      <StatsBand />

      {/* Values */}
      <Section>
        <SectionHeading
          eyebrow="What we stand for"
          title="Our core values"
          description="The principles that shape every workout, every interaction and every branch."
        />
        <ValueCards />
      </Section>

      <ContactCTA />
    </>
  );
}
