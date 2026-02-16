import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePageSEO } from '@/hooks/usePageSEO';
import { PageTransition } from '@/components/PageTransition';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SectionWrapper } from '@/components/SectionWrapper';
import { Code, ShoppingCart, Palette, BarChart3, Zap, Star, Shield, ChevronDown } from 'lucide-react';

const Index = () => {
  const { t } = useLanguage();
  usePageSEO({ title: t('nav.home'), description: t('hero.subtitle') });

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center section-padding pt-20">
        <div className="mx-auto max-w-content w-full">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 mb-8">
              <span className="dot-green" />
              <span className="text-sm text-muted-foreground">{t('hero.badge')}</span>
            </div>

            <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] mb-6">
              <span className="text-foreground">{t('hero.title1')}</span>
              <br />
              <span className="gradient-text">{t('hero.title2')}</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="gradient-primary text-white font-medium px-8 py-3.5 rounded-2xl text-center hover:opacity-90 transition-opacity"
              >
                {t('hero.cta1')}
              </Link>
              <Link
                to="/portfolio"
                className="border border-white/10 text-foreground font-medium px-8 py-3.5 rounded-2xl text-center hover:bg-white/5 transition-all"
              >
                {t('hero.cta2')}
              </Link>
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
            {[
              { value: '50+', label: t('stats.projects') },
              { value: '99%', label: t('stats.clients') },
              { value: '3+', label: t('stats.years') },
              { value: '24h', label: t('stats.response') },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-heading font-bold text-3xl md:text-4xl gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <SectionWrapper>
        <ScrollReveal>
          <p className="text-primary-light text-sm font-medium uppercase tracking-widest mb-3">{t('services.label')}</p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-12">{t('services.title')}</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Code, title: t('services.web.title'), desc: t('services.web.desc'), hash: 'web-development', gradient: 'from-purple-600 to-violet-500' },
            { icon: ShoppingCart, title: t('services.ecommerce.title'), desc: t('services.ecommerce.desc'), hash: 'ecommerce', gradient: 'from-pink-600 to-rose-500' },
            { icon: Palette, title: t('services.design.title'), desc: t('services.design.desc'), hash: 'design', gradient: 'from-blue-600 to-cyan-500' },
            { icon: BarChart3, title: t('services.marketing.title'), desc: t('services.marketing.desc'), hash: 'marketing', gradient: 'from-amber-600 to-orange-500' },
          ].map((service) => (
            <ScrollReveal key={service.hash}>
              <Link to={`/services#${service.hash}`} className="glass-card p-6 block h-full group">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-5`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-3">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{service.desc}</p>
                <span className="text-sm text-primary-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {t('services.learnMore')}
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* Why Us */}
      <section className="section-padding section-spacing bg-background-secondary/30">
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
                <div className="glass-card p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-primary-light" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <SectionWrapper>
        <ScrollReveal>
          <p className="text-primary-light text-sm font-medium uppercase tracking-widest mb-3">{t('process.label')}</p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-12">{t('process.title')}</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-primary/40 via-accent/40 to-primary/40" />

          {[
            { step: '01', title: t('process.1.title'), desc: t('process.1.desc') },
            { step: '02', title: t('process.2.title'), desc: t('process.2.desc') },
            { step: '03', title: t('process.3.title'), desc: t('process.3.desc') },
            { step: '04', title: t('process.4.title'), desc: t('process.4.desc') },
          ].map((item) => (
            <ScrollReveal key={item.step}>
              <div className="glass-card p-6 relative">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-heading font-bold text-sm mb-4">
                  {item.step}
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* Testimonials */}
      <section className="section-padding section-spacing bg-background-secondary/30">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <p className="text-primary-light text-sm font-medium uppercase tracking-widest mb-3">{t('testimonials.label')}</p>
            <h2 className="font-heading font-bold text-3xl md:text-4xl gradient-text mb-12">{t('testimonials.title')}</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { text: t('testimonials.1.text'), name: t('testimonials.1.name'), company: t('testimonials.1.company'), initial: 'M', gradient: 'from-purple-600 to-violet-500' },
              { text: t('testimonials.2.text'), name: t('testimonials.2.name'), company: t('testimonials.2.company'), initial: 'A', gradient: 'from-pink-600 to-rose-500' },
              { text: t('testimonials.3.text'), name: t('testimonials.3.name'), company: t('testimonials.3.company'), initial: 'E', gradient: 'from-blue-600 to-cyan-500' },
            ].map((item) => (
              <ScrollReveal key={item.name}>
                <div className="glass-card p-6 border-l-4 border-l-primary">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 italic">"{item.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white font-heading font-bold text-sm`}>
                      {item.initial}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.company}</div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <SectionWrapper>
        <ScrollReveal>
          <div className="glass-card p-10 md:p-16 text-center max-w-3xl mx-auto">
            <h2 className="font-heading font-bold text-3xl md:text-4xl gradient-text mb-4">{t('cta.title')}</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">{t('cta.subtitle')}</p>
            <Link
              to="/contact"
              className="gradient-primary text-white font-medium px-8 py-3.5 rounded-2xl inline-block hover:opacity-90 transition-opacity"
            >
              {t('cta.button')}
            </Link>
          </div>
        </ScrollReveal>
      </SectionWrapper>
    </PageTransition>
  );
};

export default Index;
