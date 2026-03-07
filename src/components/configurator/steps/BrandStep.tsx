import { LOGO_STATUS, DESIGN_STYLES, BRAND_EXTRAS, label, desc } from '../configuratorConfig';
import type { ConfigState } from '../useConfiguratorState';
import type { Language } from '@/lib/translations';
import { Check } from 'lucide-react';

interface Props {
  state: ConfigState;
  setField: (field: keyof ConfigState, value: string) => void;
  toggleArray: (field: keyof ConfigState, value: string) => void;
  lang: Language;
}

export function BrandStep({ state, setField, toggleArray, lang }: Props) {
  const isRo = lang === 'ro';

  return (
    <div className="space-y-6">
      {/* Logo */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {isRo ? 'Ai logo?' : 'Do you have a logo?'}
        </label>
        <div className="flex flex-wrap gap-2">
          {LOGO_STATUS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setField('logoStatus', opt.id)}
              className={`px-4 py-2.5 rounded-xl text-sm transition-all ${
                state.logoStatus === opt.id
                  ? 'bg-primary/20 border-primary/50 text-primary-light border'
                  : 'bg-white/5 border border-white/10 text-foreground hover:bg-white/10'
              }`}
            >
              {label(opt, lang)}
            </button>
          ))}
        </div>
      </div>

      {/* Brand colors */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {isRo ? 'Ai culori de brand definite?' : 'Do you have defined brand colors?'}
        </label>
        <div className="flex gap-3">
          {['yes', 'no'].map((val) => (
            <button
              key={val}
              onClick={() => setField('hasBrandColors', val)}
              className={`px-6 py-2.5 rounded-xl text-sm transition-all ${
                state.hasBrandColors === val
                  ? 'bg-primary/20 border-primary/50 text-primary-light border'
                  : 'bg-white/5 border border-white/10 text-foreground hover:bg-white/10'
              }`}
            >
              {val === 'yes' ? 'Da' : 'Nu'}
            </button>
          ))}
        </div>
        {state.hasBrandColors === 'yes' && (
          <input
            type="text"
            value={state.brandColorsText}
            onChange={(e) => setField('brandColorsText', e.target.value)}
            placeholder={isRo ? 'ex: albastru inchis, alb, auriu' : 'e.g. dark blue, white, gold'}
            className="mt-3 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
          />
        )}
      </div>

      {/* Design style */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {isRo ? 'Ce stil de design preferi?' : 'What design style do you prefer?'}
        </label>
        <div className="grid grid-cols-2 gap-2">
          {DESIGN_STYLES.map((style) => {
            const selected = state.designStyle === style.id;
            return (
              <button
                key={style.id}
                onClick={() => setField('designStyle', style.id)}
                className={`p-3 rounded-xl text-left transition-all ${
                  selected
                    ? 'bg-primary/15 border-primary/50 border-2'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                <div className={`text-sm font-medium ${selected ? 'text-primary-light' : 'text-foreground'}`}>
                  {label(style, lang)}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">{desc(style, lang)}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Reference URL */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          {isRo ? 'Ai un site care iti place ca referinta?' : 'Do you have a reference site you like?'}
        </label>
        <p className="text-xs text-muted-foreground mb-2">
          {isRo ? 'Optional — ne ajuta sa intelegem ce viziune ai' : 'Optional — helps us understand your vision'}
        </p>
        <input
          type="url"
          value={state.referenceUrl}
          onChange={(e) => setField('referenceUrl', e.target.value)}
          placeholder="https://..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
        />
      </div>

      {/* Brand extras */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          {isRo ? 'Vrei si materiale de brand?' : 'Do you also want brand materials?'}
        </label>
        <p className="text-xs text-muted-foreground mb-3">
          {isRo ? 'Optional — ne putem ocupa si de materialele fizice/digitale' : 'Optional — we can also handle physical/digital materials'}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {BRAND_EXTRAS.map((extra) => {
            const selected = state.brandExtras.includes(extra.id);
            return (
              <button
                key={extra.id}
                onClick={() => toggleArray('brandExtras', extra.id)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-left transition-all ${
                  selected
                    ? 'bg-primary/20 border-primary/50 text-primary-light border'
                    : 'bg-white/5 border border-white/10 text-foreground hover:bg-white/10'
                }`}
              >
                <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ${
                  selected ? 'bg-primary text-white' : 'border border-white/20'
                }`}>
                  {selected && <Check className="w-3 h-3" />}
                </div>
                {label(extra, lang)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
