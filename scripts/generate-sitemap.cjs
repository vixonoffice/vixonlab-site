#!/usr/bin/env node
// Genereaza public/sitemap.xml: paginile statice in RO si EN (cu hreflang), studiile de caz din
// src/data/portfolio.ts si articolele de blog din src/data/blog.ts.
// Ruleaza inainte de `vite build` prin scriptul "build" din package.json. Nu are nevoie de retea.

const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const ORIGIN = 'https://vixonlab.ro';
const TODAY = new Date().toISOString().split('T')[0];

// Pagini care exista in ambele limbi: RO fara prefix, EN sub /en. x-default = varianta EN
// (acelasi lucru ca hreflangLinks din src/lib/i18n.ts).
const BILINGUAL = [
  { path: '/',          priority: '1.0', changefreq: 'weekly' },
  { path: '/services',  priority: '0.9', changefreq: 'monthly' },
  { path: '/portfolio', priority: '0.8', changefreq: 'weekly' },
  { path: '/pricing',   priority: '0.9', changefreq: 'monthly' },
  { path: '/blog',      priority: '0.8', changefreq: 'weekly' },
  { path: '/about',     priority: '0.7', changefreq: 'monthly' },
  { path: '/contact',   priority: '0.8', changefreq: 'monthly' },
  { path: '/privacy',   priority: '0.3', changefreq: 'yearly' },
  { path: '/terms',     priority: '0.3', changefreq: 'yearly' },
];

// Doar romana / doar engleza
const RO_ONLY = [{ path: '/oferta', priority: '0.95', changefreq: 'weekly' }];
const EN_ONLY = [{ path: '/en/agencies', priority: '0.9', changefreq: 'monthly' }];

// Fisierele de date au doar `import type`, deci transpilate singure (fara bundling) se pot evalua direct.
function loadExport(file, name) {
  const { code } = esbuild.transformSync(fs.readFileSync(path.resolve(__dirname, file), 'utf8'), { loader: 'ts', format: 'cjs' });
  const mod = { exports: {} };
  new Function('module', 'exports', code)(mod, mod.exports);
  return mod.exports[name];
}

const roUrl = (p) => ORIGIN + p;
const enUrl = (p) => ORIGIN + (p === '/' ? '/en' : '/en' + p);

function entry(loc, { priority, changefreq, lastmod }, alternates) {
  const links = alternates
    ? alternates.map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}"/>\n`).join('')
    : '';
  return (
    `  <url>\n` +
    `    <loc>${loc}</loc>\n` +
    `    <lastmod>${lastmod}</lastmod>\n` +
    `    <changefreq>${changefreq}</changefreq>\n` +
    `    <priority>${priority}</priority>\n` +
    links +
    `  </url>`
  );
}

function bilingualEntries(p, meta) {
  const alternates = [
    { hreflang: 'ro', href: roUrl(p) },
    { hreflang: 'en', href: enUrl(p) },
    { hreflang: 'x-default', href: enUrl(p) },
  ];
  return [entry(roUrl(p), meta, alternates), entry(enUrl(p), meta, alternates)];
}

function main() {
  const posts = loadExport('../src/data/blog.ts', 'BLOG_POSTS');
  const projects = loadExport('../src/data/portfolio.ts', 'PORTFOLIO_PROJECTS');

  const entries = [];

  for (const page of BILINGUAL) {
    entries.push(...bilingualEntries(page.path, { ...page, lastmod: TODAY }));
  }

  // Studii de caz (exista in ambele limbi)
  const caseStudies = projects.filter((p) => p.slug && p.case_study);
  for (const project of caseStudies) {
    entries.push(...bilingualEntries(`/portfolio/${project.slug}`, { priority: '0.7', changefreq: 'monthly', lastmod: TODAY }));
  }

  for (const page of RO_ONLY) entries.push(entry(roUrl(page.path), { ...page, lastmod: TODAY }));
  for (const page of EN_ONLY) entries.push(entry(ORIGIN + page.path, { ...page, lastmod: TODAY }));

  // Articolele de blog: doar in romana
  for (const post of posts) {
    entries.push(
      entry(`${ORIGIN}/blog/${post.slug}`, {
        priority: '0.7',
        changefreq: 'monthly',
        lastmod: ((post.published_at || TODAY) + '').split('T')[0],
      }),
    );
  }

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    entries.join('\n') +
    `\n</urlset>\n`;

  const outPath = path.resolve(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(outPath, xml, 'utf-8');
  console.log(
    `[sitemap] Generat: ${entries.length} URL-uri (${BILINGUAL.length + caseStudies.length} pagini in RO + EN, ${posts.length} articole blog)`,
  );
}

main();
