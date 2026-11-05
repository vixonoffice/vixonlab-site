import { describe, it, expect } from 'vitest';
import { renderMarkdown, escapeHtml } from './markdown';
import { BLOG_POSTS } from '@/data/blog';

function parse(html: string): Document {
  return new DOMParser().parseFromString(`<body>${html}</body>`, 'text/html');
}

describe('renderMarkdown is safe against HTML injection', () => {
  const payloads = [
    '<script>alert(1)</script>',
    '<img src=x onerror=alert(1)>',
    '"><svg onload=alert(1)>',
    '<a href="javascript:alert(1)">x</a>',
    '<iframe src="https://evil.example"></iframe>',
    '**<b onmouseover=alert(1)>bold</b>**',
    '`<script>alert(1)</script>`',
    '```\n<script>alert(1)</script>\n```',
    '## <img src=x onerror=alert(1)>',
    '- <style>*{display:none}</style>',
    '| <script>alert(1)</script> | b |\n|---|---|\n| <img src=x onerror=alert(1)> | d |',
  ];

  it.each(payloads)('does not let raw HTML through: %s', (payload) => {
    const doc = parse(renderMarkdown(payload));
    expect(doc.querySelector('script, iframe, style, svg, object, embed')).toBeNull();
    for (const el of Array.from(doc.body.querySelectorAll('*'))) {
      for (const attr of Array.from(el.attributes)) {
        expect(attr.name.startsWith('on')).toBe(false);
      }
    }
    expect(doc.body.querySelectorAll('img').length).toBe(0);
  });

  it('only allows http(s), mailto and site-relative links', () => {
    const doc = parse(
      renderMarkdown(
        [
          '[a](javascript:alert(1))',
          '[b](JaVaScRiPt:alert(1))',
          '[c](data:text/html;base64,AAAA)',
          '[d](//evil.example)',
          '[e](/\\evil.example)',
          '[f](https://vixonlab.ro/x)',
          '[g](/contact)',
          '[h](mailto:vixonoffice@gmail.com)',
        ].join('\n\n'),
      ),
    );
    const hrefs = Array.from(doc.querySelectorAll('a')).map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual(['#', '#', '#', '#', '#', 'https://vixonlab.ro/x', '/contact', 'mailto:vixonoffice@gmail.com']);
  });

  it('cannot break out of an attribute through the link text or url', () => {
    const doc = parse(renderMarkdown('[x](https://a.example/"onmouseover="alert(1))'));
    const a = doc.querySelector('a');
    expect(a?.getAttribute('onmouseover')).toBeNull();
  });

  it('escapes html entities', () => {
    expect(escapeHtml(`<a href="x">&'</a>`)).toBe('&lt;a href=&quot;x&quot;&gt;&amp;&#39;&lt;/a&gt;');
  });
});

describe('renderMarkdown formatting', () => {
  it('renders headings, lists, bold, links and tables', () => {
    const html = renderMarkdown(
      ['# T', '', '## H2', '### H3', '#### H4', '', '- **a**', '- b', '', '1. x', '2. y', '', '[go](/contact)', '', '| A | B |', '|---|---|', '| 1 | 2 |'].join('\n'),
    );
    const doc = parse(html);
    // "# " nu produce h1 (pagina are deja unul)
    expect(doc.querySelectorAll('h1').length).toBe(0);
    expect(doc.querySelectorAll('h2').length).toBe(2);
    expect(doc.querySelectorAll('h3').length).toBe(1);
    expect(doc.querySelectorAll('h4').length).toBe(1);
    expect(doc.querySelectorAll('ul li').length).toBe(2);
    expect(doc.querySelectorAll('ol li').length).toBe(2);
    expect(doc.querySelector('strong')?.textContent).toBe('a');
    expect(doc.querySelector('a')?.getAttribute('href')).toBe('/contact');
    expect(doc.querySelectorAll('table th').length).toBe(2);
    expect(doc.querySelectorAll('table td').length).toBe(2);
  });

  it('keeps inline code literal (no bold / links inside) and escaped', () => {
    const doc = parse(renderMarkdown('a `**x** <b>` b **y**'));
    expect(doc.querySelector('code')?.textContent).toBe('**x** <b>');
    expect(doc.querySelectorAll('strong').length).toBe(1);
    expect(doc.querySelector('p')?.textContent).toBe('a **x** <b> b y');
  });

  it('renders every published article without leaking markdown markers or raw tags', () => {
    expect(BLOG_POSTS.length).toBeGreaterThan(0);
    for (const post of BLOG_POSTS) {
      for (const md of [post.content_ro, post.content_en]) {
        const html = renderMarkdown(md);
        const doc = parse(html);
        expect(doc.body.textContent).not.toMatch(/\*\*|^#{1,4} /m);
        expect(doc.querySelectorAll('script, iframe, h1').length).toBe(0);
      }
    }
  });
});
