import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Trash2, Send, Star, MapPin, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

type Lead = Database['public']['Tables']['leads']['Row'];

const PAGE_SIZE = 50;
const ALL = 'toate';

const JUDETE = [
  'Alba', 'Arad', 'Arges', 'Bacau', 'Bihor', 'Bistrita-Nasaud', 'Botosani', 'Braila',
  'Brasov', 'Bucuresti', 'Buzau', 'Calarasi', 'Caras-Severin', 'Cluj', 'Constanta',
  'Covasna', 'Dambovita', 'Dolj', 'Galati', 'Giurgiu', 'Gorj', 'Harghita', 'Hunedoara',
  'Ialomita', 'Iasi', 'Ilfov', 'Maramures', 'Mehedinti', 'Mures', 'Neamt', 'Olt',
  'Prahova', 'Salaj', 'Satu Mare', 'Sibiu', 'Suceava', 'Teleorman', 'Timis', 'Tulcea',
  'Valcea', 'Vaslui', 'Vrancea',
];

const CATEGORII = [
  'brutarie', 'cabinet contabilitate', 'cabinet stomatologic', 'cofetarie', 'constructor',
  'farmacie', 'firma curatenie', 'florarie', 'frizerie', 'gym sala fitness', 'hotel',
  'instalator', 'patiserie', 'pensiune', 'pizzerie', 'restaurant', 'salon coafura',
  'service auto',
];

const MESSAGE_TEMPLATES: ((name: string) => string)[] = [
  () => `Bună ziua! Sunteți interesat de un website pentru afacerea dumneavoastră? Mulțumesc!`,
  () => `Bună ziua! V-ar interesa un website pentru afacerea dumneavoastră? Mulțumesc!`,
  () => `Bună ziua! Ați fi interesat de un website pentru afacerea dumneavoastră? Mulțumesc!`,
  () => `Bună ziua! Vă interesează un website pentru afacerea dumneavoastră? Mulțumesc, o zi bună!`,
];

function buildMessage(lead: Lead): string {
  // varianta e aleasa determinist din id, ca acelasi lead sa primeasca mereu acelasi text
  let hash = 0;
  for (const ch of lead.id) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return MESSAGE_TEMPLATES[hash % MESSAGE_TEMPLATES.length](lead.business_name);
}

function waPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('40')) return digits;
  if (digits.startsWith('0')) return `4${digits}`;
  return `40${digits}`;
}

