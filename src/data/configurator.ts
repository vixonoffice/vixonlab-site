// Generat din exportul bazei de date vechi (2026-11-05). De acum se editeaza direct aici, nu mai exista baza de date.
// Optiunile configuratorului. Tipurile de site (SITE_TYPES) si mentenanta (MAINTENANCE_PLANS) vin din src/lib/tiers.ts,
// nu de aici, ca preturile sa nu diverga. E-commerce nu se ofera (CLAUDE.md, sectiunea 7), deci nu apare la functionalitati.
import type { Option } from './types';

export const BUSINESS_TYPES: Option[] = [
  {
    id: 'restaurant',
    ro: 'Restaurant / Cafenea / Bar',
    en: 'Restaurant / Cafe / Bar',
  },
  {
    id: 'salon',
    ro: 'Salon de frumusete / Spa',
    en: 'Beauty Salon / Spa',
  },
  {
    id: 'retail',
    ro: 'Magazin fizic / Retail',
    en: 'Physical Store / Retail',
  },
  {
    id: 'services',
    ro: 'Servicii profesionale',
    en: 'Professional Services',
  },
  {
    id: 'freelancer',
    ro: 'Freelancer / Consultant',
    en: 'Freelancer / Consultant',
  },
  {
    id: 'construction',
    ro: 'Constructii / Renovari',
    en: 'Construction / Renovations',
  },
  {
    id: 'medical',
    ro: 'Medical / Dental',
    en: 'Medical / Dental',
  },
  {
    id: 'auto',
    ro: 'Auto / Service',
    en: 'Auto / Service',
  },
  {
    id: 'fitness',
    ro: 'Fitness / Sport',
    en: 'Fitness / Sport',
  },
  {
    id: 'education',
    ro: 'Educatie / Cursuri',
    en: 'Education / Courses',
  },
  {
    id: 'tech',
    ro: 'IT / Tech',
    en: 'IT / Tech',
  },
  {
    id: 'other',
    ro: 'Altele',
    en: 'Other',
  },
];

export const PAGE_OPTIONS: Option[] = [
  {
    id: 'home',
    ro: 'Acasa',
    en: 'Home',
  },
  {
    id: 'about',
    ro: 'Despre noi',
    en: 'About Us',
  },
  {
    id: 'services',
    ro: 'Servicii',
    en: 'Services',
  },
  {
    id: 'portfolio',
    ro: 'Portofoliu / Galerie',
    en: 'Portfolio / Gallery',
  },
  {
    id: 'blog',
    ro: 'Blog / Articole',
    en: 'Blog / Articles',
  },
  {
    id: 'contact',
    ro: 'Contact',
    en: 'Contact',
  },
  {
    id: 'pricing',
    ro: 'Preturi / Tarife',
    en: 'Pricing',
  },
  {
    id: 'faq',
    ro: 'Intrebari frecvente (FAQ)',
    en: 'FAQ',
  },
  {
    id: 'team',
    ro: 'Echipa',
    en: 'Team',
  },
  {
    id: 'testimonials',
    ro: 'Testimoniale',
    en: 'Testimonials',
  },
  {
    id: 'terms',
    ro: 'Termeni & Conditii',
    en: 'Terms & Conditions',
  },
  {
    id: 'privacy',
    ro: 'Politica de confidentialitate',
    en: 'Privacy Policy',
  },
  {
    id: 'menu',
    ro: 'Meniu (restaurant)',
    en: 'Menu (restaurant)',
  },
  {
    id: 'booking',
    ro: 'Pagina de rezervari',
    en: 'Booking Page',
  },
  {
    id: 'careers',
    ro: 'Cariere / Angajari',
    en: 'Careers',
  },
];

