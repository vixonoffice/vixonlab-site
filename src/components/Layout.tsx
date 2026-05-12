import { ReactNode, lazy, Suspense } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { PromoBanner } from './PromoBanner';
import { AuroraBackground } from './AuroraBackground';
import { CustomCursor } from './CustomCursor';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { useLenis } from '@/hooks/useLenis';

const ChatWidget = lazy(() => import('./ChatWidget').then(m => ({ default: m.ChatWidget })));

export function Layout({ children }: { children: ReactNode }) {
  useScrollToTop();
  useLenis();

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden">
      <AuroraBackground />
      <CustomCursor />
      <div className="relative" style={{ zIndex: 1 }}>
        <Navbar />
        <PromoBanner />
        <main>{children}</main>
        <Footer />
        <Suspense fallback={null}>
          <ChatWidget />
        </Suspense>
      </div>
    </div>
  );
}
