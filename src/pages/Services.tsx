import { useLanguage } from '@/contexts/LanguageContext';
import { usePageSEO } from '@/hooks/usePageSEO';
import { PageTransition } from '@/components/PageTransition';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SectionWrapper } from '@/components/SectionWrapper';
import { lazy, Suspense } from 'react';
const ConfiguratorStepper = lazy(() => import('@/components/configurator/ConfiguratorStepper').then(m => ({ default: m.ConfiguratorStepper })));
import { Check, Clock, Code, Zap } from 'lucide-react';

const Services = () => {
  const { t, language } = useLanguage();
  usePageSEO({ title: t('sp.badge'), description: t('sp.subtitle') });

  const isRo = language === 'ro';

  return (
    <PageTransition>
      {/* Hero */}
      <section className="section-padding pt-32 pb-16">
        <div className="mx-auto max-w-content">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 mb-6">
            <span className="dot-green" />
            <span className="text-sm text-primary-light">{isRo ? 'Configurator de proiect' : 'Project Configurator'}</span>
          </div>
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            {isRo ? 'Configureaza-ti site-ul ideal' : 'Configure your ideal website'}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-8">
            {isRo
              ? 'Raspunde la cateva intrebari si primesti o oferta personalizata in mai putin de 24h. Fara obligatii.'
              : 'Answer a few questions and get a personalized offer in less than 24h. No obligations.'}
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
      <section className="section-padding section-spacing bg-background-alt">
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

      {/* What's included / What's not — clarity section */}
      <SectionWrapper>
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="glass-card p-6">
              <h3 className="font-heading font-bold text-lg text-green-400 mb-4">
                {isRo ? 'Ce include mentenanta' : 'What maintenance includes'}
              </h3>
              <div className="space-y-2.5">
                {(isRo
                  ? ['Hosting premium cloud', 'Certificat SSL gratuit', 'Backup zilnic automat', 'Update-uri de securitate', 'Monitorizare 24/7', 'Modificari texte si poze', 'Suport pe email/WhatsApp']
                  : ['Premium cloud hosting', 'Free SSL certificate', 'Daily automatic backup', 'Security updates', '24/7 monitoring', 'Text and image modifications', 'Email/WhatsApp support']
                ).map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-green-400 shrink-0" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card p-6">
              <h3 className="font-heading font-bold text-lg text-muted-foreground mb-4">
                {isRo ? 'Ce NU include (se tarifeaza separat)' : 'What is NOT included (charged separately)'}
              </h3>
              <div className="space-y-2.5">
                {(isRo
                  ? ['Redesign complet al site-ului', 'Functionalitati noi complexe', 'Pagini noi cu design custom', 'Integrari externe noi', 'Migrare la alt domeniu/hosting', 'Campanii de marketing active']
                  : ['Complete site redesign', 'New complex features', 'New pages with custom design', 'New external integrations', 'Domain/hosting migration', 'Active marketing campaigns']
                ).map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <span className="w-4 h-4 rounded-full border border-white/20 shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                {isRo
                  ? 'Fiecare modificare majora se estimeaza si se aproba de tine inainte.'
                  : 'Every major modification is estimated and approved by you first.'}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </SectionWrapper>
    </PageTransition>
  );
};

export default Services;
