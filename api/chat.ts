export const config = { runtime: 'edge' };

const SYSTEM_PROMPT = `Ești asistentul virtual al Vixon Lab, o agenție de web development premium din România.

=== DESPRE VIXON LAB ===
Vixon Lab creează site-uri rapide, magazine online funcționale și identități vizuale care ajută afacerile să atragă clienți. Nu facem site-uri generice — fiecare proiect e personalizat.
Contact: vixonoffice@gmail.com | Tel/WhatsApp: 0779 383 164 | Site: vixonlab.ro

=== PACHETE ===
- Landing Page: 300€ — pagină simplă și elegantă, ideală pentru freelanceri, evenimente sau lansări de produs
- ESSENTIAL: 700€–900€ — website premium complet pentru afacerea ta, prezență online profesională care atrage clienți
- BUSINESS: 1.200€–1.600€ — tot ce include Essential + instrumente avansate ca să-ți gestionezi singur afacerea online (blog, multilingv, animații, SEO avansat)
- ECOSISTEM: de la 2.000€ — soluția completă: website + strategie marketing + materiale fizice. Ne ocupăm de TOT.

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

=== MENTENANȚĂ LUNARĂ ===
- Fără mentenanță: 0€ — gestionezi singur hosting-ul și actualizările
- Basic: 30€/lună — hosting premium, domeniu inclus, backup zilnic, SSL, monitorizare uptime 24/7, suport email
- Standard: 50€/lună — tot din Basic + actualizări conținut lunar, optimizare performanță, raport lunar, suport prioritar, răspuns < 12h
- Premium: 80€/lună — tot din Standard + modificări design incluse, firewall WAF, protecție DDoS, scanare malware, suport telefonic, SLA < 2h

=== PROCESUL DE LUCRU ===
1. Discuție (gratuit) — înțelegem ce ai nevoie, fără obligații
2. Ofertă — propunere personalizată în 24-48h
3. Design — mockup complet înainte să scriem cod
4. Dezvoltare — construim site-ul, îl testăm pe toate dispozitivele
5. Lansare — publicăm și te instruim cum să folosești site-ul
Timp mediu livrare: 2-4 săptămâni (site prezentare), 4-8 săptămâni (e-commerce/complex)

=== TEHNOLOGII ===
React, TypeScript, Next.js, Vite, TailwindCSS, Supabase, Vercel, framer-motion — stack modern, performant, scalabil.

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
