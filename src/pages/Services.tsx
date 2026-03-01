import { useLanguage } from '@/contexts/LanguageContext';
import { usePageSEO } from '@/hooks/usePageSEO';
import { PageTransition } from '@/components/PageTransition';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SectionWrapper } from '@/components/SectionWrapper';
import { useTechStack } from '@/hooks/useSupabaseData';
import { lazy, Suspense } from 'react';
const ConfiguratorStepper = lazy(() => import('@/components/configurator/ConfiguratorStepper').then(m => ({ default: m.ConfiguratorStepper })));
import { Check, Clock, Code, Zap, MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '40758840269';

const Services = () => {
  const { t, language } = useLanguage();
  usePageSEO({ title: t('sp.badge'), description: t('sp.subtitle') });

  const { data: techStack } = useTechStack();

  return (
    <PageTransition>
      {/* Hero */}
      <section className="section-padding pt-32 pb-16">
        <div className="mx-auto max-w-content">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 mb-6">
            <span className="text-sm text-primary-light">{t('sp.badge')}</span>
          </div>
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            {t('sp.title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-8">
            {t('sp.subtitle')}
          </p>

          <div className="flex flex-wrap gap-3">
            {[
              { icon: Clock, text: t('sp.delivery') },
              { icon: Code, text: t('sp.customCode') },
              { icon: Zap, text: t('sp.allInOne') },
            ].map((item) => (
              <div key={item.text} className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-2">
                <item.icon className="w-4 h-4 text-primary-light" />
                <span className="text-sm font-medium text-primary-light">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Configurator Stepper */}
      <SectionWrapper className="!pt-8">
        <div className="max-w-3xl mx-auto">
          <Suspense fallback={<div className="space-y-4">{[1,2,3].map(i => <div key={i} className="h-48 bg-white/5 rounded-2xl animate-pulse" />)}</div>}>
            <ConfiguratorStepper />
          </Suspense>
        </div>
      </SectionWrapper>

      {/* Why Custom Code */}
      <section className="section-padding section-spacing bg-background-secondary/30">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-primary-light text-sm font-medium uppercase tracking-widest mb-3">{t('why.label')}</p>
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
                  {t('sp.whyCustom')}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {t('sp.whyCustomDesc')}
                </p>
                <div className="space-y-4">
                  {[t('sp.whyCustom1'), t('sp.whyCustom2'), t('sp.whyCustom3'), t('sp.whyCustom4')].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-primary-light" />
                      </div>
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-8">
                <h3 className="font-heading font-bold text-xl text-foreground mb-6">{t('sp.whatYouGet')}</h3>
                <div className="space-y-4">
                  {[t('sp.benefit1'), t('sp.benefit2'), t('sp.benefit3'), t('sp.benefit4'), t('sp.benefit5')].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-primary-light" />
                      </div>
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Tech Stack */}
      <SectionWrapper>
        <ScrollReveal>
          <p className="text-primary-light text-sm font-medium uppercase tracking-widest mb-3">{t('servicesPage.techLabel')}</p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-10">{t('servicesPage.techTitle')}</h2>
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech) => (
              <span key={tech.id} className="glass-card px-5 py-2.5 text-sm font-medium text-foreground">{tech.name}</span>
            ))}
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* Final CTA */}
      <SectionWrapper>
        <ScrollReveal>
          <div className="glass-card p-10 md:p-16 text-center max-w-3xl mx-auto">
            <h2 className="font-heading font-bold text-3xl md:text-4xl gradient-text mb-4">{t('sp.ctaTitle')}</h2>
            <p className="text-muted-foreground mb-8">{t('sp.ctaSubtitle')}</p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                language === 'ro'
                  ? 'Salut VixonLab! Sunt interesat de serviciile voastre. Vreau să programăm o discuție.'
                  : "Hi VixonLab! I'm interested in your services. I'd like to schedule a discussion."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all hover:scale-105"
            >
              <MessageCircle className="w-6 h-6" />
              {t('sp.ctaButton')}
            </a>
          </div>
        </ScrollReveal>
      </SectionWrapper>
    </PageTransition>
  );
};

export default Services;
