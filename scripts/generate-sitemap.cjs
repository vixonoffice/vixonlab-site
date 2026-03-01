#!/usr/bin/env node
// Generates public/sitemap.xml with static pages + published blog posts from Supabase.
// Runs before `vite build` via the "build" script in package.json.

const fs = require('fs');
const path = require('path');

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const TODAY = new Date().toISOString().split('T')[0];

const STATIC_URLS = [
  { loc: 'https://vixonlab.ro/',          priority: '1.0', changefreq: 'weekly',  lastmod: TODAY },
  { loc: 'https://vixonlab.ro/services',  priority: '0.9', changefreq: 'monthly', lastmod: TODAY },
  { loc: 'https://vixonlab.ro/portfolio', priority: '0.8', changefreq: 'weekly',  lastmod: TODAY },
  { loc: 'https://vixonlab.ro/pricing',   priority: '0.9', changefreq: 'monthly', lastmod: TODAY },
  { loc: 'https://vixonlab.ro/blog',      priority: '0.8', changefreq: 'weekly',  lastmod: TODAY },
  { loc: 'https://vixonlab.ro/about',     priority: '0.7', changefreq: 'monthly', lastmod: TODAY },
  { loc: 'https://vixonlab.ro/contact',   priority: '0.8', changefreq: 'monthly', lastmod: TODAY },
  { loc: 'https://vixonlab.ro/privacy',   priority: '0.3', changefreq: 'yearly',  lastmod: TODAY },
  { loc: 'https://vixonlab.ro/terms',     priority: '0.3', changefreq: 'yearly',  lastmod: TODAY },
];

async function fetchBlogPosts() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.warn('[sitemap] VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY lipsă — blog posts omise');
    return [];
  }
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/blog_posts?select=slug,updated_at,published_at&published=eq.true&deleted_at=is.null`,
      { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
    );
    if (!res.ok) {
      console.warn(`[sitemap] Supabase răspuns ${res.status} — blog posts omise`);
      return [];
    }
    return await res.json();
  } catch (err) {
    console.warn('[sitemap] Eroare fetch blog posts:', err.message);
    return [];
  }
}

async function main() {
  const posts = await fetchBlogPosts();

  const blogUrls = posts.map((post) => ({
    loc: `https://vixonlab.ro/blog/${post.slug}`,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: ((post.updated_at || post.published_at || TODAY) + '').split('T')[0],
  }));

  const allUrls = [...STATIC_URLS, ...blogUrls];

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    allUrls
      .map(
        (u) =>
          `  <url>\n` +
          `    <loc>${u.loc}</loc>\n` +
          `    <lastmod>${u.lastmod}</lastmod>\n` +
          `    <changefreq>${u.changefreq}</changefreq>\n` +
          `    <priority>${u.priority}</priority>\n` +
          `  </url>`
      )
      .join('\n') +
    `\n</urlset>\n`;

  const outPath = path.resolve(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(outPath, xml, 'utf-8');
  console.log(`[sitemap] Generat: ${allUrls.length} URL-uri (${blogUrls.length} articole blog)`);
}

main().catch((err) => {
  console.error('[sitemap] Eroare:', err);
  process.exit(0); // Nu bloca build-ul
});
