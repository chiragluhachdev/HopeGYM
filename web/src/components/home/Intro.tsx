import { FiArrowRight } from 'react-icons/fi';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { Img } from '@/components/ui/Img';

export function Intro() {
  return (
    <Section>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Image collage */}
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-ink-700 sm:aspect-[5/4]">
            <Img
              src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=80"
              alt="Coach guiding a member through a workout"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-2 hidden w-44 rounded-3xl glass-strong p-5 shadow-card sm:block">
            <p className="font-display text-4xl text-brand">8+</p>
            <p className="text-sm text-white/70">Years building champions</p>
          </div>
        </Reveal>

        {/* Copy */}
        <Reveal>
          <span className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            <span className="h-px w-6 bg-brand" />
            Welcome to Hope Gym
          </span>
          <h2 className="font-display text-4xl uppercase leading-none tracking-tight text-white sm:text-5xl md:text-6xl">
            More than a gym.
            <br />
            <span className="text-brand-gradient">A movement.</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-white/60 sm:text-lg">
            At Hope Gym &amp; Spa, we believe fitness is for everyone. From your
            first rep to your personal best, our certified coaches, premium
            imported equipment and energising community are with you every step
            of the way.
          </p>
          <p className="mt-4 text-base leading-relaxed text-white/60">
            With multiple state-of-the-art branches across Faridabad (and
            Gurugram), world-class training is always just around the corner.
          </p>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              'Certified expert trainers',
              'Premium imported equipment',
              'Flexible all-branch access',
              'Personalised fitness plans',
            ].map((point) => (
              <li key={point} className="flex items-center gap-3 text-white/80">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-brand/15 text-brand">
                  ✓
                </span>
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-9">
            <Button href="/about" variant="outline">
              Our Story <FiArrowRight />
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
