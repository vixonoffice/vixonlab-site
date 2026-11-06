import { useParams, Navigate } from 'react-router-dom';
import { Link } from '@/components/LocalizedLink';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePageSEO } from '@/hooks/usePageSEO';
import { PageTransition } from '@/components/PageTransition';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SectionWrapper } from '@/components/SectionWrapper';
import { ArrowLeft, Check, ExternalLink } from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '@/data/portfolio';

const CaseStudy = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, t, lp } = useLanguage();
  const isEn = language === 'en';
  const project = PORTFOLIO_PROJECTS.find((p) => p.slug === slug);
  const cs = project?.case_study;

  usePageSEO({
    title: project ? project.title : 'Case study',
    description: project ? (isEn ? project.description_en : project.description_ro) : '',
  });

  if (!project || !cs) return <Navigate to={lp('/portfolio')} replace />;

  return (
    <PageTransition>
      {/* Hero */}
      <section className="section-padding pt-32 pb-0">
        <div className="mx-auto max-w-content">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {isEn ? 'Back to portfolio' : 'Înapoi la portofoliu'}
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-white">
              {t('portfolio.clientBadge')}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-sm text-primary-light">
              {isEn ? project.subtitle_en : project.subtitle_ro}
            </span>
          </div>

          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            {project.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mb-8">
            {isEn ? project.description_en : project.description_ro}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>

          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 btn-primary font-medium px-6 py-3 rounded-2xl hover:opacity-90 transition-opacity"
            >
              <ExternalLink className="w-4 h-4" />
              {t('portfolio.viewLive')}
            </a>
          )}
        </div>
      </section>

      {/* Hero image */}
      {project.image_url && (
        <SectionWrapper className="!pt-8 !pb-8">
          <ScrollReveal>
            <div className="rounded-2xl overflow-hidden border border-white/10">
              <img
                src={project.image_url}
                alt={project.title}
                width={1200}
                height={750}
                className="w-full h-auto object-cover"
                loading="eager"
              />
            </div>
          </ScrollReveal>
        </SectionWrapper>
      )}

      {/* Brief & approach */}
      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ScrollReveal>
            <div className="glass-card p-8 h-full">
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 border border-accent/20 px-3 py-1 mb-5">
                <span className="text-xs font-medium text-accent">{isEn ? 'The brief' : 'Cererea'}</span>
              </div>
              <p className="text-muted-foreground leading-relaxed text-[15px]">{isEn ? cs.brief_en : cs.brief_ro}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="glass-card p-8 h-full">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 mb-5">
                <span className="text-xs font-medium text-primary">{isEn ? 'What we did' : 'Ce am făcut'}</span>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-[15px]">
                {(isEn ? cs.approach_en : cs.approach_ro).split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </SectionWrapper>

      {/* Measured result (only when a real number exists) */}
      {cs.result && (
        <SectionWrapper>
          <ScrollReveal>
            <div className="glass-card p-8 md:p-12 max-w-3xl mx-auto text-center">
              <p className="text-primary-light text-sm font-medium uppercase tracking-widest mb-4">
                {isEn ? 'Measured result' : 'Rezultat măsurat'}
              </p>
              <p className="font-heading font-bold text-6xl md:text-8xl gradient-text leading-none mb-5">{cs.result.value}</p>
              <p className="text-muted-foreground">{isEn ? cs.result.label_en : cs.result.label_ro}</p>
            </div>
          </ScrollReveal>
        </SectionWrapper>
      )}

      {/* What's inside */}
      <SectionWrapper>
        <ScrollReveal>
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground text-center mb-10">
            {isEn ? 'What is inside' : 'Ce cuprinde'}
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {(isEn ? cs.highlights_en : cs.highlights_ro).map((f, i) => (
            <ScrollReveal key={i}>
              <div className="glass-card p-5 flex items-start gap-3 h-full">
                <div className="mt-0.5 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-muted-foreground text-[15px]">{f}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper>
        <ScrollReveal>
          <div className="glass-card p-10 md:p-16 text-center max-w-3xl mx-auto">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
              {isEn ? 'Have a similar project?' : 'Ai un proiect similar?'}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              {isEn
                ? 'Tell us about it. We will say honestly what we can do, how long it takes and what it costs.'
                : 'Spune-ne despre el. Îți spunem sincer ce putem face, cât durează și cât costă.'}
            </p>
            <Link
              to="/contact"
              className="btn-primary font-medium px-8 py-3.5 rounded-full inline-block hover:opacity-90 transition-opacity"
            >
              {isEn ? 'Contact us' : 'Contactează-ne'}
            </Link>
          </div>
        </ScrollReveal>
      </SectionWrapper>
    </PageTransition>
  );
};

export default CaseStudy;
