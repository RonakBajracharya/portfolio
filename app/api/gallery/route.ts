import { NextResponse } from "next/server"
import { getGallery, createGalleryItem } from "@/lib/db"
import { requireAuth } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function GET() {
  const items = await getGallery()
  return NextResponse.json(items)
}

export async function POST(request: Request) {
  const auth = await requireAuth()
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 401 })
  const body = await request.json()
  const item = await createGalleryItem(body)
  revalidatePath("/")
  revalidatePath("/gallery")
  return NextResponse.json(item, { status: 201 })
}