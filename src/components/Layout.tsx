import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ChatWidget } from './ChatWidget';
import { useScrollToTop } from '@/hooks/useScrollToTop';

export function Layout({ children }: { children: ReactNode }) {
  useScrollToTop();

  return (
    <div className="ambient-glow relative min-h-screen overflow-x-hidden">
      <Navbar />
      <main>{children}</main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
