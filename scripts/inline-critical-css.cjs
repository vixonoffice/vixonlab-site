/**
 * Post-build script: extracts critical CSS from the main stylesheet
 * and inlines it into index.html, loading the rest asynchronously.
 */
const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '../dist');
const htmlPath = path.join(distDir, 'index.html');

let html = fs.readFileSync(htmlPath, 'utf-8');

// Find the CSS file reference
const cssLinkMatch = html.match(/<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/);
if (!cssLinkMatch) {
  console.log('No CSS link found, skipping critical CSS inlining.');
  process.exit(0);
}

const cssHref = cssLinkMatch[1];
const cssPath = path.join(distDir, cssHref);
const fullCSS = fs.readFileSync(cssPath, 'utf-8');

// Critical CSS: extract base reset, CSS variables, font-face, body/html styles,
// navbar-related styles, and utility classes used above the fold
const criticalPatterns = [
  // Font-face declarations
  /@font-face\{[^}]+\}/g,
  // CSS custom properties (design tokens)
  /:root\{[^}]+\}/g,
  // Base element styles
  /\*,::before,::after\{[^}]+\}/g,
  /html\{[^}]+\}/g,
  /body\{[^}]+\}/g,
  // Any rule containing these critical selectors
];

// Instead of regex extraction (fragile), inline a minimal critical CSS block
// that covers the initial render, then async-load the full stylesheet
const criticalCSS = `
:root{--background:243 40% 13%;--foreground:240 33% 97%;--primary:263 83% 58%;--primary-foreground:0 0% 100%;--primary-light:258 75% 87%;--muted-foreground:240 15% 82%;--radius:1rem;--border:0 0% 100%/0.06}
*,::before,::after{box-sizing:border-box;border-width:0;border-style:solid;border-color:rgba(255,255,255,.06)}
html{overflow-x:clip;-webkit-text-size-adjust:100%;font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}
body{margin:0;line-height:inherit;background-color:hsl(243 40% 13%);color:hsl(240 33% 97%);font-family:Inter,system-ui,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
#root{min-height:100vh}
`.trim().replace(/\n/g, '');

// Replace the blocking <link> with:
// 1. Inlined critical CSS
// 2. Async-loaded full CSS via media trick
const replacement = `<style>${criticalCSS}</style>
<link rel="preload" href="${cssHref}" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="${cssHref}"></noscript>`;

html = html.replace(cssLinkMatch[0], replacement);

fs.writeFileSync(htmlPath, html);
console.log(`✓ Critical CSS inlined (${criticalCSS.length} bytes), full CSS async-loaded.`);
