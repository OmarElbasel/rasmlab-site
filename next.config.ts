import type { NextConfig } from "next";

// STATIC_EXPORT=1 produces a plain static build in /out (used for previews).
const isExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(isExport && { output: "export", images: { unoptimized: true } }),
};

export default nextConfig;
