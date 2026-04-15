import type { PricingPlanRow } from '@/hooks/useSupabaseData';

// ---------------------------------------------------------------------------
// Helpers to parse structured data from pricing_plans table.
// Packages store JSON metadata in cta_label_ro:
//   { "max_pages": 5, "extra_pages": true, "included_addons": ["blog","seo"] }
// Add-ons store their slug/key in cta_label_ro (e.g. "blog").
// Numeric prices are parsed from price_label_ro (first number found).
// ---------------------------------------------------------------------------

export interface PackageMeta {
  max_pages: number;
  extra_pages: boolean;
  included_addons: string[];
}

export const EXTRA_PAGE_PRICE = 100; // €

/** Parse first integer from a price label like "300€" or "50€/lună" */
export function parsePrice(label: string): number {
  const match = label.replace(/\./g, '').match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

/** Parse package metadata JSON from cta_label_ro */
export function parsePackageMeta(plan: PricingPlanRow): PackageMeta {
  try {
    const meta = JSON.parse(plan.cta_label_ro);
    return {
      max_pages: meta.max_pages ?? 1,
      extra_pages: meta.extra_pages ?? false,
      included_addons: meta.included_addons ?? [],
    };
  } catch {
    return { max_pages: 1, extra_pages: false, included_addons: [] };
  }
}

/** Get addon slug from cta_label_ro */
export function getAddonSlug(plan: PricingPlanRow): string {
  return plan.cta_label_ro.trim();
}

// ---------------------------------------------------------------------------
// Default data for seeding (used if DB is empty). These match the plan spec.
// ---------------------------------------------------------------------------

export const DEFAULT_PACKAGES = [
  {
    name_ro: 'Landing Page', name_en: 'Landing Page',
    price_label_ro: '300€', price_label_en: '300€',
    description_ro: 'Pagină de prezentare simplă și elegantă. Ideală pentru freelanceri, evenimente sau lansări de produs.',
    description_en: 'Simple and elegant presentation page. Ideal for freelancers, events or product launches.',
    features_ro: ['1 pagină completă', 'Design responsive', 'Cod custom (viteză maximă)', 'Optimizare SEO de bază', 'Formular de contact', 'Livrare în 3-5 zile'],
    features_en: ['1 complete page', 'Responsive design', 'Custom code (max speed)', 'Basic SEO optimization', 'Contact form', 'Delivery in 3-5 days'],
    is_popular: false,
    cta_label_ro: '{"max_pages":1,"extra_pages":false,"included_addons":[]}',
    cta_label_en: 'Get started',
    sort_order: 0,
    plan_type: 'package' as const,
  },
  {
    name_ro: 'Essential', name_en: 'Essential',
    price_label_ro: '700€ — 900€', price_label_en: '700€ — 900€',
    description_ro: 'Website complet cu mai multe pagini. Soluția perfectă pentru afaceri care vor prezență online profesională.',
    description_en: 'Complete multi-page website. The perfect solution for businesses wanting a professional online presence.',
    features_ro: ['Până la 5 pagini', 'Design modern & responsive', 'Cod custom (viteză maximă)', 'Optimizare SEO avansată', 'Google My Business Setup', 'Formular de contact avansat', 'Galerie foto', 'Livrare în 5-7 zile'],
    features_en: ['Up to 5 pages', 'Modern & responsive design', 'Custom code (max speed)', 'Advanced SEO optimization', 'Google My Business Setup', 'Advanced contact form', 'Photo gallery', 'Delivery in 5-7 days'],
    is_popular: true,
    cta_label_ro: '{"max_pages":5,"extra_pages":true,"included_addons":[]}',
    cta_label_en: 'Most popular',
    sort_order: 1,
    plan_type: 'package' as const,
  },
  {
    name_ro: 'Business', name_en: 'Business',
    price_label_ro: '1.200€ — 1.600€', price_label_en: '1,200€ — 1,600€',
    description_ro: 'Soluția completă cu funcționalități avansate. Blog, multilingv, animații și SEO avansat incluse.',
    description_en: 'Complete solution with advanced features. Blog, multilingual, animations and advanced SEO included.',
    features_ro: ['10+ pagini', 'Tot din Essential', 'Blog integrat', 'Suport multilingv', 'Animații premium', 'SEO avansat complet', 'Admin panel custom', 'Suport prioritar 3 luni'],
    features_en: ['10+ pages', 'Everything in Essential', 'Integrated blog', 'Multilingual support', 'Premium animations', 'Full advanced SEO', 'Custom admin panel', 'Priority support 3 months'],
    is_popular: false,
    cta_label_ro: '{"max_pages":10,"extra_pages":true,"included_addons":["blog","multilingual","animations","seo"]}',
    cta_label_en: 'Business',
    sort_order: 2,
    plan_type: 'package' as const,
  },
];

export const DEFAULT_ADDONS = [
  { slug: 'blog', name_ro: 'Blog', name_en: 'Blog', price: '150€', desc_ro: 'Sistem de articole cu categorii și căutare', desc_en: 'Article system with categories and search' },
  { slug: 'multilingual', name_ro: 'Multilingv', name_en: 'Multilingual', price: '200€', desc_ro: 'Suport pentru mai multe limbi (RO/EN/etc)', desc_en: 'Support for multiple languages (RO/EN/etc)' },
  { slug: 'ecommerce', name_ro: 'E-commerce', name_en: 'E-commerce', price: '400€', desc_ro: 'Magazin online cu coș și plăți integrate', desc_en: 'Online store with cart and integrated payments' },
  { slug: 'seo', name_ro: 'SEO Avansat', name_en: 'Advanced SEO', price: '150€', desc_ro: 'Optimizare completă Google, sitemap, schema markup', desc_en: 'Complete Google optimization, sitemap, schema markup' },
  { slug: 'animations', name_ro: 'Animații Premium', name_en: 'Premium Animations', price: '200€', desc_ro: 'Animații fluide și tranziții profesionale', desc_en: 'Smooth animations and professional transitions' },
  { slug: 'social', name_ro: 'Social Media Kit', name_en: 'Social Media Kit', price: '50€', desc_ro: 'Integrare feed-uri și butoane social media', desc_en: 'Social media feed integration and buttons' },
  { slug: 'analytics', name_ro: 'Analytics Setup', name_en: 'Analytics Setup', price: '50€', desc_ro: 'Google Analytics 4 + Search Console + dashboard', desc_en: 'Google Analytics 4 + Search Console + dashboard' },
  { slug: 'gdpr', name_ro: 'GDPR & Cookies', name_en: 'GDPR & Cookies', price: '30€', desc_ro: 'Banner cookies conform GDPR + politici generate', desc_en: 'GDPR compliant cookie banner + generated policies' },
  { slug: 'chat', name_ro: 'Live Chat', name_en: 'Live Chat', price: '80€', desc_ro: 'Widget de chat în timp real cu clienții', desc_en: 'Real-time customer chat widget' },
  { slug: 'newsletter', name_ro: 'Newsletter', name_en: 'Newsletter', price: '60€', desc_ro: 'Formular de abonare + integrare email marketing', desc_en: 'Subscribe form + email marketing integration' },
];

export const DEFAULT_MAINTENANCE = [
  {
    name_ro: 'Fără mentenanță', name_en: 'No maintenance',
    price_label_ro: '0€', price_label_en: '0€',
    description_ro: 'Gestionezi singur hosting-ul și actualizările.', description_en: 'You manage hosting and updates yourself.',
    features_ro: [], features_en: [],
    is_popular: false, sort_order: 0,
  },
  {
    name_ro: 'Vixon Care', name_en: 'Vixon Care',
    price_label_ro: '20€/lună', price_label_en: '20€/month',
    description_ro: 'Ne ocupăm de hosting, securitate și modificări minore. Tu te concentrezi pe afacere.',
    description_en: 'We handle hosting, security and minor modifications. You focus on your business.',
    features_ro: [
      'Hosting Premium Cloud',
      'Certificat SSL gratuit',
      'Backup zilnic automat',
      'Update-uri de securitate',
      'Monitorizare uptime 24/7',
      'Modificări minore incluse (texte, poze)',
      'Suport pe email',
      'Timp de răspuns < 24h',
    ],
    features_en: [
      'Premium Cloud Hosting',
      'Free SSL Certificate',
      'Daily Automatic Backup',
      'Security Updates',
      '24/7 Uptime Monitoring',
      'Minor modifications included (text, images)',
      'Email support',
      'Response time < 24h',
    ],
    is_popular: false, sort_order: 1,
  },
  {
    name_ro: 'Vixon Care Anual', name_en: 'Vixon Care Annual',
    price_label_ro: '200€/an', price_label_en: '200€/year',
    description_ro: 'Tot din Vixon Care + domeniu inclus. Economisești 40€ față de plata lunară.',
    description_en: 'Everything in Vixon Care + domain included. Save 40€ compared to monthly.',
    features_ro: [
      'Tot din Vixon Care',
      'Domeniu .ro / .com inclus',
      'Economisești 40€/an',
      'Plată o dată pe an',
    ],
    features_en: [
      'Everything in Vixon Care',
      '.ro / .com domain included',
      'Save 40€/year',
      'Pay once per year',
    ],
    is_popular: true, sort_order: 2,
  },
  {
    name_ro: 'Vixon Care Pro', name_en: 'Vixon Care Pro',
    price_label_ro: '40€/lună', price_label_en: '40€/month',
    description_ro: 'Modificări nelimitate, suport prioritar și raport lunar de performanță.',
    description_en: 'Unlimited modifications, priority support and monthly performance report.',
    features_ro: [
      'Tot din Vixon Care',
      'Domeniu .ro / .com inclus',
      'Modificări nelimitate (texte, poze, secțiuni)',
      'Suport prioritar WhatsApp',
      'Raport lunar performanță',
      'Timp de răspuns < 12h',
    ],
    features_en: [
      'Everything in Vixon Care',
      '.ro / .com domain included',
      'Unlimited modifications (text, images, sections)',
      'Priority WhatsApp support',
      'Monthly performance report',
      'Response time < 12h',
    ],
    is_popular: false, sort_order: 3,
  },
  {
    name_ro: 'Vixon Care Premium', name_en: 'Vixon Care Premium',
    price_label_ro: '60€/lună', price_label_en: '60€/month',
    description_ro: 'Protecție completă: modificări design, SEO ongoing, suport telefonic dedicat.',
    description_en: 'Complete protection: design modifications, ongoing SEO, dedicated phone support.',
    features_ro: [
      'Tot din Vixon Care Pro',
      'Modificări design incluse',
      'Optimizare SEO continuă',
      'Optimizare performanță lunară',
      'Suport telefonic dedicat',
      'SLA răspuns < 4 ore',
    ],
    features_en: [
      'Everything in Vixon Care Pro',
      'Design modifications included',
      'Ongoing SEO optimization',
      'Monthly performance optimization',
      'Dedicated phone support',
      'Response SLA < 4 hours',
    ],
    is_popular: false, sort_order: 4,
  },
];
