import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useConfirm } from '@/hooks/useConfirm';
import { Trash2, RotateCcw, AlertTriangle } from 'lucide-react';

interface DeletedItem {
  id: string;
  title: string;
  subtitle: string;
  deleted_at: string;
  table: string;
}

const TABLE_CONFIG: { table: string; label: string; titleField: string; subtitleField?: string }[] = [
  { table: 'portfolio_projects', label: 'Portofoliu', titleField: 'title', subtitleField: 'subtitle_ro' },
  { table: 'services', label: 'Servicii', titleField: 'title_ro', subtitleField: 'description_ro' },
  { table: 'testimonials', label: 'Testimoniale', titleField: 'author_name', subtitleField: 'quote_ro' },
  { table: 'pricing_plans', label: 'Prețuri', titleField: 'name_ro', subtitleField: 'price_label_ro' },
];

const AdminTrash = () => {
  const [items, setItems] = useState<DeletedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { confirm, ConfirmDialog } = useConfirm();

  useEffect(() => { fetchDeleted(); }, []);

  async function fetchDeleted() {
    setLoading(true);
    const all: DeletedItem[] = [];

    await Promise.all(
      TABLE_CONFIG.map(async ({ table, label, titleField, subtitleField }) => {
        const { data } = await supabase
          .from(table as any)
          .select('*')
          .not('deleted_at', 'is', null)
          .order('deleted_at', { ascending: false });

        if (data) {
          data.forEach((row: any) => {
            all.push({
              id: row.id,
              title: row[titleField] || '(fără titlu)',
              subtitle: subtitleField ? (row[subtitleField] || '').slice(0, 80) + (row[subtitleField]?.length > 80 ? '...' : '') : label,
              deleted_at: row.deleted_at,
              table,
            });
          });
        }
      })
    );

    all.sort((a, b) => new Date(b.deleted_at).getTime() - new Date(a.deleted_at).getTime());
    setItems(all);
    setLoading(false);
  }

  function getTableLabel(table: string) {
    return TABLE_CONFIG.find((t) => t.table === table)?.label || table;
  }

  async function handleRestore(item: DeletedItem) {
    const { error } = await supabase
      .from(item.table as any)
      .update({ deleted_at: null })
      .eq('id', item.id);

    if (error) { toast.error('Eroare la restaurare.'); return; }
    toast.success(`"${item.title}" a fost restaurat!`);
    fetchDeleted();
  }

  async function handlePermanentDelete(item: DeletedItem) {
    if (!await confirm(`ATENȚIE: Ștergi permanent "${item.title}"? Această acțiune NU poate fi anulată!`)) return;
    const { error } = await supabase
      .from(item.table as any)
      .delete()
      .eq('id', item.id);

    if (error) { toast.error('Eroare la ștergere.'); return; }
    toast.success(`"${item.title}" a fost șters permanent.`);
    fetchDeleted();
  }

  async function handleEmptyTrash() {
    if (!await confirm('ATENȚIE: Golești COMPLET coșul? Toate elementele vor fi șterse permanent și NU pot fi recuperate!')) return;

    await Promise.all(
      TABLE_CONFIG.map(({ table }) =>
        supabase.from(table as any).delete().not('deleted_at', 'is', null)
      )
    );

    toast.success('Coș golit complet.');
    fetchDeleted();
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleString('ro-RO', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Coș Reciclare</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Elementele șterse sunt păstrate aici. Le poți restaura oricând sau șterge definitiv.
          </p>
        </div>
        {items.length > 0 && (
          <Button variant="destructive" size="sm" onClick={handleEmptyTrash} className="gap-2">
            <Trash2 className="w-4 h-4" />
            Golește Coșul
          </Button>
        )}
      </div>

      {loading ? (
        <div className="text-center text-muted-foreground py-16">Se încarcă...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 glass-card">
          <Trash2 className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-30" />
          <p className="text-muted-foreground">Coșul este gol. Nu ai șters nimic.</p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-xl px-4 py-3">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Elementele din coș nu apar pe site. Restaurează-le dacă ai șters din greșeală.</span>
          </div>

          {items.map((item) => (
            <div key={`${item.table}-${item.id}`} className="glass-card p-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/10 text-muted-foreground">
                    {getTableLabel(item.table)}
                  </span>
                  <span className="text-xs text-muted-foreground">{formatDate(item.deleted_at)}</span>
                </div>
                <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                {item.subtitle && (
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{item.subtitle}</p>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleRestore(item)}
                  className="gap-1.5 border-primary/30 text-primary-light hover:bg-primary/10 h-8"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Restaurează
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handlePermanentDelete(item)}
                  className="text-destructive h-8 px-2 hover:bg-destructive/10"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      {ConfirmDialog}
    </div>
  );
};

export default AdminTrash;
