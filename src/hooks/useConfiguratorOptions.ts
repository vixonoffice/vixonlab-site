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

/** Correct prices for site types — kept in sync with pricing page */
const SITE_TYPE_PRICES: Record<string, string> = {
  landing: '300',
  presentation: '700 - 1.600',
  ecommerce: '1.200 - 2.500',
  webapp: 'de la 2.000',
};

/** Apply -30% to numeric values in a price label */
function calcPromoPrice(label: string): string {
  return label.replace(/[\d.]+/g, (m) => {
    const n = parseInt(m.replace(/\./g, ''), 10);
    const d = Math.round(n * 0.7);
    return d >= 1000 ? d.toLocaleString('ro-RO') : String(d);
  });
}

function rowToOption(row: ConfiguratorOptionRow): Option {
  const price = (row.option_type === 'site_type' && SITE_TYPE_PRICES[row.option_id])
    ? SITE_TYPE_PRICES[row.option_id]
    : (row.price ?? undefined);
  return {
    id: row.option_id,
    ro: row.label_ro,
    en: row.label_en,
    desc_ro: row.description_ro ?? undefined,
    desc_en: row.description_en ?? undefined,
    price,
    promoPrice: price ? calcPromoPrice(price) : undefined,
  };
}

function rowToMaintenance(row: ConfiguratorOptionRow): MaintenancePlan {
  const priceRo = row.price ?? '0';
  const priceEn = priceRo.replace('luna', 'month').replace('an', 'year');
  return {
    id: row.option_id,
    ro: row.label_ro,
    en: row.label_en,
    price_ro: priceRo,
    price_en: priceEn,
    promoPrice_ro: priceRo !== '0' ? calcPromoPrice(priceRo) : undefined,
    promoPrice_en: priceEn !== '0' ? calcPromoPrice(priceEn) : undefined,
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
