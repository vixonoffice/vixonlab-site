// ---------------------------------------------------------------------------
// Vixon Lab — Pricing tiers (SaaS model)
// Site gratuit + abonament lunar mentenanță
// ---------------------------------------------------------------------------

export type BillingPeriod = 'monthly' | 'annual';

export const ANNUAL_DISCOUNT_PCT = 20;
export const ANNUAL_MULTIPLIER = 12 * (1 - ANNUAL_DISCOUNT_PCT / 100);

export const WHATSAPP_NUMBER = '40779383164';

export interface Tier {
  key: 'promo' | 'start' | 'plus' | 'premium';
  monthlyEur: number;
  modificariPerMonth: number;
  responseTime: { ro: string; en: string };
  popular?: boolean;
  recommendedFor: { ro: string; en: string };
}

export const TIERS: Tier[] = [
  {
    key: 'promo',
    monthlyEur: 9,
    modificariPerMonth: 1,
    responseTime: { ro: '72h', en: '72h' },
    recommendedFor: {
      ro: 'Landing-uri, evenimente, campanii sezoniere',
      en: 'Landing pages, events, seasonal campaigns',
    },
  },
  {
    key: 'start',
    monthlyEur: 19,
    modificariPerMonth: 3,
    responseTime: { ro: '48h', en: '48h' },
    recommendedFor: {
      ro: 'Antreprenori, restaurante, saloane, ateliere',
      en: 'Entrepreneurs, restaurants, salons, workshops',
    },
  },
  {
    key: 'plus',
    monthlyEur: 49,
    modificariPerMonth: 6,
    responseTime: { ro: '24-48h', en: '24-48h' },
    popular: true,
    recommendedFor: {
      ro: 'Firme de servicii, cabinete, afaceri în creștere',
      en: 'Service firms, clinics, growing businesses',
    },
  },
  {
    key: 'premium',
    monthlyEur: 99,
    modificariPerMonth: 12,
    responseTime: { ro: '24h', en: '24h' },
    recommendedFor: {
      ro: 'Branduri ambițioase, agenții, firme care vor cel mai bun',
      en: 'Ambitious brands, agencies, top-tier firms',
    },
  },
];

export function getAnnualPrice(monthlyEur: number): number {
  return Math.round(monthlyEur * ANNUAL_MULTIPLIER);
}

export function getMonthlyEquivalent(monthlyEur: number): string {
  const annual = getAnnualPrice(monthlyEur);
  return (annual / 12).toFixed(1).replace('.0', '');
}

export function getAnnualSavings(monthlyEur: number): number {
  return monthlyEur * 12 - getAnnualPrice(monthlyEur);
}

export function buildTierWaUrl(tierKey: Tier['key'], billing: BillingPeriod, lang: 'ro' | 'en'): string {
  const tier = TIERS.find((t) => t.key === tierKey);
  if (!tier) return `https://wa.me/${WHATSAPP_NUMBER}`;

  const tierName = tierKey.charAt(0).toUpperCase() + tierKey.slice(1);

  const msgRo = billing === 'annual'
    ? `Bună! Vreau planul ${tierName} (${getAnnualPrice(tier.monthlyEur)}€/an cu -${ANNUAL_DISCOUNT_PCT}% primul an). Site gratuit la setup.`
    : `Bună! Vreau planul ${tierName} (${tier.monthlyEur}€/lună). Site gratuit la setup.`;

  const msgEn = billing === 'annual'
    ? `Hi! I want the ${tierName} plan (${getAnnualPrice(tier.monthlyEur)}€/year with -${ANNUAL_DISCOUNT_PCT}% first year). Free site at setup.`
    : `Hi! I want the ${tierName} plan (${tier.monthlyEur}€/month). Free site at setup.`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lang === 'en' ? msgEn : msgRo)}`;
}
