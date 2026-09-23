// ---------------------------------------------------------------------------
// Full website configurator — all options data (RO/EN)
// ---------------------------------------------------------------------------

export { isPromoActive } from '@/lib/promo';
import { TIERS, ANNUAL_PAID_MONTHS, EXTRA_HOURLY_EUR, type Tier } from '@/lib/tiers';

export const WHATSAPP_NUMBER = '40779383164';

type Lang = 'ro' | 'en';
export interface Option {
  id: string;
  ro: string;
  en: string;
  desc_ro?: string;
  desc_en?: string;
  icon?: string;
  price?: string;
  promoPrice?: string;
}

// Step 1 — Business type
export const BUSINESS_TYPES: Option[] = [
  { id: 'restaurant', ro: 'Restaurant / Cafenea / Bar', en: 'Restaurant / Cafe / Bar' },
  { id: 'salon', ro: 'Salon de frumusete / Spa', en: 'Beauty Salon / Spa' },
  { id: 'retail', ro: 'Magazin fizic / Retail', en: 'Physical Store / Retail' },
  { id: 'services', ro: 'Servicii profesionale', en: 'Professional Services' },
  { id: 'freelancer', ro: 'Freelancer / Consultant', en: 'Freelancer / Consultant' },
  { id: 'construction', ro: 'Constructii / Renovari', en: 'Construction / Renovations' },
  { id: 'medical', ro: 'Medical / Dental', en: 'Medical / Dental' },
  { id: 'auto', ro: 'Auto / Service', en: 'Auto / Service' },
  { id: 'fitness', ro: 'Fitness / Sport', en: 'Fitness / Sport' },
  { id: 'education', ro: 'Educatie / Cursuri', en: 'Education / Courses' },
  { id: 'tech', ro: 'IT / Tech', en: 'IT / Tech' },
  { id: 'other', ro: 'Altele', en: 'Other' },
];

// Step 1 — Site type. Derived from the pricing tiers (single source of truth: src/lib/tiers.ts).
const SITE_TYPE_TEXT: Record<Tier['key'], Pick<Option, 'ro' | 'en' | 'desc_ro' | 'desc_en'>> = {
  presentation: {
    ro: 'Prezentare', en: 'Presentation',
    desc_ro: 'Site de o pagină: contact, hartă, buton WhatsApp.',
    desc_en: 'One-page site: contact, map, WhatsApp button.',
  },
  business: {
    ro: 'Business', en: 'Business',
    desc_ro: 'Site complet de 4–6 pagini, SEO local, Google Business.',
    desc_en: 'Full 4–6 page site, local SEO, Google Business.',
  },
  experience: {
    ro: 'Experiență', en: 'Experience',
    desc_ro: 'Design 100% custom, animații, secțiuni interactive.',
    desc_en: '100% custom design, animation, interactive sections.',
  },
  custom: {
    ro: 'Custom', en: 'Custom',
    desc_ro: 'Rezervări online, calendar real, panou de administrare.',
    desc_en: 'Online bookings, live calendar, admin panel.',
  },
};

function eurNumber(n: number): string {
  return n >= 1000 ? n.toLocaleString('ro-RO') : String(n);
}

export const SITE_TYPES: Option[] = TIERS.map((t) => ({
  id: t.key,
  ...SITE_TYPE_TEXT[t.key],
  price: eurNumber(t.setupEur),
}));

export function tierForSiteType(siteType: string): Tier | undefined {
  return TIERS.find((t) => t.key === siteType);
}

/** "2.000€" / "de la 2.000€" for the selected site type, in the given language. */
export function siteTypePriceLabel(siteType: string, lang: Lang): string {
  const t = tierForSiteType(siteType);
  if (!t) return '';
  const from = t.startingFrom ? (lang === 'ro' ? 'de la ' : 'from ') : '';
  return `${from}${eurNumber(t.setupEur)}€`;
}

// Step 2 — Pages
export const PAGE_OPTIONS: Option[] = [
  { id: 'home', ro: 'Acasa', en: 'Home' },
  { id: 'about', ro: 'Despre noi', en: 'About Us' },
  { id: 'services', ro: 'Servicii', en: 'Services' },
  { id: 'portfolio', ro: 'Portofoliu / Galerie', en: 'Portfolio / Gallery' },
  { id: 'blog', ro: 'Blog / Articole', en: 'Blog / Articles' },
  { id: 'contact', ro: 'Contact', en: 'Contact' },
  { id: 'pricing', ro: 'Preturi / Tarife', en: 'Pricing' },
  { id: 'faq', ro: 'Intrebari frecvente (FAQ)', en: 'FAQ' },
  { id: 'team', ro: 'Echipa', en: 'Team' },
  { id: 'testimonials', ro: 'Testimoniale', en: 'Testimonials' },
  { id: 'terms', ro: 'Termeni & Conditii', en: 'Terms & Conditions' },
  { id: 'privacy', ro: 'Politica de confidentialitate', en: 'Privacy Policy' },
  { id: 'menu', ro: 'Meniu (restaurant)', en: 'Menu (restaurant)' },
  { id: 'booking', ro: 'Pagina de rezervari', en: 'Booking Page' },
  { id: 'careers', ro: 'Cariere / Angajari', en: 'Careers' },
];

