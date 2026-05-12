import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePageSEO } from '@/hooks/usePageSEO';
import { PageTransition } from '@/components/PageTransition';
import { ScrollReveal } from '@/components/ScrollReveal';
import { PageHero } from '@/components/PageHero';
import { VideoBackground } from '@/components/VideoBackground';
import { Check, MessageCircle, Shield, Settings, Flame, ArrowUpRight } from 'lucide-react';
import { isPromoActive, PROMO_PRICES, PROMO_LABEL_RO, PROMO_LABEL_EN } from '@/lib/promo';

const WHATSAPP_NUMBER = '40779383164';

const Pricing = () => {
  const { t, language } = useLanguage();
  const isRo = language === 'ro';
  const promoActive = isPromoActive();
  const promoLabel = isRo ? PROMO_LABEL_RO : PROMO_LABEL_EN;

  const getDisplayPrice = (key: string, fallback: string) => {
    if (!promoActive) return { old: null as string | null, current: fallback };
    const p = PROMO_PRICES[key];
    if (!p) return { old: null, current: fallback };
    return { old: isRo ? p.oldRo : p.oldEn, current: isRo ? p.newRo : p.newEn };
  };

  usePageSEO({
    title: isRo ? 'Prețuri' : 'Pricing',
    description: isRo
      ? 'Prețuri transparente. Essential 700€, Business 1.200€, Ecosistem de la 2.000€. Fără surprize, fără costuri ascunse.'
      : 'Transparent pricing. Essential 700€, Business 1,200€, Ecosystem from 2,000€. No surprises, no hidden costs.',
  });

  const wa = (msg: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

  const packages = [
    { key: 'landing',   title: t('sp.landing'),   desc: t('sp.landingDesc'),   price: t('sp.landingPrice'),   features: t('sp.landingFeatures').split('|'),   popular: false, colorClass: 'from-slate-500 to-slate-400',
      waMsg: isRo ? 'Bună ziua! Sunt interesat de pachetul Landing Page.' : 'Hello! I am interested in the Landing Page package.' },
    { key: 'essential', title: t('sp.essential'), desc: t('sp.essentialDesc'), price: t('sp.essentialPrice'), features: t('sp.essentialFeatures').split('|'), popular: false, colorClass: 'from-purple-600 to-violet-500',
      waMsg: isRo ? 'Bună ziua! Sunt interesat de pachetul Essential.' : 'Hello! I am interested in the Essential package.' },
    { key: 'business',  title: t('sp.business'),  desc: t('sp.businessDesc'),  price: t('sp.businessPrice'),  features: t('sp.businessFeatures').split('|'),  popular: true,  colorClass: 'from-primary to-accent',
      waMsg: isRo ? 'Bună ziua! Sunt interesat de pachetul Business.' : 'Hello! I am interested in the Business package.' },
    { key: 'ecosystem', title: t('sp.ecosystem'), desc: t('sp.ecosystemDesc'), price: t('sp.ecosystemPrice'), features: t('sp.ecosystemFeatures').split('|'), popular: false, colorClass: 'from-amber-500 to-orange-500',
      waMsg: isRo ? 'Bună ziua! Sunt interesat de pachetul Ecosistem.' : 'Hello! I am interested in the Ecosystem package.' },
  ];

  const maintenanceFeatures = t('sp.maintenanceFeatures').split('|');

  const faqs = isRo
    ? [
        { q: 'Cât durează realizarea unui site?', a: 'Pachetul Essential se livrează în 3-7 zile. Business și Ecosistem în 2-3 săptămâni, în funcție de complexitate.' },
        { q: 'Prețurile includ TVA?', a: 'Da. Prețurile afișate sunt finale — fără costuri ascunse sau surprize la final.' },
        { q: 'Ce se întâmplă după lansare?', a: 'Cu Vixon Care ne ocupăm de tot. Fără el, primești documentație completă și poți reveni oricând.' },
        { q: 'Pot face upgrade la un pachet mai mare?', a: 'Da, oricând. Diferența de preț se calculează și ajustăm oferta în funcție de ce ai deja.' },
        { q: 'Oferiți garanție?', a: '30 de zile de bug fixing gratuit după lansare, indiferent de pachet.' },
        { q: 'Lucrați cu clienți din alte orașe?', a: 'Da, 100% remote. Clienții noștri sunt din toată România și din diaspora.' },
      ]
    : [
        { q: 'How long does it take?', a: 'Essential is delivered in 3-7 days. Business and Ecosystem in 2-3 weeks, depending on complexity.' },
        { q: 'Do prices include VAT?', a: 'Yes. Displayed prices are final — no hidden costs or surprises.' },
        { q: 'What happens after launch?', a: 'With Vixon Care we handle everything. Without it, you get full documentation and can return anytime.' },
        { q: 'Can I upgrade my package?', a: 'Yes, anytime. The price difference is calculated and we adjust the offer based on what you already have.' },
        { q: 'Do you offer a guarantee?', a: '30 days of free bug fixing after launch, regardless of package.' },
        { q: 'Do you work with clients from other cities?', a: 'Yes, 100% remote. Our clients are from all over Romania and the diaspora.' },
      ];

  return (
    <PageTransition>
      <PageHero
        badge={isRo ? 'Prețuri transparente' : 'Transparent pricing'}
        title={isRo ? 'Investiție clară,' : 'Clear investment,'}
        titleAccent={isRo ? 'rezultate reale' : 'real results'}
        subtitle={isRo
          ? 'Știi de la prima discuție cât costă și ce primești. Fără costuri ascunse, fără surprize.'
          : 'You know from the first conversation how much it costs and what you get. No hidden costs, no surprises.'}
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm text-muted-foreground">
            {isRo ? 'Prețuri în EUR · TVA inclus' : 'Prices in EUR · VAT included'}
          </span>
          {promoActive && (
            <div className="inline-flex items-center gap-2 rounded-full bg-red-500/10 border border-red-500/30 px-5 py-2">
              <Flame className="w-4 h-4 text-red-400 animate-pulse" />
              <span className="text-sm font-semibold text-red-300">
                {promoLabel} · {isRo ? 'până pe 26 aprilie' : 'until April 26'}
              </span>
            </div>
          )}
        </div>
      </PageHero>

      {/* Packages */}
      <section className="section-padding pb-16">
        <div className="mx-auto max-w-content">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
            {packages.map((pkg, i) => (
              <ScrollReveal key={pkg.key} delay={i * 0.08}>
                <div className={`relative h-full flex flex-col rounded-3xl border backdrop-blur-sm p-7 overflow-hidden transition-all duration-500 ${
                  pkg.popular
                    ? 'border-primary/50 bg-gradient-to-b from-primary/10 to-white/[0.02] shadow-[0_0_60px_-15px_rgba(124,58,237,0.4)]'
                    : 'border-white/10 bg-white/[0.02] hover:border-primary/30'
                }`}>
                  {pkg.popular && (
                    <>
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap z-10">
                        <span className="gradient-primary text-white text-xs font-bold px-4 py-1.5 rounded-full">
                          {t('sp.popular')}
                        </span>
                      </div>
                      <div className="absolute -top-24 -right-24 w-56 h-56 rounded-full blur-3xl opacity-30 bg-gradient-to-br from-primary to-accent" />
                    </>
                  )}

                  <div className="relative flex flex-col h-full">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${pkg.colorClass} mb-5`} />
                    <h3 className="font-heading font-bold text-2xl text-foreground mb-2">{pkg.title}</h3>
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{pkg.desc}</p>

                    <div className="mb-7">
                      {(() => {
                        const dp = getDisplayPrice(pkg.key, pkg.price);
                        return (
                          <div className="flex flex-col gap-0.5">
                            {dp.old && (
                              <span className="text-sm text-muted-foreground line-through decoration-red-500/70">{dp.old}</span>
                            )}
                            <div className="flex items-baseline gap-2 flex-wrap">
                              <span className="font-heading font-bold text-4xl gradient-text leading-none">{dp.current}</span>
                              {dp.old && (
                                <span className="text-[10px] font-bold uppercase tracking-wider bg-red-500/15 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full">
                                  -30%
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    <ul className="space-y-3 mb-7 flex-1">
                      {pkg.features.map((feature, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-primary-light shrink-0 mt-0.5" />
                          <span className="text-sm text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href={wa(pkg.waMsg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-2 font-medium px-6 py-3.5 rounded-full transition-all hover:scale-105 text-center ${
                        pkg.popular
                          ? 'gradient-primary text-white hover:opacity-90'
                          : 'border border-white/15 bg-white/5 text-foreground hover:bg-white/10'
                      }`}
                    >
                      <MessageCircle className="w-4 h-4" />
                      {isRo ? 'Vreau acest pachet' : 'I want this package'}
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="mt-12 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                {isRo ? 'Vrei să personalizezi pachetul cu funcționalități extra?' : 'Want to customize the package with extra features?'}
              </p>
              <Link to="/services"
                className="inline-flex items-center gap-2 text-base text-foreground border border-white/15 bg-white/5 backdrop-blur-md rounded-full px-7 py-3 hover:bg-primary/10 hover:border-primary/40 transition-all">
                <Settings className="w-4 h-4" />
                {isRo ? 'Configurează-ți pachetul pas cu pas' : 'Configure your package step by step'}
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Vixon Care — split */}
      <section className="section-padding section-spacing border-t border-white/10">
        <div className="mx-auto max-w-content">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <ScrollReveal className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 border border-green-500/30 px-4 py-1.5 mb-6">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400 font-medium">{t('sp.maintenance')}</span>
              </div>
              <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-6">
                <span className="text-foreground">
                  {isRo ? 'Site-ul tău în ' : 'Your site in '}
                </span>
                <span className="gradient-text italic">
                  {isRo ? 'mâini bune' : 'good hands'}
                </span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl">
                {isRo
                  ? 'Hosting, securitate, backup, update-uri și suport — ne ocupăm noi. Tu te concentrezi pe afacere.'
                  : 'Hosting, security, backup, updates and support — we handle it. You focus on your business.'}
              </p>

              <div className="mb-3">
                {(() => {
                  const dp = getDisplayPrice('maintenance', t('sp.maintenancePrice'));
                  return (
                    <div className="flex flex-col gap-1">
                      {dp.old && (
                        <span className="text-sm text-muted-foreground line-through decoration-red-500/70">{dp.old}</span>
                      )}
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <span className="font-heading font-bold text-5xl md:text-6xl gradient-text leading-none">{dp.current}</span>
                        {dp.old && (
                          <span className="text-xs font-bold uppercase tracking-wider bg-red-500/15 text-red-400 border border-red-500/30 px-2 py-1 rounded-full">
                            -25%
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>
              <p className="text-sm text-green-400 mb-8">
                {isRo ? '✓ Plătești anual — economisești 2 luni' : '✓ Pay annually — save 2 months'}
              </p>
              <a
                href={wa(isRo ? 'Bună ziua! Sunt interesat de planul Vixon Care.' : 'Hello! I am interested in the Vixon Care plan.')}
                target="_blank" rel="noopener noreferrer"
                className="gradient-primary text-white font-medium px-8 py-3.5 rounded-full inline-flex items-center gap-2 hover:opacity-90 hover:scale-105 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                {isRo ? 'Adaugă mentenanță' : 'Add maintenance'}
              </a>
            </ScrollReveal>

            <ScrollReveal className="lg:col-span-5 lg:pt-12" delay={0.1}>
              <div className="relative overflow-hidden rounded-3xl border border-green-400/20 bg-green-400/[0.03] backdrop-blur-sm p-8">
                <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full blur-3xl opacity-30 bg-green-400" />
                <div className="relative">
                  <ul className="space-y-4">
                    {maintenanceFeatures.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                          <Check className="w-4 h-4 text-green-400" />
                        </div>
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding section-spacing">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <p className="text-primary-light text-sm font-medium uppercase tracking-widest mb-6">FAQ</p>
            <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-[0.95] mb-16">
              <span className="text-foreground">
                {isRo ? 'Întrebări frecvente' : 'Frequently asked questions'}
              </span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {faqs.map((item, i) => (
              <ScrollReveal key={i} delay={(i % 4) * 0.06}>
                <div className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-7 h-full hover:border-primary/30 transition-colors">
                  <h3 className="font-heading font-bold text-xl text-foreground mb-3">{item.q}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.a}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA full bleed */}
      <section className="relative section-padding py-32 md:py-44 overflow-hidden border-t border-white/10">
        <VideoBackground src="/videos/purple-cloud.mp4" opacity={0.5} />
        <div className="absolute inset-0 z-0"
          style={{ background: 'radial-gradient(ellipse at center, rgba(10,4,24,0.55) 0%, rgba(10,4,24,0.95) 70%)' }} />

        <ScrollReveal className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-8">
            <span className="text-foreground">
              {isRo ? 'Nu știi ce pachet ' : "Don't know which package "}
            </span>
            <span className="gradient-text italic">
              {isRo ? 'ți se potrivește?' : 'fits you?'}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            {isRo
              ? 'Scrie-ne pe WhatsApp și în 15 minute stabilim exact ce ai nevoie. Consultație gratuită, fără obligații.'
              : 'Message us on WhatsApp and in 15 minutes we figure out exactly what you need. Free consultation, no obligations.'}
          </p>
          <a
            href={wa(isRo ? 'Bună ziua! Aș vrea o consultație gratuită despre un proiect web.' : 'Hello! I would like a free consultation about a web project.')}
            target="_blank" rel="noopener noreferrer"
            className="gradient-primary text-white font-medium px-10 py-4 rounded-full inline-flex items-center gap-3 text-lg hover:opacity-90 hover:scale-105 transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            {isRo ? 'Consultație gratuită pe WhatsApp' : 'Free consultation on WhatsApp'}
          </a>
        </ScrollReveal>
      </section>
    </PageTransition>
  );
};

export default Pricing;
