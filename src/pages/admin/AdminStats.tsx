import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { getUserFriendlyError } from '@/lib/errorUtils';
import { useConfirm } from '@/hooks/useConfirm';
import { Plus, Trash2, Save } from 'lucide-react';

interface Stat {
  id: string;
  sort_order: number;
  value: string;
  label_ro: string;
  label_en: string;
}

const AdminStats = () => {
  const [items, setItems] = useState<Stat[]>([]);
  const [editing, setEditing] = useState<Stat | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { confirm, ConfirmDialog } = useConfirm();

  useEffect(() => { fetchData(); }, [location.key]);
  async function fetchData() {
    const { data } = await supabase.from('stats').select('*').order('sort_order');
    setItems((data as any[]) || []);
    setLoading(false);
  }

  async function handleSave() {
    if (!editing) return;
    const { id, ...rest } = editing;
    if (id.startsWith('new-')) {
      const { error } = await supabase.from('stats').insert({ ...rest });
      if (error) { toast.error(getUserFriendlyError(error)); return; }
    } else {
      const { error } = await supabase.from('stats').update(rest).eq('id', id);
      if (error) { toast.error(getUserFriendlyError(error)); return; }
    }
    toast.success('Salvat!');
    setEditing(null);
    fetchData();
  }

  async function handleDelete(id: string) {
    if (!await confirm('Sigur vrei să ștergi această statistică?')) return;
    await supabase.from('stats').delete().eq('id', id);
    toast.success('Șters!');
    fetchData();
  }

  if (loading) return <p className="text-muted-foreground">Se încarcă...</p>;

  if (editing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-heading font-bold text-2xl text-foreground">Editare statistică</h1>
          <Button variant="ghost" onClick={() => setEditing(null)}>Înapoi</Button>
        </div>
        <div className="glass-card p-6 space-y-5" style={{ transform: 'none' }}>
          <div className="space-y-2"><Label>Valoare (ex: 50+)</Label><Input value={editing.value} onChange={(e) => setEditing({ ...editing, value: e.target.value })} className="bg-white/5 border-white/10" /></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Label (RO)</Label><Input value={editing.label_ro} onChange={(e) => setEditing({ ...editing, label_ro: e.target.value })} className="bg-white/5 border-white/10" /></div>
            <div className="space-y-2"><Label>Label (EN)</Label><Input value={editing.label_en} onChange={(e) => setEditing({ ...editing, label_en: e.target.value })} className="bg-white/5 border-white/10" /></div>
          </div>
          <div className="space-y-2"><Label>Ordine</Label><Input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: parseInt(e.target.value) || 0 })} className="bg-white/5 border-white/10 w-24" /></div>
          <Button onClick={handleSave} className="bg-foreground text-background border-0 rounded-2xl"><Save className="w-4 h-4 mr-2" /> Salvează</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <h1 className="font-heading font-bold text-xl sm:text-2xl text-foreground">Statistici</h1>
        <Button size="sm" onClick={() => setEditing({ id: `new-${Date.now()}`, sort_order: items.length, value: '', label_ro: '', label_en: '' })} className="bg-foreground text-background border-0 rounded-2xl self-start"><Plus className="w-4 h-4 mr-2" /> Statistică nouă</Button>
      </div>
      <div className="space-y-3">
        {items.map((s) => (
          <div key={s.id} className="glass-card p-3 sm:p-4" style={{ transform: 'none' }}>
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0 flex-1"><span className="font-heading font-bold text-foreground">{s.value}</span> <span className="text-sm text-muted-foreground">— {s.label_ro}</span></div>
              <div className="flex shrink-0 gap-1">
                <Button size="sm" variant="ghost" onClick={() => setEditing(s)} className="h-8 px-2 text-xs">Editează</Button>
                <Button size="sm" variant="ghost" onClick={() => handleDelete(s.id)} className="text-destructive h-8 px-2"><Trash2 className="w-3.5 h-3.5" /></Button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-muted-foreground text-sm">Nicio statistică.</p>}
      </div>
      {ConfirmDialog}
    </div>
  );
};

export default AdminStats;
