import { describe, it, expect } from 'vitest';
import { render, screen, renderHook, act } from '@testing-library/react';
import { TIERS } from '@/lib/tiers';
import {
  SITE_TYPES, MAINTENANCE_PLANS, FEATURE_OPTIONS,
  siteTypePriceLabel, maintenancePriceLabel,
} from './configuratorConfig';
import * as defaults from './configuratorConfig';
import { MaintenanceNewStep } from './steps/MaintenanceNewStep';
import { useConfiguratorState } from './useConfiguratorState';

describe('configurator pricing follows src/lib/tiers.ts', () => {
  it('offers exactly the pricing tiers as site types', () => {
    expect(SITE_TYPES.map((s) => s.id)).toEqual(TIERS.map((t) => t.key));
  });

  it('labels site and maintenance prices per tier', () => {
    expect(siteTypePriceLabel('business', 'ro')).toBe('650€');
    expect(siteTypePriceLabel('custom', 'ro')).toBe('de la 2.000€');
    expect(siteTypePriceLabel('custom', 'en')).toBe('from 2,000€');
    expect(maintenancePriceLabel('monthly', 'business', 'ro')).toBe('25€/lună');
    expect(maintenancePriceLabel('annual', 'business', 'ro')).toBe('250€/an');
    expect(maintenancePriceLabel('annual', 'custom', 'en')).toBe('from 600€/year');
  });

  it('has no e-commerce option and no "no maintenance" plan', () => {
    expect(FEATURE_OPTIONS.some((f) => f.id === 'ecommerce')).toBe(false);
    expect(MAINTENANCE_PLANS.map((p) => p.id)).toEqual(['monthly', 'annual']);
  });

  it('maintenance step shows the price of the chosen package', () => {
    const { result } = renderHook(() => useConfiguratorState());
    act(() => result.current.setField('siteType', 'experience'));
    render(
      <MaintenanceNewStep state={result.current.state} setField={() => {}} lang="ro" plans={MAINTENANCE_PLANS} />,
    );
    expect(screen.getByText('35€/lună')).toBeInTheDocument();
    expect(screen.getByText('350€/an')).toBeInTheDocument();
    expect(screen.queryByText(/Gratuit/)).not.toBeInTheDocument();
  });

  it('WhatsApp message carries the new package and maintenance prices', () => {
    const { result } = renderHook(() => useConfiguratorState());
    act(() => {
      result.current.setField('siteType', 'business');
      result.current.setField('maintenancePlan', 'annual');
    });
    const opts = {
      businessTypes: defaults.BUSINESS_TYPES, siteTypes: SITE_TYPES, pages: defaults.PAGE_OPTIONS,
      features: FEATURE_OPTIONS, designStyles: defaults.DESIGN_STYLES, brandExtras: defaults.BRAND_EXTRAS,
      logoStatus: defaults.LOGO_STATUS, textStatus: defaults.TEXT_STATUS, photoStatus: defaults.PHOTO_STATUS,
      marketing: defaults.MARKETING_OPTIONS, maintenance: MAINTENANCE_PLANS, budget: defaults.BUDGET_OPTIONS,
      timeline: defaults.TIMELINE_OPTIONS,
    };
    const text = decodeURIComponent(result.current.buildWhatsAppUrl('ro', opts).split('?text=')[1]);
    expect(text).toContain('Pachet: Business (650€)');
    expect(text).toContain('Mentenanta: Mentenanță anuală (250€/an)');
  });
});
