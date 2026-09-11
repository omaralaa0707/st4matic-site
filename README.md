# ST4Matic — site 09 of 46

A concept site built entirely from this dealership's own published material.
**Not affiliated with ST4Matic, and not an official site.**

- **Live:** https://st4matic-site.vercel.app
- **Repo:** [st4matic-site](https://github.com/omaralaa0707/st4matic-site)

## What this page is about

Every site in this series is built around something true and checkable about
the dealer's own account — a pattern in what they publish, a contradiction
between two of their channels, or a fact about their showroom — rather than
around a generic template. The palette, type, 3D piece and motion below were
all chosen to serve that finding.

## Design record

**Palette**
: Void black #0A0B0D / graphite over a **cycling ambient spectrum** — icy blue #57C6F2, violet #A06BFF, red #FF4A3D, amber #FFA23C — sampled from their own cars' cluster ring (blue in Comfort, red in Sport) and the violet wash under their door trim

**Type pairing**
: Rajdhani + Plus Jakarta Sans / El Messiri + Noto Sans Arabic (AR)

**3D / signature technique**
: Instanced radial instrument gauge: 96 tick bars on a 288° clockwise sweep, each coloured by its angular position across the ambient spectrum, lit up to the current value and dark beyond it, with an additive radial glow that takes the lit average and a spring-driven needle

**Motion language**
: Ignition sweep: elements arrive rotated ~5° off true, swing past and settle, the way a gauge needle finds a reading — no slide, no wipe, no filament strike

## Sources

Everything on the page was sourced from:

- Facebook: https://www.facebook.com/ST4Matic/
- Google Maps: https://www.google.com/maps/place/ST4matic/data=!4m2!3m1!1s0x0:0x6278cb7725dec3ed

Photography belongs to the dealership (or, where their frames are watermarked
by an outside studio, to that studio) and is used here only to document their
own published material. No figure on the page is invented: anything the dealer
did not publish is marked as unpublished rather than estimated.

## Running it

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build — must pass before shipping
pnpm lint     # eslint, zero warnings
```

Requires `node-linker=hoisted` in `.npmrc` (already present) or three.js peer
deps fail to resolve.

## Structure

```
src/content/media.ts      verified facts and figures — the data layer
src/content/en.ts|ar.ts   all copy, both locales, identical shapes
src/content/schema-ext.ts the page-specific content contract
src/components/webgl/     the 3D piece
src/components/site/      the page composition
src/app/globals.css       palette tokens, type, RTL overrides, motion
```

Arabic/English toggle with full RTL. All CSS direction overrides key off
`[dir="rtl"]` (never `[lang]`) and live outside `@layer`. Every Latin or
numeric fragment inside Arabic copy is wrapped in `.latin` for correct bidi.

---

Part of a 46-site series. See the [top-level README](../README.md) for the full
index and [`TRACKING.md`](../TRACKING.md) for the differentiation log.
