import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from '@/components/LocalizedLink';
import { useLanguage } from '@/contexts/LanguageContext';
import { alternatePath, stripLang, type Language } from '@/lib/i18n';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const navLinks = [
  { key: 'nav.home' as const,      path: '/' },
  { key: 'nav.services' as const,  path: '/services' },
  { key: 'nav.pricing' as const,   path: '/pricing' },
  { key: 'nav.portfolio' as const, path: '/portfolio' },
  { key: 'nav.blog' as const,      path: '/blog' },
  { key: 'nav.about' as const,     path: '/about' },
  { key: 'nav.agencies' as const,  path: '/agencies', onlyEn: true },
];

/** Selector RO / EN: linkuri reale (crawlabile) catre pagina echivalenta, care retin alegerea. */
function LanguageSwitch({ size }: { size: 'md' | 'sm' }) {
  const { language, setLanguage } = useLanguage();
  const { pathname } = useLocation();
  const pad = size === 'md' ? 'px-3' : 'px-2.5';
  return (
    <>
      {(['ro', 'en'] as Language[]).map((lang) => (
        <a
          key={lang}
          href={alternatePath(pathname, lang)}
          hrefLang={lang}
          lang={lang}
          aria-current={language === lang ? 'true' : undefined}
          aria-label={lang === 'ro' ? 'Română' : 'English'}
          onClick={(e) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
            e.preventDefault();
            setLanguage(lang);
          }}
          className={`${pad} py-1 rounded-full text-xs font-medium transition-all ${
            language === lang ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {lang.toUpperCase()}
        </a>
      ))}
    </>
  );
}

export function Navbar() {
  const { language, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const currentPath = stripLang(location.pathname);
  const links = navLinks.filter((l) => !l.onlyEn || language === 'en');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 section-padding pt-4 md:pt-6">
        <div className="mx-auto max-w-content flex items-center justify-between gap-4">
          {/* Logo pill */}
          <Link
            to="/"
            onClick={() => {
              setMobileOpen(false);
              if (currentPath === '/') window.scrollTo({ top: 0, behavior: 'instant' });
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all relative z-50 ${
              scrolled
                ? 'bg-background/80 backdrop-blur-xl border-white/10'
                : 'bg-white/5 backdrop-blur-md border-white/10'
            }`}
          >
            <img src="/logo-nav.webp" alt="Vixon Lab" className="h-7 w-7 object-contain" width="28" height="28" />
            <span className="text-base font-bold font-heading tracking-tight">
              <span className="text-foreground">VIXON</span>
              <span className="text-primary-light">LAB</span>
            </span>
          </Link>

          {/* Center pill — desktop nav */}
          <div className={`hidden lg:flex items-center gap-1 px-2 py-2 rounded-full border transition-all ${
            scrolled
              ? 'bg-background/80 backdrop-blur-xl border-white/10'
              : 'bg-white/5 backdrop-blur-md border-white/10'
          }`}>
            {links.map((link) => {
              const active = currentPath === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {active && (
                    <span className="absolute inset-0 rounded-full bg-primary/20 border border-primary/30" />
                  )}
                  <span className="relative">{t(link.key)}</span>
                </Link>
              );
            })}
          </div>

          {/* Right pill — language + CTA */}
          <div className="hidden lg:flex items-center gap-2">
            <div className={`flex items-center rounded-full border p-1 transition-all ${
              scrolled ? 'bg-background/80 backdrop-blur-xl border-white/10' : 'bg-white/5 backdrop-blur-md border-white/10'
            }`}>
              <LanguageSwitch size="md" />
            </div>

            <Link
              to="/contact"
              className="btn-primary text-sm font-medium pl-5 pr-2 py-2 rounded-full hover:opacity-90 transition-all inline-flex items-center gap-2"
            >
              {t('nav.contact')}
              <span className="bg-white/20 rounded-full p-1.5">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>

          {/* Mobile right */}
          <div className="flex lg:hidden items-center gap-2 relative z-50">
            <div className="flex items-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 p-1">
              <LanguageSwitch size="sm" />
            </div>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-11 h-11 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-foreground"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <div className={`fixed inset-0 z-40 bg-background/98 backdrop-blur-xl flex flex-col items-center justify-center gap-7 lg:hidden overflow-hidden touch-none transition-opacity duration-300 ${
        mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {links.map((link, i) => (
          <Link
            key={link.path}
            to={link.path}
            className={`text-4xl md:text-5xl font-heading font-bold transition-colors ${
              currentPath === link.path ? 'text-primary-light' : 'text-foreground hover:text-primary-light'
            }`}
            style={{ transitionDelay: `${i * 30}ms` }}
          >
            {t(link.key)}
          </Link>
        ))}
        <Link
          to="/contact"
          className="btn-primary text-lg font-medium px-8 py-3.5 rounded-full mt-4 inline-flex items-center gap-2"
        >
          {t('nav.contact')} <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </>
  );
}
