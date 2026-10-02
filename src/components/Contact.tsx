"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import Magnetic from "./Magnetic";

const EMAIL = "rasmlabs@gmail.com";
const socials = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Behance", href: "#" },
  { label: "GitHub", href: "https://github.com/OmarElbasel" },
];

export default function Contact() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const split = SplitText.create(".cta-title", { type: "chars,lines", mask: "lines" });
      gsap.from(split.chars, {
        yPercent: 110,
        rotate: 8,
        stagger: 0.02,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: ".cta-title", start: "top 80%" },
      });

      gsap.from(".wordmark span", {
        yPercent: 100,
        stagger: 0.05,
        ease: "none",
        scrollTrigger: { trigger: ".wordmark", start: "top bottom", end: "bottom bottom", scrub: true },
      });

      gsap.from(".cta-btn", {
        scale: 0,
        rotate: -120,
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: { trigger: ".cta-btn", start: "top 90%" },
      });
      return () => split.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} id="contact" className="relative overflow-clip rounded-t-[2.5rem] bg-paper px-5 pt-24 text-ink md:px-10 md:pt-36">
      <span className="label text-ink/60">(Start a project)</span>

      <div className="mt-8 grid items-end gap-12 md:grid-cols-[1fr_auto]">
        <h2 className="cta-title text-[14vw] font-semibold leading-[0.88] tracking-[-0.065em] md:text-[9vw]">
          Got an idea?
          <br />
          Let&apos;s <span className="serif text-accent">draw</span> it.
        </h2>

        <Magnetic strength={0.45}>
          <a
            href={`mailto:${EMAIL}?subject=Project%20Inquiry`}
            data-cursor-hide
            className="cta-btn flex h-40 w-40 items-center justify-center rounded-full bg-ink text-center text-paper transition-colors duration-500 hover:bg-accent hover:text-ink md:h-52 md:w-52"
          >
            <span className="label text-sm">
              Start a<br />project ↗
            </span>
          </a>
        </Magnetic>
      </div>

      <div className="mt-24 grid gap-10 border-t border-ink/15 pt-8 md:grid-cols-4">
        <div>
          <span className="label text-ink/50">Email</span>
          <a href={`mailto:${EMAIL}`} className="mt-2 block text-xl font-medium underline-offset-4 hover:underline">
            {EMAIL}
          </a>
        </div>
        <div>
          <span className="label text-ink/50">Services</span>
          <p className="mt-2 text-xl font-medium">Web · Apps · AI Creatives</p>
        </div>
        <div>
          <span className="label text-ink/50">Social</span>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xl font-medium">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="hover:text-accent" target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:text-right">
          <span className="label text-ink/50">© {new Date().getFullYear()}</span>
          <p className="mt-2 text-xl font-medium">Rasmlab Studio</p>
        </div>
      </div>

      <div className="wordmark mt-16 flex select-none justify-center overflow-clip leading-[0.78]" aria-hidden>
        {"rasmlab".split("").map((c, i) => (
          <span
            key={i}
            className={`inline-block text-[26vw] tracking-[-0.07em] ${i >= 4 ? "serif text-accent" : "font-bold"}`}
          >
            {c}
          </span>
        ))}
      </div>
    </section>
  );
}
