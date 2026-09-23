import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePageSEO } from '@/hooks/usePageSEO';
import { PageTransition } from '@/components/PageTransition';
import { ScrollReveal } from '@/components/ScrollReveal';
import { PageHero } from '@/components/PageHero';
import { Marquee } from '@/components/Marquee';
import { Ban, DollarSign, Cpu, HeadphonesIcon, ArrowUpRight } from 'lucide-react';
import { useStats, useTechStack } from '@/hooks/useSupabaseData';

const About = () => {
  const { t, language } = useLanguage();
  usePageSEO({ title: t('about.badge'), description: t('about.subtitle') });

  const { data: stats } = useStats();
  const { data: techStack } = useTechStack();

  const principles = [
    { icon: Ban,            title: t('about.p1.title'), desc: t('about.p1.desc') },
    { icon: DollarSign,     title: t('about.p2.title'), desc: t('about.p2.desc') },
    { icon: Cpu,            title: t('about.p3.title'), desc: t('about.p3.desc') },
    { icon: HeadphonesIcon, title: t('about.p4.title'), desc: t('about.p4.desc') },
  ];

  return (
    <PageTransition>
      <PageHero
        badge={t('about.badge')}
        title={t('about.title')}
        subtitle={t('about.subtitle')}
      />

      {/* Story split */}
      <section className="section-padding section-spacing border-t border-white/10">
        <div className="mx-auto max-w-content">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <ScrollReveal className="lg:col-span-7">
              <p className="text-primary-light text-sm font-medium uppercase tracking-widest mb-6">
                {t('about.storyLabel')}
              </p>
              <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-8">
                <span className="text-foreground">{t('about.storyTitle')}</span>
              </h2>
              <div className="space-y-5 text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {t('about.storyText').split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </ScrollReveal>

            <div className="lg:col-span-5 lg:pt-12">
              <div className="grid grid-cols-2 gap-x-6 gap-y-10">
                {stats.map((stat, i) => (
                  <ScrollReveal key={stat.id} delay={i * 0.08}>
                    <div className="border-l-2 border-primary/40 pl-4">
                      <div className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-2 leading-none">
                        {stat.value}
                      </div>
                      <div className="text-xs uppercase tracking-widest text-muted-foreground">
                        {language === 'en' ? stat.label_en : stat.label_ro}
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principles — bento grid */}
      <section className="section-padding section-spacing">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <p className="text-primary-light text-sm font-medium uppercase tracking-widest mb-6">
              {t('about.principlesLabel')}
            </p>
            <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-[0.95] mb-16">
              <span className="gradient-text">{t('about.principlesTitle')}</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {principles.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 0.1}>
                <div className="relative h-full group overflow-hidden rounded-2xl border border-white/10 bg-card p-8 hover:border-white/25 transition-all duration-500">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                      <p.icon className="w-7 h-7 text-primary-light" />
                    </div>
                    <h3 className="font-heading font-semibold text-2xl text-foreground mb-3">{p.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack — marquee */}
      <section className="section-padding pt-16 pb-12 border-y border-white/10 bg-background-secondary/40 backdrop-blur-sm">
        <div className="mx-auto max-w-content mb-8">
          <ScrollReveal>
            <p className="text-primary-light text-sm font-medium uppercase tracking-widest mb-3">
              {t('servicesPage.techLabel')}
            </p>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">
              {t('servicesPage.techTitle')}
            </h2>
          </ScrollReveal>
        </div>
        <Marquee speed={40}>
          {techStack.map((tech) => (
            <span key={tech.id}
              className="px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-base md:text-lg font-medium text-foreground">
              {tech.name}
            </span>
          ))}
        </Marquee>
      </section>

      {/* CTA full bleed */}
      <section className="relative section-padding py-32 md:py-44 overflow-hidden">

        <ScrollReveal className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-10">
            <span className="text-foreground">{t('about.ctaTitle')}</span>
          </h2>
          <Link to="/contact"
            className="bg-foreground text-background font-medium px-10 py-4 rounded-lg inline-flex items-center gap-2 text-lg hover:opacity-90 transition-all">
            {t('about.ctaButton')} <ArrowUpRight className="w-5 h-5" />
          </Link>
        </ScrollReveal>
      </section>
    </PageTransition>
  );
};

export default About;
