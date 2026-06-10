import Link from 'next/link';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { navLinks, siteConfig } from '@/lib/site';
import { Logo } from './Logo';
import { Newsletter } from './Newsletter';

const socials = [
  { icon: FaInstagram, href: siteConfig.social.instagram, label: 'Instagram' },
  { icon: FaFacebookF, href: siteConfig.social.facebook, label: 'Facebook' },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-ink-900">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand + newsletter */}
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">
              {siteConfig.description}
            </p>
            <div className="mt-6">
              <Newsletter />
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-3 lg:col-start-7">
            <h3 className="font-display text-xl uppercase tracking-wide text-white">
              Explore
            </h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/55 transition-colors hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-xl uppercase tracking-wide text-white">
              Get in touch
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-white/55">
              <li className="flex gap-3">
                <FiMapPin className="mt-0.5 shrink-0 text-brand" />
                <span>{siteConfig.contact.address}</span>
              </li>
              <li>
                <a
                  href={siteConfig.contact.phoneHref}
                  className="flex gap-3 transition-colors hover:text-brand"
                >
                  <FiPhone className="mt-0.5 shrink-0 text-brand" />
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex gap-3 transition-colors hover:text-brand"
                >
                  <FiMail className="mt-0.5 shrink-0 text-brand" />
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>

            <div className="mt-6 flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition-all hover:border-brand hover:bg-brand hover:text-ink"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="hairline my-10" />

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-white/45 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/contact" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/contact" className="transition-colors hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
