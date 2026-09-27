import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/auth";

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { ids } = await request.json();
  if (!Array.isArray(ids) || ids.length === 0) return NextResponse.json({ error: "Invalid ids" }, { status: 400 });
  await prisma.$transaction(ids.map((id: string, index: number) => prisma.project.update({ where: { id }, data: { sortOrder: index + 1 } })));
  return NextResponse.json({ ok: true });
}
