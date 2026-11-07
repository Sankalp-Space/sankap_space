import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images: [`${SITE_URL}/opengraph-image.jpg`, `${SITE_URL}/missions/imagify.jpg`, `${SITE_URL}/missions/dgni.jpg`, `${SITE_URL}/missions/samatha.jpg`],
    },
  ];
}
