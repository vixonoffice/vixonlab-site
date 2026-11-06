import { ArrowUpRight, Mail, MessageCircle } from 'lucide-react';
import { Link } from '@/components/LocalizedLink';
import { usePageSEO } from '@/hooks/usePageSEO';
import { PageTransition } from '@/components/PageTransition';
import { PageHero } from '@/components/PageHero';
import { ScrollReveal } from '@/components/ScrollReveal';
import { WhatWeBuild } from '@/components/en/WhatWeBuild';
import { FixedPrice } from '@/components/en/FixedPrice';
import { PORTFOLIO_PROJECTS } from '@/data/portfolio';
import { LANDING_FROM_EUR, WHATSAPP_NUMBER } from '@/lib/tiers';

const CONTACT_EMAIL = 'vixonoffice@gmail.com';

const STEPS = [
  {
    title: 'Send the design',
    text: 'Share the Figma file and a short brief by email or WhatsApp. If you need it, we sign your NDA first.',
  },
  {
    title: 'Get a fixed quote',
    text: 'Within 24 hours you get one price for the whole project: scope, timeline and what is included. No hourly billing.',
  },
  {
    title: 'We build it',
    text: 'We build under your brand, test on real devices and tune speed. You get a preview link to review while we work.',
  },
  {
    title: 'Hand-over, no trace',
    text: 'You get the code and a deployed site. Our name is nowhere on it. We fix bugs for 30 days after launch.',
  },
];

const WHY = [
  { title: 'EU-based', text: 'A Romanian company, so contracts and data protection follow EU rules.' },
  { title: 'CET+1 timezone', text: 'Our working day overlaps with the UK, Germany and the Netherlands.' },
  { title: 'Fixed price', text: 'One price per project, agreed before we start. Not per hour.' },
  { title: 'NDA', text: 'We sign yours before you share any files.' },
  { title: 'No logo, no credit', text: 'Your brand, your client. We are never named on the site or in the code.' },
  { title: 'Fast by default', text: 'A measured example: the mobile performance score of sizdetailing.ro went from 58 to 90.' },
];

const siz = PORTFOLIO_PROJECTS.find((p) => p.id === 'siz-detailing');

const Agencies = () => {
  usePageSEO({
    title: 'White-label web development for agencies',
    description: `EU-based white-label web studio for agencies. Your Figma design built as a fast, animated site. Fixed price, NDA, no credit. Paid trial: a landing page from ${LANDING_FROM_EUR} EUR.`,
  });

  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('White-label project: design attached')}`;
  const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi! We are an agency and would like to send you a design to build.')}`;

  return (
    <PageTransition>
      <PageHero
        badge="For agencies · White-label"
        title="Your design."
        titleAccent="Our code. Your name."
        subtitle="We turn your Figma designs into fast, animated, production-ready websites under your brand. Fixed price per project, from the EU."
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <a href={mailto}
            className="btn-primary font-medium px-7 py-3.5 rounded-full inline-flex items-center justify-center gap-2">
            <Mail className="w-4 h-4" /> Send us the design
          </a>
          <a href={wa} target="_blank" rel="noopener noreferrer"
            className="border border-white/15 bg-white/5 backdrop-blur-md text-foreground font-medium px-7 py-3.5 rounded-full inline-flex items-center justify-center gap-2 hover:bg-white/10 hover:border-white/30 transition-all">
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
        </div>
      </PageHero>

      {/* PROCESS */}
      <section className="section-padding section-spacing border-t border-white/10">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <p className="text-primary-light text-sm font-medium uppercase tracking-widest mb-3">Process</p>
            <h2 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl leading-[0.95] mb-16">
              <span className="text-foreground">Four steps, </span>
              <span className="gradient-text">no surprises.</span>
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

      {/* WHAT WE BUILD */}
      <section className="section-padding section-spacing border-t border-white/5">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <p className="text-primary-light text-sm font-medium uppercase tracking-widest mb-3">What we build for you</p>
            <h2 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl leading-[0.95] mb-12">
              <span className="text-foreground">The build, </span>
              <span className="gradient-text">not the pitch.</span>
            </h2>
          </ScrollReveal>
          <WhatWeBuild linkAgencies={false} />
        </div>
      </section>

      {/* WHY US */}
      <section className="section-padding section-spacing border-t border-white/5">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <p className="text-primary-light text-sm font-medium uppercase tracking-widest mb-3">Why us</p>
            <h2 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl leading-[0.95] mb-14">
              <span className="text-foreground">A studio you can </span>
              <span className="gradient-text">hand work to.</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {WHY.map((item, i) => (
              <ScrollReveal key={item.title} delay={(i % 3) * 0.08}>
                <div className="border-l-2 border-primary/40 pl-5">
                  <h3 className="font-heading font-semibold text-xl text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* PAID TRIAL + PRICES */}
      <section className="section-padding section-spacing border-t border-white/10">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <p className="text-primary-light text-sm font-medium uppercase tracking-widest mb-3">Paid trial</p>
            <h2 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl leading-[0.95] mb-6">
              <span className="text-foreground">Start small. </span>
              <span className="gradient-text">A landing page from {LANDING_FROM_EUR} EUR.</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mb-12 leading-relaxed">
              Before you trust us with a bigger project, give us one landing page. You see how we communicate, how clean the code is
              and how fast the page is. All prices are fixed per project, never per hour.
            </p>
          </ScrollReveal>
          <FixedPrice />
        </div>
      </section>

      {/* PROOF */}
      {siz && (
        <section className="section-padding section-spacing border-t border-white/5">
          <div className="mx-auto max-w-content grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <ScrollReveal className="lg:col-span-5">
              <p className="text-primary-light text-sm font-medium uppercase tracking-widest mb-3">One measured result</p>
              <p className="font-heading font-bold text-6xl md:text-7xl gradient-text leading-none mb-4">58 → 90</p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Mobile performance score (Lighthouse) of sizdetailing.ro, a video-heavy site we sped up for a real client.
              </p>
              <Link to={`/portfolio/${siz.slug}`} className="inline-flex items-center gap-1.5 text-primary-light hover:text-foreground transition-colors">
                Read the case <ArrowUpRight className="w-4 h-4" />
              </Link>
            </ScrollReveal>
            {siz.image_url && (
              <ScrollReveal className="lg:col-span-7" delay={0.1}>
                <img
                  src={siz.image_url}
                  alt="sizdetailing.ro"
                  width={800}
                  height={500}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto rounded-2xl border border-white/10"
                />
              </ScrollReveal>
            )}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative section-padding py-32 md:py-44 overflow-hidden border-t border-white/10 cta-glow">
        <ScrollReveal className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-8">
            <span className="text-foreground">Send us the design.</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Email the Figma link or message us on WhatsApp. You get a fixed quote within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={mailto}
              className="btn-primary font-medium px-8 py-4 rounded-full inline-flex items-center justify-center gap-2 text-lg hover:opacity-90 transition-all">
              <Mail className="w-5 h-5" /> Email the design
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

export default Agencies;
