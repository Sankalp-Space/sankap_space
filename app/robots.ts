import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Open to search engines and to AI search/answer engines (ChatGPT, Perplexity, Claude, Gemini).
export default function robots(): MetadataRoute.Robots {
  const aiBots = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "Claude-SearchBot", "Google-Extended", "Applebot-Extended", "Bingbot"];
  return {
    rules: [{ userAgent: "*", allow: "/" }, ...aiBots.map((userAgent) => ({ userAgent, allow: "/" }))],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
