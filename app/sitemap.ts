import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://YOUR-DOMAIN.com";
  return [{ url: `${base.replace(/\/$/, "")}/`, lastModified: new Date() }];
}
