import type { MetadataRoute } from 'next';
import { siteConfig } from '@/site.config';

export const dynamic = 'force-static'; // exportação estática: gera /robots.txt no build

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${siteConfig.url}/sitemap.xml` };
}
