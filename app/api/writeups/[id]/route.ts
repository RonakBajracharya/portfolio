import { NextResponse } from "next/server"
import { getWriteupById, updateWriteup, deleteWriteup } from "@/lib/db"
import { requireAuth } from "@/lib/auth"
import { marked } from "marked"
import type { Writeup } from "@/lib/db"

function isHtml(str: string): boolean {
  return /<\/[a-z][a-z0-9]*>/i.test(str)
}

function renderContent(w: Writeup): Writeup & { contentHtml: string } {
  return {
    ...w,
    contentHtml: isHtml(w.content) ? w.content : (marked(w.content) as string),
  }
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const writeup = await getWriteupById(id)
  if (!writeup) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }
  return NextResponse.json(renderContent(writeup))
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth()
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error }, { status: 401 })
  }

  const { id } = await params
  const body = await request.json()
  const updated = await updateWriteup(id, body)
  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }
  return NextResponse.json(renderContent(updated))
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth()
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error }, { status: 401 })
  }

  const { id } = await params
  const deleted = await deleteWriteup(id)
  if (!deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }
  return NextResponse.json({ message: "Deleted" })
}
