import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';

export function Layout({ children }: { children: ReactNode }) {
  useScrollToTop();

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Decorative orbs */}
      <div className="orb orb-violet w-[500px] h-[500px] -top-48 -right-48 fixed" />
      <div className="orb orb-pink w-[400px] h-[400px] top-1/3 -left-48 fixed" />
      <div className="orb orb-violet w-[300px] h-[300px] bottom-1/4 right-1/4 fixed" />

      <Navbar />
      <main>{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
