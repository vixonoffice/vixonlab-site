import { useReducer, useMemo } from 'react';
import {
  WHATSAPP_NUMBER, label,
} from './configuratorConfig';
import type { Option, MaintenancePlan } from './configuratorConfig';
import type { Language } from '@/lib/translations';

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

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

export interface ConfigState {
  // Step 1 — Project
  businessName: string;
  businessType: string;
  hasWebsite: string; // 'yes' | 'no'
  currentWebsiteUrl: string;
  siteType: string;

  // Step 2 — Pages
  pages: string[];
  customPages: string[];

  // Step 3 — Features
  features: string[];

  // Step 4 — Brand & Design
  logoStatus: string; // 'have' | 'want_new' | 'skip'
  hasBrandColors: string; // 'yes' | 'no'
  brandColorsText: string;
  designStyle: string;
  referenceUrl: string;
  brandExtras: string[];

  // Step 5 — Content & Marketing
  textStatus: string;
  photoStatus: string;
  marketing: string[];

  // Step 6 — Maintenance
  maintenancePlan: string;

  // Step 7 — Summary & Contact
  budget: string;
  timeline: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  notes: string;
}

const INITIAL_STATE: ConfigState = {
  businessName: '',
  businessType: '',
  hasWebsite: '',
  currentWebsiteUrl: '',
  siteType: '',
  pages: ['home', 'contact'],
  customPages: [],
  features: ['contact_form'],
  logoStatus: '',
  hasBrandColors: '',
  brandColorsText: '',
  designStyle: '',
  referenceUrl: '',
  brandExtras: [],
  textStatus: '',
  photoStatus: '',
  marketing: [],
  maintenancePlan: '',
  budget: '',
  timeline: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  notes: '',
};

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

type Action =
  | { type: 'SET_FIELD'; field: keyof ConfigState; value: string }
  | { type: 'TOGGLE_ARRAY'; field: keyof ConfigState; value: string }
  | { type: 'ADD_CUSTOM_PAGE'; value: string }
  | { type: 'REMOVE_CUSTOM_PAGE'; index: number }
  | { type: 'RESET' };

function reducer(state: ConfigState, action: Action): ConfigState {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'TOGGLE_ARRAY': {
      const arr = state[action.field] as string[];
      const has = arr.includes(action.value);
      return {
        ...state,
        [action.field]: has ? arr.filter((v) => v !== action.value) : [...arr, action.value],
      };
    }
    case 'ADD_CUSTOM_PAGE': {
      if (!action.value.trim() || state.customPages.includes(action.value.trim())) return state;
      return { ...state, customPages: [...state.customPages, action.value.trim()] };
    }
    case 'REMOVE_CUSTOM_PAGE':
      return { ...state, customPages: state.customPages.filter((_, i) => i !== action.index) };
    case 'RESET':
      return INITIAL_STATE;
    default:
      return state;
  }
}

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

