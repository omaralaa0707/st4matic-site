"use client";

import { useSt4 } from "@/content/schema-ext";
import { AMBIENT_FRAMES } from "@/content/media";
import { Ignite, SpecRule } from "@/components/motion/ignite";

export function Ambient() {
  const c = useSt4();

  return (
    <section id="ambient" className="relative bg-void-2 py-24 sm:py-32">
      <div className="mx-auto max-w-[74rem] px-5 sm:px-8">
        <Ignite as="div" className="max-w-[42rem]">
          <p className="plate-label text-violet">{c.ambient.eyebrow}</p>
          <h2 className="mt-4 font-display text-display font-bold text-chalk">{c.ambient.heading}</h2>
          <SpecRule className="mt-5 max-w-[9rem]" delay={100} />
          <p className="mt-6 text-lead leading-relaxed text-chalk-2">{c.ambient.intro}</p>
        </Ignite>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {AMBIENT_FRAMES.map((src, i) => (
            <Ignite
              key={src}
              as="figure"
              delay={i * 70}
              className={`group relative overflow-hidden bg-panel ${i === 0 ? "col-span-2 aspect-[4/3] sm:col-span-1 sm:aspect-[3/4]" : "aspect-[3/4]"}`}
            >
              <img
                src={src}
                alt={c.ambient.items[i]?.alt ?? ""}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-void/90 to-transparent"
              />
              <figcaption className="latin absolute inset-x-0 bottom-0 p-3 text-[0.68rem] font-medium tracking-[0.04em] text-chalk-2 rtl:text-end">
                {c.ambient.items[i]?.caption}
              </figcaption>
            </Ignite>
          ))}
        </div>
      </div>
    </section>
  );
}
