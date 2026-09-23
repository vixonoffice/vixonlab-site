import { useParams, Link, Navigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePageSEO } from '@/hooks/usePageSEO';
import { PageTransition } from '@/components/PageTransition';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SectionWrapper } from '@/components/SectionWrapper';
import { ArrowLeft, Check, Clock, Calendar, Quote, ExternalLink } from 'lucide-react';
import { usePortfolioProjects } from '@/hooks/useSupabaseData';

const CaseStudy = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const { data: projects, loading } = usePortfolioProjects();

  const project = projects.find((p) => p.slug === slug);
  const cs = project?.case_study;

  usePageSEO({
    title: project ? project.title : 'Case Study',
    description: project ? (language === 'en' ? project.description_en : project.description_ro) : '',
  });

  if (loading) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Se incarca...</p>
        </div>
      </PageTransition>
    );
  }

  if (!project || !cs) return <Navigate to="/portfolio" replace />;

  const isEn = language === 'en';

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
            {isEn ? 'Back to Portfolio' : 'Inapoi la Portofoliu'}
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 mb-4">
            <span className="text-sm text-primary-light">
              {isEn ? project.subtitle_en : project.subtitle_ro}
            </span>
          </div>

          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            {project.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mb-8">
            {isEn ? project.description_en : project.description_ro}
          </p>

          {/* Meta info */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="inline-flex items-center gap-2 glass-card px-4 py-2.5">
              <span className="text-sm text-muted-foreground">{isEn ? 'Value:' : 'Valoare:'}</span>
              <span className="font-heading font-bold text-base text-foreground">{cs.price}</span>
            </div>
            <div className="inline-flex items-center gap-2 glass-card px-4 py-2.5">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{isEn ? 'Duration:' : 'Durata:'}</span>
              <span className="text-sm font-medium text-foreground">{isEn ? cs.durationEn : cs.duration}</span>
            </div>
            <div className="inline-flex items-center gap-2 glass-card px-4 py-2.5">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground">{cs.year}</span>
            </div>
          </div>

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
              {isEn ? 'Visit Live Site' : 'Vezi Site-ul Live'}
            </a>
          )}
        </div>
      </section>

      {/* Hero Image */}
      {project.image_url && (
        <SectionWrapper className="!pt-8 !pb-8">
          <ScrollReveal>
            <div className="rounded-2xl overflow-hidden border border-white/10">
              <img src={project.image_url} alt={project.title} className="w-full h-auto object-cover" loading="eager" />
            </div>
          </ScrollReveal>
        </SectionWrapper>
      )}

      {/* Challenge & Solution */}
      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ScrollReveal>
            <div className="glass-card p-8 h-full">
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 border border-accent/20 px-3 py-1 mb-5">
                <span className="text-xs font-medium text-accent">
                  {isEn ? 'The Challenge' : 'Provocarea'}
                </span>
              </div>
              <div className="text-muted-foreground leading-relaxed whitespace-pre-line text-[15px]">
                {isEn ? cs.challengeEn : cs.challenge}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="glass-card p-8 h-full">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 mb-5">
                <span className="text-xs font-medium text-primary">
                  {isEn ? 'Our Solution' : 'Ce am facut'}
                </span>
              </div>
              <div className="text-muted-foreground leading-relaxed whitespace-pre-line text-[15px]">
                {isEn ? cs.solutionEn : cs.solution}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </SectionWrapper>

      {/* Results */}
      <SectionWrapper>
        <ScrollReveal>
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground text-center mb-10">
            {isEn ? 'Results' : 'Rezultate'}
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cs.results.map((r, i) => (
            <ScrollReveal key={i}>
              <div className="glass-card p-6 text-center">
                <div className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-2">{r.value}</div>
                <div className="text-sm text-muted-foreground">{isEn ? r.labelEn : r.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* What We Delivered */}
      <SectionWrapper>
        <ScrollReveal>
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground text-center mb-3">
            {isEn ? 'What We Delivered' : 'Ce am livrat concret'}
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
            {isEn ? 'Everything included in this project:' : 'Tot ce a inclus acest proiect:'}
          </p>
        </ScrollReveal>
        <div className="glass-card p-8 max-w-3xl mx-auto">
          <div className="space-y-3.5">
            {(isEn ? cs.deliverablesEn : cs.deliverables).map((d, i) => (
              <ScrollReveal key={i}>
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-muted-foreground text-[15px]">{d}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Process */}
      <SectionWrapper>
        <ScrollReveal>
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground text-center mb-3">
            {isEn ? 'How We Worked' : 'Cum am lucrat'}
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
            {isEn ? 'Step by step, from idea to launch:' : 'Pas cu pas, de la idee la lansare:'}
          </p>
        </ScrollReveal>
        <ScrollReveal>
          <div className="glass-card p-8 max-w-3xl mx-auto">
            <div className="text-muted-foreground leading-relaxed whitespace-pre-line text-[15px]">
              {isEn ? cs.processEn : cs.process}
            </div>
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* Features */}
      <SectionWrapper>
        <ScrollReveal>
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground text-center mb-10">
            {isEn ? 'Key Features' : 'Functionalitati'}
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {(isEn ? cs.featuresEn : cs.features).map((f, i) => (
            <ScrollReveal key={i}>
              <div className="glass-card p-5 flex items-start gap-3">
                <div className="mt-0.5 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-muted-foreground text-[15px]">{f}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* Testimonial */}
      {cs.testimonial && (
        <SectionWrapper>
          <ScrollReveal>
            <div className="glass-card p-8 md:p-12 max-w-3xl mx-auto relative">
              <Quote className="w-10 h-10 text-primary/20 absolute top-6 left-6" />
              <div className="pl-8 md:pl-12">
                <p className="text-foreground text-lg md:text-xl leading-relaxed italic mb-6">
                  &bdquo;{isEn ? cs.testimonial.quoteEn : cs.testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-sm">
                    {cs.testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-heading font-semibold text-foreground">{cs.testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{cs.testimonial.role}</div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </SectionWrapper>
      )}

      {/* CTA */}
      <SectionWrapper>
        <ScrollReveal>
          <div className="glass-card p-10 md:p-16 text-center max-w-3xl mx-auto">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
              {isEn ? 'Have a Similar Project?' : 'Ai un proiect similar?'}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              {isEn
                ? "Let's talk about your idea. We'll tell you honestly what we can do, how long it takes, and how much it costs. No surprises."
                : 'Hai sa vorbim despre ideea ta. Iti spunem sincer ce putem face, cat dureaza, si cat costa. Fara surprize.'}
            </p>
            <Link
              to="/contact"
              className="btn-primary font-medium px-8 py-3.5 rounded-full inline-block hover:opacity-90 transition-opacity"
            >
              {isEn ? 'Contact Us' : 'Contacteaza-ne'}
            </Link>
          </div>
        </ScrollReveal>
      </SectionWrapper>
    </PageTransition>
  );
};

export default CaseStudy;
