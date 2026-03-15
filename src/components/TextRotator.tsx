import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface TextRotatorProps {
  words: string[];
  interval?: number;
  className?: string;
}

export function TextRotator({ words, interval = 3000, className = '' }: TextRotatorProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentRef = useRef<HTMLSpanElement>(null);
  const nextRef = useRef<HTMLSpanElement>(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    if (words.length <= 1) return;

    const timer = setInterval(() => {
      if (isAnimating.current) return;
      isAnimating.current = true;

      const nextIndex = (currentIndex + 1) % words.length;

      const current = currentRef.current;
      const next = nextRef.current;
      if (!current || !next) return;

      // Set next word
      next.textContent = words[nextIndex];

      const tl = gsap.timeline({
        onComplete: () => {
          setCurrentIndex(nextIndex);
          isAnimating.current = false;
        },
      });

      tl.to(current, {
        y: -80,
        opacity: 0,
        filter: 'blur(8px)',
        duration: 0.5,
        ease: 'power3.in',
      })
        .fromTo(
          next,
          { y: 80, opacity: 0, filter: 'blur(8px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power3.out' },
          '-=0.15'
        )
        .set(current, { y: 0, opacity: 1, filter: 'blur(0px)' });
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, words, interval]);

  return (
    <span className={`text-rotator-wrapper ${className}`}>
      <span ref={currentRef} className="text-rotator-word">
        {words[currentIndex]}
      </span>
      <span ref={nextRef} className="text-rotator-word text-rotator-next" aria-hidden="true">
        {words[(currentIndex + 1) % words.length]}
      </span>
    </span>
  );
}
