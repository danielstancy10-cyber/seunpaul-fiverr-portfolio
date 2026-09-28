import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { DEFAULT_SITE_URL } from "@/lib/site";
import { serviceDefinitions } from "@/lib/services";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
    select: { id: true, updatedAt: true },
  }).catch(() => []);

  const staticRoutes = [
    "/",
    "/about",
    "/services",
    "/work",
    "/faq",
  ];

  const serviceRoutes = serviceDefinitions.map((service) => `/services/${service.slug}`);

  return [
    ...staticRoutes.map((path) => ({ url: `${DEFAULT_SITE_URL}${path}` })),
    ...serviceRoutes.map((path) => ({ url: `${DEFAULT_SITE_URL}${path}` })),
    ...projects.map((project) => ({
      url: `${DEFAULT_SITE_URL}/work/${project.id}`,
      lastModified: project.updatedAt,
    })),
  ];
}
