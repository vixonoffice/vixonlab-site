import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePageSEO } from '@/hooks/usePageSEO';
import { PageTransition } from '@/components/PageTransition';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SectionWrapper } from '@/components/SectionWrapper';
import { Ban, DollarSign, Cpu, HeadphonesIcon } from 'lucide-react';

const techStack = ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Figma', 'Vercel'];

const About = () => {
  const { t } = useLanguage();
  usePageSEO({ title: t('about.badge'), description: t('about.subtitle') });

  const stats = [
    { value: '50+', label: t('stats.projects') },
    { value: '99%', label: t('stats.clients') },
    { value: '3+', label: t('stats.years') },
    { value: '24h', label: t('stats.response') },
  ];

  const principles = [
    { icon: Ban, title: t('about.p1.title'), desc: t('about.p1.desc') },
    { icon: DollarSign, title: t('about.p2.title'), desc: t('about.p2.desc') },
    { icon: Cpu, title: t('about.p3.title'), desc: t('about.p3.desc') },
    { icon: HeadphonesIcon, title: t('about.p4.title'), desc: t('about.p4.desc') },
  ];

  return (
    <PageTransition>
      {/* Hero */}
      <section className="section-padding pt-32 pb-16">
        <div className="mx-auto max-w-content">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 mb-6">
            <span className="text-sm text-primary-light">{t('about.badge')}</span>
          </div>
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">{t('about.title')}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">{t('about.subtitle')}</p>
        </div>
      </section>

      {/* Story */}
      <SectionWrapper>
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-primary-light text-sm font-medium uppercase tracking-widest mb-3">{t('about.storyLabel')}</p>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-6">{t('about.storyTitle')}</h2>
              {t('about.storyText').split('\n\n').map((para, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed mb-4">{para}</p>
              ))}
            </div>
            <div className="glass-card p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
              <div className="grid grid-cols-2 gap-6 relative z-10">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="font-heading font-bold text-3xl gradient-text mb-1">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* Principles */}
      <section className="section-padding section-spacing bg-background-secondary/30">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <p className="text-primary-light text-sm font-medium uppercase tracking-widest mb-3">{t('about.principlesLabel')}</p>
            <h2 className="font-heading font-bold text-3xl md:text-4xl gradient-text mb-12">{t('about.principlesTitle')}</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((p) => (
              <ScrollReveal key={p.title}>
                <div className="glass-card p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <p.icon className="w-6 h-6 text-primary-light" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <SectionWrapper>
        <ScrollReveal>
          <p className="text-primary-light text-sm font-medium uppercase tracking-widest mb-3">{t('servicesPage.techLabel')}</p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-10">{t('servicesPage.techTitle')}</h2>
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech) => (
              <span key={tech} className="glass-card px-5 py-2.5 text-sm font-medium text-foreground">{tech}</span>
            ))}
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper>
        <ScrollReveal>
          <div className="glass-card p-10 md:p-16 text-center max-w-3xl mx-auto">
            <h2 className="font-heading font-bold text-3xl md:text-4xl gradient-text mb-4">{t('about.ctaTitle')}</h2>
            <Link to="/contact" className="gradient-primary text-white font-medium px-8 py-3.5 rounded-2xl inline-block hover:opacity-90 transition-opacity mt-4">
              {t('about.ctaButton')}
            </Link>
          </div>
        </ScrollReveal>
      </SectionWrapper>
    </PageTransition>
  );
};

export default About;
