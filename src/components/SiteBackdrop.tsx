import { useEffect, useRef } from 'react';

/**
 * Fixed page backdrop: static light pools + fading grid + film grain, plus a
 * cursor spotlight on desktop. All layers are low intensity so body text keeps
 * high contrast; the colour lives at the edges, never as a moving layer behind copy.
 *
 * Also drives `.spot-card` hover borders by writing --mx/--my on the card under the pointer.
 */
export function SiteBackdrop() {
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine) return;

    let raf = 0;
    let x = 0;
    let y = 0;
    let target: Element | null = null;

    const apply = () => {
      raf = 0;
      spotRef.current?.style.setProperty('transform', `translate3d(${x - 400}px, ${y - 400}px, 0)`);
      const card = target?.closest('.spot-card') as HTMLElement | null;
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${x - r.left}px`);
        card.style.setProperty('--my', `${y - r.top}px`);
      }
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      target = e.target as Element;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* light pools */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(124,58,237,0.30), transparent 70%)',
            'radial-gradient(ellipse 40% 40% at 100% 20%, rgba(217,70,239,0.14), transparent 70%)',
            'radial-gradient(ellipse 45% 45% at 0% 70%, rgba(79,70,229,0.14), transparent 70%)',
          ].join(','),
        }}
      />
      {/* grid, fading out from the top */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 80%)',
        }}
      />
      {/* cursor spotlight (desktop only) */}
      <div
        ref={spotRef}
        className="absolute left-0 top-0 hidden h-[800px] w-[800px] rounded-full md:block"
        style={{
          background: 'radial-gradient(closest-side, rgba(139,92,246,0.12), transparent)',
          transform: 'translate3d(-2000px, -2000px, 0)',
          willChange: 'transform',
        }}
      />
      {/* film grain */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
