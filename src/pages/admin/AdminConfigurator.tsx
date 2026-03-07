import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { getUserFriendlyError } from '@/lib/errorUtils';
import { useConfirm } from '@/hooks/useConfirm';
import { Plus, Trash2, Save, Settings } from 'lucide-react';

interface ConfigOption {
  id: string;
  option_type: string;
  option_id: string;
  label_ro: string;
  label_en: string;
  description_ro: string;
  description_en: string;
  price: string | null;
  features_ro: string[];
  features_en: string[];
  is_popular: boolean;
  sort_order: number;
}

const TYPE_LABELS: Record<string, string> = {
  business_type: 'Tipuri afacere',
  site_type: 'Tipuri site',
  page: 'Pagini',
  feature: 'Functionalitati',
  design_style: 'Stiluri design',
  brand_extra: 'Materiale brand',
  logo_status: 'Status logo',
  text_status: 'Status texte',
  photo_status: 'Status poze',
  marketing: 'Marketing',
  maintenance: 'Mentenanta',
  budget: 'Buget',
  timeline: 'Timeline',
};

const TYPE_ORDER = [
  'business_type', 'site_type', 'page', 'feature',
  'design_style', 'brand_extra', 'logo_status',
  'text_status', 'photo_status', 'marketing',
  'maintenance', 'budget', 'timeline',
];

