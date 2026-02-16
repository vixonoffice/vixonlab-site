import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Trash2, Mail, Phone } from 'lucide-react';

const statusColors: Record<string, string> = {
  new: 'bg-primary/20 text-primary-light',
  read: 'bg-blue-500/20 text-blue-400',
  replied: 'bg-green-500/20 text-green-400',
  archived: 'bg-muted text-muted-foreground',
};

const AdminMessages = () => {
  const queryClient = useQueryClient();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['contact_submissions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact_submissions'] });
      toast.success('Status actualizat');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact_submissions'] });
      setSelectedId(null);
      toast.success('Mesaj șters');
    },
  });

  const selected = messages.find((m) => m.id === selectedId);

  if (isLoading) {
    return <div className="text-muted-foreground">Se încarcă...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-foreground mb-6">Mesaje Contact</h1>

      {messages.length === 0 ? (
        <div className="glass-card p-8 text-center text-muted-foreground">
          Nu există mesaje încă.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* List */}
          <div className="lg:col-span-1 space-y-2 max-h-[50vh] lg:max-h-[70vh] overflow-y-auto">
            {messages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => setSelectedId(msg.id)}
                className={`w-full text-left glass-card p-4 transition-all ${
                  selectedId === msg.id ? 'border-primary/50' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground truncate">{msg.name}</span>
                  <Badge className={`text-[10px] ${statusColors[msg.status] || ''}`}>
                    {msg.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground truncate">{msg.details}</p>
                <p className="text-[10px] text-muted-foreground mt-1">
                  {new Date(msg.created_at).toLocaleDateString('ro-RO')}
                </p>
              </button>
            ))}
          </div>

          {/* Detail */}
          <div className="lg:col-span-2">
            {selected ? (
              <div className="glass-card p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-heading font-semibold text-xl text-foreground">{selected.name}</h2>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteMutation.mutate(selected.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <a href={`mailto:${selected.email}`} className="flex items-center gap-1 hover:text-primary-light">
                    <Mail className="w-4 h-4" /> {selected.email}
                  </a>
                  {selected.phone && (
                    <a href={`tel:${selected.phone}`} className="flex items-center gap-1 hover:text-primary-light">
                      <Phone className="w-4 h-4" /> {selected.phone}
                    </a>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Tip proiect:</span>
                    <p className="text-foreground">{selected.project_type}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Buget:</span>
                    <p className="text-foreground">{selected.budget}</p>
                  </div>
                </div>

                <div>
                  <span className="text-sm text-muted-foreground">Detalii:</span>
                  <p className="text-foreground mt-1 whitespace-pre-wrap">{selected.details}</p>
                </div>

                <div>
                  <span className="text-sm text-muted-foreground block mb-2">Status:</span>
                  <div className="flex gap-2">
                    {['new', 'read', 'replied', 'archived'].map((s) => (
                      <Button
                        key={s}
                        variant={selected.status === s ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => updateStatus.mutate({ id: selected.id, status: s })}
                        className="capitalize"
                      >
                        {s}
                      </Button>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-muted-foreground">
                  Trimis: {new Date(selected.created_at).toLocaleString('ro-RO')}
                </p>
              </div>
            ) : (
              <div className="glass-card p-8 text-center text-muted-foreground">
                Selectează un mesaj din listă.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
