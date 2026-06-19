import { NextResponse } from "next/server"
import { getBlogPosts, createBlogPost } from "@/lib/db"
import { requireAuth } from "@/lib/auth"
import { marked } from "marked"
import type { BlogPost } from "@/lib/db"
import { revalidatePath } from "next/cache"

const isHtml = (s: string) => /<\/[a-z][a-z0-9]*>/i.test(s)

function render(p: BlogPost) {
  return { ...p, contentHtml: isHtml(p.content) ? p.content : (marked(p.content) as string) }
}

export async function GET() {
  const posts = await getBlogPosts()
  return NextResponse.json(posts.map(render))
}

export async function POST(request: Request) {
  const auth = await requireAuth()
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 401 })
  const body = await request.json()
  const post = await createBlogPost(body)
  revalidatePath("/")
  revalidatePath("/blog")
  return NextResponse.json(render(post), { status: 201 })
}