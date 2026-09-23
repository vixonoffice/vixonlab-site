import { useMemo } from 'react';
import { label } from '../configuratorConfig';
import type { Option, MaintenancePlan } from '../configuratorConfig';
import type { ConfigState } from '../useConfiguratorState';
import type { Language } from '@/lib/translations';
import { MessageCircle, ChevronRight } from 'lucide-react';

interface AllOptions {
  businessTypes: Option[];
  siteTypes: Option[];
  pages: Option[];
  features: Option[];
  designStyles: Option[];
  brandExtras: Option[];
  logoStatus: Option[];
  textStatus: Option[];
  photoStatus: Option[];
  marketing: Option[];
  maintenance: MaintenancePlan[];
  budget: Option[];
  timeline: Option[];
}

interface Props {
  state: ConfigState;
  setField: (field: keyof ConfigState, value: string) => void;
  lang: Language;
  whatsappUrl: string;
  budgetOptions: Option[];
  timelineOptions: Option[];
  options: AllOptions;
}

function findLabel(options: { id: string; ro: string; en: string }[], id: string, lang: Language): string {
  const opt = options.find((o) => o.id === id);
  return opt ? label(opt, lang) : id;
}

interface SummarySection {
  title: string;
  items: string[];
}

export function SummaryStep({ state, setField, lang, whatsappUrl, budgetOptions, timelineOptions, options }: Props) {
  const isRo = lang === 'ro';

  const sections = useMemo((): SummarySection[] => {
    const result: SummarySection[] = [];

    // Project
    const projectItems: string[] = [];
    if (state.businessName) projectItems.push(state.businessName);
    if (state.businessType) projectItems.push(findLabel(options.businessTypes, state.businessType, lang));
    if (state.siteType) projectItems.push(findLabel(options.siteTypes, state.siteType, lang));
    if (state.hasWebsite === 'yes' && state.currentWebsiteUrl) projectItems.push(state.currentWebsiteUrl);
    if (projectItems.length) result.push({ title: isRo ? 'Proiect' : 'Project', items: projectItems });

    // Pages
    const pageItems = [
      ...state.pages.map((id) => findLabel(options.pages, id, lang)),
      ...state.customPages,
    ];
    if (pageItems.length) result.push({ title: isRo ? 'Pagini' : 'Pages', items: pageItems });

    // Features
    const featureItems = state.features.map((id) => findLabel(options.features, id, lang));
    if (featureItems.length) result.push({ title: isRo ? 'Functionalitati' : 'Features', items: featureItems });

    // Design
    const designItems: string[] = [];
    if (state.logoStatus) designItems.push(`Logo: ${findLabel(options.logoStatus, state.logoStatus, lang)}`);
    if (state.designStyle) designItems.push(findLabel(options.designStyles, state.designStyle, lang));
    if (state.hasBrandColors === 'yes' && state.brandColorsText) designItems.push(`${isRo ? 'Culori' : 'Colors'}: ${state.brandColorsText}`);
    if (state.referenceUrl) designItems.push(`Ref: ${state.referenceUrl}`);
    const brandExtraItems = state.brandExtras.map((id) => findLabel(options.brandExtras, id, lang));
    designItems.push(...brandExtraItems);
    if (designItems.length) result.push({ title: 'Design & Brand', items: designItems });

    // Content
    const contentItems: string[] = [];
    if (state.textStatus) contentItems.push(`${isRo ? 'Texte' : 'Texts'}: ${findLabel(options.textStatus, state.textStatus, lang)}`);
    if (state.photoStatus) contentItems.push(`${isRo ? 'Poze' : 'Photos'}: ${findLabel(options.photoStatus, state.photoStatus, lang)}`);
    const marketingItems = state.marketing.map((id) => findLabel(options.marketing, id, lang));
    contentItems.push(...marketingItems);
    if (contentItems.length) result.push({ title: isRo ? 'Continut & Marketing' : 'Content & Marketing', items: contentItems });

    // Maintenance
    if (state.maintenancePlan) {
      const plan = options.maintenance.find((p) => p.id === state.maintenancePlan);
      if (plan) {
        const price = isRo ? plan.price_ro : plan.price_en;
        const planLabel = `${isRo ? plan.ro : plan.en} (${price === '0' ? (isRo ? 'Gratuit' : 'Free') : price + '\u20AC'})`;
        result.push({ title: isRo ? 'Mentenanta' : 'Maintenance', items: [planLabel] });
      }
    }

    return result;
  }, [state, lang, isRo, options]);

  const canSubmit = !!state.contactName.trim() && !!state.contactPhone.trim();

  return (
    <div className="space-y-6">
      {/* Summary review */}
      <div className="glass-card p-4 space-y-4">
        <h3 className="font-heading font-semibold text-foreground text-sm">
          {isRo ? 'Rezumatul configurarii tale' : 'Your configuration summary'}
        </h3>
        {sections.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            {isRo ? 'Nu ai selectat nimic inca.' : 'You haven\'t selected anything yet.'}
          </p>
        ) : (
          sections.map((section) => (
            <div key={section.title}>
              <div className="text-xs font-medium text-primary-light uppercase tracking-wider mb-1">
                {section.title}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {section.items.map((item, i) => (
                  <span key={i} className="text-xs bg-white/5 text-muted-foreground px-2 py-1 rounded-md">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Budget */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {isRo ? 'Ce buget ai in minte?' : 'What budget do you have in mind?'}
        </label>
        <div className="flex flex-wrap gap-2">
          {budgetOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setField('budget', opt.id)}
              className={`px-4 py-2 rounded-xl text-sm transition-all ${
                state.budget === opt.id
                  ? 'bg-primary/20 border-primary/50 text-primary-light border'
                  : 'bg-white/5 border border-white/10 text-foreground hover:bg-white/10'
              }`}
            >
              {label(opt, lang)}{opt.id !== 'flexible' ? '\u20AC' : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {isRo ? 'Cand vrei site-ul gata?' : 'When do you want the site ready?'}
        </label>
        <div className="flex flex-wrap gap-2">
          {timelineOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setField('timeline', opt.id)}
              className={`px-4 py-2 rounded-xl text-sm transition-all ${
                state.timeline === opt.id
                  ? 'bg-primary/20 border-primary/50 text-primary-light border'
                  : 'bg-white/5 border border-white/10 text-foreground hover:bg-white/10'
              }`}
            >
              {label(opt, lang)}
            </button>
          ))}
        </div>
      </div>

      {/* Contact info */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-foreground">
          {isRo ? 'Datele tale de contact' : 'Your contact details'}
          <span className="text-primary-light ml-1">*</span>
        </label>
        <input
          type="text"
          value={state.contactName}
          onChange={(e) => setField('contactName', e.target.value)}
          placeholder={isRo ? 'Nume complet *' : 'Full name *'}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
        />
        <input
          type="email"
          value={state.contactEmail}
          onChange={(e) => setField('contactEmail', e.target.value)}
          placeholder={isRo ? 'Email (optional)' : 'Email (optional)'}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
        />
        <input
          type="tel"
          value={state.contactPhone}
          onChange={(e) => setField('contactPhone', e.target.value)}
          placeholder={isRo ? 'Telefon / WhatsApp *' : 'Phone / WhatsApp *'}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
        />
        <textarea
          value={state.notes}
          onChange={(e) => setField('notes', e.target.value)}
          placeholder={isRo ? 'Alte detalii sau intrebari (optional)' : 'Other details or questions (optional)'}
          rows={3}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors resize-none"
        />
      </div>

      {/* Submit */}
      <a
        href={canSubmit ? whatsappUrl : undefined}
        target={canSubmit ? '_blank' : undefined}
        rel="noopener noreferrer"
        onClick={(e) => { if (!canSubmit) e.preventDefault(); }}
        className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-lg transition-all ${
          canSubmit
            ? 'bg-[#25D366] hover:bg-[#20BD5A] text-white cursor-pointer'
            : 'bg-white/10 text-muted-foreground cursor-not-allowed'
        }`}
      >
        <MessageCircle className="w-6 h-6" />
        {isRo ? 'Trimite pe WhatsApp' : 'Send on WhatsApp'}
        <ChevronRight className="w-5 h-5" />
      </a>

      {!canSubmit && (
        <p className="text-xs text-center text-muted-foreground">
          {isRo ? 'Completeaza numele si telefonul pentru a trimite.' : 'Fill in your name and phone to submit.'}
        </p>
      )}

      <p className="text-xs text-center text-muted-foreground">
        {isRo
          ? 'Raspundem in maxim 24h cu o oferta personalizata. Fara obligatii.'
          : 'We respond within 24h with a personalized offer. No obligations.'}
      </p>
    </div>
  );
}
