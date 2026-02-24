import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

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

// ─── Paleta pe tip de business ────────────────────────────────────────────────
const THEMES: Record<string, { bg: string; accent: string; text: string; hero: string; emoji: string; tagline: string }> = {
  restaurant: {
    bg: "#1a0a00", accent: "#e07b39", text: "#fff8f0",
    hero: "linear-gradient(135deg, #1a0a00 0%, #3d1a00 100%)",
    emoji: "🍽️", tagline: "O experiență culinară de neuitat"
  },
  salon: {
    bg: "#1a0a1a", accent: "#e879a0", text: "#fff0f8",
    hero: "linear-gradient(135deg, #1a0a1a 0%, #3d0a2a 100%)",
    emoji: "✂️", tagline: "Frumusețe și eleganță la cel mai înalt nivel"
  },
  "service-auto": {
    bg: "#0a0f1a", accent: "#3b82f6", text: "#f0f4ff",
    hero: "linear-gradient(135deg, #0a0f1a 0%, #0a1a3d 100%)",
    emoji: "🔧", tagline: "Service auto profesional — rapid și de încredere"
  },
  fitness: {
    bg: "#0a1a0a", accent: "#22c55e", text: "#f0fff0",
    hero: "linear-gradient(135deg, #0a1a0a 0%, #0a3d1a 100%)",
    emoji: "💪", tagline: "Transformă-te. Fii mai puternic în fiecare zi."
  },
  clinica: {
    bg: "#0a1a2a", accent: "#38bdf8", text: "#f0faff",
    hero: "linear-gradient(135deg, #0a1a2a 0%, #0a2a3d 100%)",
    emoji: "🦷", tagline: "Îngrijire profesională pentru sănătatea ta"
  },
  hotel: {
    bg: "#1a1000", accent: "#f59e0b", text: "#fffbf0",
    hero: "linear-gradient(135deg, #1a1000 0%, #3d2a00 100%)",
    emoji: "🏨", tagline: "Cazare de excepție — confort și relaxare garantate"
  },
  florarie: {
    bg: "#0a1a0a", accent: "#ec4899", text: "#fff0f8",
    hero: "linear-gradient(135deg, #0a1a0a 0%, #1a0a1a 100%)",
    emoji: "🌸", tagline: "Flori proaspete pentru fiecare moment special"
  },
  cofetarie: {
    bg: "#1a0a00", accent: "#f97316", text: "#fff8f0",
    hero: "linear-gradient(135deg, #1a0a00 0%, #2a1000 100%)",
    emoji: "🎂", tagline: "Dulciuri artizanale cu dragoste și pasiune"
  },
  constructor: {
    bg: "#0f0f0f", accent: "#f59e0b", text: "#f5f5f5",
    hero: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)",
    emoji: "🏗️", tagline: "Construim visuri. Garantăm calitate."
  },
  curatenie: {
    bg: "#0a1a2a", accent: "#06b6d4", text: "#f0faff",
    hero: "linear-gradient(135deg, #0a1a2a 0%, #0a2030 100%)",
    emoji: "✨", tagline: "Curățenie profesională — spații impecabile"
  },
  general: {
    bg: "#0f0f1a", accent: "#a78bfa", text: "#f0f0ff",
    hero: "linear-gradient(135deg, #0f0f1a 0%, #1a0a2a 100%)",
    emoji: "⚡", tagline: "Profesionalism și calitate în tot ceea ce facem"
  },
};

const WHATSAPP_NUMBER = "40758840269";

