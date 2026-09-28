"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion, INTRO_EVENT } from "@/lib/gsap";

let current: Lenis | null = null;
/** The active Lenis instance, or null when reduced motion is on. */
export const getLenis = () => current;

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      autoRaf: false,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Held still while the preloader runs.
    const intro = (window as unknown as { __rasmIntro?: boolean }).__rasmIntro;
    const start = () => lenis.start();
    if (!intro) {
      lenis.stop();
      window.addEventListener(INTRO_EVENT, start, { once: true });
    }

    current = lenis;
    return () => {
      window.removeEventListener(INTRO_EVENT, start);
      gsap.ticker.remove(tick);
      lenis.destroy();
      current = null;
    };
  }, []);

  return <>{children}</>;
}
