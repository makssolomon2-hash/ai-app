<img width="2553" height="1302" alt="Screenshot 2026-11-27 092338" src="https://github.com/user-attachments/assets/b3a5203e-9264-4580-90f9-c442b9f98c2d" />
<img width="2550" height="1302" alt="Screenshot 2026-11-27 092318" src="https://github.com/user-attachments/assets/272282f7-e24f-469c-9dba-4e65fa00a1bf" />
# Node.js Course Projects

This repository contains three separate learning projects. Each application has
its own dependencies and should be run from its own folder.

## Projects

### `vanilla/` — asynchronous JavaScript and Node.js

A browser-based ice-cream order demo for practicing callbacks, timers,
Promises, and async/await. The Express page server and BrowserSync support the
live browser version; the Tailwind CLI builds the stylesheet.

See [vanilla/README.md](vanilla/README.md) for setup, scripts, and file roles.

### `next-app/` — Next.js experiments

A standalone Next.js app containing AI chat and composer experiments, several
sample routes, and a chat API route. It is separate from the Gemini-backed app
in `next-js-backend/`.

See [next-app/README.md](next-app/README.md) for routes and setup. Its
[design-system reference](next-app/docs/README.md) describes the intended UI,
not a guarantee that every listed component is implemented.

### `next-js-backend/` — Gemini chat app

A separate Next.js app focused on the current AI chat experience. The home
page and `/modern-ai-page` share the chat UI, which streams responses through
`/api/chat` using Google Gemini. The older `/ai`, `/ai-solo`, and copied
`/vanilla` routes/assets have been removed from this project; the remaining
sign-in and sign-up pages are placeholders.

See [next-js-backend/README.md](next-js-backend/README.md) for setup and
environment configuration. Its `docs/` folder contains the design reference
and a guide to the current app structure.

## Start a project

For the browser-based JavaScript course:

```bash
cd vanilla
npm install
npm run live
```

For either Next.js app, enter that app's folder, install its dependencies, and
start its dev server:

```bash
cd next-js-backend
npm install
npm run dev
```

Use `cd next-app` instead to run the other Next.js project. Their package
scripts, routes, and environment configuration are independent.
