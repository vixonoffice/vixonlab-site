// ---------------------------------------------------------------------------
// Promo config — reducere 15 zile
// Start: 2026-04-11 · End: 2026-04-26 23:59:59 (Europe/Bucharest)
// ---------------------------------------------------------------------------

export const PROMO_END = new Date('2026-04-26T23:59:59+03:00').getTime();
export const PROMO_LABEL_RO = 'Reducere limitată · 15 zile';
export const PROMO_LABEL_EN = 'Limited offer · 15 days';
export const PROMO_DISCOUNT_RO = '-30% la toate pachetele';
export const PROMO_DISCOUNT_EN = '-30% on all packages';

export function isPromoActive(): boolean {
  return Date.now() < PROMO_END;
}

export interface PromoPrice {
  oldRo: string;
  newRo: string;
  oldEn: string;
  newEn: string;
}

export const PROMO_PRICES: Record<string, PromoPrice> = {
  landing: {
    oldRo: '300€', newRo: '200€',
    oldEn: '300€', newEn: '200€',
  },
  essential: {
    oldRo: '700€ — 900€', newRo: '500€ — 650€',
    oldEn: '700€ — 900€', newEn: '500€ — 650€',
  },
  business: {
    oldRo: '1.200€ — 1.600€', newRo: '850€ — 1.150€',
    oldEn: '1,200€ — 1,600€', newEn: '850€ — 1,150€',
  },
  ecosystem: {
    oldRo: 'De la 2.000€', newRo: 'De la 1.450€',
    oldEn: 'From 2,000€', newEn: 'From 1,450€',
  },
  maintenance: {
    oldRo: '20€ / lună sau 200€ / an', newRo: '15€ / lună sau 150€ / an',
    oldEn: '20€ / month or 200€ / year', newEn: '15€ / month or 150€ / year',
  },
};

export function getPromoPrice(key: string, isRo: boolean): PromoPrice | null {
  const p = PROMO_PRICES[key];
  if (!p) return null;
  return p;
}
