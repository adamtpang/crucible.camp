import { event } from "@config";

/* Heat ramp across the timeline: cold at Doors, white-hot at the Finale.
   Encodes the "building to a finale / no dead air" curve visually. */
const NODE = ["#8c1a06", "#d92b09", "#ff5a1f", "#ff7a1f", "#ffae4d", "#fff4e6"];

export function RunOfShow() {
  const beats = event.runOfShow;
  const n = beats.length;

  return (
    <section
      id="run-of-show"
      aria-labelledby="ros-h"
      className="reveal mx-auto max-w-[1180px] border-t border-line-soft px-6 py-20 md:px-10 md:py-28"
    >
      <div className="grid gap-8 md:grid-cols-[14rem_1fr] md:gap-12">
        <div className="flex items-baseline gap-3 md:flex-col md:gap-2">
          <span className="mono text-sm font-semibold tracking-[0.1em] text-forge">03</span>
          <span className="mono text-xs uppercase tracking-[0.22em] text-ink-faint">The run of show</span>
        </div>

        <div>
          <h2 id="ros-h" className="display max-w-[20ch] text-3xl leading-[1.05] sm:text-4xl md:text-[2.9rem]">
            A produced experience. Not a room with a deadline.
          </h2>
          <p className="mt-4 max-w-[56ch] text-ink-dim">
            Every beat is directed. The energy climbs from the moment doors open to the finale —
            there is no dead air, and there is always a clear next thing to do.
          </p>

          <ol className="relative mt-12 ml-1 flex flex-col gap-9 sm:gap-11">
            {/* heat rail */}
            <span
              aria-hidden
              className="absolute bottom-3 left-0 top-2 w-[2px]"
              style={{
                background:
                  "linear-gradient(180deg, #8c1a06 0%, #d92b09 30%, #ff5a1f 60%, #ffae4d 82%, #fff4e6 100%)",
              }}
            />
            {beats.map((b, i) => {
              const color = NODE[Math.min(i, NODE.length - 1)];
              return (
                <li key={b.label} className="relative pl-8 sm:pl-10">
                  <span
                    aria-hidden
                    className="absolute left-[-5px] top-[6px] h-3 w-3 rounded-full ring-4 ring-bg"
                    style={{ background: color, boxShadow: `0 0 14px ${color}` }}
                  />
                  <div className="mono text-xs uppercase tracking-[0.2em] text-forge">{b.time}</div>
                  <h3 className="display mt-1 text-xl sm:text-2xl">{b.label}</h3>
                  <p className="mt-1.5 max-w-[54ch] text-ink-dim">{b.detail}</p>
                  {i === n - 1 && (
                    <span className="mono mt-2 inline-block text-[0.7rem] uppercase tracking-[0.2em] text-heat-gold">
                      ▲ white-hot
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
