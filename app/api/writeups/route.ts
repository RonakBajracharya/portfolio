import { NextResponse } from "next/server"
import { getWriteups, createWriteup } from "@/lib/db"
import { requireAuth } from "@/lib/auth"
import { marked } from "marked"
import type { Writeup } from "@/lib/db"
import { revalidatePath } from "next/cache"

function isHtml(str: string): boolean {
  return /<\/[a-z][a-z0-9]*>/i.test(str)
}

function renderContent(w: Writeup): Writeup & { contentHtml: string } {
  return {
    ...w,
    contentHtml: isHtml(w.content) ? w.content : (marked(w.content) as string),
  }
}

export async function GET() {
  const writeups = await getWriteups()
  return NextResponse.json(writeups.map(renderContent))
}

export async function POST(request: Request) {
  const auth = await requireAuth()
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 401 })
  const body = await request.json()
  const writeup = await createWriteup(body)
  revalidatePath("/")
  revalidatePath("/writeups")
  return NextResponse.json(renderContent(writeup), { status: 201 })
}