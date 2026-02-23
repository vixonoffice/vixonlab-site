import { useLanguage } from '@/contexts/LanguageContext';
import { usePageSEO } from '@/hooks/usePageSEO';
import { PageTransition } from '@/components/PageTransition';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SectionWrapper } from '@/components/SectionWrapper';
import { useTechStack } from '@/hooks/useSupabaseData';
import { useConfigurator } from '@/components/configurator/useConfigurator';
import { PackageStep } from '@/components/configurator/PackageStep';
import { ExtraPagesStep } from '@/components/configurator/ExtraPagesStep';
import { AddOnsStep } from '@/components/configurator/AddOnsStep';
import { MaintenanceStep } from '@/components/configurator/MaintenanceStep';
import { ConfigSummary } from '@/components/configurator/ConfigSummary';
import { Check, Clock, Code, Zap, MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '40758840269';

const Services = () => {
  const { t, language } = useLanguage();
  usePageSEO({ title: t('sp.badge'), description: t('sp.subtitle') });

  const { data: techStack } = useTechStack();
  const {
    packages, addons, maintenancePlans, loading,
    state, dispatch,
    selectedPkg, packageMeta,
    totalPrice, monthlyPrice, summaryLines, whatsappUrl,
  } = useConfigurator();

  if (loading) {
    return (
      <PageTransition>
        <section className="section-padding pt-32 pb-16">
          <div className="mx-auto max-w-content">
            <div className="h-8 w-48 bg-white/5 rounded-lg animate-pulse mb-4" />
            <div className="h-12 w-96 bg-white/5 rounded-lg animate-pulse mb-4" />
            <div className="h-6 w-72 bg-white/5 rounded-lg animate-pulse" />
          </div>
        </section>
      </PageTransition>
    );
  }

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

      {/* Configurator */}
      <SectionWrapper className="!pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Steps — 2/3 */}
          <div className="lg:col-span-2 space-y-12">
            {/* Step 1: Packages */}
            <PackageStep
              packages={packages}
              selectedId={state.packageId}
              onSelect={(id) => dispatch({ type: 'SET_PACKAGE', id })}
            />

            {/* Step 2: Extra Pages (only for packages with extra_pages) */}
            {selectedPkg && packageMeta?.extra_pages && (
              <ExtraPagesStep
                extraPages={state.extraPages}
                maxPages={packageMeta.max_pages}
                onChange={(count) => dispatch({ type: 'SET_EXTRA_PAGES', count })}
              />
            )}

            {/* Step 3: Add-ons (only after package selection) */}
            {selectedPkg && addons.length > 0 && (
              <AddOnsStep
                addons={addons}
                selectedSlugs={state.selectedAddons}
                onToggle={(slug) => dispatch({ type: 'TOGGLE_ADDON', slug })}
              />
            )}

            {/* Step 4: Maintenance */}
            {selectedPkg && maintenancePlans.length > 0 && (
              <MaintenanceStep
                plans={maintenancePlans}
                selectedId={state.maintenanceId}
                onSelect={(id) => dispatch({ type: 'SET_MAINTENANCE', id })}
              />
            )}
          </div>

          {/* Summary — 1/3 */}
          <div className="hidden lg:block">
            <ConfigSummary
              summaryLines={summaryLines}
              totalPrice={totalPrice}
              monthlyPrice={monthlyPrice}
              whatsappUrl={whatsappUrl}
              hasSelection={!!selectedPkg}
            />
          </div>
        </div>
      </SectionWrapper>

      {/* Mobile summary bar */}
      <div className="lg:hidden">
        <ConfigSummary
          summaryLines={summaryLines}
          totalPrice={totalPrice}
          monthlyPrice={monthlyPrice}
          whatsappUrl={whatsappUrl}
          hasSelection={!!selectedPkg}
        />
      </div>

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

      {/* Spacer for mobile bottom bar */}
      <div className="lg:hidden h-20" />
    </PageTransition>
  );
};

export default Services;
