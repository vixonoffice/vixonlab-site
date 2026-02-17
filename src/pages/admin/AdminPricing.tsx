import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { getUserFriendlyError } from '@/lib/errorUtils';
import { Plus, Trash2, Save } from 'lucide-react';

interface PricingPlan {
  id: string;
  sort_order: number;
  name_ro: string;
  name_en: string;
  price_label_ro: string;
  price_label_en: string;
  description_ro: string;
  description_en: string;
  features_ro: string[];
  features_en: string[];
  is_popular: boolean;
  cta_label_ro: string;
  cta_label_en: string;
}

const AdminPricing = () => {
  const [items, setItems] = useState<PricingPlan[]>([]);
  const [editing, setEditing] = useState<PricingPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => { fetchData(); }, [location.key]);

  async function fetchData() {
    const { data } = await supabase.from('pricing_plans').select('*').order('sort_order');
    setItems((data as any[]) || []);
    setLoading(false);
  }

  async function handleSave() {
    if (!editing) return;
    const { id, ...rest } = editing;
    if (id.startsWith('new-')) {
      const { error } = await supabase.from('pricing_plans').insert({ ...rest });
      if (error) { toast.error(getUserFriendlyError(error)); return; }
    } else {
      const { error } = await supabase.from('pricing_plans').update(rest).eq('id', id);
      if (error) { toast.error(getUserFriendlyError(error)); return; }
    }
    toast.success('Plan salvat!');
    setEditing(null);
    fetchData();
  }

  async function handleDelete(id: string) {
    if (!confirm('Mută în Coș Reciclare? Poți restaura oricând din Admin → Coș Reciclare.')) return;
    await supabase.from('pricing_plans').update({ deleted_at: new Date().toISOString() }).eq('id', id);
    toast.success('Mutat în Coș Reciclare!');
    fetchData();
  }

  function newItem() {
    setEditing({
      id: `new-${Date.now()}`, sort_order: items.length,
      name_ro: '', name_en: '', price_label_ro: '', price_label_en: '',
      description_ro: '', description_en: '', features_ro: [], features_en: [],
      is_popular: false, cta_label_ro: 'Contactează-ne', cta_label_en: 'Contact us',
    });
  }

  if (loading) return <p className="text-muted-foreground">Se încarcă...</p>;

  if (editing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-heading font-bold text-2xl text-foreground">
            {editing.id.startsWith('new-') ? 'Plan nou' : `Editare: ${editing.name_ro}`}
          </h1>
          <Button variant="ghost" onClick={() => setEditing(null)}>Înapoi</Button>
        </div>
        <div className="glass-card p-6 space-y-5" style={{ transform: 'none' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Nume (RO)</Label><Input value={editing.name_ro} onChange={(e) => setEditing({ ...editing, name_ro: e.target.value })} className="bg-white/5 border-white/10" /></div>
            <div className="space-y-2"><Label>Nume (EN)</Label><Input value={editing.name_en} onChange={(e) => setEditing({ ...editing, name_en: e.target.value })} className="bg-white/5 border-white/10" /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Preț (RO)</Label><Input value={editing.price_label_ro} onChange={(e) => setEditing({ ...editing, price_label_ro: e.target.value })} className="bg-white/5 border-white/10" /></div>
            <div className="space-y-2"><Label>Preț (EN)</Label><Input value={editing.price_label_en} onChange={(e) => setEditing({ ...editing, price_label_en: e.target.value })} className="bg-white/5 border-white/10" /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Descriere (RO)</Label><Textarea value={editing.description_ro} onChange={(e) => setEditing({ ...editing, description_ro: e.target.value })} className="bg-white/5 border-white/10" /></div>
            <div className="space-y-2"><Label>Descriere (EN)</Label><Textarea value={editing.description_en} onChange={(e) => setEditing({ ...editing, description_en: e.target.value })} className="bg-white/5 border-white/10" /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Features (RO, câte una pe linie)</Label><Textarea value={editing.features_ro.join('\n')} onChange={(e) => setEditing({ ...editing, features_ro: e.target.value.split('\n').filter(Boolean) })} className="bg-white/5 border-white/10" rows={6} /></div>
            <div className="space-y-2"><Label>Features (EN, câte una pe linie)</Label><Textarea value={editing.features_en.join('\n')} onChange={(e) => setEditing({ ...editing, features_en: e.target.value.split('\n').filter(Boolean) })} className="bg-white/5 border-white/10" rows={6} /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>CTA (RO)</Label><Input value={editing.cta_label_ro} onChange={(e) => setEditing({ ...editing, cta_label_ro: e.target.value })} className="bg-white/5 border-white/10" /></div>
            <div className="space-y-2"><Label>CTA (EN)</Label><Input value={editing.cta_label_en} onChange={(e) => setEditing({ ...editing, cta_label_en: e.target.value })} className="bg-white/5 border-white/10" /></div>
          </div>
          <div className="flex items-center gap-3">
            <Switch checked={editing.is_popular} onCheckedChange={(v) => setEditing({ ...editing, is_popular: v })} />
            <Label>Marcat ca "Popular"</Label>
          </div>
          <div className="space-y-2"><Label>Ordine</Label><Input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: parseInt(e.target.value) || 0 })} className="bg-white/5 border-white/10 w-24" /></div>
          <Button onClick={handleSave} className="gradient-primary text-white border-0 rounded-2xl"><Save className="w-4 h-4 mr-2" /> Salvează</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <h1 className="font-heading font-bold text-xl sm:text-2xl text-foreground">Prețuri</h1>
        <Button onClick={newItem} size="sm" className="gradient-primary text-white border-0 rounded-2xl self-start"><Plus className="w-4 h-4 mr-2" /> Plan nou</Button>
      </div>
      <div className="space-y-3">
        {items.map((p) => (
          <div key={p.id} className="glass-card p-3 sm:p-4" style={{ transform: 'none' }}>
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="font-heading font-semibold text-foreground text-sm">{p.name_ro} {p.is_popular && <span className="text-xs gradient-text ml-1">Popular</span>}</h3>
                <p className="text-xs text-muted-foreground">{p.price_label_ro}</p>
              </div>
              <div className="flex shrink-0 gap-1">
                <Button size="sm" variant="ghost" onClick={() => setEditing(p)} className="h-8 px-2 text-xs">Editează</Button>
                <Button size="sm" variant="ghost" onClick={() => handleDelete(p.id)} className="text-destructive h-8 px-2"><Trash2 className="w-3.5 h-3.5" /></Button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-muted-foreground text-sm">Niciun plan.</p>}
      </div>
    </div>
  );
};

export default AdminPricing;
