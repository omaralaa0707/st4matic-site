"use client";

import { useSt4 } from "@/content/schema-ext";
import { SHOWROOM_FRAME, PROFILE } from "@/content/media";
import { Ignite, SpecRule } from "@/components/motion/ignite";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-hairline py-5">
      <dt className="plate-label text-chalk-3">{label}</dt>
      <dd className="mt-2.5 text-[clamp(1rem,1.5vw,1.2rem)] leading-snug text-chalk">{children}</dd>
    </div>
  );
}

export function Showroom() {
  const c = useSt4();

  return (
    <section id="showroom" className="relative bg-void py-24 sm:py-32">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
        <Ignite as="div" className="max-w-[42rem]">
          <p className="plate-label text-blue">{c.showroom.eyebrow}</p>
          <h2 className="mt-4 font-display text-display font-bold text-chalk">
            {c.showroom.heading}
          </h2>
          <SpecRule className="mt-5 max-w-[9rem]" delay={100} />
        </Ignite>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,28rem)_minmax(0,1fr)] lg:gap-14">
          <Ignite as="div" delay={80} className="order-2 lg:order-1">
            <dl>
              <Row label={c.contact.addressLabel}>{c.contact.address}</Row>
              <Row label={c.contact.phoneLabel}>
                <a
                  href={PROFILE.phoneHref}
                  className="latin tnum inline-flex items-center gap-2.5 transition-colors hover:text-violet"
                >
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-red"
                    style={{ animation: "idle-pulse 2.4s ease-in-out infinite" }}
                  />
                  {c.contact.phones[0]}
                </a>
              </Row>
              <Row label={c.showroom.hoursLabel}>{c.showroom.hours}</Row>
            </dl>

            <div className="mt-8 space-y-4 text-[0.95rem] leading-relaxed text-chalk-2">
              {c.about.body.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
              {c.showroom.body.map((para) => (
                <p key={para.slice(0, 24)} className="text-chalk-3">
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={c.contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-chalk px-6 py-3.5 font-display text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-void transition-opacity hover:opacity-85"
              >
                {c.showroom.cta}
              </a>
              <a
                href={c.contact.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-hairline px-6 py-3.5 font-display text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-chalk transition-colors hover:border-violet hover:text-violet"
              >
                Facebook
              </a>
            </div>
          </Ignite>

          <Ignite as="div" delay={140} className="order-1 relative lg:order-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-panel lg:aspect-[4/3] lg:max-h-[34rem]">
              <img
                src={SHOWROOM_FRAME}
                alt={c.hero.dialAlt}
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <span aria-hidden="true" className="spectrum-rule absolute inset-x-0 bottom-0 h-[3px]" />
            </div>
          </Ignite>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const c = useSt4();

  return (
    <footer className="bg-void-2 text-chalk">
      <span aria-hidden="true" className="spectrum-rule block h-[3px] w-full" />
      <div className="mx-auto max-w-[86rem] px-5 py-12 sm:px-8 sm:py-14">
        <div className="grid gap-10 md:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] md:gap-16">
          <div>
            <div className="flex items-center gap-2.5">
              <img src="/mark.svg" alt="" className="h-6 w-6" />
              <span className="latin font-display text-[0.86rem] font-bold uppercase tracking-[0.1em]">
                {c.brand.name}
              </span>
            </div>
            <p className="plate-label mt-5 text-violet">{c.brand.tagline}</p>
            <p className="mt-5 text-[0.86rem] leading-relaxed text-chalk-2">{c.contact.address}</p>
            <a
              href={PROFILE.phoneHref}
              className="latin tnum mt-2 inline-block text-[0.95rem] font-semibold text-chalk transition-colors hover:text-violet"
            >
              {c.contact.phones[0]}
            </a>
          </div>
          <div className="space-y-6">
            <nav className="flex flex-wrap gap-x-7 gap-y-3">
              {c.nav.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="plate-label text-chalk-2 transition-colors hover:text-violet"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={c.contact.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="plate-label text-chalk-2 transition-colors hover:text-violet"
              >
                Facebook
              </a>
              <a
                href={c.contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="plate-label text-chalk-2 transition-colors hover:text-violet"
              >
                {c.showroom.cta}
              </a>
            </nav>
            <div className="max-w-2xl space-y-3 border-t border-hairline pt-6">
              <p className="text-[0.82rem] leading-relaxed text-chalk-2">{c.footer.disclaimer}</p>
              <p className="plate-label text-chalk-3">{c.footer.rights}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
