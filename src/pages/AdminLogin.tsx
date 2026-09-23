import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin },
      });
      if (error) { toast.error(error.message); setIsLoading(false); return; }
      toast.success('Cont creat! Un administrator trebuie să-ți atribuie un rol.');
      setIsSignUp(false);
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) { toast.error(error.message); setIsLoading(false); return; }
      toast.success('Autentificare reușită!');
      navigate('/admin');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center section-padding bg-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
            <span>VIXON</span>
            <span className="text-primary-light">&nbsp;LAB</span>
          </h1>
          <p className="text-muted-foreground">Panou de administrare</p>
        </div>

        <div className="glass-card p-8" style={{ transform: 'none' }}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@vixonlab.com"
                required
                className="bg-white/5 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Parolă</Label>
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
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-foreground text-background border-0 rounded-2xl"
            >
              {isLoading ? 'Se procesează...' : isSignUp ? 'Crează cont' : 'Autentificare'}
            </Button>
          </form>

          <div className="mt-4 text-center space-y-2">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-muted-foreground hover:text-primary-light transition-colors block w-full"
            >
              {isSignUp ? 'Ai deja cont? Autentifică-te' : 'Nu ai cont? Înregistrează-te'}
            </button>
            {!isSignUp && (
              <button
                onClick={async () => {
                  if (!email) { toast.error('Introdu adresa de email mai întâi.'); return; }
                  const { error } = await supabase.auth.resetPasswordForEmail(email, {
                    redirectTo: `${window.location.origin}/reset-password`,
                  });
                  if (error) { toast.error(error.message); return; }
                  toast.success('Email de resetare trimis! Verifică inbox-ul.');
                }}
                className="text-sm text-muted-foreground hover:text-primary-light transition-colors"
              >
                Am uitat parola
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
