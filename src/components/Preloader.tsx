"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion, INTRO_EVENT } from "@/lib/gsap";

function fireIntro() {
  // Dispatched outside this component's GSAP context so listeners keep their own scope.
  setTimeout(() => {
    (window as unknown as { __rasmIntro?: boolean }).__rasmIntro = true;
    window.dispatchEvent(new Event(INTRO_EVENT));
  }, 0);
}

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      window.scrollTo(0, 0);
      if (prefersReducedMotion()) {
        gsap.set(root.current, { autoAlpha: 0 });
        fireIntro();
        return;
      }

      const counter = { v: 0 };
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.from(".pl-word", { yPercent: 110, duration: 1.1, stagger: 0.08 })
        .from(".pl-ar", { autoAlpha: 0, scale: 0.8, duration: 1 }, "<0.2")
        .to(
          counter,
          {
            v: 100,
            duration: 1.6,
            ease: "power2.inOut",
            onUpdate: () => {
              if (count.current) count.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
            },
          },
          0
        )
        .to(".pl-bar", { scaleX: 1, duration: 1.6, ease: "power2.inOut" }, 0)
        .to(".pl-word, .pl-ar", { yPercent: -110, duration: 0.7, ease: "expo.in", stagger: 0.04 }, "+=0.1")
        .add(fireIntro, "-=0.05")
        .to(
          root.current,
          { clipPath: "inset(0% 0% 100% 0%)", duration: 1.1, ease: "expo.inOut" },
          "-=0.2"
        )
        .set(root.current, { display: "none" });
    },
    { scope: root }
  );

  return (
    <div
      ref={root}
      className="preloader fixed inset-0 z-[70] flex flex-col justify-between bg-paper p-6 text-ink md:p-10"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      aria-hidden
    >
      <div className="label flex justify-between">
        <span>Rasmlab® Studio</span>
        <span>Web · Apps · AI</span>
      </div>

      <div className="flex items-end justify-center gap-6">
        <div className="line-mask">
          <span className="pl-word inline-block text-[14vw] font-bold leading-none tracking-[-0.06em] md:text-[9vw]">
            rasm
          </span>
        </div>
        <div className="line-mask">
          <span className="pl-word serif inline-block text-[14vw] leading-none md:text-[9vw]">lab</span>
        </div>
        <div className="line-mask hidden md:block">
          <span className="pl-ar inline-block font-arabic text-[4vw] leading-none text-accent">رسم</span>
        </div>
      </div>

      <div>
        <div className="mb-4 h-px w-full bg-ink/15">
          <div className="pl-bar h-full origin-left scale-x-0 bg-ink" />
        </div>
        <div className="flex items-end justify-between">
          <span className="label max-w-[16rem]">Drawing the digital, one frame at a time.</span>
          <span ref={count} className="font-mono text-5xl tabular-nums md:text-7xl">
            000
          </span>
        </div>
      </div>
    </div>
  );
}
