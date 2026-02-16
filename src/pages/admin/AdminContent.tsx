import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { getUserFriendlyError } from '@/lib/errorUtils';
import { Save } from 'lucide-react';

interface ContentItem {
  id: string;
  section: string;
  key: string;
  value_ro: string;
  value_en: string;
}

const sections = [
  { id: 'hero', label: 'Hero (Homepage)' },
  { id: 'services', label: 'Servicii' },
  { id: 'why', label: 'De ce noi' },
  { id: 'process', label: 'Proces' },
  { id: 'testimonials', label: 'Testimoniale' },
  { id: 'cta', label: 'CTA' },
  { id: 'about', label: 'Despre' },
  { id: 'portfolio', label: 'Portofoliu' },
  { id: 'pricing', label: 'Prețuri' },
  { id: 'contact', label: 'Contact' },
];

const AdminContent = () => {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [edited, setEdited] = useState<Record<string, ContentItem>>({});
  const location = useLocation();

  useEffect(() => { fetchData(); }, [location.key]);

  async function fetchData() {
    const { data } = await supabase.from('site_content').select('*').order('section').order('key');
    setItems((data as any[]) || []);
    setLoading(false);
  }

  function handleChange(item: ContentItem, field: 'value_ro' | 'value_en', value: string) {
    const updated = { ...item, [field]: value };
    setEdited((prev) => ({ ...prev, [item.id]: updated }));
  }

  async function handleSave() {
    const updates = Object.values(edited);
    if (updates.length === 0) return;

    for (const item of updates) {
      const { error } = await supabase
        .from('site_content')
        .update({ value_ro: item.value_ro, value_en: item.value_en })
        .eq('id', item.id);
      if (error) { toast.error(getUserFriendlyError(error)); return; }
    }

    toast.success(`${updates.length} câmpuri salvate!`);
    setEdited({});
    fetchData();
  }

  const filteredItems = items.filter((i) => i.section === activeSection);
  const displayItems = filteredItems.map((i) => edited[i.id] || i);

  if (loading) return <p className="text-muted-foreground">Se încarcă...</p>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <h1 className="font-heading font-bold text-xl sm:text-2xl text-foreground">Conținut site</h1>
        {Object.keys(edited).length > 0 && (
          <Button onClick={handleSave} size="sm" className="gradient-primary text-white border-0 rounded-2xl self-start">
            <Save className="w-4 h-4 mr-2" /> Salvează ({Object.keys(edited).length})
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeSection === s.id ? 'gradient-primary text-white' : 'bg-white/5 text-muted-foreground hover:text-foreground border border-white/10'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {displayItems.length === 0 ? (
        <p className="text-muted-foreground text-sm">Niciun conținut pentru această secțiune. Conținutul va fi populat automat la prima încărcare.</p>
      ) : (
        <div className="space-y-4">
          {displayItems.map((item) => (
            <div key={item.id} className="glass-card p-4" style={{ transform: 'none' }}>
              <p className="text-xs text-muted-foreground mb-3 font-mono">{item.key}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs">RO</Label>
                  {item.value_ro.length > 80 ? (
                    <Textarea value={item.value_ro} onChange={(e) => handleChange(items.find(i => i.id === item.id)!, 'value_ro', e.target.value)} className="bg-white/5 border-white/10 text-sm" rows={3} />
                  ) : (
                    <Input value={item.value_ro} onChange={(e) => handleChange(items.find(i => i.id === item.id)!, 'value_ro', e.target.value)} className="bg-white/5 border-white/10 text-sm" />
                  )}
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">EN</Label>
                  {item.value_en.length > 80 ? (
                    <Textarea value={item.value_en} onChange={(e) => handleChange(items.find(i => i.id === item.id)!, 'value_en', e.target.value)} className="bg-white/5 border-white/10 text-sm" rows={3} />
                  ) : (
                    <Input value={item.value_en} onChange={(e) => handleChange(items.find(i => i.id === item.id)!, 'value_en', e.target.value)} className="bg-white/5 border-white/10 text-sm" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminContent;
