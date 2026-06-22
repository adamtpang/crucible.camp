"use client";

import { useEffect, useState } from "react";

type Remaining = { d: number; h: number; m: number; s: number; done: boolean };

function compute(target: number): Remaining {
  const ms = target - Date.now();
  if (ms <= 0) return { d: 0, h: 0, m: 0, s: 0, done: true };
  const s = Math.floor(ms / 1000);
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
    done: false,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Live countdown to the configured target. Renders a stable placeholder on the
 * server / first paint (no hydration mismatch), then ticks every second on the client.
 */
export function Countdown({ targetISO }: { targetISO: string }) {
  const [t, setT] = useState<Remaining | null>(null);

  useEffect(() => {
    const target = new Date(targetISO).getTime();
    const tick = () => setT(compute(target));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetISO]);

  const cells: Array<[string, string]> = [
    ["Days", t ? pad(t.d) : "––"],
    ["Hrs", t ? pad(t.h) : "––"],
    ["Min", t ? pad(t.m) : "––"],
    ["Sec", t ? pad(t.s) : "––"],
  ];

  return (
    <div
      role="timer"
      aria-label="Time until doors open"
      className="flex items-end gap-2 sm:gap-5"
    >
      {t?.done ? (
        <span className="mono text-forge text-sm tracking-[0.2em] uppercase">
          Doors are open — we&apos;re live
        </span>
      ) : (
        cells.map(([label, value], i) => (
          <div key={label} className="flex items-end gap-2 sm:gap-5">
            <div className="flex flex-col items-center">
              <span className="display heat-text text-[1.8rem] sm:text-5xl md:text-6xl tabular-nums leading-none">
                {value}
              </span>
              <span className="mono mt-2 text-[0.6rem] sm:text-[0.65rem] tracking-[0.2em] uppercase text-ink-faint">
                {label}
              </span>
            </div>
            {i < cells.length - 1 && (
              <span className="display text-xl sm:text-4xl md:text-5xl leading-none text-ink-faint/40 pb-3">
                :
              </span>
            )}
          </div>
        ))
      )}
    </div>
  );
}
