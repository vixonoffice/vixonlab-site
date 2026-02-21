import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { key: 'nav.home' as const, path: '/' },
  { key: 'nav.services' as const, path: '/services' },
  { key: 'nav.portfolio' as const, path: '/portfolio' },
  { key: 'nav.blog' as const, path: '/blog' },
  { key: 'nav.about' as const, path: '/about' },
];

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-background/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-content section-padding">
          <div className="flex h-16 md:h-20 items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              onClick={() => {
                if (location.pathname === '/') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="flex items-center gap-2 relative z-50"
            >
              <img src="/logo.png" alt="Vixon Lab" className="h-8 w-8 object-contain" />
              <span className="text-xl font-bold font-heading">
                <span className="text-foreground">VIXON</span>
                <span className="gradient-text">&nbsp;LAB</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-primary-light ${
                    location.pathname === link.path ? 'text-primary-light' : 'text-muted-foreground'
                  }`}
                >
                  {t(link.key)}
                </Link>
              ))}
            </div>

            {/* Desktop right */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Language toggle */}
              <div className="flex items-center rounded-full bg-white/5 border border-white/10 p-0.5">
                <button
                  onClick={() => setLanguage('ro')}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    language === 'ro' ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  RO
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    language === 'en' ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  EN
                </button>
              </div>

              <Link
                to="/contact"
                className="gradient-primary text-white text-sm font-medium px-5 py-2.5 rounded-2xl hover:opacity-90 transition-opacity"
              >
                {t('nav.contact')}
              </Link>
            </div>

            {/* Mobile right */}
            <div className="flex lg:hidden items-center gap-3 relative z-50">
              <div className="flex items-center rounded-full bg-white/5 border border-white/10 p-0.5">
                <button
                  onClick={() => setLanguage('ro')}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                    language === 'ro' ? 'bg-primary text-white' : 'text-muted-foreground'
                  }`}
                >
                  RO
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                    language === 'en' ? 'bg-primary text-white' : 'text-muted-foreground'
                  }`}
                >
                  EN
                </button>
              </div>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="text-foreground p-2"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl flex flex-col items-center justify-center gap-6 lg:hidden overflow-hidden touch-none"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.3 }}
              >
                <Link
                  to={link.path}
                  className={`text-2xl font-heading font-semibold transition-colors ${
                    location.pathname === link.path ? 'gradient-text' : 'text-foreground hover:text-primary-light'
                  }`}
                >
                  {t(link.key)}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * navLinks.length, duration: 0.3 }}
            >
              <Link
                to="/contact"
                className="gradient-primary text-white text-lg font-medium px-8 py-3 rounded-2xl mt-2 inline-block"
              >
                {t('nav.contact')}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
