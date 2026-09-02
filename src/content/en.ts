import type { St4Content } from "./schema-ext";
import { PROFILE } from "./media";

export const en: St4Content = {
  locale: "en",
  dir: "ltr",

  brand: {
    name: "ST4Matic",
    shortName: "ST4",
    tagline: "Drive the Elite",
  },

  nav: [
    { label: "Ambient", href: "#ambient" },
    { label: "Fleet", href: "#fleet" },
    { label: "Financing", href: "#financing" },
    { label: "Showroom", href: "#showroom" },
  ],

  hero: {
    eyebrow: "Reconditioned · El Nozha, Cairo",
    headline: "Drive the Elite",
    headlineLead: "Drive the",
    headlineAccent: "Elite",
    sub: "A reconditioned German and Japanese fleet out of one showroom on Fareed Semeika Street — BMW, Mercedes-Benz, Subaru — every car financeable from 30% down over up to seven years.",
    primaryCta: "Call the showroom",
    secondaryCta: "See the fleet",
    dialHint: "Drag the dial — every colour on it is a real ambient-light mode, lifted from their own cars.",
    dialAlt: "A BMW X4 in black, parked under ST4Matic's own illuminated sign, El Nozha.",
  },

  about: {
    heading: "ST4Matic",
    body: [
      "ST4Matic is a reconditioned-car showroom on Fareed Semeika Street in El Nozha, Cairo, dealing in petrol and electric cars, zero-mileage and used.",
    ],
  },

  services: { heading: "Fleet", items: [] },
  gallery: { heading: "Fleet", items: [] },

  ambient: {
    eyebrow: "Their signature",
    heading: "Ambient light, on the record",
    intro:
      "“Ambient Light Colors” is a bullet point on two of the four cars below — not a marketing line, a spec. Their own photography proves it: a cluster ring that reads blue in Comfort and red in Sport, a violet wash under the door trim. That is where this page's whole colour system comes from.",
    items: [
      { alt: "Violet ambient light along the 520i's door trim, over cognac leather.", caption: "520i · door trim, violet mode" },
      { alt: "The 520i's digital cluster in Comfort mode, ringed in blue.", caption: "520i · cluster, Comfort" },
      { alt: "The 520i's digital cluster in Sport mode, ringed in red.", caption: "520i · cluster, Sport" },
      { alt: "Violet ambient light across the X4's dashboard vents.", caption: "X4 · dash vents, violet mode" },
      { alt: "The C180's instrument cluster glowing red around the tachometer.", caption: "C180 · cluster, red" },
    ],
  },

  fleet: {
    eyebrow: "On the floor",
    heading: "This week's selection",
    intro:
      "Four cars, in the order they posted them. Every spec below is copied from that car's own listing — nothing here is estimated.",
    specLabels: {
      engine: "Engine",
      power: "Power",
      trans: "Transmission",
      drive: "Drivetrain",
      mileage: "Mileage",
      zero100: "0–100 km/h",
    },
    featuresLabel: "Premium features",
    galleryHint: "Swipe or use the arrows",
    roleLabels: { ext: "Exterior", rear: "Rear", int: "Cabin", det: "Detail" },
    positionLabel: "Car {n} of {total}",
    viewPost: "See the original listing",
    cars: {
      "bmw-520i": {
        name: "520i Luxury Line",
        marque: "BMW",
        trim: "Luxury Line",
        blurb: "A perfect combination of luxury, performance and German engineering.",
        features: [
          "Luxury leather interior",
          "Electric seats & memory",
          "Sunroof",
          "Ambient light colors",
          "iDrive infotainment, navigation & CarPlay",
          "Rear-view camera & parking sensors",
        ],
      },
      "merc-c180": {
        name: "C180 Avantgarde",
        marque: "Mercedes-Benz",
        trim: "Avantgarde",
        blurb: "The Avantgarde package, with seven airbags and every driver-assist Mercedes offered on the car.",
        features: [
          "LED high-performance headlights",
          "17-inch alloy wheels",
          "Leather seats with memory",
          "Sunroof",
          "Multiple driving modes (Dynamic Select)",
          "Rain & light sensors",
        ],
      },
      "subaru-xv": {
        name: "XV",
        marque: "Subaru",
        trim: "AWD",
        blurb: "Smart, safe and ready for every road — perfect for daily use with signature AWD stability.",
        features: [
          "Touchscreen display",
          "Apple CarPlay & Android Auto",
          "Adaptive cruise control",
          "Lane assist",
          "Multiple airbags",
        ],
      },
      "bmw-x4": {
        name: "X4 M Sport",
        marque: "BMW",
        trim: "M Sport",
        blurb: "Power meets elegance — a coupe design with a spacious trunk and aggressive road presence.",
        features: [
          "12.3” digital display & iDrive",
          "Leather seats with memory",
          "Ambient lighting",
          "Panoramic sunroof",
          "Harman Kardon sound system",
          "360° camera & parking sensors",
        ],
      },
    },
  },

  financing: {
    eyebrow: "Their terms",
    heading: "Every car, on your terms",
    intro:
      "Every listing they post closes with the same two numbers: a minimum down payment and a maximum term. Enter a price and drag the sliders to see how those two numbers actually move the monthly figure.",
    priceLabel: "Car price (EGP)",
    pricePlaceholder: "e.g. 900,000",
    downLabel: "Down payment",
    termLabel: "Term",
    yearsUnit: "years",
    downResultLabel: "Down payment",
    monthlyResultLabel: "Est. monthly",
    balanceLabel: "Financed balance",
    disclaimer: "Illustrative only — a straight-line split of the balance, no interest modelled. Call the showroom for an actual quote.",
    sourceNote: "“We have every installment system — down payment starting from 30%, repayment period up to 7 years.” — published on every ST4Matic listing",
  },

  showroom: {
    eyebrow: "Visit",
    heading: "The showroom",
    body: [
      "ST4Matic's own storefront sign lights up over Fareed Semeika Street in El Nozha — the same sign that shows up, out of focus, in the windshield reflection of half the cars in their feed.",
      "8,200 people follow the page for exactly one thing: a new car parked under that sign, with a spec sheet and a financing line attached.",
    ],
    hoursLabel: "Hours",
    hours: "Daily, by appointment — call ahead",
    cta: "Get directions",
  },

  contact: {
    heading: "Talk to the showroom",
    intro: "Three numbers, one address, every day.",
    addressLabel: "Showroom",
    address: PROFILE.address,
    phoneLabel: "Call or WhatsApp",
    phones: [...PROFILE.phones],
    hoursLabel: "Hours",
    hours: "Daily, by appointment",
    mapsUrl: PROFILE.maps,
    facebookUrl: PROFILE.facebook,
    cta: "Call the showroom",
  },

  footer: {
    disclaimer:
      "A concept design, built as a demonstration. Not an official ST4Matic site, and not affiliated with them. All photography, marks and quoted copy belong to ST4Matic.",
    rights: "Concept by Claude",
  },

  a11y: {
    toggleLanguage: "التبديل إلى العربية",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
};
