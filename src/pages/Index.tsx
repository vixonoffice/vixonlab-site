import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePageSEO } from '@/hooks/usePageSEO';
import { PageTransition } from '@/components/PageTransition';
import { ScrollReveal } from '@/components/ScrollReveal';
import { MagneticButton } from '@/components/MagneticButton';
import { TiltCard } from '@/components/TiltCard';
import { TextRotator } from '@/components/TextRotator';
import { SectionWrapper } from '@/components/SectionWrapper';
import { Zap, Star, Shield, ChevronDown, Utensils, Scissors, HeartPulse, Dumbbell, ShoppingBag, Scale, Car, Home, Laptop, Camera } from 'lucide-react';
import { resolveIcon, STATIC_STATS, STATIC_SERVICES, STATIC_PROCESS_STEPS, STATIC_TESTIMONIALS } from '@/data/staticData';

const Index = () => {
  const { t, language } = useLanguage();
  usePageSEO({ title: t('nav.home'), description: t('hero.subtitle') });

  const stats = STATIC_STATS;
  const services = STATIC_SERVICES;
  const steps = STATIC_PROCESS_STEPS;
  const testimonials = STATIC_TESTIMONIALS;

  const industries = [
    { icon: Utensils, label: language === 'ro' ? 'Restaurante' : 'Restaurants' },
    { icon: Scissors, label: language === 'ro' ? 'Saloane Beauty' : 'Beauty Salons' },
    { icon: HeartPulse, label: language === 'ro' ? 'Cabinete Medicale' : 'Medical Clinics' },
    { icon: Dumbbell, label: language === 'ro' ? 'Fitness & Gym' : 'Fitness & Gym' },
    { icon: ShoppingBag, label: language === 'ro' ? 'Magazine Online' : 'Online Stores' },
    { icon: Scale, label: language === 'ro' ? 'Avocatură' : 'Law Firms' },
    { icon: Car, label: language === 'ro' ? 'Auto & Service' : 'Auto & Service' },
    { icon: Home, label: language === 'ro' ? 'Imobiliare' : 'Real Estate' },
    { icon: Laptop, label: language === 'ro' ? 'IT & Tech' : 'IT & Tech' },
    { icon: Camera, label: language === 'ro' ? 'Fotografi' : 'Photographers' },
  ];

  const rotatingWords = language === 'ro'
    ? ['Site-uri Web', 'Magazine Online', 'Branduri', 'Experiențe']
    : ['Websites', 'Online Stores', 'Brands', 'Experiences'];

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center section-padding pt-20 overflow-hidden">
        {/* Floating gradient orbs */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none hero-orb-1" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-accent/8 blur-[100px] pointer-events-none hero-orb-2" />

        <div className="mx-auto max-w-content w-full relative z-10">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="hero-fade hero-fade-1 inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 mb-8 backdrop-blur-sm">
              <span className="dot-green" />
              <span className="text-sm text-muted-foreground">{t('hero.badge')}</span>
            </div>

            {/* Title — full original text restored */}
            <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] mb-2 hero-fade hero-fade-2">
              <span className="text-foreground">{t('hero.title1')}</span>
              <br />
              <span className="gradient-text">{t('hero.title2')}</span>
            </h1>

            {/* Rotating text — what we create */}
            <div className="mb-6 hero-fade hero-fade-3">
              <span className="font-heading font-semibold text-xl sm:text-2xl md:text-3xl text-primary-light/70">
                <TextRotator words={rotatingWords} interval={3000} />
              </span>
            </div>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed hero-fade hero-fade-4">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 hero-fade hero-fade-5">
              <MagneticButton strength={0.2}>
                <Link
                  to="/services"
                  className="gradient-primary text-white font-medium px-8 py-3.5 rounded-2xl text-center hover:opacity-90 transition-opacity inline-block hero-cta-glow"
                >
                  {t('hero.cta1')}
                </Link>
              </MagneticButton>
              <MagneticButton strength={0.2}>
                <Link
                  to="/portfolio"
                  className="border border-white/10 text-foreground font-medium px-8 py-3.5 rounded-2xl text-center hover:bg-white/5 transition-all inline-block"
                >
                  {t('hero.cta2')}
                </Link>
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <ChevronDown className="w-5 h-5 text-muted-foreground scroll-indicator" />
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/5 bg-background-secondary/50 section-padding py-16">
        <div className="mx-auto max-w-content">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {stats.map((stat) => (
              <ScrollReveal key={stat.id}>
                <div className="text-center">
                  <div className="font-heading font-bold text-3xl md:text-4xl gradient-text mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{language === 'en' ? stat.label_en : stat.label_ro}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services — with TiltCards */}
      <SectionWrapper>
        <ScrollReveal>
          <p className="text-primary-light text-sm font-medium uppercase tracking-widest mb-3">{t('services.label')}</p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-12">{t('services.title')}</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = resolveIcon(service.icon);
            return (
              <ScrollReveal key={service.id}>
                <TiltCard className="rounded-2xl h-full">
                  <Link to={`/services#${service.anchor || service.id}`} className="glass-card p-6 block h-full group">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.icon_gradient} flex items-center justify-center mb-5`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-3">
                      {language === 'en' ? service.title_en : service.title_ro}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {language === 'en' ? service.description_en : service.description_ro}
                    </p>
                    <span className="text-sm text-primary-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {t('services.learnMore')}
                    </span>
                  </Link>
                </TiltCard>
              </ScrollReveal>
            );
          })}
        </div>
      </SectionWrapper>

      {/* Why Us */}
      <section className="section-padding section-spacing bg-background-alt">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <p className="text-primary-light text-sm font-medium uppercase tracking-widest mb-3 text-center">{t('why.label')}</p>
            <h2 className="font-heading font-bold text-3xl md:text-4xl gradient-text text-center mb-12">{t('why.title')}</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: t('why.fast.title'), desc: t('why.fast.desc') },
              { icon: Star, title: t('why.clean.title'), desc: t('why.clean.desc') },
              { icon: Shield, title: t('why.support.title'), desc: t('why.support.desc') },
            ].map((item) => (
              <ScrollReveal key={item.title}>
                <TiltCard className="rounded-2xl">
                  <div className="glass-card p-6 text-center">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-6 h-6 text-primary-light" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <SectionWrapper>
        <ScrollReveal>
          <p className="text-primary-light text-sm font-medium uppercase tracking-widest mb-3 text-center">
            {language === 'ro' ? 'Clienți' : 'Clients'}
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground text-center mb-12">
            {language === 'ro' ? 'Lucrăm cu orice tip de afacere' : 'We work with any type of business'}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {industries.map((item) => (
              <div key={item.label} className="glass-card p-4 flex flex-col items-center gap-2.5 text-center group hover:border-primary/30 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-5 h-5 text-primary-light" />
                </div>
                <span className="text-sm text-muted-foreground font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* Process */}
      <SectionWrapper>
        <ScrollReveal>
          <p className="text-primary-light text-sm font-medium uppercase tracking-widest mb-3">{t('process.label')}</p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-12">{t('process.title')}</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-primary/40 via-accent/40 to-primary/40 process-line" />

          {steps.map((item) => (
            <ScrollReveal key={item.id}>
              <TiltCard className="rounded-2xl">
                <div className="glass-card p-6 relative">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-heading font-bold text-sm mb-4">
                    {item.step_number}
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                    {language === 'en' ? item.title_en : item.title_ro}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {language === 'en' ? item.description_en : item.description_ro}
                  </p>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* Testimonials */}
      <section className="section-padding section-spacing bg-background-alt">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <p className="text-primary-light text-sm font-medium uppercase tracking-widest mb-3">{t('testimonials.label')}</p>
            <h2 className="font-heading font-bold text-3xl md:text-4xl gradient-text mb-12">{t('testimonials.title')}</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((item) => (
              <ScrollReveal key={item.id}>
                <TiltCard className="rounded-2xl">
                  <div className="glass-card p-6 border-l-4 border-l-primary">
                    <div className="flex gap-0.5 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 italic">
                      "{language === 'en' ? item.quote_en : item.quote_ro}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.avatar_gradient} flex items-center justify-center text-white font-heading font-bold text-sm`}>
                        {item.author_initial}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{item.author_name}</div>
                        <div className="text-xs text-muted-foreground">{item.author_role}</div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <SectionWrapper>
        <ScrollReveal>
          <div className="glass-card p-10 md:p-16 text-center max-w-3xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="font-heading font-bold text-3xl md:text-4xl gradient-text mb-4">{t('cta.title')}</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">{t('cta.subtitle')}</p>
              <MagneticButton strength={0.25}>
                <Link
                  to="/contact"
                  className="gradient-primary text-white font-medium px-8 py-3.5 rounded-2xl inline-block hover:opacity-90 transition-opacity hero-cta-glow"
                >
                  {t('cta.button')}
                </Link>
              </MagneticButton>
            </div>
          </div>
        </ScrollReveal>
      </SectionWrapper>
    </PageTransition>
  );
};

export default Index;
