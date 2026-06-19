import { NextResponse } from "next/server"
import { getProjects, createProject } from "@/lib/db"
import { requireAuth } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function GET() {
  const projects = await getProjects()
  return NextResponse.json(projects)
}

export async function POST(request: Request) {
  const auth = await requireAuth()
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 401 })
  const body = await request.json()
  const project = await createProject(body)
  revalidatePath("/")
  revalidatePath("/projects")
  return NextResponse.json(project, { status: 201 })
}