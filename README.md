# Vixon Lab — vixonlab.ro

Source code of [vixonlab.ro](https://vixonlab.ro), the production website of Vixon Lab, a small EU web studio. Live since February 2026 and developed continuously since (150+ commits).

## Stack

- React 18 + TypeScript, built with Vite
- Tailwind CSS + shadcn/ui (Radix primitives), Framer Motion, Lenis smooth scroll
- Vercel: static hosting plus one serverless function
- Vitest for unit tests

## What is in it

- **Bilingual site (Romanian / English)** with separate home pages, services, portfolio with case studies, blog, pricing, an agencies page and legal pages.
- **Price configurator**: a multi-step flow (package, extra pages, add-ons, maintenance) that builds a quote and hands it off to WhatsApp or email, prefilled.
- **AI chatbot** (`api/chat.ts`): a Vercel serverless function that calls Gemini, grounded in the studio's own services and pricing. The API key lives only on the server.
- **Performance work**: critical CSS inlined at build time (`scripts/inline-critical-css.cjs`), sitemap generated at build time (`scripts/generate-sitemap.cjs`), static content in `src/data/*.ts` instead of runtime database calls.
- **Tests**: 71 Vitest tests across 7 files (configurator pricing, markdown rendering and link safety, i18n and language switching, the chat API handler).

## Run locally

```bash
npm ci
npm run dev      # dev server
npm test         # 71 tests
npm run build    # sitemap + production build + critical CSS
```

The chatbot needs a `GEMINI_API_KEY` environment variable; the rest of the site runs without any configuration.

## Note

This public repository mirrors the production repo. Its history was cleaned before publishing: build output, dependencies, internal planning notes and old configuration were removed from every commit.
