"use client";

import { useState } from "react";
import { useSt4 } from "@/content/schema-ext";
import { HERO_FRAME, PROFILE } from "@/content/media";
import { AmbientDial } from "@/components/webgl/ambient-dial";
import { Ignite, SpecRule } from "@/components/motion/ignite";

export function Hero() {
  const c = useSt4();
  const [value, setValue] = useState(0.42);

  return (
    <section id="top" className="relative flex min-h-svh w-full flex-col overflow-hidden">
      <img
        src={HERO_FRAME}
        alt={c.hero.dialAlt}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* On a phone the copy runs the full height of the frame, so the scrim
          has to be near-solid under it; on desktop the plate only occupies
          the lower half and the photograph can stay open above it. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-void via-void/85 to-void/45 sm:via-void/75 sm:to-void/25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-void/90 to-transparent"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[94rem] flex-1 flex-col justify-end gap-10 px-5 pb-14 pt-28 sm:px-8 lg:flex-row lg:items-end lg:gap-6">
        <Ignite as="div" className="max-w-[38rem]">
          <p className="plate-label text-blue">{c.hero.eyebrow}</p>
          <h1 className="mt-4 font-display text-hero font-bold uppercase leading-[0.94] tracking-[-0.01em] rtl:leading-[1.4]">
            <span className="block text-chalk rtl:inline rtl:me-3">{c.hero.headlineLead}</span>
            <span className="spectrum-text block rtl:inline">{c.hero.headlineAccent}</span>
          </h1>
          <p className="mt-5 max-w-[34rem] text-lead leading-relaxed text-chalk-2">{c.hero.sub}</p>

          <SpecRule className="mt-7" delay={200} />

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href={PROFILE.phoneHref}
              className="inline-flex items-center gap-2.5 bg-chalk px-7 py-3.5 font-display text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-void transition-opacity hover:opacity-85"
            >
              {c.hero.primaryCta}
            </a>
            <a
              href="#fleet"
              className="inline-flex items-center gap-2 border border-hairline px-7 py-3.5 font-display text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-chalk transition-colors hover:border-violet hover:text-violet"
            >
              {c.hero.secondaryCta}
            </a>
          </div>
        </Ignite>

        <Ignite
          as="div"
          delay={140}
          className="mx-auto flex w-full max-w-[19rem] shrink-0 flex-col items-center gap-3 lg:mx-0"
        >
          <AmbientDial
            value={value}
            interactive
            onDrag={setValue}
            alt={c.hero.dialAlt}
            className="aspect-square w-full max-w-[17rem] cursor-grab active:cursor-grabbing"
          />
          <p className="max-w-[15rem] text-center text-[0.76rem] leading-relaxed text-chalk-3">
            {c.hero.dialHint}
          </p>
        </Ignite>
      </div>
    </section>
  );
}
