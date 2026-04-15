import { label, desc, isPromoActive } from '../configuratorConfig';
import type { Option } from '../configuratorConfig';
import type { ConfigState } from '../useConfiguratorState';
import type { Language } from '@/lib/translations';
import { Globe, ShoppingCart, Zap, Layout } from 'lucide-react';

const siteIcons: Record<string, typeof Globe> = {
  presentation: Globe,
  ecommerce: ShoppingCart,
  landing: Zap,
  webapp: Layout,
};

interface Props {
  state: ConfigState;
  setField: (field: keyof ConfigState, value: string) => void;
  lang: Language;
  businessTypes: Option[];
  siteTypes: Option[];
}

export function ProjectStep({ state, setField, lang, businessTypes, siteTypes }: Props) {
  const isRo = lang === 'ro';

  return (
    <div className="space-y-8">
      {/* Business name */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {isRo ? 'Numele afacerii tale' : 'Your business name'}
        </label>
        <input
          type="text"
          value={state.businessName}
          onChange={(e) => setField('businessName', e.target.value)}
          placeholder={isRo ? 'ex: Pizzeria Roma' : 'e.g. Roma Pizzeria'}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
        />
      </div>

      {/* Business type */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {isRo ? 'Ce domeniu de activitate?' : 'What industry?'}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {businessTypes.map((bt) => (
            <button
              key={bt.id}
              onClick={() => setField('businessType', bt.id)}
              className={`px-3 py-2.5 rounded-xl text-sm text-left transition-all ${
                state.businessType === bt.id
                  ? 'bg-primary/20 border-primary/50 text-primary-light border'
                  : 'bg-white/5 border border-white/10 text-foreground hover:bg-white/10'
              }`}
            >
              {label(bt, lang)}
            </button>
          ))}
        </div>
      </div>

      {/* Has website */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {isRo ? 'Ai deja un website?' : 'Do you already have a website?'}
        </label>
        <div className="flex gap-3">
          {['yes', 'no'].map((val) => (
            <button
              key={val}
              onClick={() => setField('hasWebsite', val)}
              className={`px-6 py-2.5 rounded-xl text-sm transition-all ${
                state.hasWebsite === val
                  ? 'bg-primary/20 border-primary/50 text-primary-light border'
                  : 'bg-white/5 border border-white/10 text-foreground hover:bg-white/10'
              }`}
            >
              {val === 'yes' ? 'Da' : 'Nu'}
            </button>
          ))}
        </div>
        {state.hasWebsite === 'yes' && (
          <input
            type="url"
            value={state.currentWebsiteUrl}
            onChange={(e) => setField('currentWebsiteUrl', e.target.value)}
            placeholder="https://..."
            className="mt-3 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
          />
        )}
      </div>

      {/* Site type — the important one */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          {isRo ? 'Ce tip de site vrei?' : 'What type of site do you want?'}
          <span className="text-primary-light ml-1">*</span>
        </label>
        <p className="text-xs text-muted-foreground mb-3">
          {isRo ? 'Alege tipul care se potriveste cel mai bine' : 'Choose the type that fits best'}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {siteTypes.map((st) => {
            const Icon = siteIcons[st.id] || Globe;
            const selected = state.siteType === st.id;
            return (
              <button
                key={st.id}
                onClick={() => setField('siteType', st.id)}
                className={`p-4 rounded-2xl text-left transition-all ${
                  selected
                    ? 'bg-primary/15 border-primary/50 border-2 ring-1 ring-primary/20'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    selected ? 'bg-primary/30' : 'bg-white/10'
                  }`}>
                    <Icon className={`w-5 h-5 ${selected ? 'text-primary-light' : 'text-muted-foreground'}`} />
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-foreground text-sm">{label(st, lang)}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{desc(st, lang)}</div>
                    {isPromoActive() && st.promoPrice ? (
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-xs text-muted-foreground line-through">{st.price}&euro;</span>
                        <span className="text-xs text-primary-light font-medium">{st.promoPrice}&euro;</span>
                        <span className="text-[10px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded-full font-bold">-30%</span>
                      </div>
                    ) : (
                      <div className="text-xs text-primary-light mt-1.5 font-medium">{st.price}&euro;</div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
