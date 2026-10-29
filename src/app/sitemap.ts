import type { MetadataRoute } from "next";

// Required by `output: "export"`: generated once at build time
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://qiskitbrasil.com.br", lastModified: new Date() }];
}
