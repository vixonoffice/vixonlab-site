import { useLanguage } from '@/contexts/LanguageContext';
import { isPromoActive } from '@/lib/promo';
import { Check } from 'lucide-react';
import type { AddonInfo } from './useConfigurator';

function discountLabel(label: string): string {
  return label.replace(/[\d.]+/g, (m) => {
    const n = parseInt(m.replace(/\./g, ''), 10);
    return String(Math.round(n * 0.7));
  });
}

interface Props {
  addons: AddonInfo[];
  selectedSlugs: string[];
  onToggle: (slug: string) => void;
}

export function AddOnsStep({ addons, selectedSlugs, onToggle }: Props) {
  const { t, language } = useLanguage();

  return (
    <div>
      <p className="text-muted-foreground mb-5">{t('cfg.addonsSubtitle')}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {addons.map(({ plan, slug, price, included }) => {
          const name = language === 'en' ? plan.name_en : plan.name_ro;
          const desc = language === 'en' ? plan.description_en : plan.description_ro;
          const isSelected = selectedSlugs.includes(slug) || included;
          const priceLabel = language === 'en' ? plan.price_label_en : plan.price_label_ro;

          return (
            <div
              key={slug}
              onClick={() => !included && onToggle(slug)}
              className={`glass-card p-4 relative transition-all duration-200 ${
                included
                  ? 'border-green-500/40 bg-green-500/5 cursor-default'
                  : isSelected
                    ? 'border-primary/60 ring-1 ring-primary/30 cursor-pointer'
                    : 'hover:border-white/20 cursor-pointer'
              }`}
            >
              {included && (
                <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider text-green-400 bg-green-500/15 px-2 py-0.5 rounded-full">
                  {language === 'ro' ? 'Inclus' : 'Included'}
                </span>
              )}

              <div className="flex items-start gap-3">
                <div className={`w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                  isSelected
                    ? included ? 'border-green-500 bg-green-500' : 'border-primary bg-primary'
                    : 'border-white/20'
                }`}>
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2 mb-0.5">
                    <h4 className="font-heading font-semibold text-sm text-foreground">{name}</h4>
                    {!included && (
                      isPromoActive() ? (
                        <span className="flex items-center gap-1.5 shrink-0">
                          <span className="text-xs text-muted-foreground line-through">{priceLabel}</span>
                          <span className="text-sm font-bold text-foreground">{discountLabel(priceLabel)}</span>
                        </span>
                      ) : (
                        <span className="text-sm font-bold text-foreground shrink-0">{priceLabel}</span>
                      )
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1">{desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
