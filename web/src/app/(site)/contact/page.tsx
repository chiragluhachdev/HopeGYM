import type { Metadata } from 'next';
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
} from 'react-icons/fi';
import { FaWhatsapp, FaInstagram, FaFacebookF } from 'react-icons/fa';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { ContactForm } from '@/components/contact/ContactForm';
import { siteConfig, whatsappLink } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Hope Gym. Call, email or WhatsApp us, or send a message and our team will respond within 24 hours.',
};

const socials = [
  { icon: FaInstagram, href: siteConfig.social.instagram, label: 'Instagram' },
  { icon: FaFacebookF, href: siteConfig.social.facebook, label: 'Facebook' },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's Talk Fitness"
        description="Questions about membership, branches or training? We're here to help. Reach out and let's get you started."
        image="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2000&q=80"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Info */}
          <Reveal className="lg:col-span-2">
            <h2 className="font-display text-3xl uppercase tracking-wide text-white">
              Get in touch
            </h2>
            <p className="mt-3 text-white/60">
              Prefer a quick chat? Tap WhatsApp or give us a call — we respond
              fast.
            </p>

            <ul className="mt-8 space-y-5">
              <InfoRow
                icon={<FiPhone />}
                label="Call us"
                value={siteConfig.contact.phone}
                href={siteConfig.contact.phoneHref}
              />
              <InfoRow
                icon={<FiMail />}
                label="Email"
                value={siteConfig.contact.email}
                href={`mailto:${siteConfig.contact.email}`}
              />
              <InfoRow
                icon={<FaWhatsapp />}
                label="WhatsApp"
                value="Chat with us"
                href={whatsappLink('Hi Hope Gym & Spa! I have a question.')}
                external
              />
              <InfoRow
                icon={<FiMapPin />}
                label="Main Branch"
                value={siteConfig.contact.address}
              />
              <InfoRow
                icon={<FiClock />}
                label="Hours"
                value="Open Daily: 6:00 AM – 10:00 PM (varies by branch)"
              />
            </ul>

            <div className="mt-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-white/50">
                Follow us
              </p>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/70 transition-all hover:border-brand hover:bg-brand hover:text-ink"
                  >
                    <Icon size={17} />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal className="lg:col-span-3">
            <ContactForm />
          </Reveal>
        </div>
      </Section>

      {/* Map */}
      <Section className="pt-0">
        <Reveal className="overflow-hidden rounded-3xl border border-white/10">
          <iframe
            title="Hope Gym & Spa — Sector 43, Faridabad"
            src="https://maps.google.com/maps?q=Hope%20Gym%20Spa%20Green%20Fields%20Colony%20Sector%2043%20Faridabad&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[420px] w-full"
          />
        </Reveal>
      </Section>
    </>
  );
}

function InfoRow({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <>
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand/15 text-lg text-brand">
        {icon}
      </span>
      <span>
        <span className="block text-xs uppercase tracking-wide text-white/45">
          {label}
        </span>
        <span className="text-white">{value}</span>
      </span>
    </>
  );

  if (href) {
    return (
      <li>
        <a
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className="flex items-center gap-4 transition-opacity hover:opacity-80"
        >
          {content}
        </a>
      </li>
    );
  }
  return <li className="flex items-center gap-4">{content}</li>;
}
