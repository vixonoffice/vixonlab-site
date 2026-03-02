import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';

export function Layout({ children }: { children: ReactNode }) {
  useScrollToTop();

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Decorative ambient glows — CSS radial-gradient, no filter:blur (paint cost) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 600px 500px at 100% -5%, hsl(263 83% 58% / 0.12) 0%, transparent 70%),' +
            'radial-gradient(ellipse 500px 400px at -10% 40%, hsl(330 81% 60% / 0.09) 0%, transparent 70%),' +
            'radial-gradient(ellipse 350px 300px at 75% 80%, hsl(263 83% 58% / 0.07) 0%, transparent 70%)',
        }}
      />

      <Navbar />
      <main>{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
