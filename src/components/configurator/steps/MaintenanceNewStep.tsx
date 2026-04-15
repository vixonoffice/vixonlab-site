import type { MaintenancePlan } from '../configuratorConfig';
import { isPromoActive } from '../configuratorConfig';
import type { ConfigState } from '../useConfiguratorState';
import type { Language } from '@/lib/translations';
import { Check, Star } from 'lucide-react';

interface Props {
  state: ConfigState;
  setField: (field: keyof ConfigState, value: string) => void;
  lang: Language;
  plans: MaintenancePlan[];
}

export function MaintenanceNewStep({ state, setField, lang, plans }: Props) {
  const isRo = lang === 'ro';

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-2">
        {isRo
          ? 'Dupa ce site-ul e gata, tu alegi: il gestionezi singur sau ne ocupam noi.'
          : 'After the site is ready, you choose: manage it yourself or let us handle it.'}
      </p>
      <p className="text-xs text-muted-foreground mb-5">
        {isRo
          ? 'Nota: Modificarile majore (redesign complet, functionalitati noi) se tarifeaza separat, indiferent de plan.'
          : 'Note: Major changes (complete redesign, new features) are charged separately, regardless of plan.'}
      </p>

      <div className="space-y-3">
        {plans.map((plan) => {
          const selected = state.maintenancePlan === plan.id;
          const features = isRo ? plan.features_ro : plan.features_en;
          const price = isRo ? plan.price_ro : plan.price_en;
          const promoPrice = isRo ? plan.promoPrice_ro : plan.promoPrice_en;
          const showPromo = isPromoActive() && !!promoPrice;

          return (
            <button
              key={plan.id}
              onClick={() => setField('maintenancePlan', plan.id)}
              className={`w-full p-4 rounded-2xl text-left transition-all relative ${
                selected
                  ? 'bg-primary/15 border-primary/50 border-2 ring-1 ring-primary/20'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-2.5 right-3 inline-flex items-center gap-1 bg-primary px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                  <Star className="w-3 h-3" />
                  {isRo ? 'Recomandat' : 'Recommended'}
                </span>
              )}

              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                      selected ? 'bg-primary text-white' : 'border-2 border-white/20'
                    }`}>
                      {selected && <Check className="w-3 h-3" />}
                    </div>
                    <span className={`font-semibold text-sm ${selected ? 'text-primary-light' : 'text-foreground'}`}>
                      {isRo ? plan.ro : plan.en}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5 ml-7">
                    {isRo ? plan.desc_ro : plan.desc_en}
                  </p>
                  {features.length > 0 && (
                    <div className="mt-2.5 ml-7 flex flex-wrap gap-1.5">
                      {features.map((f, i) => (
                        <span key={i} className="text-[11px] bg-white/5 text-muted-foreground px-2 py-0.5 rounded-md">
                          {f}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-right shrink-0">
                  {showPromo ? (
                    <div className="flex flex-col items-end gap-0.5">
                      <span className="text-xs text-muted-foreground line-through">{price}&euro;</span>
                      <div className={`font-bold text-lg ${selected ? 'text-primary-light' : 'gradient-text'}`}>
                        {promoPrice}&euro;
                      </div>
                      <span className="text-[10px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded-full font-bold">-30%</span>
                    </div>
                  ) : (
                    <div className={`font-bold text-lg ${selected ? 'text-primary-light' : 'gradient-text'}`}>
                      {price === '0' ? (isRo ? 'Gratuit' : 'Free') : `${price}\u20AC`}
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
