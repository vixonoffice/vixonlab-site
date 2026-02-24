import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

const WHATSAPP_NUMBER = "40758840269";

interface PreviewData {
  slug: string;
  business_name: string;
  category: string;
  phone: string | null;
  address: string | null;
  rating: number | null;
  nr_recenzii: number | null;
  are_website: string | null;
  template_type: string;
  views: number;
}

// ─── TEMPLATE CONFIGS ─────────────────────────────────────────────────────────
const TEMPLATES: Record<string, {
  accent: string; accentDark: string; accentLight: string;
  bg: string; bgCard: string; text: string; textMuted: string;
  heroImg: string; heroOverlay: string;
  emoji: string; tagline: string; subtitle: string;
  services: { icon: string; title: string; desc: string }[];
  stats: { value: string; label: string }[];
  gallery: string[];
  testimonials: { name: string; text: string; stars: number }[];
  whyUs: { icon: string; title: string; desc: string }[];
}> = {
  restaurant: {
    accent: "#e07b39", accentDark: "#c4622a", accentLight: "#f59e6b",
    bg: "#0f0800", bgCard: "#1a1000", text: "#fff8f0", textMuted: "#c4a882",
    heroImg: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80",
    heroOverlay: "linear-gradient(to bottom, rgba(15,8,0,0.5) 0%, rgba(15,8,0,0.3) 40%, rgba(15,8,0,0.95) 100%)",
    emoji: "🍽️", tagline: "O experiență culinară de neuitat",
    subtitle: "Bucătărie autentică, ingrediente proaspete, atmosferă caldă. Vă așteptăm să descoperiți gusturile care fac diferența.",
    services: [
      { icon: "🍕", title: "Meniu Variat", desc: "Preparate tradiționale și internaționale gătite cu pasiune" },
      { icon: "🥂", title: "Evenimente Private", desc: "Organizăm petreceri, aniversări și întâlniri de afaceri" },
      { icon: "🚗", title: "Parcare Gratuită", desc: "Acces facil, parcare proprie pentru clienți" },
      { icon: "📦", title: "Livrare la Domiciliu", desc: "Comanda preferată direct la ușa ta" },
      { icon: "🌿", title: "Ingrediente Locale", desc: "Susținem producătorii locali din Rm. Vâlcea" },
      { icon: "👨‍🍳", title: "Chef Experimentat", desc: "Peste 15 ani de experiență culinară" },
    ],
    stats: [{ value: "15+", label: "Ani de experiență" }, { value: "200+", label: "Preparate în meniu" }, { value: "5000+", label: "Clienți mulțumiți" }, { value: "4.8★", label: "Rating Google" }],
    gallery: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&h=400&fit=crop",
    ],
    testimonials: [
      { name: "Maria D.", text: "Cel mai bun restaurant din Rm. Vâlcea! Mâncarea e extraordinară și personalul super drăguț.", stars: 5 },
      { name: "Andrei P.", text: "Am organizat ziua de naștere aici și a fost perfect. Recomand cu căldură!", stars: 5 },
      { name: "Elena V.", text: "Atmosferă deosebită, prețuri corecte. Revenim cu drag de fiecare dată.", stars: 5 },
    ],
    whyUs: [
      { icon: "🏆", title: "Calitate Garantată", desc: "Ingrediente proaspete zilnic, fără compromisuri" },
      { icon: "⚡", title: "Servire Rapidă", desc: "Respectăm timpul dvs., servire în maxim 20 minute" },
      { icon: "💰", title: "Prețuri Corecte", desc: "Raport calitate-preț imbatabil în zonă" },
    ],
  },

  salon: {
    accent: "#d946a8", accentDark: "#b03490", accentLight: "#f472d0",
    bg: "#0d0010", bgCard: "#180020", text: "#fff0fc", textMuted: "#c9a0c0",
    heroImg: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=80",
    heroOverlay: "linear-gradient(to bottom, rgba(13,0,16,0.4) 0%, rgba(13,0,16,0.2) 40%, rgba(13,0,16,0.97) 100%)",
    emoji: "✂️", tagline: "Frumusețe și eleganță la cel mai înalt nivel",
    subtitle: "Transformă-ți look-ul cu ajutorul specialiștilor noștri. Tehnici moderne, produse premium, rezultate care vorbesc de la sine.",
    services: [
      { icon: "💇‍♀️", title: "Coafură & Styling", desc: "Tuns, vopsit, ondulat — toate tehnicile moderne" },
      { icon: "💅", title: "Manichiură & Pedichiură", desc: "Unghii perfecte cu produse de calitate superioară" },
      { icon: "✨", title: "Tratamente Faciale", desc: "Îngrijire profesională pentru un ten radiant" },
      { icon: "💆‍♀️", title: "Masaj Relaxant", desc: "Relaxare completă corp și minte" },
      { icon: "👰", title: "Machiaj Evenimente", desc: "Arată impecabil la nuntă, botez sau petrecere" },
      { icon: "🎨", title: "Colorare & Balayage", desc: "Tehnici moderne de colorare cu produse premium" },
    ],
    stats: [{ value: "10+", label: "Ani experiență" }, { value: "50+", label: "Servicii oferite" }, { value: "3000+", label: "Cliente fidele" }, { value: "4.9★", label: "Rating Google" }],
    gallery: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1633681122987-496e165ae0a3?w=600&h=400&fit=crop",
    ],
    testimonials: [
      { name: "Ioana M.", text: "Cel mai bun salon din oraș! Mă programez de 3 ani și sunt mereu încântată de rezultate.", stars: 5 },
      { name: "Cristina B.", text: "Atmosferă relaxantă, personal profesionist. M-au transformat complet pentru nuntă!", stars: 5 },
      { name: "Alexandra P.", text: "Prețuri excelente pentru calitatea serviciilor. Recomand tuturor prietenelor mele!", stars: 5 },
    ],
    whyUs: [
      { icon: "🏆", title: "Produse Premium", desc: "Lucrăm exclusiv cu branduri de top: Wella, L'Oréal, OPI" },
      { icon: "📅", title: "Programări Online", desc: "Rezervă rapid din aplicație, fără telefoane" },
      { icon: "💎", title: "Experiență Unică", desc: "Fiecare client e tratat ca o persoană specială" },
    ],
  },

  "service-auto": {
    accent: "#3b82f6", accentDark: "#1d4ed8", accentLight: "#60a5fa",
    bg: "#020814", bgCard: "#0a1020", text: "#eef2ff", textMuted: "#94a3b8",
    heroImg: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1920&q=80",
    heroOverlay: "linear-gradient(to bottom, rgba(2,8,20,0.5) 0%, rgba(2,8,20,0.3) 40%, rgba(2,8,20,0.97) 100%)",
    emoji: "🔧", tagline: "Service auto profesional — rapid și de încredere",
    subtitle: "Diagnosticare computerizată, mecanici autorizați, piese originale. Mașina ta e pe mâini bune.",
    services: [
      { icon: "🔍", title: "Diagnosticare Auto", desc: "Tester computerizat pentru orice marcă și model" },
      { icon: "🛢️", title: "Schimb Ulei & Filtre", desc: "Lubrifianți originali, schimb rapid în 30 minute" },
      { icon: "🛑", title: "Sistem Frânare", desc: "Plăcuțe, discuri, lichid de frână — siguranța ta pe primul loc" },
      { icon: "❄️", title: "Climatizare Auto", desc: "Reîncărcare freon, verificare și reparare AC" },
      { icon: "🔋", title: "Electrică Auto", desc: "Baterii, alternator, instalație electrică" },
      { icon: "🔩", title: "Suspensie & Direcție", desc: "Revizie completă a sistemului de rulare" },
    ],
    stats: [{ value: "12+", label: "Ani experiență" }, { value: "3500+", label: "Mașini reparate" }, { value: "98%", label: "Clienți mulțumiți" }, { value: "4.7★", label: "Rating Google" }],
    gallery: [
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1596227603798-af39f0f7cfab?w=600&h=400&fit=crop",
    ],
    testimonials: [
      { name: "Mihai C.", text: "Profesionalism desăvârșit! Mi-au rezolvat o problemă pe care alt service nu a găsit-o.", stars: 5 },
      { name: "Bogdan T.", text: "Prețuri corecte, lucrare de calitate. Singura firmă de încredere din Rm. Vâlcea.", stars: 5 },
      { name: "Florin A.", text: "Rapiditate și seriozitate. Mașina gata în aceeași zi. Recomand!", stars: 5 },
    ],
    whyUs: [
      { icon: "🏆", title: "Mecanici Autorizați", desc: "Echipă certificată RAR, experiență pe toate mărcile" },
      { icon: "⚡", title: "Lucrare în Zi", desc: "Majoritate intervenții rezolvate în aceeași zi" },
      { icon: "🛡️", title: "Garanție Lucrări", desc: "12 luni garanție pe orice intervenție efectuată" },
    ],
  },

  fitness: {
    accent: "#22c55e", accentDark: "#16a34a", accentLight: "#4ade80",
    bg: "#020b02", bgCard: "#071007", text: "#f0fff4", textMuted: "#86efac",
    heroImg: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80",
    heroOverlay: "linear-gradient(to bottom, rgba(2,11,2,0.5) 0%, rgba(2,11,2,0.2) 40%, rgba(2,11,2,0.97) 100%)",
    emoji: "💪", tagline: "Transformă-te. Fii mai puternic în fiecare zi.",
    subtitle: "Echipamente de ultimă generație, antrenori certificați, programe personalizate. Primul pas spre schimbare începe azi.",
    services: [
      { icon: "🏋️", title: "Sala de Forță", desc: "Echipamente premium, greutăți libere, aparate moderne" },
      { icon: "🧘", title: "Clase de Grup", desc: "Yoga, Pilates, Zumba, CrossFit — 20+ clase săptămânal" },
      { icon: "🥊", title: "Box & Kick-Box", desc: "Antrenamente intense pentru corp și minte" },
      { icon: "🏃", title: "Cardio Zone", desc: "Benzi alergare, biciclete, eliptice de ultimă generație" },
      { icon: "👤", title: "Antrenament Personal", desc: "Program personalizat cu antrenor dedicat" },
      { icon: "🥗", title: "Nutriție & Dietă", desc: "Consultanță nutrițională inclusă în abonament" },
    ],
    stats: [{ value: "500+", label: "Membri activi" }, { value: "15+", label: "Antrenori certificați" }, { value: "20+", label: "Clase săptămânale" }, { value: "4.9★", label: "Rating Google" }],
    gallery: [
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=600&h=400&fit=crop",
    ],
    testimonials: [
      { name: "Radu M.", text: "Am slăbit 15 kg în 4 luni cu ajutorul antrenorilor de aici. Cea mai bună decizie!", stars: 5 },
      { name: "Diana F.", text: "Sala este dotată excepțional, atmosfera este motivantă. Nu mai lipsesc!", stars: 5 },
      { name: "Cosmin B.", text: "Antrenorii sunt profesioniști adevărați. Programul personalizat a dat rezultate rapide.", stars: 5 },
    ],
    whyUs: [
      { icon: "🏆", title: "Echipamente Top", desc: "Investiție continuă în aparatură de ultimă generație" },
      { icon: "📅", title: "Program Extins", desc: "Deschis 06:00-23:00, 7 zile din 7" },
      { icon: "💰", title: "Abonamente Flexibile", desc: "Lunar, trimestrial sau anual — alegerea ta" },
    ],
  },

  clinica: {
    accent: "#38bdf8", accentDark: "#0284c7", accentLight: "#7dd3fc",
    bg: "#020c14", bgCard: "#071828", text: "#f0f9ff", textMuted: "#7dd3fc",
    heroImg: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1920&q=80",
    heroOverlay: "linear-gradient(to bottom, rgba(2,12,20,0.6) 0%, rgba(2,12,20,0.3) 40%, rgba(2,12,20,0.97) 100%)",
    emoji: "🦷", tagline: "Sănătatea ta, prioritatea noastră",
    subtitle: "Tehnologie de ultimă generație, medici specialiști, tratamente nedureroase. Zâmbetul perfect este la un pas distanță.",
    services: [
      { icon: "🦷", title: "Stomatologie Generală", desc: "Consultație, detartraj, obturații estetice" },
      { icon: "✨", title: "Albire Dentară", desc: "Proceduri profesionale pentru un zâmbet strălucitor" },
      { icon: "🔧", title: "Ortodonție", desc: "Aparate dentare fixe și mobile, aliniere perfectă" },
      { icon: "🏥", title: "Implantologie", desc: "Implanturi dentare de calitate superioară" },
      { icon: "👶", title: "Stomatologie Pediatrică", desc: "Îngrijire blândă pentru cei mici" },
      { icon: "🩺", title: "Radiologie Dentară", desc: "Radiografie 3D pentru diagnostic precis" },
    ],
    stats: [{ value: "8+", label: "Ani experiență" }, { value: "4000+", label: "Pacienți tratați" }, { value: "99%", label: "Satisfacție pacienti" }, { value: "4.8★", label: "Rating Google" }],
    gallery: [
      "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1588776814546-daab30f310ce?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop",
    ],
    testimonials: [
      { name: "Simona R.", text: "Medic excepțional, fără durere! Mi-a schimbat complet percepția față de stomatologi.", stars: 5 },
      { name: "Victor L.", text: "Cabinet modern, aparatură de top. Am făcut implant și totul a decurs perfect.", stars: 5 },
      { name: "Laura M.", text: "Recomand cu toată încrederea. Personal prietenos, proceduri impecabile.", stars: 5 },
    ],
    whyUs: [
      { icon: "🏆", title: "Medici Specialiști", desc: "Echipă cu formare în clinici din Europa" },
      { icon: "😌", title: "Fără Durere", desc: "Tehnici moderne de anestezie pentru confort maxim" },
      { icon: "💳", title: "Rate fără Dobândă", desc: "Tratamentele tale, plătite în rate convenabile" },
    ],
  },

  hotel: {
    accent: "#f59e0b", accentDark: "#d97706", accentLight: "#fbbf24",
    bg: "#0c0800", bgCard: "#181000", text: "#fffbf0", textMuted: "#d4b896",
    heroImg: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80",
    heroOverlay: "linear-gradient(to bottom, rgba(12,8,0,0.4) 0%, rgba(12,8,0,0.2) 40%, rgba(12,8,0,0.97) 100%)",
    emoji: "🏨", tagline: "Cazare de excepție în inima Vâlcii",
    subtitle: "Confort, eleganță și ospitalitate autentică. Fie că veniți în interes de afaceri sau pentru relaxare, avem totul pentru un sejur perfect.",
    services: [
      { icon: "🛏️", title: "Camere Premium", desc: "Camere elegante cu pat matrimonial, AC și TV Smart" },
      { icon: "🍳", title: "Mic Dejun Inclus", desc: "Bufet bogat cu preparate tradiționale și internaționale" },
      { icon: "🏊", title: "Piscină & SPA", desc: "Relaxare completă în spațiile noastre de wellness" },
      { icon: "🅿️", title: "Parcare Gratuită", desc: "Loc de parcare asigurat pentru fiecare cameră" },
      { icon: "📶", title: "WiFi Gratuit", desc: "Internet de mare viteză în toată unitatea" },
      { icon: "🤝", title: "Sală Conferințe", desc: "Spații moderne pentru evenimente de business" },
    ],
    stats: [{ value: "30+", label: "Camere disponibile" }, { value: "20+", label: "Ani de activitate" }, { value: "10k+", label: "Oaspeți anual" }, { value: "4.7★", label: "Rating Google" }],
    gallery: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop",
    ],
    testimonials: [
      { name: "Alexandru C.", text: "Cel mai confortabil hotel din zonă. Camera impecabilă, personalul extrem de amabil.", stars: 5 },
      { name: "Gabriela P.", text: "Mic dejun delicios, priveliște superbă. Vom reveni cu siguranță!", stars: 5 },
      { name: "Marian D.", text: "Locație perfectă, prețuri corecte. Recomand oricui vizitează Rm. Vâlcea.", stars: 5 },
    ],
    whyUs: [
      { icon: "🏆", title: "Locație Centrală", desc: "Acces facil la toate atracțiile orașului" },
      { icon: "💰", title: "Rezervare Directă", desc: "Prețuri mai bune față de Booking.com — fără comisioane" },
      { icon: "⭐", title: "Servicii Premium", desc: "Check-in 24/7, room service, concierge dedicat" },
    ],
  },

  constructor: {
    accent: "#f59e0b", accentDark: "#d97706", accentLight: "#fbbf24",
    bg: "#080808", bgCard: "#111111", text: "#f5f5f5", textMuted: "#9ca3af",
    heroImg: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80",
    heroOverlay: "linear-gradient(to bottom, rgba(8,8,8,0.6) 0%, rgba(8,8,8,0.3) 40%, rgba(8,8,8,0.97) 100%)",
    emoji: "🏗️", tagline: "Construim visuri. Garantăm calitate.",
    subtitle: "De la fundație la acoperiș — execuție impecabilă, respectarea termenelor și transparență totală în tot procesul de construcție.",
    services: [
      { icon: "🏠", title: "Construcții Civile", desc: "Case individuale, vile, blocuri de locuințe" },
      { icon: "🔨", title: "Renovări Complete", desc: "Modernizarea locuinței tale de la A la Z" },
      { icon: "🪟", title: "Amenajări Interioare", desc: "Design și execuție pentru spații de locuit și comerciale" },
      { icon: "🧱", title: "Zidărie & Tencuieli", desc: "Execuție manuală și mecanizată de calitate" },
      { icon: "🛁", title: "Instalații Sanitare", desc: "Montaj complet băi, bucătării, centrale termice" },
      { icon: "⚡", title: "Instalații Electrice", desc: "Tablouri electrice, prize, iluminat, automatizări" },
    ],
    stats: [{ value: "150+", label: "Proiecte finalizate" }, { value: "12+", label: "Ani experiență" }, { value: "100%", label: "Clienți mulțumiți" }, { value: "4.8★", label: "Rating Google" }],
    gallery: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    ],
    testimonials: [
      { name: "Ionel B.", text: "Casa visurilor mele, finalizată în termen și sub buget. Serioșii orașului!", stars: 5 },
      { name: "Carmen S.", text: "Renovare completă a apartamentului, lucrare impecabilă. Recomand cu toată încrederea.", stars: 5 },
      { name: "Gheorghe M.", text: "Profesioniști adevărați. Au rezolvat tot ce alții au refuzat să facă.", stars: 5 },
    ],
    whyUs: [
      { icon: "📋", title: "Contract Clar", desc: "Termeni, termene și prețuri stabilite înainte de începere" },
      { icon: "🛡️", title: "Garanție 5 Ani", desc: "Lucrările noastre sunt garantate. Punct." },
      { icon: "📸", title: "Portofoliu Real", desc: "Zeci de proiecte finalizate, fotografii reale, referințe verificabile" },
    ],
  },

  pizzerie: {
    accent: "#ef4444", accentDark: "#b91c1c", accentLight: "#f87171",
    bg: "#0f0500", bgCard: "#1a0800", text: "#fff8f5", textMuted: "#d4a090",
    heroImg: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1920&q=80",
    heroOverlay: "linear-gradient(to bottom, rgba(15,5,0,0.45) 0%, rgba(15,5,0,0.25) 40%, rgba(15,5,0,0.97) 100%)",
    emoji: "🍕", tagline: "Pizza artizanală la cuptor cu lemne",
    subtitle: "Aluat dospit 48 de ore, ingrediente proaspete zilnic, copt la 485°C în cuptor italian cu lemne. Fiecare pizza e o operă de artă.",
    services: [
      { icon: "🍕", title: "Pizza la Cuptor cu Lemne", desc: "Aluat clasic napoletan, topping premium, copt la 485°C" },
      { icon: "🍝", title: "Paste Proaspete", desc: "Paste făcute zilnic în casă, sosuri gătite tradițional" },
      { icon: "🥗", title: "Salate & Antipasti", desc: "Ingrediente proaspete, dressing-uri artizanale" },
      { icon: "🍰", title: "Deserturi Italiene", desc: "Tiramisù, Panna Cotta, Cannoli — rețete originale" },
      { icon: "📦", title: "Livrare la Domiciliu", desc: "Caldă și crocantă la ușa ta în 30 minute" },
      { icon: "🎉", title: "Evenimente & Petreceri", desc: "Organizăm aniversări, petreceri corporate, zilele de naștere" },
    ],
    stats: [{ value: "20+", label: "Tipuri de pizza" }, { value: "8+", label: "Ani în Rm. Vâlcea" }, { value: "4500+", label: "Comenzi lunare" }, { value: "4.8★", label: "Rating Google" }],
    gallery: [
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=600&h=400&fit=crop",
    ],
    testimonials: [
      { name: "Andrei M.", text: "Cea mai bună pizza din Rm. Vâlcea, fără nicio îndoială. Aluatul e perfect, ingredientele proaspete!", stars: 5 },
      { name: "Raluca B.", text: "Comandăm de 2 ani săptămânal. Consistentă, delicioasă, livrare rapidă. Top!", stars: 5 },
      { name: "Sorin P.", text: "Pizza Carbonara e o revelație. Nicăieri în oraș nu am mâncat ceva similar.", stars: 5 },
    ],
    whyUs: [
      { icon: "🔥", title: "Cuptor cu Lemne Italian", desc: "Temperatura de 485°C — crustă perfectă în 90 de secunde" },
      { icon: "🌿", title: "Ingrediente Certificate", desc: "Mozzarella DOP, roșii San Marzano, ulei de măsline extra virgin" },
      { icon: "⚡", title: "Livrare 30 Minute", desc: "Sau ridicare din local cu discount 10%" },
    ],
  },

  brutarie: {
    accent: "#d97706", accentDark: "#b45309", accentLight: "#fbbf24",
    bg: "#0c0700", bgCard: "#180e00", text: "#fffbf0", textMuted: "#c4a060",
    heroImg: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1920&q=80",
    heroOverlay: "linear-gradient(to bottom, rgba(12,7,0,0.4) 0%, rgba(12,7,0,0.2) 40%, rgba(12,7,0,0.97) 100%)",
    emoji: "🍞", tagline: "Pâine artizanală coaptă în fiecare dimineață",
    subtitle: "Aluat dospit natural, copt în cuptor cu vatră. Fără conservanți, fără aditivi — doar făină, apă, sare și măiestrie.",
    services: [
      { icon: "🍞", title: "Pâine Artizanală", desc: "Pâine neagră, graham, cu semințe, secară — coaptă zilnic" },
      { icon: "🥐", title: "Croissante & Viennoiserie", desc: "Croissante cu unt, pain au chocolat, brioche fresh" },
      { icon: "🎂", title: "Torturi la Comandă", desc: "Torturi personalizate pentru orice ocazie specială" },
      { icon: "🥖", title: "Cozonaci & Covrigi", desc: "Rețete tradiționale românești după bunica" },
      { icon: "☕", title: "Cafea & Gustări", desc: "Mic dejun complet, sandwichuri proaspete zilnic" },
      { icon: "🚚", title: "Livrare pentru Firme", desc: "Aprovizionare zilnică pentru restaurante, hoteluri, birouri" },
    ],
    stats: [{ value: "15+", label: "Ani de meserie" }, { value: "30+", label: "Sortimente zilnice" }, { value: "500+", label: "Kilograme coapte/zi" }, { value: "4.9★", label: "Rating Google" }],
    gallery: [
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1549931319-a545dcf3bc7c?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1587830736059-3b27d0dfdff0?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=600&h=400&fit=crop",
    ],
    testimonials: [
      { name: "Maria C.", text: "Miroase a pâine caldă de dimineață și gustul e exact cum îmi amintesc de la bunica. Vin zilnic!", stars: 5 },
      { name: "Tudor A.", text: "Cozonacii de Crăciun de aici sunt legendari în cartier. Toată familia e fan.", stars: 5 },
      { name: "Ioana P.", text: "Tortul personalizat pentru ziua fiicei mele a fost o capodoperă. Toți au cerut rețeta!", stars: 5 },
    ],
    whyUs: [
      { icon: "🌾", title: "Fără Conservanți", desc: "Ingrediente naturale, rețete tradiționale, zero aditivi" },
      { icon: "⏰", title: "Proaspăt în Fiecare Dimineață", desc: "Coacem de la 04:00 — pâinea e caldă când ajungi" },
      { icon: "🤝", title: "Furnizor de Încredere", desc: "Livrăm zilnic la restaurante, cantine și hoteluri din zonă" },
    ],
  },

  patiserie: {
    accent: "#f472b6", accentDark: "#db2777", accentLight: "#f9a8d4",
    bg: "#0f0008", bgCard: "#1a0010", text: "#fff0f8", textMuted: "#d4a0c0",
    heroImg: "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=1920&q=80",
    heroOverlay: "linear-gradient(to bottom, rgba(15,0,8,0.45) 0%, rgba(15,0,8,0.25) 40%, rgba(15,0,8,0.97) 100%)",
    emoji: "🥐", tagline: "Patiserie artizanală cu dragoste și rafinament",
    subtitle: "Croissante cu unt frantuzesc, eclere cu cremă de vanilie, macarons colorate — fiecare produs e creat cu pasiune și grijă pentru detalii.",
    services: [
      { icon: "🥐", title: "Viennoiserie Franceză", desc: "Croissante, pain au chocolat, brioche, danish — rețete originale" },
      { icon: "🎂", title: "Torturi Personalizate", desc: "Design unic pentru nunți, botezuri și aniversări" },
      { icon: "🍮", title: "Prăjituri Fine", desc: "Eclere, tarte, macarons, cheesecake — vitrina noastră e un spectacol" },
      { icon: "☕", title: "Cafea & Ceai Premium", desc: "Cafea specialty, ceaiuri artizanale, ciocolată caldă belgiană" },
      { icon: "🎁", title: "Cutii Cadou", desc: "Aranjamente de patiserie premium pentru cadouri corporate și personale" },
      { icon: "📅", title: "Comenzi cu Avans", desc: "Rezervă tortul sau platourile cu min. 48h înainte" },
    ],
    stats: [{ value: "12+", label: "Ani experiență" }, { value: "80+", label: "Produse zilnice" }, { value: "200+", label: "Torturi/lună" }, { value: "4.9★", label: "Rating Google" }],
    gallery: [
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1587306112565-7b49e7b46796?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&h=400&fit=crop",
    ],
    testimonials: [
      { name: "Alina D.", text: "Tortul de nuntă a fost visul meu — elegant, delicios și exact cum l-am imaginat. Merci din suflet!", stars: 5 },
      { name: "Bogdan M.", text: "Croissantele de duminică dimineață sunt un ritual în familia noastră. Incomparabile!", stars: 5 },
      { name: "Cristina V.", text: "Macarons-urile sunt la fel de bune ca în Paris. Serios. Cel mai bun loc din Vâlcea.", stars: 5 },
    ],
    whyUs: [
      { icon: "🧈", title: "Unt Franțuzesc AOP", desc: "Ingrediente premium importate — calitate care se simte la gust" },
      { icon: "🎨", title: "Design Personalizat", desc: "Fiecare tort e unic, creat după dorința dvs." },
      { icon: "💝", title: "Ambalaj de Lux", desc: "Cutii elegante, perfect pentru cadouri și evenimente speciale" },
    ],
  },

  pensiune: {
    accent: "#84cc16", accentDark: "#65a30d", accentLight: "#bef264",
    bg: "#030d00", bgCard: "#071500", text: "#f7ffe0", textMuted: "#9ab870",
    heroImg: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920&q=80",
    heroOverlay: "linear-gradient(to bottom, rgba(3,13,0,0.35) 0%, rgba(3,13,0,0.15) 40%, rgba(3,13,0,0.97) 100%)",
    emoji: "🏡", tagline: "Liniște, natură și ospitalitate autentică vâlceană",
    subtitle: "Ascunsă în mijlocul naturii, pensiunea noastră vă oferă un refugiu perfect departe de agitația orașului. Aer curat, mâncare tradițională și odihnă adevărată.",
    services: [
      { icon: "🛏️", title: "Camere & Apartamente", desc: "Camere confortabile cu vedere la munte, pat de calitate, linișite totală" },
      { icon: "🍳", title: "Mic Dejun Tradițional", desc: "Ouă de la găini proprii, brânzeturi locale, gem de casă, pâine coaptă zilnic" },
      { icon: "🌲", title: "Trasee Montane", desc: "Ghid local pentru drumeții, puncte de belvedere, floră și faună locală" },
      { icon: "🔥", title: "Grătar & Terasă", desc: "Loc de grătar amenajat, terasă panoramică, șezlonguri în grădină" },
      { icon: "🐴", title: "Activități Outdoor", desc: "Plimbări cu caii, pescuit, ciclism montan, ATV" },
      { icon: "🧖", title: "Relaxare & SPA Rustic", desc: "Saună cu lemne, baie cu plante, masaj tradițional" },
    ],
    stats: [{ value: "15+", label: "Camere disponibile" }, { value: "10+", label: "Ani de ospitalitate" }, { value: "2000+", label: "Turiști anual" }, { value: "4.9★", label: "Rating Google" }],
    gallery: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=600&h=400&fit=crop",
    ],
    testimonials: [
      { name: "Familia Ionescu", text: "Un colț de rai în Vâlcea. Mâncarea e extraordinară, gazdele minunate, natura de vis. Revenim!", stars: 5 },
      { name: "Marius D.", text: "Perfect pentru deconectare totală. Fără semnal, cu natură, aer curat și liniște. Exact ce aveam nevoie.", stars: 5 },
      { name: "Elena & Radu", text: "Weekend-ul de aniversare a fost magic. Mic dejun cu produse de la ei, plimbare în pădure — perfect.", stars: 5 },
    ],
    whyUs: [
      { icon: "🌿", title: "Produse Proprii", desc: "Ouă, legume, brânzeturi — totul de la gospodăria noastră" },
      { icon: "🏔️", title: "Locație de Excepție", desc: "Acces direct la natură, departe de zgomotul orașului" },
      { icon: "💰", title: "Rezervare Directă", desc: "Prețuri mai bune fără comisioane Booking.com" },
    ],
  },

  contabilitate: {
    accent: "#0ea5e9", accentDark: "#0284c7", accentLight: "#38bdf8",
    bg: "#020a14", bgCard: "#051220", text: "#f0f8ff", textMuted: "#7eb8d4",
    heroImg: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&q=80",
    heroOverlay: "linear-gradient(to bottom, rgba(2,10,20,0.65) 0%, rgba(2,10,20,0.4) 40%, rgba(2,10,20,0.97) 100%)",
    emoji: "📊", tagline: "Contabilitate expertă — vă ocupați de afacere, noi de cifre",
    subtitle: "Expert contabil autorizat CECCAR, experiență cu sute de firme din Vâlcea. Declarații fiscale, salarizare, consultanță financiară — totul la zi.",
    services: [
      { icon: "📋", title: "Contabilitate Completă", desc: "Evidență contabilă lunară, bilanțuri, situații financiare" },
      { icon: "💼", title: "Declarații Fiscale", desc: "Declarații ANAF la timp, fără penalități, fără stres" },
      { icon: "👥", title: "Salarizare & HR", desc: "State de plată, contracte, revisal, declarații ANAF" },
      { icon: "🏢", title: "Înființare Firmă", desc: "SRL, PFA, II — înregistrare rapidă, complet, fără bătăi de cap" },
      { icon: "📈", title: "Consultanță Financiară", desc: "Optimizare fiscală legală, planificare financiară, analiză business" },
      { icon: "🔍", title: "Audit & Verificare", desc: "Audit intern, pregătire pentru controale ANAF, regularizări" },
    ],
    stats: [{ value: "15+", label: "Ani experiență" }, { value: "300+", label: "Clienți activi" }, { value: "0", label: "Penalizări ANAF" }, { value: "4.9★", label: "Rating Google" }],
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1444653389962-8149286c578a?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
    ],
    testimonials: [
      { name: "SC Tech SRL", text: "Colaborăm de 8 ani. Nicio penalizare ANAF, declarații mereu la timp. Profesioniști adevărați!", stars: 5 },
      { name: "Mihaela P. (PFA)", text: "M-au ajutat să înțeleg taxele și să optimizez legal. Economisesc sute de euro pe an.", stars: 5 },
      { name: "Restaurant Valcea", text: "Gestionează contabilitatea a 3 firme ale noastre. Serioși, la obiect, disponibili oricând.", stars: 5 },
    ],
    whyUs: [
      { icon: "🏆", title: "Expert CECCAR", desc: "Autorizat, cu experiență în toate domeniile de activitate" },
      { icon: "⚡", title: "Răspuns în 24h", desc: "Disponibili pentru urgențe fiscale, nu vă lăsăm cu probleme" },
      { icon: "🔒", title: "Confidențialitate Totală", desc: "Datele dvs. financiare sunt tratate cu maximă discreție" },
    ],
  },

  farmacie: {
    accent: "#10b981", accentDark: "#059669", accentLight: "#34d399",
    bg: "#020e08", bgCard: "#041a10", text: "#f0fff8", textMuted: "#6ee7b7",
    heroImg: "https://images.unsplash.com/photo-1576602976047-174e57a47881?w=1920&q=80",
    heroOverlay: "linear-gradient(to bottom, rgba(2,14,8,0.6) 0%, rgba(2,14,8,0.35) 40%, rgba(2,14,8,0.97) 100%)",
    emoji: "💊", tagline: "Sănătatea dvs., misiunea noastră zilnică",
    subtitle: "Farmaciști cu experiență, sfaturi medicale gratuite, stoc complet de medicamente. Suntem alături de dvs. și familia dvs. în fiecare zi.",
    services: [
      { icon: "💊", title: "Medicamente Prescrise", desc: "Stoc complet, comandă rapidă pentru produse lipsă" },
      { icon: "🌿", title: "Suplimente & Naturiste", desc: "Vitamine, minerale, produse homeopate, fitoterapie" },
      { icon: "👶", title: "Produse Copii & Mame", desc: "Lapte praf, scutece, creme, medicamente pediatrice" },
      { icon: "💆", title: "Cosmetice & Dermatologie", desc: "Creme medicale, produse dermo-cosmetice, protecție solară" },
      { icon: "🩺", title: "Sfat Farmaceutic Gratuit", desc: "Consultație farmaceutică, interacțiuni medicamentoase, dozaj" },
      { icon: "📦", title: "Parafarmaceutice", desc: "Tensometre, glucometre, termometre, materiale sanitare" },
    ],
    stats: [{ value: "20+", label: "Ani de activitate" }, { value: "5000+", label: "Produse în stoc" }, { value: "300+", label: "Clienți zilnici" }, { value: "4.8★", label: "Rating Google" }],
    gallery: [
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1626863905121-3b0c0ed7b94c?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1583324113626-70df0f4deaab?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=600&h=400&fit=crop",
    ],
    testimonials: [
      { name: "Gheorghe A.", text: "Farmaciștii sunt extrem de amabili și de ajutor. Mereu găsesc ce am nevoie și primesc sfaturi utile.", stars: 5 },
      { name: "Nicoleta M.", text: "Singura farmacie unde merg cu încredere. Stoc complet, prețuri corecte, personal profesionist.", stars: 5 },
      { name: "Vasile C.", text: "Au comandat rapid un medicament care nu era în stoc. Disponibil a doua zi. Mulțumesc!", stars: 5 },
    ],
    whyUs: [
      { icon: "🟢", title: "Program Extins", desc: "Deschis 08:00-22:00 în fiecare zi, inclusiv weekend" },
      { icon: "👨‍⚕️", title: "Farmaciști Specializați", desc: "Echipă cu experiență, sfaturi corecte și complete" },
      { icon: "📋", title: "Comandă Rapidă", desc: "Orice medicament indisponibil — comandăm și livrăm în 24h" },
    ],
  },

  general: {
    accent: "#a78bfa", accentDark: "#7c3aed", accentLight: "#c4b5fd",
    bg: "#070712", bgCard: "#0f0f20", text: "#f0f0ff", textMuted: "#a0a0c0",
    heroImg: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80",
    heroOverlay: "linear-gradient(to bottom, rgba(7,7,18,0.5) 0%, rgba(7,7,18,0.3) 40%, rgba(7,7,18,0.97) 100%)",
    emoji: "⚡", tagline: "Profesionalism și calitate în tot ceea ce facem",
    subtitle: "O afacere locală cu valori solide, dedicată satisfacției clienților. Descoperiți ce ne face diferiți.",
    services: [
      { icon: "✅", title: "Serviciu 1", desc: "Descriere detaliată a serviciului principal oferit" },
      { icon: "✅", title: "Serviciu 2", desc: "Al doilea serviciu important pentru clienții noștri" },
      { icon: "✅", title: "Serviciu 3", desc: "Un alt serviciu de calitate în portofoliul nostru" },
      { icon: "✅", title: "Serviciu 4", desc: "Oferim soluții complete pentru nevoile dvs." },
    ],
    stats: [{ value: "10+", label: "Ani experiență" }, { value: "500+", label: "Clienți mulțumiți" }, { value: "100%", label: "Satisfacție" }, { value: "4.8★", label: "Rating Google" }],
    gallery: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop",
    ],
    testimonials: [
      { name: "Client A.", text: "Servicii excelente, personal profesionist. Recomand cu toată încrederea!", stars: 5 },
      { name: "Client B.", text: "Calitate superioară la prețuri corecte. Vom reveni cu siguranță.", stars: 5 },
    ],
    whyUs: [
      { icon: "🏆", title: "Calitate Garantată", desc: "Standarde înalte în tot ceea ce facem" },
      { icon: "⚡", title: "Promptitudine", desc: "Respectăm întotdeauna termenele promise" },
      { icon: "💰", title: "Prețuri Corecte", desc: "Transparență totală, fără costuri ascunse" },
    ],
  },
};

