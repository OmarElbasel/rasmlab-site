"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { services } from "@/data/services";
import { WebVisual, AppVisual, AIVisual } from "./ServiceVisuals";

const visuals = { web: WebVisual, app: AppVisual, ai: AIVisual } as const;

export default function Services() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: pinned horizontal scroll through the three services.
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const distance = () => track.current!.scrollWidth - window.innerWidth;
        const scroller = gsap.to(track.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(".svc-progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${distance()}`, scrub: true },
        });

        gsap.utils.toArray<HTMLElement>(".svc-panel").forEach((panel) => {
          gsap.from(panel.querySelectorAll(".svc-reveal"), {
            yPercent: 100,
            opacity: 0,
            stagger: 0.06,
            ease: "expo.out",
            duration: 1.2,
            scrollTrigger: { trigger: panel, containerAnimation: scroller, start: "left 70%" },
          });
          gsap.fromTo(
            panel.querySelector(".svc-visual"),
            { xPercent: 18, rotate: 4 },
            {
              xPercent: -10,
              rotate: -2,
              ease: "none",
              scrollTrigger: { trigger: panel, containerAnimation: scroller, start: "left right", end: "right left", scrub: true },
            }
          );
          gsap.fromTo(
            panel.querySelector(".svc-index"),
            { xPercent: -30 },
            {
              xPercent: 30,
              ease: "none",
              scrollTrigger: { trigger: panel, containerAnimation: scroller, start: "left right", end: "right left", scrub: true },
            }
          );
        });
      });

      // Mobile: simple rise-in per panel.
      mm.add("(max-width: 767px)", () => {
        gsap.utils.toArray<HTMLElement>(".svc-panel").forEach((panel) =>
          gsap.from(panel.querySelectorAll(".svc-reveal"), {
            y: 40,
            opacity: 0,
            stagger: 0.06,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: { trigger: panel, start: "top 80%" },
          })
        );
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="services" className="relative overflow-clip bg-ink md:h-[100svh]">
      <div className="absolute inset-x-5 top-6 z-10 hidden items-center gap-4 md:inset-x-10 md:flex">
        <span className="label text-paper/60">(Services)</span>
        <div className="h-px flex-1 bg-line">
          <div className="svc-progress h-full origin-left scale-x-0 bg-accent" />
        </div>
        <span className="label text-paper/60">03</span>
      </div>

      <div ref={track} className="flex h-full flex-col md:w-max md:flex-row">
        <div className="flex shrink-0 flex-col justify-center px-5 py-24 md:h-full md:w-[60vw] md:px-10 md:py-0">
          <span className="label mb-6 text-paper/60 md:hidden">(Services)</span>
          <h2 className="text-[13vw] font-semibold leading-[0.9] tracking-[-0.06em] md:text-[7.5vw]">
            Three crafts,
            <br />
            <span className="serif text-accent">one</span> studio.
          </h2>
          <p className="mt-8 max-w-sm text-paper/70">
            Most projects use all three. A launch site, the app it sells, and the visuals that make people
            stop scrolling.
          </p>
        </div>

        {services.map((s) => {
          const Visual = visuals[s.id as keyof typeof visuals];
          return (
            <article
              key={s.id}
              className="svc-panel relative flex shrink-0 flex-col gap-10 border-t border-line px-5 py-16 md:h-full md:w-[88vw] md:flex-row md:items-center md:gap-16 md:border-l md:border-t-0 md:px-14 md:py-0 lg:w-[75vw]"
            >
              <span className="svc-index pointer-events-none absolute -bottom-[4vw] right-6 select-none text-[34vw] font-bold leading-none tracking-[-0.08em] text-paper/[0.04] md:text-[22vw]">
                {s.index}
              </span>

              <div className="relative flex-1">
                <div className="overflow-clip">
                  <span className="svc-reveal label block text-accent">
                    {s.index} / {s.accent}
                  </span>
                </div>
                <div className="mt-5 overflow-clip">
                  <h3 className="svc-reveal text-[11vw] font-semibold leading-[0.92] tracking-[-0.05em] md:text-[4.6vw]">
                    {s.title}
                  </h3>
                </div>
                <div className="overflow-clip">
                  <p className="svc-reveal mt-6 max-w-md text-lg leading-snug text-paper/75">{s.blurb}</p>
                </div>
                <ul className="mt-8 flex max-w-md flex-wrap gap-2">
                  {s.deliverables.map((d) => (
                    <li key={d} className="overflow-clip">
                      <span className="svc-reveal label block rounded-full border border-line px-3 py-1.5 text-paper/80">
                        {d}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative w-full md:w-[42%]">
                <Visual />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
