import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { TIERS } from '@/lib/tiers';
import { translations } from '@/lib/translations';
import { PORTFOLIO_PROJECTS } from '@/data/portfolio';
import { FACTS } from '@/data/staticData';

// Garda impotriva cifrelor, citatelor si clientilor inventati (vezi STANDARD.md, punctul 1 si 5).
// Clientii reali sunt DOAR Siz Detailing si American Partyland. Demo-urile se marcheaza "Concept / demo".

const ROOT = path.resolve(__dirname, '../..');

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(ts|tsx)$/.test(entry.name) && !/\.test\.(ts|tsx)$/.test(entry.name)) out.push(full);
  }
  return out;
}

const sourceFiles = [...walk(path.join(ROOT, 'src')), path.join(ROOT, 'api/chat.ts')];
const read = (file: string) => fs.readFileSync(file, 'utf8');
const allSource = sourceFiles.map((f) => ({ file: path.relative(ROOT, f), text: read(f) }));
const indexHtml = read(path.join(ROOT, 'index.html'));

function offenders(pattern: RegExp) {
  return allSource.filter(({ text }) => pattern.test(text)).map(({ file }) => file);
}

describe('no invented proof on the site', () => {
  it.each([
    ['"50+ projects" style counters', /\b50\+/],
    ['99% happy clients', /99\s?%/],
    ['+250% results', /\+\s?250\s?%/],
    ['the Marian V. testimonial', /Marian V/],
    ['made-up client names from the old case studies', /TechStart|ShopLocal|Bella Boutique|Casa Verde|Elena Marinescu|Mihai Ionescu|Andreea Popescu/],
    ['old fake testimonial authors', /Maria P\.|Andrei I\.|Elena D\./],
    ['a 48h response time (the single value is 24h)', /\b48\s?h\b/],
  ])('has no %s', (_label, pattern) => {
    expect(offenders(pattern)).toEqual([]);
  });

  it('keeps testimonials out of the data model and the pages (the blog gives advice about them and the configurator lists a section the client can ask for)', () => {
    expect(offenders(/testimonial/i).filter((f) => !/blog.ts$|configurator.ts$/.test(f))).toEqual([]);
  });

  it('only shows real clients as clients, and labels every other project as a demo', () => {
    const clients = PORTFOLIO_PROJECTS.filter((p) => p.kind === 'client').map((p) => p.title);
    expect(clients).toEqual(['Siz Detailing', 'American Partyland']);
    for (const demo of PORTFOLIO_PROJECTS.filter((p) => p.kind === 'demo')) {
      expect(demo.case_study).toBeNull();
      expect(`${demo.subtitle_ro} ${demo.subtitle_en}`).toMatch(/concept/i);
    }
    expect(translations.ro['portfolio.demoBadge']).toBe('Concept / demo');
    expect(translations.en['portfolio.demoBadge']).toBe('Concept / demo');
  });

  it('only uses the one measured number we have (58 -> 90 on sizdetailing.ro)', () => {
    const results = PORTFOLIO_PROJECTS.flatMap((p) => (p.case_study?.result ? [p.title + ': ' + p.case_study.result.value] : []));
    expect(results).toEqual(['Siz Detailing: 58 → 90']);
    expect(FACTS.find((f) => f.id === 'perf')?.value_en).toBe('58 → 90');
  });

  it('keeps Nuța Events off the home page and the hero', () => {
    const homeFiles = ['src/pages/HomeRo.tsx', 'src/pages/HomeEn.tsx', 'src/pages/Index.tsx', 'src/components/ShowcaseStack.tsx', 'src/components/ClientsSection.tsx'];
    for (const file of homeFiles) {
      expect(read(path.join(ROOT, file))).not.toMatch(/nu[țt]a/i);
    }
  });
});

describe('prices follow src/lib/tiers.ts', () => {
  it('has the four documented tiers', () => {
    expect(TIERS.map((t) => t.setupEur)).toEqual([350, 650, 1200, 2000]);
  });

  it('has no leftover "instead of" prices in the translations', () => {
    // tier.faq.a5 explains the annual plan (pay 10 months, get 12); it is not a crossed-out price
    const entries = [...Object.entries(translations.ro), ...Object.entries(translations.en)].filter(([key]) => key !== 'tier.faq.a5');
    expect(entries.filter(([, text]) => /în loc de \d|instead of \d/i.test(text)).map(([key]) => key)).toEqual([]);
    expect(Object.keys(translations.ro)).not.toContain('contact.projectTypes');
  });

  it('has no old 700/1200 "Essential/Business with admin panel" offers in index.html JSON-LD', () => {
    expect(indexHtml).not.toMatch(/admin panel/i);
    expect(indexHtml).not.toMatch(/"price":\s*"700"/);
    expect(indexHtml).toMatch(/"price":\s*"350"/);
  });
});

describe('English copy for the outside market', () => {
  it('does not sell Webflow or Framer and does not mention reverse-charge VAT', () => {
    expect(offenders(/webflow/i)).toEqual([]);
    expect(offenders(/framer(?![\s-]?motion)/i)).toEqual([]);
    expect(offenders(/reverse[\s-]?charge/i)).toEqual([]);
  });

  it('lists the real tech stack on the About page', () => {
    const about = read(path.join(ROOT, 'src/data/about.ts'));
    for (const tech of ['React', 'TypeScript', 'Next.js', 'Vite', 'Tailwind CSS', 'GSAP', 'Vercel']) {
      expect(about).toContain(`'${tech}'`);
    }
    expect(about).not.toMatch(/PostgreSQL|Node\.js|Figma/);
  });
});
