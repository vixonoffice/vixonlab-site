import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if this is a recovery flow from the URL hash
    const hash = window.location.hash;
    if (hash.includes('type=recovery')) {
      setIsRecovery(true);
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsRecovery(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Parolele nu se potrivesc!');
      return;
    }
    if (password.length < 6) {
      toast.error('Parola trebuie să aibă minim 6 caractere.');
      return;
    }

    setIsLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setIsLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success('Parola a fost schimbată cu succes!');
    navigate('/admin');
  };

  if (!isRecovery) {
    return (
      <div className="min-h-screen flex items-center justify-center section-padding bg-background">
        <div className="text-center">
          <p className="text-muted-foreground">Link invalid sau expirat. Încearcă din nou din pagina de login.</p>
          <Button onClick={() => navigate('/admin/login')} className="mt-4" variant="ghost">
            Înapoi la login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center section-padding bg-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
            <span>VIXON</span>
            <span className="gradient-text">&nbsp;LAB</span>
          </h1>
          <p className="text-muted-foreground">Setează o parolă nouă</p>
        </div>

        <div className="glass-card p-8" style={{ transform: 'none' }}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="password">Parolă nouă</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="bg-white/5 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmă parola</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="bg-white/5 border-white/10"
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full gradient-primary text-white border-0 rounded-2xl"
            >
              {isLoading ? 'Se procesează...' : 'Schimbă parola'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
