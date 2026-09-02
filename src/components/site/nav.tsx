"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/i18n/locale-provider";
import { useSt4 } from "@/content/schema-ext";
import { PROFILE } from "@/content/media";

export function Nav() {
  const c = useSt4();
  const { locale, toggleLocale } = useLocale();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? "border-b border-hairline bg-void/85 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[94rem] items-center gap-6 px-5 sm:px-8">
        <a href="#top" className="flex shrink-0 items-center gap-2.5" aria-label={c.brand.name}>
          <img src="/mark.svg" alt="" className="h-7 w-7" />
          <span className="latin font-display text-[0.92rem] font-bold uppercase leading-none tracking-[0.1em] text-chalk">
            {c.brand.name}
          </span>
        </a>

        <nav className="ms-auto hidden items-center gap-8 md:flex">
          {c.nav.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative py-2 text-[0.84rem] text-chalk-2 transition-colors hover:text-chalk"
            >
              {l.label}
              <span className="spectrum-rule absolute inset-x-0 bottom-1 h-px origin-center scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <a
          href={PROFILE.phoneHref}
          className="ms-auto hidden shrink-0 items-center gap-2 border border-hairline px-4 py-2 text-[0.78rem] font-medium tracking-[0.06em] text-chalk transition-colors hover:border-violet hover:text-violet md:flex"
        >
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-red"
            style={{ animation: "idle-pulse 2.4s ease-in-out infinite" }}
          />
          {c.hero.primaryCta}
        </a>

        <button
          onClick={toggleLocale}
          className="shrink-0 border border-hairline px-3.5 py-1.5 text-[0.72rem] font-medium tracking-[0.14em] text-chalk-2 transition-colors hover:border-violet hover:text-chalk"
          aria-label={c.a11y.toggleLanguage}
        >
          {locale === "ar" ? "EN" : "ع"}
        </button>

        <button
          onClick={() => setOpen((v) => !v)}
          className="border border-hairline p-2 text-chalk md:hidden"
          aria-expanded={open}
          aria-label={open ? c.a11y.closeMenu : c.a11y.openMenu}
        >
          <span className="block h-px w-4 bg-chalk" />
          <span className="mt-1 block h-px w-4 bg-chalk" />
        </button>
      </div>

      {open && (
        <nav className="border-t border-hairline bg-void/95 px-5 pb-4 backdrop-blur-xl md:hidden">
          {c.nav.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-hairline py-3 text-[0.95rem] text-chalk last:border-0"
            >
              {l.label}
            </a>
          ))}
          <a
            href={PROFILE.phoneHref}
            className="mt-3 block border border-hairline px-4 py-2.5 text-center text-[0.82rem] font-medium text-chalk"
          >
            {c.hero.primaryCta}
          </a>
        </nav>
      )}
    </header>
  );
}
