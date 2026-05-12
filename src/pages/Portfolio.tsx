import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePageSEO } from '@/hooks/usePageSEO';
import { PageTransition } from '@/components/PageTransition';
import { ScrollReveal } from '@/components/ScrollReveal';
import { PageHero } from '@/components/PageHero';
import { VideoBackground } from '@/components/VideoBackground';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { usePortfolioProjects, type PortfolioProjectRow } from '@/hooks/useSupabaseData';

type Category = 'all' | 'webdev' | 'ecommerce' | 'design';

const Portfolio = () => {
  const { t, language } = useLanguage();
  usePageSEO({ title: t('portfolio.badge'), description: t('portfolio.subtitle') });
  const [filter, setFilter] = useState<Category>('all');
  const { data: projects, loading } = usePortfolioProjects();

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  const tabs: { key: Category; label: string }[] = [
    { key: 'all',       label: t('portfolio.all') },
    { key: 'webdev',    label: t('portfolio.webdev') },
    { key: 'ecommerce', label: t('portfolio.ecommerce') },
    { key: 'design',    label: t('portfolio.design') },
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
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                filter === tab.key
                  ? 'gradient-primary text-white scale-105'
                  : 'bg-white/5 backdrop-blur-md text-muted-foreground hover:text-foreground border border-white/10 hover:border-primary/30'
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
          {loading ? (
            <div className="text-center text-muted-foreground py-12">
              {language === 'ro' ? 'Se încarcă...' : 'Loading...'}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {filtered.map((project, i) => (
                <ScrollReveal key={project.id} delay={(i % 6) * 0.06}
                  className={i === 0 ? 'md:col-span-2 md:row-span-2' : ''}>
                  {project.case_study && project.slug ? (
                    <Link to={`/portfolio/${project.slug}`} className="block h-full">
                      <ProjectCard project={project} language={language} featured={i === 0} />
                    </Link>
                  ) : (
                    <div className="h-full">
                      <ProjectCard project={project} language={language} featured={i === 0} />
                    </div>
                  )}
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA full bleed */}
      <section className="relative section-padding py-32 md:py-44 overflow-hidden border-t border-white/10">
        <VideoBackground src="/videos/purple-cloud.mp4" opacity={0.5} />
        <div className="absolute inset-0 z-0"
          style={{ background: 'radial-gradient(ellipse at center, rgba(10,4,24,0.55) 0%, rgba(10,4,24,0.95) 70%)' }} />

        <ScrollReveal className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-10">
            <span className="text-foreground">{t('portfolio.ctaTitle')}</span>
          </h2>
          <Link to="/contact"
            className="gradient-primary text-white font-medium px-10 py-4 rounded-full inline-flex items-center gap-2 text-lg hover:opacity-90 hover:scale-105 transition-all">
            {t('portfolio.ctaButton')} <ArrowUpRight className="w-5 h-5" />
          </Link>
        </ScrollReveal>
      </section>
    </PageTransition>
  );
};

function ProjectCard({ project, language, featured = false }: { project: PortfolioProjectRow; language: string; featured?: boolean }) {
  return (
    <div className={`relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm group cursor-pointer transition-all duration-500 hover:border-primary/40 ${featured ? 'flex flex-col' : ''}`}>
      {project.image_url && (
        <div className={`relative overflow-hidden ${featured ? 'aspect-[16/10] md:aspect-[16/9]' : 'aspect-[16/10]'}`}>
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary backdrop-blur-md text-white text-xs font-medium hover:bg-primary-dark transition-colors z-10"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {language === 'en' ? 'View Live' : 'Vezi Live'}
            </a>
          )}
        </div>
      )}
      <div className={`${featured ? 'p-8 md:p-10' : 'p-6'} ${featured ? 'flex-1 flex flex-col justify-end' : ''}`}>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-light" />
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            {language === 'en' ? project.subtitle_en : project.subtitle_ro}
          </span>
        </div>
        <h2 className={`font-heading font-semibold text-foreground mb-3 leading-tight ${featured ? 'text-3xl md:text-4xl' : 'text-xl'}`}>
          {project.title}
        </h2>
        <p className={`text-muted-foreground mb-5 leading-relaxed ${featured ? 'text-base md:text-lg' : 'text-sm'}`}>
          {language === 'en' ? project.description_en : project.description_ro}
        </p>
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
