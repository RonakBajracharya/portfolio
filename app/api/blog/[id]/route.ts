import { NextResponse } from "next/server"
import { getBlogPostById, updateBlogPost, deleteBlogPost } from "@/lib/db"
import { requireAuth } from "@/lib/auth"
import { marked } from "marked"
import type { BlogPost } from "@/lib/db"

const isHtml = (s: string) => /<\/[a-z][a-z0-9]*>/i.test(s)

function render(p: BlogPost) {
  return { ...p, contentHtml: isHtml(p.content) ? p.content : (marked(p.content) as string) }
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await getBlogPostById(id)
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(render(post))
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth()
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 401 })
  const { id } = await params
  const body = await req.json()
  const updated = await updateBlogPost(id, body)
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(render(updated))
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth()
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 401 })
  const { id } = await params
  await deleteBlogPost(id)
  return NextResponse.json({ message: "Deleted" })
}
