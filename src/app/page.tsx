import { Nav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { Ambient } from "@/components/site/ambient";
import { Fleet } from "@/components/site/fleet";
import { Financing } from "@/components/site/financing";
import { Showroom, Footer } from "@/components/site/showroom";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Ambient />
        <Fleet />
        <Financing />
        <Showroom />
      </main>
      <Footer />
    </>
  );
}
