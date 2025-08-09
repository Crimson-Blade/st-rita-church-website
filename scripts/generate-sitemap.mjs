import { createWriteStream } from 'node:fs';
import { SitemapStream } from 'sitemap';
import axios from 'axios';

const SITE_URL = process.env.SITE_URL || 'https://saintritamaina.org';
const STRAPI_URL = (process.env.VITE_STRAPI_URL || '').replace(/\/+$/, '');

const links = [
  { url: '/', changefreq: 'daily', priority: 0.9 },
  { url: '/about', changefreq: 'monthly', priority: 0.6 },
  { url: '/contact', changefreq: 'monthly', priority: 0.6 },
  { url: '/mass-timings', changefreq: 'weekly', priority: 0.8 },
  { url: '/notice-board', changefreq: 'daily', priority: 0.7 },
  { url: '/blog', changefreq: 'weekly', priority: 0.7 },
  { url: '/donate', changefreq: 'monthly', priority: 0.5 },
  { url: '/events', changefreq: 'weekly', priority: 0.6 },
];

async function fetchStrapiSlugs() {
  if (!STRAPI_URL) return { blogs: [], events: [] };
  const api = axios.create({ baseURL: `${STRAPI_URL.replace(/\/+$/, '')}/api` });

  try {
    const [blogsRes, eventsRes] = await Promise.all([
      api.get('/blog-posts?fields[0]=slug&pagination[pageSize]=1000'),
      api.get('/events?fields[0]=slug&pagination[pageSize]=1000'),
    ]);

    const blogs = (blogsRes.data?.data || [])
      .map((b) => b.slug || b.attributes?.slug)
      .filter(Boolean);

    const events = (eventsRes.data?.data || [])
      .map((e) => e.slug || e.attributes?.slug)
      .filter(Boolean);

    return { blogs, events };
  } catch (e) {
    console.warn('Sitemap: Failed to fetch Strapi slugs. Falling back to static only.', e?.message || e);
    return { blogs: [], events: [] };
  }
}

async function run() {
  const sitemap = new SitemapStream({ hostname: SITE_URL });
  const writeStream = createWriteStream(new URL('../public/sitemap.xml', import.meta.url));
  sitemap.pipe(writeStream);

  for (const link of links) {
    sitemap.write(link);
  }

  // Dynamic blog and events from Strapi
  const { blogs, events } = await fetchStrapiSlugs();
  blogs.forEach((slug) => sitemap.write({ url: `/blog/${slug}`, changefreq: 'monthly', priority: 0.6 }));
  events.forEach((slug) => sitemap.write({ url: `/events/${slug}`, changefreq: 'weekly', priority: 0.6 }));

  sitemap.end();
  await new Promise((res) => writeStream.on('finish', res));
  console.log('Sitemap generated at public/sitemap.xml');
}

run().catch((e) => {
  console.error('Failed to generate sitemap', e);
  process.exit(1);
});
