import type { MetadataRoute } from 'next';
import { siteConfig } from '@/site.config';

export const dynamic = 'force-static'; // exportação estática: gera /sitemap.xml no build

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteConfig.url, changeFrequency: 'monthly', priority: 1 }];
}
