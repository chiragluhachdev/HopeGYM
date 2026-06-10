import type { MetadataRoute } from 'next';
import { siteConfig, navLinks } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return navLinks.map((link) => ({
    url: `${siteConfig.url}${link.href === '/' ? '' : link.href}`,
    lastModified: now,
    changeFrequency: link.href === '/' ? 'weekly' : 'monthly',
    priority: link.href === '/' ? 1 : 0.7,
  }));
}
