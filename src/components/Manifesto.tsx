"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

export default function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const split = SplitText.create(".manifesto-text", { type: "words" });
      gsap.fromTo(
        split.words,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: ".manifesto-text", start: "top 80%", end: "bottom 45%", scrub: true },
        }
      );
      gsap.from(".manifesto-orb", {
        scale: 0,
        rotate: -90,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "center center", scrub: true },
      });
      return () => split.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative px-5 py-32 md:px-10 md:py-48">
      <div className="mb-12 flex items-center gap-4">
        <span className="manifesto-orb block h-4 w-4 rounded-full bg-accent" />
        <span className="label text-paper/60">(Who we are)</span>
      </div>
      <p className="manifesto-text max-w-[22ch] text-[8.5vw] font-medium leading-[1.02] tracking-[-0.045em] md:max-w-[26ch] md:text-[5.4vw]">
        We treat every project as a piece of <span className="serif text-accent">art</span>. Websites, apps
        and AI visuals crafted with care, where every pixel, every line of code and every frame is made
        with intent.
      </p>
    </section>
  );
}
