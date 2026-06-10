import { NextResponse } from "next/server";
import { getProjects, createProject } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function GET() {
  console.log("DATABASE_URL =", process.env.DATABASE_URL);

  const projects = await getProjects();
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const auth = await requireAuth();
  if (!auth.authorized)
    return NextResponse.json({ error: auth.error }, { status: 401 });
  const body = await request.json();
  const project = await createProject(body);
  return NextResponse.json(project, { status: 201 });
}
