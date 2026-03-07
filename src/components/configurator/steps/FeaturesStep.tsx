import { FEATURE_OPTIONS, label, desc } from '../configuratorConfig';
import type { ConfigState } from '../useConfiguratorState';
import type { Language } from '@/lib/translations';
import { Check } from 'lucide-react';

interface Props {
  state: ConfigState;
  toggleArray: (field: keyof ConfigState, value: string) => void;
  lang: Language;
}

export function FeaturesStep({ state, toggleArray, lang }: Props) {
  const isRo = lang === 'ro';

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-4">
        {isRo
          ? 'Ce functionalitati vrei pe site? Selecteaza tot ce te intereseaza.'
          : 'What features do you want on your site? Select everything that interests you.'}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {FEATURE_OPTIONS.map((feat) => {
          const selected = state.features.includes(feat.id);
          return (
            <button
              key={feat.id}
              onClick={() => toggleArray('features', feat.id)}
              className={`flex items-start gap-3 p-3 rounded-xl text-left transition-all ${
                selected
                  ? 'bg-primary/15 border-primary/50 border'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              }`}
            >
              <div className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center shrink-0 ${
                selected ? 'bg-primary text-white' : 'border border-white/20'
              }`}>
                {selected && <Check className="w-3 h-3" />}
              </div>
              <div className="min-w-0">
                <div className={`text-sm font-medium ${selected ? 'text-primary-light' : 'text-foreground'}`}>
                  {label(feat, lang)}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">{desc(feat, lang)}</div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-3 text-xs text-muted-foreground">
        {state.features.length} {isRo ? 'selectate' : 'selected'}
      </div>
    </div>
  );
}
