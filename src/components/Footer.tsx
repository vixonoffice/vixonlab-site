import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageCircle, Mail, MapPin, ArrowUpRight } from 'lucide-react';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative border-t border-white/10 mt-32 overflow-hidden">

      <div className="relative mx-auto max-w-content section-padding pt-20 md:pt-28 pb-10">
        {/* ─── Massive brand mark ─── */}
        <div className="mb-16">
          <h2 className="font-heading font-bold text-[15vw] md:text-[14vw] leading-[0.85] tracking-tight">
            <span className="text-foreground">VIXON</span>
            <span className="text-primary-light">LAB</span>
          </h2>
        </div>

        {/* ─── 4-col grid ─── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6 border-t border-white/10 pt-12">
          {/* About */}
          <div className="col-span-2 md:col-span-1">
            <p className="text-sm uppercase tracking-widest text-primary-light mb-4">{t('footer.quickLinks')}</p>
            <p className="text-muted-foreground leading-relaxed mb-5 max-w-xs">{t('footer.description')}</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary-light transition-colors group"
            >
              {t('cta.button')}
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Sitemap */}
          <div>
            <p className="text-sm uppercase tracking-widest text-primary-light mb-4">Sitemap</p>
            <div className="flex flex-col gap-3">
              {[
                { label: t('nav.home'),      path: '/' },
                { label: t('nav.services'),  path: '/services' },
                { label: t('nav.portfolio'), path: '/portfolio' },
                { label: t('nav.about'),     path: '/about' },
                { label: t('nav.blog'),      path: '/blog' },
              ].map((l) => (
                <Link key={l.path} to={l.path} className="text-base text-foreground/80 hover:text-primary-light transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="text-sm uppercase tracking-widest text-primary-light mb-4">{t('footer.services')}</p>
            <div className="flex flex-col gap-3">
              {['Essential', 'Business', 'Ecosistem', 'Vixon Care', t('nav.pricing')].map((label) => (
                <Link key={label} to="/pricing" className="text-base text-foreground/80 hover:text-primary-light transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-sm uppercase tracking-widest text-primary-light mb-4">{t('nav.contact')}</p>
            <div className="flex flex-col gap-3 mb-6">
              <a href="https://wa.me/40779383164" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-base text-foreground/80 hover:text-primary-light transition-colors">
                <MessageCircle className="w-5 h-5 shrink-0" /> WhatsApp
              </a>
              <a href="mailto:contact@vixonlab.ro"
                className="inline-flex items-center gap-2 text-base text-foreground/80 hover:text-primary-light transition-colors">
                <Mail className="w-5 h-5 shrink-0" /> contact@vixonlab.ro
              </a>
              <span className="inline-flex items-center gap-2 text-base text-foreground/80">
                <MapPin className="w-5 h-5 shrink-0" /> România
              </span>
            </div>

            <div className="flex gap-2">
              <Link to="/privacy" className="text-xs text-muted-foreground hover:text-primary-light transition-colors">
                {t('footer.privacy')}
              </Link>
              <span className="text-xs text-muted-foreground">·</span>
              <Link to="/terms" className="text-xs text-muted-foreground hover:text-primary-light transition-colors">
                {t('footer.terms')}
              </Link>
            </div>
          </div>
        </div>

        {/* ─── Bottom strip ─── */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-muted-foreground">{t('footer.copyright')}</p>
          <p className="text-xs text-muted-foreground italic">
            Crafted with care in Romania
          </p>
        </div>
      </div>
    </footer>
  );
}
