import type { MetadataRoute } from "next";
import { event } from "@config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${event.seo.url}/sitemap.xml`,
  };
}
