import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produce a static export in the `out/` folder for GitHub Pages
  output: "export",
  // Required for GitHub Pages: site is served from /qiskit-brasil/, not /
  basePath: "/qiskit-brasil",
  assetPrefix: "/qiskit-brasil",
  images: {
    // Next's image optimization requires a server; disable for static hosting
    unoptimized: true,
  },
};

export default nextConfig;
