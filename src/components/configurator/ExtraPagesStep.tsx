import { useLanguage } from '@/contexts/LanguageContext';
import { EXTRA_PAGE_PRICE } from '@/lib/configuratorData';
import { Minus, Plus } from 'lucide-react';

interface Props {
  extraPages: number;
  maxPages: number;
  onChange: (count: number) => void;
}

export function ExtraPagesStep({ extraPages, maxPages, onChange }: Props) {
  const { t, language } = useLanguage();

  return (
    <div>
      <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-2">
        {t('cfg.extraPagesTitle')}
      </h2>
      <p className="text-muted-foreground mb-6">
        {language === 'ro'
          ? `Pachetul include ${maxPages} pagini. Adaugă pagini suplimentare la ${EXTRA_PAGE_PRICE}€/pagină.`
          : `Package includes ${maxPages} pages. Add extra pages at ${EXTRA_PAGE_PRICE}€/page.`
        }
      </p>

      <div className="glass-card p-6 max-w-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-heading font-semibold text-foreground">
              {language === 'ro' ? 'Pagini extra' : 'Extra pages'}
            </p>
            <p className="text-sm text-muted-foreground">
              {extraPages > 0 ? `+${extraPages * EXTRA_PAGE_PRICE}€` : (language === 'ro' ? 'Niciuna' : 'None')}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onChange(extraPages - 1)}
              disabled={extraPages <= 0}
              className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-foreground hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-heading font-bold text-xl text-foreground w-8 text-center">
              {extraPages}
            </span>
            <button
              onClick={() => onChange(extraPages + 1)}
              className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-foreground hover:bg-white/5 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
