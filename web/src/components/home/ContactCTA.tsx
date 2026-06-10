import { Img } from '@/components/ui/Img';
import { FiArrowRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { whatsappLink } from '@/lib/site';

export function ContactCTA() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10">
        <Img
          src="https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=2000&q=80"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-ink-900/85" />
        <div className="absolute inset-0 bg-radial-glow" />
      </div>

      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <h2 className="font-display text-5xl uppercase leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl">
            Your transformation
            <br />
            <span className="text-brand-gradient">starts today</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
            Walk in for a free trial session, or drop us a message. Our team is
            ready to help you take the first step.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Button href="/membership" size="lg">
              Become a Member <FiArrowRight />
            </Button>
            <Button
              href={whatsappLink('Hi Hope Gym & Spa! I would like a free trial session.')}
              variant="outline"
              size="lg"
            >
              <FaWhatsapp size={18} /> Book Free Trial
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
