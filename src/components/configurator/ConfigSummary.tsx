import { useLanguage } from '@/contexts/LanguageContext';
import { MessageCircle, ChevronRight } from 'lucide-react';
import type { SummaryLine } from './useConfigurator';

interface Props {
  summaryLines: SummaryLine[];
  totalPrice: number;
  monthlyPrice: number;
  whatsappUrl: string;
  hasSelection: boolean;
}

export function ConfigSummary({ summaryLines, totalPrice, monthlyPrice, whatsappUrl, hasSelection }: Props) {
  const { t, language } = useLanguage();

  if (!hasSelection) return null;

  return (
    <div className="glass-card p-6 md:p-8">
      <h3 className="font-heading font-bold text-xl text-foreground mb-5">
        {t('cfg.summaryTitle')}
      </h3>

      <div className="space-y-3 mb-5">
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
      </div>

      <div className="border-t border-white/10 pt-4 mb-6">
        <div className="flex items-center justify-between">
          <span className="font-heading font-bold text-foreground">
            {language === 'ro' ? 'Total unic' : 'One-time total'}
          </span>
          <span className="font-heading font-bold text-2xl gradient-text">{totalPrice}€</span>
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

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold py-4 rounded-2xl text-lg transition-all hover:scale-[1.02]"
      >
        <MessageCircle className="w-5 h-5" />
        {t('sp.sendWhatsapp')}
        <ChevronRight className="w-5 h-5" />
      </a>
    </div>
  );
}
