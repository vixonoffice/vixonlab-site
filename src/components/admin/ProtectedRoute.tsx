import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, hasAccess } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground">Se încarcă...</div>
      </div>
    );
  }

  if (!user) return <Navigate to="/admin/login" replace />;
  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="glass-card p-8 text-center max-w-md">
          <h2 className="font-heading font-bold text-xl text-foreground mb-2">Acces restricționat</h2>
          <p className="text-muted-foreground text-sm">Nu ai permisiuni pentru a accesa panoul de administrare.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
