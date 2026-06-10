import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { ContactCTA } from '@/components/home/ContactCTA';
import { getGallery } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Take a visual tour of Hope Gym — our equipment, training zones, group classes and premium facilities across all branches.',
};

export default async function GalleryPage() {
  const items = await getGallery();
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Inside Hope Gym"
        description="A glimpse of the energy, the gear and the people that make Hope Gym the place to transform. Filter by category and tap any photo to expand."
        image="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=2000&q=80"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Gallery' }]}
      />

      <Section className="pt-8 sm:pt-12">
        <GalleryGrid items={items} />
      </Section>

      <ContactCTA />
    </>
  );
}
