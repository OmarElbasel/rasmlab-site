/**
 * Portfolio. Screenshots live in /public/work: a 16:10 desktop capture and a
 * full-length mobile capture that scrolls inside the phone mockup.
 */
export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  services: string[];
  summary: string;
  url: string;
  shots: {
    /** 16:10 desktop screenshot, e.g. "/work/project-desktop.jpg". */
    desktop: string;
    /** Full-page mobile screenshot (600px wide). */
    mobile: string;
    mobileHeight: number;
  };
  /** Stage background, glow and wordmark colours for the showcase. */
  theme: {
    bg: string;
    glow: [string, string];
    ink: string;
    wordmarkClass: string;
  };
};

export const projects: Project[] = [
  {
    slug: "area-code",
    title: "Area Code",
    client: "Area Code",
    year: "2026",
    services: ["E-commerce", "Web Design", "Development"],
    summary:
      "A storefront for an Alexandria-born casual-wear label. Editorial imagery, drop-based collections and a checkout that rewards Visa and Apple Pay, all in a soft monochrome built to let the product speak.",
    url: "https://areacodeeg.com/",
    shots: { desktop: "/work/areacode-desktop.jpg", mobile: "/work/areacode-mobile.jpg", mobileHeight: 9164 },
    theme: {
      bg: "#efe6df",
      glow: ["#e9b7b0", "#2f4fd1"],
      ink: "#1a1716",
      wordmarkClass: "serif",
    },
  },
  {
    slug: "qdr",
    title: "QDR",
    client: "QDR Studios",
    year: "2026",
    services: ["E-commerce", "Web Design", "Development"],
    summary:
      "Premium streetwear, dark and loud. A limited-drop store built around one line: wear your journey. Heavy type, gritty lookbooks and a quick-view flow made for moving fast before the run sells out.",
    url: "https://www.qdrstudios.com/",
    shots: { desktop: "/work/qdr-desktop.jpg", mobile: "/work/qdr-mobile.jpg", mobileHeight: 7850 },
    theme: {
      bg: "#0e0d0c",
      glow: ["#ff6a2b", "#e9c93c"],
      ink: "#f5f1e8",
      wordmarkClass: "font-extrabold italic tracking-[-0.06em]",
    },
  },
];
