import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { LucideIcon } from 'lucide-react';
import { Code, ShoppingCart, Palette, BarChart3 } from 'lucide-react';

// Icon resolver — maps DB string names to Lucide components
const iconMap: Record<string, LucideIcon> = {
  code: Code,
  'shopping-cart': ShoppingCart,
  palette: Palette,
  'bar-chart-3': BarChart3,
};

// Gradient resolver — maps DB gradient strings (already Tailwind classes)
export function resolveIcon(name: string): LucideIcon {
  return iconMap[name] || Code;
}

// ---------- useStats ----------
export interface StatRow {
  id: string;
  value: string;
  label_ro: string;
  label_en: string;
  sort_order: number;
}

export function useStats() {
  const [data, setData] = useState<StatRow[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from('stats').select('*').order('sort_order')
      .then(({ data }) => { setData((data as StatRow[]) || []); setLoading(false); });
  }, []);
  return { data, loading };
}

// ---------- useServices ----------
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

export function useServices() {
  const [data, setData] = useState<ServiceRow[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from('services').select('*').order('sort_order')
      .then(({ data }) => { setData((data as ServiceRow[]) || []); setLoading(false); });
  }, []);
  return { data, loading };
}

// ---------- useTestimonials ----------
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

export function useTestimonials() {
  const [data, setData] = useState<TestimonialRow[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from('testimonials').select('*').order('sort_order')
      .then(({ data }) => { setData((data as TestimonialRow[]) || []); setLoading(false); });
  }, []);
  return { data, loading };
}

// ---------- useProcessSteps ----------
export interface ProcessStepRow {
  id: string;
  sort_order: number;
  step_number: string;
  title_ro: string;
  title_en: string;
  description_ro: string;
  description_en: string;
}

export function useProcessSteps() {
  const [data, setData] = useState<ProcessStepRow[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from('process_steps').select('*').order('sort_order')
      .then(({ data }) => { setData((data as ProcessStepRow[]) || []); setLoading(false); });
  }, []);
  return { data, loading };
}

// ---------- useTechStack ----------
export interface TechRow {
  id: string;
  name: string;
  sort_order: number;
}

export function useTechStack() {
  const [data, setData] = useState<TechRow[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from('tech_stack').select('*').order('sort_order')
      .then(({ data }) => { setData((data as TechRow[]) || []); setLoading(false); });
  }, []);
  return { data, loading };
}

// ---------- usePricingPlans ----------
export interface PricingPlanRow {
  id: string;
  sort_order: number;
  name_ro: string;
  name_en: string;
  price_label_ro: string;
  price_label_en: string;
  description_ro: string;
  description_en: string;
  features_ro: string[];
  features_en: string[];
  is_popular: boolean;
  cta_label_ro: string;
  cta_label_en: string;
}

export function usePricingPlans() {
  const [data, setData] = useState<PricingPlanRow[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from('pricing_plans').select('*').order('sort_order')
      .then(({ data }) => { setData((data as PricingPlanRow[]) || []); setLoading(false); });
  }, []);
  return { data, loading };
}

// ---------- usePortfolioProjects ----------
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

export function usePortfolioProjects() {
  const [data, setData] = useState<PortfolioProjectRow[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from('portfolio_projects').select('*').order('sort_order')
      .then(({ data }) => { setData((data as PortfolioProjectRow[]) || []); setLoading(false); });
  }, []);
  return { data, loading };
}

// ---------- useSiteContent ----------
export interface SiteContentRow {
  id: string;
  section: string;
  key: string;
  value_ro: string;
  value_en: string;
}

export function useSiteContent(section: string) {
  const [data, setData] = useState<SiteContentRow[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from('site_content').select('*').eq('section', section)
      .then(({ data }) => { setData((data as SiteContentRow[]) || []); setLoading(false); });
  }, [section]);

  function c(key: string, lang: string): string {
    const row = data.find((r) => r.key === key);
    if (!row) return '';
    return lang === 'en' ? row.value_en : row.value_ro;
  }

  return { data, loading, c };
}
