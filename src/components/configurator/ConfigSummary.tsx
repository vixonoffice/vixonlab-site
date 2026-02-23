import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { MessageCircle, ChevronRight, ChevronUp, X } from 'lucide-react';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import type { SummaryLine } from './useConfigurator';

interface Props {
  summaryLines: SummaryLine[];
  totalPrice: number;
  monthlyPrice: number;
  whatsappUrl: string;
  hasSelection: boolean;
}

function SummaryContent({ summaryLines, totalPrice, monthlyPrice, language }: {
  summaryLines: SummaryLine[];
  totalPrice: number;
  monthlyPrice: number;
  language: string;
}) {
  return (
    <div className="space-y-3">
      {summaryLines.map((line, i) => (
        <div key={i} className="flex items-center justify-between">
          <span className="text-sm text-foreground">{line.label}</span>
          <span className={`text-sm font-semibold ${
            line.price === 'Inclus' || line.price === 'Included'
              ? 'text-green-400'
              : 'text-foreground'
          }`}>
            {line.price}
          </span>
        </div>
      ))}
      {summaryLines.length > 0 && (
        <>
          <div className="border-t border-white/10 pt-3">
            <div className="flex items-center justify-between">
              <span className="font-heading font-bold text-foreground">
                {language === 'ro' ? 'Total unic' : 'One-time total'}
              </span>
              <span className="font-heading font-bold text-xl gradient-text">{totalPrice}€</span>
            </div>
            {monthlyPrice > 0 && (
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm text-muted-foreground">
                  {language === 'ro' ? '+ lunar' : '+ monthly'}
                </span>
                <span className="text-sm font-semibold text-primary-light">
                  {monthlyPrice}€/{language === 'ro' ? 'lună' : 'mo'}
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export function ConfigSummary({ summaryLines, totalPrice, monthlyPrice, whatsappUrl, hasSelection }: Props) {
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const whatsappButton = hasSelection ? (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold py-3.5 rounded-2xl text-base transition-all hover:scale-[1.02]"
    >
      <MessageCircle className="w-5 h-5" />
      {t('sp.sendWhatsapp')}
      <ChevronRight className="w-5 h-5" />
    </a>
  ) : (
    <div className="w-full inline-flex items-center justify-center gap-3 bg-white/10 text-muted-foreground font-medium py-3.5 rounded-2xl text-base cursor-not-allowed">
      <MessageCircle className="w-5 h-5" />
      {t('sp.noSelection')}
    </div>
  );

  // Desktop: sticky sidebar
  if (!isMobile) {
    return (
      <div className="sticky top-28">
        <div className="glass-card p-6">
          <h3 className="font-heading font-bold text-lg text-foreground mb-4">
            {t('cfg.summaryTitle')}
          </h3>

          {hasSelection ? (
            <>
              <SummaryContent
                summaryLines={summaryLines}
                totalPrice={totalPrice}
                monthlyPrice={monthlyPrice}
                language={language}
              />
              <div className="mt-5">{whatsappButton}</div>
            </>
          ) : (
            <div className="py-6 text-center">
              <p className="text-sm text-muted-foreground">{t('cfg.summaryEmpty')}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Mobile: fixed bottom bar + drawer
  return (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-t border-white/10 px-4 py-3 safe-area-bottom">
        <div className="flex items-center gap-3">
          {hasSelection ? (
            <>
              <DrawerTrigger asChild>
                <button className="flex items-center gap-2 min-w-0 flex-1">
                  <div className="text-left min-w-0">
                    <p className="font-heading font-bold text-lg gradient-text">{totalPrice}€</p>
                    {monthlyPrice > 0 && (
                      <p className="text-xs text-muted-foreground">
                        + {monthlyPrice}€/{language === 'ro' ? 'lună' : 'mo'}
                      </p>
                    )}
                  </div>
                  <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
                </button>
              </DrawerTrigger>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold px-5 py-3 rounded-2xl text-sm transition-all shrink-0"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </>
          ) : (
            <div className="flex-1 text-center">
              <p className="text-sm text-muted-foreground">{t('sp.noSelection')}</p>
            </div>
          )}
        </div>
      </div>

      <DrawerContent className="bg-background border-white/10">
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-bold text-lg text-foreground">{t('cfg.summaryTitle')}</h3>
            <button onClick={() => setDrawerOpen(false)} className="text-muted-foreground">
              <X className="w-5 h-5" />
            </button>
          </div>
          <SummaryContent
            summaryLines={summaryLines}
            totalPrice={totalPrice}
            monthlyPrice={monthlyPrice}
            language={language}
          />
          <div className="mt-5">{whatsappButton}</div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
