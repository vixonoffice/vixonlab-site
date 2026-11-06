import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { canonicalUrl, hreflangLinks, type Language } from '@/lib/i18n';

interface SEOProps {
  title: string;
  description?: string;
  /** true = `title` e titlul complet (pagina de start), fara sufixul " — Vixon Lab". */
  home?: boolean;
  noindex?: boolean;
}

const DEFAULT_DESCRIPTION: Record<Language, string> = {
  ro: 'Site-uri rapide, cu cod custom, livrate în 7-14 zile. Preț clar de la început, plătit o singură dată, plus mentenanță lunară.',
  en: 'EU-based web studio. Custom websites, AI chatbots and white-label production for agencies. Fixed price per project, CET timezone.',
};

const OG_LOCALE: Record<Language, string> = { ro: 'ro_RO', en: 'en_US' };

function upsertMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/** Titlu, descriere, canonical, hreflang, Open Graph si <html lang> pentru pagina curenta. */
export function usePageSEO({ title, description, home = false, noindex = false }: SEOProps) {
  const { pathname } = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    const fullTitle = home ? title : `${title} — Vixon Lab`;
    const desc = description || DEFAULT_DESCRIPTION[language];
    const url = canonicalUrl(pathname);

    document.title = fullTitle;
    document.documentElement.lang = language;

    upsertMeta('meta[name="description"]', 'name', 'description', desc);
    upsertMeta('meta[name="robots"]', 'name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');
    upsertMeta('meta[name="language"]', 'name', 'language', language === 'en' ? 'English' : 'Romanian');
    upsertMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', desc);
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', url);
    upsertMeta('meta[property="og:locale"]', 'property', 'og:locale', OG_LOCALE[language]);
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', desc);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    // hreflang: se rescrie la fiecare pagina (doar paginile care exista in ambele limbi au alternate).
    document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    for (const link of hreflangLinks(pathname)) {
      const el = document.createElement('link');
      el.rel = 'alternate';
      el.hreflang = link.hreflang;
      el.href = link.href;
      document.head.appendChild(el);
    }
  }, [title, description, home, noindex, pathname, language]);
}
