import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import {
  LayoutDashboard, FileText, Briefcase, FolderOpen, MessageSquare,
  DollarSign, BarChart3, Footprints, Code, Users, LogOut, Inbox, Menu, X, Trash2, PenSquare, Settings, Globe, PhoneCall
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { label: 'Conținut', path: '/admin/content', icon: FileText },
  { label: 'Servicii', path: '/admin/services', icon: Briefcase },
  { label: 'Portofoliu', path: '/admin/portfolio', icon: FolderOpen },
  { label: 'Blog', path: '/admin/blog', icon: PenSquare },
  { label: 'Testimoniale', path: '/admin/testimonials', icon: MessageSquare },
  { label: 'Prețuri', path: '/admin/pricing', icon: DollarSign },
  { label: 'Configurator', path: '/admin/configurator', icon: Settings },
  { label: 'Statistici', path: '/admin/stats', icon: BarChart3 },
  { label: 'Proces', path: '/admin/process', icon: Footprints },
  { label: 'Tech Stack', path: '/admin/tech', icon: Code },
  { label: 'Utilizatori', path: '/admin/users', icon: Users },
  { label: 'Mesaje', path: '/admin/messages', icon: Inbox },
  { label: 'Leaduri', path: '/admin/leads', icon: PhoneCall },
  { label: 'Preview-uri', path: '/admin/previews', icon: Globe },
  { label: 'Coș Reciclare', path: '/admin/trash', icon: Trash2 },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, user, isAdmin } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useScrollToTop();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const filteredItems = navItems.filter(item => {
    if (item.path === '/admin/users' || item.path === '/admin/messages' || item.path === '/admin/leads') return isAdmin;
    return true;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Mobile header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-white/6 bg-background-secondary/50">
        <Link to="/" className="font-heading font-bold text-lg">
          <span className="text-foreground">VIXON</span>
          <span className="gradient-text">&nbsp;LAB</span>
        </Link>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-foreground p-2">
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
        fixed inset-y-0 left-0 z-50 w-64 border-r border-white/6 bg-background flex flex-col
        transition-transform duration-200 ease-in-out
        md:relative md:z-auto
      `}>
        <div className="p-6 border-b border-white/6">
          <Link to="/" className="font-heading font-bold text-lg">
            <span className="text-foreground">VIXON</span>
            <span className="gradient-text">&nbsp;LAB</span>
          </Link>
          <p className="text-xs text-muted-foreground mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {filteredItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary/20 text-primary-light'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/6">
          <div className="px-3 py-2 mb-2">
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all w-full"
          >
            <LogOut className="w-4 h-4" />
            Deconectare
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto min-w-0">
        <div className="p-4 md:p-8 max-w-5xl">
          {children}
        </div>
      </main>
    </div>
  );
}
