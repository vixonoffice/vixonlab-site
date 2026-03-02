import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/5 bg-background">
      <div className="mx-auto max-w-content section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & description */}
          <div className="lg:col-span-1">
            <Link to="/" className="text-xl font-bold font-heading inline-block mb-4">
              <span className="text-foreground">VIXON</span>
              <span className="gradient-text">&nbsp;LAB</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-heading font-semibold text-sm mb-4 text-foreground">{t('footer.quickLinks')}</h3>
            <div className="flex flex-col gap-2.5">
              {[
                { label: t('nav.home'), path: '/' },
                { label: t('nav.about'), path: '/about' },
                { label: t('nav.portfolio'), path: '/portfolio' },
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
            <h3 className="font-heading font-semibold text-sm mb-4 text-foreground">{t('footer.services')}</h3>
            <div className="flex flex-col gap-2.5">
              {[
                { label: 'Essential', path: '/services' },
                { label: 'Business', path: '/services' },
                { label: 'Ecosistem', path: '/services' },
                { label: 'Vixon Care', path: '/services' },
              ].map((link) => (
                <Link key={link.label} to={link.path} className="text-sm text-muted-foreground hover:text-primary-light transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-heading font-semibold text-sm mb-4 text-foreground">{t('footer.legal')}</h3>
            <div className="flex flex-col gap-2.5">
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary-light transition-colors">
                {t('footer.privacy')}
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary-light transition-colors">
                {t('footer.terms')}
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 text-center">
          <p className="text-xs text-muted-foreground">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
