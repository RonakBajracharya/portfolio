import { NextResponse } from "next/server"
import { markMessageRead, deleteMessage as delMsg } from "@/lib/db"
import { requireAuth } from "@/lib/auth"

export async function PATCH(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth()
  if (!auth.authorized) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  await markMessageRead(id)
  return NextResponse.json({ success: true })
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth()
  if (!auth.authorized) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  await delMsg(id)
  return NextResponse.json({ success: true })
}
