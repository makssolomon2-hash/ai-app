# Understanding the Next.js version

This guide explains the current Next.js app and how to rebuild it from the
original browser version. It does not add features or change the page.

## What the app currently does

- The send button starts an ice cream order.
- Messages appear over time, with an animated orb beside each message.
- At the end, the small orbs disappear. Three seconds later, the large orb
  appears frozen but remains visible.
- Clicking the send button again starts another order; it does not clear
  previous messages or prevent overlapping orders.
- The text input, other controls, and social buttons are currently visual
  elements. They do not send a message or sign anyone in.

## Where things live

```text
next-app/
  app/
    layout.tsx       Page shell, fonts and global CSS
    page.tsx         The home route; renders AIApp
    globals.css      Global styles and Tailwind import
  components/
    AIApp.tsx        Page markup, order logic and Orb component
    ChatLog.tsx      Currently empty
    Input.tsx        Currently empty
  lib/
    stocks.js        Ingredients
    orb.js           Older browser helper; not imported by AIApp
```

The original version is still in the repository root. Start with
[index.html](../../index.html), [async-js-log.js](../../async-js-log.js),
[log.js](../../log.js), and [orb.js](../../orb.js) when comparing versions.

## 1. Start the Next.js app

In a terminal, from the repository root:

```powershell
cd next-app
npm install
npm run dev
```

Open the local address printed in the terminal. Next normally uses port 3000,
but another port may be chosen if it is busy. Stop the server with `Ctrl+C`.
The original Express server and BrowserSync are not needed to run this version.

## 2. Understand the page structure

[app/layout.tsx](../app/layout.tsx) creates the shared `<html>` and `<body>`,
loads fonts, and imports global CSS. [app/page.tsx](../app/page.tsx) is the
home route. It renders the app:

```tsx
import AIApp from "@/components/AIApp";

export default function Home() {
  return (
    <main>
      <AIApp />
    </main>
  );
}
```

`@/` points to the Next app root, as configured in `tsconfig.json`. The page
doesn't need to be a client component just because it renders one.

## 3. Convert the HTML to JSX

The visible markup is in [components/AIApp.tsx](../components/AIApp.tsx).
To recreate it, copy the relevant content from `index.html` into the component's
`return`, preserving the existing classes, text, SVGs, and structure.

The important syntax changes are:

```tsx
// HTML: class="..."
<div className="log-container">...</div>

// JSX closes void elements
<input type="text" />

// SVG attributes use camelCase
<path fillRule="evenodd" clipRule="evenodd" />
```

JSX looks like HTML, but it is written inside JavaScript/TypeScript. Expressions
such as `{message}` and `{entries.map(...)}` go inside braces. Tailwind classes
still describe styling; the global rules are in
[globals.css](../app/globals.css).

The Next app currently has its own global styles and layout. They are not an
exact copy of the original [input.css](../../input.css) and HTML font setup.
Keep that distinction in mind if comparing the appearance of the two versions.

## 4. Make the interactive part a client component

`AIApp.tsx` starts with:

```tsx
"use client";
```

This marks `AIApp` as a client component. It needs browser-side interactivity:
React state, click handlers, timers, and canvas drawing. Its imported child
components are included in the client bundle too.

`LogEntry` and `OrbProps` are TypeScript types. They describe the data the
component expects; they don't create visible content or run at runtime.

## 5. Replace DOM logging with React state

The original `log.js` creates list elements with `document.createElement` and
appends them to `#log`. In React, `AIApp` stores entries instead:

```tsx
const [entries, setEntries] = useState<LogEntry[]>([]);
```

Each entry has an `id`, a `message`, and `showOrb`. The `log` function prints
the message to the console and adds an entry:

```tsx
const entry = { id: nextId.current++, message, showOrb: true };
setEntries((previous) => [...previous, entry]);
```

The function form of `setEntries` uses the latest list even when several
messages are added close together. `nextId` is a ref: its value persists
between renders, but changing it does not itself trigger a render.

The JSX turns the entries into list items:

```tsx
<ul id="log" className="mt-10">
  {entries.map((entry) => (
    <li key={entry.id} className="flex items-center">
      {entry.showOrb && <Orb state="solving" size={20} speed={0.5} />}
      <span>{entry.message}</span>
    </li>
  ))}
</ul>
```

`key` lets React identify each item. When `showOrb` is false, React removes
that item's canvas while keeping the message.

## 6. Connect the button and timers

In the original version, `addEventListener` connects the button. In React, the
existing button uses:

```tsx
<button id="order-btn" onClick={startIceCreamProgram}>
  {/* The existing send icon goes here. */}
</button>
```

`onClick` receives the function itself, not `startIceCreamProgram()`. The
function runs when the button is clicked, not during rendering.

`startIceCreamProgram` shows the large orb and calls `log` for the first two
messages. The remaining messages follow the same nested timer sequence as
`async-js-log.js`. For example:

```tsx
later(() => {
  log("(7) The fruit has been chopped");
  // The next delayed step is scheduled here.
}, 2000);
```

The `later` helper uses `setTimeout` and records pending timers in a ref. It
removes each timer from the set after it fires. The `useEffect` cleanup clears
pending timers when `AIApp` unmounts.

The first selection is made after 2 seconds. With normal timer scheduling, the
final messages appear about 12 seconds after the click; the large orb becomes
visually stationary about 3 seconds later. Each delay is in milliseconds and
is relative to the preceding step, not the initial click.

## 7. Reuse the ingredients

[lib/stocks.js](../lib/stocks.js) exports the same kind of ingredient object as
the original. `AIApp` imports it with:

```tsx
import { stocks } from "@/lib/stocks";
```

The current order uses `stocks.fruits[2]` (Banana), `stocks.holder[2]` (stick),
and `stocks.toppings[1]` (Peanuts). JavaScript array indexes start at zero.

## 8. Draw the orbs with React

The `Orb` component is currently in `AIApp.tsx`. It uses
`thinking-orbs/engine`, a dependency already listed in `package.json`, instead
of importing the engine directly from a CDN as the original `orb.js` does.

The key pieces are:

1. `useRef` connects React to the actual `<canvas>` element.
2. `useEffect` runs after React has placed the canvas on the page.
3. `resolvePreset` chooses the drawing settings; `MODE_DRAWS` supplies the
   drawing function.
4. `requestAnimationFrame` draws repeatedly. The effect cleanup cancels the
   animation when the component unmounts or its props change.
5. If the browser requests reduced motion, the effect draws a single frame.

The large orb uses `searching`, size `64`, and speed `0.6` while running. The
small log orbs use `solving`, size `20`, and speed `0.5`. After the order,
`showOrb` becomes false for the existing log entries. Setting the large orb's
speed to zero makes it appear frozen; it is not hidden.

The old [lib/orb.js](../lib/orb.js) remains in the folder, but the current
`AIApp` does not use it. The React `Orb` component contains the drawing
integration used by this page.

## 9. Check your recreation

Run the app and click the send button:

1. Check that the first two messages and the large orb appear.
2. Check that the remaining messages appear in order, ending with `Finish`.
3. Check that the small orbs disappear and the large orb remains visible.
4. Click twice to confirm that both orders still run and messages are retained.

For code checks, run these from `next-app`:

```powershell
npx tsc --noEmit --incremental false
npx eslint components\AIApp.tsx app\page.tsx
```
