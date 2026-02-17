import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePageSEO } from '@/hooks/usePageSEO';
import { PageTransition } from '@/components/PageTransition';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SectionWrapper } from '@/components/SectionWrapper';
import { Check } from 'lucide-react';
import { useServices, useTechStack, resolveIcon } from '@/hooks/useSupabaseData';

const Services = () => {
  const { t, language } = useLanguage();
  usePageSEO({ title: t('servicesPage.badge'), description: t('servicesPage.subtitle') });

  const { data: services } = useServices();
  const { data: techStack } = useTechStack();

  return (
    <PageTransition>
      {/* Hero */}
      <section className="section-padding pt-32 pb-16">
        <div className="mx-auto max-w-content">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 mb-6">
            <span className="text-sm text-primary-light">{t('servicesPage.badge')}</span>
          </div>
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">{t('servicesPage.title')}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">{t('servicesPage.subtitle')}</p>
        </div>
      </section>

      {/* Service sections */}
      {services.map((service, index) => {
        const Icon = resolveIcon(service.icon);
        const features = language === 'en' ? service.features_en : service.features_ro;
        return (
          <SectionWrapper key={service.id} id={service.anchor || service.id} className={index % 2 === 1 ? 'bg-background-secondary/30' : ''}>
            <ScrollReveal>
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.icon_gradient} flex items-center justify-center mb-6`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-4">
                    {language === 'en' ? service.title_en : service.title_ro}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {language === 'en' ? service.description_en : service.description_ro}
                  </p>
                  {service.price_label_ro && (
                    <>
                      <p className="text-sm text-muted-foreground mb-1">{t('servicesPage.from')}</p>
                      <p className="font-heading font-bold text-2xl gradient-text mb-6">
                        {language === 'en' ? service.price_label_en : service.price_label_ro}
                      </p>
                    </>
                  )}
                  <Link to="/contact" className="gradient-primary text-white font-medium px-6 py-3 rounded-2xl inline-block hover:opacity-90 transition-opacity">
                    {t('servicesPage.requestQuote')}
                  </Link>
                </div>

                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="glass-card p-6">
                    <div className="space-y-3">
                      {features.map((feature) => (
                        <div key={feature} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 text-primary-light" />
                          </div>
                          <span className="text-sm text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </SectionWrapper>
        );
      })}

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

      {/* CTA */}
      <SectionWrapper>
        <ScrollReveal>
          <div className="glass-card p-10 md:p-16 text-center max-w-3xl mx-auto">
            <h2 className="font-heading font-bold text-3xl md:text-4xl gradient-text mb-4">{t('servicesPage.ctaTitle')}</h2>
            <p className="text-muted-foreground mb-8">{t('servicesPage.ctaSubtitle')}</p>
            <Link to="/contact" className="gradient-primary text-white font-medium px-8 py-3.5 rounded-2xl inline-block hover:opacity-90 transition-opacity">
              {t('servicesPage.ctaButton')}
            </Link>
          </div>
        </ScrollReveal>
      </SectionWrapper>
    </PageTransition>
  );
};

export default Services;
