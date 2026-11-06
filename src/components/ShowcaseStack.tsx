import { useEffect, useState } from 'react';
import { Link } from '@/components/LocalizedLink';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Doi clienti reali, apoi doua concepte marcate clar "Concept / demo" (vezi src/data/portfolio.ts).
const PROJECTS = [
  { name: 'SIZ Detailing', img: '/portfolio/sizdetailing.webp', ro: 'Client real · detailing auto', en: 'Real client · car detailing' },
  { name: 'American Partyland', img: '/portfolio/americanpartyland.webp', ro: 'Client real · loc de joacă', en: 'Real client · kids playground' },
  { name: 'La Piazza', img: '/portfolio/lapiazza.webp', ro: 'Concept / demo', en: 'Concept / demo' },
  { name: 'DentPro Clinic', img: '/portfolio/dentpro-screen.webp', ro: 'Concept / demo', en: 'Concept / demo' },
];

// Depth slots: 0 = front card, higher = further back.
const SLOTS = [
  { x: '0%', y: '0%', scale: 1, opacity: 1, z: 40 },
  { x: '7%', y: '-11%', scale: 0.9, opacity: 0.7, z: 30 },
  { x: '14%', y: '-22%', scale: 0.8, opacity: 0.4, z: 20 },
  { x: '14%', y: '-22%', scale: 0.8, opacity: 0, z: 10 },
];

/** Stack of project sites in browser frames; cycles on a timer and tilts toward the pointer. */
export function ShowcaseStack() {
  const { language } = useLanguage();
  const reduce = useReducedMotion();
  const [front, setFront] = useState(0);
  const [paused, setPaused] = useState(false);

  const rx = useMotionValue(8);
  const ry = useMotionValue(-14);
  const rotateX = useSpring(rx, { stiffness: 120, damping: 18 });
  const rotateY = useSpring(ry, { stiffness: 120, damping: 18 });

  useEffect(() => {
    if (paused || reduce) return;
    const id = setInterval(() => setFront((f) => (f + 1) % PROJECTS.length), 3200);
    return () => clearInterval(id);
  }, [paused, reduce]);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(-14 + px * 16);
    rx.set(8 - py * 12);
  };
  const onLeave = () => {
    rx.set(8);
    ry.set(-14);
    setPaused(false);
  };

  const current = PROJECTS[front];

  return (
    <div
      className="relative mx-auto w-full max-w-[600px] pt-[12%]"
      style={{ perspective: 1400 }}
      onPointerMove={onMove}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={onLeave}
    >
      {/* glow pool behind the stack */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(147,51,234,0.45), rgba(192,38,211,0.18) 55%, transparent)', filter: 'blur(40px)' }}
      />

      <motion.div className="relative mr-[13%] aspect-[16/10.6]" style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
        {PROJECTS.map((p, i) => {
          const slot = SLOTS[(i - front + PROJECTS.length) % PROJECTS.length];
          return (
            <motion.div
              key={p.name}
              className="absolute inset-0 overflow-hidden rounded-xl border border-white/15 bg-[#0f0d20] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
              initial={false}
              animate={{ x: slot.x, y: slot.y, scale: slot.scale, opacity: slot.opacity }}
              transition={{ duration: reduce ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ zIndex: slot.z, transformOrigin: 'top right' }}
            >
              {/* browser chrome */}
              <div className="flex h-7 items-center gap-1.5 border-b border-white/10 bg-[#171430] px-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-3 truncate rounded-md bg-white/[0.06] px-2.5 py-0.5 text-[10px] text-white/60">
                  {p.name}
                </span>
              </div>
              <img
                src={p.img}
                alt={`${p.name} — ${language === 'ro' ? p.ro : p.en}`}
                width={800}
                height={500}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className="block h-[calc(100%-1.75rem)] w-full object-cover object-top"
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* caption for the front project */}
      <Link
        to="/portfolio"
        className="group absolute -bottom-5 left-2 z-50 inline-flex items-center gap-3 rounded-full border border-white/15 bg-[#15132b]/90 py-2 pl-3 pr-4 text-sm shadow-xl backdrop-blur-md md:left-6"
      >
        <span className="dot-green" />
        <span className="font-medium text-foreground">{current.name}</span>
        <span className="hidden text-muted-foreground sm:inline">· {language === 'ro' ? current.ro : current.en}</span>
        <ArrowUpRight className="h-4 w-4 text-primary-light transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
