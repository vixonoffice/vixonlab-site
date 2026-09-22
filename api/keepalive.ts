export const config = { runtime: 'edge' };

// Supabase Free tier pune proiectul pe pauza dupa ~7 zile fara activitate.
// Cron-ul din vercel.json loveste ruta asta zilnic si face un SELECT real,
// ca sa tina baza de date treaza.
const KEEPALIVE_TABLE = 'pricing_plans';

export default async function handler(req: Request) {
  // Vercel ataseaza automat "Authorization: Bearer <CRON_SECRET>" pe invocarile
  // de cron, daca variabila CRON_SECRET e setata in proiect. Daca nu e setata,
  // ruta ramane publica (dar nu expune nimic sensibil).
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && req.headers.get('authorization') !== `Bearer ${cronSecret}`) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Missing Supabase env vars' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const startedAt = Date.now();

  try {
    const res = await fetch(
      `${supabaseUrl}/rest/v1/${KEEPALIVE_TABLE}?select=id&limit=1`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      },
    );

    const durationMs = Date.now() - startedAt;

    if (!res.ok) {
      return new Response(
        JSON.stringify({
          ok: false,
          status: res.status,
          durationMs,
          error: await res.text(),
        }),
        { status: 502, headers: { 'Content-Type': 'application/json' } },
      );
    }

    return new Response(
      JSON.stringify({
        ok: true,
        table: KEEPALIVE_TABLE,
        durationMs,
        checkedAt: new Date().toISOString(),
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        ok: false,
        durationMs: Date.now() - startedAt,
        error: err instanceof Error ? err.message : String(err),
      }),
      { status: 502, headers: { 'Content-Type': 'application/json' } },
    );
  }
}
