import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produce a static export in the `out/` folder for GitHub Pages
  output: "export",
  // Required for GitHub Pages: site is served from /qiskit-brasil/
  basePath: "/qiskit-brasil",
  assetPrefix: "/qiskit-brasil",
  // Expose basePath so next/image src paths can be prefixed at build time
  env: {
    NEXT_PUBLIC_BASE_PATH: "/qiskit-brasil",
  },
  images: {
    // Next's image optimization requires a server; disable for static hosting
    unoptimized: true,
  },
};

export default nextConfig;
