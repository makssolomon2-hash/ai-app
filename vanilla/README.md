# Vanilla JavaScript and Node.js Demo

This self-contained course project demonstrates asynchronous JavaScript with
an ice-cream order sequence. It includes callback, Promise, and async/await
examples, plus an Express-served browser page with a live activity log and
animated orb.

## Run the browser page

Run these commands from the `vanilla/` folder:

```bash
npm install
npm run live
```

Open [http://localhost:3001](http://localhost:3001). The Express server runs
on port 3000, while BrowserSync serves the auto-reloading page on port 3001.
In a second terminal, start Tailwind's watcher:

```bash
npx @tailwindcss/cli -i ./input.css -o ./style.css --watch
```

Keep both terminals running while editing. `style.css` is generated from
`input.css`; edit the input file rather than the generated output.

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Run the callback/timer example in Node |
| `npm run dev2` | Run the Promise example |
| `npm run dev3` | Run the async/await example |
| `npm run dev4` | Run the second async/await example |
| `npm run serve` | Serve the browser page on port 3000 |
| `npm run live` | Serve the page and start BrowserSync on port 3001 |

## Main files

| File | Purpose |
| --- | --- |
| `index.html` | Browser demo UI |
| `app.js` | Express server for the page |
| `async-js-log.js` | Timed order steps displayed in the browser |
| `async-js.js`, `promises.js`, `async-await.js`, `async-await-2.js` | Node.js learning examples |
| `stocks.js` | Order ingredients and options |
| `log.js` | Writes order messages into the browser page |
| `orb.js` | Browser canvas orb |
| `input.css` | Tailwind input stylesheet |
| `style.css` | Generated stylesheet; do not edit directly |
