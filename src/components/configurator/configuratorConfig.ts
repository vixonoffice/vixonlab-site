// ---------------------------------------------------------------------------
// Full website configurator — all options data (RO/EN)
// ---------------------------------------------------------------------------

export { isPromoActive } from '@/lib/promo';
import { TIERS, ANNUAL_PAID_MONTHS, EXTRA_HOURLY_EUR, type Tier } from '@/lib/tiers';
import type { Option } from '@/data/types';
import {
  BUSINESS_TYPES, PAGE_OPTIONS, FEATURE_OPTIONS, DESIGN_STYLES, BRAND_EXTRAS, LOGO_STATUS,
  TEXT_STATUS, PHOTO_STATUS, MARKETING_OPTIONS, BUDGET_OPTIONS, TIMELINE_OPTIONS,
} from '@/data/configurator';

export type { Option };
// Listele de optiuni sunt date statice in src/data/configurator.ts (fostele randuri din baza de date).
export {
  BUSINESS_TYPES, PAGE_OPTIONS, FEATURE_OPTIONS, DESIGN_STYLES, BRAND_EXTRAS, LOGO_STATUS,
  TEXT_STATUS, PHOTO_STATUS, MARKETING_OPTIONS, BUDGET_OPTIONS, TIMELINE_OPTIONS,
};

export const WHATSAPP_NUMBER = '40779383164';

type Lang = 'ro' | 'en';
// Step 1 — Site type. Derived from the pricing tiers (single source of truth: src/lib/tiers.ts).
const SITE_TYPE_TEXT: Record<Tier['key'], Pick<Option, 'ro' | 'en' | 'desc_ro' | 'desc_en'>> = {
  presentation: {
    ro: 'Prezentare', en: 'Presentation',
    desc_ro: 'Site de o pagină: contact, hartă, buton WhatsApp.',
    desc_en: 'One-page site: contact, map, WhatsApp button.',
  },
  business: {
    ro: 'Business', en: 'Business',
    desc_ro: 'Site complet de 4–6 pagini, SEO local, Google Business.',
    desc_en: 'Full 4–6 page site, local SEO, Google Business.',
  },
  experience: {
    ro: 'Experiență', en: 'Experience',
    desc_ro: 'Design 100% custom, animații, secțiuni interactive.',
    desc_en: '100% custom design, animation, interactive sections.',
  },
  custom: {
    ro: 'Custom', en: 'Custom',
    desc_ro: 'Rezervări online, calendar real, panou de administrare.',
    desc_en: 'Online bookings, live calendar, admin panel.',
  },
};

function eurNumber(n: number, lang: Lang = 'ro'): string {
  return n >= 1000 ? n.toLocaleString(lang === 'en' ? 'en-US' : 'ro-RO') : String(n);
}

export const SITE_TYPES: Option[] = TIERS.map((t) => ({
  id: t.key,
  ...SITE_TYPE_TEXT[t.key],
  price: eurNumber(t.setupEur),
}));

export function tierForSiteType(siteType: string): Tier | undefined {
  return TIERS.find((t) => t.key === siteType);
}

/** "2.000€" / "de la 2.000€" for the selected site type, in the given language. */
export function siteTypePriceLabel(siteType: string, lang: Lang): string {
  const t = tierForSiteType(siteType);
  if (!t) return '';
  const from = t.startingFrom ? (lang === 'ro' ? 'de la ' : 'from ') : '';
  return `${from}${eurNumber(t.setupEur, lang)}€`;
}

// Step 6 — Maintenance
export interface MaintenancePlan {
  id: string;
  ro: string;
  en: string;
  price_ro: string;
  price_en: string;
  promoPrice_ro?: string;
  promoPrice_en?: string;
  desc_ro: string;
  desc_en: string;
  features_ro: string[];
  features_en: string[];
  popular?: boolean;
  annual?: boolean;
}

