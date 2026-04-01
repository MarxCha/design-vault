import { type MetadataRoute } from 'next';
import { CATALOG, CATEGORIES, type Category } from '@/data/catalog';

const BASE_URL = 'https://design-vault.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/playground`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/acerca`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  const categoryPages: MetadataRoute.Sitemap = (Object.keys(CATEGORIES) as Category[]).map((slug) => ({
    url: `${BASE_URL}/categoria/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const projectPages: MetadataRoute.Sitemap = CATALOG.map((project) => ({
    url: `${BASE_URL}/proyecto/${project.id}`,
    lastModified: new Date(project.addedDate),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const playgroundPages: MetadataRoute.Sitemap = CATALOG.flatMap((project) =>
    project.extractableComponents.map((comp) => ({
      url: `${BASE_URL}/playground/${comp.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }))
  );

  return [...staticPages, ...categoryPages, ...projectPages, ...playgroundPages];
}
