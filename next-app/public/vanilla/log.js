import { mountOrb } from "./orb.js";

const smallOrbs = [];

export function log(message) {
  console.log(message);

  const li = document.createElement("li");
  li.className = "flex items-center ";

  const canvas = document.createElement("canvas");
  canvas.style.marginRight = "20px";
  canvas.style.marginLeft = "20px";
  li.append(canvas);

  const text = document.createElement("span");
  text.textContent = message;
  li.append(text);
  

  document.getElementById("log").append(li);

  const stop = mountOrb(canvas, {
    state: "solving",
    size: 20,
    dark: true,
    speed: 0.5,
  });

  smallOrbs.push({ canvas, stop});
  return smallOrbs.length -1;
};

export function hideSmallOrb(index) {
  const orb = smallOrbs[index];
  if (!orb) return;
  orb.stop();
  orb.canvas.hidden = true;
};

export function hideAllSmallOrbs() {
  for (const orb of smallOrbs) {
    orb.stop();
    orb.canvas.hidden = true;
  }
};