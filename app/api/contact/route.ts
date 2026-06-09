import { NextResponse } from "next/server"
import { getMessages, createMessage } from "@/lib/db"
import { requireAuth } from "@/lib/auth"

export async function GET() {
  const auth = await requireAuth()
  if (!auth.authorized) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const msgs = await getMessages()
  return NextResponse.json(msgs)
}

export async function POST(request: Request) {
  const body = await request.json()
  if (!body.name || !body.email || !body.message) {
    return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
  }
  const msg = await createMessage({
    name: body.name,
    phone: body.phone || "",
    email: body.email,
    message: body.message,
  })
  return NextResponse.json({ success: true, message: "Message sent!", id: msg.id }, { status: 201 })
}
