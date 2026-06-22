import type { MetadataRoute } from "next";
import { event } from "@config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: event.seo.url,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
