import { NextResponse } from "next/server"
import { login } from "@/lib/auth"

export async function POST(request: Request) {
  const { username, password } = await request.json()

  if (!username || !password) {
    return NextResponse.json({ error: "Username and password are required" }, { status: 400 })
  }

  const success = await login(username, password)

  if (success) {
    return NextResponse.json({ message: "Logged in successfully" })
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
}