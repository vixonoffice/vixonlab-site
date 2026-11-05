// Markdown simplu -> HTML, sigur by construction.
//
// Regula: orice caracter din continut este escapat INAINTE sa se aplice formatarea, deci HTML-ul brut
// din text nu ajunge niciodata in DOM. Singurele taguri din rezultat sunt cele generate aici, iar URL-urile
// din linkuri / imagini trec printr-o lista de scheme permise (http, https, mailto, cale relativa).

const ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

export function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ESCAPES[c]);
}

/** Primeste un URL deja escapat; intoarce '#' daca schema nu e permisa. */
function safeUrl(escapedUrl: string): string {
  const url = escapedUrl.trim();
  // cale relativa (dar nu //host sau /host), http(s) sau mailto
  return /^(https?:\/\/|mailto:|\/(?![/\\]))/i.test(url) ? url : '#';
}

const CLASSES = {
  h1: 'font-heading font-bold text-3xl text-foreground mt-10 mb-4',
  h2: 'font-heading font-bold text-2xl text-foreground mt-10 mb-4',
  h3: 'font-heading font-semibold text-xl text-foreground mt-8 mb-3',
  h4: 'font-heading font-semibold text-lg text-foreground mt-6 mb-2',
  p: 'text-muted-foreground leading-relaxed mb-4',
  ul: 'space-y-1.5 my-4',
  ol: 'space-y-1.5 my-4',
  liUl: 'ml-4 text-muted-foreground list-disc',
  liOl: 'ml-4 text-muted-foreground list-decimal',
  quote: 'border-l-2 border-primary/40 pl-4 italic text-muted-foreground my-4',
  hr: 'border-white/10 my-8',
  pre: 'bg-white/5 border border-white/10 rounded-xl p-4 overflow-x-auto my-4 text-sm',
  code: 'bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-sm text-primary-light',
  a: 'text-primary-light underline hover:opacity-80',
  img: 'rounded-xl my-4 max-w-full',
  strong: 'text-foreground font-semibold',
  tableWrap: 'overflow-x-auto my-6',
  table: 'w-full text-left text-sm border-collapse',
  th: 'border-b border-white/20 px-3 py-2 font-semibold text-foreground',
  td: 'border-b border-white/10 px-3 py-2 text-muted-foreground',
};

function renderInline(raw: string): string {
  // U+E000 (zona privata Unicode) marcheaza intern spanurile de cod; nu are ce cauta in continut.
  const codeSpans: string[] = [];
  let s = escapeHtml(raw.replace(//g, ''));

  // Cod inline: se scoate intai, ca sa nu se aplice bold / italic / linkuri in interior.
  s = s.replace(/`([^`]+)`/g, (_, code: string) => {
    codeSpans.push(`<code class="${CLASSES.code}">${code}</code>`);
    return `${codeSpans.length - 1}`;
  });

  s = s
    .replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (_, alt: string, url: string) => {
      const src = safeUrl(url);
      return src === '#' ? alt : `<img src="${src}" alt="${alt}" class="${CLASSES.img}" loading="lazy" />`;
    })
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, text: string, url: string) => {
      return `<a href="${safeUrl(url)}" target="_blank" rel="noopener noreferrer" class="${CLASSES.a}">${text}</a>`;
    })
    .replace(/\*\*([^*]+)\*\*/g, `<strong class="${CLASSES.strong}">$1</strong>`)
    .replace(/\*([^*\n]+)\*/g, '<em>$1</em>');

  return s.replace(/(\d+)/g, (_, i: string) => codeSpans[Number(i)]);
}

function splitRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((c) => c.trim());
}

const isTableSep = (line: string) => /^\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/.test(line.trim()) && line.includes('-');

export function renderMarkdown(md: string): string {
  const lines = md.replace(/\r\n?/g, '\n').split('\n');
  const out: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) { i++; continue; }

    // Bloc de cod ```
    if (trimmed.startsWith('```')) {
      const buf: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) { buf.push(lines[i]); i++; }
      i++; // inchiderea
      out.push(`<pre class="${CLASSES.pre}"><code>${escapeHtml(buf.join('\n'))}</code></pre>`);
      continue;
    }

    // Titluri. "# " devine h2: pagina are deja un h1 (titlul articolului).
    const heading = /^(#{1,4})\s+(.+)$/.exec(trimmed);
    if (heading) {
      const level = heading[1].length;
      const tag = level === 1 ? 'h2' : `h${level}`;
      out.push(`<${tag} class="${CLASSES[`h${level}` as 'h1']}">${renderInline(heading[2])}</${tag}>`);
      i++;
      continue;
    }

    if (/^---+$/.test(trimmed)) { out.push(`<hr class="${CLASSES.hr}" />`); i++; continue; }

    // Tabel
    if (trimmed.startsWith('|') && i + 1 < lines.length && isTableSep(lines[i + 1])) {
      const head = splitRow(trimmed);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) { rows.push(splitRow(lines[i])); i++; }
      out.push(
        `<div class="${CLASSES.tableWrap}"><table class="${CLASSES.table}"><thead><tr>` +
        head.map((c) => `<th class="${CLASSES.th}">${renderInline(c)}</th>`).join('') +
        '</tr></thead><tbody>' +
        rows.map((r) => '<tr>' + r.map((c) => `<td class="${CLASSES.td}">${renderInline(c)}</td>`).join('') + '</tr>').join('') +
        '</tbody></table></div>',
      );
      continue;
    }

    // Liste
    if (/^[-*]\s+/.test(trimmed) || /^\d+\.\s+/.test(trimmed)) {
      const ordered = /^\d+\.\s+/.test(trimmed);
      const itemRe = ordered ? /^\d+\.\s+(.+)$/ : /^[-*]\s+(.+)$/;
      const items: string[] = [];
      while (i < lines.length) {
        const m = itemRe.exec(lines[i].trim());
        if (!m) break;
        items.push(m[1]);
        i++;
      }
      const tag = ordered ? 'ol' : 'ul';
      const liClass = ordered ? CLASSES.liOl : CLASSES.liUl;
      out.push(`<${tag} class="${CLASSES[tag]}">` + items.map((t) => `<li class="${liClass}">${renderInline(t)}</li>`).join('') + `</${tag}>`);
      continue;
    }

    // Citat
    if (/^>\s?/.test(trimmed)) {
      const buf: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i].trim())) { buf.push(lines[i].trim().replace(/^>\s?/, '')); i++; }
      out.push(`<blockquote class="${CLASSES.quote}">${renderInline(buf.join(' '))}</blockquote>`);
      continue;
    }

    // Paragraf: fiecare linie de text e propriul <p> (asa a fost scris continutul).
    out.push(`<p class="${CLASSES.p}">${renderInline(trimmed)}</p>`);
    i++;
  }

  return out.join('\n');
}
