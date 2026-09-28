import type { Metadata } from "next";
import { DEFAULT_SITE_URL } from "@/lib/site";

export function absoluteUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized === "/" ? DEFAULT_SITE_URL : `${DEFAULT_SITE_URL}${normalized}`;
}

function cleanTitle(title: string) {
  return title.replace(/\s*\|\s*Seunpaul(?:\s+Portfolio)?$/i, "").trim();
}

export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  const clean = cleanTitle(title);
  const url = absoluteUrl(path);
  const image = absoluteUrl("/opengraph-image");

  return {
    title: clean,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title: clean,
      description,
      url,
      type,
      siteName: "Seunpaul Portfolio",
      locale: "en_US",
      images: [{ url: image, width: 1200, height: 630, alt: clean }],
    },
    twitter: {
      card: "summary_large_image",
      title: clean,
      description,
      images: [image],
    },
  };
}
