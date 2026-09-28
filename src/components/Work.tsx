"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { projects, type Project } from "@/data/projects";

function Cover({ p }: { p: Project }) {
  if (p.image) {
    return <Image src={p.image} alt={p.title} fill sizes="(min-width: 768px) 70vw, 100vw" className="object-cover" />;
  }
  const [a, b] = p.palette;
  return (
    <div className="absolute inset-0 bg-ink-2">
      <div
        className="absolute -left-1/4 -top-1/4 h-[90%] w-[70%] animate-[drift_14s_ease-in-out_infinite] rounded-full blur-[70px]"
        style={{ background: a, opacity: 0.8 }}
      />
      <div
        className="absolute -bottom-1/4 -right-1/4 h-[90%] w-[70%] animate-[drift_18s_ease-in-out_infinite_reverse] rounded-full blur-[80px]"
        style={{ background: b, opacity: 0.75 }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="serif text-[18vw] leading-none text-paper/90 mix-blend-overlay md:text-[10vw]">{p.title}</span>
      </div>
    </div>
  );
}

export default function Work() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".work-head .line-mask > *", {
        yPercent: 110,
        duration: 1.4,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".work-head", start: "top 80%" },
      });

      gsap.utils.toArray<HTMLElement>(".work-card").forEach((card) => {
        const frame = card.querySelector(".work-frame");
        const inner = card.querySelector(".work-inner");
        gsap.fromTo(
          frame,
          { clipPath: "inset(18% 12% 18% 12% round 24px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 24px)",
            ease: "none",
            scrollTrigger: { trigger: card, start: "top 95%", end: "top 25%", scrub: true },
          }
        );
        gsap.fromTo(
          inner,
          { scale: 1.35, yPercent: -8 },
          {
            scale: 1,
            yPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
        gsap.from(card.querySelectorAll(".work-meta > *"), {
          y: 30,
          opacity: 0,
          stagger: 0.06,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: card, start: "top 60%" },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="work" className="px-5 py-32 md:px-10 md:py-44">
      <div className="work-head mb-20 flex flex-col justify-between gap-8 md:mb-28 md:flex-row md:items-end">
        <h2 className="text-[14vw] font-semibold leading-[0.88] tracking-[-0.06em] md:text-[9vw]">
          <div className="line-mask"><div>Selected</div></div>
          <div className="line-mask"><div className="serif text-accent md:pl-[8vw]">work</div></div>
        </h2>
        <p className="max-w-xs text-paper/70">
          A few things we&apos;ve drawn lately. Each one started as a sketch and shipped as a product.
        </p>
      </div>

      <div className="space-y-28 md:space-y-40">
        {projects.map((p, i) => (
          <article key={p.slug} className={`work-card md:w-[78%] ${i % 2 ? "md:ml-auto" : ""}`}>
            <a
              href={p.url ?? "#contact"}
              target={p.url ? "_blank" : undefined}
              rel={p.url ? "noreferrer" : undefined}
              data-cursor={p.placeholder ? "Soon" : "View"}
              className="group block"
            >
              <div className="work-frame relative aspect-[16/10] overflow-clip rounded-3xl">
                <div className="work-inner absolute inset-0 transition-transform duration-[1.2s] ease-[var(--ease-out)]">
                  <Cover p={p} />
                </div>
                {p.placeholder && (
                  <span className="label absolute left-5 top-5 rounded-full bg-ink/70 px-3 py-1.5 text-paper backdrop-blur">
                    Case study coming soon
                  </span>
                )}
              </div>

              <div className="work-meta mt-6 grid grid-cols-2 gap-4 md:grid-cols-[1fr_auto_auto] md:items-baseline">
                <h3 className="col-span-2 text-4xl font-semibold tracking-[-0.04em] md:col-span-1 md:text-6xl">
                  <span className="label mr-4 align-middle text-paper/40">0{i + 1}</span>
                  <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-700 ease-[var(--ease-out)] group-hover:bg-[length:100%_2px]">
                    {p.title}
                  </span>
                </h3>
                <span className="label text-paper/60">{p.services.join(" · ")}</span>
                <span className="label text-right text-paper/60">
                  {p.client} — {p.year}
                </span>
                <p className="col-span-2 max-w-lg text-paper/70 md:col-span-3">{p.summary}</p>
              </div>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
