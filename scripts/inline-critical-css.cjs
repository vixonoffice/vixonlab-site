/**
 * Post-build script: extracts critical CSS from the main stylesheet
 * and inlines it into index.html, loading the rest asynchronously.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

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

// Switches the preloaded stylesheet to rel="stylesheet" once it has been fetched (non-blocking CSS).
// This is an inline <script>, not an onload="" attribute, so the CSP can allow it with a sha256 hash
// instead of 'unsafe-inline'. If you change this string, update the hash in vercel.json (the build
// fails below and prints the new value).
const ASYNC_CSS_LOADER =
  "(function(){var l=document.getElementById('async-css');" +
  "function a(){l.rel='stylesheet'}" +
  "if(l.relList&&l.relList.supports&&l.relList.supports('preload')){l.addEventListener('load',a)}else{a()}})()";

const loaderHash = 'sha256-' + crypto.createHash('sha256').update(ASYNC_CSS_LOADER, 'utf8').digest('base64');
const vercelJson = fs.readFileSync(path.resolve(__dirname, '../vercel.json'), 'utf-8');
if (!vercelJson.includes(`'${loaderHash}'`)) {
  console.error(`✗ vercel.json Content-Security-Policy (script-src) is missing '${loaderHash}'.`);
  console.error('  Add it, otherwise the async stylesheet loader is blocked and the site renders unstyled.');
  process.exit(1);
}

// Replace the blocking <link> with:
// 1. Inlined critical CSS
// 2. Async-loaded full CSS (preload + hashed inline loader)
const replacement = `<style>${criticalCSS}</style>
<link id="async-css" rel="preload" href="${cssHref}" as="style">
<script>${ASYNC_CSS_LOADER}</script>
<noscript><link rel="stylesheet" href="${cssHref}"></noscript>`;

html = html.replace(cssLinkMatch[0], replacement);

// Remove modulepreload for non-critical vendor chunks (ui)
// They'll still load when needed via dynamic import
const preloadsBefore = (html.match(/modulepreload/g) || []).length;
html = html.replace(/\s*<link rel="modulepreload" crossorigin href="\/assets\/vendor-ui[^"]*\.js">\n?/g, '');
const preloadsAfter = (html.match(/modulepreload/g) || []).length;

fs.writeFileSync(htmlPath, html);
console.log(`✓ Critical CSS inlined (${criticalCSS.length} bytes), full CSS async-loaded.`);
console.log(`✓ Removed ${preloadsBefore - preloadsAfter} non-critical modulepreload hints.`);
