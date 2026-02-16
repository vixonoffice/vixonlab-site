import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePageSEO } from '@/hooks/usePageSEO';
import { PageTransition } from '@/components/PageTransition';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SectionWrapper } from '@/components/SectionWrapper';
import { Check } from 'lucide-react';

const Pricing = () => {
  const { t } = useLanguage();
  usePageSEO({ title: t('pricing.badge'), description: t('pricing.subtitle') });

  const plans = [
    {
      name: t('pricing.starter'),
      desc: t('pricing.starterDesc'),
      price: t('pricing.starterPrice'),
      features: t('pricing.starterFeatures').split('|'),
      cta: t('pricing.starterCta'),
      popular: false,
    },
    {
      name: t('pricing.professional'),
      desc: t('pricing.professionalDesc'),
      price: t('pricing.professionalPrice'),
      features: t('pricing.professionalFeatures').split('|'),
      cta: t('pricing.professionalCta'),
      popular: true,
    },
    {
      name: t('pricing.ecommerce'),
      desc: t('pricing.ecommerceDesc'),
      price: t('pricing.ecommercePrice'),
      features: t('pricing.ecommerceFeatures').split('|'),
      cta: t('pricing.ecommerceCta'),
      popular: false,
    },
  ];

  return (
    <PageTransition>
      <section className="section-padding pt-32 pb-16">
        <div className="mx-auto max-w-content">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 mb-6">
            <span className="text-sm text-primary-light">{t('pricing.badge')}</span>
          </div>
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">{t('pricing.title')}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">{t('pricing.subtitle')}</p>
        </div>
      </section>

      <SectionWrapper className="!pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <ScrollReveal key={plan.name}>
              <div className={`glass-card p-8 relative ${plan.popular ? 'md:scale-105 border-primary/40 shadow-xl shadow-primary/10' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="gradient-primary text-white text-xs font-medium px-4 py-1 rounded-full">
                      {t('pricing.popular')}
                    </span>
                  </div>
                )}
                <h3 className="font-heading font-bold text-xl text-foreground mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-6">{plan.desc}</p>
                <div className="font-heading font-bold text-3xl gradient-text mb-8">{plan.price}</div>
                <div className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-primary-light" />
                      </div>
                      <span className="text-sm text-foreground">{f}</span>
                    </div>
                  ))}
                </div>
                <Link
                  to="/contact"
                  className={`block text-center font-medium py-3 rounded-2xl transition-all ${
                    plan.popular
                      ? 'gradient-primary text-white hover:opacity-90'
                      : 'border border-white/10 text-foreground hover:bg-white/5'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* Custom CTA */}
      <SectionWrapper>
        <ScrollReveal>
          <div className="glass-card p-10 md:p-16 text-center max-w-3xl mx-auto">
            <h2 className="font-heading font-bold text-3xl md:text-4xl gradient-text mb-4">{t('pricing.customTitle')}</h2>
            <p className="text-muted-foreground mb-8">{t('pricing.customDesc')}</p>
            <Link to="/contact" className="gradient-primary text-white font-medium px-8 py-3.5 rounded-2xl inline-block hover:opacity-90 transition-opacity">
              {t('pricing.customCta')}
            </Link>
          </div>
        </ScrollReveal>
      </SectionWrapper>
    </PageTransition>
  );
};

export default Pricing;
