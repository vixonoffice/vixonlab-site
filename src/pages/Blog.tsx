import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePageSEO } from '@/hooks/usePageSEO';
import { PageTransition } from '@/components/PageTransition';
import { ScrollReveal } from '@/components/ScrollReveal';
import { PageHero } from '@/components/PageHero';
import { Clock, Calendar, ArrowUpRight } from 'lucide-react';
import { BLOG_POSTS as posts } from '@/data/blog';
import type { BlogPostRow } from '@/data/types';

const categories = ['all', ...Array.from(new Set(posts.map((p) => p.category)))];
const featured = posts.filter((p) => p.featured);

const Blog = () => {
  const { t, language } = useLanguage();
  usePageSEO({ title: t('blog.badge'), description: t('blog.subtitle') });
  const [filter, setFilter] = useState('all');

  const isEn = language === 'en';

  const filtered = filter === 'all' ? posts : posts.filter((p) => p.category === filter);

  return (
    <PageTransition>
      <PageHero
        badge={t('blog.badge')}
        title={t('blog.title')}
        subtitle={t('blog.subtitle')}
      >
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all capitalize ${
                filter === cat
                  ? 'btn-primary'
                  : 'bg-white/5 backdrop-blur-md text-muted-foreground hover:text-foreground border border-white/10 hover:border-white/20'
              }`}
            >
              {cat === 'all' ? t('blog.all') : cat}
            </button>
          ))}
        </div>
      </PageHero>

      {/* Featured */}
      {filter === 'all' && featured.length > 0 && (
        <section className="section-padding pb-12">
          <div className="mx-auto max-w-content">
            <ScrollReveal>
              <p className="text-primary-light text-sm font-medium uppercase tracking-widest mb-6">
                {t('blog.featured')}
              </p>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {featured.slice(0, 2).map((post, i) => (
                <ScrollReveal key={post.id} delay={i * 0.1}>
                  <FeaturedCard post={post} isEn={isEn} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All posts */}
      <section className="section-padding pb-24">
        <div className="mx-auto max-w-content">
          {filtered.length === 0 ? (
            <div className="text-center text-muted-foreground py-16">{t('blog.noPosts')}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {filtered.map((post, i) => (
                <ScrollReveal key={post.id} delay={(i % 6) * 0.06}>
                  <PostCard post={post} isEn={isEn} />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA full bleed */}
      <section className="relative section-padding py-32 md:py-44 overflow-hidden border-t border-white/10 cta-glow">

        <ScrollReveal className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-10">
            <span className="text-foreground">{t('blog.ctaTitle')}</span>
          </h2>
          <Link to="/contact"
            className="btn-primary font-medium px-10 py-4 rounded-full inline-flex items-center gap-2 text-lg hover:opacity-90 transition-all">
            {t('blog.ctaButton')} <ArrowUpRight className="w-5 h-5" />
          </Link>
        </ScrollReveal>
      </section>
    </PageTransition>
  );
};

function FeaturedCard({ post, isEn }: { post: BlogPostRow; isEn: boolean }) {
  const title = isEn ? post.title_en : post.title_ro;
  const excerpt = isEn ? post.excerpt_en : post.excerpt_ro;

  return (
    <Link to={`/blog/${post.slug}`} className="block h-full">
      <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm group transition-all duration-500 hover:border-white/25">
        {post.cover_image && (
          <div className="relative aspect-[16/9] overflow-hidden">
            <img src={post.cover_image} alt={title} loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-primary backdrop-blur-md text-white text-xs font-medium">
              {isEn ? 'Featured' : 'Recomandat'}
            </div>
          </div>
        )}
        <div className="p-7 md:p-8">
          <div className="flex items-center gap-3 mb-4 text-xs text-muted-foreground uppercase tracking-widest">
            <span>{post.category}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground" />
            <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" />{post.read_time_minutes} min</span>
          </div>
          <h3 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-3 leading-tight group-hover:text-primary-light transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-5 line-clamp-2">{excerpt}</p>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-light">
            {isEn ? 'Read more' : 'Citește mai mult'}
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function PostCard({ post, isEn }: { post: BlogPostRow; isEn: boolean }) {
  const title = isEn ? post.title_en : post.title_ro;
  const excerpt = isEn ? post.excerpt_en : post.excerpt_ro;
  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString(isEn ? 'en-US' : 'ro-RO', { year: 'numeric', month: 'short', day: 'numeric' })
    : '';

  return (
    <Link to={`/blog/${post.slug}`} className="block h-full">
      <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm group transition-all duration-500 hover:border-white/25">
        {post.cover_image && (
          <div className="relative aspect-[16/10] overflow-hidden">
            <img src={post.cover_image} alt={title} loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-muted-foreground capitalize">
              {post.category}
            </span>
            {date && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />{date}
              </span>
            )}
          </div>
          <h3 className="font-heading font-semibold text-xl text-foreground mb-3 leading-tight line-clamp-2 group-hover:text-primary-light transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">{excerpt}</p>
          <div className="flex items-center text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" />{post.read_time_minutes} min</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Blog;
