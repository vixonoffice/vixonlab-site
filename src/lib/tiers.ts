// ---------------------------------------------------------------------------
// Vixon Lab — Pricing packages
// Site plătit o singură dată + mentenanță lunară obligatorie (contract 12 luni)
// Calibrat pe vânzări reale (Nuța Events: 700€ + 30€/lună, 2026-09)
// ---------------------------------------------------------------------------

export type BillingPeriod = 'monthly' | 'annual';

/** Plata anuală a mentenanței: plătești 10 luni, primești 12. */
export const ANNUAL_PAID_MONTHS = 10;

/** Tarif pentru modificări peste ora inclusă în mentenanță. */
export const EXTRA_HOURLY_EUR = 25;

export const WHATSAPP_NUMBER = '40779383164';

export interface Tier {
  key: 'presentation' | 'business' | 'experience' | 'custom';
  /** Preț site, plătit o singură dată. */
  setupEur: number;
  /** Mentenanță lunară. */
  monthlyEur: number;
  /** true = prețurile sunt „de la”, se stabilesc după discuție. */
  startingFrom?: boolean;
  /** Ore de modificări incluse lunar în mentenanță. */
  hoursPerMonth: number;
  popular?: boolean;
  recommendedFor: { ro: string; en: string };
}

export const TIERS: Tier[] = [
  {
    key: 'presentation',
    setupEur: 350,
    monthlyEur: 15,
    hoursPerMonth: 1,
    recommendedFor: {
      ro: 'Meseriași, evenimente, afaceri la început',
      en: 'Tradespeople, events, businesses just starting out',
    },
  },
  {
    key: 'business',
    setupEur: 650,
    monthlyEur: 25,
    hoursPerMonth: 1,
    popular: true,
    recommendedFor: {
      ro: 'Restaurante, saloane, cabinete, firme de servicii',
      en: 'Restaurants, salons, clinics, service firms',
    },
  },
  {
    key: 'experience',
    setupEur: 1200,
    monthlyEur: 35,
    hoursPerMonth: 1,
    recommendedFor: {
      ro: 'Săli de evenimente, hoteluri, branduri care vor să iasă în evidență',
      en: 'Event venues, hotels, brands that want to stand out',
    },
  },
  {
    key: 'custom',
    setupEur: 2000,
    monthlyEur: 60,
    startingFrom: true,
    hoursPerMonth: 2,
    recommendedFor: {
      ro: 'Rezervări, calendar real, panou de administrare',
      en: 'Bookings, live calendar, admin panel',
    },
  },
];

export function getAnnualPrice(monthlyEur: number): number {
  return monthlyEur * ANNUAL_PAID_MONTHS;
}

export function getAnnualSavings(monthlyEur: number): number {
  return monthlyEur * (12 - ANNUAL_PAID_MONTHS);
}

/** RO: "1.200€". EN: "€1,200" (in engleza "1.200" s-ar citi 1,2). */
export function formatEur(n: number, lang: 'ro' | 'en' = 'ro'): string {
  if (lang === 'en') return '€' + (n >= 1000 ? n.toLocaleString('en-US') : n);
  return n >= 1000 ? n.toLocaleString('ro-RO') + '€' : n + '€';
}

const TIER_NAMES: Record<Tier['key'], { ro: string; en: string }> = {
  presentation: { ro: 'Prezentare', en: 'Presentation' },
  business: { ro: 'Business', en: 'Business' },
  experience: { ro: 'Experiență', en: 'Experience' },
  custom: { ro: 'Custom', en: 'Custom' },
};

export function buildTierWaUrl(tierKey: Tier['key'], billing: BillingPeriod, lang: 'ro' | 'en'): string {
  const tier = TIERS.find((t) => t.key === tierKey);
  if (!tier) return `https://wa.me/${WHATSAPP_NUMBER}`;

  const name = TIER_NAMES[tierKey][lang];
  const from = tier.startingFrom ? (lang === 'ro' ? 'de la ' : 'from ') : '';
  const maint = billing === 'annual'
    ? (lang === 'ro' ? `${from}${getAnnualPrice(tier.monthlyEur)}€/an` : `${from}${getAnnualPrice(tier.monthlyEur)}€/year`)
    : (lang === 'ro' ? `${from}${tier.monthlyEur}€/lună` : `${from}${tier.monthlyEur}€/month`);

  const msg = lang === 'ro'
    ? `Bună! Mă interesează pachetul ${name} (site ${from}${formatEur(tier.setupEur)} + mentenanță ${maint}). Putem discuta?`
    : `Hi! I'm interested in the ${name} package (site ${from}${formatEur(tier.setupEur, 'en')} + maintenance ${maint}). Can we talk?`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

/** Eticheta unui pachet in formularul de contact, construita din aceleasi preturi ca restul site-ului. */
export function tierOptionLabel(tier: Tier, lang: 'ro' | 'en'): string {
  const name = TIER_NAMES[tier.key][lang];
  const from = tier.startingFrom ? (lang === 'ro' ? 'de la ' : 'from ') : '';
  const maint = lang === 'ro' ? `${from}${tier.monthlyEur}€/lună` : `${from}${tier.monthlyEur}€/month`;
  const plus = lang === 'ro' ? 'mentenanță' : 'maintenance';
  return `${name} — ${from}${formatEur(tier.setupEur, lang)} + ${plus} ${maint}`;
}

// Preturi pentru piata din afara (pagina /en): pret fix per proiect, nu tarif orar.
// Site de prezentare = TIERS[0].setupEur (350€). Celelalte doua sunt aici, intr-un singur loc.
/** Landing page facut dupa un design gata (Figma): proba platita pentru agentii. */
export const LANDING_FROM_EUR = 300;
/** Chatbot AI pe site. */
export const CHATBOT_FROM_EUR = 500;
