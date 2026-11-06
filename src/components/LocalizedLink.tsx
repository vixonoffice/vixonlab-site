import { forwardRef } from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { localizePath, type Language } from '@/lib/i18n';

interface LocalizedLinkProps extends LinkProps {
  /** Implicit: limba paginii curente. "ro" / "en" fortează limba țintei (ex. articolele de blog rămân în română). */
  locale?: Language;
}

/** Drop-in pentru `Link` din react-router: pune prefixul /en pe linkurile interne cand pagina e in engleza. */
export const Link = forwardRef<HTMLAnchorElement, LocalizedLinkProps>(({ to, locale, ...rest }, ref) => {
  const { language } = useLanguage();
  const target = typeof to === 'string' && to.startsWith('/') ? localizePath(to, locale ?? language) : to;
  return <RouterLink ref={ref} to={target} {...rest} />;
});

Link.displayName = 'Link';
