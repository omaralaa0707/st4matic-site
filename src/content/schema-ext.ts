import type { SiteContent } from "@/i18n/schema";
import { useContent } from "@/i18n/locale-provider";
import type { CarId } from "./media";

/**
 * ST4Matic sell reconditioned German and Japanese cars out of one showroom in
 * El Nozha, and every listing they post carries the same boilerplate: a full
 * spec sheet, a "Premium Features" bullet list, and the same two financing
 * numbers (30% minimum down, seven-year maximum term). That boilerplate is
 * the actual differentiator here — not a marque authorization, but a
 * financing structure repeated on every single post — so the shared schema's
 * `services`/`gallery` shape does not fit and this extension carries the
 * fleet + financing + ambient-light vocabulary instead.
 */
export type St4Content = SiteContent & {
  hero: SiteContent["hero"] & {
    headlineLead: string;
    headlineAccent: string;
    dialHint: string;
    dialAlt: string;
  };
  ambient: {
    eyebrow: string;
    heading: string;
    intro: string;
    items: { alt: string; caption: string }[];
  };
  fleet: {
    eyebrow: string;
    heading: string;
    intro: string;
    specLabels: Record<"engine" | "power" | "trans" | "drive" | "mileage" | "zero100", string>;
    featuresLabel: string;
    galleryHint: string;
    roleLabels: Record<"ext" | "rear" | "int" | "det", string>;
    positionLabel: string;
    viewPost: string;
    cars: Record<
      CarId,
      {
        name: string;
        marque: string;
        trim: string;
        blurb: string;
        features: string[];
      }
    >;
  };
  financing: {
    eyebrow: string;
    heading: string;
    intro: string;
    priceLabel: string;
    pricePlaceholder: string;
    downLabel: string;
    termLabel: string;
    yearsUnit: string;
    downResultLabel: string;
    monthlyResultLabel: string;
    balanceLabel: string;
    disclaimer: string;
    sourceNote: string;
  };
  showroom: {
    eyebrow: string;
    heading: string;
    body: string[];
    hoursLabel: string;
    hours: string;
    cta: string;
  };
};

export function useSt4() {
  return useContent() as St4Content;
}
