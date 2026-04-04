import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageCircle } from 'lucide-react';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/5 bg-background">
      <div className="mx-auto max-w-content section-padding py-12 md:py-16">
        {/* Top: Logo & description — full width */}
        <div className="mb-10">
          <Link to="/" className="text-xl font-bold font-heading inline-block mb-3">
            <span className="text-foreground">VIXON</span>
            <span className="gradient-text">&nbsp;LAB</span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-md mb-4">
            {t('footer.description')}
          </p>
          <a
            href="https://wa.me/40779383164"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary-light transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
        </div>

        {/* Links grid — 2 cols on mobile, 3 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {/* Quick links */}
          <div>
            <h3 className="font-heading font-semibold text-sm mb-3 text-foreground">{t('footer.quickLinks')}</h3>
            <div className="flex flex-col gap-2">
              {[
                { label: t('nav.home'), path: '/' },
                { label: t('nav.about'), path: '/about' },
                { label: t('nav.portfolio'), path: '/portfolio' },
                { label: t('nav.blog'), path: '/blog' },
                { label: t('nav.contact'), path: '/contact' },
              ].map((link) => (
                <Link key={link.path} to={link.path} className="text-sm text-muted-foreground hover:text-primary-light transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-semibold text-sm mb-3 text-foreground">{t('footer.services')}</h3>
            <div className="flex flex-col gap-2">
              {[
                { label: 'Essential', path: '/pricing' },
                { label: 'Business', path: '/pricing' },
                { label: 'Ecosistem', path: '/pricing' },
                { label: 'Vixon Care', path: '/pricing' },
                { label: t('nav.pricing'), path: '/pricing' },
              ].map((link) => (
                <Link key={link.label} to={link.path} className="text-sm text-muted-foreground hover:text-primary-light transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-heading font-semibold text-sm mb-3 text-foreground">{t('footer.legal')}</h3>
            <div className="flex flex-col gap-2">
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary-light transition-colors">
                {t('footer.privacy')}
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary-light transition-colors">
                {t('footer.terms')}
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-10 pt-6 text-center">
          <p className="text-xs text-muted-foreground">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
