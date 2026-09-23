import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { getUserFriendlyError } from '@/lib/errorUtils';
import { Plus, Trash2, Save } from 'lucide-react';

interface TechItem {
  id: string;
  sort_order: number;
  name: string;
}

const AdminTech = () => {
  const [items, setItems] = useState<TechItem[]>([]);
  const [newName, setNewName] = useState('');
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => { fetchData(); }, [location.key]);
  async function fetchData() {
    const { data } = await supabase.from('tech_stack').select('*').order('sort_order');
    setItems((data as any[]) || []);
    setLoading(false);
  }

  async function handleAdd() {
    if (!newName.trim()) return;
    const { error } = await supabase.from('tech_stack').insert({ name: newName.trim(), sort_order: items.length });
    if (error) { toast.error(getUserFriendlyError(error)); return; }
    toast.success('Adăugat!');
    setNewName('');
    fetchData();
  }

  async function handleDelete(id: string) {
    await supabase.from('tech_stack').delete().eq('id', id);
    toast.success('Șters!');
    fetchData();
  }

  if (loading) return <p className="text-muted-foreground">Se încarcă...</p>;

  return (
    <div>
      <h1 className="font-heading font-bold text-2xl text-foreground mb-6">Tech Stack</h1>
      
      <div className="flex gap-3 mb-6">
        <Input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Ex: Next.js"
          className="bg-white/5 border-white/10 max-w-xs"
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <Button onClick={handleAdd} className="bg-foreground text-background border-0 rounded-2xl">
          <Plus className="w-4 h-4 mr-2" /> Adaugă
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <div key={item.id} className="glass-card px-4 py-2 flex items-center gap-2" style={{ transform: 'none' }}>
            <span className="text-sm text-foreground">{item.name}</span>
            <button onClick={() => handleDelete(item.id)} className="text-muted-foreground hover:text-destructive">
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
      {items.length === 0 && <p className="text-muted-foreground text-sm">Niciun item.</p>}
    </div>
  );
};

export default AdminTech;
