import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
}

export function usePageSEO({ title, description }: SEOProps) {
  useEffect(() => {
    const fullTitle = title === 'Acasă' || title === 'Home'
      ? 'Vixon Lab — Agenție Web Development & Design'
      : `${title} — Vixon Lab`;
    document.title = fullTitle;

    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute('content', description);
      }
    }
  }, [title, description]);
}
