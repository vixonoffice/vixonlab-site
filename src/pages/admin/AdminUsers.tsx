import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { getUserFriendlyError } from '@/lib/errorUtils';
import { Plus, Trash2, Shield, Edit2 } from 'lucide-react';

interface UserWithRole {
  user_id: string;
  email: string;
  role: string;
}

const AdminUsers = () => {
  const { isAdmin } = useAuth();
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState<'admin' | 'editor'>('editor');
  const [creating, setCreating] = useState(false);

  useEffect(() => { fetchUsers(); }, []);

  async function fetchUsers() {
    const { data } = await supabase.from('user_roles').select('user_id, role');
    if (!data) { setLoading(false); return; }

    // Get profile info for each user
    const userIds = data.map(d => (d as any).user_id);
    const { data: profiles } = await supabase.from('profiles').select('user_id, display_name').in('user_id', userIds);
    
    const enriched = data.map((d: any) => {
      const profile = profiles?.find((p: any) => p.user_id === d.user_id);
      return { user_id: d.user_id, email: profile?.display_name || d.user_id, role: d.role };
    });
    
    setUsers(enriched);
    setLoading(false);
  }

  async function handleCreateUser() {
    if (!newEmail || !newPassword) { toast.error('Completează email și parolă'); return; }
    setCreating(true);

    // Sign up via edge function would be ideal, but for now we note this limitation
    toast.info('Pentru a adăuga utilizatori noi, aceștia trebuie să se înregistreze prin pagina de login. Apoi poți să le atribui un rol de aici.');
    setCreating(false);
  }

  async function handleDeleteRole(userId: string) {
    if (!confirm('Sigur vrei să elimini acest rol?')) return;
    const { error } = await supabase.from('user_roles').delete().eq('user_id', userId);
    if (error) { toast.error(getUserFriendlyError(error)); return; }
    toast.success('Rol eliminat!');
    fetchUsers();
  }

  if (!isAdmin) return <p className="text-muted-foreground">Doar adminii pot gestiona utilizatori.</p>;
  if (loading) return <p className="text-muted-foreground">Se încarcă...</p>;

  return (
    <div>
      <h1 className="font-heading font-bold text-2xl text-foreground mb-6">Utilizatori & Roluri</h1>

      <div className="glass-card p-5 mb-6" style={{ transform: 'none' }}>
        <p className="text-sm text-muted-foreground mb-3">
          Pentru a adăuga un utilizator nou, acesta trebuie mai întâi să se înregistreze. 
          Apoi îi poți atribui un rol (admin/editor) folosind baza de date din Cloud.
        </p>
      </div>

      <div className="space-y-3">
        {users.map((u) => (
          <div key={u.user_id} className="glass-card p-3 sm:p-4" style={{ transform: 'none' }}>
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-primary-light shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-semibold text-foreground text-sm truncate">{u.email}</h3>
                <p className="text-xs text-muted-foreground capitalize">{u.role}</p>
              </div>
              <Button size="sm" variant="ghost" onClick={() => handleDeleteRole(u.user_id)} className="text-destructive h-8 px-2 shrink-0">
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        ))}
        {users.length === 0 && <p className="text-muted-foreground text-sm">Niciun utilizator cu rol atribuit.</p>}
      </div>
    </div>
  );
};

export default AdminUsers;
