import { useLanguage } from '@/contexts/LanguageContext';
import { usePageSEO } from '@/hooks/usePageSEO';
import { PageTransition } from '@/components/PageTransition';
import { ScrollReveal } from '@/components/ScrollReveal';
import { PageHero } from '@/components/PageHero';
import { WhatWeBuild } from '@/components/en/WhatWeBuild';
import { lazy, Suspense } from 'react';
const ConfiguratorStepper = lazy(() => import('@/components/configurator/ConfiguratorStepper').then(m => ({ default: m.ConfiguratorStepper })));
import { Check, Clock, Code, Zap, X } from 'lucide-react';

const Services = () => {
  const { t, language } = useLanguage();
  const isRo = language === 'ro';
  usePageSEO({
    title: isRo ? t('sp.badge') : 'Services: websites, white-label, AI chatbots',
    description: isRo
      ? t('sp.subtitle')
      : 'Custom websites from 350 EUR, landing pages from 300 EUR, white-label production, GSAP motion and AI chatbots from 500 EUR. Fixed price per project.',
  });

  return (
    <PageTransition>
      <PageHero
        badge={isRo ? 'Configurator de proiect' : 'Services'}
        title={isRo ? 'Configurează-ți' : 'What we build,'}
        titleAccent={isRo ? 'site-ul ideal' : 'at a fixed price'}
        subtitle={isRo
          ? 'Alege pachetul, spune-ne ce îți trebuie și trimite totul pe WhatsApp. Îți răspundem cu oferta în maxim 24 de ore.'
          : 'Websites, landing pages, white-label production, motion and AI chatbots. One fixed price per project, and a reply within 24 hours.'}
      >
        <div className="flex flex-wrap gap-3">
          {[
            { icon: Clock, text: t('sp.delivery') },
            { icon: Code,  text: t('sp.customCode') },
            { icon: Zap,   text: t('sp.allInOne') },
          ].map((item) => (
            <div key={item.text}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md px-5 py-2.5">
              <item.icon className="w-4 h-4 text-primary-light" />
              <span className="text-sm font-medium text-primary-light">{item.text}</span>
            </div>
          ))}
        </div>
      </PageHero>

      {!isRo && (
        <section className="section-padding pb-20">
          <div className="mx-auto max-w-content">
            <WhatWeBuild />
          </div>
        </section>
      )}

      {/* Configurator */}
      <section className="section-padding pb-24">
        <div className="max-w-3xl mx-auto">
          {!isRo && (
            <div className="mb-10 text-center">
              <p className="text-primary-light text-sm font-medium uppercase tracking-widest mb-3">Project configurator</p>
              <h2 className="font-heading font-bold text-3xl md:text-5xl text-foreground leading-tight">Build your brief in a minute</h2>
              <p className="mt-3 text-muted-foreground">Pick a package and what you need. We turn it into a message you send us on WhatsApp.</p>
            </div>
          )}
          <Suspense fallback={
            <div className="space-y-4">
              {[1,2,3].map(i => <div key={i} className="h-48 bg-white/5 rounded-2xl animate-pulse" />)}
            </div>
          }>
            <ConfiguratorStepper />
          </Suspense>
        </div>
      </section>

      {/* Why Custom Code — split layout */}
      <section className="section-padding section-spacing border-t border-white/10">
        <div className="mx-auto max-w-content">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <ScrollReveal className="lg:col-span-7">
              <p className="text-primary-light text-sm font-medium uppercase tracking-widest mb-6">
                {t('why.label')}
              </p>
              <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-6">
                <span className="text-foreground">{t('sp.whyCustom')}</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl">
                {t('sp.whyCustomDesc')}
              </p>
              <div className="space-y-5">
                {[t('sp.whyCustom1'), t('sp.whyCustom2'), t('sp.whyCustom3'), t('sp.whyCustom4')].map((item, i) => (
                  <ScrollReveal key={item} delay={i * 0.08}>
                    <div className="flex items-start gap-4 border-l-2 border-primary/40 pl-5 py-1">
                      <span className="text-lg text-foreground">{item}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal className="lg:col-span-5 lg:pt-16">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-sm p-8 md:p-10">
                <div className="relative">
                  <h3 className="font-heading font-bold text-2xl text-foreground mb-8">{t('sp.whatYouGet')}</h3>
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
        </div>
      </section>

      {/* What's included / not */}
      <section className="section-padding section-spacing">
        <div className="mx-auto max-w-content">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <ScrollReveal>
              <div className="h-full rounded-2xl border border-green-400/20 bg-green-400/[0.03] backdrop-blur-sm p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-green-400/20 flex items-center justify-center">
                    <Check className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-green-400">
                    {isRo ? 'Ce include mentenanța' : 'What maintenance includes'}
                  </h3>
                </div>
                <div className="space-y-3">
                  {(isRo
                    ? ['Hosting + certificat SSL','Reînnoirea domeniului','Backup și update-uri de securitate','1 oră de modificări pe lună (2 la Custom)','Suport pe WhatsApp, răspuns în 2 zile lucrătoare','Modificări peste ora inclusă: 25€/oră']
                    : ['Hosting + SSL certificate','Domain renewal','Backups and security updates','1 hour of edits per month (2 on Custom)','WhatsApp support, reply within 2 business days','Edits beyond the included hour: 25€/hour']
                  ).map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-green-400 shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <X className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-muted-foreground">
                    {isRo ? 'Ce NU include' : 'What is NOT included'}
                  </h3>
                </div>
                <div className="space-y-3">
                  {(isRo
                    ? ['Redesign complet al site-ului','Funcționalități noi complexe','Pagini noi cu design custom','Integrări externe noi','Migrare la alt domeniu/hosting','Campanii de marketing active']
                    : ['Complete site redesign','New complex features','New pages with custom design','New external integrations','Domain/hosting migration','Active marketing campaigns']
                  ).map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="w-4 h-4 rounded-full border border-white/20 shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-6 italic">
                  {isRo
                    ? 'Fiecare modificare majoră se estimează și se aprobă de tine înainte.'
                    : 'Every major modification is estimated and approved by you first.'}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Services;
