import { NextResponse } from "next/server"
import { getGalleryItemById, updateGalleryItem, deleteGalleryItem } from "@/lib/db"
import { requireAuth } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const item = await getGalleryItemById(id)
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(item)
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth()
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 401 })
  const { id } = await params
  const body = await request.json()
  const updated = await updateGalleryItem(id, body)
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 })
  revalidatePath("/")
  revalidatePath("/gallery")
  return NextResponse.json(updated)
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth()
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 401 })
  const { id } = await params
  const deleted = await deleteGalleryItem(id)
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 })
  revalidatePath("/")
  revalidatePath("/gallery")
  return NextResponse.json({ message: "Deleted" })
}