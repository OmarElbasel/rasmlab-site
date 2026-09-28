"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Blend-mode cursor. Elements can set `data-cursor="View"` to morph it into a
 * labelled disc, or `data-cursor-hide` to hide it (e.g. over magnetic buttons).
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.documentElement.classList.add("has-cursor");

    const el = dot.current!;
    gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0 });
    let seen = false;
    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });

    const move = (e: PointerEvent) => {
      if (!seen) {
        seen = true;
        gsap.set(el, { x: e.clientX, y: e.clientY });
        gsap.to(el, { opacity: 1, duration: 0.4 });
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const over = (e: PointerEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor], a, button, [data-cursor-hide]");
      if (!t) {
        setLabel("");
        gsap.to(el, { width: 14, height: 14, opacity: 1, duration: 0.4, ease: "expo.out" });
        return;
      }
      if (t.hasAttribute("data-cursor-hide")) {
        gsap.to(el, { width: 0, height: 0, duration: 0.3 });
        return;
      }
      const text = t.dataset.cursor ?? "";
      setLabel(text);
      const size = text ? 96 : 48;
      gsap.to(el, { width: size, height: size, opacity: 1, duration: 0.5, ease: "expo.out" });
    };

    const down = () => gsap.to(el, { scale: 0.8, duration: 0.2 });
    const up = () => gsap.to(el, { scale: 1, duration: 0.3 });

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <div
      ref={dot}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[80] hidden h-[14px] w-[14px] items-center justify-center rounded-full text-ink [@media(hover:hover)_and_(pointer:fine)]:flex"
      style={{
        background: label ? "var(--accent)" : "var(--paper)",
        mixBlendMode: label ? "normal" : "difference",
      }}
    >
      <span className="label whitespace-nowrap text-[0.65rem] text-ink">{label}</span>
    </div>
  );
}
