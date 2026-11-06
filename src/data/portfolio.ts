// Portofoliul site-ului. Doua feluri de proiecte:
//  - kind 'client': site livrat unui client real (DOAR Siz Detailing si American Partyland)
//  - kind 'demo': concept facut de noi, afisat cu eticheta "Concept / demo"
// Nu adauga aici cifre, rezultate sau citate care nu sunt reale. Fara cifra reala, nu punem cifra.
import type { PortfolioProjectRow } from './types';

export const PORTFOLIO_PROJECTS: PortfolioProjectRow[] = [
  {
    id: 'siz-detailing',
    sort_order: 1,
    kind: 'client',
    title: 'Siz Detailing',
    subtitle_ro: 'Detailing auto, Râmnicu Vâlcea',
    subtitle_en: 'Car detailing, Râmnicu Vâlcea',
    description_ro:
      'Site premium pentru un serviciu de detailing interior auto. Design editorial închis la culoare, video, galerie de rezultate și secțiunea „Cazul extrem” cu o transformare documentată.',
    description_en:
      'Premium website for an interior car-detailing service. Dark editorial design, video, a results gallery and an "Extreme case" section with a documented transformation.',
    tags: ['React', 'TypeScript', 'Framer Motion', 'Video'],
    image_url: '/portfolio/sizdetailing.webp',
    live_url: 'https://sizdetailing.ro',
    slug: 'siz-detailing',
    case_study: {
      brief_ro:
        'Un serviciu de detailing se vinde prin imagine, deci site-ul avea nevoie de video și imagini mari, dar pe telefon trebuia să se încarce repede, altfel vizitatorul pleacă înainte să vadă ceva.',
      brief_en:
        'A detailing service sells through images, so the site needed video and large photos. On a phone it also had to load fast, or the visitor leaves before seeing anything.',
      approach_ro:
        'Am construit site-ul în React și TypeScript, cu design editorial închis la culoare, video care pornește singur, o galerie de rezultate și secțiunea „Cazul extrem”, cu o transformare documentată.\n\nApoi am lucrat pe viteza de pe mobil: am scos straturile decorative de CSS care costau mult la desenare, am redimensionat imaginile la mărimea în care se afișează și am reparat fonturile și preîncărcările care se încărcau degeaba. Videoclipurile pornesc în continuare singure, fără condiții.',
      approach_en:
        'We built the site in React and TypeScript with a dark editorial design, video that starts on its own, a results gallery and the "Extreme case" section, with one documented transformation.\n\nThen we worked on mobile speed: we removed decorative CSS layers that were expensive to paint, resized images to the size they are actually shown at, and fixed fonts and preloads that were loading for nothing. The videos still start on their own, with no conditions.',
      highlights_ro: [
        'Design editorial închis la culoare',
        'Video care pornește singur, inclusiv pe telefon',
        'Galerie de rezultate',
        'Secțiunea „Cazul extrem” cu o transformare documentată',
        'Imagini WebP la dimensiunea de afișare, fonturi preîncărcate corect',
      ],
      highlights_en: [
        'Dark editorial design',
        'Video that starts on its own, on phones too',
        'Results gallery',
        '"Extreme case" section with a documented transformation',
        'WebP images at display size, fonts preloaded correctly',
      ],
      result: {
        value: '58 → 90',
        label_ro: 'Scor de performanță pe mobil (Lighthouse), măsurat pe sizdetailing.ro',
        label_en: 'Mobile performance score (Lighthouse), measured on sizdetailing.ro',
      },
    },
  },
  {
    id: 'american-partyland',
    sort_order: 2,
    kind: 'client',
    title: 'American Partyland',
    subtitle_ro: 'Loc de joacă și evenimente pentru copii',
    subtitle_en: 'Kids playground and events',
    description_ro:
      'Site de prezentare pentru un loc de joacă în aer liber pentru copii între 1 și 10 ani. Design vesel și colorat, secțiune de atracții, galerie foto și contact rapid.',
    description_en:
      'Presentation website for an outdoor playground for children aged 1 to 10. Bright, colourful design, an attractions section, a photo gallery and quick contact.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Google Maps'],
    image_url: '/portfolio/americanpartyland.webp',
    live_url: 'https://americanpartyland.ro',
    slug: 'american-partyland',
    case_study: {
      brief_ro:
        'Părinții caută de pe telefon: ce atracții are locul, cum arată, unde e și cum îi contactează. Site-ul trebuia să le dea răspunsul repede și să păstreze atmosfera veselă a locului.',
      brief_en:
        'Parents search from their phones: what attractions the place has, what it looks like, where it is and how to reach them. The site had to answer quickly and keep the cheerful feel of the place.',
      approach_ro:
        'Am scris site-ul de mână, în HTML, CSS și JavaScript, fără framework, cu design colorat și vesel pentru copii.\n\nAre o secțiune de atracții, o galerie foto, harta Google și contact rapid, ca un părinte să ajungă la numărul sau la locație din câteva atingeri.',
      approach_en:
        'We wrote the site by hand in HTML, CSS and JavaScript, with no framework, in a bright and cheerful design for kids.\n\nIt has an attractions section, a photo gallery, a Google map and quick contact, so a parent can reach the phone number or the location in a few taps.',
      highlights_ro: [
        'Design colorat și vesel, potrivit pentru copii între 1 și 10 ani',
        'Secțiune de atracții',
        'Galerie foto',
        'Harta Google și contact rapid',
        'HTML, CSS și JavaScript scrise de mână, fără framework',
      ],
      highlights_en: [
        'Bright, cheerful design for children aged 1 to 10',
        'Attractions section',
        'Photo gallery',
        'Google map and quick contact',
        'Hand-written HTML, CSS and JavaScript, no framework',
      ],
    },
  },

  // --- Concepte / demo-uri (marcate in interfata "Concept / demo") ---
  {
    id: 'demo-la-piazza',
    sort_order: 3,
    kind: 'demo',
    title: 'La Piazza',
    subtitle_ro: 'Concept restaurant italian',
    subtitle_en: 'Italian restaurant concept',
    description_ro: 'Concept de site pentru un restaurant italian: meniu digital cu QR, rezervări și galerie foto cu preparatele.',
    description_en: 'Concept website for an Italian restaurant: QR digital menu, reservations and a food photo gallery.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Bilingv'],
    image_url: '/portfolio/lapiazza.webp',
    live_url: 'https://la-piazza-tau.vercel.app',
    slug: null,
    case_study: null,
  },
  {
    id: 'demo-dentpro',
    sort_order: 4,
    kind: 'demo',
    title: 'DentPro Clinic',
    subtitle_ro: 'Concept clinică stomatologică',
    subtitle_en: 'Dental clinic concept',
    description_ro: 'Concept de site bilingv (RO/EN) pentru o clinică stomatologică: servicii, medici, prețuri, programări și blog medical.',
    description_en: 'Concept bilingual (RO/EN) website for a dental clinic: services, doctors, prices, appointments and a medical blog.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Multilingv'],
    image_url: '/portfolio/dentpro.webp',
    live_url: 'https://3-cyan-sigma.vercel.app',
    slug: null,
    case_study: null,
  },
  {
    id: 'demo-vetcare',
    sort_order: 5,
    kind: 'demo',
    title: 'VetCare Clinic',
    subtitle_ro: 'Concept clinică veterinară',
    subtitle_en: 'Veterinary clinic concept',
    description_ro: 'Concept de site pentru o clinică veterinară, cu pagini dedicate pentru servicii, adopții și urgențe.',
    description_en: 'Concept website for a veterinary clinic, with dedicated pages for services, adoptions and emergencies.',
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    image_url: '/portfolio/vetcare.webp',
    live_url: 'https://1-flax-seven.vercel.app',
    slug: null,
    case_study: null,
  },
  {
    id: 'demo-beauty-salon',
    sort_order: 6,
    kind: 'demo',
    title: 'Arta Frumuseții',
    subtitle_ro: 'Concept salon de frumusețe',
    subtitle_en: 'Beauty salon concept',
    description_ro: 'Concept de site pentru un salon de frumusețe: servicii, galerie, echipă și pagină de rezervări. Design elegant, animații fine.',
    description_en: 'Concept website for a beauty salon: services, gallery, team and a booking page. Elegant design, subtle animation.',
    tags: ['React', 'TypeScript', 'Framer Motion'],
    image_url: '/portfolio/beauty-salon.webp',
    live_url: 'https://2-ten-rust.vercel.app',
    slug: null,
    case_study: null,
  },
  {
    id: 'demo-arcform',
    sort_order: 7,
    kind: 'demo',
    title: 'ArcForm Studio',
    subtitle_ro: 'Concept construcții și amenajări',
    subtitle_en: 'Construction and interiors concept',
    description_ro: 'Concept de site bilingv (RO/EN) pentru o firmă de construcții și amenajări interioare: portofoliu, servicii, echipă și cerere de ofertă.',
    description_en: 'Concept bilingual (RO/EN) website for a construction and interior design firm: portfolio, services, team and a quote request.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Bilingv'],
    image_url: '/portfolio/arcform.webp',
    live_url: 'https://4-two-rho.vercel.app',
    slug: null,
    case_study: null,
  },
  {
    id: 'demo-fitlife',
    sort_order: 8,
    kind: 'demo',
    title: 'FitLife',
    subtitle_ro: 'Concept sală de fitness',
    subtitle_en: 'Fitness gym concept',
    description_ro: 'Concept de site pentru o sală de fitness: programe, antrenori, orar și prețuri, cu apel la acțiune pentru o probă gratuită.',
    description_en: 'Concept website for a fitness gym: programmes, trainers, timetable and prices, with a free-trial call to action.',
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    image_url: '/portfolio/fitlife-gym.webp',
    live_url: 'https://fitlife-rouge.vercel.app',
    slug: null,
    case_study: null,
  },
];
