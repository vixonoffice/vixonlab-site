import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Flame, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  PROMO_END,
  isPromoActive,
  PROMO_LABEL_RO,
  PROMO_LABEL_EN,
  PROMO_DISCOUNT_RO,
  PROMO_DISCOUNT_EN,
} from '@/lib/promo';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function computeTimeLeft(): TimeLeft {
  const diff = Math.max(0, PROMO_END - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const pad = (n: number) => n.toString().padStart(2, '0');

export function PromoBanner() {
  const { language } = useLanguage();
  const isRo = language === 'ro';
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => computeTimeLeft());
  const [dismissed, setDismissed] = useState(false);
  const [active, setActive] = useState(() => isPromoActive());

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      setTimeLeft(computeTimeLeft());
      if (!isPromoActive()) {
        setActive(false);
        clearInterval(id);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [active]);

  useEffect(() => {
    try {
      if (sessionStorage.getItem('vixon.promo.dismissed') === '1') {
        setDismissed(true);
      }
    } catch {}
  }, []);

  if (!active || dismissed) return null;

  const label = isRo ? PROMO_LABEL_RO : PROMO_LABEL_EN;
  const discount = isRo ? PROMO_DISCOUNT_RO : PROMO_DISCOUNT_EN;
  const ctaText = isRo ? 'Vezi ofertele' : 'See offers';
  const endsIn = isRo ? 'Se termină în' : 'Ends in';

  const handleClose = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem('vixon.promo.dismissed', '1');
    } catch {}
  };

  return (
    <div className="relative z-50 w-full bg-gradient-to-r from-primary via-accent to-primary text-white shadow-lg">
      <div className="mx-auto max-w-content px-4 py-2.5 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-center">
        <div className="flex items-center gap-2 font-heading font-semibold text-sm md:text-base">
          <Flame className="w-4 h-4 md:w-5 md:h-5 shrink-0 animate-pulse" />
          <span>{label}</span>
          <span className="hidden md:inline opacity-80">·</span>
          <span className="font-bold">{discount}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="opacity-90 hidden sm:inline">{endsIn}:</span>
          <div className="flex items-center gap-1 font-mono font-bold tabular-nums">
            <TimeBox value={timeLeft.days} label={isRo ? 'z' : 'd'} />
            <span className="opacity-70">:</span>
            <TimeBox value={timeLeft.hours} label="h" />
            <span className="opacity-70">:</span>
            <TimeBox value={timeLeft.minutes} label="m" />
            <span className="opacity-70">:</span>
            <TimeBox value={timeLeft.seconds} label="s" />
          </div>
        </div>

        <Link
          to="/pricing"
          className="bg-white text-primary font-bold text-xs md:text-sm px-4 py-1.5 rounded-full hover:bg-white/90 transition-colors whitespace-nowrap"
        >
          {ctaText} →
        </Link>
      </div>

      <button
        type="button"
        onClick={handleClose}
        aria-label={isRo ? 'Închide' : 'Close'}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-white/20 transition-colors hidden md:block"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <span className="inline-flex items-baseline gap-0.5">
      <span className="bg-white/20 rounded px-1.5 py-0.5 min-w-[1.75rem] text-center">
        {pad(value)}
      </span>
      <span className="text-[10px] opacity-80">{label}</span>
    </span>
  );
}
