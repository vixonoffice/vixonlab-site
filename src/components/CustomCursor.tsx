import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring_pos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', move);

    let raf: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      ring_pos.current.x = lerp(ring_pos.current.x, pos.current.x, 0.12);
      ring_pos.current.y = lerp(ring_pos.current.y, pos.current.y, 0.12);

      if (dot.current) {
        dot.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      if (ring.current) {
        ring.current.style.transform = `translate(${ring_pos.current.x - 18}px, ${ring_pos.current.y - 18}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onEnter = () => ring.current?.classList.add('scale-150', 'opacity-50');
    const onLeave = () => ring.current?.classList.remove('scale-150', 'opacity-50');

    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', move);
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none mix-blend-difference"
        style={{ zIndex: 9999, willChange: 'transform' }}
      />
      <div
        ref={ring}
        className="fixed top-0 left-0 w-9 h-9 border border-white/50 rounded-full pointer-events-none transition-all duration-300 mix-blend-difference"
        style={{ zIndex: 9999, willChange: 'transform' }}
      />
    </>
  );
}
