import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://www.example.com';

const blogSlugs = [
  'how-creative-agencies-shape-the-future',
  'the-real-roi-of-smart-design',
  'how-purpose-driven-creativity-builds-brand-power',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseEntries = [
    {
      url: `${siteUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
  ];

  const blogEntries = blogSlugs.map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...baseEntries, ...blogEntries];
}
