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

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Server configuration error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let message: string;
  let history: Array<{ role: string; parts: Array<{ text: string }> }> = [];

  try {
    const body = await req.json();
    message = body.message;
    history = body.history || [];
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!message?.trim()) {
    return new Response(JSON.stringify({ error: 'Message required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const contents = [
    ...history,
    { role: 'user', parts: [{ text: message }] },
  ];

  const geminiRes = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
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

  return new Response(JSON.stringify({ text }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
