import { describe, it, expect } from 'vitest';
import {
  alternatePath,
  canonicalUrl,
  detectLanguageRedirect,
  hreflangLinks,
  isBot,
  langFromPath,
  localizePath,
  stripLang,
} from './i18n';

describe('language from the route', () => {
  it('treats /en and /en/... as English, everything else as Romanian', () => {
    expect(langFromPath('/')).toBe('ro');
    expect(langFromPath('/pricing')).toBe('ro');
    expect(langFromPath('/en')).toBe('en');
    expect(langFromPath('/en/pricing')).toBe('en');
    expect(langFromPath('/english-things')).toBe('ro');
    expect(langFromPath('/engineering')).toBe('ro');
  });

  it('strips and adds the /en prefix', () => {
    expect(stripLang('/en')).toBe('/');
    expect(stripLang('/en/')).toBe('/');
    expect(stripLang('/en/portfolio/siz-detailing')).toBe('/portfolio/siz-detailing');
    expect(stripLang('/pricing')).toBe('/pricing');
    expect(localizePath('/', 'en')).toBe('/en');
    expect(localizePath('/pricing', 'en')).toBe('/en/pricing');
    expect(localizePath('/en/pricing', 'ro')).toBe('/pricing');
    expect(localizePath('/services#x', 'en')).toBe('/en/services#x');
    expect(localizePath('/blog?a=1', 'en')).toBe('/en/blog?a=1');
    expect(localizePath('https://example.com', 'en')).toBe('https://example.com');
  });
});

describe('language switch target', () => {
  it('goes to the equivalent page when it exists in both languages', () => {
    expect(alternatePath('/', 'en')).toBe('/en');
    expect(alternatePath('/en', 'ro')).toBe('/');
    expect(alternatePath('/pricing', 'en')).toBe('/en/pricing');
    expect(alternatePath('/en/portfolio/siz-detailing', 'ro')).toBe('/portfolio/siz-detailing');
  });

  it('falls back sensibly for pages that exist in one language only', () => {
    expect(alternatePath('/oferta', 'en')).toBe('/en/pricing');
    expect(alternatePath('/blog/seo-pentru-incepatori-ghid-complet', 'en')).toBe('/en/blog');
    expect(alternatePath('/en/agencies', 'ro')).toBe('/');
  });
});

describe('hreflang', () => {
  it('lists ro, en and x-default for bilingual pages', () => {
    expect(hreflangLinks('/pricing')).toEqual([
      { hreflang: 'ro', href: 'https://vixonlab.ro/pricing' },
      { hreflang: 'en', href: 'https://vixonlab.ro/en/pricing' },
      { hreflang: 'x-default', href: 'https://vixonlab.ro/en/pricing' },
    ]);
    // aceleasi linkuri indiferent de limba paginii curente
    expect(hreflangLinks('/en/pricing')).toEqual(hreflangLinks('/pricing'));
    expect(hreflangLinks('/')[0].href).toBe('https://vixonlab.ro/');
    expect(hreflangLinks('/en')[1].href).toBe('https://vixonlab.ro/en');
  });

  it('has no alternates for single-language pages', () => {
    expect(hreflangLinks('/en/agencies')).toEqual([]);
    expect(hreflangLinks('/oferta')).toEqual([]);
    expect(hreflangLinks('/blog/ceva')).toEqual([]);
  });

  it('builds canonical urls without a trailing slash', () => {
    expect(canonicalUrl('/')).toBe('https://vixonlab.ro/');
    expect(canonicalUrl('/en')).toBe('https://vixonlab.ro/en');
    expect(canonicalUrl('/en/pricing/')).toBe('https://vixonlab.ro/en/pricing');
  });
});

describe('first-visit language detection', () => {
  const base = { pathname: '/', navigatorLanguage: 'en-US', userAgent: 'Mozilla/5.0 Chrome/120', stored: null } as const;

  it('sends non-Romanian browsers on "/" to /en', () => {
    expect(detectLanguageRedirect(base)).toBe('en');
    expect(detectLanguageRedirect({ ...base, navigatorLanguage: 'de-DE' })).toBe('en');
  });

  it('leaves Romanian browsers alone', () => {
    expect(detectLanguageRedirect({ ...base, navigatorLanguage: 'ro' })).toBeNull();
    expect(detectLanguageRedirect({ ...base, navigatorLanguage: 'ro-RO' })).toBeNull();
    expect(detectLanguageRedirect({ ...base, navigatorLanguage: 'RO-md' })).toBeNull();
  });

  it('never redirects deep links, only "/"', () => {
    expect(detectLanguageRedirect({ ...base, pathname: '/pricing' })).toBeNull();
    expect(detectLanguageRedirect({ ...base, pathname: '/en' })).toBeNull();
  });

  it('lets the stored choice win over the browser language', () => {
    expect(detectLanguageRedirect({ ...base, stored: 'ro' })).toBeNull();
    expect(detectLanguageRedirect({ ...base, navigatorLanguage: 'ro', stored: 'en' })).toBe('en');
  });

  it('never redirects bots, so both versions stay indexable', () => {
    const bots = [
      'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
      'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Mobile Safari/537.36 (compatible; Googlebot/2.1)',
      'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
      'Mozilla/5.0 (compatible; YandexBot/3.0)',
      'DuckDuckBot/1.1',
      'Twitterbot/1.0',
      'facebookexternalhit/1.1',
      'WhatsApp/2.23.20',
      'Mozilla/5.0 Chrome-Lighthouse',
      'Mozilla/5.0 (compatible; AhrefsBot/7.0)',
    ];
    for (const userAgent of bots) {
      expect(isBot(userAgent)).toBe(true);
      expect(detectLanguageRedirect({ ...base, userAgent })).toBeNull();
    }
    expect(isBot('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36')).toBe(false);
  });

  it('does nothing when the browser reports no language', () => {
    expect(detectLanguageRedirect({ ...base, navigatorLanguage: '' })).toBeNull();
    expect(detectLanguageRedirect({ ...base, navigatorLanguage: undefined })).toBeNull();
  });
});
