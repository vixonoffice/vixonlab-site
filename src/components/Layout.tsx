import { ReactNode, lazy, Suspense } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useScrollToTop } from '@/hooks/useScrollToTop';

const ChatWidget = lazy(() => import('./ChatWidget').then(m => ({ default: m.ChatWidget })));

export function Layout({ children }: { children: ReactNode }) {
  useScrollToTop();

  return (
    <div className="ambient-glow relative min-h-screen overflow-x-hidden">
      <Navbar />
      <main>{children}</main>
      <Footer />
      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>
    </div>
  );
}
