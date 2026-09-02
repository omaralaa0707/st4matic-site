"use client";

import { useMemo, useState } from "react";
import { useSt4 } from "@/content/schema-ext";
import { FLEET } from "@/content/media";
import { Ignite, SpecRule } from "@/components/motion/ignite";

type SpecKey = "engine" | "power" | "trans" | "drive" | "mileage" | "zero100";

export function Fleet() {
  const c = useSt4();
  const [active, setActive] = useState(0);
  const [frame, setFrame] = useState(0);

  const car = FLEET[active];
  const copy = c.fleet.cars[car.id];
  const frames = car.frames;
  const current = frames[frame] ?? frames[0];

  const specRows = useMemo(
    () =>
      [
        ["engine", car.spec.engine],
        ["power", car.spec.power],
        ["trans", car.spec.trans],
        ["drive", car.spec.drive],
        ["mileage", car.spec.mileage],
        car.spec.zero100 ? (["zero100", car.spec.zero100] as const) : null,
      ].filter(Boolean) as [SpecKey, string][],
    [car],
  );

  function selectCar(i: number) {
    setActive(i);
    setFrame(0);
  }

  function step(delta: number) {
    setFrame((f) => (f + delta + frames.length) % frames.length);
  }

  return (
    <section id="fleet" className="relative bg-void py-24 sm:py-32">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
        <Ignite as="div" className="max-w-[42rem]">
          <p className="plate-label text-red">{c.fleet.eyebrow}</p>
          <h2 className="mt-4 font-display text-display font-bold text-chalk">{c.fleet.heading}</h2>
          <SpecRule className="mt-5 max-w-[9rem]" delay={100} />
          <p className="mt-6 text-lead leading-relaxed text-chalk-2">{c.fleet.intro}</p>
        </Ignite>

        {/* Car switcher */}
        <div className="mt-12 flex flex-wrap gap-2">
          {FLEET.map((m, i) => {
            const mc = c.fleet.cars[m.id];
            const isActive = i === active;
            return (
              <button
                key={m.id}
                onClick={() => selectCar(i)}
                className={`group flex flex-col items-start gap-0.5 border px-4 py-2.5 text-start transition-colors ${
                  isActive
                    ? "border-violet bg-panel"
                    : "border-hairline bg-transparent hover:border-chalk-3"
                }`}
              >
                {/* The marque is localised; the model designation never is,
                    so only the latter gets the LTR isolation. */}
                <span className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-chalk-3">
                  {mc.marque}
                </span>
                <span className="latin font-display text-[0.95rem] font-bold text-chalk">
                  {mc.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detail */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <Ignite key={car.id} as="div" className="relative">
            <div className="relative aspect-[4/3] overflow-hidden bg-panel sm:aspect-[16/10]">
              <img
                key={current.src}
                src={current.src}
                alt={`${copy.marque} ${copy.name} — ${c.fleet.roleLabels[current.role]}`}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-void/90 to-transparent p-4">
                <span className="plate-label text-chalk-2">
                  {c.fleet.roleLabels[current.role]}
                </span>
                <span className="tnum text-[0.7rem] text-chalk-3">
                  {c.fleet.positionLabel
                    .replace("{n}", String(frame + 1))
                    .replace("{total}", String(frames.length))}
                </span>
              </div>
              <button
                aria-label="Previous"
                onClick={() => step(-1)}
                className="absolute inset-y-0 start-0 flex w-14 items-center justify-center text-chalk/0 transition-colors hover:text-chalk/80"
              >
                <span aria-hidden="true" className="text-2xl">
                  ‹
                </span>
              </button>
              <button
                aria-label="Next"
                onClick={() => step(1)}
                className="absolute inset-y-0 end-0 flex w-14 items-center justify-center text-chalk/0 transition-colors hover:text-chalk/80"
              >
                <span aria-hidden="true" className="text-2xl">
                  ›
                </span>
              </button>
            </div>
            <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1">
              {frames.map((fr, i) => (
                <button
                  key={fr.src}
                  onClick={() => setFrame(i)}
                  aria-label={`Frame ${i + 1}`}
                  className={`h-1.5 shrink-0 transition-all ${
                    i === frame ? "w-6 bg-violet" : "w-1.5 bg-hairline"
                  }`}
                />
              ))}
            </div>
          </Ignite>

          <Ignite as="div" delay={100}>
            <h3 className="font-display text-section font-bold text-chalk">
              <span>{copy.marque} </span>
              <span className="latin">{copy.name}</span>
              <span className="tnum ms-2 text-chalk-3">· {car.spec.year}</span>
            </h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-chalk-2">{copy.blurb}</p>

            <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 border-y border-hairline py-5">
              {specRows.map(([key, val]) => (
                <div key={key}>
                  <dt className="plate-label text-chalk-3">{c.fleet.specLabels[key]}</dt>
                  <dd className="latin tnum mt-1 text-[0.92rem] font-medium text-chalk">{val}</dd>
                </div>
              ))}
            </dl>

            <p className="plate-label mt-6 text-chalk-3">{c.fleet.featuresLabel}</p>
            <ul className="mt-3 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
              {copy.features.map((feat) => (
                <li key={feat} className="flex items-start gap-2 text-[0.86rem] text-chalk-2">
                  <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue" />
                  {feat}
                </li>
              ))}
            </ul>

            <a
              href={car.postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-[0.8rem] font-medium text-chalk-3 underline decoration-hairline underline-offset-4 transition-colors hover:text-violet"
            >
              {c.fleet.viewPost}
            </a>
          </Ignite>
        </div>
      </div>
    </section>
  );
}
