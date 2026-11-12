<img width="2560" height="1313" alt="image" src="https://github.com/user-attachments/assets/8c8f7ce1-5478-47dd-8124-bdf14b155bdd" />

# AI Chat

## **ASYNCHRONOUS JAVASCRIPT AND NODE SERVER**


A small Node tutorial that places an ice cream order with callbacks, timers, and a live page.

The order does not finish in one straight line. JavaScript starts a step, keeps going, and comes back when the timer ends. That is the whole lesson.

```text
(1) Start
(2) Order placed
      ... 2 seconds ...
(3) Grapes were selected
(4) Production starts
(5) (6) please wait
(7) chop  (8) water + ice  (9) machine
(10) cone  (11) peanuts  (12) serve
```

## Start

You need [Node.js](https://nodejs.org/). Open **two** terminals in this folder.

**First time only**

```bash
npm install
```

**Terminal 1 — the page**

```bash
npm run live
```

Then open **[http://localhost:3001](http://localhost:3001)**

Not port 3000. Port 3000 is only the server. Port 3001 is the one that reloads the browser when you save.

**Terminal 2 — Tailwind**

```bash
npx @tailwindcss/cli -i ./input.css -o ./style.css --watch
```

Leave both terminals open. Save a file. The browser should reload by itself.

Stop either one with `Ctrl+C`.

## What to touch

| File | Do this |
| --- | --- |
| [index.html](index.html) | Change the page and Tailwind classes |
| [input.css](input.css) | Change your own CSS |
| [async-js-log.js](async-js-log.js) | Change the order steps shown on the page |
| [stocks.js](stocks.js) | Change fruits, liquids, holders, toppings |
| [style.css](style.css) | **Do not edit.** Tailwind rewrites this file |

## Scripts

| Command | What it does |
| --- | --- |
| `npm run live` | Starts the page and reloads the browser on save |
| `npm run serve` | Server only, on port 3000. You refresh the page yourself |
| `npm run dev` | Terminal version of the order. No browser |
| `npm run dev2` | Do not use this for the page. It crashes in Node because `document` only exists in the browser |

## How the pieces connect

```text
index.html
  ├── style.css          built from input.css
  └── async-js-log.js
        ├── stocks.js    the ingredients
        └── log.js       writes each step into the page
```

`app.js` is the tiny Express server. It only serves these files. It does not make the ice cream.
Do not treat these as the live page
npm run dev runs async-js.js in Node. That is the terminal version.
npm run dev2 runs promises.js, which imports log.js. In Node that crashes with document is not defined.
package.json still lists "main": "server.js". That file is the old terminal demo, not the web server.

to do:

clear log
debug button spam click

next js
gsap

