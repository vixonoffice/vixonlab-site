import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { getUserFriendlyError } from '@/lib/errorUtils';
import { Plus, Trash2, Save, GripVertical } from 'lucide-react';

interface PortfolioProject {
  id: string;
  sort_order: number;
  category: string;
  title: string;
  subtitle_ro: string;
  subtitle_en: string;
  description_ro: string;
  description_en: string;
  tags: string[];
  image_url: string | null;
}

const AdminPortfolio = () => {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [editing, setEditing] = useState<PortfolioProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const location = useLocation();

  useEffect(() => { fetchProjects(); }, [location.key]);

  async function fetchProjects() {
    const { data } = await supabase
      .from('portfolio_projects')
      .select('*')
      .order('sort_order');
    setProjects((data as any[]) || []);
    setLoading(false);
  }

  async function handleSave() {
    if (!editing) return;
    const { id, ...rest } = editing;
    
    if (id.startsWith('new-')) {
      const { error } = await supabase.from('portfolio_projects').insert({ ...rest });
      if (error) { toast.error(getUserFriendlyError(error)); return; }
    } else {
      const { error } = await supabase.from('portfolio_projects').update(rest).eq('id', id);
      if (error) { toast.error(getUserFriendlyError(error)); return; }
    }
    
    toast.success('Proiect salvat!');
    setEditing(null);
    fetchProjects();
  }

  async function handleDelete(id: string) {
    if (!confirm('Sigur vrei să ștergi acest proiect?')) return;
    const { error } = await supabase.from('portfolio_projects').delete().eq('id', id);
    if (error) { toast.error(getUserFriendlyError(error)); return; }
    toast.success('Proiect șters!');
    fetchProjects();
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.[0] || !editing) return;
    setUploading(true);
    const file = e.target.files[0];
    const ext = file.name.split('.').pop();
    const path = `portfolio/${Date.now()}.${ext}`;

    const { error: upError } = await supabase.storage.from('site-assets').upload(path, file);
    if (upError) { toast.error(upError.message); setUploading(false); return; }

    const { data: urlData } = supabase.storage.from('site-assets').getPublicUrl(path);
    setEditing({ ...editing, image_url: urlData.publicUrl });
    setUploading(false);
    toast.success('Imagine încărcată!');
  }

  function newProject() {
    setEditing({
      id: `new-${Date.now()}`,
      sort_order: projects.length,
      category: 'webdev',
      title: '',
      subtitle_ro: '',
      subtitle_en: '',
      description_ro: '',
      description_en: '',
      tags: [],
      image_url: null,
    });
  }

  if (loading) return <p className="text-muted-foreground">Se încarcă...</p>;

  if (editing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-heading font-bold text-2xl text-foreground">
            {editing.id.startsWith('new-') ? 'Proiect nou' : `Editare: ${editing.title}`}
          </h1>
          <Button variant="ghost" onClick={() => setEditing(null)}>Înapoi</Button>
        </div>

        <div className="glass-card p-6 space-y-5" style={{ transform: 'none' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Titlu</Label>
              <Input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="bg-white/5 border-white/10" />
            </div>
            <div className="space-y-2">
              <Label>Categorie</Label>
              <select
                value={editing.category}
                onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                className="w-full h-10 rounded-md border border-white/10 bg-white/5 px-3 text-sm text-foreground"
              >
                <option value="webdev">Web Development</option>
                <option value="ecommerce">Ecommerce</option>
                <option value="design">Design</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Subtitle (RO)</Label>
              <Input value={editing.subtitle_ro} onChange={(e) => setEditing({ ...editing, subtitle_ro: e.target.value })} className="bg-white/5 border-white/10" />
            </div>
            <div className="space-y-2">
              <Label>Subtitle (EN)</Label>
              <Input value={editing.subtitle_en} onChange={(e) => setEditing({ ...editing, subtitle_en: e.target.value })} className="bg-white/5 border-white/10" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Descriere (RO)</Label>
              <Textarea value={editing.description_ro} onChange={(e) => setEditing({ ...editing, description_ro: e.target.value })} className="bg-white/5 border-white/10" />
            </div>
            <div className="space-y-2">
              <Label>Descriere (EN)</Label>
              <Textarea value={editing.description_en} onChange={(e) => setEditing({ ...editing, description_en: e.target.value })} className="bg-white/5 border-white/10" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tags (separate prin virgulă)</Label>
            <Input
              value={editing.tags.join(', ')}
              onChange={(e) => setEditing({ ...editing, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })}
              className="bg-white/5 border-white/10"
              placeholder="Next.js, Tailwind, CMS"
            />
          </div>

          <div className="space-y-2">
            <Label>Ordine sortare</Label>
            <Input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: parseInt(e.target.value) || 0 })} className="bg-white/5 border-white/10 w-24" />
          </div>

          <div className="space-y-2">
            <Label>Imagine</Label>
            {editing.image_url && (
              <img src={editing.image_url} alt="" className="w-48 h-32 object-cover rounded-xl mb-2" />
            )}
            <Input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} className="bg-white/5 border-white/10" />
          </div>

          <Button onClick={handleSave} className="gradient-primary text-white border-0 rounded-2xl">
            <Save className="w-4 h-4 mr-2" /> Salvează
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <h1 className="font-heading font-bold text-xl sm:text-2xl text-foreground">Portofoliu</h1>
        <Button onClick={newProject} size="sm" className="gradient-primary text-white border-0 rounded-2xl self-start">
          <Plus className="w-4 h-4 mr-2" /> Proiect nou
        </Button>
      </div>

      <div className="space-y-3">
        {projects.map((p) => (
          <div key={p.id} className="glass-card p-3 sm:p-4" style={{ transform: 'none' }}>
            <div className="flex items-start gap-3">
              {p.image_url && <img src={p.image_url} alt="" className="w-12 h-8 sm:w-16 sm:h-10 object-cover rounded shrink-0" />}
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-semibold text-foreground text-sm truncate">{p.title}</h3>
                <p className="text-xs text-muted-foreground truncate">{p.category} — {p.subtitle_ro}</p>
              </div>
              <div className="flex shrink-0 gap-1">
                <Button size="sm" variant="ghost" onClick={() => setEditing(p)} className="h-8 px-2 text-xs">Editează</Button>
                <Button size="sm" variant="ghost" onClick={() => handleDelete(p.id)} className="text-destructive h-8 px-2">
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <p className="text-muted-foreground text-sm">Niciun proiect. Adaugă primul!</p>
        )}
      </div>
    </div>
  );
};

export default AdminPortfolio;
