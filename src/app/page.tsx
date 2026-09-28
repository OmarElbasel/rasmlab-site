import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Services from "@/components/Services";
import Marquee from "@/components/Marquee";
import Work from "@/components/Work";
import Process from "@/components/Process";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <Services />
        <Marquee />
        <Work />
        <Process />
        <Contact />
      </main>
    </>
  );
}
