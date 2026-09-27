import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE = await getSiteUrl();
  const projects = await prisma.project.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" }, select: { id: true, updatedAt: true } }).catch(() => []);
  const staticRoutes = ["/", "/about", "/services", "/faq"].map((path) => ({ url: `${BASE}${path}`, lastModified: new Date() }));
  const projectRoutes = projects.map((project) => ({ url: `${BASE}/work/${project.id}`, lastModified: project.updatedAt }));
  return [...staticRoutes, ...projectRoutes];
}
