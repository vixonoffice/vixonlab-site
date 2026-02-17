import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { FileText, Briefcase, FolderOpen, MessageSquare, DollarSign, BarChart3 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const quickLinks = [
  { label: 'Continut', path: '/admin/content', icon: FileText, desc: 'Editeaza textele site-ului' },
  { label: 'Servicii', path: '/admin/services', icon: Briefcase, desc: 'Gestioneaza serviciile' },
  { label: 'Portofoliu', path: '/admin/portfolio', icon: FolderOpen, desc: 'Administreaza proiectele' },
  { label: 'Testimoniale', path: '/admin/testimonials', icon: MessageSquare, desc: 'Editeaza recenziile' },
  { label: 'Preturi', path: '/admin/pricing', icon: DollarSign, desc: 'Configureaza pachetele' },
  { label: 'Statistici', path: '/admin/stats', icon: BarChart3, desc: 'Modifica cifrele' },
];

interface Counts {
  projects: number;
  services: number;
  testimonials: number;
  messages: number;
  plans: number;
}

const Dashboard = () => {
  const { user, isAdmin, isEditor } = useAuth();
  const [counts, setCounts] = useState<Counts>({ projects: 0, services: 0, testimonials: 0, messages: 0, plans: 0 });

  useEffect(() => {
    Promise.all([
      supabase.from('portfolio_projects').select('id', { count: 'exact', head: true }),
      supabase.from('services').select('id', { count: 'exact', head: true }),
      supabase.from('testimonials').select('id', { count: 'exact', head: true }),
      supabase.from('contact_submissions').select('id', { count: 'exact', head: true }).eq('status', 'new'),
      supabase.from('pricing_plans').select('id', { count: 'exact', head: true }),
    ]).then(([proj, svc, test, msg, plans]) => {
      setCounts({
        projects: proj.count || 0,
        services: svc.count || 0,
        testimonials: test.count || 0,
        messages: msg.count || 0,
        plans: plans.count || 0,
      });
    });
  }, []);

  const statCards = [
    { label: 'Proiecte', value: counts.projects, color: 'text-purple-400' },
    { label: 'Servicii', value: counts.services, color: 'text-blue-400' },
    { label: 'Testimoniale', value: counts.testimonials, color: 'text-pink-400' },
    { label: 'Mesaje noi', value: counts.messages, color: 'text-amber-400' },
    { label: 'Pachete pret', value: counts.plans, color: 'text-green-400' },
  ];

  return (
    <div>
      <h1 className="font-heading font-bold text-2xl text-foreground mb-1">
        Bine ai venit!
      </h1>
      <p className="text-muted-foreground text-sm mb-8">
        Rol: {isAdmin ? 'Administrator' : isEditor ? 'Editor' : 'N/A'} — {user?.email}
      </p>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
        {statCards.map((s) => (
          <div key={s.label} className="glass-card p-4 text-center" style={{ transform: 'none' }}>
            <div className={`font-heading font-bold text-2xl ${s.color}`}>{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

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
