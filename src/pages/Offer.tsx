import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePageSEO } from '@/hooks/usePageSEO';
import { PageTransition } from '@/components/PageTransition';
import { ScrollReveal } from '@/components/ScrollReveal';
import { VideoBackground } from '@/components/VideoBackground';
import {
  Check, MessageCircle, Sparkles, ArrowUpRight, ArrowRight,
  Wallet, Edit3, Code2, ShieldOff,
  MessageSquare, Hammer, CreditCard, MessagesSquare,
} from 'lucide-react';
import {
  TIERS,
  ANNUAL_DISCOUNT_PCT,
  getAnnualPrice,
  buildTierWaUrl,
  WHATSAPP_NUMBER,
} from '@/lib/tiers';

const Offer = () => {
  const { t, language } = useLanguage();
  const isRo = language === 'ro';

  usePageSEO({
    title: isRo
      ? 'Site gratuit + mentenanță lunară · Ofertă Vixon Lab'
      : 'Free site + monthly maintenance · Vixon Lab Offer',
    description: isRo
      ? 'Site profesional 0€ acum, de la 9€/lună. Modificări incluse, hosting, SSL, e-Factura. -20% primul an dacă plătești anual.'
      : 'Professional website 0€ now, from 9€/month. Edits included, hosting, SSL, e-invoice. -20% first year if paid annually.',
  });

  const benefits = [
    { icon: Wallet, title: t('offer.benefit1.title'), desc: t('offer.benefit1.desc'), color: 'text-green-400 bg-green-500/15 border-green-500/30' },
    { icon: Edit3, title: t('offer.benefit2.title'), desc: t('offer.benefit2.desc'), color: 'text-primary-light bg-primary/15 border-primary/30' },
    { icon: Code2, title: t('offer.benefit3.title'), desc: t('offer.benefit3.desc'), color: 'text-amber-400 bg-amber-500/15 border-amber-500/30' },
    { icon: ShieldOff, title: t('offer.benefit4.title'), desc: t('offer.benefit4.desc'), color: 'text-cyan-400 bg-cyan-500/15 border-cyan-500/30' },
  ];

  const steps = [
    { icon: MessageSquare, title: t('offer.how1.title'), desc: t('offer.how1.desc') },
    { icon: Hammer, title: t('offer.how2.title'), desc: t('offer.how2.desc') },
    { icon: CreditCard, title: t('offer.how3.title'), desc: t('offer.how3.desc') },
    { icon: MessagesSquare, title: t('offer.how4.title'), desc: t('offer.how4.desc') },
  ];

  const mainWaMsg = isRo
    ? 'Bună! Am văzut oferta de pe social media (site gratuit + abonament lunar). Vreau să discutăm.'
    : 'Hi! I saw the social media offer (free site + monthly subscription). Let\'s talk.';
  const mainWaUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mainWaMsg)}`;

  return (
    <PageTransition>
      {/* HERO */}
      <section className="relative pt-32 md:pt-44 pb-20 md:pb-32 overflow-hidden">
        <VideoBackground src="/videos/purple-cloud.mp4" opacity={0.35} />
        <div className="absolute inset-0 z-0"
          style={{ background: 'radial-gradient(ellipse at top, rgba(124,58,237,0.15) 0%, rgba(10,4,24,0.0) 50%), linear-gradient(to bottom, rgba(10,4,24,0.0), rgba(10,4,24,0.85))' }} />

        <div className="relative z-10 section-padding">
          <div className="mx-auto max-w-content text-center">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 rounded-full bg-red-500/10 border border-red-500/30 px-5 py-2 mb-8">
                <Sparkles className="w-4 h-4 text-red-300 animate-pulse" />
                <span className="text-sm font-semibold text-red-300">{t('offer.badge')}</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <h1 className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-6">
                <span className="text-foreground">{t('offer.title1')}</span>
                <br />
                <span className="gradient-text italic">{t('offer.title2')}</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                {t('offer.subtitle')}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <a
                  href={mainWaUrl}
                  target="_blank" rel="noopener noreferrer"
                  className="gradient-primary text-white font-semibold px-10 py-4 rounded-full inline-flex items-center gap-3 text-lg hover:opacity-90 hover:scale-105 transition-all shadow-[0_0_40px_-10px_rgba(124,58,237,0.6)]"
                >
                  <MessageCircle className="w-5 h-5" />
                  {t('offer.cta')}
                  <ArrowUpRight className="w-5 h-5" />
                </a>
                <Link
                  to="/pricing"
                  className="border border-white/15 bg-white/5 backdrop-blur-md text-foreground font-medium px-8 py-4 rounded-full inline-flex items-center gap-2 hover:bg-white/10 hover:border-primary/40 transition-all"
                >
                  {t('offer.ctaSecondary')}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 border border-green-500/30 px-5 py-2">
                <Sparkles className="w-4 h-4 text-green-400" />
                <span className="text-sm font-semibold text-green-400">{t('offer.discountBadge')}</span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* TIER STRIP (compact) */}
      <section className="section-padding pb-16 -mt-8">
        <div className="mx-auto max-w-content">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {TIERS.map((tier, i) => {
              const annual = getAnnualPrice(tier.monthlyEur);
              const name = t(`tier.${tier.key}.name` as const);
              return (
                <ScrollReveal key={tier.key} delay={i * 0.05}>
                  <a
                    href={buildTierWaUrl(tier.key, 'annual', language as 'ro' | 'en')}
                    target="_blank" rel="noopener noreferrer"
                    className={`block rounded-2xl border p-5 transition-all hover:scale-[1.02] backdrop-blur-md ${
                      tier.popular
                        ? 'border-primary/50 bg-gradient-to-b from-primary/15 via-white/[0.05] to-white/[0.03] shadow-[0_0_30px_-10px_rgba(124,58,237,0.4)]'
                        : 'border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.03] hover:border-primary/40'
                    }`}
                  >
                    {tier.popular && (
                      <span className="inline-block mb-2 px-2 py-0.5 rounded-full gradient-primary text-white text-[10px] font-bold uppercase tracking-wider">
                        {t('tier.popular')}
                      </span>
                    )}
                    <div className="font-heading font-bold text-lg text-foreground mb-1">{name}</div>
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="font-heading font-bold text-3xl gradient-text leading-none">{tier.monthlyEur}€</span>
                      <span className="text-xs text-muted-foreground">{t('tier.month')}</span>
                    </div>
                    <div className="text-[11px] text-green-400 mb-3">
                      {isRo ? `sau ${annual}€/an (-20%)` : `or ${annual}€/yr (-20%)`}
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      {isRo ? tier.recommendedFor.ro : tier.recommendedFor.en}
                    </div>
                  </a>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY DIFFERENT */}
      <section className="section-padding section-spacing">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-[0.95] text-center mb-16">
              <span className="text-foreground">{t('offer.benefits.title')}</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <ScrollReveal key={i} delay={(i % 2) * 0.08}>
                  <div className="h-full rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.03] backdrop-blur-md p-7 hover:border-primary/40 transition-colors">
                    <div className={`inline-flex w-12 h-12 rounded-2xl border items-center justify-center mb-5 ${b.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading font-bold text-2xl text-foreground mb-3">{b.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{b.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-padding section-spacing border-t border-white/10">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-[0.95] text-center mb-16">
              <span className="text-foreground">{t('offer.howTitle')}</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="h-full rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.03] backdrop-blur-md p-7 text-center">
                    <div className="inline-flex w-14 h-14 rounded-full gradient-primary items-center justify-center mb-5 mx-auto shadow-[0_0_30px_-5px_rgba(124,58,237,0.6)]">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-foreground mb-3">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="section-padding section-spacing border-t border-white/10">
        <div className="mx-auto max-w-content text-center">
          <ScrollReveal>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-3">
              {t('offer.proofTitle')}
            </h2>
            <p className="text-muted-foreground mb-8">{t('offer.proofSubtitle')}</p>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-sm text-foreground border border-white/15 bg-white/5 backdrop-blur-md rounded-full px-6 py-3 hover:bg-primary/10 hover:border-primary/40 transition-all"
            >
              {isRo ? 'Vezi portofoliul' : 'See portfolio'}
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative section-padding py-32 md:py-44 overflow-hidden border-t border-white/10">
        <VideoBackground src="/videos/purple-cloud.mp4" opacity={0.5} />
        <div className="absolute inset-0 z-0"
          style={{ background: 'radial-gradient(ellipse at center, rgba(10,4,24,0.55) 0%, rgba(10,4,24,0.95) 70%)' }} />

        <ScrollReveal className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-8">
            <span className="text-foreground">{t('offer.finalCtaTitle1')} </span>
            <span className="gradient-text italic">{t('offer.finalCtaTitle2')}</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            {t('offer.finalCtaSubtitle')}
          </p>
          <a
            href={mainWaUrl}
            target="_blank" rel="noopener noreferrer"
            className="gradient-primary text-white font-semibold px-10 py-4 rounded-full inline-flex items-center gap-3 text-lg hover:opacity-90 hover:scale-105 transition-all shadow-[0_0_40px_-10px_rgba(124,58,237,0.6)]"
          >
            <MessageCircle className="w-5 h-5" />
            {t('offer.finalCtaButton')}
            <ArrowUpRight className="w-5 h-5" />
          </a>
          <p className="mt-6 text-sm text-muted-foreground">
            {isRo
              ? `Sau sună direct: +40 779 383 164`
              : `Or call directly: +40 779 383 164`}
          </p>
        </ScrollReveal>
      </section>
    </PageTransition>
  );
};

export default Offer;