const AdminConfigurator = () => {
  const [items, setItems] = useState<ConfigOption[]>([]);
  const [editing, setEditing] = useState<ConfigOption | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const { confirm, ConfirmDialog } = useConfirm();

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    const { data } = await supabase
      .from('configurator_options')
      .select('*')
      .is('deleted_at', null)
      .order('option_type')
      .order('sort_order');
    setItems((data as ConfigOption[]) || []);
    setLoading(false);
  }

  async function handleSave() {
    if (!editing) return;
    const { id, ...rest } = editing;
    if (id.startsWith('new-')) {
      const { error } = await supabase.from('configurator_options').insert({ ...rest } as any);
      if (error) { toast.error(getUserFriendlyError(error)); return; }
    } else {
      const { error } = await supabase.from('configurator_options').update({ ...rest, updated_at: new Date().toISOString() } as any).eq('id', id);
      if (error) { toast.error(getUserFriendlyError(error)); return; }
    }
    toast.success('Salvat!');
    setEditing(null);
    fetchData();
  }

  async function handleDelete(id: string) {
    if (!await confirm('Stergi aceasta optiune?')) return;
    const { error } = await supabase.from('configurator_options').update({ deleted_at: new Date().toISOString() } as any).eq('id', id);
    if (error) { toast.error(getUserFriendlyError(error)); return; }
    toast.success('Sters!');
    fetchData();
  }

  function newItem(optionType: string) {
    setEditing({
      id: `new-${Date.now()}`,
      option_type: optionType,
      option_id: '',
      label_ro: '',
      label_en: '',
      description_ro: '',
      description_en: '',
      price: null,
      features_ro: [],
      features_en: [],
      is_popular: false,
      sort_order: items.filter(i => i.option_type === optionType).length,
    });
  }

  const filteredItems = filter === 'all' ? items : items.filter(i => i.option_type === filter);
  const isMaintenance = editing?.option_type === 'maintenance';
  const hasDescription = editing && ['site_type', 'feature', 'design_style', 'marketing', 'maintenance'].includes(editing.option_type);
  const hasPrice = editing && ['site_type', 'maintenance'].includes(editing.option_type);
  const hasFeatures = editing?.option_type === 'maintenance';

  if (loading) return <p className="text-muted-foreground">Se incarca...</p>;

  if (editing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-heading font-bold text-2xl text-foreground">
              {editing.id.startsWith('new-') ? 'Optiune noua' : `Editare: ${editing.label_ro}`}
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Tip: {TYPE_LABELS[editing.option_type] || editing.option_type}
            </p>
          </div>
          <Button variant="ghost" onClick={() => setEditing(null)}>Inapoi</Button>
        </div>

        <div className="glass-card p-6 space-y-5" style={{ transform: 'none' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>ID (slug unic)</Label>
              <Input
                value={editing.option_id}
                onChange={(e) => setEditing({ ...editing, option_id: e.target.value })}
                className="bg-white/5 border-white/10 font-mono"
                placeholder="ex: restaurant"
                disabled={!editing.id.startsWith('new-')}
              />
            </div>
            <div className="space-y-2">
              <Label>Ordine sortare</Label>
              <Input
                type="number"
                value={editing.sort_order}
                onChange={(e) => setEditing({ ...editing, sort_order: parseInt(e.target.value) || 0 })}
                className="bg-white/5 border-white/10 w-24"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Label (RO)</Label>
              <Input value={editing.label_ro} onChange={(e) => setEditing({ ...editing, label_ro: e.target.value })} className="bg-white/5 border-white/10" />
            </div>
            <div className="space-y-2">
              <Label>Label (EN)</Label>
              <Input value={editing.label_en} onChange={(e) => setEditing({ ...editing, label_en: e.target.value })} className="bg-white/5 border-white/10" />
            </div>
          </div>

          {hasDescription && (
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
          )}

          {hasPrice && (
            <div className="space-y-2">
              <Label>Pret (ex: 500 - 1.200, 20/luna, 200/an)</Label>
              <Input
                value={editing.price || ''}
                onChange={(e) => setEditing({ ...editing, price: e.target.value || null })}
                className="bg-white/5 border-white/10"
              />
            </div>
          )}

          {hasFeatures && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Features (RO, cate una pe linie)</Label>
                <Textarea
                  value={editing.features_ro.join('\n')}
                  onChange={(e) => setEditing({ ...editing, features_ro: e.target.value.split('\n').filter(Boolean) })}
                  className="bg-white/5 border-white/10"
                  rows={6}
                />
              </div>
              <div className="space-y-2">
                <Label>Features (EN, one per line)</Label>
                <Textarea
                  value={editing.features_en.join('\n')}
                  onChange={(e) => setEditing({ ...editing, features_en: e.target.value.split('\n').filter(Boolean) })}
                  className="bg-white/5 border-white/10"
                  rows={6}
                />
              </div>
            </div>
          )}

          {isMaintenance && (
            <div className="flex items-center gap-3">
              <Switch checked={editing.is_popular} onCheckedChange={(v) => setEditing({ ...editing, is_popular: v })} />
              <Label>Marcat ca "Recomandat"</Label>
            </div>
          )}

          <Button onClick={handleSave} className="gradient-primary text-white border-0 rounded-2xl">
            <Save className="w-4 h-4 mr-2" /> Salveaza
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <h1 className="font-heading font-bold text-xl sm:text-2xl text-foreground">
          <Settings className="w-5 h-5 inline mr-2" />
          Configurator Website
        </h1>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1.5 mb-4 flex-wrap">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
            filter === 'all' ? 'bg-primary/20 text-primary-light' : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
          }`}
        >
          Toate ({items.length})
        </button>
        {TYPE_ORDER.map((type) => {
          const count = items.filter(i => i.option_type === type).length;
          if (count === 0) return null;
          return (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                filter === type ? 'bg-primary/20 text-primary-light' : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
              }`}
            >
              {TYPE_LABELS[type] || type} ({count})
            </button>
          );
        })}
      </div>

      {/* Add new button */}
      {filter !== 'all' && (
        <Button onClick={() => newItem(filter)} size="sm" className="gradient-primary text-white border-0 rounded-2xl mb-4">
          <Plus className="w-4 h-4 mr-1" /> Adauga in {TYPE_LABELS[filter] || filter}
        </Button>
      )}

      {/* Items grouped by type */}
      {filter === 'all' ? (
        TYPE_ORDER.map((type) => {
          const typeItems = items.filter(i => i.option_type === type);
          if (typeItems.length === 0) return null;
          return (
            <div key={type} className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-heading font-semibold text-sm text-foreground uppercase tracking-wider">
                  {TYPE_LABELS[type] || type}
                  <span className="text-muted-foreground ml-1 normal-case tracking-normal">({typeItems.length})</span>
                </h2>
                <Button onClick={() => newItem(type)} size="sm" variant="ghost" className="h-7 text-xs">
                  <Plus className="w-3 h-3 mr-1" /> Adauga
                </Button>
              </div>
              <div className="space-y-1.5">
                {typeItems.map((item) => (
                  <ItemRow key={item.id} item={item} onEdit={() => setEditing(item)} onDelete={() => handleDelete(item.id)} />
                ))}
              </div>
            </div>
          );
        })
      ) : (
        <div className="space-y-1.5">
          {filteredItems.map((item) => (
            <ItemRow key={item.id} item={item} onEdit={() => setEditing(item)} onDelete={() => handleDelete(item.id)} />
          ))}
          {filteredItems.length === 0 && <p className="text-muted-foreground text-sm">Niciun element.</p>}
        </div>
      )}

      {ConfirmDialog}
    </div>
  );
};

function ItemRow({ item, onEdit, onDelete }: { item: ConfigOption; onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="glass-card p-2.5 sm:p-3" style={{ transform: 'none' }}>
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0 flex-1">
          <span className="text-sm text-foreground font-medium">{item.label_ro}</span>
          {item.price && <span className="text-xs text-primary-light ml-2">{item.price}&euro;</span>}
          {item.is_popular && <span className="text-xs gradient-text ml-1">&#9733;</span>}
          <span className="text-xs text-muted-foreground ml-2 font-mono">{item.option_id}</span>
        </div>
        <div className="flex shrink-0 gap-1">
          <Button size="sm" variant="ghost" onClick={onEdit} className="h-7 px-2 text-xs">Editeaza</Button>
          <Button size="sm" variant="ghost" onClick={onDelete} className="text-destructive h-7 px-2"><Trash2 className="w-3 h-3" /></Button>
        </div>
      </div>
    </div>
  );
}

export default AdminConfigurator;
