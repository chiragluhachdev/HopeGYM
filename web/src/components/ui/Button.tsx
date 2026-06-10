import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'outline' | 'ghost' | 'white' | 'dark';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:opacity-60 disabled:pointer-events-none';

const variants: Record<Variant, string> = {
  primary:
    'bg-brand text-ink shadow-glow hover:bg-brand-300 hover:shadow-[0_0_50px_-6px_rgba(255,212,0,0.7)] hover:-translate-y-0.5',
  outline:
    'border border-white/25 text-white hover:border-brand hover:bg-brand/10 hover:-translate-y-0.5',
  ghost: 'text-white/80 hover:text-white hover:bg-white/5',
  white:
    'bg-white text-ink hover:bg-white/90 hover:-translate-y-0.5 shadow-card',
  dark: 'bg-ink-900 text-white hover:bg-ink-700 hover:-translate-y-0.5 shadow-card',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

type ButtonAsLink = CommonProps & { href: string } & Omit<
    ComponentProps<typeof Link>,
    'href' | 'className'
  >;
type ButtonAsButton = CommonProps & { href?: undefined } & Omit<
    ComponentProps<'button'>,
    'className'
  >;

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = 'primary', size = 'md', className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (props.href !== undefined) {
    const { variant: _v, size: _s, className: _c, children: _ch, href, ...rest } =
      props;
    const isExternal = href.startsWith('http') || href.startsWith('tel:');
    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, href: _h, ...rest } =
    props;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
