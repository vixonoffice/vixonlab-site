import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePageSEO } from '@/hooks/usePageSEO';
import { PageTransition } from '@/components/PageTransition';
import { ScrollReveal } from '@/components/ScrollReveal';
import { PageHero } from '@/components/PageHero';
import { Check, MessageCircle, Shield, Sparkles, ArrowUpRight, Zap, Briefcase, Wand2, Wrench, type LucideIcon } from 'lucide-react';
import {
  TIERS,
  getAnnualPrice,
  getAnnualSavings,
  formatEur,
  buildTierWaUrl,
  type BillingPeriod,
  type Tier,
} from '@/lib/tiers';

const tierIcon: Record<Tier['key'], LucideIcon> = {
  presentation: Zap,
  business: Briefcase,
  experience: Wand2,
  custom: Wrench,
};

const Pricing = () => {
  const { t, language } = useLanguage();
  const isRo = language === 'ro';
  const [billing, setBilling] = useState<BillingPeriod>('annual');

  usePageSEO({
    title: isRo ? 'Prețuri · Site-uri de la 350€ + mentenanță' : 'Pricing · Websites from 350€ + maintenance',
    description: isRo
      ? 'Site profesional de la 350€, plătit o singură dată, plus mentenanță de la 15€/lună: hosting, SSL, domeniu, backup și modificări incluse.'
      : 'Professional website from 350€, paid once, plus maintenance from 15€/month: hosting, SSL, domain, backups and edits included.',
  });

  const commonItems = [
    t('tier.common1'), t('tier.common2'), t('tier.common3'),
    t('tier.common4'), t('tier.common5'), t('tier.common6'),
  ];

  const faqs = [
    { q: t('tier.faq.q1'), a: t('tier.faq.a1') },
    { q: t('tier.faq.q2'), a: t('tier.faq.a2') },
    { q: t('tier.faq.q3'), a: t('tier.faq.a3') },
    { q: t('tier.faq.q4'), a: t('tier.faq.a4') },
    { q: t('tier.faq.q5'), a: t('tier.faq.a5') },
    { q: t('tier.faq.q6'), a: t('tier.faq.a6') },
  ];

  return (
    <PageTransition>
      <PageHero
        badge={t('tier.badge')}
        title={t('tier.title1')}
        titleAccent={t('tier.title2')}
        subtitle={t('tier.subtitle')}
      >
        {/* Monthly / Annual toggle (maintenance billing) */}
        <p className="text-sm text-muted-foreground mb-3">{isRo ? 'Plata mentenanței:' : 'Maintenance billing:'}</p>
        <div className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 backdrop-blur-md p-1">
          <button
            onClick={() => setBilling('monthly')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              billing === 'monthly'
                ? 'bg-foreground text-background shadow-lg'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t('tier.monthly')}
          </button>
          <button
            onClick={() => setBilling('annual')}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all ${
              billing === 'annual'
                ? 'bg-foreground text-background shadow-lg'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t('tier.annual')}
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold whitespace-nowrap">
              {t('tier.annualBadge')}
            </span>
          </button>
        </div>
        {billing === 'annual' && (
          <p className="mt-4 text-sm text-green-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            {isRo ? 'Plătești 10 luni de mentenanță, primești 12' : 'Pay for 10 months of maintenance, get 12'}
          </p>
        )}
      </PageHero>

      {/* Tier cards */}
      <section className="section-padding pb-16">
        <div className="mx-auto max-w-content">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
            {TIERS.map((tier, i) => {
              const annualPrice = getAnnualPrice(tier.monthlyEur);
              const savings = getAnnualSavings(tier.monthlyEur);
              const featuresKey = `tier.${tier.key}.features` as const;
              const features = t(featuresKey).split('|');
              const name = t(`tier.${tier.key}.name` as const);
              const tagline = t(`tier.${tier.key}.tagline` as const);
              const isPopular = tier.popular;

              return (
                <ScrollReveal key={tier.key} delay={i * 0.08}>
                  <div className={`relative h-full flex flex-col rounded-2xl border backdrop-blur-md p-7 overflow-hidden transition-all duration-500 ${
                    isPopular
                      ? 'border-primary-light/40 bg-card-hover'
                      : 'border-white/15 bg-card hover:border-white/25'
                  }`}>
                    {isPopular && (
                      <>
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap z-10">
                          <span className="bg-foreground text-background text-xs font-bold px-4 py-1.5 rounded-lg">
                            {t('tier.popular')}
                          </span>
                        </div>
                      </>
                    )}

                    <div className="relative flex flex-col h-full">
                      {(() => {
                        const Icon = tierIcon[tier.key];
                        return (
                          <div className={`w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/10 mb-5 flex items-center justify-center`}>
                            <Icon className="w-6 h-6 text-primary-light" />
                          </div>
                        );
                      })()}
                      <h3 className="font-heading font-bold text-2xl text-foreground mb-2">{name}</h3>
                      <p className="text-sm text-muted-foreground mb-6 leading-relaxed min-h-[2.5rem]">{tagline}</p>

                      {/* Price: site (one-time) + maintenance */}
                      <div className="flex items-baseline gap-1.5">
                        {tier.startingFrom && (
                          <span className="text-sm text-muted-foreground">{t('tier.from')}</span>
                        )}
                        <span className="font-heading font-bold text-5xl text-foreground leading-none">
                          {formatEur(tier.setupEur)}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground mt-2 mb-4">{t('tier.setupFree')}</span>

                      <div className="rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-3 mb-6">
                        <div className="text-sm">
                          <span className="text-muted-foreground">{t('tier.plusMaintenance')} </span>
                          <span className="font-semibold text-foreground whitespace-nowrap">
                            {tier.startingFrom ? `${t('tier.from')} ` : ''}
                            {billing === 'monthly'
                              ? `${tier.monthlyEur}€${t('tier.month')}`
                              : `${annualPrice}€${t('tier.year')}`}
                          </span>
                        </div>
                        {billing === 'annual' && savings > 0 && (
                          <div className="text-xs text-emerald-400 mt-1">
                            {t('tier.savePerYear').replace('{x}', String(savings))}
                          </div>
                        )}
                      </div>

                      {/* Features */}
                      <ul className="space-y-3 mb-7 flex-1">
                        {features.map((feature, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <Check className="w-4 h-4 text-primary-light shrink-0 mt-0.5" />
                            <span className="text-sm text-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* "For:" hint */}
                      <p className="text-xs text-muted-foreground mb-5">
                        <span className="font-semibold">{t('tier.forLabel')}</span> {isRo ? tier.recommendedFor.ro : tier.recommendedFor.en}
                      </p>

                      <a
                        href={buildTierWaUrl(tier.key, billing, language as 'ro' | 'en')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center gap-2 font-medium px-6 py-3.5 rounded-lg transition-all text-center ${
                          isPopular
                            ? 'bg-foreground text-background hover:opacity-90'
                            : 'border border-white/15 bg-white/5 text-foreground hover:bg-white/10'
                        }`}
                      >
                        <MessageCircle className="w-4 h-4" />
                        {t('tier.cta')}
                      </a>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Common to all plans */}
      <section className="section-padding section-spacing border-t border-white/10">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <div className="rounded-2xl border border-green-400/20 bg-green-400/[0.03] backdrop-blur-sm p-8 md:p-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-400" />
                </div>
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground">
                  {t('tier.commonTitle')}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {commonItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-green-400" />
                    </div>
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding section-spacing">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <p className="text-primary-light text-sm font-medium uppercase tracking-widest mb-6">FAQ</p>
            <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-[0.95] mb-16">
              <span className="text-foreground">
                {isRo ? 'Întrebări frecvente' : 'Frequently asked questions'}
              </span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {faqs.map((item, i) => (
              <ScrollReveal key={i} delay={(i % 4) * 0.06}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-7 h-full hover:border-white/20 transition-colors">
                  <h3 className="font-heading font-bold text-xl text-foreground mb-3">{item.q}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.a}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA full bleed */}
      <section className="relative section-padding py-32 md:py-44 overflow-hidden border-t border-white/10">

        <ScrollReveal className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-8">
            <span className="text-foreground">{t('tier.ctaTitle1')} </span>
            <span className="gradient-text">{t('tier.ctaTitle2')}</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            {t('tier.ctaSubtitle')}
          </p>
          <Link
            to="/contact"
            className="bg-foreground text-background font-medium px-10 py-4 rounded-lg inline-flex items-center gap-3 text-lg hover:opacity-90 transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            {t('tier.ctaButton')}
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </ScrollReveal>
      </section>
    </PageTransition>
  );
};

export default Pricing;
