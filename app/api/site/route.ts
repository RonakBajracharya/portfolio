import { NextResponse } from "next/server"
import { getSiteConfig, updateSiteConfig } from "@/lib/db"
import { requireAuth } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function GET() {
  const config = await getSiteConfig()
  return NextResponse.json(config)
}

export async function PUT(request: Request) {
  const auth = await requireAuth()
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 401 })
  const body = await request.json()
  await updateSiteConfig(body)
  revalidatePath("/")
  return NextResponse.json({ message: "Site updated" })
}