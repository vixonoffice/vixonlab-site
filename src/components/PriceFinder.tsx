import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TIERS, buildTierWaUrl, formatEur, type Tier } from '@/lib/tiers';

type Kind = 'one' | 'multi' | 'wow';

const KINDS: { id: Kind; ro: string; en: string; hintRo: string; hintEn: string }[] = [
  { id: 'one', ro: 'O pagină de prezentare', en: 'A one-page site', hintRo: 'Contact, hartă, WhatsApp', hintEn: 'Contact, map, WhatsApp' },
  { id: 'multi', ro: 'Site complet', en: 'A full website', hintRo: 'Mai multe pagini, SEO local', hintEn: 'Several pages, local SEO' },
  { id: 'wow', ro: 'Ceva care să impresioneze', en: 'Something that wows', hintRo: 'Design custom, animații', hintEn: 'Custom design, animation' },
];

function pickTier(kind: Kind, needsApp: boolean): Tier {
  const key: Tier['key'] = needsApp ? 'custom' : kind === 'one' ? 'presentation' : kind === 'multi' ? 'business' : 'experience';
  return TIERS.find((t) => t.key === key)!;
}

/** Two-question package picker with a live result and a WhatsApp hand-off. */
export function PriceFinder({ showAllLink = true }: { showAllLink?: boolean }) {
  const { t, language } = useLanguage();
  const isRo = language === 'ro';
  const [kind, setKind] = useState<Kind>('multi');
  const [needsApp, setNeedsApp] = useState(false);

  const tier = pickTier(kind, needsApp);
  const features = t(`tier.${tier.key}.features` as const).split('|').slice(0, 4);
  const from = tier.startingFrom ? `${t('tier.from')} ` : '';

  const chip = (active: boolean) =>
    `w-full text-left rounded-xl border px-4 py-3.5 transition-all ${
      active
        ? 'border-primary-light/60 bg-primary/20 shadow-[0_0_0_1px_rgba(196,181,253,0.25)]'
        : 'border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]'
    }`;

  return (
    <div className="glass-card overflow-hidden p-0">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Questions */}
        <div className="p-6 md:p-10">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary-light">
            {isRo ? '1 · Ce fel de site vrei?' : '1 · What kind of site?'}
          </p>
          <div className="mb-8 grid gap-2.5">
            {KINDS.map((k) => (
              <button key={k.id} type="button" onClick={() => setKind(k.id)} className={chip(kind === k.id)} aria-pressed={kind === k.id}>
                <span className="block font-medium text-foreground">{isRo ? k.ro : k.en}</span>
                <span className="block text-sm text-muted-foreground">{isRo ? k.hintRo : k.hintEn}</span>
              </button>
            ))}
          </div>

          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary-light">
            {isRo ? '2 · Ai nevoie de rezervări online sau panou de administrare?' : '2 · Need online bookings or an admin panel?'}
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            {[false, true].map((v) => (
              <button key={String(v)} type="button" onClick={() => setNeedsApp(v)} className={chip(needsApp === v)} aria-pressed={needsApp === v}>
                <span className="block text-center font-medium text-foreground">{v ? (isRo ? 'Da' : 'Yes') : (isRo ? 'Nu' : 'No')}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Result */}
        <div className="relative border-t border-white/10 bg-gradient-to-br from-primary/25 via-[#1a1535] to-accent/10 p-6 md:p-10 lg:border-l lg:border-t-0">
          <p className="mb-2 text-sm text-muted-foreground">{isRo ? 'Pachetul potrivit pentru tine' : 'Your best fit'}</p>
          <AnimatePresence mode="wait">
            <motion.div
              key={tier.key}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="mb-5 font-heading text-3xl font-bold text-foreground md:text-4xl">{t(`tier.${tier.key}.name` as const)}</h3>

              <div className="mb-1 flex flex-wrap items-baseline gap-x-2">
                {tier.startingFrom && <span className="text-sm text-muted-foreground">{t('tier.from')}</span>}
                <span className="font-heading text-5xl font-bold leading-none text-foreground md:text-6xl">{formatEur(tier.setupEur)}</span>
                <span className="text-sm text-muted-foreground">{t('tier.setupFree')}</span>
              </div>
              <p className="mb-6 text-foreground/90">
                {t('tier.plusMaintenance')} <span className="font-semibold">{from}{tier.monthlyEur}€{t('tier.month')}</span>
              </p>

              <ul className="mb-8 space-y-2.5">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-light" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={buildTierWaUrl(tier.key, 'monthly', language as 'ro' | 'en')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-medium"
            >
              <MessageCircle className="h-4 w-4" />
              {t('tier.cta')}
            </a>
            {showAllLink && (
              <Link to="/pricing" className="inline-flex items-center justify-center gap-1.5 px-2 py-2 text-sm text-primary-light hover:text-foreground">
                {isRo ? 'Vezi toate pachetele' : 'See all packages'} <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
