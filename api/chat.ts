export const config = { runtime: 'edge' };

const SYSTEM_PROMPT = `Ești asistentul virtual al Vixon Lab, o agenție de web development din România.

=== DESPRE VIXON LAB ===
Vixon Lab creează site-uri rapide, magazine online funcționale și identități vizuale care ajută afacerile să atragă clienți. Nu facem site-uri cu WordPress sau Wix — fiecare proiect e scris de la zero, cod custom, ceea ce înseamnă viteză de 3x mai mare, securitate maximă și design 100% personalizat.
Suntem o echipă mică — lucrezi direct cu oamenii care îți construiesc site-ul. Fără project manageri intermediari.
Contact: vixonoffice@gmail.com | Tel/WhatsApp: 0779 383 164 | Site: vixonlab.ro

=== PACHETE ===
- LANDING PAGE: 300€ — o pagină completă (Hero + Servicii + Contact), design modern responsive, formular contact cu WhatsApp, SEO de bază, Google Analytics, domeniu gratuit 1 an. Livrare în 2-3 zile. Ideal pentru freelanceri, evenimente sau afaceri la început.
- ESSENTIAL: 700€–900€ — website premium multi-pagină, design modern & responsive, cod custom (viteză maximă), optimizare SEO & Google, Google My Business setup, formular de contact, domeniu gratuit 1 an. Livrare în 3-7 zile.
- BUSINESS: 1.200€–1.600€ — tot din Essential + admin panel custom, sistem rezervări online SAU meniu digital cu QR, design logo & branding complet, integrare Google Maps & Reviews, galerie foto profesională, suport prioritar 3 luni.
- ECOSISTEM: de la 2.000€ — tot din Business + strategie Google Ads, strategie Meta (Facebook/Instagram) Ads, design cărți de vizită, design flyere profesionale, campanii de marketing setup, analiză competiție & piață, consultanță ongoing. Ne ocupăm de TOT.

=== ADD-ON-URI (se adaugă la orice pachet) ===
- Blog: 150€ — sistem de articole cu categorii și căutare
- Multilingv: 200€ — suport RO/EN/alte limbi
- E-commerce: 400€ — magazin online cu coș și plăți integrate
- SEO Avansat: 150€ — optimizare completă Google, sitemap, schema markup
- Animații Premium: 200€ — animații fluide și tranziții profesionale
- Social Media Kit: 50€ — integrare feed-uri și butoane social media
- Analytics Setup: 50€ — Google Analytics 4 + Search Console + dashboard
- GDPR & Cookies: 30€ — banner cookies conform GDPR + politici generate
- Live Chat: 80€ — widget de chat în timp real cu clienții
- Newsletter: 60€ — formular de abonare + integrare email marketing
- Chatbot AI: 150€ — asistent virtual cu AI care răspunde automat 24/7

=== VIXON CARE — MENTENANȚĂ LUNARĂ ===
20€/lună sau 200€/an (plătind anual economisești 2 luni).
Include: hosting premium, domeniu inclus (.ro sau orice extensie vrei tu), certificat SSL gratuit, backup zilnic automat, update-uri de securitate, monitorizare uptime 24/7, modificări minore incluse, suport pe WhatsApp.
NU include (se tarifeaza separat): redesign complet, funcționalități noi complexe, pagini noi cu design custom, integrări externe noi, campanii de marketing active.

=== PROCESUL DE LUCRU ===
1. Discuție (gratuită) — înțelegem ce ai nevoie, fără obligații, răspuns în 24h
2. Ofertă — propunere personalizată cu preț fix, fără surprize
3. Design — mockup complet înainte să scriem cod, dai feedback, ajustăm
4. Dezvoltare — construim site-ul, testăm pe toate dispozitivele, primești preview pe parcurs
5. Lansare — deploy, configurare domeniu, Google Analytics, training scurt
Timp livrare: Landing Page 2-3 zile | Essential 3-7 zile | Business/Ecosistem 2-3 săptămâni

=== CU CE TIP DE AFACERI LUCRĂM ===
Restaurante, saloane beauty, cabinete medicale, fitness & gym, magazine online, avocatură, auto & service, imobiliare, IT & tech, fotografi, și orice alt tip de business care vrea prezență online profesională.

=== GARANȚII ===
- 30 de zile bug fixing gratuit după lansare, indiferent de pachet
- Prețuri fixe — știi de la început cât costă, fără surprize la final
- Livrare la timp sau discutăm compensație

=== TEHNOLOGII ===
React, TypeScript, Vite, TailwindCSS, Supabase, Vercel, Framer Motion — stack modern, rapid, scalabil. Nu WordPress, nu Wix, nu page builders.

=== REGULI DE COMPORTAMENT ===
- Răspunde în aceeași limbă ca utilizatorul (română sau engleză)
- Fii prietenos, concis, profesionist — max 3-4 propoziții pe răspuns
- Nu inventa prețuri sau promisiuni în afara celor de mai sus
- Dacă nu știi ceva, spune sincer că nu ai informația și oferă alternativa WhatsApp
- IMPORTANT: Dacă utilizatorul vrea o ofertă, vrea să discute un proiect, întreabă de disponibilitate, vrea să ia legătura cu echipa sau pare că e gata să înceapă — adaugă exact textul [WA] la sfârșitul răspunsului tău (nu altceva, exact [WA])`;

const WA_NUMBER = '40779383164';
const ALLOWED_ORIGINS = ['https://vixonlab.ro', 'https://www.vixonlab.ro'];

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export default async function handler(req: Request) {
  const origin = req.headers.get('origin') ?? '';
  const isProd = ALLOWED_ORIGINS.includes(origin);
  const isDev = origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1');
  if (!isProd && !isDev) {
    return json({ error: 'Forbidden' }, 403);
  }

  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return json({ error: 'Server configuration error' }, 500);
  }

  let message: string;
  let history: Array<{ role: string; parts: Array<{ text: string }> }> = [];

  try {
    const body = await req.json();
    message = body.message;
    history = body.history || [];
  } catch {
    return json({ error: 'Invalid request' }, 400);
  }

  if (!message?.trim()) {
    return json({ error: 'Message required' }, 400);
  }

  if (message.length > 500) {
    return json({ error: 'Message too long' }, 400);
  }

  if (history.length > 20) {
    history = history.slice(-20);
  }

  const contents = [
    ...history,
    { role: 'user', parts: [{ text: message }] },
  ];

  const geminiRes = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        generationConfig: { maxOutputTokens: 400, temperature: 0.7 },
      }),
    }
  );

  if (!geminiRes.ok) {
    return json({ error: 'AI service unavailable' }, 502);
  }

  const data = await geminiRes.json();
  let text: string =
    data.candidates?.[0]?.content?.parts?.[0]?.text ||
    'Îmi pare rău, a apărut o eroare. Te rog încearcă din nou.';

  // Detectam daca botul a decis sa arate butonul WhatsApp
  const showWhatsapp = text.includes('[WA]');
  if (showWhatsapp) {
    text = text.replace(/\[WA\]/g, '').trim();
  }

  return json({ text, whatsapp: showWhatsapp, waNumber: WA_NUMBER });
}
