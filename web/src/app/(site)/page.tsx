import { Hero } from '@/components/home/Hero';
import { Intro } from '@/components/home/Intro';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { FacilitiesPreview } from '@/components/home/FacilitiesPreview';
import { StatsBand } from '@/components/home/StatsBand';
import { MembershipHighlights } from '@/components/home/MembershipHighlights';
import { Testimonials } from '@/components/home/Testimonials';
import { FeaturedBranches } from '@/components/home/FeaturedBranches';
import { DownloadApp } from '@/components/home/DownloadApp';
import { ContactCTA } from '@/components/home/ContactCTA';
import { getStats, getTestimonials } from '@/lib/api';

export default async function HomePage() {
  const [stats, testimonials] = await Promise.all([
    getStats(),
    getTestimonials(),
  ]);

  return (
    <>
      <Hero stats={stats} />
      <Intro />
      <WhyChooseUs />
      <FacilitiesPreview />
      <StatsBand />
      <MembershipHighlights />
      <Testimonials testimonials={testimonials} />
      <FeaturedBranches />
      <DownloadApp />
      <ContactCTA />
    </>
  );
}
