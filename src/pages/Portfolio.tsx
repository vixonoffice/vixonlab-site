import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePageSEO } from '@/hooks/usePageSEO';
import { PageTransition } from '@/components/PageTransition';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SectionWrapper } from '@/components/SectionWrapper';
import { caseStudies } from '@/lib/portfolioData';
import { supabase } from '@/integrations/supabase/client';

type Category = 'all' | 'webdev' | 'ecommerce' | 'design';

interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  subtitle: string;
  subtitleEn: string;
  desc: string;
  descEn: string;
  tags: string[];
  image: string | null;
  hasCaseStudy: boolean;
}

const Portfolio = () => {
  const { t, language } = useLanguage();
  usePageSEO({ title: t('portfolio.badge'), description: t('portfolio.subtitle') });
  const [filter, setFilter] = useState<Category>('all');
  const [dbProjects, setDbProjects] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    supabase
      .from('portfolio_projects')
      .select('*')
      .order('sort_order')
      .then(({ data }) => {
        if (!data) return;
        const mapped: PortfolioItem[] = data.map((p: any) => ({
          id: p.id,
          slug: p.id,
          title: p.title,
          category: p.category,
          subtitle: p.subtitle_ro,
          subtitleEn: p.subtitle_en,
          desc: p.description_ro,
          descEn: p.description_en,
          tags: p.tags || [],
          image: p.image_url,
          hasCaseStudy: false,
        }));
        setDbProjects(mapped);
      });
  }, []);

  // Merge: hardcoded case studies + DB projects (dedup by title)
  const caseStudyItems: PortfolioItem[] = caseStudies.map((cs) => ({
    id: cs.slug,
    slug: cs.slug,
    title: cs.title,
    category: cs.category,
    subtitle: cs.subtitle,
    subtitleEn: cs.subtitleEn,
    desc: cs.desc,
    descEn: cs.descEn,
    tags: cs.tags,
    image: cs.image,
    hasCaseStudy: true,
  }));

  const caseStudyTitles = new Set(caseStudyItems.map((c) => c.title));
  const extraDbProjects = dbProjects.filter((p) => !caseStudyTitles.has(p.title));
  const allProjects = [...caseStudyItems, ...extraDbProjects];

  const filtered = filter === 'all' ? allProjects : allProjects.filter((p) => p.category === filter);

  const tabs: { key: Category; label: string }[] = [
    { key: 'all', label: t('portfolio.all') },
    { key: 'webdev', label: t('portfolio.webdev') },
    { key: 'ecommerce', label: t('portfolio.ecommerce') },
    { key: 'design', label: t('portfolio.design') },
  ];

  return (
    <PageTransition>
      <section className="section-padding pt-32 pb-8">
        <div className="mx-auto max-w-content">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 mb-6">
            <span className="text-sm text-primary-light">{t('portfolio.badge')}</span>
          </div>
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">{t('portfolio.title')}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-10">{t('portfolio.subtitle')}</p>

          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === tab.key ? 'gradient-primary text-white' : 'bg-white/5 text-muted-foreground hover:text-foreground border border-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <SectionWrapper className="!pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <ScrollReveal key={project.id}>
              {project.hasCaseStudy ? (
                <Link to={`/portfolio/${project.slug}`} className="block">
                  <ProjectCard project={project} language={language} />
                </Link>
              ) : (
                <div>
                  <ProjectCard project={project} language={language} />
                </div>
              )}
            </ScrollReveal>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <ScrollReveal>
          <div className="glass-card p-10 md:p-16 text-center max-w-3xl mx-auto">
            <h2 className="font-heading font-bold text-3xl md:text-4xl gradient-text mb-4">{t('portfolio.ctaTitle')}</h2>
            <Link to="/contact" className="gradient-primary text-white font-medium px-8 py-3.5 rounded-2xl inline-block hover:opacity-90 transition-opacity mt-4">
              {t('portfolio.ctaButton')}
            </Link>
          </div>
        </ScrollReveal>
      </SectionWrapper>
    </PageTransition>
  );
};

function ProjectCard({ project, language }: { project: PortfolioItem; language: string }) {
  return (
    <div className="glass-card overflow-hidden group cursor-pointer">
      {project.image && (
        <div className="relative aspect-[16/10] overflow-hidden">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span className="text-xs text-muted-foreground">{language === 'en' ? project.subtitleEn : project.subtitle}</span>
        </div>
        <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{project.title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{language === 'en' ? project.descEn : project.desc}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-muted-foreground">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
