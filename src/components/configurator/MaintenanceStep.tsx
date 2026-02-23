import { useLanguage } from '@/contexts/LanguageContext';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Check, Shield, Server, Zap, Crown } from 'lucide-react';
import type { PricingPlanRow } from '@/hooks/useSupabaseData';

const tierIcons = [undefined, Server, Zap, Crown];
const tierGradients = [
  'from-gray-500 to-gray-600',
  'from-blue-500 to-cyan-500',
  'from-primary to-accent',
  'from-purple-500 to-pink-500',
];

interface Props {
  plans: PricingPlanRow[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function MaintenanceStep({ plans, selectedId, onSelect }: Props) {
  const { t, language } = useLanguage();

  return (
    <div>
      <p className="text-muted-foreground mb-5">{t('cfg.maintenanceSubtitle')}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {plans.map((plan, index) => {
          const name = language === 'en' ? plan.name_en : plan.name_ro;
          const desc = language === 'en' ? plan.description_en : plan.description_ro;
          const price = language === 'en' ? plan.price_label_en : plan.price_label_ro;
          const features = language === 'en' ? plan.features_en : plan.features_ro;
          const isSelected = selectedId === plan.id;
          const Icon = tierIcons[index] || Shield;
          const gradient = tierGradients[index] || tierGradients[0];

          return (
            <ScrollReveal key={plan.id}>
              <div
                className={`glass-card p-5 md:p-6 relative cursor-pointer transition-all duration-300 h-full ${
                  plan.is_popular ? 'shadow-lg shadow-primary/10' : ''
                } ${
                  isSelected
                    ? 'border-primary/60 ring-2 ring-primary/30'
                    : plan.is_popular
                      ? 'border-primary/40'
                      : 'hover:border-white/20'
                }`}
                onClick={() => onSelect(plan.id)}
              >
                {plan.is_popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="gradient-primary text-white text-xs font-medium px-4 py-1 rounded-full">
                      {t('sp.recommended')}
                    </span>
                  </div>
                )}

                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {Icon && (
                      <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-heading font-bold text-foreground">{name}</h3>
                      <p className="font-heading font-bold text-lg gradient-text">{price}</p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${
                    isSelected ? 'border-primary bg-primary' : 'border-white/20'
                  }`}>
                    {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                </div>

                <p className="text-xs text-muted-foreground mb-4">{desc}</p>

                {features.length > 0 && (
                  <div className="space-y-2">
                    {features.map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 text-primary-light" />
                        </div>
                        <span className="text-xs text-foreground">{f}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}
