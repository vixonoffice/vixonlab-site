import { useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Link } from '@/components/LocalizedLink';
import { usePageSEO } from '@/hooks/usePageSEO';
import { PageTransition } from '@/components/PageTransition';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SectionWrapper } from '@/components/SectionWrapper';
import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-react';
import { BLOG_POSTS, getBlogPost } from '@/data/blog';
import { renderMarkdown } from '@/lib/markdown';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPost(slug);

  usePageSEO({
    title: post ? post.title_ro : 'Blog',
    description: post ? post.excerpt_ro : '',
  });

  // Related posts: same category, excluding current
  const related = useMemo(() => {
    if (!post) return [];
    return BLOG_POSTS
      .filter((p) => p.id !== post.id && p.category === post.category)
      .slice(0, 3);
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  const title = post.title_ro;
  const content = post.content_ro;
  const excerpt = post.excerpt_ro;
  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString('ro-RO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <PageTransition>
      {/* Hero */}
      <section className="section-padding pt-32 pb-0">
        <div className="mx-auto max-w-content">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Înapoi la blog
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-primary-light capitalize">
              {post.category}
            </span>
            {date && (
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Calendar className="w-3.5 h-3.5" />
                {date}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              {post.read_time_minutes} min lectură
            </span>
          </div>

          <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mb-6">{excerpt}</p>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-muted-foreground"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Cover image */}
      {post.cover_image && (
        <SectionWrapper className="!pt-6 !pb-6">
          <ScrollReveal>
            <div className="rounded-2xl overflow-hidden border border-white/10">
              <img
                src={post.cover_image}
                alt={title}
                className="w-full h-auto object-cover"
                loading="eager"
              />
            </div>
          </ScrollReveal>
        </SectionWrapper>
      )}

      {/* Content */}
      <SectionWrapper>
        <ScrollReveal>
          <article
            className="prose-custom max-w-3xl mx-auto"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
          />
        </ScrollReveal>
      </SectionWrapper>

      {/* Related posts */}
      {related.length > 0 && (
        <SectionWrapper>
          <ScrollReveal>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground text-center mb-10">
              Articole similare
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((rp) => (
              <ScrollReveal key={rp.id}>
                <Link to={`/blog/${rp.slug}`} className="block">
                  <div className="glass-card overflow-hidden group cursor-pointer h-full">
                    {rp.cover_image && (
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={rp.cover_image}
                          alt={rp.title_ro}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                      </div>
                    )}
                    <div className="p-5">
                      <h3 className="font-heading font-semibold text-base text-foreground mb-2 group-hover:text-primary-light transition-colors line-clamp-2">
                        {rp.title_ro}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {rp.excerpt_ro}
                      </p>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </SectionWrapper>
      )}

      {/* CTA */}
      <SectionWrapper>
        <ScrollReveal>
          <div className="glass-card p-10 md:p-16 text-center max-w-3xl mx-auto">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
              Ai un proiect în minte?
            </h2>
            <Link
              to="/contact"
              className="btn-primary font-medium px-8 py-3.5 rounded-full inline-block hover:opacity-90 transition-opacity"
            >
              Contactează-ne
            </Link>
          </div>
        </ScrollReveal>
      </SectionWrapper>
    </PageTransition>
  );
};

export default BlogPost;