// Step 3 — Features
export const FEATURE_OPTIONS: Option[] = [
  { id: 'contact_form', ro: 'Formular de contact', en: 'Contact Form', desc_ro: 'Formular cu validare si notificari pe email', desc_en: 'Form with validation and email notifications' },
  { id: 'booking', ro: 'Rezervari / Programari online', en: 'Online Booking / Appointments', desc_ro: 'Clientii pot programa direct de pe site', desc_en: 'Clients can book directly from the site' },
  { id: 'qr_menu', ro: 'Meniu digital cu QR code', en: 'Digital Menu with QR code', desc_ro: 'Meniu scanabil pentru restaurant/cafenea', desc_en: 'Scannable menu for restaurant/cafe' },
  { id: 'live_chat', ro: 'Chat live cu vizitatorii', en: 'Live Chat with visitors', desc_ro: 'Widget de chat in timp real', desc_en: 'Real-time chat widget' },
  { id: 'newsletter', ro: 'Newsletter / Abonare email', en: 'Newsletter / Email Subscription', desc_ro: 'Formular de abonare + integrare email marketing', desc_en: 'Subscribe form + email marketing integration' },
  { id: 'blog', ro: 'Sistem de blog', en: 'Blog System', desc_ro: 'Articole cu categorii, cautare si admin panel', desc_en: 'Articles with categories, search and admin panel' },
  { id: 'gallery', ro: 'Galerie foto / video', en: 'Photo / Video Gallery', desc_ro: 'Galerie cu lightbox si filtrare pe categorii', desc_en: 'Gallery with lightbox and category filtering' },
  { id: 'testimonials', ro: 'Sectiune testimoniale', en: 'Testimonials Section', desc_ro: 'Review-uri si feedback de la clienti', desc_en: 'Customer reviews and feedback' },
  { id: 'google_maps', ro: 'Google Maps integrat', en: 'Google Maps Integration', desc_ro: 'Harta interactiva cu locatia afacerii', desc_en: 'Interactive map with business location' },
  { id: 'social_feed', ro: 'Feed social media', en: 'Social Media Feed', desc_ro: 'Arata postari de pe Instagram/Facebook pe site', desc_en: 'Show Instagram/Facebook posts on site' },
  { id: 'multilingual', ro: 'Suport multilingv (RO/EN)', en: 'Multilingual Support (RO/EN)', desc_ro: 'Site disponibil in mai multe limbi', desc_en: 'Site available in multiple languages' },
  { id: 'price_calculator', ro: 'Calculator de preturi', en: 'Price Calculator', desc_ro: 'Clientii pot calcula costul serviciilor online', desc_en: 'Clients can calculate service costs online' },
  { id: 'members_area', ro: 'Zona membri / login clienti', en: 'Members Area / Client Login', desc_ro: 'Cont de client cu acces la continut exclusiv', desc_en: 'Client account with access to exclusive content' },
  { id: 'admin_panel', ro: 'Admin Panel custom', en: 'Custom Admin Panel', desc_ro: 'Panou de administrare ca sa editezi singur continutul', desc_en: 'Admin panel so you can edit content yourself' },
  { id: 'animations', ro: 'Animatii premium', en: 'Premium Animations', desc_ro: 'Animatii la scroll, tranzitii fluide, efecete vizuale', desc_en: 'Scroll animations, smooth transitions, visual effects' },
  { id: 'analytics', ro: 'Google Analytics + Search Console', en: 'Google Analytics + Search Console', desc_ro: 'Tracking complet vizitatori si performanta', desc_en: 'Complete visitor and performance tracking' },
  { id: 'gdpr', ro: 'GDPR & Cookie Banner', en: 'GDPR & Cookie Banner', desc_ro: 'Conform cu legislatia europeana', desc_en: 'Compliant with European legislation' },
];

