import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface BlogPostRow {
  id: string;
  slug: string;
  title_ro: string;
  title_en: string;
  excerpt_ro: string;
  excerpt_en: string;
  content_ro: string;
  content_en: string;
  cover_image: string | null;
  category: string;
  tags: string[];
  published: boolean;
  featured: boolean;
  read_time_minutes: number;
  views: number;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  deleted_at: string | null;
}

// ---------- useBlogPosts (public, published only) ----------
export function useBlogPosts() {
  const [data, setData] = useState<BlogPostRow[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase
      .from('blog_posts')
      .select('*')
      .is('deleted_at', null)
      .eq('published', true)
      .order('published_at', { ascending: false })
      .then(({ data }) => {
        setData((data as BlogPostRow[]) || []);
        setLoading(false);
      });
  }, []);
  return { data, loading };
}

// ---------- useBlogPost (single by slug, public) ----------
export function useBlogPost(slug: string | undefined) {
  const [data, setData] = useState<BlogPostRow | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!slug) { setLoading(false); return; }
    supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .is('deleted_at', null)
      .single()
      .then(({ data }) => {
        setData((data as BlogPostRow) || null);
        setLoading(false);
      });
  }, [slug]);
  return { data, loading };
}

// ---------- useAdminBlogPosts (all, for admin) ----------
export function useAdminBlogPosts() {
  const [data, setData] = useState<BlogPostRow[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .is('deleted_at', null)
      .order('created_at', { ascending: false });
    setData((data as BlogPostRow[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, refetch: fetch };
}

// ---------- Mutations ----------
export async function createBlogPost(post: Omit<BlogPostRow, 'id' | 'views' | 'created_at' | 'updated_at' | 'deleted_at'>) {
  const { error } = await supabase.from('blog_posts').insert(post);
  return { error };
}

export async function updateBlogPost(id: string, updates: Partial<BlogPostRow>) {
  const { error } = await supabase
    .from('blog_posts')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id);
  return { error };
}

export async function deleteBlogPost(id: string) {
  const { error } = await supabase
    .from('blog_posts')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id);
  return { error };
}

export async function incrementBlogViews(id: string) {
  await supabase.rpc('increment_blog_views', { post_id: id }).catch(() => {
    // Fallback: manual increment if RPC doesn't exist
    supabase
      .from('blog_posts')
      .select('views')
      .eq('id', id)
      .single()
      .then(({ data }) => {
        if (data) {
          supabase
            .from('blog_posts')
            .update({ views: (data as any).views + 1 })
            .eq('id', id)
            .then(() => {});
        }
      });
  });
}
