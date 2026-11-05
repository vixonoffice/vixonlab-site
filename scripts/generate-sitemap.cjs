#!/usr/bin/env node
// Genereaza public/sitemap.xml: paginile statice + articolele de blog din src/data/blog.ts.
// Ruleaza inainte de `vite build` prin scriptul "build" din package.json. Nu are nevoie de retea.

const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const TODAY = new Date().toISOString().split('T')[0];

const STATIC_URLS = [
  { loc: 'https://vixonlab.ro/',          priority: '1.0', changefreq: 'weekly',  lastmod: TODAY },
  { loc: 'https://vixonlab.ro/services',  priority: '0.9', changefreq: 'monthly', lastmod: TODAY },
  { loc: 'https://vixonlab.ro/portfolio', priority: '0.8', changefreq: 'weekly',  lastmod: TODAY },
  { loc: 'https://vixonlab.ro/pricing',   priority: '0.9', changefreq: 'monthly', lastmod: TODAY },
  { loc: 'https://vixonlab.ro/oferta',    priority: '0.95', changefreq: 'weekly',  lastmod: TODAY },
  { loc: 'https://vixonlab.ro/blog',      priority: '0.8', changefreq: 'weekly',  lastmod: TODAY },
  { loc: 'https://vixonlab.ro/about',     priority: '0.7', changefreq: 'monthly', lastmod: TODAY },
  { loc: 'https://vixonlab.ro/contact',   priority: '0.8', changefreq: 'monthly', lastmod: TODAY },
  { loc: 'https://vixonlab.ro/privacy',   priority: '0.3', changefreq: 'yearly',  lastmod: TODAY },
  { loc: 'https://vixonlab.ro/terms',     priority: '0.3', changefreq: 'yearly',  lastmod: TODAY },
];

// src/data/blog.ts are doar `import type`, deci transpilat singur (fara bundling) se poate evalua direct.
function loadBlogPosts() {
  const file = path.resolve(__dirname, '../src/data/blog.ts');
  const { code } = esbuild.transformSync(fs.readFileSync(file, 'utf8'), { loader: 'ts', format: 'cjs' });
  const mod = { exports: {} };
  new Function('module', 'exports', code)(mod, mod.exports);
  return mod.exports.BLOG_POSTS;
}

function main() {
  const posts = loadBlogPosts();

  const blogUrls = posts.map((post) => ({
    loc: `https://vixonlab.ro/blog/${post.slug}`,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: ((post.published_at || TODAY) + '').split('T')[0],
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

main();