// Step 4 — Design style
export const DESIGN_STYLES: Option[] = [
  { id: 'minimal', ro: 'Modern & Minimalist', en: 'Modern & Minimalist', desc_ro: 'Curat, spatios, focus pe continut', desc_en: 'Clean, spacious, content-focused' },
  { id: 'bold', ro: 'Bold & Colorat', en: 'Bold & Colorful', desc_ro: 'Culori vibrante, personalitate puternica', desc_en: 'Vibrant colors, strong personality' },
  { id: 'elegant', ro: 'Elegant & Corporate', en: 'Elegant & Corporate', desc_ro: 'Profesional, sofisticat, business-oriented', desc_en: 'Professional, sophisticated, business-oriented' },
  { id: 'creative', ro: 'Creativ & Artistic', en: 'Creative & Artistic', desc_ro: 'Unic, neconventional, memorabil', desc_en: 'Unique, unconventional, memorable' },
];

// Step 4 — Brand extras
export const BRAND_EXTRAS: Option[] = [
  { id: 'business_cards', ro: 'Carti de vizita', en: 'Business Cards' },
  { id: 'flyers', ro: 'Flyere / Brosuri', en: 'Flyers / Brochures' },
  { id: 'social_templates', ro: 'Template-uri Social Media', en: 'Social Media Templates' },
  { id: 'physical_menu', ro: 'Meniu fizic (restaurant)', en: 'Physical Menu (restaurant)' },
  { id: 'email_signature', ro: 'Semnatura email profesionala', en: 'Professional Email Signature' },
  { id: 'presentation', ro: 'Prezentare PowerPoint/PDF', en: 'PowerPoint/PDF Presentation' },
];

// Step 5 — Content status
export const TEXT_STATUS: Option[] = [
  { id: 'ready', ro: 'Da, am texte pregatite', en: 'Yes, I have texts ready' },
  { id: 'partial', ro: 'Am partial, dar am nevoie de ajutor', en: 'Partially, but I need help' },
  { id: 'need_copywriting', ro: 'Nu, vreau copywriting profesional', en: 'No, I want professional copywriting' },
];

export const PHOTO_STATUS: Option[] = [
  { id: 'have', ro: 'Da, am poze profesionale', en: 'Yes, I have professional photos' },
  { id: 'want_photoshoot', ro: 'Nu, vreau sedinta foto', en: 'No, I want a photoshoot' },
  { id: 'use_stock', ro: 'Folosesc poze stock (gratuite)', en: 'I\'ll use stock photos (free)' },
];

// Step 5 — Marketing
export const MARKETING_OPTIONS: Option[] = [
  { id: 'seo', ro: 'Optimizare SEO (Google)', en: 'SEO Optimization (Google)', desc_ro: 'Sa te gaseasca clientii pe Google', desc_en: 'So clients find you on Google' },
  { id: 'gmb', ro: 'Google My Business Setup', en: 'Google My Business Setup', desc_ro: 'Profil de afacere pe Google Maps', desc_en: 'Business profile on Google Maps' },
  { id: 'google_ads', ro: 'Google Ads (campanie PPC)', en: 'Google Ads (PPC campaign)', desc_ro: 'Reclame platite pe Google', desc_en: 'Paid ads on Google' },
  { id: 'meta_ads', ro: 'Facebook / Instagram Ads', en: 'Facebook / Instagram Ads', desc_ro: 'Reclame pe social media', desc_en: 'Social media advertising' },
  { id: 'email_marketing', ro: 'Email Marketing Setup', en: 'Email Marketing Setup', desc_ro: 'Campanii de email automate', desc_en: 'Automated email campaigns' },
  { id: 'social_management', ro: 'Management Social Media', en: 'Social Media Management', desc_ro: 'Ne ocupam de postarile tale lunare', desc_en: 'We handle your monthly posts' },
];

// Step 6 — Maintenance
export interface MaintenancePlan {
  id: string;
  ro: string;
  en: string;
  price_ro: string;
  price_en: string;
  promoPrice_ro?: string;
  promoPrice_en?: string;
  desc_ro: string;
  desc_en: string;
  features_ro: string[];
  features_en: string[];
  popular?: boolean;
  annual?: boolean;
}

