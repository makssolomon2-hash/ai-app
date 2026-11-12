import {
  MODE_DRAWS,
  resolvePreset,
} from "https://cdn.jsdelivr.net/npm/thinking-orbs@0.3.1/dist/engine.es.js";

const LABELS = {
  working: "Working…",
  searching: "Searching…",
  solving: "Solving…",
  listening: "Listening…",
  connecting: "Connecting…",
  weaving: "Weaving…",
  composing: "Composing…",
  breathing: "Thinking…",
  shaping: "Shaping…",
};

export function mountOrb(canvas, options = {}) {
  const state = options.state ?? "working";
  const size = options.size ?? 64; // only 64 or 20
  const speed = options.speed ?? 1;
  const dark = options.dark ?? true; // true = light dots on a dark page

  const dpr = Math.min(2, window.devicePixelRatio || 1);
  canvas.width = Math.round(size * dpr);
  canvas.height = Math.round(size * dpr);
  canvas.style.width = `${size}px`;
  canvas.style.height = `${size}px`;
  canvas.setAttribute("aria-label", LABELS[state] ?? "Working…");

  const ctx = canvas.getContext("2d");
  const preset = resolvePreset(state, size);
  const draw = MODE_DRAWS[preset.mode];
  const effSpeed = preset.speed * speed;

  const frame = (tSec) => {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);
    draw(ctx, size, tSec, dark, preset.opts);
  };

  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    frame(0.6);
    return () => {};
  }

  let raf = 0;
  const loop = () => {
    frame((performance.now() / 1000) * effSpeed);
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);

  return () => cancelAnimationFrame(raf);
}