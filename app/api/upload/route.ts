import { NextResponse } from "next/server"
import { requireAuth } from "@/lib/auth"
import fs from "fs/promises"
import path from "path"

export async function POST(request: Request) {
  const auth = await requireAuth()
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const ext = file.name.split(".").pop() || "png"
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    const uploadsDir = path.join(process.cwd(), "public", "uploads")
    await fs.mkdir(uploadsDir, { recursive: true })

    const filePath = path.join(uploadsDir, filename)
    await fs.writeFile(filePath, buffer)

    const url = `/uploads/${filename}`
    return NextResponse.json({ url })
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
