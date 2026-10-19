import type { MetadataRoute } from "next";
import { catalog } from "@/lib/docs";
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.SITE_URL;
  if (!origin) return [];
  return ["", "/brand", "/credits", ...catalog.map(([, slug]) => `/docs${slug ? `/${slug}` : ""}`)].map((route) => ({
    url: `${origin}${route}`,
  }));
}
