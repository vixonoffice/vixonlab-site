import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { getUserFriendlyError } from '@/lib/errorUtils';
import { Plus, Trash2, Save, Eye, EyeOff, Star, StarOff, ChevronUp, ChevronDown } from 'lucide-react';
import {
  useAdminBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  type BlogPostRow,
} from '@/hooks/useBlogData';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

interface EditingPost {
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
  published_at: string | null;
}

const emptyPost: EditingPost = {
  id: '',
  slug: '',
  title_ro: '',
  title_en: '',
  excerpt_ro: '',
  excerpt_en: '',
  content_ro: '',
  content_en: '',
  cover_image: null,
  category: 'development',
  tags: [],
  published: false,
  featured: false,
  read_time_minutes: 5,
  published_at: null,
};

const AdminBlog = () => {
  const { data: posts, loading, refetch } = useAdminBlogPosts();

  async function movePost(id: string, direction: 'up' | 'down') {
    const idx = posts.findIndex((p) => p.id === id);
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= posts.length) return;
    const a = posts[idx];
    const b = posts[swapIdx];
    await Promise.all([
      supabase.from('blog_posts').update({ sort_order: b.sort_order }).eq('id', a.id),
      supabase.from('blog_posts').update({ sort_order: a.sort_order }).eq('id', b.id),
    ]);
    refetch();
  }
  const [editing, setEditing] = useState<EditingPost | null>(null);
  const [uploading, setUploading] = useState(false);
  const location = useLocation();

  function startEdit(p: BlogPostRow) {
    setEditing({
      id: p.id,
      slug: p.slug,
      title_ro: p.title_ro,
      title_en: p.title_en,
      excerpt_ro: p.excerpt_ro,
      excerpt_en: p.excerpt_en,
      content_ro: p.content_ro,
      content_en: p.content_en,
      cover_image: p.cover_image,
      category: p.category,
      tags: p.tags || [],
      published: p.published,
      featured: p.featured,
      read_time_minutes: p.read_time_minutes,
      published_at: p.published_at,
    });
  }

  function newPost() {
    setEditing({ ...emptyPost, id: `new-${Date.now()}` });
  }

  async function handleSave() {
    if (!editing) return;

    const slug = editing.slug || slugify(editing.title_ro);
    const publishedAt =
      editing.published && !editing.published_at
        ? new Date().toISOString()
        : editing.published_at;

    const payload = {
      slug,
      title_ro: editing.title_ro,
      title_en: editing.title_en,
      excerpt_ro: editing.excerpt_ro,
      excerpt_en: editing.excerpt_en,
      content_ro: editing.content_ro,
      content_en: editing.content_en,
      cover_image: editing.cover_image,
      category: editing.category,
      tags: editing.tags,
      published: editing.published,
      featured: editing.featured,
      read_time_minutes: editing.read_time_minutes,
      published_at: publishedAt,
    };

    if (editing.id.startsWith('new-')) {
      const { error } = await createBlogPost(payload);
      if (error) {
        toast.error(getUserFriendlyError(error));
        return;
      }
    } else {
      const { error } = await updateBlogPost(editing.id, payload);
      if (error) {
        toast.error(getUserFriendlyError(error));
        return;
      }
    }

    toast.success('Articol salvat!');
    setEditing(null);
    refetch();
  }

  async function handleDelete(id: string) {
    if (!confirm('Muta in Cos Reciclare?')) return;
    const { error } = await deleteBlogPost(id);
    if (error) {
      toast.error(getUserFriendlyError(error));
      return;
    }
    toast.success('Articol mutat in Cos Reciclare.');
    refetch();
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.[0] || !editing) return;
    setUploading(true);
    const file = e.target.files[0];
    const ext = file.name.split('.').pop();
    const path = `blog/${Date.now()}.${ext}`;

    const { error: upError } = await supabase.storage
      .from('site-assets')
      .upload(path, file);
    if (upError) {
      toast.error(upError.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from('site-assets')
      .getPublicUrl(path);
    setEditing({ ...editing, cover_image: urlData.publicUrl });
    setUploading(false);
    toast.success('Imagine incarcata!');
  }

  if (loading) return <p className="text-muted-foreground">Se incarca...</p>;

  // ---- EDIT FORM ----
  if (editing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-heading font-bold text-2xl text-foreground">
            {editing.id.startsWith('new-') ? 'Articol nou' : `Editare: ${editing.title_ro}`}
          </h1>
          <Button variant="ghost" onClick={() => setEditing(null)}>
            Inapoi
          </Button>
        </div>

        <div className="glass-card p-6 space-y-5" style={{ transform: 'none' }}>
          {/* Title */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Titlu (RO)</Label>
              <Input
                value={editing.title_ro}
                onChange={(e) => setEditing({ ...editing, title_ro: e.target.value })}
                className="bg-white/5 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label>Title (EN)</Label>
              <Input
                value={editing.title_en}
                onChange={(e) => setEditing({ ...editing, title_en: e.target.value })}
                className="bg-white/5 border-white/10"
              />
            </div>
          </div>

          {/* Slug & Category */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Slug (URL)</Label>
              <Input
                value={editing.slug}
                onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                placeholder={slugify(editing.title_ro || 'titlu-articol')}
                className="bg-white/5 border-white/10"
              />
              <p className="text-xs text-muted-foreground">
                Se auto-genereaza din titlu daca e gol
              </p>
            </div>
            <div className="space-y-2">
              <Label>Categorie</Label>
              <Input
                value={editing.category}
                onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                placeholder="development"
                className="bg-white/5 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label>Timp lectura (min)</Label>
              <Input
                type="number"
                value={editing.read_time_minutes}
                onChange={(e) =>
                  setEditing({ ...editing, read_time_minutes: parseInt(e.target.value) || 1 })
                }
                className="bg-white/5 border-white/10 w-24"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Rezumat (RO)</Label>
              <Textarea
                value={editing.excerpt_ro}
                onChange={(e) => setEditing({ ...editing, excerpt_ro: e.target.value })}
                rows={3}
                className="bg-white/5 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label>Excerpt (EN)</Label>
              <Textarea
                value={editing.excerpt_en}
                onChange={(e) => setEditing({ ...editing, excerpt_en: e.target.value })}
                rows={3}
                className="bg-white/5 border-white/10"
              />
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Continut (RO) - Markdown</Label>
              <Textarea
                value={editing.content_ro}
                onChange={(e) => setEditing({ ...editing, content_ro: e.target.value })}
                rows={15}
                className="bg-white/5 border-white/10 font-mono text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label>Content (EN) - Markdown</Label>
              <Textarea
                value={editing.content_en}
                onChange={(e) => setEditing({ ...editing, content_en: e.target.value })}
                rows={15}
                className="bg-white/5 border-white/10 font-mono text-sm"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags (separate prin virgula)</Label>
            <Input
              value={editing.tags.join(', ')}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  tags: e.target.value
                    .split(',')
                    .map((t) => t.trim())
                    .filter(Boolean),
                })
              }
              className="bg-white/5 border-white/10"
              placeholder="React, SEO, Performance"
            />
          </div>

          {/* Cover image */}
          <div className="space-y-2">
            <Label>Imagine copertă</Label>
            {editing.cover_image && (
              <img
                src={editing.cover_image}
                alt=""
                className="w-48 h-32 object-cover rounded-xl mb-2"
              />
            )}
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              className="bg-white/5 border-white/10"
            />
          </div>

          {/* Toggles */}
          <div className="flex flex-wrap gap-6 border-t border-white/10 pt-5">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={editing.published}
                onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
                className="w-4 h-4 rounded border-white/20"
              />
              <span className="font-heading font-semibold text-foreground flex items-center gap-1.5">
                {editing.published ? <Eye className="w-4 h-4 text-green-400" /> : <EyeOff className="w-4 h-4" />}
                Publicat
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={editing.featured}
                onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                className="w-4 h-4 rounded border-white/20"
              />
              <span className="font-heading font-semibold text-foreground flex items-center gap-1.5">
                {editing.featured ? <Star className="w-4 h-4 text-yellow-400" /> : <StarOff className="w-4 h-4" />}
                Featured
              </span>
            </label>
          </div>

          <Button
            onClick={handleSave}
            className="gradient-primary text-white border-0 rounded-2xl"
          >
            <Save className="w-4 h-4 mr-2" /> Salveaza
          </Button>
        </div>
      </div>
    );
  }

  // ---- LIST VIEW ----
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <h1 className="font-heading font-bold text-xl sm:text-2xl text-foreground">Blog</h1>
        <Button
          onClick={newPost}
          size="sm"
          className="gradient-primary text-white border-0 rounded-2xl self-start"
        >
          <Plus className="w-4 h-4 mr-2" /> Articol nou
        </Button>
      </div>

      <div className="space-y-3">
        {posts.map((p, idx) => (
          <div key={p.id} className="glass-card p-3 sm:p-4" style={{ transform: 'none' }}>
            <div className="flex items-center gap-3">
              {/* Order buttons */}
              <div className="flex flex-col shrink-0">
                <button
                  onClick={() => movePost(p.id, 'up')}
                  disabled={idx === 0}
                  className="p-0.5 rounded hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                  title="Mută sus"
                >
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                </button>
                <button
                  onClick={() => movePost(p.id, 'down')}
                  disabled={idx === posts.length - 1}
                  className="p-0.5 rounded hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                  title="Mută jos"
                >
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              {p.cover_image && (
                <img
                  src={p.cover_image}
                  alt=""
                  className="w-12 h-8 sm:w-16 sm:h-10 object-cover rounded shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-semibold text-foreground text-sm truncate">
                  {p.title_ro}
                  {p.featured && (
                    <Star className="w-3 h-3 text-yellow-400 inline ml-1.5" />
                  )}
                  {!p.published && (
                    <span className="ml-2 text-xs text-muted-foreground">[Draft]</span>
                  )}
                </h3>
                <p className="text-xs text-muted-foreground truncate">
                  {p.category} — /{p.slug} — {p.views} views
                </p>
              </div>
              <div className="flex shrink-0 gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => startEdit(p)}
                  className="h-8 px-2 text-xs"
                >
                  Editeaza
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDelete(p.id)}
                  className="text-destructive h-8 px-2"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        {posts.length === 0 && (
          <p className="text-muted-foreground text-sm">Niciun articol. Adauga primul!</p>
        )}
      </div>
    </div>
  );
};

export default AdminBlog;
