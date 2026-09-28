export type Service = {
  id: string;
  index: string;
  title: string;
  accent: string;
  blurb: string;
  deliverables: string[];
};

export const services: Service[] = [
  {
    id: "web",
    index: "01",
    title: "Web Development",
    accent: "Websites that move",
    blurb:
      "Marketing sites, platforms and e-commerce built on Next.js, with motion and performance treated as features rather than afterthoughts.",
    deliverables: ["Next.js & React", "Creative development", "Headless CMS", "E-commerce", "WebGL & motion"],
  },
  {
    id: "app",
    index: "02",
    title: "App Development",
    accent: "Apps people keep",
    blurb:
      "iOS and Android products from first prototype to store launch, designed around the few moments that make people come back.",
    deliverables: ["iOS & Android", "React Native", "Product design", "APIs & backends", "Launch & growth"],
  },
  {
    id: "ai",
    index: "03",
    title: "AI Creatives",
    accent: "Imagery from nowhere",
    blurb:
      "Campaign visuals, product films and brand worlds generated and art-directed with AI, then finished by hand so they still feel like you.",
    deliverables: ["AI imagery", "AI video & motion", "Brand worlds", "Product shots", "Custom AI tools"],
  },
];
