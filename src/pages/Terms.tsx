import { useLanguage } from '@/contexts/LanguageContext';
import { usePageSEO } from '@/hooks/usePageSEO';
import { PageTransition } from '@/components/PageTransition';

const Terms = () => {
  const { t, language } = useLanguage();

  const sections = language === 'ro' ? [
    { title: '1. Generalități', text: 'Acești termeni și condiții guvernează utilizarea site-ului web vixonlab.com și serviciile oferite de Vixon Lab. Prin accesarea site-ului, acceptați acești termeni.' },
    { title: '2. Servicii', text: 'Vixon Lab oferă servicii de web development, design, branding și marketing digital. Detaliile specifice ale fiecărui proiect sunt stabilite prin contract individual.' },
    { title: '3. Prețuri și plăți', text: 'Prețurile afișate pe site sunt orientative. Prețul final este stabilit după analiza cerințelor proiectului. Plata se face conform termenilor agreați în contractul individual.' },
    { title: '4. Proprietate intelectuală', text: 'După finalizarea plății integrale, clientul primește drepturile de utilizare asupra materialelor livrate. Codul sursă și designul devin proprietatea clientului.' },
    { title: '5. Garanție și suport', text: 'Oferim garanție și suport post-lansare conform pachetului ales. Perioada de suport variază între 1 și 6 luni, în funcție de pachet.' },
    { title: '6. Limitarea responsabilității', text: 'Vixon Lab nu este responsabil pentru pierderile indirecte rezultate din utilizarea serviciilor noastre. Responsabilitatea noastră maximă este limitată la valoarea contractului.' },
    { title: '7. Modificări', text: 'Ne rezervăm dreptul de a modifica acești termeni. Utilizarea continuă a site-ului constituie acceptarea termenilor modificați.' },
  ] : [
    { title: '1. General', text: 'These terms and conditions govern the use of the vixonlab.com website and services offered by Vixon Lab. By accessing the site, you accept these terms.' },
    { title: '2. Services', text: 'Vixon Lab offers web development, design, branding and digital marketing services. The specific details of each project are established through an individual contract.' },
    { title: '3. Prices and payments', text: 'Prices displayed on the site are indicative. The final price is set after analyzing the project requirements. Payment is made according to the terms agreed in the individual contract.' },
    { title: '4. Intellectual property', text: 'After full payment, the client receives usage rights for the delivered materials. The source code and design become the property of the client.' },
    { title: '5. Warranty and support', text: 'We offer post-launch warranty and support according to the chosen package. The support period varies between 1 and 6 months, depending on the package.' },
    { title: '6. Limitation of liability', text: 'Vixon Lab is not responsible for indirect losses resulting from the use of our services. Our maximum liability is limited to the contract value.' },
    { title: '7. Changes', text: 'We reserve the right to modify these terms. Continued use of the site constitutes acceptance of the modified terms.' },
  ];

  usePageSEO({ title: t('terms.title') });

  return (
    <PageTransition>
    <section className="section-padding pt-32">
      <div className="mx-auto max-w-content">
        <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-12">{t('terms.title')}</h1>
        <div className="space-y-8 max-w-3xl">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="font-heading font-semibold text-xl text-foreground mb-3">{s.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="h-24" />
    </section>
    </PageTransition>
  );
};

export default Terms;
