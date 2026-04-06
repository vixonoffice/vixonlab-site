import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Copy, ExternalLink, Eye, Star, Phone, MapPin, Check, EyeOff } from 'lucide-react';

const CATEGORIES = ['Toate', 'restaurant', 'pizzerie', 'service auto', 'salon coafura', 'frizerie', 'gym sala fitness', 'cabinet stomatologic', 'florarie', 'cofetarie', 'pensiune', 'constructor', 'instalator', 'brutarie', 'patiserie', 'farmacie', 'cabinet contabilitate', 'hotel', 'firma curatenie'];

const SITE_STATUS_COLORS: Record<string, string> = {
  'Nu': 'bg-red-500/20 text-red-400',
  'Doar Facebook': 'bg-orange-500/20 text-orange-400',
  'Da': 'bg-green-500/20 text-green-400',
};

const CONTACTED_KEY = 'vixon_contacted_ids';

function getContactedIds(): Set<number> {
  try {
    const raw = localStorage.getItem(CONTACTED_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch { return new Set(); }
}

function saveContactedIds(ids: Set<number>) {
  localStorage.setItem(CONTACTED_KEY, JSON.stringify([...ids]));
}

interface Preview {
  id: number;
  slug: string;
  business_name: string;
  category: string;
  phone: string | null;
  address: string | null;
  rating: number | null;
  nr_recenzii: number | null;
  are_website: string | null;
  template_type: string;
  views: number;
  last_viewed_at: string | null;
  whatsapp_mesaj: string | null;
  created_at: string;
}

const AdminPreviews = () => {
  const queryClient = useQueryClient();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [categoryFilter, setCategoryFilter] = useState('Toate');
  const [search, setSearch] = useState('');
  const [contactedIds, setContactedIds] = useState<Set<number>>(getContactedIds);
  const [hideContacted, setHideContacted] = useState(false);

  const { data: previews = [], isLoading } = useQuery({
    queryKey: ['previews'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('previews')
        .select('*')
        .order('nr_recenzii', { ascending: false });
      if (error) throw error;
      return data as Preview[];
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel('previews-realtime')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'previews' }, (payload) => {
        const updated = payload.new as Preview;
        if ((updated.views ?? 0) > 0) {
          toast(`${updated.business_name} a deschis preview-ul!`, {
            description: `${updated.views} vizualizari · acum`,
            duration: 8000,
          });
        }
        queryClient.setQueryData(['previews'], (old: Preview[] = []) =>
          old.map((p) => p.id === updated.id ? { ...p, ...updated } : p)
        );
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [queryClient]);

  const toggleContacted = (id: number) => {
    setContactedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      saveContactedIds(next);
      return next;
    });
  };

  const filtered = previews
    .filter((p) => {
      const matchCat = categoryFilter === 'Toate' || p.category === categoryFilter;
      const matchSearch = p.business_name.toLowerCase().includes(search.toLowerCase());
      const matchContacted = !hideContacted || !contactedIds.has(p.id);
      return matchCat && matchSearch && matchContacted;
    })
    .sort((a, b) => {
      // Contacted go to bottom
      const aC = contactedIds.has(a.id) ? 1 : 0;
      const bC = contactedIds.has(b.id) ? 1 : 0;
      return aC - bC;
    });

  const selected = previews.find((p) => p.id === selectedId);
  const isContacted = selected ? contactedIds.has(selected.id) : false;

  const copyWhatsapp = (msg: string) => {
    navigator.clipboard.writeText(msg);
    toast.success('Mesaj copiat!');
  };

  const previewUrl = (slug: string) => `${window.location.origin}/preview/${slug}`;

  const openWhatsapp = (phone: string, msg: string) => {
    const cleaned = phone.replace(/\D/g, '').replace(/^0/, '40');
    const url = `https://wa.me/${cleaned}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  const totalViewed = previews.filter((p) => p.views > 0).length;
  const totalContacted = contactedIds.size;

  if (isLoading) return <div className="text-muted-foreground">Se incarca...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Preview-uri Leaduri</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {previews.length} business-uri · {totalViewed} vizionate · {totalContacted} contactate · {previews.length - totalContacted} ramase
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* List - hidden on mobile when a business is selected */}
        <div className={`lg:col-span-1 space-y-3 ${selectedId !== null ? 'hidden lg:block' : ''}`}>
          <input
            type="text"
            placeholder="Cauta business..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
          />
          <div className="flex gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-foreground focus:outline-none focus:border-primary/50"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c} className="bg-background">{c} {c !== 'Toate' ? `(${previews.filter(p => p.category === c).length})` : `(${previews.length})`}</option>
              ))}
            </select>
            <button
              onClick={() => setHideContacted(!hideContacted)}
              className={`px-3 py-2 rounded-xl border text-sm shrink-0 transition-colors ${
                hideContacted
                  ? 'bg-primary/20 border-primary/50 text-primary-light'
                  : 'bg-white/5 border-white/10 text-muted-foreground'
              }`}
              title={hideContacted ? 'Arată toate' : 'Ascunde contactate'}
            >
              <EyeOff className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
            {filtered.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                className={`w-full text-left glass-card p-3 transition-all ${selectedId === p.id ? 'border-primary/50' : ''} ${contactedIds.has(p.id) ? 'opacity-50' : ''}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm font-medium text-foreground leading-tight">
                    {contactedIds.has(p.id) && <Check className="w-3 h-3 inline mr-1 text-green-400" />}
                    {p.business_name}
                  </span>
                  <Badge className={`text-[10px] shrink-0 ${SITE_STATUS_COLORS[p.are_website || 'Nu'] || ''}`}>
                    {p.are_website || 'Nu'}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                  <span className="capitalize">{p.category}</span>
                  {p.rating && <span className="flex items-center gap-0.5"><Star className="w-3 h-3" />{p.rating}</span>}
                  {p.nr_recenzii != null && <span>{p.nr_recenzii} recenzii</span>}
                </div>
                <div className="flex items-center gap-2 mt-1.5 text-xs">
                  <span className={p.views > 0 ? 'text-green-400' : 'text-muted-foreground'}>
                    <Eye className="w-3 h-3 inline mr-0.5" />{p.views} views
                  </span>
                </div>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">Niciun rezultat</p>
            )}
          </div>
        </div>

        {/* Detail - always visible on mobile when selected */}
        <div className={`lg:col-span-2 ${selectedId === null ? 'hidden lg:block' : ''}`}>
          {selected ? (
            <div className="glass-card p-6 space-y-5">
              <button
                onClick={() => setSelectedId(null)}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2 lg:hidden"
              >
                ← Inapoi la lista
              </button>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-heading font-semibold text-xl text-foreground">{selected.business_name}</h2>
                  <p className="text-sm text-muted-foreground capitalize mt-0.5">{selected.category}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleContacted(selected.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      isContacted
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-white/5 text-muted-foreground border border-white/10 hover:border-green-500/30 hover:text-green-400'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    {isContacted ? 'Contactat' : 'Marcheaza'}
                  </button>
                  <Badge className={SITE_STATUS_COLORS[selected.are_website || 'Nu'] || ''}>
                    {selected.are_website || 'Nu'}
                  </Badge>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/5 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-foreground">{selected.views}</p>
                  <p className="text-xs text-muted-foreground">Views</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-foreground">{selected.rating ?? '—'}</p>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-foreground">{selected.nr_recenzii ?? '—'}</p>
                  <p className="text-xs text-muted-foreground">Recenzii</p>
                </div>
              </div>

              {/* Contact info */}
              <div className="space-y-2 text-sm">
                {selected.phone && (
                  <a href={`tel:${selected.phone}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary-light">
                    <Phone className="w-4 h-4" /> {selected.phone}
                  </a>
                )}
                {selected.address && (
                  <p className="flex items-start gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4 shrink-0 mt-0.5" /> {selected.address}
                  </p>
                )}
                {selected.last_viewed_at && (
                  <p className="text-xs text-muted-foreground">
                    Ultima vizualizare: {new Date(selected.last_viewed_at).toLocaleString('ro-RO')}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(previewUrl(selected.slug), '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-1.5" /> Deschide Preview
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(previewUrl(selected.slug));
                    toast.success('Link copiat!');
                  }}
                >
                  <Copy className="w-4 h-4 mr-1.5" /> Copiaza Link
                </Button>
                {selected.phone && selected.whatsapp_mesaj && (
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => {
                      openWhatsapp(selected.phone!, selected.whatsapp_mesaj!);
                      // Auto-mark as contacted when WhatsApp is opened
                      if (!contactedIds.has(selected.id)) {
                        toggleContacted(selected.id);
                      }
                    }}
                  >
                    WhatsApp
                  </Button>
                )}
              </div>

              {/* WhatsApp message */}
              {selected.whatsapp_mesaj && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Mesaj WhatsApp</span>
                    <button
                      onClick={() => copyWhatsapp(selected.whatsapp_mesaj!)}
                      className="text-xs text-primary-light hover:underline flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" /> Copiaza
                    </button>
                  </div>
                  <pre className="bg-white/5 rounded-xl p-4 text-sm text-foreground whitespace-pre-wrap font-sans leading-relaxed">
                    {selected.whatsapp_mesaj}
                  </pre>
                </div>
              )}
            </div>
          ) : (
            <div className="glass-card p-8 text-center text-muted-foreground">
              Selecteaza un business din lista.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPreviews;
