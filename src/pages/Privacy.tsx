import { useLanguage } from '@/contexts/LanguageContext';
import { SectionWrapper } from '@/components/SectionWrapper';
import { usePageSEO } from '@/hooks/usePageSEO';
import { PageTransition } from '@/components/PageTransition';

const Privacy = () => {
  const { t, language } = useLanguage();

  const sections = language === 'ro' ? [
    { title: '1. Introducere', text: 'Vixon Lab ("noi", "nostru") respectă confidențialitatea datelor dumneavoastră personale. Această politică descrie modul în care colectăm, utilizăm și protejăm informațiile dumneavoastră.' },
    { title: '2. Date colectate', text: 'Colectăm informații pe care ni le furnizați direct prin formularul de contact: nume, adresă de email, număr de telefon, detalii despre proiect. Nu colectăm date automat și nu folosim cookie-uri de tracking.' },
    { title: '3. Scopul prelucrării', text: 'Datele colectate sunt folosite exclusiv pentru a răspunde solicitărilor dumneavoastră, a oferi estimări de preț și a comunica despre proiecte potențiale.' },
    { title: '4. Stocarea datelor', text: 'Datele dumneavoastră sunt stocate în siguranță și nu sunt partajate cu terți fără consimțământul dumneavoastră explicit.' },
    { title: '5. Drepturile dumneavoastră', text: 'Aveți dreptul de acces, rectificare, ștergere și portabilitate a datelor personale. Pentru orice solicitare, contactați-ne la vixonoffice@gmail.com.' },
    { title: '6. Modificări', text: 'Ne rezervăm dreptul de a modifica această politică. Modificările vor fi publicate pe această pagină cu data actualizării.' },
  ] : [
    { title: '1. Introduction', text: 'Vixon Lab ("we", "our") respects the privacy of your personal data. This policy describes how we collect, use and protect your information.' },
    { title: '2. Data collected', text: 'We collect information you provide directly through the contact form: name, email address, phone number, project details. We do not automatically collect data and do not use tracking cookies.' },
    { title: '3. Purpose of processing', text: 'The collected data is used exclusively to respond to your inquiries, provide price estimates and communicate about potential projects.' },
    { title: '4. Data storage', text: 'Your data is stored securely and is not shared with third parties without your explicit consent.' },
    { title: '5. Your rights', text: 'You have the right to access, rectify, delete and port your personal data. For any request, contact us at vixonoffice@gmail.com.' },
    { title: '6. Changes', text: 'We reserve the right to modify this policy. Changes will be published on this page with the update date.' },
  ];

  usePageSEO({ title: t('privacy.title') });

  return (
    <PageTransition>
    <section className="section-padding pt-32">
      <div className="mx-auto max-w-content">
        <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-12">{t('privacy.title')}</h1>
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

export default Privacy;
