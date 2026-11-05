// Generat din exportul bazei de date vechi (2026-11-05). De acum se editeaza direct aici, nu mai exista baza de date.
import type { PortfolioProjectRow } from './types';

export const PORTFOLIO_PROJECTS: PortfolioProjectRow[] = [
  {
    id: '0ab9dfae-9342-418b-8d44-73c8b8e1f5bd',
    sort_order: 1,
    category: 'webdev',
    title: 'Siz Detailing',
    subtitle_ro: 'Detailing Auto Rm. Valcea',
    subtitle_en: 'Auto Detailing Rm. Valcea',
    description_ro: 'Site premium pentru un serviciu de detailing interior auto. Design dark editorial, animatii video, galerie de rezultate si sectiunea Cazul Extrem cu transformare documentata.',
    description_en: 'Premium website for an interior auto detailing service. Dark editorial design, video animations, results gallery and Extreme Case section with documented transformation.',
    tags: ['React', 'TypeScript', 'Framer Motion', 'Video'],
    image_url: '/portfolio/sizdetailing.webp',
    live_url: 'https://sizdetailing.ro',
    slug: null,
    case_study: null,
  },
  {
    id: 'bef7ee7f-e5ef-4a86-aa07-1efdb11a78dd',
    sort_order: 2,
    category: 'webdev',
    title: 'American Partyland',
    subtitle_ro: 'Loc de Joaca & Evenimente pentru Copii',
    subtitle_en: 'Kids Playground & Events',
    description_ro: 'Site de prezentare pentru un loc de joaca in aer liber dedicat copiilor 1-10 ani. Design vesel si colorat, sectiune de atractii, galerie foto si contact rapid.',
    description_en: 'Presentation website for an outdoor playground for children aged 1-10. Vibrant colorful design, attractions section, photo gallery and quick contact.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Google Maps'],
    image_url: '/portfolio/americanpartyland.webp',
    live_url: 'https://americanpartyland.ro',
    slug: null,
    case_study: null,
  },
  {
    id: 'eb5db469-e9b5-4d52-a6fb-1ed7a24c0e13',
    sort_order: 4,
    category: 'webdev',
    title: 'Arta Frumuseții',
    subtitle_ro: 'Salon de Frumusețe & Rezervări',
    subtitle_en: 'Beauty Salon & Bookings',
    description_ro: 'Website modern pentru un salon de frumusețe cu rezervări online, galerie, prezentare echipă și servicii. Design elegant cu animații fluide.',
    description_en: 'Modern website for a beauty salon with online bookings, gallery, team presentation and services. Elegant design with smooth animations.',
    tags: ['React', 'TypeScript', 'Framer Motion', 'Rezervări Online'],
    image_url: '/portfolio/beauty-salon.webp',
    live_url: 'https://2-ten-rust.vercel.app',
    slug: 'arta-frumusetii',
    case_study: {
      year: '2025',
      price: '~1.200€',
      process: `Săptămâna 1: Sesiune foto profesională la salon (am colaborat cu un fotograf partener) — 80+ poze cu interiorul, echipa, și lucrările finalizate. Discuții despre brand și viziune cu Elena. Wireframes livrate.

Săptămâna 2: Design în Figma — 3 variante de direcție vizuală prezentate Elenei. A ales direcția "Paris Editorial": negru, auriu, crem. Animații cu Framer Motion integrate în design.

Săptămâna 3: Dezvoltare completă — pagini, sistem rezervări, galerie cu lightbox, pagina echipei cu bio și specialități.

Săptămâna 4: Testare, optimizare mobile, SEO, integrare Instagram feed, lansare cu campanie pe social media.`,
      results: [
        {
          label: 'Rezervări online în prima lună',
          value: '+420%',
          labelEn: 'Online bookings in first month',
        },
        {
          label: 'Lista de așteptare redusă la',
          value: '1 săpt.',
          labelEn: 'Waiting list reduced to',
        },
        {
          label: 'Clienți noi din Instagram/Google',
          value: '+55%',
          labelEn: 'New clients from Instagram/Google',
        },
        {
          label: 'Valoare medie comandă',
          value: '+30%',
          labelEn: 'Average order value',
        },
      ],
      duration: '4 săptămâni',
      features: [
        'Design editorial premium — fonturi serif italice, animații Framer Motion, imagini full-bleed',
        'Sistem rezervări online cu selecție stilistă, serviciu și oră — disponibilitate în timp real',
        'Reminder automat 24h înainte de programare prin email',
        'Galerie foto cu lightbox organizată pe categorii: coafuri, make-up, nail art',
        'Pagina echipei cu bio, specialități și pozele fiecărei stiliste',
        'Pagina servicii cu prețuri transparente, durată și descrieri detaliate',
        'Feed Instagram integrat — mereu actualizat automat',
        'Optimizat pentru mobil cu butoane mari și scroll natural',
      ],
      solution: `Am creat un website cu o estetică sofisticată — fonturi serif italice, imagini full-bleed, animații lente și elegante. Totul comunica: "ești pe cale să intri într-un salon de lux".

Sistemul de rezervări online permite selectarea stilistei preferate, a serviciului dorit și a orei — cu disponibilitate în timp real. Clienta primește confirmare cu detalii complete și reminder cu 24h înainte. Zero apeluri pierdute.

Am construit o pagină de Servicii cu prețuri transparente și descrieri detaliate — ce include fiecare pachet, cât durează, ce produse se folosesc. Elena nu mai trebuie să explice la telefon.

Galeria foto a fost esențială — am organizat pozele pe categorii (coafuri, make-up, manichiură) cu un lightbox care face fiecare imagine să respire. Vizitatoarea poate vedea calitatea muncii înainte să rezerve.`,
      challenge: `"Arta Frumuseții" este un salon premium din Cluj-Napoca, înființat în 2016 de Elena Marinescu. Cu 6 stiliste și o listă de așteptare de 3 săptămâni, Elena avea o problemă pe care mulți ar invidia-o — dar care o costa bani.

1. Rezervările se pierdeau. Clienții sunau, nu prindeau linie, și mergeau la alt salon. Estimarea Elenei: 30-40% din rezervările potențiale pierdute din cauza telefonului ocupat.

2. Imaginea online nu reflecta calitatea salonului. Profilul de Facebook cu poze neclare nu transmiteau atmosfera elegantă pe care Elena o crease în 9 ani. "Vin clienți și spun că realitatea e mult mai frumoasă decât online-ul" — problema perfectă de branding.

3. Nu existau pachete și prețuri clare. Clienții nu știau la ce să se aștepte financiar și hesitau să programeze.`,
      processEn: `Week 1: Professional photo session at the salon (we collaborated with a partner photographer) — 80+ photos of the interior, team, and completed work. Brand and vision discussions with Elena. Wireframes delivered.

Week 2: Design in Figma — 3 visual direction options presented to Elena. She chose the "Paris Editorial" direction: black, gold, cream. Framer Motion animations integrated into design.

Week 3: Full development — pages, booking system, gallery with lightbox, team page with bio and specialties.

Week 4: Testing, mobile optimization, SEO, Instagram feed integration, launch with social media campaign.`,
      durationEn: '4 weeks',
      featuresEn: [
        'Premium editorial design — italic serif fonts, Framer Motion animations, full-bleed images',
        'Online booking system with stylist, service and time selection — real-time availability',
        'Automatic reminder 24h before appointment by email',
        'Photo gallery with lightbox organized by categories: hairstyles, make-up, nail art',
        'Team page with bio, specialties and photos of each stylist',
        'Services page with transparent prices, duration and detailed descriptions',
        'Integrated Instagram feed — always updated automatically',
        'Mobile optimized with large buttons and natural scroll',
      ],
      solutionEn: `We created a website with a sophisticated aesthetic — italic serif fonts, full-bleed images, slow and elegant animations. Everything communicated: "you're about to enter a luxury salon".

The online booking system allows selecting the preferred stylist, desired service and time — with real-time availability. The client receives confirmation with full details and a reminder 24h before. Zero missed calls.

We built a Services page with transparent prices and detailed descriptions — what each package includes, how long it takes, what products are used. Elena no longer has to explain over the phone.

The photo gallery was essential — we organized photos by categories (hairstyles, make-up, manicure) with a lightbox that lets each image breathe. The visitor can see the quality of the work before booking.`,
      challengeEn: `"Arta Frumuseții" is a premium salon in Cluj-Napoca, founded in 2016 by Elena Marinescu. With 6 stylists and a 3-week waiting list, Elena had a problem many would envy — but one that was costing her money.

1. Reservations were being lost. Clients called, couldn't get through, and went to another salon. Elena's estimate: 30-40% of potential reservations lost because the line was busy.

2. The online image didn't reflect the salon's quality. The Facebook profile with blurry photos didn't convey the elegant atmosphere Elena had created in 9 years. "Clients come and say reality is much more beautiful than online" — the perfect branding problem.

3. There were no clear packages and prices. Clients didn't know what to expect financially and hesitated to book.`,
      testimonial: {
        name: 'Elena M.',
        role: 'Proprietară, Arta Frumuseții',
        quote: 'Am plâns când am văzut site-ul finalizat. Arată exact cum visam — rafinat, elegant, exact ca salonul fizic. Acum clienții vin și spun că au rezervat online pentru că site-ul le-a dat încredere. Și nu mai pierdem rezervări — totul vine online, ordonat, perfect.',
        quoteEn: 'I cried when I saw the finished website. It looks exactly as I dreamed — refined, elegant, exactly like the physical salon. Now clients come and say they booked online because the website gave them confidence. And we no longer lose reservations — everything comes online, organized, perfect.',
      },
      deliverables: [
        'Website premium cu 6 pagini: Acasă, Servicii, Galerie, Echipă, Rezervări, Contact',
        'Sistem rezervări online cu selecție stilistă și confirmare + reminder automat',
        'Sesiune foto profesională — 80+ poze folosite în website și social media',
        'Galerie cu lightbox, organizată pe 4 categorii',
        'Pagina echipei cu bio individuale și portofoliu per stilistă',
        'Pagina servicii cu pachete, prețuri și durate',
        'Integrare Instagram feed live',
        'SEO local + Google Business Profile optimizat',
        'Strategie lansare cu campanie pe Instagram Stories',
      ],
      deliverablesEn: [
        'Premium website with 6 pages: Home, Services, Gallery, Team, Bookings, Contact',
        'Online booking system with stylist selection and automatic confirmation + reminder',
        'Professional photo session — 80+ photos used in website and social media',
        'Gallery with lightbox, organized into 4 categories',
        'Team page with individual bios and portfolio per stylist',
        'Services page with packages, prices and durations',
        'Live Instagram feed integration',
        'Local SEO + optimized Google Business Profile',
        'Launch strategy with Instagram Stories campaign',
      ],
    },
  },
  {
    id: '6de96b5b-4c5c-4490-afc7-080c68a9ec9a',
    sort_order: 5,
    category: 'webdev',
    title: 'DentPro Clinic',
    subtitle_ro: 'Clinică Stomatologică Modernă',
    subtitle_en: 'Modern Dental Clinic',
    description_ro: 'Website multilingv (RO/EN) pentru o clinică stomatologică cu pagini pentru servicii, medici, prețuri, programări online și blog medical.',
    description_en: 'Multilingual (RO/EN) website for a dental clinic with pages for services, doctors, prices, online appointments and medical blog.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Multilingv', 'Programări'],
    image_url: '/portfolio/dentpro.webp',
    live_url: 'https://3-cyan-sigma.vercel.app',
    slug: 'dentpro-clinic',
    case_study: {
      year: '2025',
      price: '~1.300€',
      process: `Săptămâna 1: Audit complet al site-ului vechi (GTmetrix, analiză competitor, heatmaps). Sesiune foto cu echipa și clinica. Arhitectura informației pentru 8 pagini. Wireframes aprobate de Dr. Ionescu.

Săptămâna 2: Design system bilingv în Figma — componente reutilizabile, sistem de culori, tipografie. Pagini: Acasă, Servicii, Medici, Prețuri, Blog.

Săptămâna 3: Dezvoltare React + sistem i18n pentru bilingvism complet, pagina de programări, panou admin, optimizare Core Web Vitals.

Săptămâna 4: Redactare conținut medical (10 pagini de servicii, 3 articole blog), testare, migrare domeniu, lansare și monitorizare primele 48h.`,
      results: [
        {
          label: 'Rata de bounce redusă de la 85% la',
          value: '32%',
          labelEn: 'Bounce rate reduced from 85% to',
        },
        {
          label: 'Programări online în prima lună',
          value: '+280%',
          labelEn: 'Online appointments in first month',
        },
        {
          label: 'Pacienți internaționali noi',
          value: '+120%',
          labelEn: 'New international patients',
        },
        {
          label: 'Poziție Google pentru \'implant dentar Timișoara\'',
          value: '#2',
          labelEn: 'Google position for \'dental implant Timișoara\'',
        },
      ],
      duration: '4 săptămâni',
      features: [
        'Design bilingv RO/EN — switch instant de limbă, fără reîncărcare pagină',
        'Pagina Medici cu fotografii profesionale, CV și programare directă per doctor',
        'Pagina Servicii cu 10 tratamente detaliate: procedură, durată, preț, înainte/după',
        'Prețuri transparente cu opțiuni de rate și asigurări acceptate',
        'Blog medical SEO — articole scrise de medicii clinicii',
        'Sistem programări online cu confirmare email automată',
        'Galerie clinică — echipamente, săli de tratament, atmosfera',
        'Core Web Vitals optimizate — scor 95+ pe mobile și desktop',
      ],
      solution: `Am proiectat un website bilingv (română/engleză) elegant și rassigurant — DentPro are pacienți internaționali, și aveam nevoie să comunice în ambele limbi fără a compromite design-ul.

Design-ul alege albul clinic cu accente albastre profunde — transmite curățenie, profesionalism, liniște. Fiecare pagină e gândită să reducă anxietatea dentară: fotografii cu echipa zâmbitoare, descrieri clare ale procedurilor, secțiune "Ce se întâmplă la prima vizită".

Pagina Medici prezintă fiecare doctor cu fotografie profesională, CV, specializări și link direct la programare cu acel medic. Pacientul știe exact cu cine vine.

Secțiunea Prețuri este transparentă și detaliată — inclusiv opțiuni de rate și asigurări acceptate. Am eliminat surprizele financiare care generau recenzii negative.

Blogul medical scris de echipa DentPro atrage trafic organic și pozițonează clinica ca autoritate în stomatologie modernă.`,
      challenge: `DentPro Clinic este o clinică stomatologică modernă din Timișoara, cu 5 medici specializați și echipamente de ultimă generație. Dr. Mihai Ionescu, fondatorul, investise 200.000 EUR în echipamente — dar website-ul era din 2018, nereactiv pe mobil, și nu comunica deloc profesionalismul clinicii.

1. 70% din pacienții potențiali căutau pe mobil, dar site-ul vechi era imposibil de folosit pe telefon. Rata de bounce era 85%.

2. Clinica oferea servicii premium (implantologie, ortodonție cu alignere, albire laser) dar nu le comunica eficient. Pacienții percepeau DentPro ca pe o clinică obișnuită și se surprindeau de prețuri.

3. Nu exista o pagină clară cu medici și specializările lor. Pacienții nu știau cu cine se programează și la ce să se aștepte — anxietatea dentară era amplificată de lipsa de informații.`,
      processEn: `Week 1: Complete audit of old site (GTmetrix, competitor analysis, heatmaps). Photo session with team and clinic. Information architecture for 8 pages. Wireframes approved by Dr. Ionescu.

Week 2: Bilingual design system in Figma — reusable components, color system, typography. Pages: Home, Services, Doctors, Prices, Blog.

Week 3: React development + i18n system for complete bilingualism, booking page, admin panel, Core Web Vitals optimization.

Week 4: Medical content writing (10 service pages, 3 blog articles), testing, domain migration, launch and first 48h monitoring.`,
      durationEn: '4 weeks',
      featuresEn: [
        'Bilingual RO/EN design — instant language switch, no page reload',
        'Doctors page with professional photos, CV and direct per-doctor booking',
        'Services page with 10 detailed treatments: procedure, duration, price, before/after',
        'Transparent prices with installment options and accepted insurance',
        'Medical SEO blog — articles written by clinic doctors',
        'Online appointment system with automatic email confirmation',
        'Clinic gallery — equipment, treatment rooms, atmosphere',
        'Optimized Core Web Vitals — 95+ score on mobile and desktop',
      ],
      solutionEn: `We designed an elegant and reassuring bilingual website (Romanian/English) — DentPro has international patients, and we needed to communicate in both languages without compromising design.

The design chooses clinical white with deep blue accents — conveying cleanliness, professionalism, calm. Every page is designed to reduce dental anxiety: photos of the smiling team, clear procedure descriptions, "What happens at your first visit" section.

The Doctors page presents each doctor with professional photo, CV, specializations and direct booking link with that doctor. The patient knows exactly who they're seeing.

The Prices section is transparent and detailed — including installment options and accepted insurance. We eliminated financial surprises that generated negative reviews.

The medical blog written by the DentPro team attracts organic traffic and positions the clinic as an authority in modern dentistry.`,
      challengeEn: `DentPro Clinic is a modern dental clinic in Timișoara with 5 specialized doctors and state-of-the-art equipment. Dr. Mihai Ionescu, the founder, had invested 200,000 EUR in equipment — but the website was from 2018, not mobile-responsive, and didn't communicate the clinic's professionalism at all.

1. 70% of potential patients searched on mobile, but the old site was impossible to use on phones. Bounce rate was 85%.

2. The clinic offered premium services (implantology, aligner orthodontics, laser whitening) but didn't communicate them effectively. Patients perceived DentPro as an ordinary clinic and were surprised by prices.

3. There was no clear page with doctors and their specialties. Patients didn't know who they were booking with and what to expect — dental anxiety was amplified by the lack of information.`,
      testimonial: {
        name: 'Dr. Mihai I.',
        role: 'Fondator, DentPro Clinic',
        quote: 'Am investit 200.000 EUR în echipamente și aveam un site din 2018. Acum site-ul reflectă cu adevărat ce facem. Pacienții vin informați, știu cu ce medic se programează, știu prețurile. Anxietatea s-a redus vizibil — și recenziile negative legate de prețuri au dispărut complet.',
        quoteEn: 'I invested 200,000 EUR in equipment and had a 2018 website. Now the site truly reflects what we do. Patients come informed, they know which doctor they\'re booking with, they know the prices. Anxiety has visibly reduced — and negative reviews about prices have completely disappeared.',
      },
      deliverables: [
        'Website bilingv complet cu 8 pagini + blog',
        'Pagina Medici cu 5 profiluri individuale și programare directă',
        '10 pagini de servicii medicale detaliate cu prețuri și proceduri',
        'Sistem programări online cu confirmare automată și panou admin',
        '3 articole de blog medical optimizate SEO',
        'Sesiune foto profesională — echipă, clinică, echipamente',
        'Migrare conținut de pe site-ul vechi fără pierdere de SEO',
        'Optimizare Core Web Vitals și Google PageSpeed 95+',
        'Google Business Profile optimizat și integrat',
      ],
      deliverablesEn: [
        'Complete bilingual website with 8 pages + blog',
        'Doctors page with 5 individual profiles and direct booking',
        '10 detailed medical service pages with prices and procedures',
        'Online appointment system with automatic confirmation and admin panel',
        '3 SEO-optimized medical blog articles',
        'Professional photo session — team, clinic, equipment',
        'Content migration from old site without SEO loss',
        'Core Web Vitals optimization and Google PageSpeed 95+',
        'Optimized and integrated Google Business Profile',
      ],
    },
  },
  {
    id: '04abead3-3dcb-439b-9486-a4f8fd4303ca',
    sort_order: 7,
    category: 'webdev',
    title: 'VetCare Clinic',
    subtitle_ro: 'Clinică Veterinară cu Programări Online',
    subtitle_en: 'Veterinary Clinic with Online Appointments',
    description_ro: 'Website complet pentru o clinică veterinară cu sistem de programări online, pagini dedicate pentru servicii, adopții și urgențe 24/7.',
    description_en: 'Complete website for a veterinary clinic with online appointment system, dedicated pages for services, adoptions and 24/7 emergencies.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Programări Online'],
    image_url: '/portfolio/vetcare.webp',
    live_url: 'https://1-flax-seven.vercel.app',
    slug: 'vetcare-clinic',
    case_study: {
      year: '2025',
      price: '~850€',
      process: `Săptămâna 1: Vizita clinicii, discuții cu Dr. Andreea și echipa, fotografierea spațiului și echipamentelor. Am înțeles fluxul de lucru exact și am livrat wireframes pentru 6 pagini.

Săptămâna 2: Design în Figma cu culori calde (verde sage, alb, accente portocalii) + dezvoltare: pagini principale, sistem de programări cu calendar, panou admin. Integrare API SMS pentru confirmări.

Săptămâna 3: Pagina de urgențe cu banner flotant, secțiunea de adopții, optimizare SEO local, testare completă pe 15 dispozitive și lansare.`,
      results: [
        {
          label: 'Programări online în prima lună',
          value: '+340%',
          labelEn: 'Online appointments in first month',
        },
        {
          label: 'Apeluri la secretariat reduse cu',
          value: '-65%',
          labelEn: 'Reception calls reduced by',
        },
        {
          label: 'Clienți noi din Google',
          value: '+80%',
          labelEn: 'New clients from Google',
        },
        {
          label: 'Urgențe noaptea (clienți noi)',
          value: '+45%',
          labelEn: 'Night emergencies (new clients)',
        },
      ],
      duration: '3 săptămâni',
      features: [
        'Design cald și profesionist — culori sage green și alb, fotografii reale ale clinicii',
        'Sistem de programări online cu calendar în timp real, alegere medic și tip consultație',
        'Confirmare automată pe email și SMS după programare',
        'Pagină urgențe 24/7 cu banner vizibil pe tot site-ul și instrucțiuni rapide',
        'Pagini dedicate pentru Servicii, Echipă, Adopții și Prețuri',
        'Secțiune Adopții cu animăluțe disponibile și formular de aplicare',
        'Panou admin: gestionare programări, medici, servicii, prețuri',
        'Optimizat pentru mobil — 75% din programările online vin de pe telefon',
      ],
      solution: `Am construit un website complet, modern și cald — pentru că oamenii care vin la o clinică veterinară sunt îngrijorați pentru animalul lor și au nevoie să simtă încredere din prima secundă.

Am integrat un sistem de programări online cu calendar în timp real: proprietarul alege data, ora, medicul preferat și tipul de consultație. Primește confirmare automată pe email și SMS. Dr. Andreea gestionează totul din panoul admin.

Am creat o pagină dedicată pentru urgențe 24/7, vizibilă din orice pagină a site-ului printr-un banner fix în partea de sus. Include numărul de urgență, adresa exactă și instrucțiuni pentru situații comune.

Am adăugat și o secțiune de adopții — VetCare colaborează cu mai multe adăposturi și ajută la plasarea animalelor. Aceasta a adus trafic suplimentar și o comunitate de iubitori de animale.`,
      challenge: `VetCare Clinic este o clinică veterinară din București, cu 4 medici și o capacitate de 60 de consultații pe zi. Dr. Andreea Popescu, directoarea clinicii, ne-a contactat cu o problemă serioasă:

1. Programările se făceau exclusiv telefonic, iar secretarele erau copleșite. Dimineața, între 8:00 și 10:00, telefonul suna continuu — mulți proprietari de animale nu mai aveau răbdare și căutau altă clinică.

2. Nu aveau o prezență online serioasă. Pagina veche era un simplu formular de contact, fără informații despre servicii, medici sau prețuri. Oamenii căutau pe Google "clinică veterinară București" și găseau concurența care arăta mult mai profesionist.

3. Urgențele 24/7 nu erau comunicate clar. Mulți proprietari nu știau că VetCare oferă urgențe noaptea, și sunau alte clinici.`,
      processEn: `Week 1: Clinic visit, discussions with Dr. Andreea and the team, photographing the space and equipment. We understood the exact workflow and delivered wireframes for 6 pages.

Week 2: Design in Figma with warm colors (sage green, white, orange accents) + development: main pages, appointment system with calendar, admin panel. SMS API integration for confirmations.

Week 3: Emergency page with floating banner, adoptions section, local SEO optimization, full testing on 15 devices and launch.`,
      durationEn: '3 weeks',
      featuresEn: [
        'Warm and professional design — sage green and white colors, real clinic photos',
        'Online appointment system with real-time calendar, doctor and consultation type selection',
        'Automatic email and SMS confirmation after booking',
        '24/7 emergency page with banner visible across the entire site and quick instructions',
        'Dedicated pages for Services, Team, Adoptions and Prices',
        'Adoptions section with available pets and application form',
        'Admin panel: manage appointments, doctors, services, prices',
        'Mobile optimized — 75% of online appointments come from phones',
      ],
      solutionEn: `We built a complete, modern and warm website — because people who come to a veterinary clinic are worried about their pet and need to feel trust from the first second.

We integrated an online appointment system with real-time calendar: the owner chooses the date, time, preferred doctor and type of consultation. They receive automatic confirmation by email and SMS. Dr. Andreea manages everything from the admin panel.

We created a dedicated page for 24/7 emergencies, visible from any page on the site through a fixed banner at the top. It includes the emergency number, exact address and instructions for common situations.

We also added an adoptions section — VetCare collaborates with several shelters and helps place animals. This brought additional traffic and a community of animal lovers.`,
      challengeEn: `VetCare Clinic is a veterinary clinic in Bucharest with 4 doctors and a capacity of 60 consultations per day. Dr. Andreea Popescu, the clinic director, contacted us with a serious problem:

1. Appointments were exclusively by phone, and receptionists were overwhelmed. In the morning, between 8:00 and 10:00, the phone rang constantly — many pet owners ran out of patience and looked for another clinic.

2. They had no serious online presence. The old page was just a simple contact form, with no information about services, doctors or prices. People searched Google for "veterinary clinic Bucharest" and found competition that looked much more professional.

3. 24/7 emergencies were not clearly communicated. Many owners didn't know VetCare offers overnight emergencies and called other clinics.`,
      testimonial: {
        name: 'Dr. Andreea P.',
        role: 'Director, VetCare Clinic',
        quote: 'Dimineața nu mai e haos. Programările vin online, secretarele pot să se concentreze pe pacienții din clinică. Și cel mai tare lucru — am început să primim urgențe noaptea de la oameni care ne-au găsit pe Google. Înainte nu știa nimeni că suntem disponibili 24/7.',
        quoteEn: 'Mornings are no longer chaos. Appointments come online, receptionists can focus on patients in the clinic. And the best thing — we started getting night emergencies from people who found us on Google. Before, nobody knew we were available 24/7.',
      },
      deliverables: [
        'Website complet cu 6 pagini: Acasă, Servicii, Programări, Echipă, Adopții, Contact',
        'Sistem de programări online cu calendar, selecție medic și confirmare automată email+SMS',
        'Banner urgențe 24/7 persistent, vizibil pe toate paginile',
        'Pagină dedicată urgențelor cu instrucțiuni și număr de telefon prominent',
        'Secțiune adopții cu formulare și galerie animale',
        'Panou admin complet pentru gestionarea clinicii',
        'Integrare Google Maps și link direct Google Reviews',
        'SEO local optimizat pentru căutări din sector și București',
        'Design responsive — testat pe 15 tipuri de dispozitive',
      ],
      deliverablesEn: [
        'Complete website with 6 pages: Home, Services, Appointments, Team, Adoptions, Contact',
        'Online appointment system with calendar, doctor selection and automatic email+SMS confirmation',
        'Persistent 24/7 emergency banner visible on all pages',
        'Dedicated emergency page with instructions and prominent phone number',
        'Adoptions section with forms and pet gallery',
        'Complete admin panel for clinic management',
        'Google Maps and direct Google Reviews link integration',
        'Local SEO optimized for neighborhood and city searches',
        'Responsive design — tested on 15 device types',
      ],
    },
  },
  {
    id: '7593af05-94b7-4df1-8d6e-5b4c8bee7b4e',
    sort_order: 8,
    category: 'design',
    title: 'FitLife Brand',
    subtitle_ro: 'Kit Social Media',
    subtitle_en: 'Social Media Kit',
    description_ro: 'Pachet de 50+ template-uri editabile Figma pentru Instagram, Facebook și TikTok — pentru o sală de fitness din Timișoara cu 3 locații.',
    description_en: 'Package of 50+ editable Figma templates for Instagram, Facebook and TikTok — for a fitness gym in Timișoara with 3 locations.',
    tags: ['Figma', 'Social Media', 'Templates', 'Branding'],
    image_url: '/portfolio/fitlife.webp',
    live_url: 'https://fitlife-rouge.vercel.app',
    slug: 'fitlife',
    case_study: {
      year: '2024',
      price: '~400€',
      process: `Săptămâna 1: Am analizat contul lor de Instagram (ultimele 50 de postări), am văzut ce funcționează și ce nu. Am stabilit paleta de culori, fonturile, și stilul. Am livrat primele 10 template-uri pentru feedback.

Săptămâna 2: Am finalizat toate cele 50+ template-uri, am organizat fișierul Figma pe categorii, am livrat ghidul de culori/fonturi (PDF), și am înregistrat video-ul tutorial de 10 minute.`,
      results: [
        {
          label: 'Template-uri livrate',
          value: '50+',
          labelEn: 'Templates delivered',
        },
        {
          label: 'Timp pe fiecare postare',
          value: '-70%',
          labelEn: 'Time per post',
        },
        {
          label: 'Engagement pe Instagram',
          value: '+200%',
          labelEn: 'Instagram engagement',
        },
        {
          label: 'Consistență vizuală pe feed',
          value: '100%',
          labelEn: 'Feed visual consistency',
        },
      ],
      duration: '2 săptămâni',
      features: [
        'Branding unitar: negru + verde neon + portocaliu pe toate template-urile',
        'Fonturi bold (Bebas Neue) pentru impact vizual pe feed',
        'Placeholder-e clare — schimbi textul și poza, gata',
        'Template-uri pentru orice tip de conținut: promo, testimonial, program, quiz',
        'Funcționează în Figma gratuit — nu trebuie Photoshop',
        'Ghid video pas cu pas — echipa învață în 10 minute',
        'Exporturi în format potrivit pentru Instagram, Facebook, TikTok',
        'Consistență pe tot feed-ul — arată ca un brand adevărat',
      ],
      solution: `Am creat un kit complet de template-uri în Figma, toate cu branding unitar. Am stabilit culorile (negru mat, verde neon #39FF14, portocaliu energic #FF6B00), fonturile (Bebas Neue pentru titluri, Inter pentru text), și stilul general: bold, energic, dar curat.

Kitul include:
— 20 template-uri pentru feed Instagram: promoții abonamente, programul orelor, testimoniale clienți, before/after, citat motivațional, prezentare antrenor, rezultate membri
— 15 template-uri Instagram Stories: sondaje, countdown, promo, quiz, reminder clasă
— 10 cover-uri și posturi Facebook: evenimente, oferte, recruitment
— 5 thumbnails TikTok: consistente cu restul brandului

Fiecare template are placeholder-e clare — echipa lui Bogdan deschide Figma, schimbă textul și poza, exportă, și postează. Am făcut și un ghid video de 10 minute care arată cum se editează.`,
      challenge: `FitLife este o sală de fitness din Timișoara cu 3 locații și circa 2.000 de abonați activi. Postau pe Instagram de 3-4 ori pe săptămână, dar fiecare postare arăta diferit: un angajat folosea Canva cu template-uri albastre, altul făcea poze cu telefonul direct din sală și punea text alb peste imagine, iar managerul de marketing făcea stories cu font-ul default de pe Instagram.

Rezultatul: feed-ul Instagram arăta ca un puzzle fără logică. Culorile săreau de la albastru la roșu la verde, fonturile se schimbau în fiecare postare, și nu exista nicio identitate vizuală recunoscibilă.

Bogdan, managerul, ne-a spus: „Am 3 oameni care postează și fiecare face ce vrea. Vreau să arătăm profesionist, dar nu avem buget de graphic designer full-time."`,
      processEn: `Week 1: We analyzed their Instagram account (last 50 posts), saw what works and what doesn't. We established color palette, fonts, and style. We delivered the first 10 templates for feedback.

Week 2: We finalized all 50+ templates, organized the Figma file by categories, delivered the color/font guide (PDF), and recorded the 10-minute tutorial video.`,
      durationEn: '2 weeks',
      featuresEn: [
        'Unified branding: black + neon green + orange across all templates',
        'Bold fonts (Bebas Neue) for visual impact on feed',
        'Clear placeholders — change text and photo, done',
        'Templates for any content type: promo, testimonial, schedule, quiz',
        'Works in free Figma — no Photoshop needed',
        'Step-by-step video guide — team learns in 10 minutes',
        'Exports in correct format for Instagram, Facebook, TikTok',
        'Consistency across feed — looks like a real brand',
      ],
      solutionEn: `We created a complete Figma template kit, all with unified branding. We established the colors (matte black, neon green #39FF14, energetic orange #FF6B00), fonts (Bebas Neue for titles, Inter for text), and overall style: bold, energetic, but clean.

The kit includes:
— 20 Instagram feed templates: membership promos, class schedules, client testimonials, before/after, motivational quotes, trainer introductions, member results
— 15 Instagram Stories templates: polls, countdowns, promos, quizzes, class reminders
— 10 Facebook covers and posts: events, offers, recruitment
— 5 TikTok thumbnails: consistent with the rest of the brand

Each template has clear placeholders — Bogdan's team opens Figma, changes text and photo, exports, and posts. We also made a 10-minute video guide showing how to edit.`,
      challengeEn: `FitLife is a fitness gym in Timișoara with 3 locations and about 2,000 active members. They posted on Instagram 3-4 times per week, but each post looked different: one employee used Canva with blue templates, another took phone photos directly from the gym and put white text over the image, and the marketing manager made stories with Instagram's default font.

The result: the Instagram feed looked like a puzzle with no logic. Colors jumped from blue to red to green, fonts changed in every post, and there was no recognizable visual identity.

Bogdan, the manager, told us: "I have 3 people posting and each does whatever they want. I want us to look professional, but we don't have budget for a full-time graphic designer."`,
      testimonial: {
        name: 'Bogdan T.',
        role: 'Manager, FitLife Timișoara',
        quote: 'Înainte pierdeam 2 ore pe o postare și tot nu arăta bine. Acum, unul din angajați face o postare în 15 minute, arată profesionist, și tot feed-ul e coerent. Am primit mesaje de la alte săli că „arată bine Instagramul vostru". Merită fiecare leu.',
        quoteEn: 'Before, I spent 2 hours on a post and it still didn\'t look good. Now, one employee makes a post in 15 minutes, it looks professional, and the whole feed is cohesive. We got messages from other gyms saying "your Instagram looks great." Worth every penny.',
      },
      deliverables: [
        '20 template-uri feed Instagram (promoții, testimoniale, program, citate, prezentări)',
        '15 template-uri Instagram Stories (sondaje, countdown, quiz, reminder, promo)',
        '10 cover-uri și posturi Facebook (evenimente, oferte, recruitment)',
        '5 thumbnails TikTok în stilul brandului',
        'Fișier Figma organizat pe categorii — ușor de navigat',
        'Ghid de brand PDF (culori cu coduri, fonturi, reguli de utilizare)',
        'Video tutorial 10 minute — cum se editează template-urile',
        'Toate fonturile gratuite instalabile + link-uri Google Fonts',
      ],
      deliverablesEn: [
        '20 Instagram feed templates (promos, testimonials, schedule, quotes, introductions)',
        '15 Instagram Stories templates (polls, countdown, quiz, reminder, promo)',
        '10 Facebook covers and posts (events, offers, recruitment)',
        '5 TikTok thumbnails in brand style',
        'Figma file organized by categories — easy to navigate',
        'Brand guide PDF (colors with codes, fonts, usage rules)',
        '10-minute video tutorial — how to edit the templates',
        'All free installable fonts + Google Fonts links',
      ],
    },
  },
  {
    id: '5f0b2662-56a6-4003-9b6d-b9b628f5ced7',
    sort_order: 10,
    category: 'webdev',
    title: 'FitLife Brand',
    subtitle_ro: 'Sala de Fitness & Antrenori Personali',
    subtitle_en: 'Fitness Gym & Personal Trainers',
    description_ro: 'Website pentru un restaurant italian din Cluj cu meniu digital QR, sistem de rezervări online, și galerie foto cu preparatele casei.',
    description_en: 'Website for an Italian restaurant in Cluj with QR digital menu, online reservation system, and food photo gallery.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Bilingv', 'Booking'],
    image_url: '/portfolio/fitlife-gym.webp',
    live_url: 'https://la-piazza-tau.vercel.app',
    slug: 'lapiazza',
    case_study: {
      year: '2025',
      price: '~700€',
      process: `Săptămâna 1: Am vizitat restaurantul, am mâncat acolo (research serios 😄), am fotografiat interiorul, preparatele, și am discutat cu Marian despre ce funcționalități are nevoie. Am livrat wireframes.

Săptămâna 2: Design în Figma + dezvoltare: pagini, sistem rezervări, meniu digital cu categorii și poze, panou admin.

Săptămâna 3: Generare QR codes, testare sistem rezervări (am testat cu 15 rezervări fictive), optimizare mobile (70% din vizitatori sunt pe telefon), SEO, și lansare.`,
      results: [
        {
          label: 'Rezervări în prima lună',
          value: '+250%',
          labelEn: 'Reservations in first month',
        },
        {
          label: 'Costuri tipărire meniuri',
          value: '0 RON',
          labelEn: 'Menu printing costs',
        },
        {
          label: 'Clienți noi din Google',
          value: '+60%',
          labelEn: 'New clients from Google',
        },
        {
          label: 'Rating pe Google (de la 4.2)',
          value: '4.8/5',
          labelEn: 'Google rating (from 4.2)',
        },
      ],
      duration: '3 săptămâni',
      features: [
        'Design dark cu ambient de restaurant — culori calde, iluminare sugerată',
        'Sistem de rezervări cu selecție dată/oră/persoane și notă opțională',
        'Meniu digital cu categorii, prețuri, poze, și alergeni',
        'QR code pe masă → meniul se deschide instant pe telefon',
        'Galerie foto cu lightbox pentru interior și preparate',
        'Secțiune evenimente: petreceri private, mese corporate, aniversări',
        'Marian actualizează meniul din telefon — fără programator',
        'Optimizat pentru mobil — butoane mari, text lizibil, scroll natural',
      ],
      solution: `Am creat un website pe fond închis, cu iluminare caldă (ambră, auriu) care reflectă atmosfera din restaurant. Nu am vrut un site generic de restaurant — am vrut ca vizitatorul să simtă deja ambianța La Piazza de pe ecran.

Am integrat un sistem de rezervări online: clientul alege data, ora, numărul de persoane, și opțional adaugă o notă (ex: „ziua soției, vrem masă lângă fereastră"). Marian primește notificare pe email și confirmă din panoul admin. Clientul primește confirmare automată pe email.

Meniul digital e accesibil printr-un QR code de pe masă (dar și din website). Se actualizează instant din panoul admin — Marian schimbă un preț, și în 10 secunde se vede pe QR. Am adăugat și categorii (antipasti, paste, pizza, desert, băuturi) cu poze la fiecare preparat.

Am completat cu o galerie foto (interior, preparate, echipa), secțiune de evenimente private, și integrare Google Maps.`,
      challenge: `La Piazza este un restaurant italian din centrul Clujului, cu 60 de locuri. Marian, proprietarul, avea două probleme mari:

1. Rezervările se făceau doar prin telefon. Vinerea și sâmbăta, telefonul suna non-stop, iar personalul nu mai făcea față. Pierdeau 20-30% din rezervări pentru că oamenii nu răspundeau la confirmare sau sunau când era ocupat.

2. Meniul tipărit costa 800 RON de fiecare dată când schimbau un preț sau adăugau un preparat. „Avem 3 meniuri pe an — sezoniere — și de fiecare dată plătesc tipografia" ne-a spus Marian. Plus că vizitatorii de pe Google nu puteau vedea meniul înainte să ajungă la restaurant.`,
      processEn: `Week 1: We visited the restaurant, ate there (serious research 😄), photographed the interior, dishes, and discussed with Marian what features he needs. We delivered wireframes.

Week 2: Design in Figma + development: pages, reservation system, digital menu with categories and photos, admin panel.

Week 3: QR code generation, reservation system testing (tested with 15 fictional reservations), mobile optimization (70% of visitors are on phone), SEO, and launch.`,
      durationEn: '3 weeks',
      featuresEn: [
        'Dark design with restaurant ambiance — warm colors, suggested lighting',
        'Reservation system with date/time/party selection and optional note',
        'Digital menu with categories, prices, photos, and allergens',
        'QR code on table → menu opens instantly on phone',
        'Photo gallery with lightbox for interior and dishes',
        'Events section: private parties, corporate dinners, anniversaries',
        'Marian updates the menu from his phone — no programmer needed',
        'Mobile optimized — large buttons, readable text, natural scroll',
      ],
      solutionEn: `We created a dark-background website with warm lighting (amber, gold) reflecting the restaurant's atmosphere. We didn't want a generic restaurant site — we wanted the visitor to already feel La Piazza's ambiance from the screen.

We integrated an online reservation system: the customer chooses date, time, party size, and optionally adds a note (e.g., "wife's birthday, we want a table by the window"). Marian gets an email notification and confirms from the admin panel. The customer receives automatic email confirmation.

The digital menu is accessible via QR code from the table (and from the website). It updates instantly from the admin panel — Marian changes a price, and in 10 seconds it shows on QR. We added categories (antipasti, pasta, pizza, dessert, drinks) with photos for each dish.

We completed it with a photo gallery (interior, dishes, team), private events section, and Google Maps integration.`,
      challengeEn: `La Piazza is an Italian restaurant in central Cluj with 60 seats. Marian, the owner, had two major problems:

1. Reservations were phone-only. On Fridays and Saturdays, the phone rang non-stop, and staff couldn't keep up. They lost 20-30% of reservations because people didn't answer confirmations or called when the line was busy.

2. Printed menus cost 800 RON every time they changed a price or added a dish. "We have 3 menus per year — seasonal — and each time I pay the print shop" Marian told us. Plus Google visitors couldn't see the menu before arriving at the restaurant.`,
      testimonial: {
        name: 'Marian V.',
        role: 'Proprietar, La Piazza',
        quote: 'Cel mai bun lucru? Nu mai sună telefonul non-stop sâmbăta. Rezervările vin online, le confirm din panou, gata. Și meniul digital — clienții scanează QR-ul, văd pozele, și deja știu ce vor. Am economisit bani pe tipografie și am câștigat clienți din Google care înainte nici nu știau de noi.',
        quoteEn: 'Best thing? The phone doesn\'t ring non-stop on Saturdays anymore. Reservations come online, I confirm from the panel, done. And the digital menu — customers scan the QR, see the photos, and already know what they want. I saved money on printing and gained Google customers who didn\'t even know about us before.',
      },
      deliverables: [
        'Website complet cu 5 pagini: Acasă, Meniu, Rezervări, Galerie, Contact',
        'Sistem de rezervări online cu calendar, confirmare email, și panou admin',
        'Meniu digital accesibil prin QR code — se actualizează instant',
        'QR codes printate (am furnizat fișierele pentru suporturi de masă)',
        'Galerie foto cu 30+ poze profesionale de preparate și interior',
        'Secțiune evenimente private cu formular de cerere',
        'Panou admin: gestionare meniu, rezervări, poze, texte',
        'Integrare Google Maps și link direct la Google Reviews',
        'Design responsive — 70% din vizitatori sunt pe mobil',
      ],
      deliverablesEn: [
        'Complete website with 5 pages: Home, Menu, Reservations, Gallery, Contact',
        'Online reservation system with calendar, email confirmation, and admin panel',
        'QR-accessible digital menu — updates instantly',
        'Printed QR codes (we provided files for table stands)',
        'Photo gallery with 30+ professional food and interior photos',
        'Private events section with request form',
        'Admin panel: manage menu, reservations, photos, texts',
        'Google Maps integration and direct link to Google Reviews',
        'Responsive design — 70% of visitors are on mobile',
      ],
    },
  },
  {
    id: '3c47b5e4-945a-4414-aa10-6d3f0d560d68',
    sort_order: 11,
    category: 'webdev',
    title: 'ArcForm Studio',
    subtitle_ro: 'Construcții & Amenajări Interioare',
    subtitle_en: 'Construction & Interior Design',
    description_ro: 'Website bilingv (RO/EN) pentru o firmă de construcții și amenajări interioare, cu portofoliu, servicii, echipă, blog și cerere de ofertă online.',
    description_en: 'Bilingual (RO/EN) website for a construction and interior design firm, with portfolio, services, team, blog and online quote request.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Bilingv', 'WhatsApp'],
    image_url: '/portfolio/arcform.webp',
    live_url: 'https://4-two-rho.vercel.app',
    slug: 'arcform-studio',
    case_study: {
      year: '2025',
      price: '~1.500€',
      process: `Săptămâna 1-2: Digitalizare portofoliu — am selectat și procesat 150+ fotografii din proiectele anterioare. Shooting-uri suplimentare la 3 proiecte recent finalizate. Structura site-ului și wireframes.

Săptămâna 3: Design complet în Figma — identitate vizuală, sistem de componente, toate paginile. Aprobat de Alexandru după o rundă de revizii.

Săptămâna 4: Dezvoltare React bilingv — portofoliu cu filtru, galerii, formular ofertă cu validare, blog, WhatsApp button flotant.

Săptămâna 5: Conținut complet (texte, SEO, meta), testare cross-browser și cross-device, lansare, Google Search Console setup și primele indexări.`,
      results: [
        {
          label: 'Cereri de ofertă online în prima lună',
          value: '47',
          labelEn: 'Online quote requests in first month',
        },
        {
          label: 'Proiecte din alte orașe',
          value: '+300%',
          labelEn: 'Projects from other cities',
        },
        {
          label: 'Valoare medie proiect nou',
          value: '+45%',
          labelEn: 'Average value of new projects',
        },
        {
          label: 'Timp economisit în consultații telefonice',
          value: '15h/lună',
          labelEn: 'Time saved on phone consultations',
        },
      ],
      duration: '5 săptămâni',
      features: [
        'Design minimalist bold — fotografii mari, tipografie condensată, identitate vizuală puternică',
        'Portofoliu digital cu 30+ proiecte, galerii foto și filtrare pe categorii',
        'Formular inteligent cerere de ofertă — suprafață, buget, tip proiect, termen dorit',
        'Secțiunea Proces — pas cu pas de la consultație gratuită la recepție',
        'Blog cu articole despre tendințe în amenajări și sfaturi practice',
        'Pagina Echipă cu prezentarea architectului principal și colaboratorilor',
        'WhatsApp button flotant pentru contact rapid',
        'Bilingv RO/EN cu switch instant',
      ],
      solution: `Am construit un website bilingv (RO/EN) cu o identitate vizuală puternică — ArcForm trebuia să inspire încredere pentru proiecte de 30.000–200.000 EUR.

Design-ul e minimalist și bold: fotografii mari ale proiectelor, tipografie condensată, contrast puternic negru-alb cu accente beton. Transmite: știim ce facem și o să fie frumos.

Portofoliul digital a fost piesa centrală — 30+ proiecte organizate pe categorii (rezidențial, commercial, renovare, amenajare interioară), fiecare cu galerie de poze, suprafață, durată și locație. Clientul poate filtra exact ce vrea să vadă.

Formularul de cerere de ofertă e inteligent: clientul descrie proiectul, suprafața, bugetul orientativ, și primește în 24h o evaluare preliminară. Alexandru nu mai pierde timp la telefon cu proiecte care nu se potrivesc.

Secțiunea Proces explică pas cu pas cum lucrează ArcForm — de la consultație gratuită la recepția finală. Reduce anxietatea pentru proiecte mari.`,
      challenge: `ArcForm Studio este o firmă de construcții și amenajări interioare din București, cu 15 ani de experiență și peste 150 de proiecte finalizate. Alexandru Constantin, fondatorul, era recomandat exclusiv prin word-of-mouth — și asta era atât puterea cât și vulnerabilitatea firmei.

1. Nu aveau un portofoliu digital. Fotografiile proiectelor stăteau pe un hard disk extern. Când veneau clienți noi, Alexandru deschidea laptopul și le arăta pozele — neprof esional și ineficient.

2. Nu puteau accepta proiecte din alte orașe. Fără o prezență online serioasă, ArcForm era invizibil pentru clienții din Brașov, Cluj sau Iași care căutau firme de amenajări de calitate.

3. Site-ul temporar era un simplu one-pager cu număr de telefon. Nu exista formular de ofertă, nu existau prețuri orientative, nu existau recenzii.`,
      processEn: `Weeks 1-2: Portfolio digitization — we selected and processed 150+ photos from previous projects. Additional shootings at 3 recently completed projects. Site structure and wireframes.

Week 3: Complete design in Figma — visual identity, component system, all pages. Approved by Alexandru after one revision round.

Week 4: Bilingual React development — portfolio with filter, galleries, quote form with validation, blog, floating WhatsApp button.

Week 5: Complete content (texts, SEO, meta), cross-browser and cross-device testing, launch, Google Search Console setup and first indexing.`,
      durationEn: '5 weeks',
      featuresEn: [
        'Bold minimalist design — large photos, condensed typography, strong visual identity',
        'Digital portfolio with 30+ projects, photo galleries and category filtering',
        'Intelligent quote request form — area, budget, project type, desired timeline',
        'Process section — step by step from free consultation to handover',
        'Blog with articles about design trends and practical tips',
        'Team page presenting the lead architect and collaborators',
        'Floating WhatsApp button for quick contact',
        'Bilingual RO/EN with instant switch',
      ],
      solutionEn: `We built a bilingual (RO/EN) website with a strong visual identity — ArcForm needed to inspire confidence for projects of 30,000–200,000 EUR.

The design is minimalist and bold: large project photos, condensed typography, strong black-white contrast with concrete accents. It communicates: we know what we're doing and it will be beautiful.

The digital portfolio was the centerpiece — 30+ projects organized by categories (residential, commercial, renovation, interior design), each with photo gallery, area, duration and location. The client can filter exactly what they want to see.

The quote request form is intelligent: the client describes the project, area, indicative budget, and receives a preliminary assessment within 24h. Alexandru no longer wastes time on the phone with mismatched projects.

The Process section explains step by step how ArcForm works — from free consultation to final handover. Reduces anxiety for large projects.`,
      challengeEn: `ArcForm Studio is a construction and interior design firm from Bucharest with 15 years of experience and over 150 completed projects. Alexandru Constantin, the founder, was recommended exclusively through word-of-mouth — and that was both the strength and vulnerability of the firm.

1. They had no digital portfolio. Project photos sat on an external hard drive. When new clients came, Alexandru opened his laptop and showed them photos — unprofessional and inefficient.

2. They couldn't accept projects from other cities. Without a serious online presence, ArcForm was invisible to clients from Brașov, Cluj or Iași looking for quality renovation firms.

3. The temporary site was a simple one-pager with a phone number. No quote form, no indicative prices, no reviews.`,
      testimonial: {
        name: 'Alexandru C.',
        role: 'Fondator, ArcForm Studio',
        quote: 'Aveam proiecte superbe pe un hard disk. Acum le văd toți. În prima lună am primit 47 de cereri de ofertă online — mai mult decât în tot trimestrul trecut. Și calitatea proiectelor s-a schimbat: vin oameni cu buget real, care au văzut portofoliul și știu la ce să se aștepte.',
        quoteEn: 'I had superb projects on a hard drive. Now everyone sees them. In the first month I received 47 online quote requests — more than in the entire previous quarter. And the quality of projects has changed: people come with a real budget, having seen the portfolio and knowing what to expect.',
      },
      deliverables: [
        'Website bilingv complet cu 7 pagini + blog',
        'Portofoliu digital cu 30+ proiecte procesate și organizate pe categorii',
        'Shooting foto suplimentar la 3 proiecte recente',
        'Formular cerere ofertă cu notificare email și panou admin',
        'Secțiunea Proces cu 6 pași ilustrați',
        '5 articole de blog despre amenajări și tendințe',
        'Integrare WhatsApp Business cu mesaj pre-completat',
        'SEO pentru căutări naționale — prezență în toate orașele mari',
        'Google Business Profile optimizat cu toate proiectele',
      ],
      deliverablesEn: [
        'Complete bilingual website with 7 pages + blog',
        'Digital portfolio with 30+ processed and categorized projects',
        'Additional photo shooting at 3 recent projects',
        'Quote request form with email notification and admin panel',
        'Process section with 6 illustrated steps',
        '5 blog articles about interior design and trends',
        'WhatsApp Business integration with pre-filled message',
        'SEO for national searches — presence in all major cities',
        'Optimized Google Business Profile with all projects',
      ],
    },
  },
];
