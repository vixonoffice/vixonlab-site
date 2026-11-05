// Tipurile datelor statice ale site-ului (fostele randuri din baza de date).

export interface StatRow {
  id: string;
  value: string;
  label_ro: string;
  label_en: string;
  sort_order: number;
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
  price_label_ro: string | null;
  price_label_en: string | null;
  anchor: string | null;
}

export interface TestimonialRow {
  id: string;
  sort_order: number;
  quote_ro: string;
  quote_en: string;
  author_name: string;
  author_role: string;
  author_initial: string;
  avatar_gradient: string;
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
  name: string;
  sort_order: number;
}

export interface CaseStudyData {
  price: string;
  duration: string;
  durationEn: string;
  year: string;
  challenge: string;
  challengeEn: string;
  solution: string;
  solutionEn: string;
  process: string;
  processEn: string;
  results: { value: string; label: string; labelEn: string }[];
  deliverables: string[];
  deliverablesEn: string[];
  features: string[];
  featuresEn: string[];
  testimonial: { quote: string; quoteEn: string; name: string; role: string };
}

export interface PortfolioProjectRow {
  id: string;
  sort_order: number;
  category: string;
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

export interface BlogPostRow {
  id: string;
  slug: string;
  title_ro: string;
  title_en: string;
  excerpt_ro: string;
  excerpt_en: string;
  content_ro: string;
  content_en: string;
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
