import { useReducer, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePricingPlans } from '@/hooks/useSupabaseData';
import { parsePrice, parsePackageMeta, getAddonSlug, EXTRA_PAGE_PRICE } from '@/lib/configuratorData';
import { isPromoActive } from '@/lib/promo';
import type { PricingPlanRow } from '@/hooks/useSupabaseData';

const WHATSAPP_NUMBER = '40779383164';

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

interface State {
  packageId: string | null;
  extraPages: number;
  selectedAddons: string[]; // addon slugs
  maintenanceId: string | null;
}

type Action =
  | { type: 'SET_PACKAGE'; id: string }
  | { type: 'SET_EXTRA_PAGES'; count: number }
  | { type: 'TOGGLE_ADDON'; slug: string }
  | { type: 'SET_MAINTENANCE'; id: string }
  | { type: 'RESET' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_PACKAGE': {
      // Reset addons & extra pages when changing package
      return { ...state, packageId: action.id, extraPages: 0, selectedAddons: [] };
    }
    case 'SET_EXTRA_PAGES':
      return { ...state, extraPages: Math.max(0, action.count) };
    case 'TOGGLE_ADDON': {
      const has = state.selectedAddons.includes(action.slug);
      return {
        ...state,
        selectedAddons: has
          ? state.selectedAddons.filter((s) => s !== action.slug)
          : [...state.selectedAddons, action.slug],
      };
    }
    case 'SET_MAINTENANCE':
      return { ...state, maintenanceId: action.id };
    case 'RESET':
      return { packageId: null, extraPages: 0, selectedAddons: [], maintenanceId: null };
    default:
      return state;
  }
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export interface AddonInfo {
  plan: PricingPlanRow;
  slug: string;
  price: number;
  included: boolean;
}

export interface SummaryLine {
  label: string;
  price: string;
  type: 'package' | 'pages' | 'addon' | 'maintenance';
}

