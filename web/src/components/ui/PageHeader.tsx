import Link from 'next/link';
import Image from 'next/image';
import { FiChevronRight } from 'react-icons/fi';
import { Reveal } from './Reveal';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Background image URL for the header band. */
  image?: string;
  breadcrumb: { label: string; href?: string }[];
}

export function PageHeader({
  eyebrow,
  title,
  description,
  image,
  breadcrumb,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        {image && (
          <Image
            src={image}
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/70 via-ink-900/85 to-ink" />
        <div className="absolute inset-0 bg-radial-glow" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-5 flex items-center gap-2 text-sm text-white/50"
          >
            {breadcrumb.map((crumb, i) => (
              <span key={crumb.label} className="flex items-center gap-2">
                {i > 0 && <FiChevronRight className="text-white/30" />}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="transition-colors hover:text-brand"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/80">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>

          {eyebrow && (
            <span className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              <span className="h-px w-6 bg-brand" />
              {eyebrow}
            </span>
          )}
          <h1 className="font-display text-5xl uppercase leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
              {description}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
