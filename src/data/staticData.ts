import type { LucideIcon } from 'lucide-react';
import { Code, ShoppingCart, Palette, BarChart3 } from 'lucide-react';
import type { StatRow, ServiceRow, ProcessStepRow, TestimonialRow } from '@/hooks/useSupabaseData';

const iconMap: Record<string, LucideIcon> = {
  code: Code,
  'shopping-cart': ShoppingCart,
  palette: Palette,
  'bar-chart-3': BarChart3,
};

export function resolveIcon(name: string): LucideIcon {
  return iconMap[name] || Code;
}

export const STATIC_STATS: StatRow[] = [
  { id: '1', sort_order: 1, value: '50+', label_ro: 'Proiecte livrate', label_en: 'Projects delivered' },
  { id: '2', sort_order: 2, value: '99%', label_ro: 'Clienți mulțumiți', label_en: 'Happy clients' },
  { id: '3', sort_order: 3, value: '3+', label_ro: 'Ani experiență', label_en: 'Years experience' },
  { id: '4', sort_order: 4, value: '24h', label_ro: 'Timp de răspuns', label_en: 'Response time' },
];

export const STATIC_SERVICES: ServiceRow[] = [
  {
    id: 'web-development',
    sort_order: 1,
    icon: 'code',
    icon_gradient: 'from-purple-600 to-violet-500',
    title_ro: 'Web Development',
    title_en: 'Web Development',
    description_ro: 'Site-uri de prezentare care se încarcă rapid și arată bine pe orice ecran. Optimizate pentru Google din start.',
    description_en: 'Presentation websites that load fast and look great on any screen. Google-optimized from the start.',
    features_ro: ['Site-uri de prezentare moderne', 'Landing pages optimizate', 'Aplicații web complexe', 'SEO avansat', 'Optimizare performanță', 'Design responsive', 'Mentenanță post-lansare'],
    features_en: ['Modern presentation websites', 'Optimized landing pages', 'Complex web applications', 'Advanced SEO', 'Performance optimization', 'Responsive design', 'Post-launch maintenance'],
    price_label_ro: 'De la 1.500 RON',
    price_label_en: 'From 1,500 RON',
    anchor: 'web-development',
  },
  {
    id: 'ecommerce',
    sort_order: 2,
    icon: 'shopping-cart',
    icon_gradient: 'from-pink-600 to-rose-500',
    title_ro: 'Magazine Online',
    title_en: 'Online Stores',
    description_ro: 'Vinde online fără bătăi de cap. Plăți integrate, gestionare stocuri, și un design care convertește vizitatori în clienți.',
    description_en: 'Sell online hassle-free. Integrated payments, inventory management, and a design that converts visitors into customers.',
    features_ro: ['Catalog produse complet', 'Coș de cumpărături avansat', 'Integrare plăți (Stripe)', 'Gestionare stocuri automată', 'Panou admin intuitiv', 'Email marketing', 'Statistici vânzări'],
    features_en: ['Complete product catalog', 'Advanced shopping cart', 'Payment integration (Stripe)', 'Automated inventory management', 'Intuitive admin panel', 'Email marketing', 'Sales statistics'],
    price_label_ro: 'De la 3.500 RON',
    price_label_en: 'From 3,500 RON',
    anchor: 'ecommerce',
  },
  {
    id: 'design',
    sort_order: 3,
    icon: 'palette',
    icon_gradient: 'from-blue-600 to-cyan-500',
    title_ro: 'Design & Branding',
    title_en: 'Design & Branding',
    description_ro: 'Logo, materiale social media, flyere, meniuri — tot ce ți se vede. Un brand kit complet ca să arăți profesionist peste tot.',
    description_en: 'Logo, social media materials, flyers, menus — everything visible. A complete brand kit to look professional everywhere.',
    features_ro: ['Logo profesional', 'Brand guidelines', 'Grafică social media', 'Materiale print', 'UI/UX Design', 'Business cards', 'Brand kit complet'],
    features_en: ['Professional logo', 'Brand guidelines', 'Social media graphics', 'Print materials', 'UI/UX Design', 'Business cards', 'Complete brand kit'],
    price_label_ro: 'De la 500 RON',
    price_label_en: 'From 500 RON',
    anchor: 'design',
  },
  {
    id: 'marketing',
    sort_order: 4,
    icon: 'bar-chart-3',
    icon_gradient: 'from-amber-600 to-orange-500',
    title_ro: 'Marketing Digital',
    title_en: 'Digital Marketing',
    description_ro: 'Landing pages care convertesc, ad creatives pentru Facebook și Google, și conținut care aduce rezultate măsurabile.',
    description_en: 'Landing pages that convert, ad creatives for Facebook and Google, and content that brings measurable results.',
    features_ro: ['Landing pages optimizate', 'Ad creatives Facebook/Google', 'Template-uri email', 'Conținut social media', 'Copywriting', 'A/B testing', 'Optimizare conversie'],
    features_en: ['Optimized landing pages', 'Facebook/Google ad creatives', 'Email templates', 'Social media content', 'Copywriting', 'A/B testing', 'Conversion optimization'],
    price_label_ro: 'De la 800 RON',
    price_label_en: 'From 800 RON',
    anchor: 'marketing',
  },
];

