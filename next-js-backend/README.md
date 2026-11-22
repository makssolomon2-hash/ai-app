# Next.js Gemini Chat

This is the focused Next.js AI chat app in this repository. The home route
renders the current chat experience, and `/modern-ai-page` provides the same
page directly. Chat requests stream through the app's `/api/chat` route to
Google Gemini.

This project is independent of `next-app/` and `vanilla/`. The unused `/ai`,
`/ai-solo`, and copied `/vanilla` routes/assets were removed; the sign-in and
sign-up routes are currently placeholders.

## Configure Gemini

1. Create a key in [Google AI Studio](https://aistudio.google.com/apikey).
2. Create `next-js-backend/.env.local` and add:

   ```text
   GOOGLE_GENERATIVE_AI_API_KEY=your_api_key
   ```

3. Keep the key private. `.env.local` is ignored by Git. Restart the dev server
   after changing environment variables.

The free tier has usage limits. Avoid sending sensitive information.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Next.js (usually
[http://localhost:3000](http://localhost:3000)).

## Routes and key files

| Path | Purpose |
| --- | --- |
| `/` | Main Gemini chat experience |
| `/modern-ai-page` | Direct route to the chat page |
| `/sign-in`, `/sign-up` | Placeholder pages |
| `POST /api/chat` | Validates chat input and streams Gemini responses |

- `app/modern-ai-page/page.tsx` contains the interactive chat UI.
- `app/api/chat/route.ts` handles server-side Gemini requests.
- `components/NavBar.tsx` and `components/constants/data.js` define the
  navigation. Links now target existing routes only.
- `components/ui/` contains reusable interface components.
- `public/icons/` contains the icons used by the app.
- `docs/nextjs-guide.md` describes the current app structure and request flow.
- `docs/README.md` and `docs/design-system.md` are design references, not a
  promise that every specification item is implemented.

## Checks

```bash
npm run lint
npm run build
```
