import techstartImg from '@/assets/portfolio/techstart.jpg';
import shoplocalImg from '@/assets/portfolio/shoplocal.jpg';
import bellaboutiqueImg from '@/assets/portfolio/bellaboutique.jpg';
import casaverdeImg from '@/assets/portfolio/casaverde.jpg';
import lapiazzaImg from '@/assets/portfolio/lapiazza.jpg';
import fitlifeImg from '@/assets/portfolio/fitlife.jpg';

export interface CaseStudy {
  slug: string;
  title: string;
  category: 'webdev' | 'ecommerce' | 'design';
  subtitle: string;
  subtitleEn: string;
  desc: string;
  descEn: string;
  tags: string[];
  image: string;
  price: string;
  duration: string;
  durationEn: string;
  year: string;
  challenge: string;
  challengeEn: string;
  solution: string;
  solutionEn: string;
  process: string;
  processEn: string;
  results: { value: string; label: string; labelEn: string }[];
  deliverables: string[];
  deliverablesEn: string[];
  features: string[];
  featuresEn: string[];
  testimonial: { quote: string; quoteEn: string; name: string; role: string };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'techstart',
    title: 'TechStart SRL',
    category: 'webdev',
    subtitle: 'Website Corporate',
    subtitleEn: 'Corporate Website',
    desc: 'Website corporate modern pentru o firmă de software din București — 7 pagini, blog tehnic, panou de administrare, formular de contact cu notificări.',
    descEn: 'Modern corporate website for a software company in Bucharest — 7 pages, tech blog, admin panel, contact form with notifications.',
    tags: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'CMS'],
    image: techstartImg,
    price: '7.500 RON',
    duration: '4 săptămâni',
    durationEn: '4 weeks',
    year: '2025',

    challenge: `TechStart SRL este o firmă de software development din București, cu o echipă de 12 programatori. Când ne-au contactat, aveau un site vechi făcut pe WordPress acum 4 ani, care se încărca în 6-7 secunde. Nu aveau secțiune de blog (deși voiau să publice articole tehnice), nu aveau portofoliu vizibil, iar formularul de contact era stricat de câteva luni fără să știe.

Problema principală: site-ul nu genera niciun lead. Vizitatorii intrau, vedeau un design învechit care nu se potrivea cu nivelul tehnic al echipei, și plecau. Bounce rate-ul era de 72%. „Ne sună clienții doar din recomandări, site-ul nu ne aduce nimic" — ne-a spus Andrei, CEO-ul.`,

    challengeEn: `TechStart SRL is a software development company in Bucharest with a team of 12 developers. When they contacted us, they had an old WordPress site built 4 years ago that took 6-7 seconds to load. They had no blog section (despite wanting to publish technical articles), no visible portfolio, and their contact form had been broken for months without them knowing.

The main problem: the site generated zero leads. Visitors came in, saw an outdated design that didn't match the team's technical level, and left. Bounce rate was 72%. "Clients only call us from referrals, the site brings us nothing" — Andrei, the CEO, told us.`,

    solution: `Am reconstruit site-ul complet de la zero, pe un stack modern (React + TypeScript). Am ales un design dark-mode cu accente de albastru electric și verde, care transmite „tech company serioasă". 

Am structurat site-ul în 7 pagini: o pagină de Acasă cu hero puternic, statistici animate și secțiune de servicii; o pagină de Servicii cu descrieri detaliate și prețuri orientative; Portofoliu cu 6 case studies; Despre cu povestea echipei; Blog cu suport pentru articole tehnice (inclusiv formatare cod cu syntax highlighting); Contact cu formular validat; și FAQ.

Am construit și un panou de administrare prin care echipa lor poate adăuga articole pe blog, actualiza texte pe orice pagină, și vedea mesajele primite prin formularul de contact — totul fără să ne sune pe noi.`,

    solutionEn: `We rebuilt the site completely from scratch on a modern stack (React + TypeScript). We chose a dark-mode design with electric blue and green accents that communicates "serious tech company."

We structured the site into 7 pages: a Home page with strong hero, animated stats, and services section; a Services page with detailed descriptions and indicative pricing; Portfolio with 6 case studies; About with team story; Blog with support for technical articles (including code formatting with syntax highlighting); Contact with validated form; and FAQ.

We also built an admin panel where their team can add blog articles, update text on any page, and view messages received through the contact form — all without calling us.`,

    process: `Săptămâna 1: Am discutat cu Andrei și cu doi programatori din echipă. Am înțeles ce servicii oferă, ce ton vor (profesional dar nu rigid), și am analizat site-urile competitorilor lor. Am livrat wireframes pentru toate paginile.

Săptămâna 2: Am construit designul complet în Figma — fiecare pagină, versiune mobile și desktop. Am primit feedback, am ajustat culorile hero-ului și dimensiunea fonturilor pe mobile.

Săptămâna 3: Dezvoltare. Am codat toate paginile, am integrat CMS-ul, am setat blog-ul cu editor de articole, și am conectat formularul de contact la email.

Săptămâna 4: Testare pe 5 dispozitive diferite, optimizare viteza (am ajuns la 1.8s load time), SEO setup (meta tags, sitemap, schema markup), și lansare.`,

    processEn: `Week 1: We talked with Andrei and two developers from the team. We understood their services, desired tone (professional but not stiff), and analyzed competitor sites. We delivered wireframes for all pages.

Week 2: We built the complete design in Figma — every page, mobile and desktop versions. We received feedback, adjusted hero colors and mobile font sizes.

Week 3: Development. We coded all pages, integrated the CMS, set up the blog with article editor, and connected the contact form to email.

Week 4: Testing on 5 different devices, speed optimization (reached 1.8s load time), SEO setup (meta tags, sitemap, schema markup), and launch.`,

    results: [
      { value: '1.8s', label: 'Timp de încărcare (de la 6.5s)', labelEn: 'Load time (from 6.5s)' },
      { value: '3x', label: 'Mai multe cereri de ofertă pe lună', labelEn: 'More quote requests per month' },
      { value: '28%', label: 'Bounce rate (de la 72%)', labelEn: 'Bounce rate (from 72%)' },
      { value: '+150%', label: 'Trafic organic după 3 luni', labelEn: 'Organic traffic after 3 months' },
    ],

    deliverables: [
      'Website complet cu 7 pagini (Acasă, Servicii, Portofoliu, Despre, Blog, Contact, FAQ)',
      'Design responsive — arată bine pe telefon, tabletă și desktop',
      'Panou de administrare pentru texte, articole blog și mesaje contact',
      'Blog tehnic cu editor, categorii, și formatare automată pentru cod',
      'Formular de contact cu validare și notificări pe email',
      'SEO complet: meta tags pe fiecare pagină, sitemap, schema markup',
      'Integrare Google Analytics pentru monitorizare trafic',
      'Training 1 oră pentru echipă — cum să folosească panoul admin',
    ],
    deliverablesEn: [
      'Complete website with 7 pages (Home, Services, Portfolio, About, Blog, Contact, FAQ)',
      'Responsive design — looks great on phone, tablet, and desktop',
      'Admin panel for texts, blog articles, and contact messages',
      'Tech blog with editor, categories, and automatic code formatting',
      'Contact form with validation and email notifications',
      'Complete SEO: meta tags on each page, sitemap, schema markup',
      'Google Analytics integration for traffic monitoring',
      '1-hour team training — how to use the admin panel',
    ],

    features: [
      'Design dark-mode cu gradient albastru-verde — arată modern și tech',
      'Animații subtile la scroll (fade-in, slide-up) pentru o experiență plăcută',
      'Blog cu suport pentru cod formatat — ideal pentru articole tehnice',
      'CMS custom — echipa editează texte fără să știe programare',
      'Formular contact cu validare în timp real și mesaje de eroare clare',
      'Optimizat pentru Google — meta tags, heading-uri corecte, imagini comprimate',
      'Încărcare rapidă — sub 2 secunde pe orice dispozitiv',
      'Galerie portofoliu cu filtre pe categorii',
    ],
    featuresEn: [
      'Dark-mode design with blue-green gradient — modern and tech-looking',
      'Subtle scroll animations (fade-in, slide-up) for pleasant experience',
      'Blog with formatted code support — ideal for technical articles',
      'Custom CMS — team edits text without coding knowledge',
      'Contact form with real-time validation and clear error messages',
      'Google optimized — meta tags, correct headings, compressed images',
      'Fast loading — under 2 seconds on any device',
      'Portfolio gallery with category filters',
    ],

    testimonial: {
      quote: 'Am lucrat cu 3 agenții înainte și de fiecare dată rămâneam cu un site pe care nu-l puteam modifica singuri. Cu Vixon Lab a fost diferit — ne-au explicat totul, ne-au dat un panou simplu de administrare, și site-ul chiar arată ca o companie de software, nu ca un blog WordPress. În prima lună am primit 8 cereri de ofertă doar de pe site.',
      quoteEn: 'We worked with 3 agencies before and each time we ended up with a site we couldn\'t modify ourselves. With Vixon Lab it was different — they explained everything, gave us a simple admin panel, and the site actually looks like a software company, not a WordPress blog. In the first month we received 8 quote requests just from the site.',
      name: 'Andrei M.',
      role: 'CEO, TechStart SRL',
    },
  },
  {
    slug: 'shoplocal',
    title: 'ShopLocal',
    category: 'ecommerce',
    subtitle: 'Magazin Online',
    subtitleEn: 'Online Store',
    desc: 'Magazin online complet pentru produse tradiționale românești — miere, brânzeturi, dulcețuri, conserve — direct de la producătorii locali.',
    descEn: 'Complete online store for traditional Romanian products — honey, cheese, jams, preserves — directly from local producers.',
    tags: ['Next.js', 'Stripe', 'PostgreSQL', 'React'],
    image: shoplocalImg,
    price: '12.000 RON',
    duration: '6 săptămâni',
    durationEn: '6 weeks',
    year: '2025',

    challenge: `ShopLocal a pornit de la o idee simplă: producătorii locali din zona Brașov și Sibiu fac produse excelente (miere de salcâm, brânză de burduf, zacuscă, dulcețuri), dar nu au unde să vândă online. Vindeau doar în piețe de weekend și la târguri sezoniere.

Fondatoarea, Elena, încercase să facă un magazin pe Shopify, dar a renunțat după 2 luni — platforma nu se plia pe nevoile ei: nu putea pune povești despre producători, nu avea sistem de review-uri în română, și template-urile arătau generic. „Vreau ca oamenii să simtă că intră într-o piață locală, nu într-un Amazon mic" — ne-a spus.`,

    challengeEn: `ShopLocal started from a simple idea: local producers in the Brașov and Sibiu area make excellent products (acacia honey, burduf cheese, eggplant spread, jams), but have nowhere to sell online. They only sold at weekend markets and seasonal fairs.

The founder, Elena, had tried building a Shopify store but gave up after 2 months — the platform didn't fit her needs: she couldn't add producer stories, had no review system in Romanian, and templates looked generic. "I want people to feel like they're entering a local market, not a small Amazon" — she told us.`,

    solution: `Am construit platforma de la zero, cu un design pe fond deschis, culori calde (portocaliu, crem), care transmite „local, autentic, de încredere". 

Fiecare producător are pagină proprie cu povestea lui, locația, anii de experiență, și toate produsele sale. Clienții pot lăsa review-uri cu stele și text. Am pus badge-uri vizuale „Local" și „Bio" (cu font scris de mână, Caveat) pe produsele care se califică.

Catalogul are filtre pe categorii (miere, brânzeturi, conserve, vinuri, pâine), preț, și producător. Coșul de cumpărături e simplu — adaugi produse, vezi totalul, și plătești cu cardul prin Stripe. Am adăugat și livrare gratuită peste 150 RON, cu mesaj vizibil pe tot site-ul.

Am construit și un panou admin prin care Elena adaugă producători noi, actualizează prețuri, și vede comenzile primite.`,

    solutionEn: `We built the platform from scratch with a light-background design, warm colors (orange, cream) that communicate "local, authentic, trustworthy."

Each producer has their own page with their story, location, years of experience, and all products. Customers can leave star ratings and text reviews. We added visual "Local" and "Bio" badges (with handwritten Caveat font) on qualifying products.

The catalog has filters by category (honey, cheese, preserves, wines, bread), price, and producer. The shopping cart is simple — add products, see total, pay by card through Stripe. We added free shipping over 150 RON with a visible message across the site.

We also built an admin panel where Elena adds new producers, updates prices, and views received orders.`,

    process: `Săptămâna 1-2: Am discutat cu Elena și cu 3 producători. Am înțeles cum funcționează livrarea, ce produse au, și ce informații vor să apară pe pagina lor. Am făcut wireframes și am stabilit structura catalogului.

Săptămâna 3: Design complet în Figma — homepage cu categorii, pagina de produs cu galerie, coș, checkout, profil producător. Am testat 3 variante de card produs până am ales una care arăta bine și pe mobil.

Săptămâna 4-5: Dezvoltare: catalog, filtre, coș, integrare Stripe, sistem review-uri, panou admin. Am fotografiat 15 produse pentru a avea imagini de calitate la lansare.

Săptămâna 6: Testare, optimizare viteza, SEO, și lansare. Am instruit-o pe Elena cum să adauge produse și producători noi.`,

    processEn: `Week 1-2: We talked with Elena and 3 producers. We understood how delivery works, their products, and what info they want on their page. We created wireframes and established catalog structure.

Week 3: Complete design in Figma — homepage with categories, product page with gallery, cart, checkout, producer profile. We tested 3 product card variants until we chose one that looked good on mobile too.

Week 4-5: Development: catalog, filters, cart, Stripe integration, review system, admin panel. We photographed 15 products to have quality images at launch.

Week 6: Testing, speed optimization, SEO, and launch. We trained Elena on adding new products and producers.`,

    results: [
      { value: '50+', label: 'Producători înscriși în 6 luni', labelEn: 'Producers registered in 6 months' },
      { value: '10.000+', label: 'Comenzi livrate în primul an', labelEn: 'Orders delivered in first year' },
      { value: '4.9/5', label: 'Rating mediu de la clienți', labelEn: 'Average customer rating' },
      { value: '285 RON', label: 'Comandă medie', labelEn: 'Average order' },
    ],

    deliverables: [
      'Magazin online complet cu catalog, filtre, coș și plată online (Stripe)',
      'Pagină individuală pentru fiecare producător cu poveste și produse',
      'Sistem de review-uri cu stele și text — clienții lasă recenzii pe fiecare produs',
      'Badge-uri vizuale „Local" și „Bio" pe produsele care se califică',
      'Panou de administrare: adaugă produse, producători, vezi comenzi',
      'Design responsive — funcționează perfect pe telefon',
      'Livrare gratuită peste 150 RON cu mesaj vizibil pe tot site-ul',
      'SEO: fiecare produs are meta tags proprii, imagini optimizate',
      'Training pentru proprietară — cum să gestioneze magazinul singură',
    ],
    deliverablesEn: [
      'Complete online store with catalog, filters, cart, and online payment (Stripe)',
      'Individual page for each producer with story and products',
      'Review system with stars and text — customers leave reviews on each product',
      'Visual "Local" and "Bio" badges on qualifying products',
      'Admin panel: add products, producers, view orders',
      'Responsive design — works perfectly on phone',
      'Free shipping over 150 RON with visible message across site',
      'SEO: each product has its own meta tags, optimized images',
      'Owner training — how to manage the store independently',
    ],

    features: [
      'Design cald, pe fond deschis — simți că intri într-o piață locală',
      'Catalog cu filtre pe categorie, preț și producător',
      'Pagină producător cu povestea, locația și toți producătorii',
      'Badge-uri „Local" și „Bio" cu font scris de mână',
      'Coș de cumpărături persistent și checkout rapid',
      'Plată securizată cu cardul prin Stripe',
      'Sistem de review-uri în română',
      'Panou admin simplu — nu trebuie să fii programator',
    ],
    featuresEn: [
      'Warm, light-background design — feels like entering a local market',
      'Catalog with category, price, and producer filters',
      'Producer page with story, location, and all products',
      '"Local" and "Bio" badges with handwritten font',
      'Persistent shopping cart and quick checkout',
      'Secure card payment through Stripe',
      'Review system in Romanian',
      'Simple admin panel — no programming needed',
    ],

    testimonial: {
      quote: 'Eu nu mă pricep la site-uri, dar cu panoul pe care mi l-au făcut, adaug un produs nou în 5 minute. Producătorii sunt încântați că au pagina lor cu povestea lor. Și cel mai important — comenzile vin. În fiecare zi.',
      quoteEn: 'I\'m not tech-savvy, but with the panel they made me, I add a new product in 5 minutes. Producers love having their own page with their story. And most importantly — orders come in. Every day.',
      name: 'Elena D.',
      role: 'Fondator, ShopLocal',
    },
  },
  {
    slug: 'bellaboutique',
    title: 'Bella Boutique',
    category: 'design',
    subtitle: 'Identitate Vizuală & Website',
    subtitleEn: 'Visual Identity & Website',
    desc: 'Branding complet (logo, culori, tipografie) și website elegant pentru un boutique de modă premium de pe Dorobanți, București.',
    descEn: 'Complete branding (logo, colors, typography) and elegant website for a premium fashion boutique on Dorobanți, Bucharest.',
    tags: ['Figma', 'Illustrator', 'Branding', 'Website'],
    image: bellaboutiqueImg,
    price: '4.500 RON',
    duration: '3 săptămâni',
    durationEn: '3 weeks',
    year: '2024',

    challenge: `Bella Boutique este un magazin fizic de haine premium pentru femei, pe strada Dorobanți din București. Adriana, proprietara, vinde rochii din in, bluze de mătase, pantaloni din lână — piese de calitate, cu prețuri între 300 și 800 RON.

Problema: online, brandul arăta complet diferit față de experiența din magazin. Logo-ul vechi era făcut în Paint de un prieten, culorile de pe Instagram nu se potriveau, iar un website nu existau deloc. Adriana avea 2.000 de urmăritori pe Instagram și primea mesaje de la clienți din alte orașe care voiau să comande, dar nu avea cum să le vândă.

„Magazinul meu arată elegant, dar online arată ca un taraba" — ne-a spus la prima întâlnire.`,

    challengeEn: `Bella Boutique is a physical premium women's clothing store on Dorobanți street in Bucharest. Adriana, the owner, sells linen dresses, silk blouses, wool trousers — quality pieces priced between 300 and 800 RON.

The problem: online, the brand looked completely different from the in-store experience. The old logo was made in Paint by a friend, Instagram colors didn't match, and a website didn't exist at all. Adriana had 2,000 Instagram followers and received messages from customers in other cities wanting to order, but had no way to sell to them.

"My store looks elegant, but online it looks like a flea market" — she told us at the first meeting.`,

    solution: `Am început cu brandul. Am creat un logo nou elegant — textul „BELLA BOUTIQUE" în Cormorant Garamond (font serif, rafinat), cu o paletă de culori ivory și auriu-bej care reflectă atmosfera magazinului. Am livrat un manual de brand cu toate regulile: logo, culori (cu coduri exacte), fonturi, și exemple de utilizare corectă/incorectă.

Apoi am construit website-ul — minimalist, cu mult spațiu alb, imagini mari. Homepage-ul are un hero cu model în outfit, colecții featured, produse best-seller, editorial section cu filosofia brandului, și secțiune lookbook. Pagina de colecții are filtre pe categorie, mărime, culoare și material. Fiecare produs are galerie cu 4-5 poze și detalii despre material, îngrijire, și tabel de mărimi.

Am integrat și un formular de comandă simplificat — clienții aleg produsul, mărimea, și trimit cerere. Adriana confirmă manual și trimite prin curier.`,

    solutionEn: `We started with the brand. We created a new elegant logo — "BELLA BOUTIQUE" text in Cormorant Garamond (refined serif font), with an ivory and golden-beige color palette reflecting the store's atmosphere. We delivered a brand manual with all rules: logo, colors (with exact codes), fonts, and correct/incorrect usage examples.

Then we built the website — minimalist, with lots of whitespace, large images. The homepage has a hero with model in outfit, featured collections, best-seller products, editorial section with brand philosophy, and lookbook section. The collections page has filters by category, size, color, and material. Each product has a gallery with 4-5 photos and details about material, care, and size chart.

We also integrated a simplified order form — customers choose the product, size, and send a request. Adriana confirms manually and ships via courier.`,

    process: `Săptămâna 1: Am vizitat magazinul, am vorbit cu Adriana, am fotografiat interiorul și câteva produse. Am înțeles cine sunt clienții ei (femei 30-50 ani, profesioniste, care apreciază calitatea). Am prezentat 3 direcții de brand — a ales varianta „elegant minimalist".

Săptămâna 2: Am finalizat logo-ul, paleta de culori, tipografia. Am livrat manualul de brand (PDF de 12 pagini). Am trecut la design-ul website-ului în Figma — 6 pagini.

Săptămâna 3: Am codat website-ul, am integrat formularul de comandă, am optimizat imaginile (fiecare produs are 4-5 poze de calitate), am testat pe mobil, și am lansat.`,

    processEn: `Week 1: We visited the store, talked with Adriana, photographed the interior and some products. We understood her customers (women 30-50, professionals who appreciate quality). We presented 3 brand directions — she chose "elegant minimalist."

Week 2: We finalized the logo, color palette, typography. Delivered the brand manual (12-page PDF). Moved to website design in Figma — 6 pages.

Week 3: We coded the website, integrated the order form, optimized images (each product has 4-5 quality photos), tested on mobile, and launched.`,

    results: [
      { value: '3x', label: 'Trafic pe site față de Instagram', labelEn: 'Website traffic vs Instagram' },
      { value: '+120%', label: 'Comenzi din alte orașe', labelEn: 'Orders from other cities' },
      { value: '8.000+', label: 'Urmăritori noi pe Instagram în 3 luni', labelEn: 'New Instagram followers in 3 months' },
      { value: '92%', label: 'Clienți care revin', labelEn: 'Returning customers' },
    ],

    deliverables: [
      'Logo nou elegant (format vectorial, PNG, variante alb/negru)',
      'Manual de identitate vizuală — 12 pagini PDF (logo, culori, fonturi, reguli)',
      'Paletă de culori completă cu coduri HEX, RGB, CMYK',
      'Website cu 6 pagini: Acasă, Colecții, Lookbook, Despre, Contact, Produs detaliat',
      'Design responsive — elegant pe orice ecran',
      'Galerie produs cu 4-5 fotografii pe articol',
      'Formular de comandă online cu selecție mărime și culoare',
      'Integrare Instagram feed pe homepage',
      'Template-uri Instagram Stories (5 bucăți) în stilul nou',
    ],
    deliverablesEn: [
      'New elegant logo (vector, PNG, black/white variants)',
      'Visual identity manual — 12-page PDF (logo, colors, fonts, rules)',
      'Complete color palette with HEX, RGB, CMYK codes',
      'Website with 6 pages: Home, Collections, Lookbook, About, Contact, Product detail',
      'Responsive design — elegant on any screen',
      'Product gallery with 4-5 photos per item',
      'Online order form with size and color selection',
      'Instagram feed integration on homepage',
      'Instagram Stories templates (5 pieces) in new style',
    ],

    features: [
      'Design luxury minimalist — mult spațiu alb, imagini mari, tipografie elegantă',
      'Font serif Cormorant Garamond pentru headings — transmite rafinament',
      'Lookbook interactiv cu galerie masonry (imagini de mărimi diferite)',
      'Hover pe produs arată a doua poză (un alt unghi)',
      'Filtru pe colecții: categorie, mărime, culoare, material',
      'Secțiune „Despre Boutique" cu hartă și program magazin fizic',
      'Newsletter cu design minimalist — „Fără spam. Doar eleganță."',
      'Animații subtile, lente — fade-in, nu scale agresiv',
    ],
    featuresEn: [
      'Luxury minimalist design — lots of whitespace, large images, elegant typography',
      'Cormorant Garamond serif font for headings — communicates refinement',
      'Interactive lookbook with masonry gallery (varied-size images)',
      'Product hover shows second photo (different angle)',
      'Collection filter: category, size, color, material',
      '"About Boutique" section with map and physical store hours',
      'Newsletter with minimalist design — "No spam. Just elegance."',
      'Subtle, slow animations — fade-in, not aggressive scale',
    ],

    testimonial: {
      quote: 'În sfârșit am un brand care arată ca magazinul meu. Clienții din Cluj, Iași, Timișoara acum pot vedea produsele și comanda online. Logo-ul nou e superb — toate clientele au remarcat schimbarea. Și site-ul e atât de simplu încât și mama mea l-ar putea folosi.',
      quoteEn: 'I finally have a brand that looks like my store. Customers from Cluj, Iași, Timișoara can now see products and order online. The new logo is gorgeous — all clients noticed the change. And the site is so simple my mom could use it.',
      name: 'Adriana P.',
      role: 'Proprietar, Bella Boutique',
    },
  },
  {
    slug: 'lapiazza',
    title: 'La Piazza',
    category: 'webdev',
    subtitle: 'Restaurant & Rezervări',
    subtitleEn: 'Restaurant & Reservations',
    desc: 'Website pentru un restaurant italian din Cluj cu meniu digital QR, sistem de rezervări online, și galerie foto cu preparatele casei.',
    descEn: 'Website for an Italian restaurant in Cluj with QR digital menu, online reservation system, and food photo gallery.',
    tags: ['Next.js', 'Booking System', 'CMS', 'QR Code'],
    image: lapiazzaImg,
    price: '5.500 RON',
    duration: '3 săptămâni',
    durationEn: '3 weeks',
    year: '2025',

    challenge: `La Piazza este un restaurant italian din centrul Clujului, cu 60 de locuri. Marian, proprietarul, avea două probleme mari:

1. Rezervările se făceau doar prin telefon. Vinerea și sâmbăta, telefonul suna non-stop, iar personalul nu mai făcea față. Pierdeau 20-30% din rezervări pentru că oamenii nu răspundeau la confirmare sau sunau când era ocupat.

2. Meniul tipărit costa 800 RON de fiecare dată când schimbau un preț sau adăugau un preparat. „Avem 3 meniuri pe an — sezoniere — și de fiecare dată plătesc tipografia" ne-a spus Marian. Plus că vizitatorii de pe Google nu puteau vedea meniul înainte să ajungă la restaurant.`,

    challengeEn: `La Piazza is an Italian restaurant in central Cluj with 60 seats. Marian, the owner, had two major problems:

1. Reservations were phone-only. On Fridays and Saturdays, the phone rang non-stop, and staff couldn't keep up. They lost 20-30% of reservations because people didn't answer confirmations or called when the line was busy.

2. Printed menus cost 800 RON every time they changed a price or added a dish. "We have 3 menus per year — seasonal — and each time I pay the print shop" Marian told us. Plus Google visitors couldn't see the menu before arriving at the restaurant.`,

    solution: `Am creat un website pe fond închis, cu iluminare caldă (ambră, auriu) care reflectă atmosfera din restaurant. Nu am vrut un site generic de restaurant — am vrut ca vizitatorul să simtă deja ambianța La Piazza de pe ecran.

Am integrat un sistem de rezervări online: clientul alege data, ora, numărul de persoane, și opțional adaugă o notă (ex: „ziua soției, vrem masă lângă fereastră"). Marian primește notificare pe email și confirmă din panoul admin. Clientul primește confirmare automată pe email.

Meniul digital e accesibil printr-un QR code de pe masă (dar și din website). Se actualizează instant din panoul admin — Marian schimbă un preț, și în 10 secunde se vede pe QR. Am adăugat și categorii (antipasti, paste, pizza, desert, băuturi) cu poze la fiecare preparat.

Am completat cu o galerie foto (interior, preparate, echipa), secțiune de evenimente private, și integrare Google Maps.`,

    solutionEn: `We created a dark-background website with warm lighting (amber, gold) reflecting the restaurant's atmosphere. We didn't want a generic restaurant site — we wanted the visitor to already feel La Piazza's ambiance from the screen.

We integrated an online reservation system: the customer chooses date, time, party size, and optionally adds a note (e.g., "wife's birthday, we want a table by the window"). Marian gets an email notification and confirms from the admin panel. The customer receives automatic email confirmation.

The digital menu is accessible via QR code from the table (and from the website). It updates instantly from the admin panel — Marian changes a price, and in 10 seconds it shows on QR. We added categories (antipasti, pasta, pizza, dessert, drinks) with photos for each dish.

We completed it with a photo gallery (interior, dishes, team), private events section, and Google Maps integration.`,

    process: `Săptămâna 1: Am vizitat restaurantul, am mâncat acolo (research serios 😄), am fotografiat interiorul, preparatele, și am discutat cu Marian despre ce funcționalități are nevoie. Am livrat wireframes.

Săptămâna 2: Design în Figma + dezvoltare: pagini, sistem rezervări, meniu digital cu categorii și poze, panou admin.

Săptămâna 3: Generare QR codes, testare sistem rezervări (am testat cu 15 rezervări fictive), optimizare mobile (70% din vizitatori sunt pe telefon), SEO, și lansare.`,

    processEn: `Week 1: We visited the restaurant, ate there (serious research 😄), photographed the interior, dishes, and discussed with Marian what features he needs. We delivered wireframes.

Week 2: Design in Figma + development: pages, reservation system, digital menu with categories and photos, admin panel.

Week 3: QR code generation, reservation system testing (tested with 15 fictional reservations), mobile optimization (70% of visitors are on phone), SEO, and launch.`,

    results: [
      { value: '+250%', label: 'Rezervări în prima lună', labelEn: 'Reservations in first month' },
      { value: '0 RON', label: 'Costuri tipărire meniuri', labelEn: 'Menu printing costs' },
      { value: '+60%', label: 'Clienți noi din Google', labelEn: 'New clients from Google' },
      { value: '4.8/5', label: 'Rating pe Google (de la 4.2)', labelEn: 'Google rating (from 4.2)' },
    ],

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

    testimonial: {
      quote: 'Cel mai bun lucru? Nu mai sună telefonul non-stop sâmbăta. Rezervările vin online, le confirm din panou, gata. Și meniul digital — clienții scanează QR-ul, văd pozele, și deja știu ce vor. Am economisit bani pe tipografie și am câștigat clienți din Google care înainte nici nu știau de noi.',
      quoteEn: 'Best thing? The phone doesn\'t ring non-stop on Saturdays anymore. Reservations come online, I confirm from the panel, done. And the digital menu — customers scan the QR, see the photos, and already know what they want. I saved money on printing and gained Google customers who didn\'t even know about us before.',
      name: 'Marian V.',
      role: 'Proprietar, La Piazza',
    },
  },
  {
    slug: 'fitlife',
    title: 'FitLife Brand',
    category: 'design',
    subtitle: 'Kit Social Media',
    subtitleEn: 'Social Media Kit',
    desc: 'Pachet de 50+ template-uri editabile Figma pentru Instagram, Facebook și TikTok — pentru o sală de fitness din Timișoara cu 3 locații.',
    descEn: 'Package of 50+ editable Figma templates for Instagram, Facebook and TikTok — for a fitness gym in Timișoara with 3 locations.',
    tags: ['Figma', 'Social Media', 'Templates', 'Branding'],
    image: fitlifeImg,
    price: '2.500 RON',
    duration: '2 săptămâni',
    durationEn: '2 weeks',
    year: '2024',

    challenge: `FitLife este o sală de fitness din Timișoara cu 3 locații și circa 2.000 de abonați activi. Postau pe Instagram de 3-4 ori pe săptămână, dar fiecare postare arăta diferit: un angajat folosea Canva cu template-uri albastre, altul făcea poze cu telefonul direct din sală și punea text alb peste imagine, iar managerul de marketing făcea stories cu font-ul default de pe Instagram.

Rezultatul: feed-ul Instagram arăta ca un puzzle fără logică. Culorile săreau de la albastru la roșu la verde, fonturile se schimbau în fiecare postare, și nu exista nicio identitate vizuală recunoscibilă.

Bogdan, managerul, ne-a spus: „Am 3 oameni care postează și fiecare face ce vrea. Vreau să arătăm profesionist, dar nu avem buget de graphic designer full-time."`,

    challengeEn: `FitLife is a fitness gym in Timișoara with 3 locations and about 2,000 active members. They posted on Instagram 3-4 times per week, but each post looked different: one employee used Canva with blue templates, another took phone photos directly from the gym and put white text over the image, and the marketing manager made stories with Instagram's default font.

The result: the Instagram feed looked like a puzzle with no logic. Colors jumped from blue to red to green, fonts changed in every post, and there was no recognizable visual identity.

Bogdan, the manager, told us: "I have 3 people posting and each does whatever they want. I want us to look professional, but we don't have budget for a full-time graphic designer."`,

    solution: `Am creat un kit complet de template-uri în Figma, toate cu branding unitar. Am stabilit culorile (negru mat, verde neon #39FF14, portocaliu energic #FF6B00), fonturile (Bebas Neue pentru titluri, Inter pentru text), și stilul general: bold, energic, dar curat.

Kitul include:
— 20 template-uri pentru feed Instagram: promoții abonamente, programul orelor, testimoniale clienți, before/after, citat motivațional, prezentare antrenor, rezultate membri
— 15 template-uri Instagram Stories: sondaje, countdown, promo, quiz, reminder clasă
— 10 cover-uri și posturi Facebook: evenimente, oferte, recruitment
— 5 thumbnails TikTok: consistente cu restul brandului

Fiecare template are placeholder-e clare — echipa lui Bogdan deschide Figma, schimbă textul și poza, exportă, și postează. Am făcut și un ghid video de 10 minute care arată cum se editează.`,

    solutionEn: `We created a complete Figma template kit, all with unified branding. We established the colors (matte black, neon green #39FF14, energetic orange #FF6B00), fonts (Bebas Neue for titles, Inter for text), and overall style: bold, energetic, but clean.

The kit includes:
— 20 Instagram feed templates: membership promos, class schedules, client testimonials, before/after, motivational quotes, trainer introductions, member results
— 15 Instagram Stories templates: polls, countdowns, promos, quizzes, class reminders
— 10 Facebook covers and posts: events, offers, recruitment
— 5 TikTok thumbnails: consistent with the rest of the brand

Each template has clear placeholders — Bogdan's team opens Figma, changes text and photo, exports, and posts. We also made a 10-minute video guide showing how to edit.`,

    process: `Săptămâna 1: Am analizat contul lor de Instagram (ultimele 50 de postări), am văzut ce funcționează și ce nu. Am stabilit paleta de culori, fonturile, și stilul. Am livrat primele 10 template-uri pentru feedback.

Săptămâna 2: Am finalizat toate cele 50+ template-uri, am organizat fișierul Figma pe categorii, am livrat ghidul de culori/fonturi (PDF), și am înregistrat video-ul tutorial de 10 minute.`,

    processEn: `Week 1: We analyzed their Instagram account (last 50 posts), saw what works and what doesn't. We established color palette, fonts, and style. We delivered the first 10 templates for feedback.

Week 2: We finalized all 50+ templates, organized the Figma file by categories, delivered the color/font guide (PDF), and recorded the 10-minute tutorial video.`,

    results: [
      { value: '50+', label: 'Template-uri livrate', labelEn: 'Templates delivered' },
      { value: '-70%', label: 'Timp pe fiecare postare', labelEn: 'Time per post' },
      { value: '+200%', label: 'Engagement pe Instagram', labelEn: 'Instagram engagement' },
      { value: '100%', label: 'Consistență vizuală pe feed', labelEn: 'Feed visual consistency' },
    ],

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

    testimonial: {
      quote: 'Înainte pierdeam 2 ore pe o postare și tot nu arăta bine. Acum, unul din angajați face o postare în 15 minute, arată profesionist, și tot feed-ul e coerent. Am primit mesaje de la alte săli că „arată bine Instagramul vostru". Merită fiecare leu.',
      quoteEn: 'Before, I spent 2 hours on a post and it still didn\'t look good. Now, one employee makes a post in 15 minutes, it looks professional, and the whole feed is cohesive. We got messages from other gyms saying "your Instagram looks great." Worth every penny.',
      name: 'Bogdan T.',
      role: 'Manager, FitLife Timișoara',
    },
  },
  {
    slug: 'casaverde',
    title: 'CasaVerde',
    category: 'ecommerce',
    subtitle: 'Platformă Imobiliară',
    subtitleEn: 'Real Estate Platform',
    desc: 'Platformă completă de anunțuri imobiliare cu căutare avansată, hărți interactive, profil agenți, și formular multi-step pentru listare proprietăți.',
    descEn: 'Complete real estate listings platform with advanced search, interactive maps, agent profiles, and multi-step property listing form.',
    tags: ['Next.js', 'Maps API', 'PostgreSQL', 'Filters', 'CRM'],
    image: casaverdeImg,
    price: '18.000 RON',
    duration: '8 săptămâni',
    durationEn: '8 weeks',
    year: '2025',

    challenge: `CasaVerde a fost fondat de Radu, un fost agent imobiliar din București care s-a săturat de platformele existente. „Sunt pline de anunțuri false, filtrele nu funcționează, și arată ca în 2010" — ne-a spus.

Radu voia o platformă modernă care să rezolve 3 probleme: (1) căutare care chiar funcționează — cu filtre pe zonă, preț, camere, facilități, an construcție; (2) transparență — fiecare anunț verificat, fiecare agent cu profil, rating, și istoric; (3) experiență mobilă bună — 80% din vizitatori caută apartamente de pe telefon.

Bugetul era limitat, dar ambițiile erau mari. Am stabilit împreună care sunt funcționalitățile esențiale pentru lansare și care pot aștepta.`,

    challengeEn: `CasaVerde was founded by Radu, a former real estate agent in Bucharest who was tired of existing platforms. "They're full of fake listings, filters don't work, and they look like 2010" — he told us.

Radu wanted a modern platform solving 3 problems: (1) search that actually works — with filters by area, price, rooms, amenities, construction year; (2) transparency — every listing verified, every agent with profile, rating, and history; (3) good mobile experience — 80% of visitors search apartments from their phone.

Budget was limited but ambitions were big. We established together which features were essential for launch and which could wait.`,

    solution: `Am construit platforma în 8 săptămâni, cu un design pe fond deschis, verde emerald ca culoare principală (credibilitate, creștere), și un layout curat care pune proprietățile în prim-plan.

Homepage-ul are o bară de căutare mare cu filtre rapide (tip, locație, preț), proprietăți featured, statistici, secțiune agenți top, testimoniale, și ghiduri imobiliare.

Pagina de listări are sidebar cu filtre avansate (tip proprietate, tranzacție, preț, locație, camere, suprafață, an, facilități), sortare multiplă, și toggle între view grid/list/hartă. Pe hartă, fiecare proprietate apare ca marker — click pe marker arată card-ul proprietății.

Fiecare proprietate are pagină detaliată cu: galerie foto (lightbox, 24+ poze), preț mare vizibil, features grid (camere, suprafață, etaj, an), descriere completă, detalii tehnice (compartimentare, orientare, stare), features cu checkmark, hartă cu locația exactă, proprietăți similare, și card agent cu buton de contact.

Am construit și un formular multi-step pentru publicarea anunțurilor noi (5 pași: detalii bază, descriere, imagini, contact, preview), și pagină de profil agent cu rating, statistici, și lista de proprietăți.`,

    solutionEn: `We built the platform in 8 weeks, with a light-background design, emerald green as primary color (credibility, growth), and a clean layout that puts properties front and center.

The homepage has a large search bar with quick filters (type, location, price), featured properties, statistics, top agents section, testimonials, and real estate guides.

The listings page has a sidebar with advanced filters (property type, transaction, price, location, rooms, area, year, amenities), multiple sorting, and grid/list/map view toggle. On the map, each property appears as a marker — clicking shows the property card.

Each property has a detailed page with: photo gallery (lightbox, 24+ photos), large visible price, features grid (rooms, area, floor, year), complete description, technical details (layout, orientation, condition), checkmark features, map with exact location, similar properties, and agent card with contact button.

We also built a multi-step form for publishing new listings (5 steps: basic details, description, images, contact, preview), and agent profile page with rating, statistics, and property list.`,

    process: `Săptămâna 1-2: Am analizat platformele existente (Imobiliare.ro, OLX Imobiliare, Storia), am identificat ce le lipsește, și am făcut wireframes pentru toate paginile. Am stabilit baza de date: structura tabelelor pentru proprietăți, agenți, utilizatori, și review-uri.

Săptămâna 3-4: Design complet în Figma — homepage, listings cu filtre, pagina proprietate, profil agent, formular publicare. Am iterat de 3 ori pe design-ul card-ului de proprietate.

Săptămâna 5-6: Dezvoltare core: căutare cu filtre, pagini proprietate, galerie foto, integrare Google Maps cu markers.

Săptămâna 7: Formular multi-step, profil agent, sistem review-uri, panou admin.

Săptămâna 8: Testare, populate cu 50 proprietăți de test, optimizare performanță (imagini lazy-loaded, filtre instant), SEO, și lansare.`,

    processEn: `Week 1-2: We analyzed existing platforms (Imobiliare.ro, OLX Real Estate, Storia), identified what they're missing, and created wireframes for all pages. We established the database: table structure for properties, agents, users, and reviews.

Week 3-4: Complete design in Figma — homepage, listings with filters, property page, agent profile, publishing form. We iterated 3 times on the property card design.

Week 5-6: Core development: search with filters, property pages, photo gallery, Google Maps integration with markers.

Week 7: Multi-step form, agent profile, review system, admin panel.

Week 8: Testing, populated with 50 test properties, performance optimization (lazy-loaded images, instant filters), SEO, and launch.`,

    results: [
      { value: '2.400+', label: 'Anunțuri publicate în 6 luni', labelEn: 'Listings published in 6 months' },
      { value: '150+', label: 'Agenți cu profil activ', labelEn: 'Agents with active profile' },
      { value: '45.000', label: 'Vizitatori unici pe lună', labelEn: 'Unique visitors per month' },
      { value: '4.9/5', label: 'Notă de la utilizatori', labelEn: 'User rating' },
    ],

    deliverables: [
      'Platformă web completă cu homepage, listări, pagină proprietate, profil agent, contact',
      'Sistem de căutare cu 10+ filtre combinate (tip, preț, zonă, camere, suprafață, facilități)',
      'Integrare Google Maps cu marker-e interactive pe fiecare proprietate',
      'Galerie foto cu lightbox și suport pentru 24+ imagini per proprietate',
      'Formular multi-step în 5 pași pentru publicarea anunțurilor noi',
      'Profil agent cu rating, statistici, istoric, și lista proprietăți',
      'Sistem de review-uri și rating pentru agenți',
      'Toggle vizualizare: grid, listă, sau hartă',
      'Panou admin complet: gestionare proprietăți, agenți, utilizatori, anunțuri',
      'Design responsive — 80% din vizitatori sunt pe mobil',
      'SEO: schema markup pentru proprietăți, meta tags dinamice',
    ],
    deliverablesEn: [
      'Complete web platform with homepage, listings, property page, agent profile, contact',
      'Search system with 10+ combined filters (type, price, area, rooms, surface, amenities)',
      'Google Maps integration with interactive markers on each property',
      'Photo gallery with lightbox and support for 24+ images per property',
      '5-step multi-step form for publishing new listings',
      'Agent profile with rating, statistics, history, and property list',
      'Agent review and rating system',
      'View toggle: grid, list, or map',
      'Complete admin panel: manage properties, agents, users, listings',
      'Responsive design — 80% of visitors are on mobile',
      'SEO: property schema markup, dynamic meta tags',
    ],

    features: [
      'Căutare avansată cu filtre combinate — rezultate instant, fără refresh',
      'Hartă interactivă Google Maps — click pe marker, vezi proprietatea',
      'Galerie foto cu lightbox — navigare cu săgeți, zoom, fullscreen',
      'Card proprietate cu toate informațiile vizibile: preț, camere, suprafață, an',
      'Formular de publicare în 5 pași cu preview înainte de trimitere',
      'Profil agent profesional cu rating, nr. tranzacții, și specializare',
      'Funcție „Salvează proprietate" pentru a reveni mai târziu',
      'Design pe fond deschis cu verde emerald — transmite încredere',
      'Optimizat pentru mobil — filtre în drawer, imagini lazy-loaded',
      'Panou admin pentru gestionarea întregii platforme',
    ],
    featuresEn: [
      'Advanced search with combined filters — instant results, no refresh',
      'Interactive Google Maps — click marker, see property',
      'Photo gallery with lightbox — arrow navigation, zoom, fullscreen',
      'Property card with all info visible: price, rooms, area, year',
      '5-step publishing form with preview before submission',
      'Professional agent profile with rating, transactions, and specialization',
      '"Save property" feature to return later',
      'Light-background design with emerald green — communicates trust',
      'Mobile optimized — filters in drawer, lazy-loaded images',
      'Admin panel for managing the entire platform',
    ],

    testimonial: {
      quote: 'Am venit cu o idee și un buget. Echipa Vixon Lab mi-a spus sincer ce putem face acum și ce poate aștepta. Au livrat o platformă care arată și funcționează mai bine decât ce aveam în cap. Utilizatorii ne spun că e cel mai ușor de folosit site imobiliar pe care l-au încercat. Asta era visul.',
      quoteEn: 'I came with an idea and a budget. The Vixon Lab team told me honestly what we can do now and what can wait. They delivered a platform that looks and works better than what I had in mind. Users tell us it\'s the easiest real estate site they\'ve tried. That was the dream.',
      name: 'Radu I.',
      role: 'Fondator, CasaVerde',
    },
  },
];
