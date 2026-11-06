// ---------------------------------------------------------------------------
// Rute pe limba (RO fara prefix, EN sub /en) + detectia limbii la prima vizita.
// Fisier fara dependinte de React, ca sa poata fi testat direct si folosit si de scripturi.
// ---------------------------------------------------------------------------

export type Language = 'ro' | 'en';

export const SITE_ORIGIN = 'https://vixonlab.ro';
export const EN_PREFIX = '/en';
export const LANG_STORAGE_KEY = 'vixonlab-lang';

/** Paginile care exista in ambele limbi (cheia = ruta RO). Restul au echivalent ales in `alternatePath`. */
const BILINGUAL_EXACT = new Set([
  '/', '/services', '/portfolio', '/about', '/pricing', '/contact', '/blog', '/privacy', '/terms',
]);
const CASE_STUDY_RE = /^\/portfolio\/[^/]+$/;

export function langFromPath(pathname: string): Language {
  return pathname === EN_PREFIX || pathname.startsWith(`${EN_PREFIX}/`) ? 'en' : 'ro';
}

/** "/en/pricing" -> "/pricing", "/en" -> "/", "/pricing" -> "/pricing". */
export function stripLang(pathname: string): string {
  if (langFromPath(pathname) !== 'en') return pathname || '/';
  const rest = pathname.slice(EN_PREFIX.length);
  return rest.startsWith('/') && rest.length > 1 ? rest : '/';
}

/** Pune prefixul limbii pe o cale interna ("/pricing#x" -> "/en/pricing#x"). Pastreaza query si hash. */
export function localizePath(path: string, lang: Language): string {
  if (!path.startsWith('/')) return path;
  const match = path.match(/^([^?#]*)(.*)$/);
  const base = stripLang(match ? match[1] : path);
  const tail = match ? match[2] : '';
  if (lang === 'ro') return base + tail;
  return (base === '/' ? EN_PREFIX : EN_PREFIX + base) + tail;
}

function isBilingual(roPath: string): boolean {
  return BILINGUAL_EXACT.has(roPath) || CASE_STUDY_RE.test(roPath);
}

/** Unde ducem utilizatorul cand schimba limba, pe pagina curenta. */
export function alternatePath(pathname: string, target: Language): string {
  const current = langFromPath(pathname);
  if (current === target) return pathname;
  const base = stripLang(pathname);
  if (isBilingual(base)) return localizePath(base, target);
  if (target === 'en') {
    if (base === '/oferta' || base === '/offer') return localizePath('/pricing', 'en');
    if (base.startsWith('/blog/')) return localizePath('/blog', 'en');
    return localizePath('/', 'en');
  }
  // EN -> RO pentru pagini care exista doar in engleza (ex. /en/agencies)
  return '/';
}

export interface HreflangLink {
  hreflang: 'ro' | 'en' | 'x-default';
  href: string;
}

/** Linkurile hreflang ale unei pagini. Gol daca pagina exista intr-o singura limba. */
export function hreflangLinks(pathname: string): HreflangLink[] {
  const base = stripLang(pathname);
  if (!isBilingual(base)) return [];
  const ro = SITE_ORIGIN + localizePath(base, 'ro');
  const en = SITE_ORIGIN + localizePath(base, 'en');
  return [
    { hreflang: 'ro', href: ro },
    { hreflang: 'en', href: en },
    { hreflang: 'x-default', href: en },
  ];
}

export function canonicalUrl(pathname: string): string {
  const path = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  return SITE_ORIGIN + (path || '/');
}

// --- Detectia limbii (client-side, fara IP) ---------------------------------

const BOT_RE =
  /bot|crawler|spider|slurp|mediapartners|bingpreview|facebookexternalhit|embedly|whatsapp|telegram|discord|lighthouse|pagespeed|gtmetrix|pingdom|yandex|baidu|duckduck/i;

export function isBot(userAgent: string): boolean {
  return BOT_RE.test(userAgent || '');
}

export function readStoredLanguage(): Language | null {
  try {
    const v = window.localStorage.getItem(LANG_STORAGE_KEY);
    return v === 'ro' || v === 'en' ? v : null;
  } catch {
    return null;
  }
}

export function writeStoredLanguage(lang: Language): void {
  try {
    window.localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    /* localStorage poate lipsi (mod privat, setari de browser): detectia merge fara el */
  }
}

export interface RedirectInput {
  pathname: string;
  navigatorLanguage: string | undefined;
  userAgent: string;
  stored: Language | null;
}

/**
 * Decide daca la prima incarcare pe "/" trimitem vizitatorul pe /en.
 * - doar pe "/" (linkurile directe catre alte pagini nu se ating)
 * - niciodata pentru boti (Googlebot trebuie sa vada ambele versiuni)
 * - alegerea retinuta (selectorul RO/EN) bate detectia
 * - fara alegere: browserul care nu e in romana merge pe EN
 */
export function detectLanguageRedirect(input: RedirectInput): 'en' | null {
  if (input.pathname !== '/') return null;
  if (isBot(input.userAgent)) return null;
  if (input.stored === 'ro') return null;
  if (input.stored === 'en') return 'en';
  const lang = (input.navigatorLanguage || '').toLowerCase();
  if (!lang) return null;
  return lang.startsWith('ro') ? null : 'en';
}
