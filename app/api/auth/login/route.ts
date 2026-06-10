import { NextResponse } from "next/server"
import { login } from "@/lib/auth"

export async function POST(request: Request) {
  const body = await request.json()
  const username = body.username
  const password = body.password

  console.log("[LOGIN] received username:", username, "password length:", password?.length)
  console.log("[LOGIN] ADMIN_USERNAME:", process.env.ADMIN_USERNAME, "ADMIN_PASSWORD_HASH set:", !!process.env.ADMIN_PASSWORD_HASH, "ADMIN_PASSWORD_HASH starts:", process.env.ADMIN_PASSWORD_HASH?.substring(0, 7))

  if (!username || !password) {
    return NextResponse.json({ error: "Username and password are required" }, { status: 400 })
  }

  const success = await login(username, password)
  console.log("[LOGIN] success:", success)

  if (success) {
    return NextResponse.json({ message: "Logged in successfully" })
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
}