function getTemplate(type: string) {
  return TEMPLATES[type] || TEMPLATES.general;
}

// ─── COUNTER HOOK ─────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = Date.now();
        const tick = () => {
          const p = Math.min((Date.now() - start) / duration, 1);
          setCount(Math.floor(p * p * target));
          if (p < 1) requestAnimationFrame(tick);
          else setCount(target);
        };
        requestAnimationFrame(tick);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { ref, count };
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Preview() {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<PreviewData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      const { data: preview } = await supabase
        .from("previews").select("*").eq("slug", slug).single();
      if (preview) {
        setData(preview as PreviewData);
        await supabase.from("previews").update({
          views: (preview.views || 0) + 1,
          last_viewed_at: new Date().toISOString(),
        }).eq("slug", slug);
      }
      setLoading(false);
    })();
  }, [slug]);

  if (loading) return (
    <div style={{ background: "#070712", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ color: "#a78bfa", fontSize: 20, animation: "pulse 1.5s infinite" }}>Se încarcă...</div>
    </div>
  );

  if (!data) return (
    <div style={{ background: "#070712", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ color: "#fff", textAlign: "center" }}><div style={{ fontSize: 64 }}>404</div><p style={{ color: "#555" }}>Preview indisponibil</p></div>
    </div>
  );

  const t = getTemplate(data.template_type);
  const waMsg = encodeURIComponent(`Bună ziua! Am văzut site-ul demo pentru ${data.business_name} și sunt interesat. Putem discuta?`);
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`;

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: t.bg, color: t.text, overflowX: "hidden" }}>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
        @keyframes shimmer { 0% { background-position:-200% 0; } 100% { background-position:200% 0; } }
        .fade-up { animation: fadeUp 0.7s ease forwards; }
        .preview-card { transition: transform 0.2s, box-shadow 0.2s; }
        .preview-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
        .gallery-img { transition: transform 0.4s; overflow: hidden; }
        .gallery-img:hover img { transform: scale(1.05); }
        .gallery-img img { transition: transform 0.4s; width:100%; height:200px; object-fit:cover; display:block; }
        .wa-btn { transition: transform 0.15s, box-shadow 0.15s; }
        .wa-btn:hover { transform: scale(1.03); box-shadow: 0 8px 30px #25d36688; }
      `}</style>

      {/* TOP BANNER */}
      <div style={{ background: `${t.accent}18`, borderBottom: `1px solid ${t.accent}40`, padding: "10px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13 }}>
        <span>⚡ Demo creat de <strong style={{ color: t.accent }}>Vixon Lab</strong> — Acesta este cum ar putea arăta site-ul dvs.</span>
        <a href="https://vixonlab.ro" style={{ color: t.accent, textDecoration: "none", fontWeight: 700, fontSize: 12 }}>vixonlab.ro →</a>
      </div>

      {/* HERO */}
      <section style={{ position: "relative", minHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src={t.heroImg} alt="hero" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="eager" />
          <div style={{ position: "absolute", inset: 0, background: t.heroOverlay }} />
        </div>
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "120px 20px 80px", maxWidth: 800, margin: "0 auto" }} className="fade-up">
          <div style={{ display: "inline-block", padding: "6px 18px", borderRadius: 40, border: `1px solid ${t.accent}60`, background: `${t.accent}20`, fontSize: 13, color: t.accent, marginBottom: 24, fontWeight: 600 }}>
            {t.emoji} {data.category.charAt(0).toUpperCase() + data.category.slice(1)} • Rm. Vâlcea
          </div>
          <h1 style={{ fontSize: "clamp(36px, 7vw, 72px)", fontWeight: 900, lineHeight: 1.1, margin: "0 0 20px", letterSpacing: "-1px" }}>
            {data.business_name}
          </h1>
          <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: t.textMuted, maxWidth: 600, margin: "0 auto 36px", lineHeight: 1.6 }}>
            {t.tagline}
          </p>
          {data.rating && (
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)", padding: "10px 24px", borderRadius: 40, marginBottom: 36, border: "1px solid rgba(255,255,255,0.2)" }}>
              <span style={{ color: "#fbbf24", fontSize: 20 }}>★★★★★</span>
              <span style={{ fontWeight: 700, fontSize: 18 }}>{data.rating}</span>
              <span style={{ color: t.textMuted, fontSize: 14 }}>({data.nr_recenzii} recenzii Google)</span>
            </div>
          )}
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            {data.phone && (
              <a href={`tel:${data.phone}`} style={{ background: t.accent, color: "#000", padding: "15px 32px", borderRadius: 10, textDecoration: "none", fontWeight: 800, fontSize: 16, display: "inline-flex", alignItems: "center", gap: 8 }}>
                📞 {data.phone}
              </a>
            )}
            <a href={waLink} target="_blank" rel="noopener noreferrer" style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)", border: `1px solid ${t.accent}50`, color: t.text, padding: "15px 32px", borderRadius: 10, textDecoration: "none", fontWeight: 700, fontSize: 16 }}>
              💬 WhatsApp
            </a>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)", animation: "pulse 2s infinite", color: t.accent, fontSize: 24 }}>↓</div>
      </section>

      {/* STATS */}
      <section style={{ background: `linear-gradient(135deg, ${t.accent}25, ${t.accent}10)`, borderTop: `1px solid ${t.accent}30`, borderBottom: `1px solid ${t.accent}30`, padding: "50px 20px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 20, textAlign: "center" }}>
          {t.stats.map((s, i) => {
            const num = parseInt(s.value.replace(/\D/g, ""));
            const suffix = s.value.replace(/[\d]/g, "");
            return <StatBox key={i} num={num} suffix={suffix} label={s.label} accent={t.accent} />;
          })}
        </div>
      </section>

      {/* DESPRE NOI */}
      <section style={{ maxWidth: 1000, margin: "0 auto", padding: "80px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <div style={{ color: t.accent, fontWeight: 700, fontSize: 13, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Despre noi</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, marginBottom: 20, lineHeight: 1.2 }}>
              De ce aleg clienții <span style={{ color: t.accent }}>{data.business_name}</span>?
            </h2>
            <p style={{ color: t.textMuted, lineHeight: 1.8, fontSize: 16, marginBottom: 32 }}>
              {t.subtitle}
            </p>
            {data.address && (
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start", color: t.textMuted, fontSize: 14, marginBottom: 12 }}>
                <span style={{ color: t.accent, fontSize: 18 }}>📍</span>
                <span>{data.address}</span>
              </div>
            )}
            {data.phone && (
              <div style={{ display: "flex", gap: 10, alignItems: "center", color: t.textMuted, fontSize: 14 }}>
                <span style={{ color: t.accent, fontSize: 18 }}>📞</span>
                <a href={`tel:${data.phone}`} style={{ color: t.accent, textDecoration: "none", fontWeight: 600 }}>{data.phone}</a>
              </div>
            )}
          </div>
          <div style={{ display: "grid", gap: 16 }}>
            {t.whyUs.map((w, i) => (
              <div key={i} className="preview-card" style={{ background: t.bgCard, border: `1px solid ${t.accent}25`, borderRadius: 12, padding: "20px 24px", display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ fontSize: 28, flexShrink: 0 }}>{w.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>{w.title}</div>
                  <div style={{ color: t.textMuted, fontSize: 14, lineHeight: 1.5 }}>{w.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICII */}
      <section style={{ background: t.bgCard, padding: "80px 20px", borderTop: `1px solid ${t.accent}20`, borderBottom: `1px solid ${t.accent}20` }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ color: t.accent, fontWeight: 700, fontSize: 13, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Ce oferim</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800 }}>Serviciile noastre</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {t.services.map((s, i) => (
              <div key={i} className="preview-card" style={{ background: t.bg, border: `1px solid ${t.accent}25`, borderRadius: 14, padding: 24, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${t.accent}, transparent)` }} />
                <div style={{ fontSize: 36, marginBottom: 12 }}>{s.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{s.title}</div>
                <div style={{ color: t.textMuted, fontSize: 14, lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERIE */}
      <section style={{ maxWidth: 1000, margin: "0 auto", padding: "80px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ color: t.accent, fontWeight: 700, fontSize: 13, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Galerie foto</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800 }}>Imagini din activitatea noastră</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
          {t.gallery.map((src, i) => (
            <div key={i} className="gallery-img" style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${t.accent}20` }}>
              <img src={src} alt={`galerie ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALE */}
      <section style={{ background: t.bgCard, padding: "80px 20px", borderTop: `1px solid ${t.accent}20`, borderBottom: `1px solid ${t.accent}20` }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ color: t.accent, fontWeight: 700, fontSize: 13, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Ce spun clienții</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800 }}>Recenzii reale Google</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {t.testimonials.map((t2, i) => (
              <div key={i} className="preview-card" style={{ background: t.bg, border: `1px solid ${t.accent}25`, borderRadius: 14, padding: 24 }}>
                <div style={{ color: "#fbbf24", fontSize: 18, marginBottom: 12 }}>{"★".repeat(t2.stars)}</div>
                <p style={{ color: t.textMuted, lineHeight: 1.7, marginBottom: 16, fontStyle: "italic", fontSize: 15 }}>"{t2.text}"</p>
                <div style={{ fontWeight: 700, color: t.accent }}>— {t2.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ padding: "100px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>🚀</div>
          <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, marginBottom: 16, lineHeight: 1.2 }}>
            Îți place cum arată <span style={{ color: t.accent }}>{data.business_name}</span> online?
          </h2>
          <p style={{ color: t.textMuted, fontSize: 18, marginBottom: 12, lineHeight: 1.7 }}>
            Acesta este un <strong style={{ color: t.text }}>demo gratuit</strong> creat special pentru dvs. Site-ul real va include conținutul și fotografiile dvs. actuale, optimizat pentru Google.
          </p>
          <p style={{ color: t.textMuted, fontSize: 15, marginBottom: 40 }}>
            Livrare în <strong style={{ color: t.accent }}>7-10 zile</strong> · Hosting inclus · Fără abonamente ascunse
          </p>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="wa-btn" style={{
            display: "inline-flex", alignItems: "center", gap: 12,
            background: "#25d366", color: "#fff", padding: "18px 44px",
            borderRadius: 12, textDecoration: "none", fontWeight: 800, fontSize: 20,
            boxShadow: "0 8px 32px #25d36644"
          }}>
            <span style={{ fontSize: 24 }}>💬</span> Vreau site-ul meu real
          </a>
          <p style={{ color: "#555", fontSize: 13, marginTop: 16 }}>Discuție gratuită, fără obligații · Răspundem în maxim 1 oră</p>
        </div>
      </section>

      {/* FOOTER */}
      <div style={{ borderTop: `1px solid ${t.accent}20`, padding: "24px 20px", textAlign: "center", fontSize: 13, color: "#555" }}>
        <span>Demo creat de </span>
        <a href="https://vixonlab.ro" style={{ color: t.accent, textDecoration: "none", fontWeight: 700 }}>Vixon Lab</a>
        <span> — Agenție de Web Development & Design · România</span>
      </div>
    </div>
  );
}

function StatBox({ num, suffix, label, accent }: { num: number; suffix: string; label: string; accent: string }) {
  const { ref, count } = useCountUp(num);
  return (
    <div ref={ref}>
      <div style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, color: accent }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: 14, opacity: 0.7, marginTop: 4 }}>{label}</div>
    </div>
  );
}
