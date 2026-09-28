"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const steps = [
  { n: "01", title: "Discover", text: "Workshops, audits and a hard look at what success means. We leave with a brief everyone signs off on.", bg: "var(--paper)", fg: "var(--ink)" },
  { n: "02", title: "Design", text: "Sketches become systems. Wireframes, visual direction and motion studies, tested early with real people.", bg: "var(--accent)", fg: "var(--ink)" },
  { n: "03", title: "Build", text: "Production code from day one. Weekly previews, performance budgets and no surprise hand-offs.", bg: "var(--accent-2)", fg: "var(--paper)" },
  { n: "04", title: "Launch & grow", text: "We ship, measure and keep iterating. AI-made creative keeps the campaign fresh after launch.", bg: "var(--ink-2)", fg: "var(--paper)" },
];

const stats = [
  { value: 3, suffix: "", label: "Disciplines under one roof" },
  { value: 60, suffix: "fps", label: "Motion budget, every page" },
  { value: 100, suffix: "%", label: "Custom built, no templates" },
];

export default function Process() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".proc-card");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        // As the next card slides over, the current one recedes.
        gsap.to(card.querySelector(".proc-inner"), {
          scale: 0.9,
          filter: "brightness(0.55)",
          rotate: i % 2 ? 1.5 : -1.5,
          ease: "none",
          scrollTrigger: { trigger: cards[i + 1], start: "top bottom", end: "top 15%", scrub: true },
        });
      });

      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const end = Number(el.dataset.value);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end,
          duration: 2,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => (el.textContent = String(Math.round(obj.v))),
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="process" className="px-5 py-32 md:px-10 md:py-44">
      <div className="mb-16 grid gap-10 md:mb-24 md:grid-cols-2">
        <div>
          <span className="label text-paper/60">(How we work)</span>
          <h2 className="mt-6 text-[13vw] font-semibold leading-[0.9] tracking-[-0.06em] md:text-[6.5vw]">
            From sketch
            <br />
            to <span className="serif text-accent">ship</span>.
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-4 self-end border-t border-line pt-6">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                <span className="stat-num tabular-nums" data-value={s.value}>0</span>
                <span className="text-accent">{s.suffix}</span>
              </div>
              <p className="label mt-2 text-paper/60">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative">
        {steps.map((s, i) => (
          <div key={s.n} className="proc-card sticky mb-6 h-[70svh] md:h-[75svh]" style={{ top: `calc(12svh + ${i * 1.5}rem)` }}>
            <div
              className="proc-inner flex h-full origin-top flex-col justify-between rounded-3xl p-6 md:p-12"
              style={{ background: s.bg, color: s.fg }}
            >
              <div className="flex items-start justify-between">
                <span className="label">Step {s.n}</span>
                <span className="text-[22vw] font-bold leading-[0.75] tracking-[-0.08em] opacity-15 md:text-[12vw]">{s.n}</span>
              </div>
              <div className="grid gap-6 md:grid-cols-2 md:items-end">
                <h3 className="text-[14vw] font-semibold leading-[0.9] tracking-[-0.06em] md:text-[7vw]">{s.title}</h3>
                <p className="max-w-md text-lg leading-snug md:justify-self-end md:text-xl">{s.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
