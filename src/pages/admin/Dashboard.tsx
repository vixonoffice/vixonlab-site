import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { FileText, Briefcase, FolderOpen, MessageSquare, DollarSign, BarChart3 } from 'lucide-react';

const quickLinks = [
  { label: 'Conținut', path: '/admin/content', icon: FileText, desc: 'Editează textele site-ului' },
  { label: 'Servicii', path: '/admin/services', icon: Briefcase, desc: 'Gestionează serviciile' },
  { label: 'Portofoliu', path: '/admin/portfolio', icon: FolderOpen, desc: 'Administrează proiectele' },
  { label: 'Testimoniale', path: '/admin/testimonials', icon: MessageSquare, desc: 'Editează recenziile' },
  { label: 'Prețuri', path: '/admin/pricing', icon: DollarSign, desc: 'Configurează pachetele' },
  { label: 'Statistici', path: '/admin/stats', icon: BarChart3, desc: 'Modifică cifrele' },
];

const Dashboard = () => {
  const { user, isAdmin, isEditor } = useAuth();

  return (
    <div>
      <h1 className="font-heading font-bold text-2xl text-foreground mb-1">
        Bine ai venit! 👋
      </h1>
      <p className="text-muted-foreground text-sm mb-8">
        Rol: {isAdmin ? 'Administrator' : isEditor ? 'Editor' : 'N/A'} — {user?.email}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickLinks.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="glass-card p-5 group block"
          >
            <item.icon className="w-5 h-5 text-primary-light mb-3" />
            <h3 className="font-heading font-semibold text-foreground mb-1">{item.label}</h3>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
