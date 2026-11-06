import { lazy } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

// Pagina de start are doua variante scrise separat: RO pentru afaceri locale, EN pentru agentii si clienti din afara.
const HomeRo = lazy(() => import('./HomeRo'));
const HomeEn = lazy(() => import('./HomeEn'));

const Index = () => {
  const { language } = useLanguage();
  return language === 'en' ? <HomeEn /> : <HomeRo />;
};

export default Index;
