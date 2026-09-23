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

interface ProcessStep {
  id: string;
  sort_order: number;
  step_number: string;
  title_ro: string;
  title_en: string;
  description_ro: string;
  description_en: string;
}

const AdminProcess = () => {
  const [items, setItems] = useState<ProcessStep[]>([]);
  const [editing, setEditing] = useState<ProcessStep | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { confirm, ConfirmDialog } = useConfirm();

  useEffect(() => { fetchData(); }, [location.key]);
  async function fetchData() {
    const { data } = await supabase.from('process_steps').select('*').order('sort_order');
    setItems((data as any[]) || []);
    setLoading(false);
  }

  async function handleSave() {
    if (!editing) return;
    const { id, ...rest } = editing;
    if (id.startsWith('new-')) {
      const { error } = await supabase.from('process_steps').insert({ ...rest });
      if (error) { toast.error(getUserFriendlyError(error)); return; }
    } else {
      const { error } = await supabase.from('process_steps').update(rest).eq('id', id);
      if (error) { toast.error(getUserFriendlyError(error)); return; }
    }
    toast.success('Salvat!');
    setEditing(null);
    fetchData();
  }

  async function handleDelete(id: string) {
    if (!await confirm('Sigur vrei să ștergi acest pas?')) return;
    await supabase.from('process_steps').delete().eq('id', id);
    toast.success('Șters!');
    fetchData();
  }

  if (loading) return <p className="text-muted-foreground">Se încarcă...</p>;

  if (editing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-heading font-bold text-2xl text-foreground">Editare pas</h1>
          <Button variant="ghost" onClick={() => setEditing(null)}>Înapoi</Button>
        </div>
        <div className="glass-card p-6 space-y-5" style={{ transform: 'none' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Nr. pas (01, 02...)</Label><Input value={editing.step_number} onChange={(e) => setEditing({ ...editing, step_number: e.target.value })} className="bg-white/5 border-white/10 w-24" /></div>
            <div className="space-y-2"><Label>Ordine</Label><Input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: parseInt(e.target.value) || 0 })} className="bg-white/5 border-white/10 w-24" /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Titlu (RO)</Label><Input value={editing.title_ro} onChange={(e) => setEditing({ ...editing, title_ro: e.target.value })} className="bg-white/5 border-white/10" /></div>
            <div className="space-y-2"><Label>Titlu (EN)</Label><Input value={editing.title_en} onChange={(e) => setEditing({ ...editing, title_en: e.target.value })} className="bg-white/5 border-white/10" /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Descriere (RO)</Label><Textarea value={editing.description_ro} onChange={(e) => setEditing({ ...editing, description_ro: e.target.value })} className="bg-white/5 border-white/10" /></div>
            <div className="space-y-2"><Label>Descriere (EN)</Label><Textarea value={editing.description_en} onChange={(e) => setEditing({ ...editing, description_en: e.target.value })} className="bg-white/5 border-white/10" /></div>
          </div>
          <Button onClick={handleSave} className="bg-foreground text-background border-0 rounded-2xl"><Save className="w-4 h-4 mr-2" /> Salvează</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <h1 className="font-heading font-bold text-xl sm:text-2xl text-foreground">Pași proces</h1>
        <Button size="sm" onClick={() => setEditing({ id: `new-${Date.now()}`, sort_order: items.length, step_number: `0${items.length + 1}`, title_ro: '', title_en: '', description_ro: '', description_en: '' })} className="bg-foreground text-background border-0 rounded-2xl self-start"><Plus className="w-4 h-4 mr-2" /> Pas nou</Button>
      </div>
      <div className="space-y-3">
        {items.map((s) => (
          <div key={s.id} className="glass-card p-3 sm:p-4" style={{ transform: 'none' }}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white font-heading font-bold text-xs shrink-0">{s.step_number}</div>
              <div className="flex-1 min-w-0"><h3 className="font-heading font-semibold text-foreground text-sm truncate">{s.title_ro}</h3></div>
              <div className="flex shrink-0 gap-1">
                <Button size="sm" variant="ghost" onClick={() => setEditing(s)} className="h-8 px-2 text-xs">Editează</Button>
                <Button size="sm" variant="ghost" onClick={() => handleDelete(s.id)} className="text-destructive h-8 px-2"><Trash2 className="w-3.5 h-3.5" /></Button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-muted-foreground text-sm">Niciun pas.</p>}
      </div>
      {ConfirmDialog}
    </div>
  );
};

export default AdminProcess;
