import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { getUserFriendlyError } from '@/lib/errorUtils';
import { useConfirm } from '@/hooks/useConfirm';
import { Plus, Trash2, Save } from 'lucide-react';

interface Service {
  id: string;
  sort_order: number;
  icon: string;
  icon_gradient: string;
  title_ro: string;
  title_en: string;
  description_ro: string;
  description_en: string;
  price_label_ro: string | null;
  price_label_en: string | null;
  features_ro: string[];
  features_en: string[];
  anchor: string | null;
}

const AdminServices = () => {
  const [items, setItems] = useState<Service[]>([]);
  const [editing, setEditing] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { confirm, ConfirmDialog } = useConfirm();

  useEffect(() => { fetch(); }, [location.key]);

  async function fetch() {
    const { data } = await supabase.from('services').select('*').is('deleted_at', null).order('sort_order');
    setItems((data as any[]) || []);
    setLoading(false);
  }

  async function handleSave() {
    if (!editing) return;
    const { id, ...rest } = editing;
    if (id.startsWith('new-')) {
      const { error } = await supabase.from('services').insert({ ...rest });
      if (error) { toast.error(getUserFriendlyError(error)); return; }
    } else {
      const { error } = await supabase.from('services').update(rest).eq('id', id);
      if (error) { toast.error(getUserFriendlyError(error)); return; }
    }
    toast.success('Serviciu salvat!');
    setEditing(null);
    fetch();
  }

  async function handleDelete(id: string) {
    if (!await confirm('Mută în Coș Reciclare? Poți restaura oricând din Admin → Coș Reciclare.')) return;
    const { error } = await supabase.from('services').update({ deleted_at: new Date().toISOString() }).eq('id', id);
    if (error) { toast.error(getUserFriendlyError(error)); return; }
    toast.success('Mutat în Coș Reciclare!');
    fetch();
  }

  function newItem() {
    setEditing({
      id: `new-${Date.now()}`, sort_order: items.length, icon: 'code', icon_gradient: 'violet',
      title_ro: '', title_en: '', description_ro: '', description_en: '',
      price_label_ro: null, price_label_en: null, features_ro: [], features_en: [], anchor: null,
    });
  }

  if (loading) return <p className="text-muted-foreground">Se încarcă...</p>;

  if (editing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-heading font-bold text-2xl text-foreground">
            {editing.id.startsWith('new-') ? 'Serviciu nou' : `Editare: ${editing.title_ro}`}
          </h1>
          <Button variant="ghost" onClick={() => setEditing(null)}>Înapoi</Button>
        </div>
        <div className="glass-card p-6 space-y-5" style={{ transform: 'none' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Titlu (RO)</Label><Input value={editing.title_ro} onChange={(e) => setEditing({ ...editing, title_ro: e.target.value })} className="bg-white/5 border-white/10" /></div>
            <div className="space-y-2"><Label>Titlu (EN)</Label><Input value={editing.title_en} onChange={(e) => setEditing({ ...editing, title_en: e.target.value })} className="bg-white/5 border-white/10" /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Descriere (RO)</Label><Textarea value={editing.description_ro} onChange={(e) => setEditing({ ...editing, description_ro: e.target.value })} className="bg-white/5 border-white/10" /></div>
            <div className="space-y-2"><Label>Descriere (EN)</Label><Textarea value={editing.description_en} onChange={(e) => setEditing({ ...editing, description_en: e.target.value })} className="bg-white/5 border-white/10" /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Preț (RO)</Label><Input value={editing.price_label_ro || ''} onChange={(e) => setEditing({ ...editing, price_label_ro: e.target.value })} className="bg-white/5 border-white/10" placeholder="De la 1.500 RON" /></div>
            <div className="space-y-2"><Label>Preț (EN)</Label><Input value={editing.price_label_en || ''} onChange={(e) => setEditing({ ...editing, price_label_en: e.target.value })} className="bg-white/5 border-white/10" placeholder="From 1,500 RON" /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Features (RO, câte una pe linie)</Label><Textarea value={editing.features_ro.join('\n')} onChange={(e) => setEditing({ ...editing, features_ro: e.target.value.split('\n').filter(Boolean) })} className="bg-white/5 border-white/10" rows={6} /></div>
            <div className="space-y-2"><Label>Features (EN, câte una pe linie)</Label><Textarea value={editing.features_en.join('\n')} onChange={(e) => setEditing({ ...editing, features_en: e.target.value.split('\n').filter(Boolean) })} className="bg-white/5 border-white/10" rows={6} /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2"><Label>Icon</Label><Input value={editing.icon} onChange={(e) => setEditing({ ...editing, icon: e.target.value })} className="bg-white/5 border-white/10" /></div>
            <div className="space-y-2"><Label>Gradient</Label><Input value={editing.icon_gradient} onChange={(e) => setEditing({ ...editing, icon_gradient: e.target.value })} className="bg-white/5 border-white/10" /></div>
            <div className="space-y-2"><Label>Anchor</Label><Input value={editing.anchor || ''} onChange={(e) => setEditing({ ...editing, anchor: e.target.value })} className="bg-white/5 border-white/10" placeholder="web-development" /></div>
          </div>
          <div className="space-y-2">
            <Label>Ordine</Label>
            <Input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: parseInt(e.target.value) || 0 })} className="bg-white/5 border-white/10 w-24" />
          </div>
          <Button onClick={handleSave} className="gradient-primary text-white border-0 rounded-2xl"><Save className="w-4 h-4 mr-2" /> Salvează</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <h1 className="font-heading font-bold text-xl sm:text-2xl text-foreground">Servicii</h1>
        <Button onClick={newItem} size="sm" className="gradient-primary text-white border-0 rounded-2xl self-start"><Plus className="w-4 h-4 mr-2" /> Serviciu nou</Button>
      </div>
      <div className="space-y-3">
        {items.map((s) => (
          <div key={s.id} className="glass-card p-3 sm:p-4" style={{ transform: 'none' }}>
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="font-heading font-semibold text-foreground text-sm truncate">{s.title_ro}</h3>
                <p className="text-xs text-muted-foreground">{s.price_label_ro}</p>
              </div>
              <div className="flex shrink-0 gap-1">
                <Button size="sm" variant="ghost" onClick={() => setEditing(s)} className="h-8 px-2 text-xs">Editează</Button>
                <Button size="sm" variant="ghost" onClick={() => handleDelete(s.id)} className="text-destructive h-8 px-2"><Trash2 className="w-3.5 h-3.5" /></Button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-muted-foreground text-sm">Niciun serviciu.</p>}
      </div>
      {ConfirmDialog}
    </div>
  );
};

export default AdminServices;
