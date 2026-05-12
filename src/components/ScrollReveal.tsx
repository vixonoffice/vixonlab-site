import { ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function ScrollReveal({ children, className = '', delay = 0, direction = 'up' }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' });

  const hidden = {
    up:    { opacity: 0, y: 32 },
    down:  { opacity: 0, y: -32 },
    left:  { opacity: 0, x: 40 },
    right: { opacity: 0, x: -40 },
  }[direction];

  const visible = {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98], delay },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={hidden}
      animate={inView ? visible : hidden}
    >
      {children}
    </motion.div>
  );
}
