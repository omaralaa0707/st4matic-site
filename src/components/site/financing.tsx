"use client";

import { useMemo, useState } from "react";
import { useSt4 } from "@/content/schema-ext";
import { FINANCING } from "@/content/media";
import { AmbientDial } from "@/components/webgl/ambient-dial";
import { Ignite, SpecRule } from "@/components/motion/ignite";

const MAX_DOWN = 70;

function fmt(n: number) {
  return Math.round(n).toLocaleString("en-US");
}

export function Financing() {
  const c = useSt4();
  const [price, setPrice] = useState(900_000);
  const [down, setDown] = useState<number>(FINANCING.minDownPct);
  const [years, setYears] = useState<number>(FINANCING.maxTermYears);

  const downPayment = (price * down) / 100;
  const balance = price - downPayment;
  const monthly = balance / (years * 12);
  // The dial reads the down payment on a plain 0–100 scale, not on the
  // 30–70 slider range: mapping it to the range would leave the gauge sitting
  // completely unlit at its own default, which reads as broken rather than
  // as "minimum".
  const dialValue = down / 100;

  const yearMarks = useMemo(
    () => Array.from({ length: FINANCING.maxTermYears }, (_, i) => i + 1),
    [],
  );

  return (
    <section id="financing" className="relative bg-void-2 py-24 sm:py-32">
      <div className="mx-auto max-w-[74rem] px-5 sm:px-8">
        <Ignite as="div" className="max-w-[42rem]">
          <p className="plate-label text-amber">{c.financing.eyebrow}</p>
          <h2 className="mt-4 font-display text-display font-bold text-chalk">
            {c.financing.heading}
          </h2>
          <SpecRule className="mt-5 max-w-[9rem]" delay={100} />
          <p className="mt-6 text-lead leading-relaxed text-chalk-2">{c.financing.intro}</p>
        </Ignite>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_18rem] lg:items-center">
          <Ignite as="div" className="order-2 lg:order-1">
            <label className="block">
              <span className="plate-label text-chalk-3">{c.financing.priceLabel}</span>
              <div className="mt-2 flex items-center gap-2 border-b border-hairline pb-2 focus-within:border-violet">
                <input
                  type="text"
                  inputMode="numeric"
                  value={fmt(price)}
                  onChange={(e) => {
                    const n = Number(e.target.value.replace(/[^\d]/g, ""));
                    setPrice(Math.max(0, Math.min(20_000_000, n || 0)));
                  }}
                  placeholder={c.financing.pricePlaceholder}
                  className="tnum w-full bg-transparent font-display text-2xl font-semibold text-chalk outline-none"
                  aria-label={c.financing.priceLabel}
                />
                <span className="text-[0.8rem] text-chalk-3">EGP</span>
              </div>
            </label>

            <div className="mt-8 space-y-7">
              <div>
                <div className="flex items-baseline justify-between">
                  <span className="plate-label text-chalk-3">{c.financing.downLabel}</span>
                  <span className="tnum spectrum-text font-display text-lg font-bold">{down}%</span>
                </div>
                <input
                  type="range"
                  min={FINANCING.minDownPct}
                  max={MAX_DOWN}
                  step={1}
                  value={down}
                  onChange={(e) => setDown(Number(e.target.value))}
                  className="dial-slider mt-3 w-full"
                  aria-label={c.financing.downLabel}
                />
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <span className="plate-label text-chalk-3">{c.financing.termLabel}</span>
                  <span className="tnum spectrum-text font-display text-lg font-bold">
                    {years} {c.financing.yearsUnit}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={FINANCING.maxTermYears}
                  step={1}
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="dial-slider mt-3 w-full"
                  aria-label={c.financing.termLabel}
                />
                <div className="mt-1 flex justify-between px-0.5 text-[0.66rem] text-chalk-3">
                  {yearMarks.map((y) => (
                    <span key={y} className="tnum">
                      {y}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-9 grid grid-cols-3 gap-4 border-t border-hairline pt-6">
              <div>
                <p className="plate-label text-chalk-3">{c.financing.downResultLabel}</p>
                <p className="tnum mt-1 font-display text-lg font-bold text-blue">{fmt(downPayment)}</p>
              </div>
              <div>
                <p className="plate-label text-chalk-3">{c.financing.balanceLabel}</p>
                <p className="tnum mt-1 font-display text-lg font-bold text-chalk">{fmt(balance)}</p>
              </div>
              <div>
                <p className="plate-label text-chalk-3">{c.financing.monthlyResultLabel}</p>
                <p className="tnum mt-1 font-display text-lg font-bold text-amber">{fmt(monthly)}</p>
              </div>
            </div>

            <p className="mt-5 text-[0.74rem] leading-relaxed text-chalk-3">
              {c.financing.disclaimer}
            </p>
            <p className="mt-3 text-[0.78rem] italic leading-relaxed text-chalk-2">
              {c.financing.sourceNote}
            </p>
          </Ignite>

          <Ignite
            as="div"
            delay={120}
            className="order-1 mx-auto w-full max-w-[16rem] lg:order-2"
          >
            <div className="relative">
              <AmbientDial
                value={dialValue}
                alt={c.financing.heading}
                className="aspect-square w-full"
              />
              {/* The gauge reads out its own value, the way a cluster does —
                  under the face, not inside it, because the needle sweeps
                  through the middle at most of its range. */}
              <div className="-mt-4 flex flex-col items-center">
                <span className="tnum font-display text-4xl font-bold text-chalk">{down}%</span>
                <span className="plate-label mt-1 text-chalk-3">{c.financing.downLabel}</span>
              </div>
            </div>
          </Ignite>
        </div>
      </div>
    </section>
  );
}
