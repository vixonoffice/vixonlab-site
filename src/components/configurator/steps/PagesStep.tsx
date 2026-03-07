import { useState } from 'react';
import { PAGE_OPTIONS, label } from '../configuratorConfig';
import type { ConfigState } from '../useConfiguratorState';
import type { Language } from '@/lib/translations';
import { Check, Plus, X } from 'lucide-react';

interface Props {
  state: ConfigState;
  toggleArray: (field: keyof ConfigState, value: string) => void;
  addCustomPage: (value: string) => void;
  removeCustomPage: (index: number) => void;
  lang: Language;
}

export function PagesStep({ state, toggleArray, addCustomPage, removeCustomPage, lang }: Props) {
  const [customInput, setCustomInput] = useState('');
  const isRo = lang === 'ro';

  const handleAddCustom = () => {
    if (customInput.trim()) {
      addCustomPage(customInput);
      setCustomInput('');
    }
  };

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-4">
        {isRo
          ? 'Selecteaza paginile pe care le vrei pe site. Poti adauga si pagini custom.'
          : 'Select the pages you want on your site. You can also add custom pages.'}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {PAGE_OPTIONS.map((page) => {
          const selected = state.pages.includes(page.id);
          return (
            <button
              key={page.id}
              onClick={() => toggleArray('pages', page.id)}
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
              {label(page, lang)}
            </button>
          );
        })}
      </div>

      {/* Custom pages */}
      {state.customPages.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {state.customPages.map((page, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 bg-primary/20 border border-primary/50 text-primary-light px-3 py-1.5 rounded-xl text-sm"
            >
              {page}
              <button onClick={() => removeCustomPage(i)} className="hover:text-white transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Add custom page */}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddCustom()}
          placeholder={isRo ? 'Alta pagina...' : 'Other page...'}
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
        />
        <button
          onClick={handleAddCustom}
          className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-foreground hover:bg-white/10 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-3 text-xs text-muted-foreground">
        {state.pages.length + state.customPages.length} {isRo ? 'pagini selectate' : 'pages selected'}
      </div>
    </div>
  );
}
