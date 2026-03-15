import { ReactNode, lazy, Suspense } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ChatWidget } from './ChatWidget';
import { useScrollToTop } from '@/hooks/useScrollToTop';

const InteractiveParticles = lazy(() => import('./InteractiveParticles').then(m => ({ default: m.InteractiveParticles })));

export function Layout({ children }: { children: ReactNode }) {
  useScrollToTop();

  return (
    <div className="ambient-glow relative min-h-screen overflow-x-hidden">
      <Suspense fallback={null}>
        <InteractiveParticles />
      </Suspense>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
