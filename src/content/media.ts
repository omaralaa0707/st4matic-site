/**
 * ST4Matic have no Instagram — the only public archive is their Facebook page
 * (facebook.com/ST4Matic) — so every frame here was pulled from that page's
 * photo grid and post galleries directly in a browser, not through the Apify
 * actor used on earlier sites. Every post follows the same template: a full
 * spec sheet, a "Premium Features" list, and — verbatim on every single
 * listing — the same financing line, which is why FINANCING below is a
 * constant rather than something read out of one car's caption.
 */

export type FrameRole = "ext" | "rear" | "int" | "det";

export type Frame = { src: string; role: FrameRole };

export type CarId = "bmw-520i" | "merc-c180" | "subaru-xv" | "bmw-x4";

export type Spec = {
  engine: string;
  power: string;
  trans: string;
  drive: string;
  mileage: string;
  year: string;
  zero100?: string;
};

export type FleetModel = {
  id: CarId;
  frames: Frame[];
  spec: Spec;
  postUrl: string;
};

const f = (id: string, roles: Partial<Record<FrameRole, number>>): Frame[] =>
  (Object.entries(roles) as [FrameRole, number][]).flatMap(([role, n]) =>
    Array.from({ length: n }, (_, i) => ({
      src: `/media/${id}-${role}-${String(i + 1).padStart(2, "0")}.jpg`,
      role,
    })),
  );

/** Ordered newest-first, the way the four cars appear in their feed. */
export const FLEET: FleetModel[] = [
  {
    id: "bmw-520i",
    frames: f("bmw-520i", { ext: 3, rear: 2, int: 4, det: 6 }),
    spec: {
      engine: "1.6L Twin Turbo",
      power: "170 HP",
      trans: "8-Speed Steptronic Automatic",
      drive: "Rear-Wheel Drive",
      mileage: "139,000 KM",
      year: "2018",
    },
    postUrl: "https://www.facebook.com/ST4Matic/posts/pfbid0iAwht5FQAMrUEXMfDxuBhNsVu5gWLbqUQ5546kZYvg9xYUrc1McJhnR94DxptrnUl",
  },
  {
    id: "merc-c180",
    frames: f("merc-c180", { ext: 3, rear: 2, int: 3, det: 5 }),
    spec: {
      engine: "1.6L Turbo",
      power: "156 HP · 250 Nm",
      trans: "8-Speed 7G-TRONIC Plus",
      drive: "Rear-Wheel Drive",
      mileage: "90,000 KM",
      year: "2018",
    },
    postUrl: "https://www.facebook.com/ST4Matic/posts/pfbid02Ewf17JmTR2myoa6zVG7PVVNB3fjnrRixmmAKVZTVwJdgSLPDWJoM9S4Ld4yToPzHl",
  },
  {
    id: "subaru-xv",
    frames: f("subaru-xv", { ext: 2, rear: 1 }),
    spec: {
      engine: "1.6L Boxer (1600cc)",
      power: "114 HP",
      trans: "Lineartronic CVT",
      drive: "Symmetrical AWD",
      mileage: "78,000 KM",
      year: "2022",
    },
    postUrl: "https://www.facebook.com/ST4Matic/posts/pfbid0FxJX9MxbPCVQwn1MwrMB2wzbLcedS2tDCcRdmSg5xCaFSnzmKmZFhzMxkngsPCUml",
  },
  {
    id: "bmw-x4",
    frames: f("bmw-x4", { ext: 3, rear: 2, int: 3, det: 6 }),
    spec: {
      engine: "2.0L TwinPower Turbo (2000cc)",
      power: "248 HP",
      trans: "8-Speed Automatic",
      drive: "xDrive AWD",
      mileage: "23,000 KM",
      year: "2023",
      zero100: "6.3 sec",
    },
    postUrl: "https://www.facebook.com/ST4Matic/posts/pfbid0BMW5X1W5Y9hjRKELndhjgUTX9GmNJE1JZ452oSj1sFeZovX5BfL1KM8Y3tZ8NGtel",
  },
];

/**
 * "Ambient Light Colors" / "Ambient Lighting" is a listed premium feature on
 * two of the four cars in the fleet, and it is the one feature their own
 * photography actually proves: a cluster ring that reads blue in Comfort and
 * red in Sport, and a violet wash under the door trim. That is the source for
 * this page's whole colour system, not an invented accent.
 */
export const AMBIENT_FRAMES = [
  "/media/ambient-01.jpg",
  "/media/ambient-02.jpg",
  "/media/ambient-03.jpg",
  "/media/ambient-04.jpg",
  "/media/ambient-05.jpg",
];

export const HERO_FRAME = "/media/hero-wide.jpg";
export const HERO_FRAME_SM = "/media/hero-wide-sm.jpg";
export const SHOWROOM_FRAME = "/media/showroom-wide.jpg";

/** Repeated verbatim, in Arabic, on every single post in their feed. */
export const FINANCING = {
  minDownPct: 30,
  maxTermYears: 7,
} as const;

export const PROFILE = {
  facebook: "https://www.facebook.com/ST4Matic/",
  maps: "https://www.google.com/maps/place/ST4matic/data=!4m2!3m1!1s0x0:0x6278cb7725dec3ed",
  phones: ["01097949330", "01008890184", "01147369408"],
  phoneHref: "tel:+201097949330",
  whatsappHref: "https://wa.me/201097949330",
  email: "st.4matic@gmail.com",
  address: "86 Fareed Semeika St, Al Matar, El Nozha, Cairo",
  addressAr: "٨٦ ش فريد سميكة، المطار، قسم النزهة، القاهرة",
  followers: "8.2K",
} as const;
