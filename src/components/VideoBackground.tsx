import { useEffect, useRef } from 'react';

interface VideoBackgroundProps {
  src: string;
  opacity?: number;
}

export function VideoBackground({ src, opacity = 1 }: VideoBackgroundProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute('muted', '');
    v.setAttribute('playsinline', '');
    v.setAttribute('webkit-playsinline', '');

    const tryPlay = () => v.play().catch(() => {});
    tryPlay();

    // Replay on visibility/focus changes (iOS quirk)
    const onVisible = () => { if (document.visibilityState === 'visible') tryPlay(); };
    const onFirstTouch = () => { tryPlay(); window.removeEventListener('touchstart', onFirstTouch); };

    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('touchstart', onFirstTouch, { once: true, passive: true });

    return () => {
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('touchstart', onFirstTouch);
    };
  }, []);

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      disableRemotePlayback
      className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      style={{ opacity }}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
