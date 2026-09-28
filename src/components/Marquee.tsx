"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const words = ["Web Development", "App Development", "AI Creatives", "Motion", "Product Design"];

function Row({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className={`mq-row flex w-max ${reverse ? "mq-reverse" : ""}`}>
      {[0, 1].map((k) => (
        <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
          {words.map((w, i) => (
            <span key={w} className="flex items-center">
              <span
                className={`px-[2vw] text-[12vw] font-semibold leading-none tracking-[-0.05em] md:text-[7vw] ${
                  i % 2 ? "serif text-accent" : ""
                }`}
              >
                {w}
              </span>
              <span className="mx-[1vw] inline-block h-[3vw] w-[3vw] rounded-full border border-paper/40 md:h-[1.6vw] md:w-[1.6vw]" />
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Marquee() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>(".mq-row");
      const loops = rows.map((row) => {
        const rev = row.classList.contains("mq-reverse");
        return gsap.fromTo(
          row,
          { xPercent: rev ? -50 : 0 },
          { xPercent: rev ? 0 : -50, duration: 28, ease: "none", repeat: -1 }
        );
      });

      // Scroll velocity speeds the loops up, flips them with direction, and skews the type.
      const skewTo = gsap.quickTo(rows, "skewX", { duration: 0.6, ease: "power3" });
      let dir = 1;
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = self.getVelocity();
          dir = self.direction;
          const boost = 1 + Math.min(Math.abs(v) / 250, 6);
          loops.forEach((l) => gsap.to(l, { timeScale: boost * dir, duration: 0.2, overwrite: true }));
          skewTo(gsap.utils.clamp(-12, 12, v / -180));
        },
        onLeave: () => skewTo(0),
      });
      const settle = setInterval(() => {
        loops.forEach((l) => gsap.to(l, { timeScale: dir, duration: 1.2, overwrite: true }));
        skewTo(0);
      }, 400);
      return () => clearInterval(settle);
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative space-y-2 overflow-clip border-y border-line py-10 md:py-16" aria-label="What we do">
      <Row />
      <div className="text-paper/25">
        <Row reverse />
      </div>
    </section>
  );
}
