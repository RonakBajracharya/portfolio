import { NextResponse } from "next/server"
import { requireAuth } from "@/lib/auth"
import { put } from "@vercel/blob"

let useBlob = false
try {
  useBlob = !!process.env.BLOB_READ_WRITE_TOKEN
} catch {}

async function saveLocal(file: File): Promise<string> {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const ext = file.name.split(".").pop() || "png"
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const fs = await import("fs/promises")
  const path = await import("path")
  const dir = path.join(process.cwd(), "public", "uploads")
  await fs.mkdir(dir, { recursive: true })
  await fs.writeFile(path.join(dir, filename), buffer)
  return `/uploads/${filename}`
}

export async function POST(request: Request) {
  const auth = await requireAuth()
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null
    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 })

    let url: string

    if (useBlob) {
      const blob = await put(file.name, file, { access: "public" })
      url = blob.url
    } else {
      url = await saveLocal(file)
    }

    return NextResponse.json({ url })
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
