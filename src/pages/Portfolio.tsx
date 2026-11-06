import { useState } from 'react';
import { Link } from '@/components/LocalizedLink';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePageSEO } from '@/hooks/usePageSEO';
import { PageTransition } from '@/components/PageTransition';
import { ScrollReveal } from '@/components/ScrollReveal';
import { PageHero } from '@/components/PageHero';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '@/data/portfolio';
import { LAB_PROJECTS, GITHUB_URL } from '@/data/lab';
import type { PortfolioProjectRow } from '@/data/types';

type Filter = 'all' | 'client' | 'demo';

const Portfolio = () => {
  const { t, language } = useLanguage();
  usePageSEO({ title: t('portfolio.badge'), description: t('portfolio.subtitle') });
  const [filter, setFilter] = useState<Filter>('all');
  const isEn = language === 'en';
  const filtered = filter === 'all' ? PORTFOLIO_PROJECTS : PORTFOLIO_PROJECTS.filter((p) => p.kind === filter);

  const tabs: { key: Filter; label: string }[] = [
    { key: 'all', label: t('portfolio.all') },
    { key: 'client', label: t('portfolio.clients') },
    { key: 'demo', label: t('portfolio.demos') },
  ];

  return (
    <PageTransition>
      <PageHero
        badge={t('portfolio.badge')}
        title={t('portfolio.title')}
        subtitle={t('portfolio.subtitle')}
      >
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              aria-pressed={filter === tab.key}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                filter === tab.key
                  ? 'btn-primary'
                  : 'bg-white/5 backdrop-blur-md text-muted-foreground hover:text-foreground border border-white/10 hover:border-white/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </PageHero>

      {/* Grid */}
      <section className="section-padding pb-24">
        <div className="mx-auto max-w-content">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {filtered.map((project, i) => (
              <ScrollReveal key={project.id} delay={(i % 6) * 0.06}
                className={i === 0 && filter !== 'demo' ? 'md:col-span-2 md:row-span-2' : ''}>
                <div className="h-full">
                  <ProjectCard project={project} isEn={isEn} featured={i === 0 && filter !== 'demo'} />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Open-source & lab */}
      <section id="lab" className="section-padding section-spacing border-t border-white/10">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <p className="text-primary-light text-sm font-medium uppercase tracking-widest mb-3">{t('portfolio.labLabel')}</p>
            <h2 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl leading-[0.95] mb-6">
              <span className="text-foreground">{t('portfolio.labTitle')}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mb-12 leading-relaxed">{t('portfolio.labSubtitle')}</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {LAB_PROJECTS.filter((l) => l.href !== '#').map((lab, i) => {
              const external = lab.href.startsWith('http');
              return (
                <ScrollReveal key={lab.id} delay={(i % 3) * 0.06}>
                  <a
                    href={lab.href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group flex h-full flex-col rounded-2xl border border-white/10 bg-card p-7 transition-all duration-500 hover:border-white/25 spot-card"
                  >
                    <span className="mb-4 inline-flex w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground">
                      {isEn ? lab.kind_en : lab.kind_ro}
                    </span>
                    <h3 className="font-heading font-semibold text-xl md:text-2xl text-foreground mb-3 leading-tight">{lab.title}</h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6 flex-1">
                      {isEn ? lab.description_en : lab.description_ro}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-light">
                      {t('portfolio.labOpen')}
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </a>
                </ScrollReveal>
              );
            })}
          </div>

          <p className="mt-10 text-muted-foreground">
            GitHub:{' '}
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-primary-light hover:text-foreground transition-colors">
              github.com/vixonoffice
            </a>
          </p>
        </div>
      </section>

      {/* CTA full bleed */}
      <section className="relative section-padding py-32 md:py-44 overflow-hidden border-t border-white/10 cta-glow">
        <ScrollReveal className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-10">
            <span className="text-foreground">{t('portfolio.ctaTitle')}</span>
          </h2>
          <Link to="/contact"
            className="btn-primary font-medium px-10 py-4 rounded-full inline-flex items-center gap-2 text-lg hover:opacity-90 transition-all">
            {t('portfolio.ctaButton')} <ArrowUpRight className="w-5 h-5" />
          </Link>
        </ScrollReveal>
      </section>
    </PageTransition>
  );
};

function ProjectCard({ project, isEn, featured = false }: { project: PortfolioProjectRow; isEn: boolean; featured?: boolean }) {
  const { t } = useLanguage();
  const isDemo = project.kind === 'demo';

  return (
    <div className={`relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm group transition-all duration-500 hover:border-white/25 ${featured ? 'flex flex-col' : ''}`}>
      {project.image_url && (
        <div className={`relative overflow-hidden ${featured ? 'aspect-[16/10] md:aspect-[16/9]' : 'aspect-[16/10]'}`}>
          <img
            src={project.image_url}
            alt={project.title}
            width={800}
            height={500}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          <span
            className={`absolute top-4 left-4 rounded-full px-3 py-1.5 text-xs font-medium backdrop-blur-md border ${
              isDemo ? 'bg-background/80 text-foreground border-white/20' : 'bg-primary text-white border-transparent'
            }`}
          >
            {isDemo ? t('portfolio.demoBadge') : t('portfolio.clientBadge')}
          </span>
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary backdrop-blur-md text-white text-xs font-medium hover:bg-primary-dark transition-colors z-10"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {isDemo ? t('portfolio.viewDemo') : t('portfolio.viewLive')}
            </a>
          )}
        </div>
      )}
      <div className={`${featured ? 'p-8 md:p-10' : 'p-6'} ${featured ? 'flex-1 flex flex-col justify-end' : ''}`}>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-light" />
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            {isEn ? project.subtitle_en : project.subtitle_ro}
          </span>
        </div>
        <h2 className={`font-heading font-semibold text-foreground mb-3 leading-tight ${featured ? 'text-3xl md:text-4xl' : 'text-xl'}`}>
          {project.case_study && project.slug ? (
            // linkul acopera tot cardul (stretched link), fara <a> in <a>
            <Link to={`/portfolio/${project.slug}`} className="after:absolute after:inset-0 after:content-['']">
              {project.title}
            </Link>
          ) : (
            project.title
          )}
        </h2>
        <p className={`text-muted-foreground mb-5 leading-relaxed ${featured ? 'text-base md:text-lg' : 'text-sm'}`}>
          {isEn ? project.description_en : project.description_ro}
        </p>
        {project.case_study?.result && (
          <p className="mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-heading font-bold text-2xl gradient-text">{project.case_study.result.value}</span>
            <span className="text-sm text-muted-foreground">
              {isEn ? project.case_study.result.label_en : project.case_study.result.label_ro}
            </span>
          </p>
        )}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