/** Maintenance is mandatory (12-month contract); only the billing period is a choice. Prices follow the selected tier. */
export const MAINTENANCE_PLANS: MaintenancePlan[] = [
  {
    id: 'monthly',
    ro: 'Mentenanță lunară',
    en: 'Monthly maintenance',
    price_ro: '',
    price_en: '',
    desc_ro: 'Plătești lună de lună. Contract minim 12 luni.',
    desc_en: 'Pay month by month. 12-month minimum contract.',
    features_ro: [],
    features_en: [],
  },
  {
    id: 'annual',
    ro: 'Mentenanță anuală',
    en: 'Annual maintenance',
    price_ro: '',
    price_en: '',
    desc_ro: `Plătești ${ANNUAL_PAID_MONTHS} luni, primești 12 (2 luni gratis).`,
    desc_en: `Pay for ${ANNUAL_PAID_MONTHS} months, get 12 (2 months free).`,
    features_ro: [],
    features_en: [],
    popular: true,
    annual: true,
  },
];

/** What every maintenance plan includes (hours depend on the tier). */
export function maintenanceIncludes(siteType: string, lang: Lang): string[] {
  const hours = tierForSiteType(siteType)?.hoursPerMonth ?? 1;
  return lang === 'ro'
    ? ['Hosting + SSL', 'Reînnoire domeniu', 'Backup + update-uri', `${hours} ${hours === 1 ? 'oră' : 'ore'} de modificări/lună`, 'Răspuns în 2 zile lucrătoare', `Peste: ${EXTRA_HOURLY_EUR}€/oră`]
    : ['Hosting + SSL', 'Domain renewal', 'Backups + updates', `${hours} ${hours === 1 ? 'hour' : 'hours'} of edits/month`, 'Reply within 2 business days', `Extra: ${EXTRA_HOURLY_EUR}€/hour`];
}

/** "25€/lună" or "250€/an" for the selected site type and billing plan. */
export function maintenancePriceLabel(planId: string, siteType: string, lang: Lang): string {
  const t = tierForSiteType(siteType);
  if (!t) return '';
  const from = t.startingFrom ? (lang === 'ro' ? 'de la ' : 'from ') : '';
  if (planId === 'annual') return `${from}${t.monthlyEur * ANNUAL_PAID_MONTHS}€${lang === 'ro' ? '/an' : '/year'}`;
  return `${from}${t.monthlyEur}€${lang === 'ro' ? '/lună' : '/month'}`;
}

// Step 7 — Budget
export const BUDGET_OPTIONS: Option[] = [
  { id: 'under500', ro: 'Sub 500', en: 'Under 500' },
  { id: '500_1000', ro: '500 - 1.000', en: '500 - 1,000' },
  { id: '1000_2000', ro: '1.000 - 2.000', en: '1,000 - 2,000' },
  { id: 'over2000', ro: 'Peste 2.000', en: 'Over 2,000' },
  { id: 'flexible', ro: 'Nu am un buget fix', en: 'I don\'t have a fixed budget' },
];

export const TIMELINE_OPTIONS: Option[] = [
  { id: 'asap', ro: 'Cat mai repede posibil', en: 'As soon as possible' },
  { id: '1_2_weeks', ro: 'In 1-2 saptamani', en: 'In 1-2 weeks' },
  { id: '1_month', ro: 'Intr-o luna', en: 'In a month' },
  { id: 'no_rush', ro: 'Nu e urgent', en: 'No rush' },
];

// Logo status
export const LOGO_STATUS: Option[] = [
  { id: 'have', ro: 'Da, am logo', en: 'Yes, I have a logo' },
  { id: 'want_new', ro: 'Nu, vreau logo nou', en: 'No, I want a new logo' },
  { id: 'skip', ro: 'Nu am, ma descurc deocamdata', en: 'I don\'t have one, I\'ll manage for now' },
];

// ---------------------------------------------------------------------------
// Step labels (for progress bar)
// ---------------------------------------------------------------------------
export const STEP_LABELS = {
  project:     { ro: 'Proiect',       en: 'Project' },
  pages:       { ro: 'Pagini',        en: 'Pages' },
  features:    { ro: 'Functionalitati', en: 'Features' },
  brand:       { ro: 'Design',        en: 'Design' },
  content:     { ro: 'Continut',      en: 'Content' },
  maintenance: { ro: 'Mentenanta',    en: 'Hosting' },
  summary:     { ro: 'Trimite',       en: 'Submit' },
} as const;

export type StepId = keyof typeof STEP_LABELS;
export const STEP_ORDER: StepId[] = ['project', 'pages', 'features', 'brand', 'content', 'maintenance', 'summary'];

// ---------------------------------------------------------------------------
// Label helper
// ---------------------------------------------------------------------------
export function label(opt: Option | { ro: string; en: string }, lang: Lang): string {
  return lang === 'ro' ? opt.ro : opt.en;
}

export function desc(opt: Option, lang: Lang): string {
  return (lang === 'ro' ? opt.desc_ro : opt.desc_en) ?? '';
}
