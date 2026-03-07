export const config = { runtime: 'edge' };

const SYSTEM_PROMPT = `Ești asistentul virtual al Vixon Lab, o agenție de web development premium din România.

Ce face Vixon Lab:
- Site-uri de prezentare profesionale
- Magazine online (e-commerce)
- Aplicații web personalizate
- Optimizare SEO & performanță
- Mentenanță lunară și suport tehnic

Prețuri orientative:
- Site prezentare: de la 500€
- E-commerce: de la 1200€
- Aplicație custom: la cerere

Timp mediu de livrare: 2-4 săptămâni pentru site-uri, 4-8 săptămâni pentru e-commerce.

Reguli:
- Răspunde în aceeași limbă ca utilizatorul (română sau engleză)
- Fii prietenos, concis, profesionist
- Răspunsuri scurte (max 3-4 propoziții)
- Pentru detalii specifice sau ofertă personalizată, îndrumă spre pagina /contact
- Nu inventa prețuri exacte pentru proiecte complexe`;

const ALLOWED_ORIGINS = ['https://vixonlab.ro', 'https://www.vixonlab.ro'];

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export default async function handler(req: Request) {
  // CORS — only allow requests from vixonlab.ro
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

  // Limit message length to prevent abuse
  if (message.length > 500) {
    return json({ error: 'Message too long' }, 400);
  }

  // Limit history depth to last 10 exchanges
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
    return new Response(JSON.stringify({ error: 'AI service unavailable' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const data = await geminiRes.json();
  const text =
    data.candidates?.[0]?.content?.parts?.[0]?.text ||
    'Îmi pare rău, a apărut o eroare. Te rog încearcă din nou.';

  return json({ text });
}
