import { NextResponse } from "next/server"
import { updateProject, deleteProject } from "@/lib/db"
import { requireAuth } from "@/lib/auth"

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth()
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 401 })
  const { id } = await params
  const body = await req.json()
  const updated = await updateProject(id, body)
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(updated)
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth()
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 401 })
  const { id } = await params
  await deleteProject(id)
  return NextResponse.json({ message: "Deleted" })
}
