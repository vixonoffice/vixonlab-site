import { Check } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { CHATBOT_FROM_EUR, LANDING_FROM_EUR, TIERS, formatEur } from '@/lib/tiers';

const presentationFrom = TIERS.find((t) => t.key === 'presentation')!.setupEur;

const CARDS = [
  {
    name: 'Landing page',
    price: LANDING_FROM_EUR,
    text: 'One page built from your finished design. The usual first project with an agency, and a low-risk way to see how we work.',
    points: ['From your Figma file', 'Responsive and fast on mobile', 'Basic SEO and analytics set-up'],
  },
  {
    name: 'Presentation site',
    price: presentationFrom,
    text: 'A one-page site for a business, with design included.',
    points: ['Mobile-first design', 'WhatsApp button and contact form', 'Google Maps and basic SEO'],
  },
  {
    name: 'AI chatbot',
    price: CHATBOT_FROM_EUR,
    text: 'A chatbot trained on your own content and embedded on your site.',
    points: ['Answers from your pages and FAQs', 'Hands over to a human when needed', 'Works on any site'],
  },
];

/** Fixed starting prices for projects outside Romania: per project, never per hour. */
export function FixedPrice() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
      {CARDS.map((card, i) => (
        <ScrollReveal key={card.name} delay={i * 0.08}>
          <div className="h-full flex flex-col rounded-2xl border border-white/15 bg-card p-7 spot-card">
            <h3 className="font-heading font-bold text-xl text-foreground mb-1">{card.name}</h3>
            <p className="text-sm text-muted-foreground mb-5">from</p>
            <p className="font-heading font-bold text-5xl text-foreground leading-none mb-1">{formatEur(card.price, 'en')}</p>
            <p className="text-xs text-muted-foreground mb-5">fixed price, one project</p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">{card.text}</p>
            <ul className="space-y-2.5 mt-auto">
              {card.points.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-light" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
