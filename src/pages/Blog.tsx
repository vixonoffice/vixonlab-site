import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePageSEO } from '@/hooks/usePageSEO';
import { PageTransition } from '@/components/PageTransition';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SectionWrapper } from '@/components/SectionWrapper';
import { Clock, Calendar, Eye, ArrowRight } from 'lucide-react';
import { useBlogPosts, type BlogPostRow } from '@/hooks/useBlogData';

const Blog = () => {
  const { t, language } = useLanguage();
  usePageSEO({ title: t('blog.badge'), description: t('blog.subtitle') });
  const [filter, setFilter] = useState('all');
  const { data: posts, loading } = useBlogPosts();

  const isEn = language === 'en';

  const categories = useMemo(() => {
    const cats = new Set(posts.map((p) => p.category));
    return ['all', ...Array.from(cats)];
  }, [posts]);

  const featured = useMemo(() => posts.filter((p) => p.featured), [posts]);
  const filtered = filter === 'all' ? posts : posts.filter((p) => p.category === filter);

  return (
    <PageTransition>
      {/* Header */}
      <section className="section-padding pt-32 pb-8">
        <div className="mx-auto max-w-content">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 mb-6">
            <span className="text-sm text-primary-light">{t('blog.badge')}</span>
          </div>
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            {t('blog.title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-10">
            {t('blog.subtitle')}
          </p>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                  filter === cat
                    ? 'gradient-primary text-white'
                    : 'bg-white/5 text-muted-foreground hover:text-foreground border border-white/10'
                }`}
              >
                {cat === 'all' ? t('blog.all') : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured posts */}
      {filter === 'all' && featured.length > 0 && (
        <SectionWrapper className="!pt-4 !pb-4">
          <ScrollReveal>
            <h2 className="font-heading font-semibold text-xl text-foreground mb-6">
              {t('blog.featured')}
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featured.slice(0, 2).map((post) => (
              <ScrollReveal key={post.id}>
                <FeaturedCard post={post} isEn={isEn} />
              </ScrollReveal>
            ))}
          </div>
        </SectionWrapper>
      )}

      {/* All posts grid */}
      <SectionWrapper className="!pt-8">
        {loading ? (
          <div className="text-center text-muted-foreground py-12">Se incarca...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            {t('blog.noPosts')}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <ScrollReveal key={post.id}>
                <PostCard post={post} isEn={isEn} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper>
        <ScrollReveal>
          <div className="glass-card p-10 md:p-16 text-center max-w-3xl mx-auto">
            <h2 className="font-heading font-bold text-3xl md:text-4xl gradient-text mb-4">
              {t('blog.ctaTitle')}
            </h2>
            <Link
              to="/contact"
              className="gradient-primary text-white font-medium px-8 py-3.5 rounded-2xl inline-block hover:opacity-90 transition-opacity mt-4"
            >
              {t('blog.ctaButton')}
            </Link>
          </div>
        </ScrollReveal>
      </SectionWrapper>
    </PageTransition>
  );
};

function FeaturedCard({ post, isEn }: { post: BlogPostRow; isEn: boolean }) {
  const title = isEn ? post.title_en : post.title_ro;
  const excerpt = isEn ? post.excerpt_en : post.excerpt_ro;

  return (
    <Link to={`/blog/${post.slug}`} className="block">
      <div className="glass-card overflow-hidden group cursor-pointer h-full">
        {post.cover_image && (
          <div className="relative aspect-[16/9] overflow-hidden">
            <img
              src={post.cover_image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary/90 backdrop-blur-sm text-white text-xs font-medium">
              {isEn ? 'Featured' : 'Recomandat'}
            </div>
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
            <span className="capitalize">{post.category}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground" />
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.read_time_minutes} min
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {post.views}
            </span>
          </div>
          <h3 className="font-heading font-semibold text-xl text-foreground mb-2 group-hover:text-primary-light transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{excerpt}</p>
          <span className="inline-flex items-center gap-1.5 text-sm text-primary-light font-medium">
            {isEn ? 'Read more' : 'Citeste mai mult'}
            <ArrowRight className="w-3.5 h-3.5" />
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
    ? new Date(post.published_at).toLocaleDateString(isEn ? 'en-US' : 'ro-RO', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : '';

  return (
    <Link to={`/blog/${post.slug}`} className="block">
      <div className="glass-card overflow-hidden group cursor-pointer h-full">
        {post.cover_image && (
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={post.cover_image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
          </div>
        )}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs text-muted-foreground capitalize">
              {post.category}
            </span>
            {date && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                {date}
              </span>
            )}
          </div>
          <h3 className="font-heading font-semibold text-lg text-foreground mb-2 group-hover:text-primary-light transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{excerpt}</p>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              {post.read_time_minutes} min
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Eye className="w-3 h-3" />
              {post.views}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Blog;
