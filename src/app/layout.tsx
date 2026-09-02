import type { Metadata } from "next";
import { Rajdhani, Plus_Jakarta_Sans, El_Messiri, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/i18n/locale-provider";
import { ScrollProvider } from "@/components/motion/scroll-provider";
import { ar } from "@/content/ar";
import { en } from "@/content/en";

// Their wordmark is a squared, faintly technical caps setting, and the car
// they photograph most is a dashboard full of digital dials. Rajdhani carries
// that same instrument-cluster geometry without tipping into a gamer HUD face.
const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-rajdhani",
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jakarta",
});
const elMessiri = El_Messiri({
  subsets: ["arabic"],
  weight: ["500", "600", "700"],
  variable: "--font-elmessiri",
});
const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  variable: "--font-notoarabic",
});

export const metadata: Metadata = {
  title: "ST4Matic — Drive the Elite | Reconditioned BMW, Mercedes & Subaru, El Nozha",
  description:
    "A reconditioned German and Japanese fleet from one showroom on Fareed Semeika Street, El Nozha. Every car financeable from 30% down over up to seven years.",
  metadataBase: new URL("https://st4matic-site.vercel.app"),
  icons: { icon: "/mark.svg" },
  openGraph: {
    title: "ST4Matic — Drive the Elite",
    description: "Reconditioned BMW, Mercedes-Benz and Subaru, one showroom in El Nozha, Cairo.",
    images: ["/media/hero-wide.jpg"],
    locale: "ar_EG",
    type: "website",
  },
  other: { "theme-color": "#0a0b0d" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // translate="no": the page ships hand-written Arabic and English, and
    // Chrome's auto-translate rewrites `lang`, which would also break every
    // [dir="rtl"] correction if the CSS were keyed off language instead.
    <html
      lang="ar"
      dir="rtl"
      translate="no"
      className={`notranslate ${rajdhani.variable} ${jakarta.variable} ${elMessiri.variable} ${notoArabic.variable}`}
    >
      <body className="bg-void text-chalk antialiased">
        {/* Sections arrive with an intersection observer, so without
            scripting every one of them would stay at opacity 0. */}
        <noscript>
          <style>{`[data-ignite],[data-fill]{opacity:1!important;transform:none!important;animation:none!important}`}</style>
        </noscript>
        <LocaleProvider dictionaries={{ ar, en }} defaultLocale="ar">
          <ScrollProvider />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
