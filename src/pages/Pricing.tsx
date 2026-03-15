import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePageSEO } from '@/hooks/usePageSEO';
import { PageTransition } from '@/components/PageTransition';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SectionWrapper } from '@/components/SectionWrapper';
import { Check, MessageCircle, Shield, Zap, Settings } from 'lucide-react';

const WHATSAPP_NUMBER = '40779383164';

const Pricing = () => {
  const { t, language } = useLanguage();
  const isRo = language === 'ro';

  usePageSEO({
    title: isRo ? 'Prețuri' : 'Pricing',
    description: isRo
      ? 'Prețuri transparente. Essential 700€, Business 1.200€, Ecosistem de la 2.000€. Fără surprize, fără costuri ascunse.'
      : 'Transparent pricing. Essential 700€, Business 1,200€, Ecosystem from 2,000€. No surprises, no hidden costs.',
  });

  const wa = (msg: string) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

  const packages = [
    {
      key: 'landing',
      title: t('sp.landing'),
      desc: t('sp.landingDesc'),
      price: t('sp.landingPrice'),
      features: t('sp.landingFeatures').split('|'),
      popular: false,
      colorClass: 'from-slate-500 to-slate-400',
      waMsg: isRo ? 'Bună ziua! Sunt interesat de pachetul Landing Page.' : 'Hello! I am interested in the Landing Page package.',
    },
    {
      key: 'essential',
      title: t('sp.essential'),
      desc: t('sp.essentialDesc'),
      price: t('sp.essentialPrice'),
      features: t('sp.essentialFeatures').split('|'),
      popular: false,
      colorClass: 'from-purple-600 to-violet-500',
      waMsg: isRo ? 'Bună ziua! Sunt interesat de pachetul Essential.' : 'Hello! I am interested in the Essential package.',
    },
    {
      key: 'business',
      title: t('sp.business'),
      desc: t('sp.businessDesc'),
      price: t('sp.businessPrice'),
      features: t('sp.businessFeatures').split('|'),
      popular: true,
      colorClass: 'from-primary to-accent',
      waMsg: isRo ? 'Bună ziua! Sunt interesat de pachetul Business.' : 'Hello! I am interested in the Business package.',
    },
    {
      key: 'ecosystem',
      title: t('sp.ecosystem'),
      desc: t('sp.ecosystemDesc'),
      price: t('sp.ecosystemPrice'),
      features: t('sp.ecosystemFeatures').split('|'),
      popular: false,
      colorClass: 'from-amber-500 to-orange-500',
      waMsg: isRo ? 'Bună ziua! Sunt interesat de pachetul Ecosistem.' : 'Hello! I am interested in the Ecosystem package.',
    },
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
      {/* Hero */}
      <section className="section-padding pt-32 pb-16 text-center">
        <div className="mx-auto max-w-content">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 mb-6">
            <span className="dot-green" />
            <span className="text-sm text-primary-light">
              {isRo ? 'Prețuri transparente' : 'Transparent pricing'}
            </span>
          </div>
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            {isRo ? 'Investiție clară,' : 'Clear investment,'}{' '}
            <span className="gradient-text">{isRo ? 'rezultate reale' : 'real results'}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-3">
            {isRo
              ? 'Știi de la prima discuție cât costă și ce primești. Fără costuri ascunse, fără surprize.'
              : 'You know from the first conversation how much it costs and what you get. No hidden costs, no surprises.'}
          </p>
          <p className="text-sm text-muted-foreground">
            {isRo ? 'Prețuri în EUR · TVA inclus' : 'Prices in EUR · VAT included'}
          </p>
        </div>
      </section>

      {/* Packages */}
      <SectionWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {packages.map((pkg) => (
            <ScrollReveal key={pkg.key}>
              <div className={`glass-card p-8 h-full flex flex-col relative ${pkg.popular ? 'border border-primary/50' : ''}`}>
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="gradient-primary text-white text-xs font-bold px-4 py-1.5 rounded-full">
                      {t('sp.popular')}
                    </span>
                  </div>
                )}

                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${pkg.colorClass} mb-5`} />
                <h3 className="font-heading font-bold text-xl text-foreground mb-2">{pkg.title}</h3>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{pkg.desc}</p>

                <div className="mb-6">
                  <span className="font-heading font-bold text-3xl gradient-text">{pkg.price}</span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-primary-light shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={wa(pkg.waMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 font-medium px-6 py-3 rounded-2xl transition-opacity text-center ${
                    pkg.popular
                      ? 'gradient-primary text-white hover:opacity-90'
                      : 'border border-white/10 text-foreground hover:bg-white/5'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  {isRo ? 'Vreau acest pachet' : 'I want this package'}
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Configurator CTA */}
        <ScrollReveal>
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-3">
              {isRo ? 'Vrei să personalizezi pachetul cu funcționalități extra?' : 'Want to customize the package with extra features?'}
            </p>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm text-primary-light border border-primary/30 rounded-2xl px-5 py-2.5 hover:bg-primary/5 transition-colors"
            >
              <Settings className="w-4 h-4" />
              {isRo ? 'Configurează-ți pachetul pas cu pas →' : 'Configure your package step by step →'}
            </Link>
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* Vixon Care */}
      <section className="section-padding section-spacing bg-background-alt">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <div className="glass-card p-8 md:p-12 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 border border-green-500/20 px-4 py-1.5 mb-4">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-green-400 font-medium">{t('sp.maintenance')}</span>
                  </div>
                  <h2 className="font-heading font-bold text-3xl text-foreground mb-3">
                    {isRo ? 'Site-ul tău în mâini bune, în fiecare lună' : 'Your site in good hands, every month'}
                  </h2>
                  <p className="text-muted-foreground mb-5 leading-relaxed">
                    {isRo
                      ? 'Hosting, securitate, backup, update-uri și suport — ne ocupăm noi. Tu te concentrezi pe afacere.'
                      : 'Hosting, security, backup, updates and support — we handle it. You focus on your business.'}
                  </p>
                  <div className="mb-2">
                    <span className="font-heading font-bold text-4xl gradient-text">{t('sp.maintenancePrice')}</span>
                  </div>
                  <p className="text-xs text-green-400 mb-5">
                    {isRo ? '✓ Plătești anual — economisești 2 luni' : '✓ Pay annually — save 2 months'}
                  </p>
                  <a
                    href={wa(isRo ? 'Bună ziua! Sunt interesat de planul Vixon Care.' : 'Hello! I am interested in the Vixon Care plan.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gradient-primary text-white font-medium px-8 py-3.5 rounded-2xl inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {isRo ? 'Adaugă mentenanță' : 'Add maintenance'}
                  </a>
                </div>
                <ul className="space-y-3.5">
                  {maintenanceFeatures.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-green-400" />
                      </div>
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <SectionWrapper>
        <ScrollReveal>
          <p className="text-primary-light text-sm font-medium uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-10">
            {isRo ? 'Întrebări frecvente' : 'Frequently asked questions'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl">
            {faqs.map((item, i) => (
              <div key={i} className="glass-card p-6">
                <h3 className="font-heading font-semibold text-foreground mb-2">{item.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* Final CTA */}
      <section className="section-padding section-spacing bg-background-alt">
        <div className="mx-auto max-w-content">
          <ScrollReveal>
            <div className="glass-card p-10 md:p-16 text-center max-w-3xl mx-auto">
              <Zap className="w-10 h-10 text-primary-light mx-auto mb-4" />
              <h2 className="font-heading font-bold text-3xl md:text-4xl gradient-text mb-4">
                {isRo ? 'Nu ești sigur ce pachet ți se potrivește?' : "Not sure which package fits?"}
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                {isRo
                  ? 'Scrie-ne pe WhatsApp și în 15 minute stabilim exact ce ai nevoie. Consultație gratuită, fără obligații.'
                  : 'Message us on WhatsApp and in 15 minutes we figure out exactly what you need. Free consultation, no obligations.'}
              </p>
              <a
                href={wa(isRo ? 'Bună ziua! Aș vrea o consultație gratuită despre un proiect web.' : 'Hello! I would like a free consultation about a web project.')}
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-primary text-white font-medium px-8 py-3.5 rounded-2xl inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                <MessageCircle className="w-4 h-4" />
                {isRo ? 'Consultație gratuită pe WhatsApp' : 'Free consultation on WhatsApp'}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  );
};

export default Pricing;
