import type { MetadataRoute } from "next";

// Required by `output: "export"`: generated once at build time
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://qiskitbrasil.com.br/sitemap.xml",
  };
}
