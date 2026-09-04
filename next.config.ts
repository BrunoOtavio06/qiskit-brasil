import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produce a static export in the `out/` folder for GitHub Pages
  output: "export",
  images: {
    // Next's image optimization requires a server; disable for static hosting
    unoptimized: true,
  },
};

export default nextConfig;
