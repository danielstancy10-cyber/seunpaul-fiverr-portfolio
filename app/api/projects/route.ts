import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/auth";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const projects = await prisma.project.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json({ projects });
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const last = await prisma.project.findFirst({ orderBy: { sortOrder: "desc" }, select: { sortOrder: true } });
  const project = await prisma.project.create({ data: {
    sortOrder: (last?.sortOrder ?? 0) + 1,
    published: body.published !== false,
    category: String(body.category || "New Project"),
    title: String(body.title || "New portfolio project"),
    description: String(body.description || "Describe the problem, approach and outcome."),
    tags: Array.isArray(body.tags) ? body.tags.map(String) : [],
    metrics: Array.isArray(body.metrics) ? body.metrics : [],
    visualType: ["animation", "video", "image"].includes(body.visualType) ? body.visualType : "animation",
    animation: String(body.animation || "dashboard"),
    videoUrl: body.videoUrl ? String(body.videoUrl) : null,
    imageUrl: body.imageUrl ? String(body.imageUrl) : null,
  } });
  return NextResponse.json({ project });
}
