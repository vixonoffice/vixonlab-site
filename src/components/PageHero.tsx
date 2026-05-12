import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { VideoBackground } from './VideoBackground';

interface PageHeroProps {
  badge: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  videoSrc?: string;
  children?: ReactNode;
}

export function PageHero({ badge, title, titleAccent, subtitle, videoSrc, children }: PageHeroProps) {
  return (
    <section className="relative section-padding pt-36 md:pt-44 pb-16 md:pb-24 overflow-hidden">
      {videoSrc && (
        <>
          <VideoBackground src={videoSrc} opacity={0.5} />
          <div className="absolute inset-0 z-0"
            style={{ background: 'linear-gradient(180deg, rgba(10,4,24,0.75) 0%, rgba(10,4,24,0.95) 100%)' }} />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-content">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
            className="inline-flex items-center gap-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 px-4 py-1.5 mb-8"
          >
            <span className="dot-green" />
            <span className="text-sm text-primary-light">{badge}</span>
          </motion.div>

          <motion.h1
            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] } } }}
            className="font-heading font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight mb-8"
          >
            <span className="text-foreground">{title}</span>
            {titleAccent && (
              <>
                <br />
                <span className="gradient-text italic">{titleAccent}</span>
              </>
            )}
          </motion.h1>

          {subtitle && (
            <motion.p
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}

          {children && (
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
              className="mt-10"
            >
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
