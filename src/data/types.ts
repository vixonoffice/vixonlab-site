// Tipurile datelor statice ale site-ului (fostele randuri din baza de date).

/** Un fapt real afisat ca "cifra mare". Nu pune aici statistici care nu pot fi dovedite. */
export interface FactRow {
  id: string;
  value_ro: string;
  value_en: string;
  label_ro: string;
  label_en: string;
}

export interface ServiceRow {
  id: string;
  sort_order: number;
  icon: string;
  icon_gradient: string;
  title_ro: string;
  title_en: string;
  description_ro: string;
  description_en: string;
  features_ro: string[];
  features_en: string[];
  anchor: string | null;
}

export interface ProcessStepRow {
  id: string;
  sort_order: number;
  step_number: string;
  title_ro: string;
  title_en: string;
  description_ro: string;
  description_en: string;
}

export interface TechRow {
  id: string;
  name_ro: string;
  name_en: string;
  sort_order: number;
}

/** Studiu de caz cu fapte verificabile. Nu pune aici cifre sau citate care nu sunt reale. */
export interface CaseStudyData {
  brief_ro: string;
  brief_en: string;
  /** Paragrafe separate prin linie goala. */
  approach_ro: string;
  approach_en: string;
  highlights_ro: string[];
  highlights_en: string[];
  /** Rezultat masurat (doar daca exista o cifra reala). */
  result?: {
    value: string;
    label_ro: string;
    label_en: string;
  };
}

export type ProjectKind = 'client' | 'demo';

export interface PortfolioProjectRow {
  id: string;
  sort_order: number;
  /** "client" = site livrat unui client real; "demo" = concept facut de noi, marcat "Concept / demo". */
  kind: ProjectKind;
  title: string;
  subtitle_ro: string;
  subtitle_en: string;
  description_ro: string;
  description_en: string;
  tags: string[];
  image_url: string | null;
  live_url: string | null;
  slug: string | null;
  case_study: CaseStudyData | null;
}

/** Proiect din sectiunea "Open-source & lab". href "#" = link inca necompletat. */
export interface LabProjectRow {
  id: string;
  title: string;
  kind_ro: string;
  kind_en: string;
  description_ro: string;
  description_en: string;
  href: string;
}

/** Articolele de blog sunt doar in romana (pe /en/blog apar marcate "Romanian"). */
export interface BlogPostRow {
  id: string;
  slug: string;
  title_ro: string;
  excerpt_ro: string;
  content_ro: string;
  cover_image: string | null;
  category: string;
  tags: string[];
  featured: boolean;
  read_time_minutes: number;
  published_at: string | null;
}

/** O optiune din configurator (eticheta in RO si EN, descriere optionala). */
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
