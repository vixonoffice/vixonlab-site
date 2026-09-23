import { useEffect, useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePageSEO } from '@/hooks/usePageSEO';
import { PageTransition } from '@/components/PageTransition';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SectionWrapper } from '@/components/SectionWrapper';
import { ArrowLeft, Clock, Calendar, Eye, Tag } from 'lucide-react';
import { useBlogPost, useBlogPosts, incrementBlogViews } from '@/hooks/useBlogData';

// Simple markdown-to-HTML renderer (no external packages)
function renderMarkdown(md: string): string {
  let html = md
    // Code blocks (``` ... ```)
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="bg-white/5 border border-white/10 rounded-xl p-4 overflow-x-auto my-4 text-sm"><code>$2</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-sm text-primary-light">$1</code>')
    // Images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="rounded-xl my-4 max-w-full" loading="lazy" />')
    // Links — sanitize: only allow http/https/relative URLs
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, url) => {
      const safe = /^(https?:\/\/|\/)/i.test(url) ? url : '#';
      return `<a href="${safe}" target="_blank" rel="noopener noreferrer" class="text-primary-light underline hover:opacity-80">${text}</a>`;
    })
    // Bold
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
    // Italic
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // H3
    .replace(/^### (.+)$/gm, '<h3 class="font-heading font-semibold text-xl text-foreground mt-8 mb-3">$1</h3>')
    // H2
    .replace(/^## (.+)$/gm, '<h2 class="font-heading font-bold text-2xl text-foreground mt-10 mb-4">$1</h2>')
    // H1
    .replace(/^# (.+)$/gm, '<h1 class="font-heading font-bold text-3xl text-foreground mt-10 mb-4">$1</h1>')
    // Horizontal rule
    .replace(/^---$/gm, '<hr class="border-white/10 my-8" />')
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li class="ml-4 text-muted-foreground list-disc">$1</li>')
    // Ordered lists
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 text-muted-foreground list-decimal">$1</li>')
    // Blockquote
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-2 border-primary/40 pl-4 italic text-muted-foreground my-4">$1</blockquote>');

  // Wrap consecutive <li> in <ul>
  html = html.replace(/((<li class="ml-4 text-muted-foreground list-disc">.*<\/li>\n?)+)/g, '<ul class="space-y-1.5 my-4">$1</ul>');
  html = html.replace(/((<li class="ml-4 text-muted-foreground list-decimal">.*<\/li>\n?)+)/g, '<ol class="space-y-1.5 my-4">$1</ol>');

  // Paragraphs: wrap remaining lines that aren't already tags
  html = html
    .split('\n')
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return '';
      if (trimmed.startsWith('<')) return line;
      return `<p class="text-muted-foreground leading-relaxed mb-4">${trimmed}</p>`;
    })
    .join('\n');

  return html;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const { data: post, loading } = useBlogPost(slug);
  const { data: allPosts } = useBlogPosts();

  const isEn = language === 'en';

  usePageSEO({
    title: post ? (isEn ? post.title_en : post.title_ro) : 'Blog',
    description: post ? (isEn ? post.excerpt_en : post.excerpt_ro) : '',
  });

  // Increment views once
  useEffect(() => {
    if (post?.id) {
      incrementBlogViews(post.id);
    }
  }, [post?.id]);

  // Related posts: same category, excluding current
  const related = useMemo(() => {
    if (!post) return [];
    return allPosts
      .filter((p) => p.id !== post.id && p.category === post.category)
      .slice(0, 3);
  }, [post, allPosts]);

  if (loading) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Se incarca...</p>
        </div>
      </PageTransition>
    );
  }

  if (!post) return <Navigate to="/blog" replace />;

  const title = isEn ? post.title_en : post.title_ro;
  const content = isEn ? post.content_en : post.content_ro;
  const excerpt = isEn ? post.excerpt_en : post.excerpt_ro;
  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString(isEn ? 'en-US' : 'ro-RO', {
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
            {isEn ? 'Back to Blog' : 'Inapoi la Blog'}
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
              {post.read_time_minutes} min {isEn ? 'read' : 'lectura'}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Eye className="w-3.5 h-3.5" />
              {post.views} {isEn ? 'views' : 'vizualizari'}
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
              {isEn ? 'Related Articles' : 'Articole similare'}
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
                          alt={isEn ? rp.title_en : rp.title_ro}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                      </div>
                    )}
                    <div className="p-5">
                      <h3 className="font-heading font-semibold text-base text-foreground mb-2 group-hover:text-primary-light transition-colors line-clamp-2">
                        {isEn ? rp.title_en : rp.title_ro}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {isEn ? rp.excerpt_en : rp.excerpt_ro}
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
              {isEn ? 'Have a project in mind?' : 'Ai un proiect in minte?'}
            </h2>
            <Link
              to="/contact"
              className="bg-foreground text-background font-medium px-8 py-3.5 rounded-2xl inline-block hover:opacity-90 transition-opacity"
            >
              {isEn ? 'Contact Us' : 'Contacteaza-ne'}
            </Link>
          </div>
        </ScrollReveal>
      </SectionWrapper>
    </PageTransition>
  );
};

export default BlogPost;