export default function Preview() {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<PreviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      const { data: preview, error } = await supabase
        .from("previews")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error || !preview) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setData(preview as PreviewData);
      setLoading(false);

      // Track vizita
      await supabase
        .from("previews")
        .update({
          views: (preview.views || 0) + 1,
          last_viewed_at: new Date().toISOString(),
        })
        .eq("slug", slug);
    })();
  }, [slug]);

  if (loading) {
    return (
      <div style={{ background: "#0f0f1a", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#a78bfa", fontSize: 18 }}>Se încarcă...</div>
      </div>
    );
  }

  if (notFound || !data) {
    return (
      <div style={{ background: "#0f0f1a", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#fff", textAlign: "center" }}>
          <div style={{ fontSize: 48 }}>404</div>
          <p style={{ color: "#888" }}>Preview-ul nu a fost găsit.</p>
        </div>
      </div>
    );
  }

  const theme = THEMES[data.template_type] || THEMES.general;
  const waMessage = encodeURIComponent(`Bună ziua! Am văzut preview-ul site-ului pentru ${data.business_name} și sunt interesat. Putem discuta?`);
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

  return (
    <div style={{ fontFamily: "'Segoe UI', Arial, sans-serif", background: theme.bg, minHeight: "100vh", color: theme.text }}>

      {/* BANNER VIXON */}
      <div style={{
        background: "rgba(0,0,0,0.6)",
        borderBottom: `1px solid ${theme.accent}33`,
        padding: "8px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: 12,
        color: "#aaa"
      }}>
        <span>⚡ <strong style={{ color: theme.accent }}>Vixon Lab</strong> — Demo website creat special pentru {data.business_name}</span>
        <a href="https://vixonlab.ro" style={{ color: theme.accent, textDecoration: "none", fontWeight: 600 }}>vixonlab.ro →</a>
      </div>

      {/* HERO */}
      <div style={{
        background: theme.hero,
        padding: "80px 20px 60px",
        textAlign: "center",
        borderBottom: `1px solid ${theme.accent}33`,
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>{theme.emoji}</div>
        <h1 style={{
          fontSize: "clamp(28px, 6vw, 52px)",
          fontWeight: 800,
          margin: "0 0 12px",
          color: "#fff",
          textShadow: `0 0 40px ${theme.accent}66`
        }}>
          {data.business_name}
        </h1>
        <p style={{ fontSize: 18, color: `${theme.text}cc`, marginBottom: 32, maxWidth: 500, margin: "0 auto 32px" }}>
          {theme.tagline}
        </p>
        {data.rating && (
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.1)", padding: "8px 20px", borderRadius: 40, marginBottom: 32 }}>
            <span style={{ color: "#fbbf24", fontSize: 18 }}>★</span>
            <strong style={{ fontSize: 18 }}>{data.rating}</strong>
            <span style={{ color: "#aaa", fontSize: 14 }}>({data.nr_recenzii} recenzii Google)</span>
          </div>
        )}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          {data.phone && (
            <a href={`tel:${data.phone}`} style={{
              background: theme.accent,
              color: "#000",
              padding: "14px 28px",
              borderRadius: 8,
              textDecoration: "none",
              fontWeight: 700,
              fontSize: 16,
              display: "inline-flex",
              alignItems: "center",
              gap: 8
            }}>
              📞 {data.phone}
            </a>
          )}
        </div>
      </div>

      {/* INFO CARDS */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20, marginBottom: 48 }}>
          {data.address && (
            <div style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${theme.accent}33`, borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>📍</div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>Adresă</div>
              <div style={{ color: "#aaa", fontSize: 14 }}>{data.address}</div>
            </div>
          )}
          <div style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${theme.accent}33`, borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>🏷️</div>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Categorie</div>
            <div style={{ color: "#aaa", fontSize: 14, textTransform: "capitalize" }}>{data.category}</div>
          </div>
          {data.phone && (
            <div style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${theme.accent}33`, borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>📱</div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>Contact</div>
              <div style={{ color: theme.accent, fontSize: 14 }}>{data.phone}</div>
            </div>
          )}
        </div>

        {/* SECTIUNE SERVICII (placeholder) */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Serviciile noastre</h2>
          <p style={{ color: "#888", marginBottom: 32 }}>Acesta este un demo — site-ul real va conține toate serviciile dvs.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
            {["Serviciu 1", "Serviciu 2", "Serviciu 3", "Serviciu 4"].map((s, i) => (
              <div key={i} style={{
                background: `${theme.accent}11`,
                border: `1px solid ${theme.accent}33`,
                borderRadius: 10,
                padding: 20,
                fontSize: 14,
                color: theme.accent
              }}>
                ✓ {s}
              </div>
            ))}
          </div>
        </div>

        {/* CTA PRINCIPAL */}
        <div style={{
          background: `linear-gradient(135deg, ${theme.accent}22, ${theme.accent}11)`,
          border: `2px solid ${theme.accent}`,
          borderRadius: 16,
          padding: "40px 32px",
          textAlign: "center"
        }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🚀</div>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Îți place cum arată?</h2>
          <p style={{ color: "#aaa", marginBottom: 24, maxWidth: 400, margin: "0 auto 24px" }}>
            Putem construi site-ul real pentru <strong>{data.business_name}</strong> în 7-10 zile,
            cu toate serviciile dvs., fotografii reale și SEO optimizat.
          </p>
          <a href={waLink} target="_blank" rel="noopener noreferrer" style={{
            background: "#25d366",
            color: "#fff",
            padding: "16px 36px",
            borderRadius: 10,
            textDecoration: "none",
            fontWeight: 700,
            fontSize: 18,
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            boxShadow: "0 4px 20px #25d36644"
          }}>
            💬 Vorbim pe WhatsApp
          </a>
          <p style={{ color: "#666", fontSize: 12, marginTop: 12 }}>Fără obligații. Discuție de 5 minute.</p>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{
        borderTop: `1px solid ${theme.accent}22`,
        padding: "20px",
        textAlign: "center",
        fontSize: 12,
        color: "#555"
      }}>
        Demo creat de <a href="https://vixonlab.ro" style={{ color: theme.accent, textDecoration: "none" }}>Vixon Lab</a> — Web Development & Design România
      </div>
    </div>
  );
}
