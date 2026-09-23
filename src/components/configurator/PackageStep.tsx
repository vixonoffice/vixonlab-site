import { useLanguage } from '@/contexts/LanguageContext';
import { ScrollReveal } from '@/components/ScrollReveal';
import { parsePackageMeta, parsePrice } from '@/lib/configuratorData';
import { isPromoActive } from '@/lib/promo';
import { Check, Code, Building2, Zap } from 'lucide-react';
import type { PricingPlanRow } from '@/hooks/useSupabaseData';

/** Apply -30% to price labels like "300€", "700€ — 900€", "1.200€ — 1.600€" */
function discountLabel(label: string): string {
  return label.replace(/[\d.]+/g, (m) => {
    const n = parseInt(m.replace(/\./g, ''), 10);
    const d = Math.round(n * 0.7);
    return d >= 1000 ? d.toLocaleString('ro-RO') : String(d);
  });
}

const icons = [Code, Building2, Zap];
const gradients = [
  'from-blue-500 to-cyan-500',
  'from-primary to-accent',
  'from-purple-500 to-pink-500',
];

interface Props {
  packages: PricingPlanRow[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function PackageStep({ packages, selectedId, onSelect }: Props) {
  const { t, language } = useLanguage();

  return (
    <div>
      <p className="text-muted-foreground mb-5">{t('cfg.packagesSubtitle')}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {packages.map((pkg, index) => {
          const name = language === 'en' ? pkg.name_en : pkg.name_ro;
          const desc = language === 'en' ? pkg.description_en : pkg.description_ro;
          const price = language === 'en' ? pkg.price_label_en : pkg.price_label_ro;
          const features = language === 'en' ? pkg.features_en : pkg.features_ro;
          const isSelected = selectedId === pkg.id;
          const Icon = icons[index] || Code;
          const gradient = gradients[index] || gradients[0];
          const meta = parsePackageMeta(pkg);

          return (
            <ScrollReveal key={pkg.id}>
              <div
                className={`glass-card p-6 md:p-7 relative cursor-pointer transition-all duration-300 h-full ${
                  pkg.is_popular ? 'lg:scale-105 shadow-xl shadow-primary/10' : ''
                } ${
                  isSelected
                    ? 'border-primary/60 ring-2 ring-primary/30'
                    : pkg.is_popular
                      ? 'border-primary/40'
                      : 'hover:border-white/20'
                }`}
                onClick={() => onSelect(pkg.id)}
              >
                {pkg.is_popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="btn-primary text-xs font-medium px-4 py-1 rounded-full">
                      {t('sp.popular')}
                    </span>
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl icon-tile flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected ? 'border-primary bg-primary' : 'border-white/20'
                  }`}>
                    {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                </div>

                <h3 className="font-heading font-bold text-lg text-foreground mb-1">{name}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{desc}</p>

                {isPromoActive() ? (
                  <div className="mb-1 flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-muted-foreground line-through">{price}</span>
                    <span className="font-heading font-bold text-2xl text-foreground">{discountLabel(price)}</span>
                    <span className="text-[10px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded-full font-bold">-30%</span>
                  </div>
                ) : (
                  <div className="font-heading font-bold text-2xl text-foreground mb-1">{price}</div>
                )}
                <p className="text-xs text-muted-foreground mb-5">
                  {meta.max_pages === 1
                    ? (language === 'ro' ? '1 pagină' : '1 page')
                    : (language === 'ro' ? `Până la ${meta.max_pages} pagini` : `Up to ${meta.max_pages} pages`)
                  }
                  {meta.extra_pages && (language === 'ro' ? ' • extensibil' : ' • expandable')}
                </p>

                <div className="space-y-2.5">
                  {features.map((f) => (
                    <div key={f} className="flex items-center gap-2.5">
                      <div className="w-4.5 h-4.5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-primary-light" />
                      </div>
                      <span className="text-sm text-foreground">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}
