import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { Link } from '@/components/LocalizedLink';
import { useLanguage } from '@/contexts/LanguageContext';
import { ScrollReveal } from '@/components/ScrollReveal';
import { PORTFOLIO_PROJECTS } from '@/data/portfolio';

const clients = PORTFOLIO_PROJECTS.filter((p) => p.kind === 'client');

/** Clientii reali (Siz Detailing, American Partyland), in bento asimetric, cu linkuri catre site-urile live. */
export function ClientsSection() {
  const { t, language } = useLanguage();
  const isEn = language === 'en';

  return (
    <section className="section-padding section-spacing border-t border-white/5">
      <div className="mx-auto max-w-content">
        <ScrollReveal>
          <p className="text-primary-light text-sm font-medium uppercase tracking-widest mb-3">{t('clients.label')}</p>
          <h2 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl leading-[0.95] mb-4">
            <span className="text-foreground">{t('clients.title')}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mb-12">{t('clients.subtitle')}</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          {clients.map((client, i) => {
            const big = i === 0;
            return (
              <ScrollReveal key={client.id} delay={i * 0.1} className={big ? 'md:col-span-7' : 'md:col-span-5'}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-card hover:border-white/25 transition-colors spot-card">
                  {client.image_url && (
                    <div className={`relative overflow-hidden ${big ? 'aspect-[16/10]' : 'min-h-[15rem] flex-1'}`}>
                      <img
                        src={client.image_url}
                        alt={client.title}
                        width={800}
                        height={500}
                        loading="lazy"
                        decoding="async"
                        className={`absolute inset-0 h-full w-full object-cover ${big ? 'object-top' : 'object-left-top'} transition-transform duration-700 group-hover:scale-105`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                    </div>
                  )}
                  <div className="relative p-6 md:p-8">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                      {isEn ? client.subtitle_en : client.subtitle_ro}
                    </p>
                    <h3 className="font-heading font-semibold text-2xl md:text-3xl text-foreground mb-3">{client.title}</h3>
                    {client.case_study?.result && (
                      <p className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="font-heading font-bold text-3xl gradient-text">{client.case_study.result.value}</span>
                        <span className="text-sm text-muted-foreground">
                          {isEn ? client.case_study.result.label_en : client.case_study.result.label_ro}
                        </span>
                      </p>
                    )}
                    <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
                      {client.slug && (
                        <Link to={`/portfolio/${client.slug}`} className="inline-flex items-center gap-1.5 text-primary-light hover:text-foreground transition-colors">
                          {t('clients.case')} <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      )}
                      {client.live_url && (
                        <a
                          href={client.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-foreground/80 hover:text-primary-light transition-colors"
                        >
                          {t('clients.visit')} <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
