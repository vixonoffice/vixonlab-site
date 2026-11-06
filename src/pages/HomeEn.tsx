import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, MessageCircle } from 'lucide-react';
import { Link } from '@/components/LocalizedLink';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePageSEO } from '@/hooks/usePageSEO';
import { PageTransition } from '@/components/PageTransition';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Marquee } from '@/components/Marquee';
import { ShowcaseStack } from '@/components/ShowcaseStack';
import { FactsStrip } from '@/components/FactsStrip';
import { ClientsSection } from '@/components/ClientsSection';
import { WhatWeBuild } from '@/components/en/WhatWeBuild';
import { WHATSAPP_NUMBER } from '@/lib/tiers';

const CONTACT_EMAIL = 'vixonoffice@gmail.com';

const MARQUEE = [
  'Figma to code', 'React and Next.js', 'GSAP animation', 'AI chatbots', 'n8n automation',
  'Landing pages', 'Performance tuning', 'White-label',
];

const WHY = [
  { title: 'EU-based', text: 'Vixon Lab is a Romanian company, so contracts and data protection follow EU rules.' },
  { title: 'CET+1 working hours', text: 'Our working day overlaps with the UK, Germany and the Netherlands.' },
  { title: 'Fixed price', text: 'A quote per project before we start. No hourly billing, no surprise invoices.' },
  { title: 'NDA on request', text: 'We sign yours before you share any files.' },
  { title: 'No logo, no credit', text: 'White-label means white-label: your brand, your client, our name nowhere.' },
  { title: 'Straight to the builders', text: 'You talk to the people writing the code. No account managers in between.' },
];

const STEPS = [
  { title: 'Brief', text: 'Send the design or a short description. We reply within 24 hours with a fixed quote.' },
  { title: 'Design', text: 'Working from your Figma file? We skip this step. If not, we design it and you approve it before any code.' },
  { title: 'Build', text: 'We build, test on real devices and tune speed. You get a preview link along the way.' },
  { title: 'Launch', text: 'We deploy, set up the domain and analytics, and hand over the code. 30 days of bug fixes after launch.' },
];

