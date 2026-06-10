import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Reveal } from './Reveal';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Adds the subtle radial brand glow at the top of the section. */
  glow?: boolean;
}

export function Section({ children, className, id, glow }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative py-20 sm:py-28',
        glow && 'bg-radial-glow',
        className
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      {eyebrow && (
        <span className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand">
          <span className="h-px w-6 bg-brand" />
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-4xl uppercase leading-none tracking-tight text-white sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  );
}
