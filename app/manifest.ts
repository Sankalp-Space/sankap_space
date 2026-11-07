import type { MetadataRoute } from "next";
import { SEO } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SEO.title,
    short_name: "Sankalp",
    description: SEO.description,
    start_url: "/",
    display: "standalone",
    background_color: "#020308",
    theme_color: "#020308",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon.png", type: "image/png", sizes: "180x180" },
    ],
  };
}