const AdminLeads = () => {
  const queryClient = useQueryClient();
  const [judet, setJudet] = useState(ALL);
  const [categorie, setCategorie] = useState(ALL);
  const [prioritate, setPrioritate] = useState(ALL);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setPage(0);
  }, [judet, categorie, prioritate, search]);

  const { data, isLoading } = useQuery({
    queryKey: ['leads', judet, categorie, prioritate, search, page],
    queryFn: async () => {
      let q = supabase
        .from('leads')
        .select('*', { count: 'exact' })
        .order('reviews', { ascending: false, nullsFirst: false })
        .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1);
      if (judet !== ALL) q = q.eq('county', judet);
      if (categorie !== ALL) q = q.eq('category', categorie);
      if (prioritate !== ALL) q = q.eq('priority', prioritate);
      if (search.trim()) q = q.or(`business_name.ilike.%${search.trim()}%,city.ilike.%${search.trim()}%`);
      const { data, error, count } = await q;
      if (error) throw error;
      return { leads: data, count: count ?? 0 };
    },
  });

  const leads = data?.leads ?? [];
  const total = data?.count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const selected = leads.find((l) => l.id === selectedId);

  useEffect(() => {
    if (selected) setMessage(buildMessage(selected));
  }, [selectedId]); // eslint-disable-line react-hooks/exhaustive-deps

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('leads').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      // sari automat la urmatorul lead din lista curenta
      const idx = leads.findIndex((l) => l.id === id);
      const next = leads[idx + 1] ?? leads[idx - 1];
      setSelectedId(next ? next.id : null);
    },
  });

  const handleSend = (lead: Lead) => {
    window.open(
      `https://wa.me/${waPhone(lead.phone)}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    );
    deleteMutation.mutate(lead.id, {
      onSuccess: () => toast.success(`Mesaj deschis în WhatsApp — ${lead.business_name} șters din listă`),
    });
  };

  const handleSkip = (lead: Lead) => {
    deleteMutation.mutate(lead.id, {
      onSuccess: () => toast.success(`${lead.business_name} șters fără trimitere`),
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold text-foreground">Leaduri</h1>
        <span className="text-sm text-muted-foreground">{total.toLocaleString('ro-RO')} în listă</span>
      </div>

      {/* Filtre */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <Select value={judet} onValueChange={setJudet}>
          <SelectTrigger><SelectValue placeholder="Județ" /></SelectTrigger>
          <SelectContent className="max-h-72">
            <SelectItem value={ALL}>Toate județele</SelectItem>
            {JUDETE.map((j) => <SelectItem key={j} value={j}>{j}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={categorie} onValueChange={setCategorie}>
          <SelectTrigger><SelectValue placeholder="Categorie" /></SelectTrigger>
          <SelectContent className="max-h-72">
            <SelectItem value={ALL}>Toate categoriile</SelectItem>
            {CATEGORII.map((c) => <SelectItem key={c} value={c} className="capitalize">{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={prioritate} onValueChange={setPrioritate}>
          <SelectTrigger><SelectValue placeholder="Prioritate" /></SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>Orice prioritate</SelectItem>
            <SelectItem value="Inalta">Înaltă</SelectItem>
            <SelectItem value="Medie">Medie</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="Caută nume sau oraș..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="text-muted-foreground">Se încarcă...</div>
      ) : leads.length === 0 ? (
        <div className="glass-card p-8 text-center text-muted-foreground">
          Niciun lead pe filtrele curente.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Lista */}
          <div className="lg:col-span-1">
            <div className="space-y-2 max-h-[45vh] lg:max-h-[62vh] overflow-y-auto pr-1">
              {leads.map((lead) => (
                <button
                  key={lead.id}
                  onClick={() => setSelectedId(lead.id)}
                  className={`w-full text-left glass-card p-3 transition-all ${
                    selectedId === lead.id ? 'border-primary/50' : ''
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-sm font-medium text-foreground truncate">{lead.business_name}</span>
                    {lead.priority === 'Inalta' && (
                      <Badge className="text-[10px] shrink-0 bg-emerald-500/20 text-emerald-400">Înaltă</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate capitalize">
                    {lead.category} · {lead.city}, {lead.county}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    ⭐ {lead.rating ?? '–'} ({lead.reviews ?? 0} recenzii)
                  </p>
                </button>
              ))}
            </div>

            {/* Paginare */}
            <div className="flex items-center justify-between mt-3">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 0}
                onClick={() => setPage((p) => p - 1)}
                aria-label="Pagina anterioară"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-xs text-muted-foreground">
                Pagina {page + 1} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page + 1 >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                aria-label="Pagina următoare"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Detaliu */}
          <div className="lg:col-span-2">
            {selected ? (
              <div className="glass-card p-6 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-heading font-semibold text-xl text-foreground">
                      {selected.business_name}
                    </h2>
                    <p className="text-sm text-muted-foreground capitalize mt-1">
                      {selected.category} · {selected.city}, {selected.county}
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleSkip(selected)}
                    disabled={deleteMutation.isPending}
                    aria-label="Șterge lead fără trimitere"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Phone className="w-4 h-4" /> {selected.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4" /> {selected.rating ?? '–'} ({selected.reviews ?? 0} recenzii)
                  </span>
                </div>

                {selected.address && (
                  <p className="flex items-start gap-1 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 shrink-0 mt-0.5" /> {selected.address}
                  </p>
                )}

                <div>
                  <label htmlFor="wa-message" className="text-sm text-muted-foreground block mb-2">
                    Mesaj WhatsApp (editabil):
                  </label>
                  <Textarea
                    id="wa-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={7}
                    className="text-sm"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white"
                    onClick={() => handleSend(selected)}
                    disabled={deleteMutation.isPending}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Trimite pe WhatsApp
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  La click se deschide WhatsApp cu mesajul pregătit, iar leadul se șterge automat din listă.
                </p>
              </div>
            ) : (
              <div className="glass-card p-8 text-center text-muted-foreground">
                Selectează un lead din listă.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLeads;
