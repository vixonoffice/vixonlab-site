import { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePageSEO } from '@/hooks/usePageSEO';
import { PageTransition } from '@/components/PageTransition';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SectionWrapper } from '@/components/SectionWrapper';
import { useTechStack, usePricingPlans } from '@/hooks/useSupabaseData';
import { Check, Zap, Shield, Code, Clock, MessageCircle, Building2, ChevronRight } from 'lucide-react';

const WHATSAPP_NUMBER = '40758840269';

const packageIcons = [Code, Building2, Zap];
const packageGradients = [
  'from-blue-500 to-cyan-500',
  'from-primary to-accent',
  'from-purple-500 to-pink-500',
];

const Services = () => {
  const { t, language } = useLanguage();
  usePageSEO({ title: t('sp.badge'), description: t('sp.subtitle') });

  const { data: techStack } = useTechStack();
  const { data: allPlans } = usePricingPlans();

  const packages = allPlans.filter((p) => p.plan_type !== 'maintenance');
  const maintenancePlan = allPlans.find((p) => p.plan_type === 'maintenance');

  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [addMaintenance, setAddMaintenance] = useState(false);

  const selectedPkg = packages.find((p) => p.id === selectedPackage);

  const estimatedPrice = useMemo(() => {
    if (!selectedPkg) return '';
    const price = language === 'en' ? selectedPkg.price_label_en : selectedPkg.price_label_ro;
    const parts = [price];
    if (addMaintenance && maintenancePlan) {
      const mPrice = language === 'en' ? maintenancePlan.price_label_en : maintenancePlan.price_label_ro;
      parts.push(`+ ${mPrice}`);
    }
    return parts.join(' ');
  }, [selectedPkg, addMaintenance, maintenancePlan, language]);

  const whatsappUrl = useMemo(() => {
    if (!selectedPkg) return '';
    const pkgName = language === 'en' ? selectedPkg.name_en : selectedPkg.name_ro;
    const maintenanceText = addMaintenance && maintenancePlan
      ? (language === 'ro' ? ' + Vixon Care (mentenanță 49€/lună)' : ' + Vixon Care (maintenance 49€/month)')
      : '';
    const message = language === 'ro'
      ? `Salut VixonLab! Sunt interesat de pachetul ${pkgName}${maintenanceText}. Vreau să programăm o discuție pentru afacerea mea. [Preț Estimativ: ${estimatedPrice}]`
      : `Hi VixonLab! I'm interested in the ${pkgName} package${maintenanceText}. I'd like to schedule a discussion for my business. [Estimated Price: ${estimatedPrice}]`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [selectedPkg, addMaintenance, maintenancePlan, estimatedPrice, language]);

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

          {/* USP badges */}
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

      {/* Packages */}
      <SectionWrapper className="!pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {packages.map((pkg, index) => {
            const name = language === 'en' ? pkg.name_en : pkg.name_ro;
            const desc = language === 'en' ? pkg.description_en : pkg.description_ro;
            const price = language === 'en' ? pkg.price_label_en : pkg.price_label_ro;
            const features = language === 'en' ? pkg.features_en : pkg.features_ro;
            const isSelected = selectedPackage === pkg.id;
            const Icon = packageIcons[index] || Code;
            const gradient = packageGradients[index] || packageGradients[0];

            return (
              <ScrollReveal key={pkg.id}>
                <div
                  className={`glass-card p-8 relative cursor-pointer transition-all duration-300 ${
                    pkg.is_popular ? 'lg:scale-105 shadow-xl shadow-primary/10' : ''
                  } ${
                    isSelected
                      ? 'border-primary/60 ring-2 ring-primary/30'
                      : pkg.is_popular
                        ? 'border-primary/40'
                        : 'hover:border-white/20'
                  }`}
                  onClick={() => setSelectedPackage(pkg.id)}
                >
                  {pkg.is_popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="gradient-primary text-white text-xs font-medium px-4 py-1 rounded-full">
                        {t('sp.popular')}
                      </span>
                    </div>
                  )}

                  {/* Radio indicator */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected ? 'border-primary bg-primary' : 'border-white/20'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                  </div>

                  <h3 className="font-heading font-bold text-xl text-foreground mb-2">{name}</h3>
                  <p className="text-sm text-muted-foreground mb-6">{desc}</p>

                  <div className="font-heading font-bold text-3xl gradient-text mb-8">{price}</div>

                  <div className="space-y-3 mb-6">
                    {features.map((f) => (
                      <div key={f} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-primary-light" />
                        </div>
                        <span className="text-sm text-foreground">{f}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPackage(pkg.id);
                    }}
                    className={`w-full text-center font-medium py-3 rounded-2xl transition-all ${
                      isSelected
                        ? 'gradient-primary text-white hover:opacity-90'
                        : 'border border-white/10 text-foreground hover:bg-white/5'
                    }`}
                  >
                    {isSelected ? (language === 'ro' ? 'Selectat' : 'Selected') : (language === 'ro' ? 'Selectează' : 'Select')}
                  </button>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </SectionWrapper>

      {/* Maintenance Card */}
      {maintenancePlan && (
        <SectionWrapper className="!pt-0">
          <ScrollReveal>
            <div
              className={`glass-card p-8 max-w-2xl mx-auto cursor-pointer transition-all duration-300 ${
                addMaintenance ? 'border-primary/60 ring-2 ring-primary/30' : 'hover:border-white/20'
              }`}
              onClick={() => setAddMaintenance(!addMaintenance)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl text-foreground">
                      {language === 'en' ? maintenancePlan.name_en : maintenancePlan.name_ro}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {language === 'en' ? maintenancePlan.description_en : maintenancePlan.description_ro}
                    </p>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all shrink-0 mt-1 ${
                  addMaintenance ? 'border-primary bg-primary' : 'border-white/20'
                }`}>
                  {addMaintenance && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
              </div>

              <div className="font-heading font-bold text-2xl gradient-text mb-6">
                {language === 'en' ? maintenancePlan.price_label_en : maintenancePlan.price_label_ro}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(language === 'en' ? maintenancePlan.features_en : maintenancePlan.features_ro).map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-green-400" />
                    </div>
                    <span className="text-sm text-foreground">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </SectionWrapper>
      )}

      {/* Configurator / WhatsApp CTA */}
      <SectionWrapper id="configurator">
        <ScrollReveal>
          <div className="glass-card p-8 md:p-12 max-w-2xl mx-auto text-center">
            <MessageCircle className="w-10 h-10 text-green-400 mx-auto mb-4" />
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-2">
              {t('sp.selectTitle')}
            </h2>
            <p className="text-muted-foreground mb-8">{t('sp.selectSubtitle')}</p>

            {/* Summary */}
            {selectedPkg ? (
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-left">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">{t('sp.selectedPackage')}</p>
                    <p className="font-heading font-bold text-foreground">
                      {language === 'en' ? selectedPkg.name_en : selectedPkg.name_ro}
                    </p>
                  </div>
                  <p className="font-heading font-bold gradient-text">
                    {language === 'en' ? selectedPkg.price_label_en : selectedPkg.price_label_ro}
                  </p>
                </div>

                {addMaintenance && maintenancePlan && (
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-left">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Vixon Care</p>
                      <p className="font-heading font-bold text-foreground">
                        {language === 'en' ? maintenancePlan.name_en : maintenancePlan.name_ro}
                      </p>
                    </div>
                    <p className="font-heading font-bold text-green-400">
                      {language === 'en' ? maintenancePlan.price_label_en : maintenancePlan.price_label_ro}
                    </p>
                  </div>
                )}

                <div className="pt-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{t('sp.estimatedPrice')}</p>
                  <p className="font-heading font-bold text-2xl gradient-text">{estimatedPrice}</p>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-xl bg-white/5 border border-dashed border-white/10 mb-8">
                <p className="text-muted-foreground">{t('sp.noSelection')}</p>
              </div>
            )}

            {/* WhatsApp Button */}
            {selectedPkg ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all hover:scale-105"
              >
                <MessageCircle className="w-6 h-6" />
                {t('sp.sendWhatsapp')}
                <ChevronRight className="w-5 h-5" />
              </a>
            ) : (
              <div className="inline-flex items-center gap-3 bg-white/10 text-muted-foreground font-medium px-8 py-4 rounded-2xl text-lg cursor-not-allowed">
                <MessageCircle className="w-6 h-6" />
                {t('sp.noSelection')}
              </div>
            )}
          </div>
        </ScrollReveal>
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

              {/* What you get */}
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
                  : 'Hi VixonLab! I\'m interested in your services. I\'d like to schedule a discussion.'
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
