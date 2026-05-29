// ---------------------------------------------------------------------------
// LEGACY promo config — kept for back-compat with imports.
// New model: see src/lib/tiers.ts (annual -20% first year).
// ---------------------------------------------------------------------------

export const PROMO_END = 0;
export const PROMO_LABEL_RO = '';
export const PROMO_LABEL_EN = '';
export const PROMO_DISCOUNT_RO = '';
export const PROMO_DISCOUNT_EN = '';

export function isPromoActive(): boolean {
  return false;
}

export interface PromoPrice {
  oldRo: string;
  newRo: string;
  oldEn: string;
  newEn: string;
}

export const PROMO_PRICES: Record<string, PromoPrice> = {};

export function getPromoPrice(_key: string, _isRo: boolean): PromoPrice | null {
  return null;
}
