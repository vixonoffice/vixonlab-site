import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePageSEO } from '@/hooks/usePageSEO';
import { PageTransition } from '@/components/PageTransition';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Marquee } from '@/components/Marquee';
import { ShowcaseStack } from '@/components/ShowcaseStack';
import { PriceFinder } from '@/components/PriceFinder';
import {
  Star, ArrowUpRight,
  Utensils, Scissors, HeartPulse, Dumbbell, PartyPopper, Scale, Car, Home, Laptop, Camera,
} from 'lucide-react';
import {
  resolveIcon, STATIC_STATS, STATIC_SERVICES, STATIC_PROCESS_STEPS, STATIC_TESTIMONIALS,
} from '@/data/staticData';

const Index = () => {
  const { t, language } = useLanguage();
  usePageSEO({ title: t('nav.home'), description: t('hero.subtitle') });

  const stats = STATIC_STATS;
  const services = STATIC_SERVICES;
  const steps = STATIC_PROCESS_STEPS;
  const testimonials = STATIC_TESTIMONIALS;

  const [activeT, setActiveT] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActiveT(v => (v + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, [testimonials.length]);

  const industries = [
    { icon: Utensils,    label: language === 'ro' ? 'Restaurante'     : 'Restaurants' },
    { icon: Scissors,    label: language === 'ro' ? 'Saloane Beauty'  : 'Beauty Salons' },
    { icon: HeartPulse,  label: language === 'ro' ? 'Cabinete Medicale': 'Medical Clinics' },
    { icon: Dumbbell,    label: language === 'ro' ? 'Fitness & Gym'   : 'Fitness & Gym' },
    { icon: PartyPopper, label: language === 'ro' ? 'Săli de evenimente' : 'Event Venues' },
    { icon: Scale,       label: language === 'ro' ? 'Avocatură'       : 'Law Firms' },
    { icon: Car,         label: language === 'ro' ? 'Auto & Service'  : 'Auto & Service' },
    { icon: Home,        label: language === 'ro' ? 'Imobiliare'      : 'Real Estate' },
    { icon: Laptop,      label: language === 'ro' ? 'IT & Tech'       : 'IT & Tech' },
    { icon: Camera,      label: language === 'ro' ? 'Fotografi'       : 'Photographers' },
  ];

  return (
    <PageTransition>
      {/* ────── HERO ────── */}
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
              className="font-heading font-bold text-[2.75rem] leading-[1] sm:text-6xl xl:text-7xl tracking-tight mb-7"
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
              <Link to="/pricing"
                className="btn-primary font-medium px-7 py-3.5 rounded-full text-center inline-flex items-center justify-center gap-2">
                {language === 'ro' ? 'Vezi cât costă' : 'See pricing'} <ArrowUpRight className="w-4 h-4" />
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
              {language === 'ro' ? 'Proiecte recente:' : 'Recent work:'}{' '}
              <span className="text-foreground/90">Nuța Events · La Piazza · DentPro · SIZ Detailing</span>
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

      {/* ────── MARQUEE — INDUSTRIES SCROLLING ────── */}
      <section className="border-y border-white/10 bg-white/[0.03] backdrop-blur-sm py-8">
        <Marquee speed={45}>
          {industries.map((item, i) => (
            <div key={i} className="flex items-center gap-4 text-2xl md:text-3xl font-heading">
              <item.icon className="w-7 h-7 text-primary-light" />
              <span className="text-foreground/80">{item.label}</span>
              <span className="text-primary-light/40 text-4xl">✦</span>
            </div>
          ))}
        </Marquee>
      </section>

      {/* ────── STATS — MASSIVE NUMBERS ────── */}
      <section className="section-padding section-spacing">
        <div className="mx-auto max-w-content">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-0 md:divide-x divide-white/10">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.id} delay={i * 0.08}>
                <div className="px-2 md:px-8 text-left">
                  <div className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl gradient-text mb-3 leading-none">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-muted-foreground uppercase tracking-widest">
                    {language === 'en' ? stat.label_en : stat.label_ro}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ────── PRICE FINDER — INTERACTIVE ────── */}
      <section className="section-padding pb-24 md:pb-32">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <p className="text-primary-light text-sm font-medium uppercase tracking-widest mb-3">
              {language === 'ro' ? 'Calculator' : 'Calculator'}
            </p>
            <h2 className="font-heading font-bold text-4xl md:text-6xl leading-[1] mb-12">
              <span className="text-foreground">{language === 'ro' ? 'Află în 10 secunde ' : 'Find out in 10 seconds '}</span>
              <span className="gradient-text">{language === 'ro' ? 'cât costă site-ul tău.' : 'what your site costs.'}</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <PriceFinder />
          </ScrollReveal>
        </div>
      </section>

      {/* ────── SERVICES — BENTO GRID ────── */}
      <section className="section-padding section-spacing">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
              <div>
                <p className="text-primary-light text-sm font-medium uppercase tracking-widest mb-3">
                  {t('services.label')}
                </p>
                <h2 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl leading-[0.95]">
                  <span className="text-foreground">{t('services.title')}</span>
                </h2>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-5 auto-rows-[minmax(220px,_auto)]">
            {services.map((service, i) => {
              const Icon = resolveIcon(service.icon);
              const layouts = [
                'md:col-span-4 md:row-span-2',
                'md:col-span-2',
                'md:col-span-2',
                'md:col-span-6 lg:col-span-4',
              ];
              return (
                <ScrollReveal key={service.id} delay={i * 0.1} className={layouts[i] || 'md:col-span-3'}>
                  <Link
                    to={`/services#${service.anchor || service.id}`}
                    className="relative group h-full block overflow-hidden rounded-2xl border border-white/10 bg-card p-8 hover:border-white/25 transition-all duration-500 spot-card"
                  >

                    {i === 0 && (
                      <div aria-hidden className="pointer-events-none absolute -right-8 top-8 hidden w-[72%] md:block">
                        <img
                          src="/portfolio/lapiazza.webp"
                          alt=""
                          width={800}
                          height={500}
                          loading="lazy"
                          className="rounded-xl border border-white/15 shadow-2xl transition-transform duration-700 [transform:perspective(1200px)_rotateY(-12deg)_rotateX(6deg)] group-hover:[transform:perspective(1200px)_rotateY(-4deg)_rotateX(2deg)]"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-2/3 rounded-b-xl bg-gradient-to-t from-card via-card/80 to-transparent" />
                      </div>
                    )}
                    <div className="relative h-full flex flex-col justify-between">
                      <div className={`w-14 h-14 rounded-2xl icon-tile flex items-center justify-center mb-6`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>

                      <div>
                        <h3 className="font-heading font-semibold text-2xl md:text-3xl text-foreground mb-3 leading-tight">
                          {language === 'en' ? service.title_en : service.title_ro}
                        </h3>
                        <p className="text-base text-muted-foreground leading-relaxed mb-4 max-w-md">
                          {language === 'en' ? service.description_en : service.description_ro}
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-sm text-primary-light translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                          {t('services.learnMore')} <ArrowUpRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ────── WHY US — SPLIT QUOTE LAYOUT ────── */}
      <section className="section-padding section-spacing border-t border-white/5">
        <div className="mx-auto max-w-content">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <ScrollReveal className="lg:col-span-7">
              <p className="text-primary-light text-sm font-medium uppercase tracking-widest mb-6">
                {t('why.label')}
              </p>
              <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.05]">
                <span className="text-foreground">{t('why.title')}.</span>
                <br />
                <span className="gradient-text">{t('why.fast.title')}.</span>
                <br />
                <span className="gradient-text">{t('why.clean.title')}.</span>
                <br />
                <span className="gradient-text">{t('why.support.title')}.</span>
              </h2>
            </ScrollReveal>

            <div className="lg:col-span-5 space-y-10 lg:pt-24">
              {[
                { title: t('why.fast.title'), desc: t('why.fast.desc') },
                { title: t('why.clean.title'), desc: t('why.clean.desc') },
                { title: t('why.support.title'), desc: t('why.support.desc') },
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="border-l-2 border-primary/40 pl-5">
                    <h3 className="font-heading font-semibold text-xl text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ────── PROCESS — VERTICAL TIMELINE WITH HUGE NUMBERS ────── */}
      <section className="section-padding section-spacing">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <p className="text-primary-light text-sm font-medium uppercase tracking-widest mb-3">
              {t('process.label')}
            </p>
            <h2 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-20">
              <span className="text-foreground">{t('process.title')}</span>
            </h2>
          </ScrollReveal>

          <div className="space-y-2">
            {steps.map((item, i) => (
              <ScrollReveal key={item.id} delay={i * 0.08}>
                <div className="grid grid-cols-12 gap-6 items-baseline py-8 border-t border-white/10 group hover:border-white/20 transition-colors">
                  <div className="col-span-12 md:col-span-2">
                    <span className="font-heading font-bold text-7xl md:text-8xl text-outline leading-none">
                      {String(item.step_number).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="col-span-12 md:col-span-4">
                    <h3 className="font-heading font-semibold text-2xl md:text-3xl text-foreground leading-tight">
                      {language === 'en' ? item.title_en : item.title_ro}
                    </h3>
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                      {language === 'en' ? item.description_en : item.description_ro}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ────── TESTIMONIAL — FEATURED ROTATING ────── */}
      <section className="section-padding section-spacing border-t border-white/5">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <p className="text-primary-light text-sm font-medium uppercase tracking-widest mb-12 text-center">
              {t('testimonials.label')}
            </p>
          </ScrollReveal>

          <div className="relative min-h-[300px] md:min-h-[260px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {testimonials.map((item, i) => (
                i === activeT && (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -24 }}
                    transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="text-center max-w-4xl mx-auto"
                  >
                    <div className="flex justify-center gap-1 mb-8">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-5 h-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <blockquote className="font-heading text-2xl md:text-3xl lg:text-4xl text-foreground leading-snug mb-10 italic">
                      "{language === 'en' ? item.quote_en : item.quote_ro}"
                    </blockquote>
                    <div className="flex items-center justify-center gap-4">
                      <div className={`w-14 h-14 rounded-full bg-white/[0.08] border border-white/10 flex items-center justify-center text-foreground font-heading font-bold text-lg`}>
                        {item.author_initial}
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-foreground">{item.author_name}</div>
                        <div className="text-sm text-muted-foreground">{item.author_role}</div>
                      </div>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveT(i)}
                aria-label={`Testimonial ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === activeT ? 'bg-primary scale-125' : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ────── FINAL CTA — FULL BLEED VIDEO ────── */}
      <section className="relative section-padding py-32 md:py-48 overflow-hidden border-t border-white/10 cta-glow">

        <ScrollReveal className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-8">
            <span className="text-foreground">{t('cta.title')}</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            {t('cta.subtitle')}
          </p>
          <Link to="/contact"
            className="btn-primary font-medium px-10 py-4 rounded-full inline-flex items-center gap-2 text-lg hover:opacity-90 transition-all">
            {t('cta.button')} <ArrowUpRight className="w-5 h-5" />
          </Link>
        </ScrollReveal>
      </section>
    </PageTransition>
  );
};

export default Index;
