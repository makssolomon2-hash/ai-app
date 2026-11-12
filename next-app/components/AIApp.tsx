"use client";

import { useEffect, useRef, useState } from "react";
import { MODE_DRAWS, resolvePreset } from "thinking-orbs/engine";
import { stocks } from "@/lib/stocks";

type LogEntry = {
  id: number;
  message: string;
  showOrb: boolean;
};

type OrbProps = {
  state: "searching" | "solving";
  size: 20 | 64;
  speed: number;
};

export function Orb({ state, size, speed }: OrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not get canvas context");

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(size * dpr);
    canvas.height = Math.round(size * dpr);
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    const preset = resolvePreset(state, size);
    const draw = MODE_DRAWS[preset.mode];

    function frame(time: number) {
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, size, size);
      draw(ctx!, size, time, true, preset.opts);
    }

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      frame(0.6);
      return;
    }

    let animationFrame = 0;

    function loop() {
      frame((performance.now() / 1000) * preset.speed * speed);
      animationFrame = requestAnimationFrame(loop);
    }

    animationFrame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrame);
  }, [state, size, speed]);

  return (
    <canvas
      ref={canvasRef}
      id={size === 64 ? "orb-canvas" : undefined}
      role={size === 64 ? "img" : undefined}
      aria-label={state === "searching" ? "Searching…" : "Solving…"}
      className={size === 64 ? "bg-zinc-900 rounded-2xl" : undefined}
      style={size === 20 ? { marginLeft: 20, marginRight: 20 } : undefined}
    />
  );
}


export default function AIApp() {
  const [entries, setEntries] = useState<LogEntry[]>([]);
  const [orbVisible, setOrbVisible] = useState(false);
  const [orbSpeed, setOrbSpeed] = useState(0.6);
  const nextId = useRef(0);
  const timers = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  useEffect(() => {
    const activeTimers = timers.current;
    return () => {
      activeTimers.forEach(clearTimeout);
      activeTimers.clear();
    };
  }, []);

  function later(callback: () => void, delay: number) {
    const timer = setTimeout(() => {
      timers.current.delete(timer);
      callback();
    }, delay);
    timers.current.add(timer);
  }

  function log(message: string) {
    console.log(message);
    const entry = { id: nextId.current++, message, showOrb: true };
    setEntries((previous) => [...previous, entry]);
  }

  function startIceCreamProgram() {
    setOrbVisible(true);
    setOrbSpeed(0.6);
    log("(1) Start (executes first)");
    log("(2) Order placed, please call production");

    later(() => {
      const fruit = stocks.fruits[2];
      log(`(3)--> ${fruit} ${fruit === "Grapes" ? "were" : "was"} selected`);
      log("(4) Order received, starting production");

      later(() => {
        log("(5) Production has started");
        log("(6) We are making your order, please wait! :)");
      }, 0);

      later(() => {
        log("(7) The fruit has been chopped");
        later(() => {
          log(`(8) ${stocks.liquid[0]} and ${stocks.liquid[1]} have been added`);
          later(() => {
            log("(9) The machine has been started");
            later(() => {
              log(`(10) The ice cream has been placed on ${stocks.holder[2]}`);
              later(() => {
                log(`(11) ${stocks.toppings[1]} has been added as topping`);
                later(() => {
                  log("(12) Serve Ice Cream!");
                  log("Enjoy! :)");
                  log("Finish");
                  setEntries((previous) =>
                    previous.map((entry) => ({ ...entry, showOrb: false }))
                  );
                  later(() => setOrbSpeed(0), 3000);
                }, 1000);
              }, 3000);
            }, 2000);
          }, 1000);
        }, 1000);
      }, 2000);
    }, 2000);
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
       <div
          className="main-container h-screen py-20 w-[50%] flex flex-col justify-start items-center mx-auto text-left  text-2xl  text-white ">
          
          <div className="log-container bg-zinc-950 rounded-md w-[80%] h-[80%] m-10 p-10 overflow-hidden">
            <div id="orb" className="mt-10 flex items-center justify-center" hidden={!orbVisible}>
              <Orb state="searching" size={64} speed={orbSpeed} />
            </div>

            <ul id="log" className="mt-10">
              {entries.map((entry) => (
                <li key={entry.id} className="flex items-center">
                  {entry.showOrb && <Orb state="solving" size={20} speed={0.5} />}
                  <span>{entry.message}</span>
                </li>
              ))}
            </ul>
          </div>

          <div id="ai_input"
            className="ai-input flex flex-col justify-end-safe mb-20 w-[80%] mx-10 bg-zinc-950 rounded-3xl p-5 border-1  border-zinc-600 ">
            <input type="text" placeholder="Ask anything..." className="w-full px-4 py-5 border-none  rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:border-transparent
              placeholder:text-gray-400" />

            <span className="input-line  w-full bg-zinc-400 "></span>

            <div className="w-full flex flex-row justify-between p-2">

              <div className="flex flex-row gap-3">
                <button
                  className="cursor-pointer  active:scale-95  hover:bg-zinc-800 p-4 rounded-2xl w-15 h-15  text-xl text-zinc-400">+</button>
                <button
                  className="ai-model  justify-between cursor-pointer active:scale-95 hover:scale-102 hover:bg-zinc-800 p-4 rounded-2xl text-zinc-100 font-bold "
                  {...{ alt: "Choose AI model..." }}>Opus
                  4.5
                  <span
                    className="ai-modcursor-pointer active:scale-95 hover:scale-102 hover:bg-zinc-800  rounded-2xl text-zinc-300 font-bold">High
                    Fast</span>
                </button>

              </div>



              <div className="flex flex-row gap-3">
                <button
                  className="mic-icon rounded-4xl cursor-pointer  active:scale-95 flex justify-center text-center items-center w-15 h-15 hover:bg-zinc-800 ">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-mic-fill"
                    viewBox="0 0 16 16">
                    <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0z" />
                    <path
                      d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5" />
                  </svg>
                </button>

                <button id="order-btn" onClick={startIceCreamProgram}
                  className="talk-icon flex justify-center text-center items-center w-15 h-15  rounded-full bg-zinc-600 cursor-pointer  active:scale-95">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-send-fill"
                    viewBox="0 0 16 16">
                    <path
                      d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
                  </svg>
                </button>

              </div>

            </div>
          </div>

          <div className="social-buttons">
            <button type="button"
              className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 box-border border border-transparent font-medium leading-5 rounded-base text-sm px-4 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55">
              <svg className="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd"
                  d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z"
                  clipRule="evenodd" />
              </svg>
              Sign in with Facebook
            </button>
            <button type="button"
              className="text-white bg-[#0f1419] hover:bg-[#0f1419]/90 focus:ring-4 focus:outline-none focus:ring-[#0f1419]/50 box-border border border-transparent font-medium leading-5 rounded-base text-sm px-4 py-2.5 text-center inline-flex items-center dark:hover:bg-[#24292F] dark:focus:ring-[#24292F]/55">
              <svg className="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z" />
              </svg>
              Sign in
            </button>
            <button type="button"
              className="text-white bg-[#0f1419] hover:bg-[#0f1419]/90 focus:ring-4 focus:outline-none focus:ring-[#0f1419]/50 box-border border border-transparent font-medium leading-5 rounded-base text-sm px-4 py-2.5 text-center inline-flex items-center dark:hover:bg-[#24292F] dark:focus:ring-[#24292F]/55">
              <svg className="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd"
                  d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
                  clipRule="evenodd" />
              </svg>
              Sign in with Github
            </button>
          </div>

        </div>
    </div>
  );
}