const HomeEn = () => {
  const { t } = useLanguage();
  usePageSEO({
    title: 'Vixon Lab — EU web studio: websites, AI chatbots, white-label',
    description:
      'EU-based web studio. Custom websites from 350 EUR, landing pages from 300 EUR, AI chatbots from 500 EUR, and white-label production for agencies. Fixed price per project, CET+1.',
    home: true,
  });

  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Project enquiry from vixonlab.ro')}`;
  const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi! I found Vixon Lab and would like to talk about a project.')}`;

  return (
    <PageTransition>
      {/* HERO */}
      <section className="relative min-h-[100svh] flex items-center section-padding pt-28 pb-20 md:pt-32 lg:pb-24">
        <div className="relative z-10 mx-auto max-w-content w-full grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-8 items-center">
          <motion.div
            className="lg:col-span-6"
            initial="hidden" animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
          >
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/15 px-4 py-1.5 mb-8"
            >
              <span className="dot-green" />
              <span className="text-sm text-foreground/90">{t('hero.badge')}</span>
            </motion.div>

            <motion.h1
              variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] } } }}
              className="font-heading font-bold text-[2.5rem] leading-[1.02] sm:text-6xl xl:text-7xl tracking-tight mb-7"
            >
              <span className="block text-foreground">{t('hero.title1')}</span>
              <span className="block gradient-text pb-1">{t('hero.title2')}</span>
            </motion.h1>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
              className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-10"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link to="/agencies"
                className="btn-primary font-medium px-7 py-3.5 rounded-full text-center inline-flex items-center justify-center gap-2">
                White-label for agencies <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link to="/portfolio"
                className="backdrop-blur-md border border-white/15 bg-white/5 text-foreground font-medium px-7 py-3.5 rounded-full text-center hover:bg-white/10 hover:border-white/30 transition-all">
                {t('hero.cta2')}
              </Link>
            </motion.div>

            <motion.p
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.8 } } }}
              className="mt-10 text-sm text-muted-foreground"
            >
              Live clients:{' '}
              <span className="text-foreground/90">SIZ Detailing · American Partyland</span>
            </motion.p>
          </motion.div>

          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <ShowcaseStack />
          </motion.div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="border-y border-white/10 bg-white/[0.03] backdrop-blur-sm py-8" aria-label="What we do">
        <Marquee speed={45}>
          {MARQUEE.map((label) => (
            <div key={label} className="flex items-center gap-4 text-2xl md:text-3xl font-heading">
              <span className="text-foreground/80">{label}</span>
              <span className="text-primary-light/40 text-4xl">✦</span>
            </div>
          ))}
        </Marquee>
      </section>

      {/* FACTS */}
      <section className="section-padding section-spacing">
        <div className="mx-auto max-w-content">
          <FactsStrip />
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section className="section-padding pb-24 md:pb-32">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <p className="text-primary-light text-sm font-medium uppercase tracking-widest mb-3">What we build</p>
            <h2 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl leading-[0.95] mb-12">
              <span className="text-foreground">Four things, </span>
              <span className="gradient-text">done properly.</span>
            </h2>
          </ScrollReveal>
          <WhatWeBuild />
        </div>
      </section>

      {/* WHY US */}
      <section className="section-padding section-spacing border-t border-white/5">
        <div className="mx-auto max-w-content">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <ScrollReveal className="lg:col-span-6">
              <p className="text-primary-light text-sm font-medium uppercase tracking-widest mb-6">Why Vixon Lab</p>
              <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.05]">
                <span className="text-foreground">EU-based.</span>
                <br />
                <span className="gradient-text">Fixed price.</span>
                <br />
                <span className="gradient-text">Your name on it.</span>
              </h2>
            </ScrollReveal>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-9 lg:pt-6">
              {WHY.map((item, i) => (
                <ScrollReveal key={item.title} delay={(i % 2) * 0.08}>
                  <div className="border-l-2 border-primary/40 pl-5">
                    <h3 className="font-heading font-semibold text-xl text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section-padding section-spacing">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <p className="text-primary-light text-sm font-medium uppercase tracking-widest mb-3">How a project runs</p>
            <h2 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-20">
              <span className="text-foreground">Four steps.</span>
            </h2>
          </ScrollReveal>
          <div className="space-y-2">
            {STEPS.map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 0.08}>
                <div className="grid grid-cols-12 gap-6 items-baseline py-8 border-t border-white/10 hover:border-white/20 transition-colors">
                  <div className="col-span-12 md:col-span-2">
                    <span className="font-heading font-bold text-7xl md:text-8xl text-outline leading-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="col-span-12 md:col-span-4">
                    <h3 className="font-heading font-semibold text-2xl md:text-3xl text-foreground leading-tight">{step.title}</h3>
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <p className="text-muted-foreground text-base md:text-lg leading-relaxed">{step.text}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <ClientsSection />

      {/* FINAL CTA */}
      <section className="relative section-padding py-32 md:py-48 overflow-hidden border-t border-white/10 cta-glow">
        <ScrollReveal className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-8">
            <span className="text-foreground">Got a design or a brief?</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Send it by email or WhatsApp. We reply within 24 hours with a fixed price.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={mailto}
              className="btn-primary font-medium px-8 py-4 rounded-full inline-flex items-center justify-center gap-2 text-lg hover:opacity-90 transition-all">
              <Mail className="w-5 h-5" /> Email us
            </a>
            <a href={wa} target="_blank" rel="noopener noreferrer"
              className="border border-white/15 bg-white/5 backdrop-blur-md text-foreground font-medium px-8 py-4 rounded-full inline-flex items-center justify-center gap-2 text-lg hover:bg-white/10 hover:border-white/30 transition-all">
              <MessageCircle className="w-5 h-5" /> WhatsApp
            </a>
          </div>
        </ScrollReveal>
      </section>
    </PageTransition>
  );
};

export default HomeEn;