export const STATIC_PROCESS_STEPS: ProcessStepRow[] = [
  {
    id: '1',
    sort_order: 1,
    step_number: '01',
    title_ro: 'Descoperire',
    title_en: 'Discovery',
    description_ro: 'Discutăm ce vrei, pentru cine e site-ul, și ce buget ai. Primești o estimare clară, fără surprize.',
    description_en: 'We discuss what you want, who the site is for, and your budget. You get a clear estimate, no surprises.',
  },
  {
    id: '2',
    sort_order: 2,
    step_number: '02',
    title_ro: 'Design',
    title_en: 'Design',
    description_ro: 'Creăm un mockup. Dai feedback, ajustăm. Nu scriem niciun rând de cod până nu ești mulțumit cu look-ul.',
    description_en: 'We create a mockup. You give feedback, we adjust. We don\'t write a single line of code until you\'re happy with the look.',
  },
  {
    id: '3',
    sort_order: 3,
    step_number: '03',
    title_ro: 'Dezvoltare',
    title_en: 'Development',
    description_ro: 'Construim site-ul, testăm pe toate device-urile, optimizăm viteza. Primești acces la preview pe parcurs.',
    description_en: 'We build the site, test on all devices, optimize speed. You get preview access along the way.',
  },
  {
    id: '4',
    sort_order: 4,
    step_number: '04',
    title_ro: 'Lansare',
    title_en: 'Launch',
    description_ro: 'Deploy, configurare domeniu, Google Analytics. Primești documentație și training scurt ca să poți gestiona singur conținutul.',
    description_en: 'Deploy, domain setup, Google Analytics. You get documentation and a short training so you can manage the content yourself.',
  },
];

export const STATIC_TESTIMONIALS: TestimonialRow[] = [
  {
    id: '1',
    sort_order: 1,
    quote_ro: 'Am venit fără un brief clar și în 5 zile aveam site-ul live. Se încarcă instant, arată profesionist și deja am primit primele solicitări prin formularul de contact.',
    quote_en: 'I came without a clear brief and in 5 days the site was live. It loads instantly, looks professional, and I already received the first inquiries through the contact form.',
    author_name: 'Maria P.',
    author_role: 'TechStart SRL',
    author_initial: 'M',
    avatar_gradient: 'from-purple-600 to-violet-500',
  },
  {
    id: '2',
    sort_order: 2,
    quote_ro: 'Magazinul online gata în 2 săptămâni. Am fost sceptic, dar în prima lună am procesat comenzi fără nicio problemă. Suportul după lansare m-a surprins cel mai mult — răspund în ore, nu în zile.',
    quote_en: 'Online store ready in 2 weeks. I was skeptical, but in the first month I processed orders without any issues. Post-launch support surprised me the most — they respond in hours, not days.',
    author_name: 'Andrei I.',
    author_role: 'ShopLocal',
    author_initial: 'A',
    avatar_gradient: 'from-pink-600 to-rose-500',
  },
  {
    id: '3',
    sort_order: 3,
    quote_ro: 'Am lucrat cu 2 agenții înainte și de fiecare dată a fost frustrare. Cu Vixon Lab a fost altceva — comunicare clară, livrare la timp, și nu mi-au vândut servicii de care nu aveam nevoie.',
    quote_en: "I worked with 2 agencies before and it was frustrating each time. With Vixon Lab it was different — clear communication, on-time delivery, and they didn't sell me services I didn't need.",
    author_name: 'Elena D.',
    author_role: 'Bella Boutique',
    author_initial: 'E',
    avatar_gradient: 'from-blue-600 to-cyan-500',
  },
];
