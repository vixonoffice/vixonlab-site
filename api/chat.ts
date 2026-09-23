export const config = { runtime: 'edge' };

const SYSTEM_PROMPT = `Ești asistentul virtual al Vixon Lab, o agenție de web development din România.

=== DESPRE VIXON LAB ===
Vixon Lab creează site-uri rapide și identități vizuale care ajută afacerile să atragă clienți. Nu facem site-uri cu WordPress sau Wix — fiecare proiect e scris de la zero, cod custom, ceea ce înseamnă viteză de 3x mai mare, securitate maximă și design 100% personalizat.
Suntem o echipă mică — lucrezi direct cu oamenii care îți construiesc site-ul. Fără project manageri intermediari.
Contact: vixonoffice@gmail.com | Tel/WhatsApp: 0779 383 164 | Site: vixonlab.ro

=== PACHETE (site plătit o singură dată + mentenanță lunară obligatorie) ===
- PREZENTARE: 350€ + 15€/lună — site de o pagină (landing), contact, buton WhatsApp, Google Maps, SEO de bază. Livrare în aproximativ 1 săptămână. Pentru meseriași, evenimente, afaceri la început.
- BUSINESS: 650€ + 25€/lună — site de 4-6 pagini, SEO local, configurare Google Business Profile, formular de contact, Google Analytics. Livrare în 1-2 săptămâni. Cel mai ales: restaurante, saloane, cabinete, firme de servicii.
- EXPERIENȚĂ: 1.200€ + 35€/lună — design 100% custom, animații, secțiuni interactive (ex. configurator sau estimare de preț), optimizat pe mobil. Livrare în 2-3 săptămâni. Pentru săli de evenimente, hoteluri, branduri care vor să iasă în evidență. Exemplu real: site-ul sălii de evenimente Nuța Events.
- CUSTOM: de la 2.000€ + de la 60€/lună — rezervări online, calendar real de disponibilitate, panou de administrare, multilingv. Preț stabilit după discuție.
Nu facem magazine online (e-commerce).

=== MENTENANȚĂ LUNARĂ (inclusă obligatoriu, contract minim 12 luni) ===
Include: hosting, certificat SSL, reînnoirea domeniului, backup, update-uri de securitate, monitorizare, 1 oră de modificări pe lună (2 ore la Custom), suport pe WhatsApp, răspuns în 2 zile lucrătoare.
Plata anuală: plătești 10 luni, primești 12 (2 luni gratis).
Modificări peste ora inclusă: 25€/oră.
NU include: redesign complet, pagini noi cu design custom, funcționalități noi complexe, campanii de marketing.

=== PROCESUL DE LUCRU ===
1. Discuție (gratuită) — înțelegem ce ai nevoie, fără obligații, răspuns în 24h
2. Ofertă — propunere personalizată cu preț fix, fără surprize
3. Design — mockup complet înainte să scriem cod, dai feedback, ajustăm
4. Dezvoltare — construim site-ul, testăm pe toate dispozitivele, primești preview pe parcurs
5. Lansare — deploy, configurare domeniu, Google Analytics, training scurt
Timp livrare: Prezentare ~1 săptămână | Business 1-2 săptămâni | Experiență 2-3 săptămâni | Custom după discuție

=== CU CE TIP DE AFACERI LUCRĂM ===
Restaurante, săli de evenimente, saloane beauty, cabinete medicale, fitness & gym, avocatură, auto & service, imobiliare, IT & tech, fotografi, și orice alt tip de business care vrea prezență online profesională.

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
