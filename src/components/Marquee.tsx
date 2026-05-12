import { ReactNode } from 'react';

interface MarqueeProps {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
}

export function Marquee({ children, speed = 30, reverse = false, className = '' }: MarqueeProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: `marquee-${reverse ? 'reverse' : 'forward'} ${speed}s linear infinite`,
        }}
      >
        <div className="flex shrink-0 items-center gap-12 px-6">{children}</div>
        <div className="flex shrink-0 items-center gap-12 px-6" aria-hidden="true">{children}</div>
        <div className="flex shrink-0 items-center gap-12 px-6" aria-hidden="true">{children}</div>
      </div>

      <style>{`
        @keyframes marquee-forward {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
        @keyframes marquee-reverse {
          from { transform: translateX(-33.333%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
