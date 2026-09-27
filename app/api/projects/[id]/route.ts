import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/auth";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await request.json();
  const project = await prisma.project.update({ where: { id }, data: {
    published: Boolean(body.published),
    category: String(body.category || "Project"),
    title: String(body.title || "Untitled project"),
    description: String(body.description || ""),
    tags: Array.isArray(body.tags) ? body.tags.map(String) : [],
    metrics: Array.isArray(body.metrics) ? body.metrics : [],
    visualType: ["animation", "video", "image"].includes(body.visualType) ? body.visualType : "animation",
    animation: String(body.animation || "dashboard"),
    videoUrl: body.videoUrl ? String(body.videoUrl) : null,
    imageUrl: body.imageUrl ? String(body.imageUrl) : null,
  } });
  return NextResponse.json({ project });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await prisma.project.delete({ where: { id } });
  const remaining = await prisma.project.findMany({ orderBy: { sortOrder: "asc" }, select: { id: true } });
  await prisma.$transaction(remaining.map((p, index) => prisma.project.update({ where: { id: p.id }, data: { sortOrder: index + 1 } })));
  return NextResponse.json({ ok: true });
}
