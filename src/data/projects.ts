/**
 * Portfolio. Two slots are reserved for Rasmlab's launch projects; replace the
 * placeholder fields (and add `image`/`url`) when the details arrive.
 */
export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  services: string[];
  summary: string;
  /** Optional cover in /public, e.g. "/work/project-one.jpg". */
  image?: string;
  url?: string;
  /** Used for the generated cover when no image is set. */
  palette: [string, string];
  placeholder?: boolean;
};

export const projects: Project[] = [
  {
    slug: "project-one",
    title: "Project One",
    client: "Client name",
    year: "2026",
    services: ["Web", "Motion"],
    summary: "Case study coming soon. This slot is ready for the first featured project.",
    palette: ["#ff4d1f", "#7c5cff"],
    placeholder: true,
  },
  {
    slug: "project-two",
    title: "Project Two",
    client: "Client name",
    year: "2026",
    services: ["App", "AI Creatives"],
    summary: "Case study coming soon. This slot is ready for the second featured project.",
    palette: ["#7c5cff", "#16c8a0"],
    placeholder: true,
  },
];
