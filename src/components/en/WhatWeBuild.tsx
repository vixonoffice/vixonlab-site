import { ArrowUpRight, Bot, Code2, Layers, Sparkles, type LucideIcon } from 'lucide-react';
import { Link } from '@/components/LocalizedLink';
import { ScrollReveal } from '@/components/ScrollReveal';
import { CHATBOT_FROM_EUR, LANDING_FROM_EUR, TIERS, formatEur } from '@/lib/tiers';

interface Item {
  icon: LucideIcon;
  title: string;
  text: string;
  price: string;
  to?: string;
  span: string;
}

const presentationFrom = TIERS.find((t) => t.key === 'presentation')!.setupEur;
const experienceFrom = TIERS.find((t) => t.key === 'experience')!.setupEur;

const ITEMS: Item[] = [
  {
    icon: Code2,
    title: 'Websites and landing pages',
    text: 'Custom React and Next.js sites styled with Tailwind. Fast on mobile, SEO-ready, built from your design or from ours.',
    price: `From ${presentationFrom} EUR · landing page from ${LANDING_FROM_EUR} EUR`,
    to: '/pricing',
    span: 'md:col-span-4',
  },
  {
    icon: Layers,
    title: 'White-label production',
    text: 'Your tech team for agencies. Your brand, your client; we build whatever they bring, under NDA, no credit, no logo.',
    price: 'Fixed price per project',
    to: '/agencies',
    span: 'md:col-span-2',
  },
  {
    icon: Sparkles,
    title: 'Motion and interaction',
    text: 'GSAP scroll animation, text reveals and page transitions that stay smooth on phones.',
    price: `Part of projects from ${formatEur(experienceFrom, 'en').replace('€', '')} EUR`,
    span: 'md:col-span-2',
  },
  {
    icon: Bot,
    title: 'AI chatbots and automation',
    text: 'A chatbot that answers from your own content, and n8n workflows that take a lead from a form to your CRM to a reply.',
    price: `From ${CHATBOT_FROM_EUR} EUR`,
    span: 'md:col-span-4',
  },
];

/** "What we build" for the English pages: four services, each with a fixed starting price. */
export function WhatWeBuild({ linkAgencies = true }: { linkAgencies?: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-5">
      {ITEMS.map((rawItem, i) => {
        const item = !linkAgencies && rawItem.to === '/agencies' ? { ...rawItem, to: undefined } : rawItem;
        const Icon = item.icon;
        const body = (
          <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-card p-7 md:p-8 transition-all duration-500 hover:border-white/25 spot-card flex flex-col">
            <div className="w-14 h-14 rounded-2xl icon-tile flex items-center justify-center mb-6">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-heading font-semibold text-2xl md:text-3xl text-foreground mb-3 leading-tight">{item.title}</h3>
            <p className="text-base text-muted-foreground leading-relaxed mb-6 max-w-md flex-1">{item.text}</p>
            <p className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-light">
              {item.price}
              {item.to && <ArrowUpRight className="w-4 h-4 shrink-0" />}
            </p>
          </div>
        );
        return (
          <ScrollReveal key={item.title} delay={i * 0.08} className={item.span}>
            {item.to ? (
              <Link to={item.to} className="block h-full">{body}</Link>
            ) : (
              body
            )}
          </ScrollReveal>
        );
      })}
    </div>
  );
}
