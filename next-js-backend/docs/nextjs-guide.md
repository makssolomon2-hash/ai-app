# Current Next.js App Guide

This guide documents the current `next-js-backend/` project. It replaces the
older guide to the removed order-demo pages and components.

## Run the app

From this folder:

```bash
npm install
npm run dev
```

Set `GOOGLE_GENERATIVE_AI_API_KEY` in `.env.local` before sending a chat
request. See the [project README](../README.md) for the full setup.

## Routes

| File | URL | Purpose |
| --- | --- | --- |
| `app/page.tsx` | `/` | Renders the current `ModernAI` chat page |
| `app/modern-ai-page/page.tsx` | `/modern-ai-page` | Interactive Gemini chat UI |
| `app/sign-in/page.tsx` | `/sign-in` | Placeholder sign-in page |
| `app/sign-up/page.tsx` | `/sign-up` | Placeholder sign-up page |
| `app/api/chat/route.ts` | `POST /api/chat` | Validates input and streams Gemini responses |

The removed `/ai` and `/ai-solo` pages are no longer routes in this project.
Their components and copied Vanilla demo assets are not imported by the
remaining app.

## Chat request flow

1. `app/modern-ai-page/page.tsx` renders the client-side chat UI and uses the
   AI SDK's `useChat` hook.
2. The hook submits messages to `/api/chat`.
3. `app/api/chat/route.ts` checks for the Gemini API key and a messages array,
   converts the UI messages to model messages, and streams a response from
   Google's Gemini provider.
4. The UI displays streamed messages and a user-friendly error message if the
   request fails.

Keep the API key on the server in `.env.local`; do not expose it in client-side
code or commit the local environment file.

## Project structure

```text
app/
  api/chat/route.ts        Gemini streaming endpoint
  modern-ai-page/page.tsx  Interactive chat experience
  page.tsx                 Home route
  sign-in/page.tsx         Sign-in placeholder
  sign-up/page.tsx         Sign-up placeholder
components/
  NavBar.tsx               Sidebar navigation
  Background.tsx           Animated background
  constants/data.js        Navigation links and prompt placeholders
  ui/                      Reusable UI components
lib/                       Shared data and utility functions
public/icons/              Icons used by the interface
```

Next.js uses `page.tsx` files to create routes and `route.ts` files to expose
HTTP handlers. The current sidebar links target the routes that still exist;
the removed demo routes and non-existent Settings route are not listed.

## Checks

```bash
npm run lint
npm run build
```

The design documents in this folder describe visual direction and planning.
They are references, not a guarantee that every listed design component is
implemented in the app.
