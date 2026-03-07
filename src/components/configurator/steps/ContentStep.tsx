import { label, desc } from '../configuratorConfig';
import type { Option } from '../configuratorConfig';
import type { ConfigState } from '../useConfiguratorState';
import type { Language } from '@/lib/translations';
import { Check } from 'lucide-react';

interface Props {
  state: ConfigState;
  setField: (field: keyof ConfigState, value: string) => void;
  toggleArray: (field: keyof ConfigState, value: string) => void;
  lang: Language;
  textOptions: Option[];
  photoOptions: Option[];
  marketingOptions: Option[];
}

export function ContentStep({ state, setField, toggleArray, lang, textOptions, photoOptions, marketingOptions }: Props) {
  const isRo = lang === 'ro';

  return (
    <div className="space-y-6">
      {/* Text status */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {isRo ? 'Ai texte pregatite pentru site?' : 'Do you have texts ready for the site?'}
        </label>
        <div className="space-y-2">
          {textOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setField('textStatus', opt.id)}
              className={`w-full px-4 py-3 rounded-xl text-sm text-left transition-all ${
                state.textStatus === opt.id
                  ? 'bg-primary/20 border-primary/50 text-primary-light border'
                  : 'bg-white/5 border border-white/10 text-foreground hover:bg-white/10'
              }`}
            >
              {label(opt, lang)}
            </button>
          ))}
        </div>
      </div>

      {/* Photo status */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {isRo ? 'Ai fotografii profesionale?' : 'Do you have professional photographs?'}
        </label>
        <div className="space-y-2">
          {photoOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setField('photoStatus', opt.id)}
              className={`w-full px-4 py-3 rounded-xl text-sm text-left transition-all ${
                state.photoStatus === opt.id
                  ? 'bg-primary/20 border-primary/50 text-primary-light border'
                  : 'bg-white/5 border border-white/10 text-foreground hover:bg-white/10'
              }`}
            >
              {label(opt, lang)}
            </button>
          ))}
        </div>
      </div>

      {/* Marketing */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          {isRo ? 'Vrei si servicii de marketing?' : 'Do you also want marketing services?'}
        </label>
        <p className="text-xs text-muted-foreground mb-3">
          {isRo ? 'Optional — selecteaza ce te intereseaza' : 'Optional — select what interests you'}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {marketingOptions.map((opt) => {
            const selected = state.marketing.includes(opt.id);
            return (
              <button
                key={opt.id}
                onClick={() => toggleArray('marketing', opt.id)}
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
                    {label(opt, lang)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{desc(opt, lang)}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
