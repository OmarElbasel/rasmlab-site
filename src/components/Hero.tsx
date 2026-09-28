"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { gsap, useGSAP, onIntro } from "@/lib/gsap";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

const lines: React.ReactNode[] = [
  <>We <span className="serif text-accent">draw</span> the</>,
  <>future of</>,
  <>digital<span className="text-accent">.</span></>,
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const scroll = useRef(0);

  useGSAP(
    (_, contextSafe) => {
      gsap.set(".hero-line", { yPercent: 115, rotate: 4 });
      gsap.set(".hero-fade", { autoAlpha: 0, y: 20 });

      const off = onIntro(contextSafe!(() => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.to(progress, { current: 1, duration: 2.6, ease: "power2.out" }, 0)
          .to(".hero-line", { yPercent: 0, rotate: 0, duration: 1.6, stagger: 0.1 }, 0.15)
          .to(".hero-fade", { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.08 }, 0.7);
      }));

      // Exit: headline drifts up and apart while the ink fades to black.
      gsap
        .timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        })
        .to(scroll, { current: 1, ease: "none" }, 0)
        .to(".hero-title", { yPercent: -35, ease: "none" }, 0)
        .to(".hero-line-wrap", { xPercent: (i) => (i % 2 ? 6 : -6), ease: "none" }, 0)
        .to(".hero-bottom", { yPercent: -80, autoAlpha: 0, ease: "none" }, 0);

      return off;
    },
    { scope: root }
  );

  return (
    <section ref={root} id="top" className="relative h-[100svh] min-h-[640px] w-full overflow-clip">
      <div className="absolute inset-0">
        <HeroCanvas progress={progress} scroll={scroll} />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-8 md:px-10 md:pb-10">
        <h1 className="hero-title mb-10 text-[15.5vw] font-semibold leading-[0.86] tracking-[-0.065em] md:mb-14 md:text-[11.2vw]">
          {lines.map((l, i) => (
            <div key={i} className={`hero-line-wrap line-mask ${i === 1 ? "md:pl-[12vw]" : ""}`}>
              <div className="hero-line origin-top-left">{l}</div>
            </div>
          ))}
        </h1>

        <div className="hero-bottom grid grid-cols-2 items-end gap-6 border-t border-line pt-5 md:grid-cols-4">
          <p className="hero-fade col-span-2 max-w-md text-base leading-snug text-paper/80 md:text-lg">
            Rasmlab is a studio for websites, mobile apps and AI-made creative. We design it, build it and
            make it move.
          </p>
          <ul className="hero-fade label space-y-1 text-paper/60">
            <li>01 — Web Development</li>
            <li>02 — App Development</li>
            <li>03 — AI Creatives</li>
          </ul>
          <div className="hero-fade flex items-center justify-end gap-3">
            <span className="label text-paper/60">Scroll</span>
            <span className="relative block h-10 w-px overflow-clip bg-paper/20">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_1.8s_var(--ease-out)_infinite] bg-paper" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