export const FEATURE_OPTIONS: Option[] = [
  {
    id: 'contact_form',
    ro: 'Formular de contact',
    en: 'Contact Form',
    desc_ro: 'Formular cu validare si notificari pe email',
    desc_en: 'Form with validation and email notifications',
  },
  {
    id: 'booking',
    ro: 'Rezervari / Programari online',
    en: 'Online Booking / Appointments',
    desc_ro: 'Clientii pot programa direct de pe site',
    desc_en: 'Clients can book directly from the site',
  },
  {
    id: 'qr_menu',
    ro: 'Meniu digital cu QR code',
    en: 'Digital Menu with QR code',
    desc_ro: 'Meniu scanabil pentru restaurant/cafenea',
    desc_en: 'Scannable menu for restaurant/cafe',
  },
  {
    id: 'live_chat',
    ro: 'Chat live cu vizitatorii',
    en: 'Live Chat with visitors',
    desc_ro: 'Widget de chat in timp real',
    desc_en: 'Real-time chat widget',
  },
  {
    id: 'newsletter',
    ro: 'Newsletter / Abonare email',
    en: 'Newsletter / Email Subscription',
    desc_ro: 'Formular de abonare + integrare email marketing',
    desc_en: 'Subscribe form + email marketing integration',
  },
  {
    id: 'blog',
    ro: 'Sistem de blog',
    en: 'Blog System',
    desc_ro: 'Articole cu categorii, cautare si admin panel',
    desc_en: 'Articles with categories, search and admin panel',
  },
  {
    id: 'gallery',
    ro: 'Galerie foto / video',
    en: 'Photo / Video Gallery',
    desc_ro: 'Galerie cu lightbox si filtrare pe categorii',
    desc_en: 'Gallery with lightbox and category filtering',
  },
  {
    id: 'testimonials',
    ro: 'Sectiune testimoniale',
    en: 'Testimonials Section',
    desc_ro: 'Review-uri si feedback de la clienti',
    desc_en: 'Customer reviews and feedback',
  },
  {
    id: 'google_maps',
    ro: 'Google Maps integrat',
    en: 'Google Maps Integration',
    desc_ro: 'Harta interactiva cu locatia afacerii',
    desc_en: 'Interactive map with business location',
  },
  {
    id: 'social_feed',
    ro: 'Feed social media',
    en: 'Social Media Feed',
    desc_ro: 'Arata postari de pe Instagram/Facebook pe site',
    desc_en: 'Show Instagram/Facebook posts on site',
  },
  {
    id: 'multilingual',
    ro: 'Suport multilingv (RO/EN)',
    en: 'Multilingual Support (RO/EN)',
    desc_ro: 'Site disponibil in mai multe limbi',
    desc_en: 'Site available in multiple languages',
  },
  {
    id: 'price_calculator',
    ro: 'Calculator de preturi',
    en: 'Price Calculator',
    desc_ro: 'Clientii pot calcula costul serviciilor online',
    desc_en: 'Clients can calculate service costs online',
  },
  {
    id: 'members_area',
    ro: 'Zona membri / login clienti',
    en: 'Members Area / Client Login',
    desc_ro: 'Cont de client cu acces la continut exclusiv',
    desc_en: 'Client account with access to exclusive content',
  },
  {
    id: 'admin_panel',
    ro: 'Admin Panel custom',
    en: 'Custom Admin Panel',
    desc_ro: 'Panou de administrare ca sa editezi singur continutul',
    desc_en: 'Admin panel so you can edit content yourself',
  },
  {
    id: 'animations',
    ro: 'Animatii premium',
    en: 'Premium Animations',
    desc_ro: 'Animatii la scroll, tranzitii fluide, efecte vizuale',
    desc_en: 'Scroll animations, smooth transitions, visual effects',
  },
  {
    id: 'analytics',
    ro: 'Google Analytics + Search Console',
    en: 'Google Analytics + Search Console',
    desc_ro: 'Tracking complet vizitatori si performanta',
    desc_en: 'Complete visitor and performance tracking',
  },
  {
    id: 'gdpr',
    ro: 'GDPR & Cookie Banner',
    en: 'GDPR & Cookie Banner',
    desc_ro: 'Conform cu legislatia europeana',
    desc_en: 'Compliant with European legislation',
  },
];

export const DESIGN_STYLES: Option[] = [
  {
    id: 'minimal',
    ro: 'Modern & Minimalist',
    en: 'Modern & Minimalist',
    desc_ro: 'Curat, spatios, focus pe continut',
    desc_en: 'Clean, spacious, content-focused',
  },
  {
    id: 'bold',
    ro: 'Bold & Colorat',
    en: 'Bold & Colorful',
    desc_ro: 'Culori vibrante, personalitate puternica',
    desc_en: 'Vibrant colors, strong personality',
  },
  {
    id: 'elegant',
    ro: 'Elegant & Corporate',
    en: 'Elegant & Corporate',
    desc_ro: 'Profesional, sofisticat, business-oriented',
    desc_en: 'Professional, sophisticated, business-oriented',
  },
  {
    id: 'creative',
    ro: 'Creativ & Artistic',
    en: 'Creative & Artistic',
    desc_ro: 'Unic, neconventional, memorabil',
    desc_en: 'Unique, unconventional, memorable',
  },
];

