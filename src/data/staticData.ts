import type { LucideIcon } from 'lucide-react';
import { Code, ShoppingCart, Palette, BarChart3, CalendarCheck } from 'lucide-react';
import type { FactRow, ServiceRow, ProcessStepRow } from './types';

const iconMap: Record<string, LucideIcon> = {
  code: Code,
  'shopping-cart': ShoppingCart,
  'calendar-check': CalendarCheck,
  palette: Palette,
  'bar-chart-3': BarChart3,
};

export function resolveIcon(name: string): LucideIcon {
  return iconMap[name] || Code;
}

/**
 * Cifre reale, verificabile. Nu adauga aici numar de proiecte, procente de clienti multumiti sau ani de experienta
 * pana nu avem dovada pentru ele (vezi STANDARD.md: daca nu avem cifra reala, nu punem cifra).
 */
export const FACTS: FactRow[] = [
  {
    id: 'perf',
    value_ro: '58 → 90',
    value_en: '58 → 90',
    label_ro: 'Scor performanță mobil pe sizdetailing.ro',
    label_en: 'Mobile performance score on sizdetailing.ro',
  },
  {
    id: 'price',
    value_ro: '350€',
    value_en: '€350',
    label_ro: 'Preț de la, plătit o singură dată',
    label_en: 'Starting price, paid once',
  },
  {
    id: 'delivery',
    value_ro: '7–14',
    value_en: '7–14',
    label_ro: 'Zile de livrare, la Prezentare și Business',
    label_en: 'Days to deliver a Presentation or Business site',
  },
  {
    id: 'reply',
    value_ro: '24h',
    value_en: '24h',
    label_ro: 'Răspuns la mesaje',
    label_en: 'Reply to messages',
  },
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
    anchor: 'web-development',
  },
  {
    id: 'interactive',
    sort_order: 2,
    icon: 'calendar-check',
    icon_gradient: 'from-pink-600 to-rose-500',
    title_ro: 'Rezervări & Configuratoare',
    title_en: 'Bookings & Configurators',
    description_ro: 'Clientul verifică singur data liberă, își alege opțiunile și vede prețul pe loc. Tu primești cererea gata completată pe WhatsApp.',
    description_en: 'Clients check availability, pick their options and see the price instantly. You get the finished request on WhatsApp.',
    features_ro: ['Calendar de disponibilitate', 'Configurator pas cu pas', 'Estimare de preț live', 'Trimitere pe WhatsApp', 'Panou de administrare', 'Design adaptat pe mobil'],
    features_en: ['Availability calendar', 'Step-by-step configurator', 'Live price estimate', 'WhatsApp hand-off', 'Admin panel', 'Mobile-first design'],
    anchor: 'interactive',
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
