# Next.js App

This is a standalone Next.js 16 / React 19 playground for UI and AI-chat
experiments. It is independent of the Gemini-backed app in
[`../next-js-backend`](../next-js-backend/).

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Next.js. For a production build, run
`npm run build`; `npm run lint` runs ESLint.

## Current routes

| Route | Purpose |
| --- | --- |
| `/` | Simple home-page placeholder |
| `/ai` | AI chat UI in `components/AI.tsx`, backed by `/api/chat` |
| `/ai-solo` | Separate AIApp page |
| `/modern-ai-page` | Composer and chat-layout prototype |
| `/sign-in`, `/sign-up` | Sample sign-in and sign-up pages |
| `POST /api/chat` | AI SDK chat endpoint |

The app's pages and API route are experiments and should not be confused with
the current Gemini implementation in `next-js-backend/`. The design spec in
[`docs/README.md`](docs/README.md) is a visual reference; the running UI may
differ from it.
