import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Option, MaintenancePlan } from '@/components/configurator/configuratorConfig';
import * as defaults from '@/components/configurator/configuratorConfig';

// Raw row from Supabase
export interface ConfiguratorOptionRow {
  id: string;
  option_type: string;
  option_id: string;
  label_ro: string;
  label_en: string;
  description_ro: string | null;
  description_en: string | null;
  price: string | null;
  features_ro: string[];
  features_en: string[];
  is_popular: boolean;
  sort_order: number;
  metadata: Record<string, unknown> | null;
}

/**
 * Exact prices from pricing page — site type → { price, promoPrice }
 * Must match promo.ts PROMO_PRICES exactly.
 */
const SITE_TYPE_OVERRIDES: Record<string, { price: string; promoPrice: string }> = {
  landing:      { price: '300',               promoPrice: '200' },
  presentation: { price: '700 — 900',         promoPrice: '500 — 650' },
  ecommerce:    { price: '1.200 — 1.600',     promoPrice: '850 — 1.150' },
  webapp:       { price: 'de la 2.000',        promoPrice: 'de la 1.450' },
};

function rowToOption(row: ConfiguratorOptionRow): Option {
  const override = row.option_type === 'site_type' ? SITE_TYPE_OVERRIDES[row.option_id] : undefined;
  return {
    id: row.option_id,
    ro: row.label_ro,
    en: row.label_en,
    desc_ro: row.description_ro ?? undefined,
    desc_en: row.description_en ?? undefined,
    price: override?.price ?? (row.price ?? undefined),
    promoPrice: override?.promoPrice ?? undefined,
  };
}

/** Maintenance promo prices — must match configuratorConfig.ts */
const MAINTENANCE_PROMO: Record<string, { ro: string; en: string }> = {
  basic:   { ro: '15/luna',  en: '15/month' },
  annual:  { ro: '150/an',   en: '150/year' },
  pro:     { ro: '30/luna',  en: '30/month' },
  premium: { ro: '45/luna',  en: '45/month' },
};

function rowToMaintenance(row: ConfiguratorOptionRow): MaintenancePlan {
  const priceRo = row.price ?? '0';
  const priceEn = priceRo.replace('luna', 'month').replace('an', 'year');
  const mp = MAINTENANCE_PROMO[row.option_id];
  return {
    id: row.option_id,
    ro: row.label_ro,
    en: row.label_en,
    price_ro: priceRo,
    price_en: priceEn,
    promoPrice_ro: mp?.ro,
    promoPrice_en: mp?.en,
    desc_ro: row.description_ro ?? '',
    desc_en: row.description_en ?? '',
    features_ro: row.features_ro ?? [],
    features_en: row.features_en ?? [],
    popular: row.is_popular,
    annual: row.option_id === 'annual',
  };
}

export function useConfiguratorOptions() {
  const [rows, setRows] = useState<ConfiguratorOptionRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('configurator_options')
      .select('*')
      .is('deleted_at', null)
      .order('sort_order')
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          setRows(data as ConfiguratorOptionRow[]);
        }
        setLoading(false);
      });
  }, []);

  const options = useMemo(() => {
    if (rows.length === 0) {
      // Fallback to static defaults
      return {
        businessTypes: defaults.BUSINESS_TYPES,
        siteTypes: defaults.SITE_TYPES,
        pages: defaults.PAGE_OPTIONS,
        features: defaults.FEATURE_OPTIONS,
        designStyles: defaults.DESIGN_STYLES,
        brandExtras: defaults.BRAND_EXTRAS,
        logoStatus: defaults.LOGO_STATUS,
        textStatus: defaults.TEXT_STATUS,
        photoStatus: defaults.PHOTO_STATUS,
        marketing: defaults.MARKETING_OPTIONS,
        maintenance: defaults.MAINTENANCE_PLANS,
        budget: defaults.BUDGET_OPTIONS,
        timeline: defaults.TIMELINE_OPTIONS,
      };
    }

    const byType = (type: string) => rows.filter((r) => r.option_type === type);

    return {
      businessTypes: byType('business_type').map(rowToOption),
      siteTypes: byType('site_type').map(rowToOption),
      pages: byType('page').map(rowToOption),
      features: byType('feature').map(rowToOption),
      designStyles: byType('design_style').map(rowToOption),
      brandExtras: byType('brand_extra').map(rowToOption),
      logoStatus: byType('logo_status').map(rowToOption),
      textStatus: byType('text_status').map(rowToOption),
      photoStatus: byType('photo_status').map(rowToOption),
      marketing: byType('marketing').map(rowToOption),
      maintenance: byType('maintenance').map(rowToMaintenance),
      budget: byType('budget').map(rowToOption),
      timeline: byType('timeline').map(rowToOption),
    };
  }, [rows]);

  return { options, loading, rows };
}
