"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { projects, type Project } from "@/data/projects";

/** Phone screen is 9:19.5; the mobile capture is 600px wide. */
const PHONE_RATIO = 19.5 / 9;

function Showcase({ p }: { p: Project }) {
  const { theme, shots } = p;
  const domain = new URL(p.url).hostname.replace(/^www\./, "");
  const scroll = -(1 - (PHONE_RATIO * 600) / shots.mobileHeight) * 100;

  return (
    <div className="absolute inset-0 [container-type:inline-size]" style={{ background: theme.bg, color: theme.ink }}>
      <div className="work-inner absolute inset-0">
        <div
          className="absolute -left-[10%] -top-[20%] h-[80%] w-[55%] animate-[drift_16s_ease-in-out_infinite] rounded-full blur-[80px]"
          style={{ background: theme.glow[0], opacity: 0.55 }}
        />
        <div
          className="absolute -bottom-[25%] right-[5%] h-[75%] w-[45%] animate-[drift_20s_ease-in-out_infinite_reverse] rounded-full blur-[90px]"
          style={{ background: theme.glow[1], opacity: 0.45 }}
        />
        <span
          aria-hidden
          className={`absolute -bottom-[3cqw] left-[3cqw] whitespace-nowrap text-[17cqw] leading-none opacity-[0.07] ${theme.wordmarkClass}`}
        >
          {p.title}
        </span>
      </div>

      {/* Browser window */}
      <div className="work-browser absolute left-[6%] top-[9%] w-[70%]">
        <div className="transition-transform duration-[1.2s] ease-[var(--ease-out)] group-hover:-translate-x-[1cqw] group-hover:-translate-y-[0.6cqw]">
          <div className="overflow-clip rounded-[1.1cqw] bg-[#1b1b1d] shadow-[0_4cqw_8cqw_-2cqw_rgba(0,0,0,0.45)] ring-1 ring-black/10">
            <div className="flex h-[3.2cqw] items-center gap-[0.6cqw] px-[1.3cqw]">
              <span className="size-[0.85cqw] rounded-full bg-[#ff5f57]" />
              <span className="size-[0.85cqw] rounded-full bg-[#febc2e]" />
              <span className="size-[0.85cqw] rounded-full bg-[#28c840]" />
              <span className="mx-auto flex h-[1.9cqw] w-[38%] items-center justify-center gap-[0.5cqw] rounded-[0.6cqw] bg-white/[0.07] font-mono text-[1.05cqw] text-white/60">
                <svg viewBox="0 0 16 16" className="size-[1cqw] fill-current" aria-hidden>
                  <path d="M4 7V5a4 4 0 1 1 8 0v2h1v8H3V7h1Zm2 0h4V5a2 2 0 1 0-4 0v2Z" />
                </svg>
                {domain}
              </span>
              <span className="w-[3.3cqw]" />
            </div>
            <div className="relative aspect-[16/10]">
              <Image
                src={shots.desktop}
                alt={`${p.title} website on desktop`}
                fill
                sizes="(min-width: 768px) 55vw, 70vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Phone */}
      <div className="work-phone absolute right-[7%] top-[11%] w-[20.5%]">
        <div className="transition-transform delay-75 duration-[1.2s] ease-[var(--ease-out)] group-hover:-translate-y-[1.4cqw] group-hover:rotate-[-1.5deg]">
          <div className="rounded-[3.4cqw] bg-[#0c0c0d] p-[0.75cqw] shadow-[0_4cqw_7cqw_-1.5cqw_rgba(0,0,0,0.55)] ring-1 ring-white/10">
            <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.7cqw] bg-black">
              <div
                className="animate-[phone-scroll_42s_ease-in-out_infinite_alternate] will-change-transform motion-reduce:animate-none"
                style={{ "--scroll": `${scroll}%` } as CSSProperties}
              >
                <Image
                  src={shots.mobile}
                  alt={`${p.title} website on mobile`}
                  width={600}
                  height={shots.mobileHeight}
                  sizes="(min-width: 768px) 17vw, 20vw"
                  className="h-auto w-full"
                />
              </div>
              <span className="absolute left-1/2 top-[1.1cqw] h-[1.6cqw] w-[32%] -translate-x-1/2 rounded-full bg-black" />
            </div>
          </div>
        </div>
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
        const scrub = { trigger: card, start: "top bottom", end: "bottom top", scrub: true };
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
            scrollTrigger: scrub,
          }
        );
        gsap.fromTo(card.querySelector(".work-browser"), { yPercent: 8 }, { yPercent: -3, ease: "none", scrollTrigger: scrub });
        gsap.fromTo(card.querySelector(".work-phone"), { yPercent: 16 }, { yPercent: -8, ease: "none", scrollTrigger: scrub });
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
              href={p.url}
              target="_blank"
              rel="noreferrer"
              data-cursor="Visit"
              className="group block"
            >
              <div className="work-frame relative aspect-[16/10] overflow-clip rounded-3xl">
                <Showcase p={p} />
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
                <p className="col-span-2 max-w-lg text-paper/70 md:col-span-2">{p.summary}</p>
                <span className="label col-span-2 inline-flex items-center gap-2 self-end text-paper md:col-span-1 md:justify-self-end">
                  {new URL(p.url).hostname.replace(/^www\./, "")}
                  <span className="transition-transform duration-500 ease-[var(--ease-out)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    ↗
                  </span>
                </span>
              </div>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