export const BRAND_EXTRAS: Option[] = [
  {
    id: 'business_cards',
    ro: 'Carti de vizita',
    en: 'Business Cards',
  },
  {
    id: 'flyers',
    ro: 'Flyere / Brosuri',
    en: 'Flyers / Brochures',
  },
  {
    id: 'social_templates',
    ro: 'Template-uri Social Media',
    en: 'Social Media Templates',
  },
  {
    id: 'physical_menu',
    ro: 'Meniu fizic (restaurant)',
    en: 'Physical Menu (restaurant)',
  },
  {
    id: 'email_signature',
    ro: 'Semnatura email profesionala',
    en: 'Professional Email Signature',
  },
  {
    id: 'presentation',
    ro: 'Prezentare PowerPoint/PDF',
    en: 'PowerPoint/PDF Presentation',
  },
];

export const LOGO_STATUS: Option[] = [
  {
    id: 'have',
    ro: 'Da, am logo',
    en: 'Yes, I have a logo',
  },
  {
    id: 'want_new',
    ro: 'Nu, vreau logo nou',
    en: 'No, I want a new logo',
  },
  {
    id: 'skip',
    ro: 'Nu am, ma descurc deocamdata',
    en: 'I do not have one, I will manage for now',
  },
];

export const TEXT_STATUS: Option[] = [
  {
    id: 'ready',
    ro: 'Da, am texte pregatite',
    en: 'Yes, I have texts ready',
  },
  {
    id: 'partial',
    ro: 'Am partial, dar am nevoie de ajutor',
    en: 'Partially, but I need help',
  },
  {
    id: 'need_copywriting',
    ro: 'Nu, vreau copywriting profesional',
    en: 'No, I want professional copywriting',
  },
];

export const PHOTO_STATUS: Option[] = [
  {
    id: 'have',
    ro: 'Da, am poze profesionale',
    en: 'Yes, I have professional photos',
  },
  {
    id: 'want_photoshoot',
    ro: 'Nu, vreau sedinta foto',
    en: 'No, I want a photoshoot',
  },
  {
    id: 'use_stock',
    ro: 'Folosesc poze stock (gratuite)',
    en: 'I will use stock photos (free)',
  },
];

export const MARKETING_OPTIONS: Option[] = [
  {
    id: 'seo',
    ro: 'Optimizare SEO (Google)',
    en: 'SEO Optimization (Google)',
    desc_ro: 'Sa te gaseasca clientii pe Google',
    desc_en: 'So clients find you on Google',
  },
  {
    id: 'gmb',
    ro: 'Google My Business Setup',
    en: 'Google My Business Setup',
    desc_ro: 'Profil de afacere pe Google Maps',
    desc_en: 'Business profile on Google Maps',
  },
  {
    id: 'google_ads',
    ro: 'Google Ads (campanie PPC)',
    en: 'Google Ads (PPC campaign)',
    desc_ro: 'Reclame platite pe Google',
    desc_en: 'Paid ads on Google',
  },
  {
    id: 'meta_ads',
    ro: 'Facebook / Instagram Ads',
    en: 'Facebook / Instagram Ads',
    desc_ro: 'Reclame pe social media',
    desc_en: 'Social media advertising',
  },
  {
    id: 'email_marketing',
    ro: 'Email Marketing Setup',
    en: 'Email Marketing Setup',
    desc_ro: 'Campanii de email automate',
    desc_en: 'Automated email campaigns',
  },
  {
    id: 'social_management',
    ro: 'Management Social Media',
    en: 'Social Media Management',
    desc_ro: 'Ne ocupam de postarile tale lunare',
    desc_en: 'We handle your monthly posts',
  },
];

export const BUDGET_OPTIONS: Option[] = [
  {
    id: 'under500',
    ro: 'Sub 500',
    en: 'Under 500',
  },
  {
    id: '500_1000',
    ro: '500 - 1.000',
    en: '500 - 1,000',
  },
  {
    id: '1000_2000',
    ro: '1.000 - 2.000',
    en: '1,000 - 2,000',
  },
  {
    id: 'over2000',
    ro: 'Peste 2.000',
    en: 'Over 2,000',
  },
  {
    id: 'flexible',
    ro: 'Nu am un buget fix',
    en: 'I do not have a fixed budget',
  },
];

export const TIMELINE_OPTIONS: Option[] = [
  {
    id: 'asap',
    ro: 'Cat mai repede posibil',
    en: 'As soon as possible',
  },
  {
    id: '1_2_weeks',
    ro: 'In 1-2 saptamani',
    en: 'In 1-2 weeks',
  },
  {
    id: '1_month',
    ro: 'Intr-o luna',
    en: 'In a month',
  },
  {
    id: 'no_rush',
    ro: 'Nu e urgent',
    en: 'No rush',
  },
];