export function useConfigurator() {
  const { language } = useLanguage();
  const { data: allPlans, loading } = usePricingPlans();

  const [state, dispatch] = useReducer(reducer, {
    packageId: null,
    extraPages: 0,
    selectedAddons: [],
    maintenanceId: null,
  });

  // Categorize plans
  const packages = useMemo(() => allPlans.filter((p) => p.plan_type === 'package'), [allPlans]);
  const addonPlans = useMemo(() => allPlans.filter((p) => p.plan_type === 'addon'), [allPlans]);
  const maintenancePlans = useMemo(() => allPlans.filter((p) => p.plan_type === 'maintenance'), [allPlans]);

  const selectedPkg = packages.find((p) => p.id === state.packageId) ?? null;
  const selectedMaintenance = maintenancePlans.find((p) => p.id === state.maintenanceId) ?? null;

  const packageMeta = selectedPkg ? parsePackageMeta(selectedPkg) : null;

  // Build addon info with included flags
  const addons: AddonInfo[] = useMemo(() => {
    const includedSlugs = packageMeta?.included_addons ?? [];
    return addonPlans.map((plan) => {
      const slug = getAddonSlug(plan);
      return {
        plan,
        slug,
        price: parsePrice(plan.price_label_ro),
        included: includedSlugs.includes(slug),
      };
    });
  }, [addonPlans, packageMeta]);

  // Computed totals (apply -30% promo when active)
  const promo = isPromoActive();
  const discount = (n: number) => promo ? Math.round(n * 0.7) : n;

  const totalPrice = useMemo(() => {
    if (!selectedPkg) return 0;
    let total = discount(parsePrice(selectedPkg.price_label_ro));
    total += discount(state.extraPages * EXTRA_PAGE_PRICE);
    for (const slug of state.selectedAddons) {
      const addon = addons.find((a) => a.slug === slug);
      if (addon && !addon.included) {
        total += discount(addon.price);
      }
    }
    return total;
  }, [selectedPkg, state.extraPages, state.selectedAddons, addons, promo]);

  const monthlyPrice = useMemo(() => {
    if (!selectedMaintenance) return 0;
    return discount(parsePrice(selectedMaintenance.price_label_ro));
  }, [selectedMaintenance, promo]);

  // Summary lines for sidebar
  const summaryLines: SummaryLine[] = useMemo(() => {
    if (!selectedPkg) return [];
    const name = language === 'en' ? selectedPkg.name_en : selectedPkg.name_ro;
    const lines: SummaryLine[] = [
      { label: name, price: `${discount(parsePrice(selectedPkg.price_label_ro))}€`, type: 'package' },
    ];

    if (state.extraPages > 0) {
      const lbl = language === 'ro' ? `${state.extraPages} pagini extra` : `${state.extraPages} extra pages`;
      lines.push({ label: lbl, price: `${discount(state.extraPages * EXTRA_PAGE_PRICE)}€`, type: 'pages' });
    }

    for (const slug of state.selectedAddons) {
      const addon = addons.find((a) => a.slug === slug);
      if (addon) {
        const addonName = language === 'en' ? addon.plan.name_en : addon.plan.name_ro;
        lines.push({
          label: addonName,
          price: addon.included ? (language === 'ro' ? 'Inclus' : 'Included') : `${discount(addon.price)}€`,
          type: 'addon',
        });
      }
    }

    if (selectedMaintenance && monthlyPrice > 0) {
      const mName = language === 'en' ? selectedMaintenance.name_en : selectedMaintenance.name_ro;
      lines.push({
        label: mName,
        price: `${monthlyPrice}€/${language === 'ro' ? 'lună' : 'mo'}`,
        type: 'maintenance',
      });
    }

    return lines;
  }, [selectedPkg, state, addons, selectedMaintenance, monthlyPrice, language]);

  // WhatsApp URL
  const whatsappUrl = useMemo(() => {
    if (!selectedPkg) return '';
    const pkgName = language === 'en' ? selectedPkg.name_en : selectedPkg.name_ro;

    const parts: string[] = [];
    const pkgPrice = discount(parsePrice(selectedPkg.price_label_ro));
    parts.push(language === 'ro'
      ? `Salut VixonLab! Sunt interesat de pachetul ${pkgName} (${pkgPrice}€).`
      : `Hi VixonLab! I'm interested in the ${pkgName} package (${pkgPrice}€).`
    );

    if (promo) {
      parts.push(language === 'ro' ? '🔥 Reducere -30% aplicată' : '🔥 -30% discount applied');
    }

    if (state.extraPages > 0) {
      const epPrice = discount(state.extraPages * EXTRA_PAGE_PRICE);
      parts.push(language === 'ro'
        ? `+ ${state.extraPages} pagini extra (${epPrice}€)`
        : `+ ${state.extraPages} extra pages (${epPrice}€)`
      );
    }

    const addonNames = state.selectedAddons.map((slug) => {
      const a = addons.find((x) => x.slug === slug);
      if (!a) return '';
      const n = language === 'en' ? a.plan.name_en : a.plan.name_ro;
      return a.included ? `${n} (${language === 'ro' ? 'inclus' : 'included'})` : `${n} (${discount(a.price)}€)`;
    }).filter(Boolean);

    if (addonNames.length) {
      parts.push(`Add-ons: ${addonNames.join(', ')}`);
    }

    if (selectedMaintenance && monthlyPrice > 0) {
      const mName = language === 'en' ? selectedMaintenance.name_en : selectedMaintenance.name_ro;
      parts.push(language === 'ro'
        ? `Mentenanță: ${mName} (${monthlyPrice}€/lună)`
        : `Maintenance: ${mName} (${monthlyPrice}€/month)`
      );
    }

    parts.push('');
    parts.push(language === 'ro'
      ? `Total unic: ${totalPrice}€${monthlyPrice > 0 ? ` + ${monthlyPrice}€/lună` : ''}`
      : `One-time total: ${totalPrice}€${monthlyPrice > 0 ? ` + ${monthlyPrice}€/month` : ''}`
    );

    parts.push('');
    parts.push(language === 'ro'
      ? 'Vreau să programăm o discuție pentru afacerea mea.'
      : "I'd like to schedule a discussion for my business."
    );

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(parts.join('\n'))}`;
  }, [selectedPkg, state, addons, selectedMaintenance, totalPrice, monthlyPrice, language]);

  return {
    // Data
    packages,
    addons,
    maintenancePlans,
    loading,
    // State
    state,
    dispatch,
    // Selected
    selectedPkg,
    selectedMaintenance,
    packageMeta,
    // Computed
    totalPrice,
    monthlyPrice,
    summaryLines,
    whatsappUrl,
  };
}
