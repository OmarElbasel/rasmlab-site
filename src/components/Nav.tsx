"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, onIntro } from "@/lib/gsap";
import { getLenis } from "./SmoothScroll";
import Magnetic from "./Magnetic";

const links = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    (_, contextSafe) => {
      gsap.set(".nav-item", { yPercent: -120 });
      const off = onIntro(contextSafe!(() =>
        gsap.to(".nav-item", { yPercent: 0, duration: 1.2, ease: "expo.out", stagger: 0.05, delay: 0.5 })
      ));

      // Hide on scroll down, reveal on scroll up.
      const show = gsap
        .from(root.current, { yPercent: -100, paused: true, duration: 0.5, ease: "power3.out" })
        .progress(1);
      ScrollTrigger.create({
        start: "top top-=120",
        end: "max",
        onUpdate: (self) => (self.direction === -1 ? show.play() : show.reverse()),
      });
      return off;
    },
    { scope: root }
  );

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const lenis = getLenis();
    if (!lenis) return;
    e.preventDefault();
    lenis.scrollTo(href, { duration: 1.6 });
  };

  return (
    <header
      ref={root}
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 mix-blend-difference md:px-10"
    >
      <div className="overflow-clip">
        <a
          href="#top"
          onClick={(e) => go(e, "#top")}
          className="nav-item block text-xl font-bold tracking-[-0.04em]"
        >
          rasm<span className="serif font-normal">lab</span>
          <sup className="ml-0.5 text-[0.55em]">®</sup>
        </a>
      </div>

      <nav className="hidden gap-8 md:flex">
        {links.map((l) => (
          <div key={l.href} className="overflow-clip">
            <a href={l.href} onClick={(e) => go(e, l.href)} className="nav-item group label relative block">
              <span className="block transition-transform duration-500 ease-[var(--ease-out)] group-hover:-translate-y-full">
                {l.label}
              </span>
              <span className="absolute left-0 top-full block transition-transform duration-500 ease-[var(--ease-out)] group-hover:-translate-y-full">
                {l.label}
              </span>
            </a>
          </div>
        ))}
      </nav>

      <div className="overflow-clip p-1">
        <Magnetic strength={0.3}>
          <a
            href="#contact"
            onClick={(e) => go(e, "#contact")}
            className="nav-item label flex items-center gap-2 rounded-full border border-paper/40 px-4 py-2 transition-colors hover:bg-paper hover:text-ink"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-paper" />
            Let&apos;s talk
          </a>
        </Magnetic>
      </div>
    </header>
  );
}
