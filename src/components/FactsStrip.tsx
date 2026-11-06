import { useLanguage } from '@/contexts/LanguageContext';
import { ScrollReveal } from '@/components/ScrollReveal';
import { FACTS } from '@/data/staticData';

/** Cifre mari, dar doar fapte reale (vezi FACTS in src/data/staticData.ts). */
export function FactsStrip({ variant = 'wide' }: { variant?: 'wide' | 'compact' }) {
  const { language } = useLanguage();
  const isEn = language === 'en';

  if (variant === 'compact') {
    return (
      <div className="grid grid-cols-2 gap-x-6 gap-y-10">
        {FACTS.map((fact, i) => (
          <ScrollReveal key={fact.id} delay={i * 0.08}>
            <div className="border-l-2 border-primary/40 pl-4">
              <div className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-2 leading-none whitespace-nowrap">
                {isEn ? fact.value_en : fact.value_ro}
              </div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                {isEn ? fact.label_en : fact.label_ro}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-[1.45fr_1fr_1fr_1fr] gap-y-12 md:gap-0 md:divide-x divide-white/10">
      {FACTS.map((fact, i) => (
        <ScrollReveal key={fact.id} delay={i * 0.08}>
          <div className="px-2 md:px-5 lg:px-8 text-left">
            <div className="w-fit font-heading font-bold text-4xl sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl gradient-text mb-3 leading-none whitespace-nowrap">
              {isEn ? fact.value_en : fact.value_ro}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-widest">
              {isEn ? fact.label_en : fact.label_ro}
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
