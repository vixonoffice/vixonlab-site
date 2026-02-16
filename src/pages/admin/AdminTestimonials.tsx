import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { getUserFriendlyError } from '@/lib/errorUtils';
import { Plus, Trash2, Save } from 'lucide-react';

interface Testimonial {
  id: string;
  sort_order: number;
  quote_ro: string;
  quote_en: string;
  author_name: string;
  author_role: string;
  author_initial: string;
  avatar_gradient: string;
}

const AdminTestimonials = () => {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => { fetchData(); }, [location.key]);

  async function fetchData() {
    const { data } = await supabase.from('testimonials').select('*').order('sort_order');
    setItems((data as any[]) || []);
    setLoading(false);
  }

  async function handleSave() {
    if (!editing) return;
    const { id, ...rest } = editing;
    if (id.startsWith('new-')) {
      const { error } = await supabase.from('testimonials').insert({ ...rest });
      if (error) { toast.error(getUserFriendlyError(error)); return; }
    } else {
      const { error } = await supabase.from('testimonials').update(rest).eq('id', id);
      if (error) { toast.error(getUserFriendlyError(error)); return; }
    }
    toast.success('Testimonial salvat!');
    setEditing(null);
    fetchData();
  }

  async function handleDelete(id: string) {
    if (!confirm('Sigur?')) return;
    await supabase.from('testimonials').delete().eq('id', id);
    toast.success('Șters!');
    fetchData();
  }

  function newItem() {
    setEditing({
      id: `new-${Date.now()}`, sort_order: items.length,
      quote_ro: '', quote_en: '', author_name: '', author_role: '', author_initial: '', avatar_gradient: 'violet',
    });
  }

  if (loading) return <p className="text-muted-foreground">Se încarcă...</p>;

  if (editing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-heading font-bold text-2xl text-foreground">
            {editing.id.startsWith('new-') ? 'Testimonial nou' : `Editare: ${editing.author_name}`}
          </h1>
          <Button variant="ghost" onClick={() => setEditing(null)}>Înapoi</Button>
        </div>
        <div className="glass-card p-6 space-y-5" style={{ transform: 'none' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Citat (RO)</Label><Textarea value={editing.quote_ro} onChange={(e) => setEditing({ ...editing, quote_ro: e.target.value })} className="bg-white/5 border-white/10" rows={4} /></div>
            <div className="space-y-2"><Label>Citat (EN)</Label><Textarea value={editing.quote_en} onChange={(e) => setEditing({ ...editing, quote_en: e.target.value })} className="bg-white/5 border-white/10" rows={4} /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2"><Label>Nume autor</Label><Input value={editing.author_name} onChange={(e) => setEditing({ ...editing, author_name: e.target.value })} className="bg-white/5 border-white/10" /></div>
            <div className="space-y-2"><Label>Rol/Companie</Label><Input value={editing.author_role} onChange={(e) => setEditing({ ...editing, author_role: e.target.value })} className="bg-white/5 border-white/10" /></div>
            <div className="space-y-2"><Label>Inițială</Label><Input value={editing.author_initial} onChange={(e) => setEditing({ ...editing, author_initial: e.target.value })} className="bg-white/5 border-white/10" maxLength={2} /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Gradient avatar</Label><Input value={editing.avatar_gradient} onChange={(e) => setEditing({ ...editing, avatar_gradient: e.target.value })} className="bg-white/5 border-white/10" placeholder="violet / pink / blue" /></div>
            <div className="space-y-2"><Label>Ordine</Label><Input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: parseInt(e.target.value) || 0 })} className="bg-white/5 border-white/10" /></div>
          </div>
          <Button onClick={handleSave} className="gradient-primary text-white border-0 rounded-2xl"><Save className="w-4 h-4 mr-2" /> Salvează</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <h1 className="font-heading font-bold text-xl sm:text-2xl text-foreground">Testimoniale</h1>
        <Button onClick={newItem} size="sm" className="gradient-primary text-white border-0 rounded-2xl self-start"><Plus className="w-4 h-4 mr-2" /> Testimonial nou</Button>
      </div>
      <div className="space-y-3">
        {items.map((t) => (
          <div key={t.id} className="glass-card p-3 sm:p-4" style={{ transform: 'none' }}>
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="font-heading font-semibold text-foreground text-sm">{t.author_name}</h3>
                <p className="text-xs text-muted-foreground truncate">{t.quote_ro.substring(0, 60)}...</p>
              </div>
              <div className="flex shrink-0 gap-1">
                <Button size="sm" variant="ghost" onClick={() => setEditing(t)} className="h-8 px-2 text-xs">Editează</Button>
                <Button size="sm" variant="ghost" onClick={() => handleDelete(t.id)} className="text-destructive h-8 px-2"><Trash2 className="w-3.5 h-3.5" /></Button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-muted-foreground text-sm">Niciun testimonial.</p>}
      </div>
    </div>
  );
};

export default AdminTestimonials;
