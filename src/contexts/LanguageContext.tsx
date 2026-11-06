import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { translations, Language, TranslationKey } from '@/lib/translations';
import {
  alternatePath,
  detectLanguageRedirect,
  langFromPath,
  localizePath,
  readStoredLanguage,
  writeStoredLanguage,
  EN_PREFIX,
} from '@/lib/i18n';

interface LanguageContextType {
  language: Language;
  /** Schimba limba: te duce pe pagina echivalenta si retine alegerea. */
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  /** Pune prefixul limbii curente pe o cale interna. */
  lp: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/** Calculat o singura data, la prima incarcare a aplicatiei (nu la navigarile din interior). */
function computeInitialRedirect(pathname: string): boolean {
  if (typeof window === 'undefined') return false;
  return (
    detectLanguageRedirect({
      pathname,
      navigatorLanguage: window.navigator.language,
      userAgent: window.navigator.userAgent,
      stored: readStoredLanguage(),
    }) === 'en'
  );
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const language = langFromPath(location.pathname);

  const [redirecting, setRedirecting] = useState(() => computeInitialRedirect(location.pathname));

  useEffect(() => {
    if (!redirecting) return;
    // Prima vizita pe "/" cu un browser care nu e in romana: mergem pe /en, o singura data, si retinem alegerea.
    if (!readStoredLanguage()) writeStoredLanguage('en');
    navigate(`${EN_PREFIX}${location.search}${location.hash}`, { replace: true });
    setRedirecting(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback(
    (lang: Language) => {
      writeStoredLanguage(lang);
      navigate(alternatePath(location.pathname, lang));
    },
    [location.pathname, navigate],
  );

  const value = useMemo<LanguageContextType>(
    () => ({
      language,
      setLanguage,
      t: (key) => translations[language][key] || key,
      lp: (path) => localizePath(path, language),
    }),
    [language, setLanguage],
  );

  // Cat timp se face redirectul nu desenam varianta RO (evita un flash de continut in limba gresita).
  if (redirecting && location.pathname === '/') return null;

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