/** Maintenance is mandatory (12-month contract); only the billing period is a choice. Prices follow the selected tier. */
export const MAINTENANCE_PLANS: MaintenancePlan[] = [
  {
    id: 'monthly',
    ro: 'Mentenanță lunară',
    en: 'Monthly maintenance',
    price_ro: '',
    price_en: '',
    desc_ro: 'Plătești lună de lună. Contract minim 12 luni.',
    desc_en: 'Pay month by month. 12-month minimum contract.',
    features_ro: [],
    features_en: [],
  },
  {
    id: 'annual',
    ro: 'Mentenanță anuală',
    en: 'Annual maintenance',
    price_ro: '',
    price_en: '',
    desc_ro: `Plătești ${ANNUAL_PAID_MONTHS} luni, primești 12 (2 luni gratis).`,
    desc_en: `Pay for ${ANNUAL_PAID_MONTHS} months, get 12 (2 months free).`,
    features_ro: [],
    features_en: [],
    popular: true,
    annual: true,
  },
];

/** What every maintenance plan includes (hours depend on the tier). */
export function maintenanceIncludes(siteType: string, lang: Lang): string[] {
  const hours = tierForSiteType(siteType)?.hoursPerMonth ?? 1;
  return lang === 'ro'
    ? ['Hosting + SSL', 'Reînnoire domeniu', 'Backup + update-uri', `${hours} ${hours === 1 ? 'oră' : 'ore'} de modificări/lună`, 'Răspuns în 2 zile lucrătoare', `Peste: ${EXTRA_HOURLY_EUR}€/oră`]
    : ['Hosting + SSL', 'Domain renewal', 'Backups + updates', `${hours} ${hours === 1 ? 'hour' : 'hours'} of edits/month`, 'Reply within 2 business days', `Extra: ${EXTRA_HOURLY_EUR}€/hour`];
}

/** "25€/lună" or "250€/an" for the selected site type and billing plan. */
export function maintenancePriceLabel(planId: string, siteType: string, lang: Lang): string {
  const t = tierForSiteType(siteType);
  if (!t) return '';
  const from = t.startingFrom ? (lang === 'ro' ? 'de la ' : 'from ') : '';
  if (planId === 'annual') return `${from}${t.monthlyEur * ANNUAL_PAID_MONTHS}€${lang === 'ro' ? '/an' : '/year'}`;
  return `${from}${t.monthlyEur}€${lang === 'ro' ? '/lună' : '/month'}`;
}

// ---------------------------------------------------------------------------
// Step labels (for progress bar)
// ---------------------------------------------------------------------------
export const STEP_LABELS = {
  project:     { ro: 'Proiect',       en: 'Project' },
  pages:       { ro: 'Pagini',        en: 'Pages' },
  features:    { ro: 'Functionalitati', en: 'Features' },
  brand:       { ro: 'Design',        en: 'Design' },
  content:     { ro: 'Continut',      en: 'Content' },
  maintenance: { ro: 'Mentenanta',    en: 'Hosting' },
  summary:     { ro: 'Trimite',       en: 'Submit' },
} as const;

export type StepId = keyof typeof STEP_LABELS;
export const STEP_ORDER: StepId[] = ['project', 'pages', 'features', 'brand', 'content', 'maintenance', 'summary'];

// ---------------------------------------------------------------------------
// Label helper
// ---------------------------------------------------------------------------
export function label(opt: Option | { ro: string; en: string }, lang: Lang): string {
  return lang === 'ro' ? opt.ro : opt.en;
}

export function desc(opt: Option, lang: Lang): string {
  return (lang === 'ro' ? opt.desc_ro : opt.desc_en) ?? '';
}

// ---------------------------------------------------------------------------
// Everything the stepper needs, in one object
// ---------------------------------------------------------------------------
export const CONFIGURATOR_OPTIONS = {
  businessTypes: BUSINESS_TYPES,
  siteTypes: SITE_TYPES,
  pages: PAGE_OPTIONS,
  features: FEATURE_OPTIONS,
  designStyles: DESIGN_STYLES,
  brandExtras: BRAND_EXTRAS,
  logoStatus: LOGO_STATUS,
  textStatus: TEXT_STATUS,
  photoStatus: PHOTO_STATUS,
  marketing: MARKETING_OPTIONS,
  maintenance: MAINTENANCE_PLANS,
  budget: BUDGET_OPTIONS,
  timeline: TIMELINE_OPTIONS,
};
