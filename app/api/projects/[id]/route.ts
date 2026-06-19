import { NextResponse } from "next/server"
import { getProjectById, getProjectBySlug, updateProject, deleteProject } from "@/lib/db"
import { requireAuth } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let project = await getProjectBySlug(id)
  if (!project) project = await getProjectById(id)
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(project)
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth()
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 401 })
  const { id } = await params
  const body = await req.json()
  const updated = await updateProject(id, body)
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 })
  revalidatePath("/")
  revalidatePath("/projects")
  revalidatePath(`/projects/${updated.slug}`)
  return NextResponse.json(updated)
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth()
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 401 })
  const { id } = await params
  await deleteProject(id)
  revalidatePath("/")
  revalidatePath("/projects")
  return NextResponse.json({ message: "Deleted" })
}