function findLabel(options: { id: string; ro: string; en: string }[], id: string, lang: Language): string {
  const opt = options.find((o) => o.id === id);
  return opt ? label(opt, lang) : id;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useConfiguratorState() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const setField = (field: keyof ConfigState, value: string) =>
    dispatch({ type: 'SET_FIELD', field, value });

  const toggleArray = (field: keyof ConfigState, value: string) =>
    dispatch({ type: 'TOGGLE_ARRAY', field, value });

  const addCustomPage = (value: string) =>
    dispatch({ type: 'ADD_CUSTOM_PAGE', value });

  const removeCustomPage = (index: number) =>
    dispatch({ type: 'REMOVE_CUSTOM_PAGE', index });

  const reset = () => dispatch({ type: 'RESET' });

  // Build WhatsApp message — accepts dynamic options from Supabase
  const buildWhatsAppUrl = (lang: Language, opts?: AllOptions): string => {
    const lines: string[] = [];
    const s = state;
    const isRo = lang === 'ro';

    // Use provided options or empty arrays as fallback
    const o = opts || { businessTypes: [], siteTypes: [], pages: [], features: [], designStyles: [], brandExtras: [], logoStatus: [], textStatus: [], photoStatus: [], marketing: [], maintenance: [], budget: [], timeline: [] };

    lines.push(isRo
      ? `Salut VixonLab! Am configurat un proiect pe site-ul vostru.`
      : `Hi VixonLab! I configured a project on your website.`
    );
    lines.push('');

    if (s.businessName) lines.push(`${isRo ? 'Afacere' : 'Business'}: ${s.businessName}`);
    if (s.businessType) lines.push(`${isRo ? 'Domeniu' : 'Industry'}: ${findLabel(o.businessTypes, s.businessType, lang)}`);
    if (s.hasWebsite === 'yes' && s.currentWebsiteUrl) lines.push(`${isRo ? 'Site actual' : 'Current site'}: ${s.currentWebsiteUrl}`);
    if (s.siteType) lines.push(`${isRo ? 'Tip site' : 'Site type'}: ${findLabel(o.siteTypes, s.siteType, lang)}`);

    const allPages = [...s.pages.map((id) => findLabel(o.pages, id, lang)), ...s.customPages];
    if (allPages.length) lines.push(`\n${isRo ? 'Pagini' : 'Pages'}: ${allPages.join(', ')}`);

    const featureNames = s.features.map((id) => findLabel(o.features, id, lang));
    if (featureNames.length) lines.push(`${isRo ? 'Functionalitati' : 'Features'}: ${featureNames.join(', ')}`);

    if (s.logoStatus) lines.push(`\nLogo: ${findLabel(o.logoStatus, s.logoStatus, lang)}`);
    if (s.designStyle) lines.push(`${isRo ? 'Stil design' : 'Design style'}: ${findLabel(o.designStyles, s.designStyle, lang)}`);
    if (s.hasBrandColors === 'yes' && s.brandColorsText) lines.push(`${isRo ? 'Culori brand' : 'Brand colors'}: ${s.brandColorsText}`);
    if (s.referenceUrl) lines.push(`${isRo ? 'Referinta' : 'Reference'}: ${s.referenceUrl}`);

    const brandExtraNames = s.brandExtras.map((id) => findLabel(o.brandExtras, id, lang));
    if (brandExtraNames.length) lines.push(`${isRo ? 'Materiale brand' : 'Brand materials'}: ${brandExtraNames.join(', ')}`);

    if (s.textStatus) lines.push(`\n${isRo ? 'Texte' : 'Texts'}: ${findLabel(o.textStatus, s.textStatus, lang)}`);
    if (s.photoStatus) lines.push(`${isRo ? 'Poze' : 'Photos'}: ${findLabel(o.photoStatus, s.photoStatus, lang)}`);

    const marketingNames = s.marketing.map((id) => findLabel(o.marketing, id, lang));
    if (marketingNames.length) lines.push(`Marketing: ${marketingNames.join(', ')}`);

    if (s.maintenancePlan) {
      const plan = o.maintenance.find((p) => p.id === s.maintenancePlan);
      if (plan) {
        const pName = lang === 'ro' ? plan.ro : plan.en;
        const pPrice = lang === 'ro' ? plan.price_ro : plan.price_en;
        lines.push(`\n${isRo ? 'Mentenanta' : 'Maintenance'}: ${pName} (${pPrice}${pPrice !== '0' ? '\u20AC' : ''})`);
      }
    }

    if (s.budget) lines.push(`\n${isRo ? 'Buget' : 'Budget'}: ${findLabel(o.budget, s.budget, lang)}\u20AC`);
    if (s.timeline) lines.push(`${isRo ? 'Termen' : 'Timeline'}: ${findLabel(o.timeline, s.timeline, lang)}`);
    if (s.notes) lines.push(`\n${isRo ? 'Note' : 'Notes'}: ${s.notes}`);

    lines.push('');
    if (s.contactName) lines.push(`${isRo ? 'Nume' : 'Name'}: ${s.contactName}`);
    if (s.contactEmail) lines.push(`Email: ${s.contactEmail}`);
    if (s.contactPhone) lines.push(`${isRo ? 'Telefon' : 'Phone'}: ${s.contactPhone}`);

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  // Validation per step
  const canProceed = useMemo(() => ({
    project: !!state.siteType,
    pages: state.pages.length > 0 || state.customPages.length > 0,
    features: true, // optional
    brand: true, // optional
    content: true, // optional
    maintenance: !!state.maintenancePlan,
    summary: !!state.contactName.trim() && !!state.contactPhone.trim(),
  }), [state]);

  return {
    state,
    setField,
    toggleArray,
    addCustomPage,
    removeCustomPage,
    reset,
    buildWhatsAppUrl,
    canProceed,
  };
}
