import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { getUserFriendlyError } from '@/lib/errorUtils';
import { useConfirm } from '@/hooks/useConfirm';
import { Plus, Trash2, Save, Package, Puzzle, Shield } from 'lucide-react';

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
  plan_type: string;
}

const PLAN_TYPE_LABELS: Record<string, { label: string; icon: typeof Package }> = {
  package: { label: 'Pachet', icon: Package },
  addon: { label: 'Add-on', icon: Puzzle },
  maintenance: { label: 'Mentenanță', icon: Shield },
};

const AdminPricing = () => {
  const [items, setItems] = useState<PricingPlan[]>([]);
  const [editing, setEditing] = useState<PricingPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const location = useLocation();
  const { confirm, ConfirmDialog } = useConfirm();

  useEffect(() => { fetchData(); }, [location.key]);

  async function fetchData() {
    const { data } = await supabase.from('pricing_plans').select('*').is('deleted_at', null).order('sort_order');
    setItems((data as any[]) || []);
    setLoading(false);
  }

  async function handleSave() {
    if (!editing) return;
    const { id, ...rest } = editing;
    if (id.startsWith('new-')) {
      const { error } = await supabase.from('pricing_plans').insert({ ...rest } as any);
      if (error) { toast.error(getUserFriendlyError(error)); return; }
    } else {
      const { error } = await supabase.from('pricing_plans').update(rest as any).eq('id', id);
      if (error) { toast.error(getUserFriendlyError(error)); return; }
    }
    toast.success('Plan salvat!');
    setEditing(null);
    fetchData();
  }

  async function handleDelete(id: string) {
    if (!await confirm('Mută în Coș Reciclare? Poți restaura oricând din Admin → Coș Reciclare.')) return;
    const { error } = await supabase.from('pricing_plans').update({ deleted_at: new Date().toISOString() }).eq('id', id);
    if (error) { toast.error(getUserFriendlyError(error)); return; }
    toast.success('Mutat în Coș Reciclare!');
    fetchData();
  }

  function newItem(planType: string) {
    const defaults: Record<string, Partial<PricingPlan>> = {
      package: {
        cta_label_ro: '{"max_pages":5,"extra_pages":true,"included_addons":[]}',
        cta_label_en: '',
      },
      addon: {
        cta_label_ro: 'addon-slug',
        cta_label_en: '',
      },
      maintenance: {
        cta_label_ro: '',
        cta_label_en: '',
      },
    };

    setEditing({
      id: `new-${Date.now()}`, sort_order: items.length,
      name_ro: '', name_en: '', price_label_ro: '', price_label_en: '',
      description_ro: '', description_en: '', features_ro: [], features_en: [],
      is_popular: false,
      plan_type: planType,
      ...defaults[planType],
    } as PricingPlan);
  }

  const filteredItems = filter === 'all' ? items : items.filter(p => p.plan_type === filter);

  if (loading) return <p className="text-muted-foreground">Se încarcă...</p>;

  if (editing) {
    const isPackage = editing.plan_type === 'package';
    const isAddon = editing.plan_type === 'addon';
    const typeInfo = PLAN_TYPE_LABELS[editing.plan_type] || PLAN_TYPE_LABELS.package;

    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-heading font-bold text-2xl text-foreground">
              {editing.id.startsWith('new-') ? `${typeInfo.label} nou` : `Editare: ${editing.name_ro}`}
            </h1>
            <p className="text-xs text-muted-foreground mt-1">Tip: {typeInfo.label}</p>
          </div>
          <Button variant="ghost" onClick={() => setEditing(null)}>Înapoi</Button>
        </div>
        <div className="glass-card p-6 space-y-5" style={{ transform: 'none' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Nume (RO)</Label><Input value={editing.name_ro} onChange={(e) => setEditing({ ...editing, name_ro: e.target.value })} className="bg-white/5 border-white/10" /></div>
            <div className="space-y-2"><Label>Nume (EN)</Label><Input value={editing.name_en} onChange={(e) => setEditing({ ...editing, name_en: e.target.value })} className="bg-white/5 border-white/10" /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Preț (RO) — ex: 300€ sau 50€/lună</Label><Input value={editing.price_label_ro} onChange={(e) => setEditing({ ...editing, price_label_ro: e.target.value })} className="bg-white/5 border-white/10" /></div>
            <div className="space-y-2"><Label>Preț (EN) — ex: 300€ or 50€/month</Label><Input value={editing.price_label_en} onChange={(e) => setEditing({ ...editing, price_label_en: e.target.value })} className="bg-white/5 border-white/10" /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Descriere (RO)</Label><Textarea value={editing.description_ro} onChange={(e) => setEditing({ ...editing, description_ro: e.target.value })} className="bg-white/5 border-white/10" /></div>
            <div className="space-y-2"><Label>Descriere (EN)</Label><Textarea value={editing.description_en} onChange={(e) => setEditing({ ...editing, description_en: e.target.value })} className="bg-white/5 border-white/10" /></div>
          </div>

          {!isAddon && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Features (RO, câte una pe linie)</Label><Textarea value={editing.features_ro.join('\n')} onChange={(e) => setEditing({ ...editing, features_ro: e.target.value.split('\n').filter(Boolean) })} className="bg-white/5 border-white/10" rows={6} /></div>
              <div className="space-y-2"><Label>Features (EN, one per line)</Label><Textarea value={editing.features_en.join('\n')} onChange={(e) => setEditing({ ...editing, features_en: e.target.value.split('\n').filter(Boolean) })} className="bg-white/5 border-white/10" rows={6} /></div>
            </div>
          )}

          {/* Package-specific: JSON metadata */}
          {isPackage && (
            <div className="space-y-2">
              <Label>Metadata pachet (JSON)</Label>
              <p className="text-xs text-muted-foreground">
                {`{"max_pages": 5, "extra_pages": true, "included_addons": ["blog", "seo"]}`}
              </p>
              <Textarea
                value={editing.cta_label_ro}
                onChange={(e) => setEditing({ ...editing, cta_label_ro: e.target.value })}
                className="bg-white/5 border-white/10 font-mono text-xs"
                rows={3}
              />
            </div>
          )}

          {/* Addon-specific: slug */}
          {isAddon && (
            <div className="space-y-2">
              <Label>Slug add-on (ex: blog, multilingual, seo)</Label>
              <p className="text-xs text-muted-foreground">Folosit pentru a lega add-on-ul de pachete (via included_addons).</p>
              <Input
                value={editing.cta_label_ro}
                onChange={(e) => setEditing({ ...editing, cta_label_ro: e.target.value })}
                className="bg-white/5 border-white/10 font-mono"
                placeholder="addon-slug"
              />
            </div>
          )}

          <div className="flex items-center gap-3">
            <Switch checked={editing.is_popular} onCheckedChange={(v) => setEditing({ ...editing, is_popular: v })} />
            <Label>{isPackage ? 'Marcat ca "Popular"' : editing.plan_type === 'maintenance' ? 'Marcat ca "Recomandat"' : 'Evidențiat'}</Label>
          </div>
          <div className="space-y-2"><Label>Ordine sortare</Label><Input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: parseInt(e.target.value) || 0 })} className="bg-white/5 border-white/10 w-24" /></div>
          <Button onClick={handleSave} className="gradient-primary text-white border-0 rounded-2xl"><Save className="w-4 h-4 mr-2" /> Salvează</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <h1 className="font-heading font-bold text-xl sm:text-2xl text-foreground">Configurator Prețuri</h1>
        <div className="flex gap-2 flex-wrap">
          <Button onClick={() => newItem('package')} size="sm" className="gradient-primary text-white border-0 rounded-2xl">
            <Package className="w-4 h-4 mr-1" /> Pachet nou
          </Button>
          <Button onClick={() => newItem('addon')} size="sm" variant="outline" className="rounded-2xl border-white/10">
            <Puzzle className="w-4 h-4 mr-1" /> Add-on nou
          </Button>
          <Button onClick={() => newItem('maintenance')} size="sm" variant="outline" className="rounded-2xl border-white/10">
            <Shield className="w-4 h-4 mr-1" /> Mentenanță nouă
          </Button>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {['all', 'package', 'addon', 'maintenance'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filter === type
                ? 'bg-primary/20 text-primary-light'
                : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
            }`}
          >
            {type === 'all' ? 'Toate' : PLAN_TYPE_LABELS[type]?.label || type}
            <span className="ml-1 opacity-60">
              ({type === 'all' ? items.length : items.filter(p => p.plan_type === type).length})
            </span>
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredItems.map((p) => {
          const typeInfo = PLAN_TYPE_LABELS[p.plan_type] || PLAN_TYPE_LABELS.package;
          const TypeIcon = typeInfo.icon;
          return (
            <div key={p.id} className="glass-card p-3 sm:p-4" style={{ transform: 'none' }}>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1 flex items-start gap-3">
                  <TypeIcon className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <h3 className="font-heading font-semibold text-foreground text-sm">
                      {p.name_ro}
                      {p.is_popular && <span className="text-xs gradient-text ml-1">★</span>}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {p.price_label_ro}
                      <span className="mx-1">•</span>
                      <span className="opacity-60">{typeInfo.label}</span>
                      {p.plan_type === 'addon' && <span className="opacity-60 ml-1">({p.cta_label_ro})</span>}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 gap-1">
                  <Button size="sm" variant="ghost" onClick={() => setEditing(p)} className="h-8 px-2 text-xs">Editează</Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDelete(p.id)} className="text-destructive h-8 px-2"><Trash2 className="w-3.5 h-3.5" /></Button>
                </div>
              </div>
            </div>
          );
        })}
        {filteredItems.length === 0 && <p className="text-muted-foreground text-sm">Niciun element.</p>}
      </div>
      {ConfirmDialog}
    </div>
  );
};

export default AdminPricing;
