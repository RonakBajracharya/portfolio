import { NextResponse } from "next/server"
import { login } from "@/lib/auth"

export async function POST(request: Request) {
  const { password } = await request.json()

  if (!password) {
    return NextResponse.json({ error: "Password is required" }, { status: 400 })
  }

  const success = await login(password)

  if (success) {
    return NextResponse.json({ message: "Logged in successfully" })
  }

  return NextResponse.json({ error: "Invalid password" }, { status: 401 })
}
